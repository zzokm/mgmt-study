"use client";

import { useState } from "react";
import { Document, Page } from "react-pdf";
import type { SlideRefParsed } from "@/types/question";
import { lecturePdfUrl, pagesForDisplay } from "@/lib/slide-ref";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { PDF_DOCUMENT_OPTIONS } from "./pdf-config";
import "./pdf-config";

function pdfFileUrl(path: string): string {
  if (path.startsWith("http")) return path;
  if (typeof window === "undefined") return path;
  return `${window.location.origin}${path}`;
}

interface SlidePanelProps {
  slideRefParsed: SlideRefParsed;
  title?: string;
}

export function SlidePanel({ slideRefParsed, title = "Referenced slides" }: SlidePanelProps) {
  const pages = pagesForDisplay(slideRefParsed);
  const pdfUrl = pdfFileUrl(lecturePdfUrl(slideRefParsed.lectureId));
  const [loaded, setLoaded] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

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
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
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
          <div className="flex flex-col gap-3">
            {pages.map((p) => (
              <Skeleton key={p} className="h-64 w-full" />
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
        {loaded &&
          pages.map((pageNum) => (
            <div
              key={pageNum}
              className="mb-6 overflow-hidden rounded-lg border bg-card shadow-sm"
            >
              <div className="border-b bg-muted/50 px-3 py-1.5 text-xs font-medium">
                Slide {pageNum}
              </div>
              <Page
                pageNumber={pageNum}
                width={Math.min(720, typeof window !== "undefined" ? window.innerWidth - 48 : 720)}
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            </div>
          ))}
      </Document>
    </div>
  );
}
