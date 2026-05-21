import { Injectable, UnauthorizedException } from "@nestjs/common";
import { compareSync, hashSync } from "bcryptjs";
import { UserRole } from "../../common/enums/roles.enum";
import { LoginDto } from "./dto/login.dto";
import { signAuthToken } from "./token.util";
import { JwtPayload } from "./types/jwt-payload.type";

interface AuthUser {
  id: string;
  email: string;
  passwordHash: string;
  role: UserRole;
}

@Injectable()
export class AuthService {
  // Seed users provide a development-ready authentication baseline before DB wiring.
  private readonly seedUsers: AuthUser[] = [
    {
      id: "user-1",
      email: "admin@internationalcrm.edu",
      passwordHash: hashSync("Admin@123", 10),
      role: UserRole.SUPER_ADMIN
    },
    {
      id: "user-2",
      email: "student@internationalcrm.edu",
      passwordHash: hashSync("Student@123", 10),
      role: UserRole.OUTBOUND_STUDENT
    }
  ];

  login(credentials: LoginDto) {
    const user = this.seedUsers.find((item) => item.email === credentials.email);
    if (!user || !compareSync(credentials.password, user.passwordHash)) {
      throw new UnauthorizedException("Invalid email or password");
    }

    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role
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
