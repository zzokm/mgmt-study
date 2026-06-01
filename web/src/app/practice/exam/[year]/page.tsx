import { notFound } from "next/navigation";
import { getExamYears, getQuestionsByExamYear } from "@/lib/questions";
import { PracticeSessionHydrated } from "@/components/practice/practice-session-hydrated";

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
    <PracticeSessionHydrated questions={questions} title={`${year} Final — Practice`} />
  );
}
