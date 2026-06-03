/** Chapter 3 (Business Ethics) — slide refs often point at the textbook, not lecture PDFs. */

export const CHAPTER_3_LECTURE_SLUG = "chapter-3-business-ethics";

export const CERTO_BOOK_URL =
  "https://drive.google.com/file/d/1Czor1fQcx_jDNFSYhAP-DgPFp-5_7E-l/view?usp=sharing";

export const CERTO_BOOK_LABEL = "Modern Management (Certo, 12th ed.) — PDF";

export function isChapter3Lecture(slug: string | undefined): boolean {
  return slug === CHAPTER_3_LECTURE_SLUG;
}
