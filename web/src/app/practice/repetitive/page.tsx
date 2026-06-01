import { getRepetitiveFileQuestions } from "@/lib/questions";
import { PracticeSessionHydrated } from "@/components/practice/practice-session-hydrated";

export default function PracticeRepetitivePage() {
  return (
    <PracticeSessionHydrated
      questions={getRepetitiveFileQuestions()}
      title="Repetitive questions — Practice"
    />
  );
}
