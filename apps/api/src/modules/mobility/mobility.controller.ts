import { Controller, Get } from "@nestjs/common";
import { MobilityService } from "./mobility.service";

@Controller("mobility")
export class MobilityController {
  constructor(private readonly mobilityService: MobilityService) {}

  // Initial endpoint represents the student mobility dashboard data contract.
  @Get("overview")
  getOverview() {
    return this.mobilityService.getMvpOverview();
  }
}
