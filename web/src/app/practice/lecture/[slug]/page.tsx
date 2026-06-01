import { notFound } from "next/navigation";
import {
  getLectureSlugs,
  getQuestionsByLectureSlug,
} from "@/lib/questions";
import { PracticeSession } from "@/components/practice/practice-session";

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
    <PracticeSession questions={questions} title={`${meta.lecture} — Practice`} />
  );
}
