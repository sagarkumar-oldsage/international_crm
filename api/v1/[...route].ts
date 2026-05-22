import "reflect-metadata";
import serverless from "serverless-http";
import { createApp } from "../../apps/api/src/create-app";

type NodeHandler = (req: unknown, res: unknown) => Promise<unknown>;

let cachedHandler: NodeHandler | null = null;

async function getHandler(): Promise<NodeHandler> {
  if (cachedHandler) {
    return cachedHandler;
  }

  const app = await createApp();
  await app.init();

  const expressApp = app.getHttpAdapter().getInstance();
  cachedHandler = serverless(expressApp) as NodeHandler;

  return cachedHandler;
}

export default async function handler(req: unknown, res: unknown) {
  const appHandler = await getHandler();
  return appHandler(req, res);
}