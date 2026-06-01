import type { ReactNode } from "react";
import type { Question } from "@/types/question";
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

  return (
    <Accordion
      multiple
      className="w-full"
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
          className={scrollIdPrefix ? "scroll-mt-24" : undefined}
        >
          <AccordionTrigger className="hover:no-underline">
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
          <AccordionContent>
            <div className="relative">
              {showSaveButton ? (
                <div className="absolute top-0 right-0 z-10">
                  <SaveButton question={q} corner />
                </div>
              ) : null}
              <QuestionAccordionDetails
                question={q}
                className={showSaveButton ? "pr-28" : undefined}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
