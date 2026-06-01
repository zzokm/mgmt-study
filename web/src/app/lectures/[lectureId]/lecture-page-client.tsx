"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import type { LectureMeta } from "@/types/question";
import { getLectureMeta } from "@/lib/questions";
import { LectureViewerDynamic as LectureViewer } from "@/components/pdf/lecture-viewer-dynamic";

export function LecturePageClient({ lecture }: { lecture: LectureMeta }) {
  const searchParams = useSearchParams();
  const pageParam = searchParams.get("page");
  const initialPage = pageParam ? Math.max(1, parseInt(pageParam, 10) || 1) : 1;

  const lectures = useMemo(
    () =>
      Object.values(getLectureMeta()).sort(
        (a, b) => a.chapterNumber - b.chapterNumber
      ),
    []
  );

  return (
    <LectureViewer
      lecture={lecture}
      lectures={lectures}
      initialPage={initialPage}
    />
  );
}
