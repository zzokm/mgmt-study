import { Suspense } from "react";
import { PracticeResultsPageClient } from "./practice-results-page-client";

export default function PracticeResultsPage() {
  return (
    <Suspense fallback={null}>
      <PracticeResultsPageClient />
    </Suspense>
  );
}
