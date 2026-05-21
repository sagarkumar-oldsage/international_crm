import { Module } from "@nestjs/common";
import { HealthController } from "./health/health.controller";
import { AuthModule } from "./modules/auth/auth.module";
import { ApplicationsModule } from "./modules/applications/applications.module";
import { MobilityModule } from "./modules/mobility/mobility.module";
import { StudentsModule } from "./modules/students/students.module";

@Module({
  imports: [AuthModule, MobilityModule, StudentsModule, ApplicationsModule],
  controllers: [HealthController]
})
export class AppModule {}
