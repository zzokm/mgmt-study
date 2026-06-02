import { cn } from "@/lib/utils";

interface SlideChapterHeadingProps {
  topic?: string;
  pageNumber: number;
  size?: "sm" | "md";
  className?: string;
}

export function SlideChapterHeading({
  topic,
  pageNumber,
  size = "md",
  className,
}: SlideChapterHeadingProps) {
  const chapter = topic?.trim() || "Lecture slides";
  const textClass = size === "sm" ? "text-xs" : "text-sm";

  return (
    <div className={cn("flex min-w-0 flex-col gap-0.5 leading-tight", className)}>
      <span className={cn(textClass, "font-medium text-foreground")}>{chapter}</span>
      <span className={cn(textClass, "text-foreground")}>Slide {pageNumber}</span>
    </div>
  );
}
