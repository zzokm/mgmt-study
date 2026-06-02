import type { Question } from "@/types/question";
import { cn } from "@/lib/utils";
import { QuestionExamAppearances } from "./question-exam-appearances";
import { QuestionDetailSections } from "./question-detail-sections";

interface QuestionAccordionDetailsProps {
  question: Question;
  className?: string;
}

/** Answer, explanation, reference, and slide preview for browse / results views. */
export function QuestionAccordionDetails({
  question,
  className,
}: QuestionAccordionDetailsProps) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <QuestionExamAppearances
        question={question}
        variant="detailed"
        className="rounded-lg border bg-muted/30 px-4 py-3"
      />
      <QuestionDetailSections question={question} />
    </div>
  );
}
