"use client";

import { useRouter } from "next/navigation";
import type { LectureMeta } from "@/types/question";
import { LectureViewerFull } from "./lecture-viewer-full";
import { LectureSlidesSidebar } from "./lecture-slides-sidebar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface LectureViewerProps {
  lecture: LectureMeta;
  lectures: LectureMeta[];
  initialPage?: number;
}

export function LectureViewer({
  lecture,
  lectures,
  initialPage = 1,
}: LectureViewerProps) {
  const router = useRouter();
  const startPage = Math.max(
    1,
    Math.min(initialPage, Math.max(lecture.pageCount, 1))
  );
  const pageIndex = startPage - 1;
  const viewerKey = `${lecture.lectureId}-${lecture.publicPdfUrl}-${startPage}`;

  return (
    <div className="lecture-pdf-viewer flex flex-col gap-3">
      <div className="lg:hidden">
        <Select
          value={lecture.lectureId}
          onValueChange={(id) => router.push(`/lectures/${id}/`)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Choose lecture" />
          </SelectTrigger>
          <SelectContent>
            {lectures.map((lec) => (
              <SelectItem key={lec.lectureId} value={lec.lectureId}>
                {lec.topic} ({lec.pageCount} slides)
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div
        className="flex min-h-[480px] overflow-hidden rounded-lg border bg-card"
        style={{ height: "min(80vh, 900px)" }}
      >
        <div className="min-h-0 min-w-0 flex-1">
          <LectureViewerFull
            key={viewerKey}
            pdfUrl={lecture.publicPdfUrl}
            pageIndex={pageIndex}
          />
        </div>
        <div className="hidden lg:flex lg:min-h-0">
          <LectureSlidesSidebar
            lectures={lectures}
            currentLectureId={lecture.lectureId}
          />
        </div>
      </div>

      <p className="text-center text-xs text-muted-foreground">
        Slide {startPage} of {lecture.pageCount} · use{" "}
        <code className="text-[0.7rem]">?page=N</code> in the URL to deep-link
      </p>
    </div>
  );
}
