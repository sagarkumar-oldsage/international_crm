import { Controller, Get, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { RolesGuard } from "../../common/guards/roles.guard";
import { WorkspaceService } from "./workspace.service";

@Controller("workspace")
@UseGuards(JwtAuthGuard, RolesGuard)
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @Get("overview")
  getOverview() {
    return this.workspaceService.getOverview();
  }

  @Get("inbox")
  getInbox() {
    return this.workspaceService.getInbox();
  }

  @Get("calendar")
  getCalendar() {
    return this.workspaceService.getCalendar();
  }

  @Get("settings")
  getSettings() {
    return this.workspaceService.getSettings();
  }
}
