import { Module } from "@nestjs/common";
import { HealthController } from "./health/health.controller";
import { AuthModule } from "./modules/auth/auth.module";
import { ApplicationsModule } from "./modules/applications/applications.module";
import { DocumentsModule } from "./modules/documents/documents.module";
import { EventsModule } from "./modules/events/events.module";
import { PrismaModule } from "./prisma/prisma.module";
import { MobilityModule } from "./modules/mobility/mobility.module";
import { PartnershipsModule } from "./modules/partnerships/partnerships.module";
import { StudentsModule } from "./modules/students/students.module";
import { VisaModule } from "./modules/visa/visa.module";

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    MobilityModule,
    StudentsModule,
    ApplicationsModule,
    DocumentsModule,
    VisaModule,
    PartnershipsModule,
    EventsModule
  ],
  controllers: [HealthController]
})
export class AppModule {}
