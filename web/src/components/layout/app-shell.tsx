"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import {
  BookOpenIcon,
  BookmarkIcon,
  BrainIcon,
  FileTextIcon,
  GraduationCapIcon,
  HomeIcon,
  LayersIcon,
  PresentationIcon,
  RepeatIcon,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { TooltipProvider } from "@/components/ui/tooltip";

type NavItem = { href: string; label: string; icon: LucideIcon };

const navSections: { label: string; items: NavItem[] }[] = [
  {
    label: "Home",
    items: [{ href: "/", label: "Home", icon: HomeIcon }],
  },
  {
    label: "Lectures",
    items: [{ href: "/lectures/", label: "Lecture slides", icon: PresentationIcon }],
  },
  {
    label: "Practice",
    items: [
      { href: "/practice/", label: "Practice", icon: BrainIcon },
      { href: "/by-lecture/", label: "By lecture", icon: BookOpenIcon },
      { href: "/by-exam/", label: "By exam", icon: GraduationCapIcon },
      { href: "/repetitive/", label: "Repetitive", icon: RepeatIcon },
      { href: "/saved/", label: "Saved", icon: BookmarkIcon },
    ],
  },
  {
    label: "Analysis",
    items: [{ href: "/analysis/", label: "Exam analysis", icon: FileTextIcon }],
  },
];

function isNavActive(pathname: string, href: string): boolean {
  const path = href.replace(/\/$/, "") || "/";
  if (path === "/") return pathname === "/" || pathname === "";
  return pathname === path || pathname.startsWith(`${path}/`);
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <TooltipProvider>
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader className="border-b border-sidebar-border px-4 py-4">
            <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
              <LayersIcon className="size-5" />
              Mgmt Study
            </Link>
            <p className="text-xs text-muted-foreground">Management finals prep</p>
          </SidebarHeader>
          <SidebarContent>
            {navSections.map((section) => (
              <SidebarGroup key={section.label}>
                <SidebarGroupLabel>{section.label}</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {section.items.map((item) => (
                      <SidebarMenuItem key={item.href}>
                        <SidebarMenuButton
                          render={<Link href={item.href} />}
                          isActive={isNavActive(pathname, item.href)}
                        >
                          <item.icon />
                          <span>{item.label}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))}
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
          <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <span className="text-sm font-medium text-muted-foreground">
              Management Study Site
            </span>
          </header>
          <main className="flex-1 p-4 md:p-6">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
