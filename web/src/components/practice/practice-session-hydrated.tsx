"use client";

import dynamic from "next/dynamic";
import { Chapter3PracticeGate } from "@/components/chapter-3/chapter-3-practice-gate";
import type { Question } from "@/types/question";

const PracticeSessionInner = dynamic(
  () => import("./practice-session").then((m) => m.PracticeSession),
  { ssr: false }
);

export function PracticeSessionHydrated(props: {
  questions: Question[];
  title: string;
  lectureSlug?: string;
}) {
  const { lectureSlug, ...sessionProps } = props;
  return (
    <Chapter3PracticeGate lectureSlug={lectureSlug}>
      <PracticeSessionInner {...sessionProps} />
    </Chapter3PracticeGate>
  );
}

