import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateInitiativeDto } from "./dto/create-initiative.dto";
import {
  InstitutionalInitiativeDto,
  InstitutionalKpiDto,
  InstitutionalSummaryDto
} from "./dto/institutional.dto";
import { UpdateInitiativeStatusDto } from "./dto/update-initiative-status.dto";

@Injectable()
export class InstitutionalService {
  private readonly kpis: InstitutionalKpiDto[] = [
    {
      id: "inst-kpi-1",
      metric: "Active Global Partners",
      value: "76",
      trend: "UP"
    },
    {
      id: "inst-kpi-2",
      metric: "Joint Programs Running",
      value: "14",
      trend: "UP"
    },
    {
      id: "inst-kpi-3",
      metric: "International Faculty Exchange",
      value: "22",
      trend: "STABLE"
    }
  ];

  private readonly initiatives: InstitutionalInitiativeDto[] = [
    {
      id: "initiative-1",
      title: "Dual Degree Expansion (EU Cluster)",
      owner: "IR Director",
      targetDate: "2026-09-30",
      status: "IN_PROGRESS",
      notes: "Legal and curriculum alignment underway"
    },
    {
      id: "initiative-2",
      title: "Global Credit Transfer Framework",
      owner: "Academic Council",
      targetDate: "2026-11-15",
      status: "PLANNED",
      notes: "Awaiting partner feedback"
    }
  ];

  listKpis(): InstitutionalKpiDto[] {
    return this.kpis;
  }

  listInitiatives(): InstitutionalInitiativeDto[] {
    return this.initiatives;
  }

  getSummary(): InstitutionalSummaryDto {
    return {
      totalInitiatives: this.initiatives.length,
      inProgress: this.initiatives.filter((item) => item.status === "IN_PROGRESS").length,
      atRisk: this.initiatives.filter((item) => item.status === "AT_RISK").length,
      completed: this.initiatives.filter((item) => item.status === "COMPLETED").length
    };
  }

  createInitiative(payload: CreateInitiativeDto): InstitutionalInitiativeDto {
    const initiative: InstitutionalInitiativeDto = {
      id: `initiative-${this.initiatives.length + 1}`,
      title: payload.title,
      owner: payload.owner,
      targetDate: payload.targetDate,
      status: "PLANNED",
      notes: payload.notes
    };

    this.initiatives.unshift(initiative);
    return initiative;
  }

  updateInitiativeStatus(
    initiativeId: string,
    payload: UpdateInitiativeStatusDto
  ): InstitutionalInitiativeDto {
    const initiative = this.initiatives.find((item) => item.id === initiativeId);
    if (!initiative) {
      throw new NotFoundException("Initiative not found");
    }

    initiative.status = payload.status;
    initiative.notes = payload.notes ?? initiative.notes;
    return initiative;
  }
}
