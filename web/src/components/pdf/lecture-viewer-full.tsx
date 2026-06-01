"use client";

import { useCallback, useRef } from "react";
import {
  PDFViewer,
  type PDFViewerRef,
  type PluginRegistry,
} from "@embedpdf/react-pdf-viewer";

function fileUrl(publicPdfUrl: string): string {
  if (publicPdfUrl.startsWith("http")) return publicPdfUrl;
  if (typeof window === "undefined") return publicPdfUrl;
  return `${window.location.origin}${publicPdfUrl}`;
}

type ScrollCapability = {
  onLayoutReady: (
    handler: (event: {
      documentId: string;
      isInitial: boolean;
      pageNumber: number;
      totalPages: number;
    }) => void
  ) => void;
  forDocument: (documentId: string) => {
    scrollToPage: (options: {
      pageNumber: number;
      behavior?: ScrollBehavior;
    }) => void;
  };
};

function scrollToInitialPage(
  registry: PluginRegistry,
  pageNumber: number
): void {
  const scrollPlugin = registry.getPlugin("scroll") as {
    provides: () => ScrollCapability;
  } | null;
  const scroll = scrollPlugin?.provides();
  if (!scroll) return;

  scroll.onLayoutReady((event) => {
    if (!event.isInitial) return;
    scroll.forDocument(event.documentId).scrollToPage({
      pageNumber,
      behavior: "instant",
    });
  });
}

/**
 * Full lecture viewer (EmbedPDF — bundled engine, separate from react-pdf practice slides).
 */
export function LectureViewerFull({
  pdfUrl: publicPdfUrl,
  pageIndex,
}: {
  pdfUrl: string;
  pageIndex: number;
}) {
  const viewerRef = useRef<PDFViewerRef>(null);
  const pdfFileUrl = fileUrl(publicPdfUrl);
  const pageNumber = pageIndex + 1;

  const handleReady = useCallback(
    (registry: PluginRegistry) => {
      scrollToInitialPage(registry, pageNumber);
    },
    [pageNumber]
  );

  return (
    <div className="lecture-pdf-viewer-inner h-full w-full min-h-0">
      <PDFViewer
        ref={viewerRef}
        style={{ height: "100%", width: "100%" }}
        config={{
          src: pdfFileUrl,
          theme: { preference: "dark" },
          tabBar: "never",
          zoom: { defaultZoomLevel: 1 },
        }}
        onReady={handleReady}
      />
    </div>
  );
}
