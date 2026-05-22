import "reflect-metadata";
import { createApp } from "./create-app";

async function bootstrap() {
  const app = await createApp();

  const port = Number(process.env.PORT ?? 8080);
  await app.listen(port);
}

bootstrap();
