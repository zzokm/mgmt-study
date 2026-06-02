"use client";

import type { Question } from "@/types/question";
import {
  getAttempt,
  isAttemptCorrect,
  isAttemptWrong,
  type PracticeProgress,
} from "@/lib/practice-progress";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { QuestionAccordionDetails } from "@/components/questions/question-accordion-details";
import { QuestionMeta } from "@/components/questions/question-meta";
import { cn } from "@/lib/utils";
import { CircleCheckIcon, CircleXIcon, MinusCircleIcon } from "lucide-react";

interface PracticeResultsAccordionProps {
  questions: Question[];
  progress: PracticeProgress;
  mistakesOnly: boolean;
}

function statusFor(question: Question, progress: PracticeProgress) {
  const attempt = getAttempt(progress, question.questionKey);
  if (!attempt.revealed || !attempt.selectedId) {
    return "skipped" as const;
  }
  if (isAttemptCorrect(question, attempt)) return "correct" as const;
  return "wrong" as const;
}

export function PracticeResultsAccordion({
  questions,
  progress,
  mistakesOnly,
}: PracticeResultsAccordionProps) {
  const visible = mistakesOnly
    ? questions.filter((q) => isAttemptWrong(q, getAttempt(progress, q.questionKey)))
    : questions;

  if (visible.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        {mistakesOnly
          ? "No incorrect answers — great job!"
          : "No questions in this result."}
      </p>
    );
  }

  const itemClassName =
    "rounded-xl border bg-card shadow-sm overflow-hidden not-last:border-b-0";
  const triggerClassName =
    "px-4 py-4 w-full cursor-pointer hover:bg-muted/40 hover:no-underline";
  const contentClassName = "border-t bg-muted/20";

  return (
    <Accordion multiple className="flex w-full flex-col gap-3">
      {visible.map((q) => {
        const attempt = getAttempt(progress, q.questionKey);
        const status = statusFor(q, progress);
        const selectedLabel =
          q.options.find((o) => o.id === attempt.selectedId)?.content ??
          attempt.selectedId ??
          "—";

        return (
          <AccordionItem key={q.questionKey} value={q.questionKey} className={itemClassName}>
            <AccordionTrigger className={triggerClassName}>
              <div className="min-w-0 flex-1 text-left">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    {status === "correct" ? (
                      <Badge className="gap-1 border-green-600/30 bg-green-500/15 text-green-800 dark:text-green-300">
                        <CircleCheckIcon className="size-3.5" />
                        Correct
                      </Badge>
                    ) : status === "wrong" ? (
                      <Badge
                        variant="destructive"
                        className="gap-1 bg-red-500/15 text-red-800 dark:text-red-300"
                      >
                        <CircleXIcon className="size-3.5" />
                        Incorrect
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="gap-1">
                        <MinusCircleIcon className="size-3.5" />
                        Not answered
                      </Badge>
                    )}
                    <span className="text-xs text-muted-foreground">
                      Your answer:{" "}
                      <span
                        className={cn(
                          "font-medium",
                          status === "correct" && "text-green-700 dark:text-green-400",
                          status === "wrong" && "text-red-700 dark:text-red-400"
                        )}
                      >
                        {selectedLabel}
                      </span>
                    </span>
                  </div>
                  <QuestionMeta question={q} />
                  <span className="line-clamp-3 font-normal text-foreground">
                    {q.questionText}
                  </span>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className={contentClassName}>
              <div className="p-4">
                <QuestionAccordionDetails question={q} />
              </div>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
