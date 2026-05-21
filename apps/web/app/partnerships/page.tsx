import { Badge, Card, Group, SimpleGrid, Stack, Table, Text, Title } from "@mantine/core";
import type {
  MouStatusDto,
  PartnerUniversityDto,
  PartnershipsSummaryDto
} from "@contracts/index";
import { PartnershipWorkflowPanel } from "../../components/partnership-workflow-panel";
import { getPartnerUniversities, getPartnershipsSummary } from "../../lib/api";

const fallbackPartners: PartnerUniversityDto[] = [
  {
    id: "partner-1",
    name: "Technical University of Munich",
    country: "Germany",
    city: "Munich",
    website: "https://www.tum.de",
    contactPersonName: "Dr. Anna Fischer",
    contactPersonEmail: "anna.fischer@tum.example",
    collaborationAreas: ["Student Exchange", "Research Collaboration", "Summer School"],
    mouStatus: "ACTIVE",
    renewalDate: "2027-03-15",
    mobilityQuota: 12,
    jointPrograms: ["AI Mobility Semester", "Industry Research Residency"],
    notes: "Priority partner for engineering mobility tracks"
  },
  {
    id: "partner-2",
    name: "University of British Columbia",
    country: "Canada",
    city: "Vancouver",
    website: "https://www.ubc.ca",
    contactPersonName: "Prof. Liam Carter",
    contactPersonEmail: "liam.carter@ubc.example",
    collaborationAreas: ["Faculty Exchange", "Joint Conference"],
    mouStatus: "RENEWAL_DUE",
    renewalDate: "2026-07-01",
    mobilityQuota: 8,
    jointPrograms: ["Global Innovation Forum"],
    notes: "Renewal in legal review stage"
  }
];

const fallbackSummary: PartnershipsSummaryDto = {
  totalPartners: 2,
  activeMous: 1,
  renewalsDueSoon: 1,
  countriesCovered: 2,
  totalMobilityQuota: 20
};

function mouStatusColor(status: MouStatusDto) {
  if (status === "ACTIVE") {
    return "teal";
  }

  if (status === "RENEWAL_DUE" || status === "UNDER_REVIEW") {
    return "yellow";
  }

  if (status === "EXPIRED" || status === "ARCHIVED") {
    return "red";
  }

  return "indigo";
}

export default async function PartnershipsPage() {
  const partners = (await getPartnerUniversities()) ?? fallbackPartners;
  const summary = (await getPartnershipsSummary()) ?? fallbackSummary;

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10 md:px-8">
      <Stack gap="md">
        <Group justify="space-between">
          <div>
            <Title order={1} c="white">
              Partner University CRM
            </Title>
            <Text c="rgba(255,255,255,0.75)">
              Track institutional partnerships, MoU lifecycle, and mobility capacity from one workspace.
            </Text>
          </div>
          <Badge color="indigo" variant="filled">
            {partners.length} Partners
          </Badge>
        </Group>

        <SimpleGrid cols={{ base: 1, sm: 2, lg: 5 }} spacing="md">
          <Card radius="lg" p="lg" className="border border-white/20 bg-white/5">
            <Text c="rgba(255,255,255,0.7)" size="sm">Partners</Text>
            <Title order={2} c="white">{summary.totalPartners}</Title>
          </Card>
          <Card radius="lg" p="lg" className="border border-white/20 bg-white/5">
            <Text c="rgba(255,255,255,0.7)" size="sm">Active MoUs</Text>
            <Title order={2} c="white">{summary.activeMous}</Title>
          </Card>
          <Card radius="lg" p="lg" className="border border-white/20 bg-white/5">
            <Text c="rgba(255,255,255,0.7)" size="sm">Renewals Due</Text>
            <Title order={2} c="white">{summary.renewalsDueSoon}</Title>
          </Card>
          <Card radius="lg" p="lg" className="border border-white/20 bg-white/5">
            <Text c="rgba(255,255,255,0.7)" size="sm">Countries</Text>
            <Title order={2} c="white">{summary.countriesCovered}</Title>
          </Card>
          <Card radius="lg" p="lg" className="border border-white/20 bg-white/5">
            <Text c="rgba(255,255,255,0.7)" size="sm">Mobility Quota</Text>
            <Title order={2} c="white">{summary.totalMobilityQuota}</Title>
          </Card>
        </SimpleGrid>

        <PartnershipWorkflowPanel partners={partners} />

        <Card radius="lg" p="lg" className="border border-white/20 bg-white/5">
          <Table highlightOnHover>
            <thead>
              <tr>
                <th>University</th>
                <th>Location</th>
                <th>MoU Status</th>
                <th>Renewal</th>
                <th>Quota</th>
                <th>Collaboration</th>
              </tr>
            </thead>
            <tbody>
              {partners.map((partner) => (
                <tr key={partner.id}>
                  <td>
                    <Stack gap={2}>
                      <Text c="white">{partner.name}</Text>
                      <Text c="rgba(255,255,255,0.7)" size="sm">{partner.contactPersonName}</Text>
                    </Stack>
                  </td>
                  <td>{partner.city}, {partner.country}</td>
                  <td>
                    <Badge color={mouStatusColor(partner.mouStatus)} variant="light">
                      {partner.mouStatus}
                    </Badge>
                  </td>
                  <td>{partner.renewalDate ?? "N/A"}</td>
                  <td>{partner.mobilityQuota}</td>
                  <td>{partner.collaborationAreas.join(", ")}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      </Stack>
    </main>
  );
}
