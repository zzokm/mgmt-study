"use client";

import { pdfjs } from "react-pdf";

/** react-pdf / practice slide refs — worker must match bundled pdfjs-dist (4.8.69) */
export const PDFJS_V4_VERSION =
  typeof pdfjs.version === "string" ? pdfjs.version : "4.8.69";
export const PDF_WORKER_V4_URL = "/pdf.worker.min.mjs";

/** @react-pdf-viewer / lecture full viewer (pdfjs v3, nested dependency) */
export const PDFJS_V3_VERSION = "3.4.120";
export const PDF_WORKER_V3_URL = "/pdf.worker.v3.min.js";

if (typeof window !== "undefined") {
  pdfjs.GlobalWorkerOptions.workerSrc = PDF_WORKER_V4_URL;
}

export { pdfjs };
