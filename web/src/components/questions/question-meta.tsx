import type { Question } from "@/types/question";
import { Badge } from "@/components/ui/badge";

export function QuestionMeta({ question }: { question: Question }) {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge variant="secondary">{question.origin}</Badge>
      <Badge variant="outline">{question.questionType === "true_false" ? "T/F" : "MCQ"}</Badge>
      {question.instanceCount != null && question.instanceCount > 1 && (
        <Badge>Repeated ×{question.instanceCount}</Badge>
      )}
      <Badge variant="outline" className="max-w-full truncate font-normal">
        {question.topic}
      </Badge>
    </div>
  );
}
