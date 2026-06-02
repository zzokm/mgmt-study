"use client";

import { useMemo, useRef, useState } from "react";
import { Page } from "react-pdf";
import type { PDFPageProxy } from "pdfjs-dist";
import { fitPageRenderWidth, useFitContainer } from "@/hooks/use-fit-container";
import { Skeleton } from "@/components/ui/skeleton";

interface FitPdfPageProps {
  pageNumber: number;
}

export function FitPdfPage({ pageNumber }: FitPdfPageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const containerSize = useFitContainer(containerRef);
  const [pageSize, setPageSize] = useState<{ width: number; height: number } | null>(
    null
  );
  const [rendered, setRendered] = useState(false);

  const renderWidth = useMemo(() => {
    if (!pageSize) {
      const fallback = containerSize.width > 0 ? containerSize.width - 16 : 320;
      return Math.max(200, fallback);
    }
    return fitPageRenderWidth(containerSize, pageSize.width, pageSize.height);
  }, [containerSize, pageSize]);

  const handleLoadSuccess = (page: PDFPageProxy) => {
    const viewport = page.getViewport({ scale: 1 });
    setPageSize({ width: viewport.width, height: viewport.height });
  };

  return (
    <div
      ref={containerRef}
      className="flex w-full min-h-[min(50vh,420px)] max-h-[min(72vh,640px)] items-center justify-center overflow-hidden bg-muted/20 p-4"
    >
      {!rendered && (
        <Skeleton className="absolute inset-2 max-h-full w-full rounded-md" />
      )}
      <Page
        pageNumber={pageNumber}
        width={renderWidth}
        renderTextLayer={false}
        renderAnnotationLayer={false}
        onLoadSuccess={handleLoadSuccess}
        onRenderSuccess={() => setRendered(true)}
        className="max-h-full [&_canvas]:!h-auto [&_canvas]:max-h-full [&_canvas]:max-w-full"
      />
    </div>
  );
}
