"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  PDFViewer,
  type PDFViewerRef,
  type PluginRegistry,
} from "@embedpdf/react-pdf-viewer";
import type { LectureMeta } from "@/types/question";
import {
  customizeLectureViewerUi,
  LECTURE_VIEWER_DISABLED_CATEGORIES,
} from "./lecture-pdf-config";

const LECTURE_VIEWER_HEIGHT = "min(80vh, 900px)";

function absoluteAssetUrl(path: string): string {
  if (path.startsWith("http")) return path;
  if (typeof window === "undefined") return path;
  return `${window.location.origin}${path}`;
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

type DocumentManagerCapability = {
  setActiveDocument: (documentId: string) => void;
  onActiveDocumentChanged: EventHook<{
    previousDocumentId: string | null;
    currentDocumentId: string | null;
  }>;
};

type EventHook<T> = {
  (handler: (event: T) => void): void;
};

function getScroll(registry: PluginRegistry): ScrollCapability | null {
  const scrollPlugin = registry.getPlugin("scroll") as {
    provides: () => ScrollCapability;
  } | null;
  return scrollPlugin?.provides() ?? null;
}

function getDocumentManager(registry: PluginRegistry): DocumentManagerCapability | null {
  const plugin = registry.getPlugin("document-manager") as {
    provides: () => DocumentManagerCapability;
  } | null;
  return plugin?.provides() ?? null;
}

function scrollActiveDocToPage(
  registry: PluginRegistry,
  documentId: string,
  pageNumber: number
): void {
  const scroll = getScroll(registry);
  if (!scroll) return;

  scroll.onLayoutReady((event) => {
    if (event.documentId !== documentId) return;
    scroll.forDocument(documentId).scrollToPage({
      pageNumber,
      behavior: "instant",
    });
  });
}

function activateDocument(registry: PluginRegistry, documentId: string): void {
  getDocumentManager(registry)?.setActiveDocument(documentId);
}

/**
 * Full lecture viewer (EmbedPDF) — all lectures as document tabs.
 */
export function LectureViewerFull({
  lectures,
  activeLectureId,
  pageIndex,
  syncUrl = true,
  height = LECTURE_VIEWER_HEIGHT,
}: {
  lectures: LectureMeta[];
  activeLectureId: string;
  pageIndex: number;
  /** When false, tab changes do not navigate (e.g. practice fullscreen modal). */
  syncUrl?: boolean;
  height?: string;
}) {
  const router = useRouter();
  const viewerRef = useRef<PDFViewerRef>(null);
  const registryRef = useRef<PluginRegistry | null>(null);
  const syncingFromViewerRef = useRef(false);
  const pageNumber = pageIndex + 1;

  const initialDocuments = useMemo(
    () =>
      lectures.map((lec) => ({
        url: absoluteAssetUrl(lec.publicPdfUrl),
        documentId: lec.lectureId,
        name: `Ch ${lec.chapterNumber}: ${lec.topic}`,
        autoActivate: lec.lectureId === activeLectureId,
      })),
    // PDFViewer reads config only on mount; activation is synced in onReady/useEffect.
    // eslint-disable-next-line react-hooks/exhaustive-deps -- activeLectureId intentionally omitted
    [lectures]
  );

  const viewerConfig = useMemo(
    () => ({
      wasmUrl: absoluteAssetUrl("/pdfium.wasm"),
      theme: { preference: "dark" as const },
      tabBar: "always" as const,
      disabledCategories: LECTURE_VIEWER_DISABLED_CATEGORIES,
      documentManager: { initialDocuments },
    }),
    [initialDocuments]
  );

  const syncRouteToLecture = useCallback(
    (lectureId: string) => {
      if (!syncUrl || lectureId === activeLectureId) return;
      syncingFromViewerRef.current = true;
      router.push(`/lectures/${lectureId}/?page=1`);
    },
    [activeLectureId, router, syncUrl]
  );

  const handleReady = useCallback(
    (registry: PluginRegistry) => {
      registryRef.current = registry;
      customizeLectureViewerUi(registry);
      activateDocument(registry, activeLectureId);
      scrollActiveDocToPage(registry, activeLectureId, pageNumber);

      if (syncUrl) {
        const dm = getDocumentManager(registry);
        dm?.onActiveDocumentChanged((event) => {
          if (syncingFromViewerRef.current) {
            syncingFromViewerRef.current = false;
            return;
          }
          if (event.currentDocumentId) {
            syncRouteToLecture(event.currentDocumentId);
          }
        });
      }
    },
    [activeLectureId, pageNumber, syncRouteToLecture, syncUrl]
  );

  useEffect(() => {
    const registry = registryRef.current;
    if (!registry) return;
    activateDocument(registry, activeLectureId);
    scrollActiveDocToPage(registry, activeLectureId, pageNumber);
  }, [activeLectureId, pageNumber]);

  return (
    <PDFViewer
      ref={viewerRef}
      className="lecture-pdf-viewer-inner w-full"
      style={{ height, width: "100%" }}
      config={viewerConfig}
      onReady={handleReady}
    />
  );
}
