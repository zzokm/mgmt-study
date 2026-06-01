"use client";

import { useCallback, useEffect } from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { pageNavigationPlugin } from "@react-pdf-viewer/page-navigation";
import { PDF_WORKER_V3_URL } from "./pdf-config";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import "@react-pdf-viewer/page-navigation/lib/styles/index.css";

function fileUrl(publicPdfUrl: string): string {
  if (publicPdfUrl.startsWith("http")) return publicPdfUrl;
  if (typeof window === "undefined") return publicPdfUrl;
  return `${window.location.origin}${publicPdfUrl}`;
}

/**
 * Full lecture viewer (pdfjs v3 via @react-pdf-viewer).
 * Plugin hooks must run every render of this component.
 */
export function LectureViewerFull({
  pdfUrl: publicPdfUrl,
  pageIndex,
}: {
  pdfUrl: string;
  pageIndex: number;
}) {
  const pdfFileUrl = fileUrl(publicPdfUrl);
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const pageNavigationPluginInstance = pageNavigationPlugin();
  const { jumpToPage } = pageNavigationPluginInstance;
  const { zoomPluginInstance } = defaultLayoutPluginInstance.toolbarPluginInstance;

  const applyViewerDefaults = useCallback(() => {
    zoomPluginInstance.zoomTo(1);
  }, [zoomPluginInstance]);

  useEffect(() => {
    jumpToPage(pageIndex);
  }, [jumpToPage, pageIndex]);

  return (
    <Worker workerUrl={PDF_WORKER_V3_URL}>
      <div className="lecture-pdf-viewer-inner h-full w-full [&_.rpv-core__viewer]:h-full">
        <Viewer
          fileUrl={pdfFileUrl}
          plugins={[defaultLayoutPluginInstance, pageNavigationPluginInstance]}
          initialPage={pageIndex}
          theme="dark"
          defaultScale={1}
          onDocumentLoad={applyViewerDefaults}
        />
      </div>
    </Worker>
  );
}
