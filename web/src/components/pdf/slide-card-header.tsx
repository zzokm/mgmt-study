"use client";

import type { Question } from "@/types/question";
import { OpenSlideLink } from "@/components/questions/reference-slide-links";
import { Button } from "@/components/ui/button";
import { SlideChapterHeading } from "./slide-chapter-heading";
import { cn } from "@/lib/utils";
import { Maximize2Icon } from "lucide-react";

interface SlideCardHeaderProps {
  question: Question;
  topic: string;
  pageNum: number;
  compact?: boolean;
  onFullscreen: () => void;
}

/** Title left, open-slide dead center, fullscreen right. */
export function SlideCardHeader({
  question,
  topic,
  pageNum,
  compact = false,
  onFullscreen,
}: SlideCardHeaderProps) {
  return (
    <div
      className={cn(
        "relative flex items-center border-b bg-muted/50",
        compact ? "min-h-9 px-2.5" : "min-h-10 px-3"
      )}
    >
      <div className="relative z-[1] flex max-w-[42%] min-w-0 items-center self-stretch py-1">
        <SlideChapterHeading
          topic={topic}
          pageNumber={pageNum}
          size={compact ? "xs" : "sm"}
        />
      </div>

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <OpenSlideLink
          question={question}
          pageNum={pageNum}
          className="pointer-events-auto"
        />
      </div>

      <div className="absolute inset-y-0 right-0 z-[1] flex items-center pr-1.5 sm:pr-2">
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className="size-7 shrink-0 hover:bg-zinc-300/90 dark:hover:bg-zinc-600/80"
          aria-label={`Open slide ${pageNum} in full viewer`}
          title="Full screen"
          onClick={onFullscreen}
        >
          <Maximize2Icon className="size-3.5" />
        </Button>
      </div>
    </div>
  );
}
