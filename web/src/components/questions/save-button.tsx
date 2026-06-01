"use client";

import { useEffect, useState } from "react";
import type { Question } from "@/types/question";
import { Button } from "@/components/ui/button";
import { BookmarkIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  isQuestionSaved,
  toggleSavedQuestion,
} from "@/lib/saved-questions";

interface SaveButtonProps {
  question: Question;
  /** Compact control for the question card corner */
  corner?: boolean;
}

export function SaveButton({ question, corner = false }: SaveButtonProps) {
  const [saved, setSaved] = useState(() => isQuestionSaved(question.questionKey));

  useEffect(() => {
    const handler = () => setSaved(isQuestionSaved(question.questionKey));
    window.addEventListener("mgmt-saved-changed", handler);
    return () => window.removeEventListener("mgmt-saved-changed", handler);
  }, [question.questionKey]);

  const bookmarkClass = cn(
    "size-5 shrink-0 transition-colors",
    saved && "fill-amber-500 text-amber-500"
  );

  if (corner) {
    return (
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="h-auto gap-1.5 px-2 py-1.5 text-muted-foreground hover:text-foreground"
        onClick={() => setSaved(toggleSavedQuestion(question))}
        aria-pressed={saved}
        aria-label={saved ? "Saved for later" : "Save for later"}
      >
        <span className="text-xs font-medium">{saved ? "Saved" : "Save for later"}</span>
        <BookmarkIcon className={bookmarkClass} />
      </Button>
    );
  }

  return (
    <Button
      type="button"
      variant={saved ? "secondary" : "outline"}
      size="sm"
      onClick={() => setSaved(toggleSavedQuestion(question))}
      aria-pressed={saved}
    >
      {saved ? "Saved" : "Save for later"}
      <BookmarkIcon className={bookmarkClass} />
    </Button>
  );
}
