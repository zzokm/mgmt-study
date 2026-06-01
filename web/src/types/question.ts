export type QuestionType = "true_false" | "mcq" | "other";

export type SlideRefKind = "slides" | "all" | "course";

export interface QuestionOption {
  id: string;
  content: string;
}

export interface SlideRefParsed {
  lectureId: string;
  chapterNumber: number;
  topic: string;
  lectureFile: string;
  pdfPath: string;
  kind: SlideRefKind;
  pages: number[];
  pageCount: number;
  syntax: string;
}

export interface Question {
  id: string;
  topic: string;
  questionText: string;
  context: string | null;
  options: QuestionOption[];
  correctAnswerId: string;
  explanation: string;
  reference: string;
  slideRef: string;
  slideRefParsed: SlideRefParsed;
  questionKey: string;
  origin: string;
  sourceFile: string;
  sourceQuestionId: string;
  questionType: QuestionType;
  lectureSlug: string;
  examOrder: number;
  instanceCount?: number;
  appearances?: Array<{
    origin: string;
    sourceFile: string;
    sourceQuestionId: string;
  }>;
  origins?: string[];
  repetitionGroupRank?: number;
}

export interface LectureMeta {
  lectureId: string;
  chapterNumber: number;
  topic: string;
  lectureFile: string;
  pdfPath: string;
  pageCount: number;
  publicPdfUrl: string;
}

export interface Catalog {
  generatedAt: string;
  stats: {
    totalQuestions: number;
    lectures: number;
    exams: number;
    repetitive: number;
  };
  examYears: string[];
  lectureMeta: Record<string, LectureMeta>;
  poolIndex: {
    lectureFiles: Array<{
      file: string;
      lecture: string;
      count: number;
      origins: Record<string, number>;
    }>;
  };
  questions: Question[];
  byExamYear: Record<string, string[]>;
  byLectureSlug: Record<string, string[]>;
  repetitiveKeys: string[];
  questionByKey: Record<string, Question>;
}

export interface RepetitiveFile {
  title: string;
  description: string;
  uniqueRepeatedStems: number;
  questions: Question[];
}
