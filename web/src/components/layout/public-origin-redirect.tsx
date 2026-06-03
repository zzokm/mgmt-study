"use client";

import { useEffect } from "react";
import {
  canonicalPublicUrl,
  shouldRedirectFromContainerPort,
} from "@/lib/public-origin";

/**
 * Reverse proxies serve this app on :443, but direct container access uses :3000.
 * Redirect so lecture links and bookmarks use the public host without a port.
 */
export function PublicOriginRedirect() {
  useEffect(() => {
    if (!shouldRedirectFromContainerPort()) return;
    const target = canonicalPublicUrl();
    if (target === window.location.href) return;
    window.location.replace(target);
  }, []);

  return null;
}
