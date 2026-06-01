"use client";

import { useState } from "react";
import Link from "next/link";
import type { LectureMeta } from "@/types/question";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

interface LectureSlidesSidebarProps {
  lectures: LectureMeta[];
  currentLectureId: string;
}

export function LectureSlidesSidebar({
  lectures,
  currentLectureId,
}: LectureSlidesSidebarProps) {
  const [expanded, setExpanded] = useState(false);

  if (!expanded) {
    return (
      <aside
        className="flex h-full w-3 shrink-0 border-l bg-muted/40"
        aria-label="Lecture list collapsed"
      >
        <Button
          type="button"
          variant="ghost"
          className="h-full w-full min-w-0 rounded-none px-0 hover:bg-muted"
          onClick={() => setExpanded(true)}
          aria-expanded={false}
          aria-label="Expand lecture list"
          title="Lectures"
        >
          <ChevronLeftIcon className="size-3.5 shrink-0" />
        </Button>
      </aside>
    );
  }

  return (
    <aside
      className="flex h-full w-56 shrink-0 border-l bg-muted/40 transition-[width] duration-200 ease-out"
      aria-label="All lectures"
    >
      <div className="flex h-full min-h-0 w-full">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-full w-9 shrink-0 rounded-none border-r bg-muted/50 hover:bg-muted"
          onClick={() => setExpanded(false)}
          aria-expanded
          aria-label="Collapse lecture list"
          title="Collapse"
        >
          <ChevronRightIcon className="size-4" />
        </Button>

        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          <div className="border-b px-3 py-2.5">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Lectures
            </h2>
          </div>
          <ScrollArea className="min-h-0 flex-1">
            <nav className="flex flex-col gap-0.5 p-2">
              {lectures.map((lec) => {
                const active = lec.lectureId === currentLectureId;
                return (
                  <Link
                    key={lec.lectureId}
                    href={`/lectures/${lec.lectureId}/`}
                    title={lec.topic}
                    className={cn(
                      "rounded-md px-2.5 py-2 text-left text-sm leading-snug transition-colors",
                      active
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground hover:bg-muted"
                    )}
                    aria-current={active ? "page" : undefined}
                  >
                    <span className="line-clamp-2 font-medium">{lec.topic}</span>
                    <span
                      className={cn(
                        "mt-0.5 block text-xs",
                        active
                          ? "text-primary-foreground/80"
                          : "text-muted-foreground"
                      )}
                    >
                      {lec.pageCount} slides
                    </span>
                  </Link>
                );
              })}
            </nav>
          </ScrollArea>
        </div>
      </div>
    </aside>
  );
}
