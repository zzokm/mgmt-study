"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { Document } from "react-pdf";
import { Maximize2Icon } from "lucide-react";
import type { SlideRefParsed } from "@/types/question";
import { lecturePdfUrl, pagesForDisplay } from "@/lib/slide-ref";
import { getLectureMeta } from "@/lib/questions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { PDF_DOCUMENT_OPTIONS } from "./pdf-config";
import { FitPdfPage } from "./fit-pdf-page";
import { SlideChapterHeading } from "./slide-chapter-heading";
import "./pdf-config";

const SlideReferenceViewerDialog = dynamic(
  () =>
    import("./slide-reference-viewer-dialog").then(
      (m) => m.SlideReferenceViewerDialog
    ),
  { ssr: false }
);

function pdfFileUrl(path: string): string {
  if (path.startsWith("http")) return path;
  if (typeof window === "undefined") return path;
  return `${window.location.origin}${path}`;
}

interface SlidePanelProps {
  slideRefParsed: SlideRefParsed;
}

export function SlidePanel({ slideRefParsed }: SlidePanelProps) {
  const pages = pagesForDisplay(slideRefParsed);
  const pdfUrl = pdfFileUrl(lecturePdfUrl(slideRefParsed.lectureId));
  const [loaded, setLoaded] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [fullscreenPage, setFullscreenPage] = useState<number | null>(null);

  const lectures = useMemo(
    () =>
      Object.values(getLectureMeta()).sort(
        (a, b) => a.chapterNumber - b.chapterNumber
      ),
    []
  );

  if (slideRefParsed.kind === "course") {
    return (
      <Alert>
        <AlertTitle>No specific slides</AlertTitle>
        <AlertDescription>
          This answer is based on course context or general management theory, not a
          specific slide in the lecture deck.
        </AlertDescription>
      </Alert>
    );
  }

  if (slideRefParsed.kind === "all") {
    return (
      <Alert>
        <AlertTitle>Whole lecture reference</AlertTitle>
        <AlertDescription>
          Open the full lecture PDF to review all {slideRefParsed.pageCount} slides.
        </AlertDescription>
      </Alert>
    );
  }

  if (pages.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col">
      <Document
        file={pdfUrl}
        options={PDF_DOCUMENT_OPTIONS}
        onLoadSuccess={() => {
          setLoadError(null);
          setLoaded(true);
        }}
        onLoadError={(error) =>
          setLoadError(error?.message ?? "PDF.js could not open this file.")
        }
        loading={
          <div className="flex flex-col gap-10">
            {pages.map((p) => (
              <Skeleton key={p} className="h-[min(50vh,420px)] w-full rounded-lg" />
            ))}
          </div>
        }
        error={
          <Alert variant="destructive">
            <AlertTitle>Could not load PDF</AlertTitle>
            <AlertDescription className="flex flex-col gap-1">
              <span>{pdfUrl}</span>
              <span className="text-xs opacity-90">
                {loadError ??
                  "Practice slides use PDF.js — check /pdf.worker.min.mjs in the network tab."}
              </span>
            </AlertDescription>
          </Alert>
        }
      >
        {loaded ? (
          <ul className="m-0 flex list-none flex-col gap-10 p-0">
            {pages.map((pageNum) => (
              <li
                key={pageNum}
                className="relative isolate overflow-hidden rounded-lg border bg-card shadow-sm"
              >
                <div className="flex items-center justify-between gap-2 border-b bg-muted/50 px-3 py-2.5">
                  <SlideChapterHeading
                    topic={slideRefParsed.topic}
                    pageNumber={pageNum}
                    size="sm"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    className="size-7 shrink-0"
                    aria-label={`Open slide ${pageNum} in full viewer`}
                    title="Full screen"
                    onClick={() => setFullscreenPage(pageNum)}
                  >
                    <Maximize2Icon className="size-3.5" />
                  </Button>
                </div>
                <FitPdfPage pageNumber={pageNum} />
              </li>
            ))}
          </ul>
        ) : null}
      </Document>

      {fullscreenPage != null ? (
        <SlideReferenceViewerDialog
          open
          onOpenChange={(open) => {
            if (!open) setFullscreenPage(null);
          }}
          lectures={lectures}
          lectureId={slideRefParsed.lectureId}
          pageNumber={fullscreenPage}
          topic={slideRefParsed.topic}
        />
      ) : null}
    </div>
  );
}
