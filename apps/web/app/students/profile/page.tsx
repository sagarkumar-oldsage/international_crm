import { Badge, Card, Group, Stack, Text, Title } from "@mantine/core";
import type { StudentProfileDto } from "@contracts/index";
import { getStudentProfile } from "../../../lib/api";

const fallbackProfile: StudentProfileDto = {
  id: "student-1",
  fullName: "Aarav Sharma",
  email: "student@internationalcrm.edu",
  program: "B.Tech Computer Science",
  cgpa: 8.7,
  languageScore: "IELTS 7.5",
  destinationPreferences: ["Germany", "Canada", "Japan"],
  budgetBand: "Medium"
};

export default async function StudentProfilePage() {
  const profile = (await getStudentProfile("student-1")) ?? fallbackProfile;

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-10 md:px-8">
      <Stack gap="md">
        <Title order={1} c="white">
          Student Global Profile
        </Title>
        <Text c="rgba(255,255,255,0.75)">
          Profile snapshot for mobility applications, scholarship screening, and advisor review.
        </Text>

        <Card radius="lg" p="lg" className="border border-white/20 bg-white/5">
          <Stack gap="xs">
            <Text c="white" fw={600} size="lg">
              {profile.fullName}
            </Text>
            <Text c="rgba(255,255,255,0.75)">{profile.email}</Text>
            <Text c="rgba(255,255,255,0.9)">Program: {profile.program}</Text>
            <Text c="rgba(255,255,255,0.9)">CGPA: {profile.cgpa}</Text>
            <Text c="rgba(255,255,255,0.9)">Language: {profile.languageScore}</Text>
            <Text c="rgba(255,255,255,0.9)">Budget Band: {profile.budgetBand}</Text>
            <Group mt="sm" gap="xs">
              {profile.destinationPreferences.map((country) => (
                <Badge key={country} variant="light" color="indigo">
                  {country}
                </Badge>
              ))}
            </Group>
          </Stack>
        </Card>
      </Stack>
    </main>
  );
}
