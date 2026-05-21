import type { Metadata } from "next";
import { Manrope, Plus_Jakarta_Sans } from "next/font/google";
import { MantineProvider, createTheme } from "@mantine/core";
import "@mantine/core/styles.css";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body"
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading"
});

// Centralized Mantine theme to keep brand colors consistent across all views.
const theme = createTheme({
  primaryColor: "indigo",
  fontFamily: "var(--font-body), sans-serif",
  headings: {
    fontFamily: "var(--font-heading), sans-serif"
  }
});

export const metadata: Metadata = {
  title: "International CRM",
  description: "Global mobility and international relations management platform"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${jakarta.variable}`}>
        <MantineProvider theme={theme}>{children}</MantineProvider>
      </body>
    </html>
  );
}
