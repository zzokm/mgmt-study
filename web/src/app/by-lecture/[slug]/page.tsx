import { notFound } from "next/navigation";
import { getLectureSlugs, getQuestionsByLectureSlug } from "@/lib/questions";
import { LinkButton } from "@/components/ui/link-button";
import { QuestionBrowseAccordion } from "@/components/questions/question-browse-accordion";

export function generateStaticParams() {
  return getLectureSlugs().map((l) => ({ slug: l.slug }));
}

export default async function LectureQuestionsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const lectures = getLectureSlugs();
  const meta = lectures.find((l) => l.slug === slug);
  if (!meta) notFound();

  const questions = getQuestionsByLectureSlug(slug);

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{meta.lecture}</h1>
          <p className="text-muted-foreground">{questions.length} questions</p>
        </div>
        <LinkButton href={`/practice/lecture/${slug}/`}>Practice this lecture</LinkButton>
      </div>

      <QuestionBrowseAccordion questions={questions} />
    </div>
  );
}
