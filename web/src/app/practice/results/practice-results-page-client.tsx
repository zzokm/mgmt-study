"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getQuestionByKey } from "@/lib/questions";
import { computePracticeScore } from "@/lib/practice-progress";
import { loadPracticeResult } from "@/lib/practice-results";
import { PracticeResultsAccordion } from "@/components/practice/practice-results-accordion";
import { LinkButton } from "@/components/ui/link-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty";
import type { Question } from "@/types/question";

export function PracticeResultsPageClient() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") ?? "";
  const [mistakesOnly, setMistakesOnly] = useState(false);

  const stored = useMemo(
    () => (id ? loadPracticeResult(id) : null),
    [id]
  );

  const questions = useMemo(() => {
    if (!stored) return [] as Question[];
    return stored.questionKeys
      .map((key) => getQuestionByKey(key))
      .filter((q): q is Question => q != null);
  }, [stored]);

  if (!id || !stored) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyTitle>Results not found</EmptyTitle>
          <EmptyDescription>
            Finish a practice session to see your score here.
          </EmptyDescription>
        </EmptyHeader>
        <LinkButton href="/practice/">Start practicing</LinkButton>
      </Empty>
    );
  }

  const score = computePracticeScore(questions, stored.progress);

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Practice results</h1>
        <p className="text-muted-foreground">{stored.title}</p>
        <p className="text-xs text-muted-foreground">
          Finished {new Date(stored.finishedAt).toLocaleString()}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Final score</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <p className="text-4xl font-bold tracking-tight">
            {score.correct}/{score.total}{" "}
            <span className="text-2xl font-semibold text-muted-foreground">
              ({score.percent}%)
            </span>
          </p>
          <p className="text-sm text-muted-foreground">
            {score.answered} checked · {score.incorrect} incorrect
            {score.skipped > 0 ? ` · ${score.skipped} not answered` : ""}
          </p>
        </CardContent>
      </Card>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-semibold">Review</h2>
        <Button
          type="button"
          variant={mistakesOnly ? "default" : "outline"}
          onClick={() => setMistakesOnly((v) => !v)}
        >
          {mistakesOnly ? "Show all questions" : "Show mistakes only"}
        </Button>
      </div>

      <PracticeResultsAccordion
        questions={questions}
        progress={stored.progress}
        mistakesOnly={mistakesOnly}
      />

      <div className="flex flex-wrap gap-3 pb-8">
        <LinkButton href="/practice/">Practice again</LinkButton>
        <LinkButton href="/" variant="outline">
          Home
        </LinkButton>
      </div>
    </div>
  );
}
