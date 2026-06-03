/** Container / dev ports that must not appear in public lecture links. */
const STRIP_PORTS = new Set(["3000", "7821"]);

function isLocalHostname(hostname: string): boolean {
  return hostname === "localhost" || hostname === "127.0.0.1" || hostname === "[::1]";
}

/**
 * Canonical site origin for analytics and redirects.
 * Prefer NEXT_PUBLIC_SITE_URL in production builds; otherwise drop internal ports.
 */
export function getPublicOrigin(): string {
  if (typeof window === "undefined") return "";

  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;

  const { protocol, hostname, port } = window.location;
  if (port && STRIP_PORTS.has(port) && !isLocalHostname(hostname)) {
    return `${protocol}//${hostname}`;
  }
  return window.location.origin;
}

/** Same-origin asset path; avoid prefixing window.location.origin (keeps :3000 out of PDF URLs). */
export function sameOriginAssetPath(path: string): string {
  if (path.startsWith("http")) return path;
  return path.startsWith("/") ? path : `/${path}`;
}

export function absolutePublicUrl(path: string): string {
  if (path.startsWith("http")) return path;
  const origin = getPublicOrigin();
  const normalized = sameOriginAssetPath(path);
  return origin ? `${origin}${normalized}` : normalized;
}

/** True when the browser URL uses an internal port on a non-local host. */
export function shouldRedirectFromContainerPort(): boolean {
  if (typeof window === "undefined") return false;
  const { hostname, port } = window.location;
  return Boolean(port && STRIP_PORTS.has(port) && !isLocalHostname(hostname));
}

export function canonicalPublicUrl(): string {
  if (typeof window === "undefined") return "";
  const { pathname, search, hash } = window.location;
  return `${getPublicOrigin()}${pathname}${search}${hash}`;
}
