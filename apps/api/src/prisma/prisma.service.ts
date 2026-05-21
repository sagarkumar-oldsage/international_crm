import { Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  // Shared Prisma client keeps database access centralized across modules.
  async onModuleInit() {
    await this.$connect();
  }
}
