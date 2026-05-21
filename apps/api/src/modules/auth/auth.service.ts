import { Injectable, UnauthorizedException } from "@nestjs/common";
import { compareSync } from "bcryptjs";
import { UserRole } from "../../common/enums/roles.enum";
import { PrismaService } from "../../prisma/prisma.service";
import { LoginDto } from "./dto/login.dto";
import { signAuthToken } from "./token.util";
import { JwtPayload } from "./types/jwt-payload.type";

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

  async login(credentials: LoginDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: credentials.email
      }
    });

    if (!user || !compareSync(credentials.password, user.passwordHash)) {
      throw new UnauthorizedException("Invalid email or password");
    }

    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role as UserRole
    };

    return {
      accessToken: signAuthToken(payload, process.env.JWT_SECRET ?? "dev-only-secret-change-this"),
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    };
  }
}
