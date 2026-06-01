/**
 * CI audit: moderate+ for the app, except the pdfjs-dist-v3 dependency tree
 * (required for @react-pdf-viewer full lecture viewer on trusted local PDFs).
 */
import { execSync } from "child_process";

/** Optional native deps of pdfjs-dist@3.4.120 (alias pdfjs-dist-v3). */
const PDFJS_V3_CHAIN = new Set([
  "pdfjs-dist-v3",
  "pdfjs-dist",
  "canvas",
  "@mapbox/node-pre-gyp",
  "tar",
]);

let json;
try {
  const out = execSync("npm audit --json", {
    encoding: "utf8",
    stdio: ["pipe", "pipe", "pipe"],
  });
  json = JSON.parse(out);
} catch (err) {
  const stdout = err.stdout?.toString?.() ?? "";
  if (!stdout) {
    console.error(err.stderr?.toString?.() ?? err.message);
    process.exit(1);
  }
  json = JSON.parse(stdout);
}

const vulns = json.vulnerabilities ?? {};
const blocking = Object.entries(vulns).filter(([name, v]) => {
  if (PDFJS_V3_CHAIN.has(name)) return false;
  if (v.severity === "low" || v.severity === "info") return false;
  return true;
});

if (blocking.length) {
  console.error(
    `audit:ci: ${blocking.length} vulnerability(ies) at moderate or higher outside pdfjs-dist-v3`
  );
  execSync("npm audit --audit-level=moderate", { stdio: "inherit" });
  process.exit(1);
}

console.log(
  "audit:ci: passed (pdfjs-dist-v3 tree excluded — full lecture viewer only)"
);
