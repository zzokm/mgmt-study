import type { Question, SlideRefParsed } from "@/types/question";
import { pagesForDisplay } from "@/lib/slide-ref";

export function hasReferencedSlidePreview(parsed: SlideRefParsed): boolean {
  const displayPages = pagesForDisplay(parsed);
  return (
    parsed.kind === "course" ||
    parsed.kind === "all" ||
    (parsed.kind === "slides" && displayPages.length > 0)
  );
}

export function questionHasReferencedSlidePreview(question: Question): boolean {
  return Boolean(question.reference) && hasReferencedSlidePreview(question.slideRefParsed);
}
