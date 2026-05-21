import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException
} from "@nestjs/common";
import { verifyAuthToken } from "../../modules/auth/token.util";

@Injectable()
export class JwtAuthGuard implements CanActivate {
	canActivate(context: ExecutionContext): boolean {
		const request = context.switchToHttp().getRequest();
		const authorizationHeader = request.headers.authorization;

		if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
			throw new UnauthorizedException("Authorization token is missing");
		}

		const token = authorizationHeader.replace("Bearer ", "").trim();
		const payload = verifyAuthToken(token, process.env.JWT_SECRET ?? "dev-only-secret-change-this");
		if (!payload) {
			throw new UnauthorizedException("Invalid or expired token");
		}

		request.user = payload;
		return true;
	}
}
