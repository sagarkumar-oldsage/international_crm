import { Module } from "@nestjs/common";
import { MobileExperienceController } from "./mobile-experience.controller";
import { MobileExperienceService } from "./mobile-experience.service";

@Module({
  controllers: [MobileExperienceController],
  providers: [MobileExperienceService]
})
export class MobileExperienceModule {}
