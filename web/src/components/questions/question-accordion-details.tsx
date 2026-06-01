import type { Question } from "@/types/question";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { QuestionExamAppearances } from "./question-exam-appearances";

interface QuestionAccordionDetailsProps {
  question: Question;
  className?: string;
}

/** Answer, explanation, and textual reference (never raw slideRef tags). */
export function QuestionAccordionDetails({
  question,
  className,
}: QuestionAccordionDetailsProps) {
  return (
    <div className={cn("flex flex-col gap-3 text-muted-foreground", className)}>
      <QuestionExamAppearances question={question} variant="detailed" />
      <p>
        <span className="font-medium text-foreground">Answer:</span>{" "}
        <Badge variant="secondary">{question.correctAnswerId}</Badge>
      </p>
      {question.explanation ? (
        <p className="text-sm leading-relaxed">{question.explanation}</p>
      ) : null}
      {question.reference ? (
        <p className="text-sm leading-relaxed">
          <span className="font-medium text-foreground">Reference:</span>{" "}
          {question.reference}
        </p>
      ) : null}
    </div>
  );
}
