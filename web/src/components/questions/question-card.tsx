"use client";

import type { Question } from "@/types/question";
import { isAnswerCorrect } from "@/lib/questions";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { QuestionMeta } from "./question-meta";

interface QuestionCardProps {
  question: Question;
  selectedId: string | null;
  onSelect: (id: string) => void;
  revealed: boolean;
  disabled?: boolean;
}

export function QuestionCard({
  question,
  selectedId,
  onSelect,
  revealed,
  disabled,
}: QuestionCardProps) {
  const isTf = question.questionType === "true_false";

  function optionClass(optionId: string) {
    const isSelected = selectedId === optionId;

    if (!revealed) {
      if (isSelected) {
        return "border-2 border-black ring-2 ring-black outline outline-2 outline-black";
      }
      return "";
    }

    const isCorrect = isAnswerCorrect(optionId, question.correctAnswerId);

    if (isCorrect) {
      return cn(
        "border-green-600 bg-green-500/15 ring-2 ring-green-600/80 dark:bg-green-500/20",
        isSelected ? "text-green-950 dark:text-green-50" : "text-green-900 dark:text-green-100"
      );
    }
    if (isSelected) {
      return "border-red-600 bg-red-500/15 ring-2 ring-red-600/80 text-red-950 dark:bg-red-500/20 dark:text-red-50";
    }
    return "opacity-50";
  }

  if (isTf) {
    return (
      <div className="flex flex-col gap-6">
        <QuestionMeta question={question} />
        <p className="text-lg leading-relaxed">{question.questionText}</p>
        <div className="flex flex-col gap-3 sm:flex-row">
          {question.options.map((opt) => (
            <Button
              key={opt.id}
              type="button"
              variant="outline"
              size="lg"
              disabled={disabled || revealed}
              className={cn("flex-1 h-auto py-4", optionClass(opt.id))}
              onClick={() => onSelect(opt.id)}
            >
              {opt.content}
            </Button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <QuestionMeta question={question} />
      <p className="text-lg leading-relaxed">{question.questionText}</p>
      <RadioGroup
        value={selectedId ?? undefined}
        onValueChange={onSelect}
        className="flex flex-col gap-3"
        disabled={disabled || revealed}
      >
        {question.options.map((opt) => (
          <div
            key={opt.id}
            className={cn(
              "flex items-start gap-3 rounded-lg border p-4 transition-colors",
              optionClass(opt.id)
            )}
          >
            <RadioGroupItem value={opt.id} id={`${question.questionKey}-${opt.id}`} />
            <Label
              htmlFor={`${question.questionKey}-${opt.id}`}
              className="cursor-pointer text-base leading-snug font-normal"
            >
              <span className="font-medium text-muted-foreground mr-2">{opt.id}.</span>
              {opt.content}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
