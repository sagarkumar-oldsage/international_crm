import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreatePartnerUniversityDto } from "./dto/create-partner-university.dto";
import {
  PartnerUniversityDto,
  PartnershipsSummaryDto
} from "./dto/partner-university.dto";
import { UpdatePartnerMouStatusDto } from "./dto/update-partner-mou-status.dto";

@Injectable()
export class PartnershipsService {
  constructor(private readonly prismaService: PrismaService) {}

  private mapPartnerUniversity(partner: {
    id: string;
    name: string;
    country: string;
    city: string;
    website: string | null;
    contactPersonName: string;
    contactPersonEmail: string;
    collaborationAreas: string[];
    mouStatus: "DRAFT" | "UNDER_REVIEW" | "ACTIVE" | "RENEWAL_DUE" | "EXPIRED" | "ARCHIVED";
    renewalDate: Date | null;
    mobilityQuota: number;
    jointPrograms: string[];
    notes: string | null;
  }): PartnerUniversityDto {
    return {
      id: partner.id,
      name: partner.name,
      country: partner.country,
      city: partner.city,
      website: partner.website,
      contactPersonName: partner.contactPersonName,
      contactPersonEmail: partner.contactPersonEmail,
      collaborationAreas: partner.collaborationAreas,
      mouStatus: partner.mouStatus,
      renewalDate: partner.renewalDate?.toISOString().slice(0, 10) ?? null,
      mobilityQuota: partner.mobilityQuota,
      jointPrograms: partner.jointPrograms,
      notes: partner.notes
    };
  }

  async listAll(): Promise<PartnerUniversityDto[]> {
    const partners = await this.prismaService.partnerUniversity.findMany({
      orderBy: [{ mouStatus: "asc" }, { renewalDate: "asc" }, { name: "asc" }]
    });

    return partners.map((partner) => this.mapPartnerUniversity(partner));
  }

  async getSummary(): Promise<PartnershipsSummaryDto> {
    const partners = await this.prismaService.partnerUniversity.findMany();
    const now = new Date();
    const sixtyDaysFromNow = new Date(now);
    sixtyDaysFromNow.setDate(sixtyDaysFromNow.getDate() + 60);

    return {
      totalPartners: partners.length,
      activeMous: partners.filter((partner) => partner.mouStatus === "ACTIVE").length,
      renewalsDueSoon: partners.filter(
        (partner) =>
          partner.renewalDate !== null &&
          partner.renewalDate.getTime() >= now.getTime() &&
          partner.renewalDate.getTime() <= sixtyDaysFromNow.getTime()
      ).length,
      countriesCovered: new Set(partners.map((partner) => partner.country)).size,
      totalMobilityQuota: partners.reduce((total, partner) => total + partner.mobilityQuota, 0)
    };
  }

  async createPartnerUniversity(payload: CreatePartnerUniversityDto): Promise<PartnerUniversityDto> {
    const partner = await this.prismaService.partnerUniversity.create({
      data: {
        name: payload.name,
        country: payload.country,
        city: payload.city,
        website: payload.website ?? null,
        contactPersonName: payload.contactPersonName,
        contactPersonEmail: payload.contactPersonEmail,
        collaborationAreas: payload.collaborationAreas,
        mouStatus: "DRAFT",
        renewalDate: payload.renewalDate ? new Date(payload.renewalDate) : null,
        mobilityQuota: payload.mobilityQuota,
        jointPrograms: payload.jointPrograms,
        notes: payload.notes ?? null
      }
    });

    return this.mapPartnerUniversity(partner);
  }

  async updateMouStatus(
    partnerUniversityId: string,
    payload: UpdatePartnerMouStatusDto
  ): Promise<PartnerUniversityDto> {
    const existingPartner = await this.prismaService.partnerUniversity.findUnique({
      where: {
        id: partnerUniversityId
      }
    });

    if (!existingPartner) {
      throw new NotFoundException("Partner university record not found");
    }

    const updatedPartner = await this.prismaService.partnerUniversity.update({
      where: {
        id: partnerUniversityId
      },
      data: {
        mouStatus: payload.mouStatus,
        renewalDate: payload.renewalDate
          ? new Date(payload.renewalDate)
          : existingPartner.renewalDate,
        notes: payload.notes ?? existingPartner.notes
      }
    });

    return this.mapPartnerUniversity(updatedPartner);
  }
}
