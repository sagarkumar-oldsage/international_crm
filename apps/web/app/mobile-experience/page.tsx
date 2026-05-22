import { Badge, Card, Group, SimpleGrid, Stack, Table, Text, Title } from "@mantine/core";
import type { MobileAnnouncementDto, MobileExperienceSummaryDto, MobileFeedbackDto } from "@contracts/index";
import { MobileExperienceWorkflowPanel } from "../../components/mobile-experience-workflow-panel";
import { getMobileAnnouncements, getMobileExperienceSummary, getMobileFeedback } from "../../lib/api";

const fallbackAnnouncements: MobileAnnouncementDto[] = [
  { id: "mob-ann-1", title: "In-app Document Scanner Upgrade", body: "Improved OCR support for passport and visa pages.", audience: "All Students", publishedAt: "2026-05-20" }
];
const fallbackFeedback: MobileFeedbackDto[] = [
  { id: "mob-fb-1", studentProfileId: "student-1", featureArea: "Notifications", feedback: "Need timezone-aware reminders.", rating: 4, status: "UNDER_REVIEW", createdAt: "2026-05-18" }
];
const fallbackSummary: MobileExperienceSummaryDto = { activeAnnouncements: 2, feedbackTickets: 2, averageRating: 4.5, resolvedFeedback: 0 };

export default async function MobileExperiencePage() {
  const announcements = (await getMobileAnnouncements()) ?? fallbackAnnouncements;
  const feedbackItems = (await getMobileFeedback("student-1")) ?? fallbackFeedback;
  const summary = (await getMobileExperienceSummary("student-1")) ?? fallbackSummary;

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10 md:px-8"><Stack gap="md"><Group justify="space-between"><div><Title order={1} c="white">Mobile and Student Experience</Title><Text c="rgba(255,255,255,0.75)">Enhance student mobile journeys and collect product feedback.</Text></div><Badge color="indigo" variant="filled">Module 14</Badge></Group><SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="md"><Card radius="lg" p="lg" className="border border-white/20 bg-white/5"><Text c="rgba(255,255,255,0.7)" size="sm">Announcements</Text><Title order={3} c="white">{summary.activeAnnouncements}</Title></Card><Card radius="lg" p="lg" className="border border-white/20 bg-white/5"><Text c="rgba(255,255,255,0.7)" size="sm">Feedback Items</Text><Title order={3} c="white">{summary.feedbackTickets}</Title></Card><Card radius="lg" p="lg" className="border border-white/20 bg-white/5"><Text c="rgba(255,255,255,0.7)" size="sm">Avg Rating</Text><Title order={3} c="white">{summary.averageRating}</Title></Card><Card radius="lg" p="lg" className="border border-white/20 bg-white/5"><Text c="rgba(255,255,255,0.7)" size="sm">Resolved</Text><Title order={3} c="white">{summary.resolvedFeedback}</Title></Card></SimpleGrid><Card radius="lg" p="lg" className="border border-white/20 bg-white/5"><Title order={3} c="white" mb="sm">Mobile Announcements</Title><Table highlightOnHover><thead><tr><th>Title</th><th>Audience</th><th>Published</th><th>Details</th></tr></thead><tbody>{announcements.map((item) => <tr key={item.id}><td>{item.title}</td><td>{item.audience}</td><td>{item.publishedAt}</td><td>{item.body}</td></tr>)}</tbody></Table></Card><Card radius="lg" p="lg" className="border border-white/20 bg-white/5"><Title order={3} c="white" mb="sm">Feedback Queue</Title><Table highlightOnHover><thead><tr><th>Feature Area</th><th>Rating</th><th>Status</th><th>Feedback</th></tr></thead><tbody>{feedbackItems.map((item) => <tr key={item.id}><td>{item.featureArea}</td><td>{item.rating}</td><td>{item.status}</td><td>{item.feedback}</td></tr>)}</tbody></Table></Card><MobileExperienceWorkflowPanel studentId="student-1" feedbackItems={feedbackItems} /></Stack></main>
  );
}
