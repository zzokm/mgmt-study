"use client";

import { useState } from "react";
import type { Question } from "@/types/question";
import { AnalyticsEvents } from "@/lib/analytics-events";
import { questionAnalyticsParams, trackEvent } from "@/lib/analytics";
import { getCorrectAnswerDisplay } from "@/lib/questions";
import { lecturePageUrl, pagesForDisplay } from "@/lib/slide-ref";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LinkButton } from "@/components/ui/link-button";
import { SlidePanel } from "@/components/pdf/slide-panel-dynamic";
import { cn } from "@/lib/utils";
import { ChevronDownIcon, ExternalLinkIcon } from "lucide-react";

interface QuestionDetailSectionsProps {
  question: Question;
  className?: string;
}

function ReferenceSlideLinks({ question }: { question: Question }) {
  const parsed = question.slideRefParsed;

  if (parsed.kind === "course") {
    return (
      <p className="text-sm text-muted-foreground">
        General course context — no specific slide reference.
      </p>
    );
  }

  if (parsed.kind === "all") {
    return (
      <LinkButton
        href={`/lectures/${parsed.lectureId}/`}
        variant="outline"
        size="sm"
        target="_blank"
        rel="noopener noreferrer"
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

  const pages = parsed.pages;
  if (pages.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {pages.map((pageNum) => (
        <LinkButton
          key={pageNum}
          href={lecturePageUrl(parsed.lectureId, pageNum)}
          variant="outline"
          size="sm"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            trackEvent(AnalyticsEvents.slideLinkClick, {
              ...questionAnalyticsParams(question),
              lecture_id: parsed.lectureId,
              slide_page: pageNum,
              link_type: "slide",
            })
          }
        >
          <ExternalLinkIcon data-icon="inline-start" />
          Open slide {pageNum}
        </LinkButton>
      ))}
    </div>
  );
}

function ReferenceSlidePreview({ question }: { question: Question }) {
  const parsed = question.slideRefParsed;
  const displayPages = pagesForDisplay(parsed);
  const showPreview =
    parsed.kind === "course" ||
    parsed.kind === "all" ||
    (parsed.kind === "slides" && displayPages.length > 0);
  const [open, setOpen] = useState(false);

  if (!showPreview) return null;

  return (
    <div className="rounded-lg border bg-muted/30">
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="h-auto w-full justify-between rounded-lg px-3 py-2.5 font-medium text-foreground hover:bg-muted/50"
        onClick={() => {
          setOpen((v) => {
            const next = !v;
            trackEvent(
              next
                ? AnalyticsEvents.slidePreviewOpen
                : AnalyticsEvents.slidePreviewClose,
              {
                ...questionAnalyticsParams(question),
                lecture_id: parsed.lectureId,
              }
            );
            return next;
          });
        }}
        aria-expanded={open}
      >
        <span>Show referenced slides</span>
        <ChevronDownIcon
          className={cn(
            "size-4 shrink-0 text-muted-foreground transition-transform",
            open && "rotate-180"
          )}
        />
      </Button>
      {open ? (
        <div className="border-t px-3 pb-3 pt-3">
          <SlidePanel slideRefParsed={parsed} />
        </div>
      ) : null}
    </div>
  );
}

export function QuestionDetailSections({
  question,
  className,
}: QuestionDetailSectionsProps) {
  const answer = getCorrectAnswerDisplay(question);
  const parsed = question.slideRefParsed;

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <Card size="sm">
        <CardHeader>
          <CardTitle>Answer</CardTitle>
          <CardDescription>Correct response</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">{answer.id}</Badge>
            <span className="leading-relaxed text-foreground">{answer.label}</span>
          </div>
        </CardContent>
      </Card>

      {question.explanation ? (
        <Card size="sm">
          <CardHeader>
            <CardTitle>Explanation</CardTitle>
            <CardDescription>Why this is the correct answer</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="leading-relaxed text-foreground">{question.explanation}</p>
          </CardContent>
        </Card>
      ) : null}

      {question.reference ? (
        <Card size="sm">
          <CardHeader>
            <CardTitle>Reference</CardTitle>
            <CardDescription>
              {parsed.topic
                ? `Source in ${parsed.topic}`
                : "Source in course materials"}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <p className="leading-relaxed text-muted-foreground">
              {question.reference}
            </p>
            <ReferenceSlideLinks question={question} />
            <ReferenceSlidePreview question={question} />
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}
