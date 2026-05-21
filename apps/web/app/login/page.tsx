import Link from "next/link";
import { Button, Card, PasswordInput, Stack, Text, TextInput, Title } from "@mantine/core";

export default function LoginPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md items-center px-6 py-10">
      <Card radius="lg" p="xl" className="w-full border border-white/20 bg-white/5">
        <Stack gap="sm">
          <Title order={1} c="white">Platform Login</Title>
          <Text c="rgba(255,255,255,0.75)">
            Use your institutional credentials to access the International CRM dashboard.
          </Text>
          <TextInput label="Email" placeholder="name@internationalcrm.edu" />
          <PasswordInput label="Password" placeholder="Enter your password" />
          <Link href="/dashboard">
            <Button color="indigo" fullWidth>
              Sign In
            </Button>
          </Link>
          <Text c="rgba(255,255,255,0.65)" size="sm">
            Demo route enabled for development. Authentication hardening continues in upcoming checkpoints.
          </Text>
        </Stack>
      </Card>
    </main>
  );
}
