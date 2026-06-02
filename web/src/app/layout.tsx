import type { Metadata } from "next";
import { Suspense } from "react";
import { Bricolage_Grotesque } from "next/font/google";
import { AnalyticsEngagement } from "@/components/analytics/analytics-engagement";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { AppShell } from "@/components/layout/app-shell";
import "./globals.css";

const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-bricolage-grotesque",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Management Study",
  description: "Management final exam study — questions, lectures, and practice",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bricolageGrotesque.variable} ${bricolageGrotesque.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <Suspense fallback={null}>
          <GoogleAnalytics />
          <AnalyticsEngagement />
        </Suspense>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
