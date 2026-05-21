import { createHmac, timingSafeEqual } from "node:crypto";
import { JwtPayload } from "./types/jwt-payload.type";

interface SignedPayload extends JwtPayload {
  exp: number;
}

function encode(value: string): string {
  return Buffer.from(value, "utf8").toString("base64url");
}

function decode(value: string): string {
  return Buffer.from(value, "base64url").toString("utf8");
}

function computeSignature(payloadPart: string, secret: string): string {
  return createHmac("sha256", secret).update(payloadPart).digest("base64url");
}

// Custom token format keeps auth dependency-light while preserving signed claims.
export function signAuthToken(payload: JwtPayload, secret: string): string {
  const exp = Math.floor(Date.now() / 1000) + 12 * 60 * 60;
  const signedPayload: SignedPayload = {
    ...payload,
    exp
  };

  const payloadPart = encode(JSON.stringify(signedPayload));
  const signature = computeSignature(payloadPart, secret);
  return `${payloadPart}.${signature}`;
}

export function verifyAuthToken(token: string, secret: string): JwtPayload | null {
  const [payloadPart, signature] = token.split(".");
  if (!payloadPart || !signature) {
    return null;
  }

  const expectedSignature = computeSignature(payloadPart, secret);
  const signatureBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);

  if (signatureBuffer.length !== expectedBuffer.length) {
    return null;
  }

  if (!timingSafeEqual(signatureBuffer, expectedBuffer)) {
    return null;
  }

  const parsed = JSON.parse(decode(payloadPart)) as SignedPayload;
  if (parsed.exp < Math.floor(Date.now() / 1000)) {
    return null;
  }

  return {
    sub: parsed.sub,
    email: parsed.email,
    role: parsed.role
  };
}
