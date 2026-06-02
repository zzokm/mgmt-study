"use client";

import type { Question } from "@/types/question";
import { AnalyticsEvents } from "@/lib/analytics-events";
import { questionAnalyticsParams, trackEvent } from "@/lib/analytics";
import { lecturePageUrl } from "@/lib/slide-ref";
import { LinkButton } from "@/components/ui/link-button";
import { cn } from "@/lib/utils";
import { ExternalLinkIcon } from "lucide-react";

interface OpenSlideLinkProps {
  question: Question;
  pageNum: number;
  className?: string;
}

export function OpenSlideLink({ question, pageNum, className }: OpenSlideLinkProps) {
  const parsed = question.slideRefParsed;
  if (parsed.kind !== "slides") return null;

  return (
    <LinkButton
      href={lecturePageUrl(parsed.lectureId, pageNum)}
      variant="outline"
      size="sm"
      target="_blank"
      rel="noopener noreferrer"
      className={cn("h-7 shrink-0 px-2.5 text-xs", className)}
      onClick={() =>
        trackEvent(AnalyticsEvents.slideLinkClick, {
          ...questionAnalyticsParams(question),
          lecture_id: parsed.lectureId,
          slide_page: pageNum,
          link_type: "slide",
        })
      }
    >
      <ExternalLinkIcon data-icon="inline-start" className="size-3" />
      Open slide {pageNum}
    </LinkButton>
  );
}

interface OpenFullLectureLinkProps {
  question: Question;
  className?: string;
}

export function OpenFullLectureLink({ question, className }: OpenFullLectureLinkProps) {
  const parsed = question.slideRefParsed;
  if (parsed.kind !== "all") return null;

  return (
    <LinkButton
      href={`/lectures/${parsed.lectureId}/`}
      variant="outline"
      size="sm"
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() =>
        trackEvent(AnalyticsEvents.slideLinkClick, {
          ...questionAnalyticsParams(question),
          lecture_id: parsed.lectureId,
          link_type: "full_lecture",
        })
      }
    >
      <ExternalLinkIcon data-icon="inline-start" />
      Open full lecture
    </LinkButton>
  );
}
