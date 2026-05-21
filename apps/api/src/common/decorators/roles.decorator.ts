import { SetMetadata } from "@nestjs/common";
import { UserRole } from "../enums/roles.enum";

export const ROLES_KEY = "roles";

// Roles metadata is consumed by RolesGuard to enforce RBAC at route level.
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
