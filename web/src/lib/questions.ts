import type { Catalog, Question } from "@/types/question";
import catalogJson from "@/data/generated/catalog.json";
import repetitiveJson from "../../public/data/repetitive-questions.json";

const catalog = catalogJson as Catalog;

export function getCatalog(): Catalog {
  return catalog;
}

export function getAllQuestions(): Question[] {
  return catalog.questions;
}

export function getQuestionByKey(key: string): Question | undefined {
  return catalog.questionByKey[key];
}

export function getQuestionsByExamYear(year: string): Question[] {
  const keys = catalog.byExamYear[year] ?? [];
  return keys.map((k) => catalog.questionByKey[k]).filter(Boolean);
}

export function getQuestionsByLectureSlug(slug: string): Question[] {
  const keys = catalog.byLectureSlug[slug] ?? [];
  return keys.map((k) => catalog.questionByKey[k]).filter(Boolean);
}

export function getLectureSlugs(): Array<{
  slug: string;
  lecture: string;
  count: number;
}> {
  return catalog.poolIndex.lectureFiles.map((f) => ({
    slug: f.file.replace(".json", ""),
    lecture: f.lecture,
    count: f.count,
  }));
}

export function getLectureMeta() {
  return catalog.lectureMeta;
}

export function getExamYears() {
  return catalog.examYears;
}

export function getStats() {
  return catalog.stats;
}

export function isAnswerCorrect(
  selectedId: string,
  correctAnswerId: string
): boolean {
  return selectedId.trim().toLowerCase() === correctAnswerId.trim().toLowerCase();
}

export function getCorrectAnswerDisplay(question: Question): {
  id: string;
  label: string;
} {
  const opt = question.options.find(
    (o) => o.id.toLowerCase() === question.correctAnswerId.toLowerCase()
  );
  const content = opt?.content ?? question.correctAnswerId;
  return {
    id: question.correctAnswerId.toUpperCase(),
    label: content,
  };
}

export function slugFromLectureFile(file: string): string {
  return file.replace(".json", "");
}

export function getRepetitiveQuestions(): Question[] {
  return catalog.repetitiveKeys
    .map((k) => catalog.questionByKey[k])
    .filter(Boolean);
}

function repetitiveMetaFromRaw(raw: Record<string, unknown>) {
  return {
    appearances: raw.appearances as Question["appearances"],
    instanceCount: raw.instanceCount as number | undefined,
    origins: raw.origins as string[] | undefined,
    repetitionGroupRank: raw.repetitionGroupRank as number | undefined,
  };
}

export function getRepetitiveFileQuestions(): Question[] {
  const data = repetitiveJson as { questions: Array<Record<string, unknown>> };
  return data.questions.map((raw) => {
    const q = raw as unknown as Question;
    const questionKey =
      q.questionKey ?? `${q.origin}:${q.sourceQuestionId || q.id}`;
    const meta = repetitiveMetaFromRaw(raw);
    const fromCatalog = catalog.questionByKey[questionKey];
    if (fromCatalog) {
      return { ...fromCatalog, ...meta };
    }
    return {
      ...q,
      ...meta,
      questionKey,
      lectureSlug: q.lectureSlug ?? slugFromTopic(q.topic),
      examOrder: q.examOrder ?? 0,
    };
  });
}

function slugFromTopic(topic: string): string {
  const m = topic.match(/Chapter\s+(\d+):\s*(.+)/i);
  if (!m) return "unknown";
  const name = m[2]
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
  return `chapter-${m[1]}-${name}`;
}

export function getRepetitiveStats() {
  const data = repetitiveJson as { uniqueRepeatedStems: number };
  return data.uniqueRepeatedStems;
}

export function getLectureIdList(): string[] {
  return Object.keys(catalog.lectureMeta);
}

export function getBookChapterMeta() {
  return catalog.bookChapterMeta ?? {};
}

export function getBookChapterIdList(): string[] {
  return Object.keys(getBookChapterMeta()).sort(
    (a, b) =>
      getBookChapterMeta()[a].chapterNumber -
      getBookChapterMeta()[b].chapterNumber
  );
}

export function getBookTitle(): string {
  return catalog.bookTitle ?? "Textbook";
}
