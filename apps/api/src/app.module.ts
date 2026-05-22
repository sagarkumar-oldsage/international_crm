import { Module } from "@nestjs/common";
import { HealthController } from "./health/health.controller";
import { AuthModule } from "./modules/auth/auth.module";
import { AnalyticsModule } from "./modules/analytics/analytics.module";
import { AiAutomationModule } from "./modules/ai-automation/ai-automation.module";
import { ApplicationsModule } from "./modules/applications/applications.module";
import { CommunicationModule } from "./modules/communication/communication.module";
import { DiscoveryModule } from "./modules/discovery/discovery.module";
import { DocumentsModule } from "./modules/documents/documents.module";
import { EventsModule } from "./modules/events/events.module";
import { FinanceModule } from "./modules/finance/finance.module";
import { InstitutionalModule } from "./modules/institutional/institutional.module";
import { KnowledgeModule } from "./modules/knowledge/knowledge.module";
import { MobileExperienceModule } from "./modules/mobile-experience/mobile-experience.module";
import { PrismaModule } from "./prisma/prisma.module";
import { MobilityModule } from "./modules/mobility/mobility.module";
import { PartnershipsModule } from "./modules/partnerships/partnerships.module";
import { StudentsModule } from "./modules/students/students.module";
import { SupportModule } from "./modules/support/support.module";
import { VisaModule } from "./modules/visa/visa.module";
import { WorkspaceModule } from "./modules/workspace/workspace.module";

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    AnalyticsModule,
    AiAutomationModule,
    MobilityModule,
    StudentsModule,
    DiscoveryModule,
    KnowledgeModule,
    MobileExperienceModule,
    InstitutionalModule,
    SupportModule,
    ApplicationsModule,
    CommunicationModule,
    FinanceModule,
    WorkspaceModule,
    DocumentsModule,
    VisaModule,
    PartnershipsModule,
    EventsModule
  ],
  controllers: [HealthController]
})
export class AppModule {}
