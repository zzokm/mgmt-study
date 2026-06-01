import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
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
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
