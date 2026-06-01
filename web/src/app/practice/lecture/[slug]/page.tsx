import { notFound } from "next/navigation";
import {
  getLectureSlugs,
  getQuestionsByLectureSlug,
} from "@/lib/questions";
import { PracticeSessionHydrated } from "@/components/practice/practice-session-hydrated";

export function generateStaticParams() {
  return getLectureSlugs().map((l) => ({ slug: l.slug }));
}

export default async function PracticeLecturePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const meta = getLectureSlugs().find((l) => l.slug === slug);
  if (!meta) notFound();

  const questions = getQuestionsByLectureSlug(slug);

  return (
    <PracticeSessionHydrated questions={questions} title={`${meta.lecture} — Practice`} />
  );
}
