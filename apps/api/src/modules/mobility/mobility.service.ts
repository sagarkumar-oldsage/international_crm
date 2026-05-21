import { Injectable } from "@nestjs/common";

@Injectable()
export class MobilityService {
  getMvpOverview() {
    return {
      activeApplications: 248,
      visaSuccessRate: 91.2,
      partnerUniversities: 76,
      pendingDocuments: 39
    };
  }
}
