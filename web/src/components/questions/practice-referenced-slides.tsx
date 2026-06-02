"use client";

import type { Question } from "@/types/question";
import { questionHasReferencedSlidePreview } from "@/lib/referenced-slides";
import { SlidePanel } from "@/components/pdf/slide-panel-dynamic";
import { cn } from "@/lib/utils";

interface PracticeReferencedSlidesProps {
  question: Question;
  className?: string;
}

/** Practice after check: always expanded, flat section under reference text. */
export function PracticeReferencedSlides({
  question,
  className,
}: PracticeReferencedSlidesProps) {
  const parsed = question.slideRefParsed;

  if (!questionHasReferencedSlidePreview(question)) return null;

  return (
    <section
      className={cn(
        "flex flex-col gap-4 border-t border-border/60 pt-5",
        className
      )}
      aria-label="Referenced slides"
    >
      <h4 className="text-sm font-medium tracking-tight text-foreground">
        Referenced slides
      </h4>

      <SlidePanel
        slideRefParsed={parsed}
        question={question}
        density="compact"
      />
    </section>
  );
}
