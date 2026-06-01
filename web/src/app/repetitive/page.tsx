import { getRepetitiveFileQuestions, getRepetitiveStats } from "@/lib/questions";
import { RepetitivePageClient } from "./repetitive-page-client";

export default function RepetitivePage() {
  const questions = getRepetitiveFileQuestions();
  const count = getRepetitiveStats();

  return <RepetitivePageClient questions={questions} count={count} />;
}
