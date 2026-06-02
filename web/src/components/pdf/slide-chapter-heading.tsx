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
    <span
      className={cn(
        "block min-w-0 truncate font-medium leading-tight text-foreground",
        textClass,
        className
      )}
    >
      {chapter}
      <span className="font-normal text-muted-foreground"> · Slide {pageNumber}</span>
    </span>
  );
}
