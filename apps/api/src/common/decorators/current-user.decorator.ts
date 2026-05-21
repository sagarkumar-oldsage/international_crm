import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { JwtPayload } from "../../modules/auth/types/jwt-payload.type";

// Provides typed access to the JWT payload attached by Passport strategy.
export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): JwtPayload => {
    const request = context.switchToHttp().getRequest();
    return request.user as JwtPayload;
  }
);
