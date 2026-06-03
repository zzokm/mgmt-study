"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import {
  BookmarkIcon,
  BookOpenIcon,
  BrainIcon,
  FileTextIcon,
  GraduationCapIcon,
  HomeIcon,
  LayersIcon,
  PresentationIcon,
  MessageSquareIcon,
  RepeatIcon,
} from "lucide-react";
import { FEEDBACK_FORM_TOOLTIP, FEEDBACK_FORM_URL } from "@/lib/site-links";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
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
import { GitHubIcon } from "@/components/icons/github-icon";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type NavItem = { href: string; label: string; icon: LucideIcon };

const navSections: { label: string; items: NavItem[] }[] = [
  {
    label: "Home",
    items: [{ href: "/", label: "Home", icon: HomeIcon }],
  },
  {
    label: "Materials",
    items: [
      { href: "/lectures/", label: "Lecture slides", icon: PresentationIcon },
      { href: "/book/", label: "Textbook chapters", icon: BookOpenIcon },
    ],
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
              Management Study
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
            <SidebarGroup>
              <SidebarGroupLabel>
                Feedback
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <Tooltip>
                      <TooltipTrigger
                        render={
                          <SidebarMenuButton
                            render={
                              <a
                                href={FEEDBACK_FORM_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                              />
                            }
                          />
                        }
                      >
                        <MessageSquareIcon />
                        <span>
                          Feedback <span aria-hidden="true">⭐</span>
                        </span>
                      </TooltipTrigger>
                      <TooltipContent side="right" className="max-w-xs">
                        {FEEDBACK_FORM_TOOLTIP}
                      </TooltipContent>
                    </Tooltip>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="mt-auto border-t border-sidebar-border px-4 py-3">
            <a
              href="https://github.com/zzokm"
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 text-xs text-muted-foreground/80 transition-colors hover:text-muted-foreground"
            >
              <GitHubIcon />
              <span>Made By Yehia</span>
            </a>
          </SidebarFooter>
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
