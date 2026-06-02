"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import type { SlideRefParsed } from "@/types/question";

const SlidePanelInner = dynamic(
  () => import("./slide-panel").then((m) => m.SlidePanel),
  {
    ssr: false,
    loading: () => <Skeleton className="h-64 w-full" />,
  }
);

export function SlidePanel(props: { slideRefParsed: SlideRefParsed }) {
  return <SlidePanelInner {...props} />;
}
