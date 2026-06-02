"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_TAG_ID;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/** Sends a page_view on client navigations (App Router). */
function GoogleAnalyticsPageViews() {
  const pathname = usePathname();

  useEffect(() => {
    if (!GA_ID || typeof window.gtag !== "function") return;
    window.gtag("config", GA_ID, { page_path: pathname });
  }, [pathname]);

  return null;
}

export function GoogleAnalytics() {
  if (!GA_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
      <GoogleAnalyticsPageViews />
    </>
  );
}
