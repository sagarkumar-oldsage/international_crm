import { Injectable } from "@nestjs/common";

interface WorkspaceOverviewDto {
  institutionName: string;
  outboundStudents: number;
  incomingStudents: number;
  activeMous: number;
  visaApprovalRate: number;
  updatedAt: string;
}

type WorkspaceInboxCategoryDto =
  | "APPLICATION"
  | "VISA"
  | "PARTNERSHIP"
  | "EVENT"
  | "FINANCE"
  | "GENERAL";

interface WorkspaceInboxItemDto {
  id: string;
  from: string;
  subject: string;
  category: WorkspaceInboxCategoryDto;
  receivedAt: string;
  unread: boolean;
}

type WorkspaceCalendarTypeDto = "OUTREACH" | "DELEGATION" | "WEBINAR" | "DEADLINE";

interface WorkspaceCalendarEventDto {
  id: string;
  title: string;
  date: string;
  type: WorkspaceCalendarTypeDto;
  owner: string;
}

interface WorkspaceSettingsDto {
  institutionCode: string;
  timezone: string;
  defaultCurrency: string;
  notificationsEnabled: boolean;
  ssoEnabled: boolean;
}

@Injectable()
export class WorkspaceService {
  getOverview(): WorkspaceOverviewDto {
    return {
      institutionName: "Tagore Institute of Technology",
      outboundStudents: 412,
      incomingStudents: 289,
      activeMous: 67,
      visaApprovalRate: 94,
      updatedAt: new Date().toISOString()
    };
  }

  getInbox(): WorkspaceInboxItemDto[] {
    return [
      {
        id: "msg-1",
        from: "Admissions, TU Munchen",
        subject: "Conditional offer released for Aanya Krishnan",
        category: "APPLICATION",
        receivedAt: "2026-06-01T09:20:00.000Z",
        unread: true
      },
      {
        id: "msg-2",
        from: "Visa Desk",
        subject: "Interview slots opened for Germany cohort",
        category: "VISA",
        receivedAt: "2026-06-01T07:05:00.000Z",
        unread: true
      },
      {
        id: "msg-3",
        from: "Partnership Cell",
        subject: "MoU renewal draft awaiting legal review",
        category: "PARTNERSHIP",
        receivedAt: "2026-05-31T16:30:00.000Z",
        unread: false
      }
    ];
  }

  getCalendar(): WorkspaceCalendarEventDto[] {
    return [
      {
        id: "cal-1",
        title: "Global Education Fair",
        date: "2026-06-04",
        type: "OUTREACH",
        owner: "Outreach Team"
      },
      {
        id: "cal-2",
        title: "TU Munchen Delegation Visit",
        date: "2026-06-12",
        type: "DELEGATION",
        owner: "Partnership Team"
      },
      {
        id: "cal-3",
        title: "Erasmus Info Session",
        date: "2026-06-18",
        type: "WEBINAR",
        owner: "Mobility Team"
      }
    ];
  }

  getSettings(): WorkspaceSettingsDto {
    return {
      institutionCode: "TIT-IR",
      timezone: "Asia/Kolkata",
      defaultCurrency: "INR",
      notificationsEnabled: true,
      ssoEnabled: true
    };
  }
}
