import "reflect-metadata";
import { createApp } from "../../apps/api/dist/create-app";

type NodeHandler = (req: unknown, res: unknown) => unknown;

let cachedHandler: NodeHandler | null = null;

async function getHandler(): Promise<NodeHandler> {
  if (cachedHandler) {
    return cachedHandler;
  }

  const app = await createApp();
  await app.init();

  cachedHandler = app.getHttpAdapter().getInstance() as NodeHandler;

  return cachedHandler;
}

export default async function handler(req: unknown, res: unknown) {
  const appHandler = await getHandler();
  return appHandler(req, res);
}