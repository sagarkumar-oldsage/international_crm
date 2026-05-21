import { Controller, Get } from "@nestjs/common";

@Controller("health")
export class HealthController {
  // Lightweight health endpoint for Render health checks.
  @Get()
  check() {
    return {
      status: "ok",
      service: "international-crm-api"
    };
  }
}
