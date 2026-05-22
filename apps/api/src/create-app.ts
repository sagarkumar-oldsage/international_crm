import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

export async function createApp() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true
    })
  );

  app.setGlobalPrefix("api/v1");

  const configuredOrigin = process.env.CORS_ORIGIN?.trim();
  app.enableCors({
    origin: configuredOrigin && configuredOrigin.length > 0 ? configuredOrigin : true,
    credentials: true
  });

  return app;
}