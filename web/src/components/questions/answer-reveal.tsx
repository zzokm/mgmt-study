import type { Question } from "@/types/question";
import { lecturePageUrl } from "@/lib/slide-ref";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LinkButton } from "@/components/ui/link-button";
import { ExternalLinkIcon } from "lucide-react";
import { SlidePanel } from "@/components/pdf/slide-panel-dynamic";

interface AnswerRevealProps {
  question: Question;
}

export function AnswerReveal({ question }: AnswerRevealProps) {
  const parsed = question.slideRefParsed;
  const primaryPage = parsed.pages[0];

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Explanation</CardTitle>
          <CardDescription>Why this is the correct answer</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="leading-relaxed text-foreground">{question.explanation}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Reference</CardTitle>
          <CardDescription>Source in course materials</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <p className="leading-relaxed text-muted-foreground">{question.reference}</p>
          <div className="flex flex-wrap items-center gap-2">
            {primaryPage != null && parsed.kind === "slides" && (
              <LinkButton
                href={lecturePageUrl(parsed.lectureId, primaryPage)}
                variant="outline"
                size="sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLinkIcon data-icon="inline-start" />
                Open lecture (slide {primaryPage})
              </LinkButton>
            )}
            {parsed.kind === "all" && (
              <LinkButton
                href={`/lectures/${parsed.lectureId}/`}
                variant="outline"
                size="sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLinkIcon data-icon="inline-start" />
                Open full lecture
              </LinkButton>
            )}
          </div>
        </CardContent>
      </Card>

      <SlidePanel slideRefParsed={parsed} />
    </div>
  );
}
