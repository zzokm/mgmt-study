"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CircleCheckIcon,
  CircleXIcon,
} from "lucide-react";

/** Shared height for Previous, Check answer, and Next in the practice footer */
export const PRACTICE_FOOTER_BTN_CLASS =
  "inline-flex h-11 min-h-11 shrink-0 items-center justify-center gap-2 px-6 text-base font-semibold";

export const PRACTICE_FOOTER_HEIGHT = "5.25rem";

interface PracticeSessionFooterProps {
  index: number;
  total: number;
  revealed: boolean;
  correct: boolean;
  selectedId: string | null;
  onPrevious: () => void;
  onNext: () => void;
  onCheck: () => void;
  onFinish?: () => void;
}

export function PracticeSessionFooter({
  index,
  total,
  revealed,
  correct,
  selectedId,
  onPrevious,
  onNext,
  onCheck,
  onFinish,
}: PracticeSessionFooterProps) {
  const isFirst = index === 0;
  const isLast = index >= total - 1;

  return (
    <footer
      className={cn(
        "fixed bottom-0 z-50 flex items-center border-t bg-background/95 shadow-[0_-4px_24px_-4px_rgba(0,0,0,0.12)] backdrop-blur supports-[backdrop-filter]:bg-background/85",
        "left-0 right-0 md:left-[var(--sidebar-width)]",
        "pb-[max(0.75rem,env(safe-area-inset-bottom))]"
      )}
      style={{ minHeight: PRACTICE_FOOTER_HEIGHT }}
      aria-label="Practice controls"
    >
      <div className="mx-auto flex w-full max-w-3xl items-center gap-3 px-4 py-3 md:px-6">
        <Button
          type="button"
          variant="outline"
          onClick={onPrevious}
          disabled={isFirst}
          className={PRACTICE_FOOTER_BTN_CLASS}
        >
          <ChevronLeftIcon className="size-4 shrink-0" />
          <span className="hidden sm:inline">Previous</span>
          <span className="sm:hidden">Prev</span>
        </Button>

        <div className="flex min-h-11 flex-1 items-center justify-center">
          {!revealed ? (
            <Button
              type="button"
              onClick={onCheck}
              disabled={!selectedId}
              className={cn(PRACTICE_FOOTER_BTN_CLASS, "min-w-[11rem]")}
            >
              Check answer
            </Button>
          ) : (
            <span
              className={cn(
                PRACTICE_FOOTER_BTN_CLASS,
                "min-w-[11rem] rounded-lg border bg-muted/30 px-6",
                correct
                  ? "border-green-600/30 text-green-700 dark:text-green-400"
                  : "border-red-600/30 text-red-700 dark:text-red-400"
              )}
            >
              {correct ? (
                <CircleCheckIcon className="size-5 shrink-0" />
              ) : (
                <CircleXIcon className="size-5 shrink-0" />
              )}
              {correct ? "Correct" : "Incorrect"}
            </span>
          )}
        </div>

        {isLast && revealed ? (
          <Button
            type="button"
            onClick={onFinish}
            className={cn(PRACTICE_FOOTER_BTN_CLASS, "min-w-[11rem] whitespace-normal text-center leading-tight")}
          >
            Finish and view results
          </Button>
        ) : (
          <Button
            type="button"
            variant="outline"
            onClick={onNext}
            disabled={!revealed}
            className={PRACTICE_FOOTER_BTN_CLASS}
          >
            Next
            <ChevronRightIcon className="size-4 shrink-0" />
          </Button>
        )}
      </div>
    </footer>
  );
}
