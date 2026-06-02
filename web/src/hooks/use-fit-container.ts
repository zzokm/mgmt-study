"use client";

import { useEffect, useState, type RefObject } from "react";

export type ContainerSize = { width: number; height: number };

/**
 * Tracks the content box of a container, updating on resize, orientation,
 * and visual viewport changes (mobile browser chrome / pinch zoom).
 */
export function useFitContainer(
  ref: RefObject<HTMLElement | null>
): ContainerSize {
  const [size, setSize] = useState<ContainerSize>({ width: 0, height: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const measure = () => {
      const rect = el.getBoundingClientRect();
      setSize({
        width: Math.max(0, Math.floor(rect.width)),
        height: Math.max(0, Math.floor(rect.height)),
      });
    };

    const ro = new ResizeObserver(measure);
    ro.observe(el);
    measure();

    const vv = window.visualViewport;
    vv?.addEventListener("resize", measure);
    vv?.addEventListener("scroll", measure);
    window.addEventListener("orientationchange", measure);
    window.addEventListener("resize", measure);

    return () => {
      ro.disconnect();
      vv?.removeEventListener("resize", measure);
      vv?.removeEventListener("scroll", measure);
      window.removeEventListener("orientationchange", measure);
      window.removeEventListener("resize", measure);
    };
  }, [ref]);

  return size;
}

/** Fit page aspect ratio inside container (contain), with optional inner padding. */
export function fitPageRenderWidth(
  container: ContainerSize,
  pageWidth: number,
  pageHeight: number,
  padding = 8
): number {
  const availW = container.width - padding * 2;
  const availH = container.height - padding * 2;
  if (availW <= 0 || availH <= 0 || pageWidth <= 0 || pageHeight <= 0) {
    return Math.max(0, availW) || 280;
  }
  const scale = Math.min(availW / pageWidth, availH / pageHeight);
  return Math.max(1, Math.floor(pageWidth * scale));
}
