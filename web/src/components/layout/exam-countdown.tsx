"use client";

import { useEffect, useState } from "react";
import { getExamCountdownMs } from "@/lib/exam-start";
import { EXAM_START } from "@/lib/site-links";
import { cn } from "@/lib/utils";

function pad(value: number): string {
  return String(value).padStart(2, "0");
}

function formatCountdown(ms: number): string {
  if (ms <= 0) return "00:00:00";

  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / 86_400);
  const hours = Math.floor((totalSeconds % 86_400) / 3_600);
  const minutes = Math.floor((totalSeconds % 3_600) / 60);
  const seconds = totalSeconds % 60;
  const time = `${pad(hours)} : ${pad(minutes)} : ${pad(seconds)}`;

  return days > 0 ? `${days}d ${time}` : time;
}

export function ExamCountdown({ className }: { className?: string }) {
  const [remainingMs, setRemainingMs] = useState<number | null>(null);

  useEffect(() => {
    function tick() {
      setRemainingMs(getExamCountdownMs());
    }

    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  if (remainingMs !== null && remainingMs <= 0) {
    return null;
  }

  const display = remainingMs === null ? "-- : -- : --" : formatCountdown(remainingMs);

  return (
    <div
      className={cn(
        "mx-2 rounded-lg border border-sidebar-border bg-sidebar-accent/40 px-3 py-2.5",
        className
      )}
      aria-live="polite"
      aria-atomic="true"
      aria-busy={remainingMs === null}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-[11px] font-medium uppercase tracking-wide text-sidebar-foreground/60">
          Exam in
        </span>
        <span className="text-[10px] text-sidebar-foreground/50">{EXAM_START.label}</span>
      </div>
      <p
        className={cn(
          "mt-1 text-xl font-semibold tabular-nums tracking-tight",
          remainingMs === null
            ? "text-sidebar-foreground/35"
            : "text-sidebar-foreground"
        )}
      >
        {display}
      </p>
    </div>
  );
}
