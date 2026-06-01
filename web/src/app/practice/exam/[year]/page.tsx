import { notFound } from "next/navigation";
import { getExamYears, getQuestionsByExamYear } from "@/lib/questions";
import { PracticeSession } from "@/components/practice/practice-session";

export function generateStaticParams() {
  return getExamYears().map((year) => ({ year }));
}

export default async function PracticeExamPage({
  params,
}: {
  params: Promise<{ year: string }>;
}) {
  const { year } = await params;
  if (!getExamYears().includes(year)) notFound();

  const questions = getQuestionsByExamYear(year);

  return (
    <PracticeSession questions={questions} title={`${year} Final — Practice`} />
  );
}
