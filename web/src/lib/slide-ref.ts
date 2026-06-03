import type { SlideRefParsed } from "@/types/question";

const SLIDE_REF_RE = /^ch(\d+):(s[\d,\-]+|all|course)$/i;

export function expandPageSpec(spec: string): number[] {
  const pages: number[] = [];
  for (const part of spec.split(",")) {
    const trimmed = part.trim();
    if (trimmed.includes("-")) {
      const [a, b] = trimmed.split("-", 2);
      const start = parseInt(a, 10);
      const end = parseInt(b, 10);
      for (let i = start; i <= end; i++) pages.push(i);
    } else {
      pages.push(parseInt(trimmed, 10));
    }
  }
  return [...new Set(pages)].sort((a, b) => a - b);
}

export function parseSlideRef(
  slideRef: string,
  lectureMeta?: Record<string, { pageCount: number; topic: string; lectureFile: string; pdfPath: string }>
): SlideRefParsed {
  const m = SLIDE_REF_RE.exec(slideRef.trim());
  if (!m) throw new Error(`Invalid slideRef: ${slideRef}`);

  const ch = parseInt(m[1], 10);
  const lid = `ch${ch}`;
  const spec = m[2].toLowerCase();
  const meta = lectureMeta?.[lid];
  const pageCount = meta?.pageCount ?? 1;

  if (spec === "course") {
    return {
      lectureId: lid,
      chapterNumber: ch,
      topic: meta?.topic ?? `Chapter ${ch}`,
      lectureFile: meta?.lectureFile ?? "",
      pdfPath: meta?.pdfPath ?? "",
      kind: "course",
      pages: [],
      pageCount,
      syntax: slideRef,
    };
  }

  if (spec === "all") {
    return {
      lectureId: lid,
      chapterNumber: ch,
      topic: meta?.topic ?? `Chapter ${ch}`,
      lectureFile: meta?.lectureFile ?? "",
      pdfPath: meta?.pdfPath ?? "",
      kind: "all",
      pages: Array.from({ length: pageCount }, (_, i) => i + 1),
      pageCount,
      syntax: slideRef,
    };
  }

  const pages = expandPageSpec(spec.slice(1));
  return {
    lectureId: lid,
    chapterNumber: ch,
    topic: meta?.topic ?? `Chapter ${ch}`,
    lectureFile: meta?.lectureFile ?? "",
    pdfPath: meta?.pdfPath ?? "",
    kind: "slides",
    pages,
    pageCount,
    syntax: slideRef,
  };
}

export function expandPages(slideRef: string): number[] {
  return parseSlideRef(slideRef).pages;
}

export function lecturePdfUrl(lectureId: string): string {
  return `/lectures/${lectureId}.pdf`;
}

export function lecturePageUrl(lectureId: string, page: number): string {
  return `/lectures/${lectureId}/?page=${page}`;
}

/** ch7 slide 8: Planning Steps diagram renders with empty boxes in the PDF viewer. */
const BLOCKED_PAGES: Record<string, ReadonlySet<number>> = {
  ch7: new Set([8]),
};

export function pagesForDisplay(parsed: SlideRefParsed): number[] {
  if (parsed.kind === "course") return [];
  if (parsed.kind === "all") return [];
  const blocked = BLOCKED_PAGES[parsed.lectureId];
  if (!blocked) return parsed.pages;
  return parsed.pages.filter((p) => !blocked.has(p));
}

export function slideRefLabel(slideRef: string): string {
  return slideRef;
}
