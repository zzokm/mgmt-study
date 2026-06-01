import { getRepetitiveFileQuestions } from "@/lib/questions";
import { PracticeSession } from "@/components/practice/practice-session";

export default function PracticeRepetitivePage() {
  return (
    <PracticeSession
      questions={getRepetitiveFileQuestions()}
      title="Repetitive questions — Practice"
    />
  );
}
