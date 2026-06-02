import type { ReactNode } from "react";
import type { Question } from "@/types/question";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { QuestionAccordionDetails } from "./question-accordion-details";
import { QuestionMeta } from "./question-meta";
import { SaveButton } from "./save-button";

interface QuestionBrowseAccordionProps {
  questions: Question[];
  /** Extra badges or labels above the question stem in each row */
  renderTriggerPrefix?: (question: Question) => ReactNode;
  /** Show save control on expanded content (e.g. saved questions page) */
  showSaveButton?: boolean;
  /** Controlled open items (questionKey values) */
  openValues?: string[];
  onOpenValuesChange?: (values: string[]) => void;
  /** DOM id prefix for scroll targets: `{scrollIdPrefix}-{questionKey}` */
  scrollIdPrefix?: string;
}

export function QuestionBrowseAccordion({
  questions,
  renderTriggerPrefix,
  showSaveButton = false,
  openValues,
  onOpenValuesChange,
  scrollIdPrefix,
}: QuestionBrowseAccordionProps) {
  const controlled =
    openValues !== undefined && onOpenValuesChange !== undefined;

  const itemClassName =
    "rounded-xl border bg-card shadow-sm overflow-hidden not-last:border-b-0";
  const triggerClassName =
    "px-4 py-4 w-full cursor-pointer hover:bg-muted/40 hover:no-underline";
  const contentClassName = "border-t bg-muted/20";

  return (
    <Accordion
      multiple
      className="flex w-full flex-col gap-3"
      {...(controlled
        ? {
            value: openValues,
            onValueChange: (value) => {
              onOpenValuesChange(Array.isArray(value) ? value : []);
            },
          }
        : {})}
    >
      {questions.map((q) => (
        <AccordionItem
          key={q.questionKey}
          value={q.questionKey}
          id={
            scrollIdPrefix
              ? `${scrollIdPrefix}-${q.questionKey}`
              : undefined
          }
          className={cn(
            itemClassName,
            scrollIdPrefix ? "scroll-mt-24" : undefined
          )}
        >
          <AccordionTrigger className={triggerClassName}>
            <div className="min-w-0 flex-1 text-left">
              <div className="flex flex-col gap-2">
                {renderTriggerPrefix?.(q)}
                <QuestionMeta question={q} />
                <span className="line-clamp-3 font-normal text-foreground">
                  {q.questionText}
                </span>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className={contentClassName}>
            <div className="flex flex-col gap-4 p-4">
              {showSaveButton ? (
                <div className="flex justify-end">
                  <SaveButton question={q} />
                </div>
              ) : null}
              <QuestionAccordionDetails question={q} />
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
