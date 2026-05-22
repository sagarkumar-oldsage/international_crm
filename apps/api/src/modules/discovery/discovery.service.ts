import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateShortlistDto } from "./dto/create-shortlist.dto";
import {
  DiscoveryShortlistDto,
  DiscoverySummaryDto,
  UniversityDiscoveryDto
} from "./dto/discovery.dto";
import { UpdateShortlistStatusDto } from "./dto/update-shortlist-status.dto";

@Injectable()
export class DiscoveryService {
  private readonly universities: UniversityDiscoveryDto[] = [
    {
      id: "uni-1",
      universityName: "Technical University of Munich",
      country: "Germany",
      program: "Data Engineering",
      tuitionEstimate: 12800,
      fitLevel: "HIGH",
      intake: "Winter 2026"
    },
    {
      id: "uni-2",
      universityName: "University of Toronto",
      country: "Canada",
      program: "AI and Systems",
      tuitionEstimate: 22600,
      fitLevel: "MEDIUM",
      intake: "Fall 2026"
    },
    {
      id: "uni-3",
      universityName: "Kyoto University",
      country: "Japan",
      program: "Robotics",
      tuitionEstimate: 14900,
      fitLevel: "EMERGING",
      intake: "Spring 2027"
    }
  ];

  private readonly shortlists: DiscoveryShortlistDto[] = [
    {
      id: "shortlist-1",
      studentProfileId: "student-1",
      universityId: "uni-1",
      universityName: "Technical University of Munich",
      status: "SHORTLISTED",
      notes: "Strong fit for destination and budget"
    }
  ];

  listUniversities(): UniversityDiscoveryDto[] {
    return this.universities;
  }

  listShortlists(studentId: string): DiscoveryShortlistDto[] {
    return this.shortlists.filter((item) => item.studentProfileId === studentId);
  }

  getSummary(studentId: string): DiscoverySummaryDto {
    const shortlists = this.listShortlists(studentId);
    return {
      availableUniversities: this.universities.length,
      highFitMatches: this.universities.filter((item) => item.fitLevel === "HIGH").length,
      shortlisted: shortlists.filter((item) => item.status === "SHORTLISTED").length,
      applied: shortlists.filter((item) => item.status === "APPLIED").length
    };
  }

  createShortlist(payload: CreateShortlistDto): DiscoveryShortlistDto {
    const university = this.universities.find((item) => item.id === payload.universityId);
    if (!university) {
      throw new NotFoundException("University not found");
    }

    const created: DiscoveryShortlistDto = {
      id: `shortlist-${this.shortlists.length + 1}`,
      studentProfileId: payload.studentProfileId,
      universityId: university.id,
      universityName: university.universityName,
      status: "SHORTLISTED",
      notes: payload.notes ?? null
    };

    this.shortlists.unshift(created);
    return created;
  }

  updateShortlistStatus(shortlistId: string, payload: UpdateShortlistStatusDto): DiscoveryShortlistDto {
    const shortlist = this.shortlists.find((item) => item.id === shortlistId);
    if (!shortlist) {
      throw new NotFoundException("Shortlist entry not found");
    }

    shortlist.status = payload.status;
    shortlist.notes = payload.notes ?? shortlist.notes;
    return shortlist;
  }
}
