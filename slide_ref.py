"""
Slide reference syntax and parsing for management exam questions.

Syntax (slideRef string)
------------------------
  {lectureId}:{slideSpec}

  lectureId   : ch1, ch2, ch3, ch7, ch8, ch11, ch13, ch15, ch18, ch21
  slideSpec   :
    s{N}           single slide (PDF page N, 1-based)
    s{N}-{M}       inclusive range
    s{N},{M}       non-contiguous pages
    s{N}-{M},{P}   combined (e.g. s7-8,24)
    all            entire lecture deck (1..pageCount)
    course         no specific slide; external / course-context only

Examples
--------
  ch18:s9
  ch11:s18-19
  ch13:s36-39
  ch21:s4,8
  ch13:course
  ch21:all

Programmatic use
----------------
  from slide_ref import parse_slide_ref, expand_pages, get_lecture_manifest

  pages = expand_pages("ch18:s9")           # -> [9]
  pages = expand_pages("ch13:s36-39")       # -> [36, 37, 38, 39]
  meta = get_lecture_manifest()["ch18"]     # file path, pageCount, etc.
"""

from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent
LECTURES_DIR = ROOT / "Lectures"
MANIFEST_PATH = ROOT / "lectures_manifest.json"

# Topic substring (after "Chapter N:") -> lecture filename in Lectures/
LECTURE_FILES: dict[int, str] = {
    1: "Chapter 1 - Introduction.pdf",
    2: "Chapter 2  - History and Current Thinking.pdf",
    3: "Chapter 3 - Busniess Ethics.pdf",
    7: "Chapter 7 - Principles of Planning.pdf",
    8: "Chapter 8 - Making Decisions.pdf",
    11: "Chapter 11 - Fundamentals of Organizing.pdf",
    13: "Chapter 13 - Human Resource Management.pdf",
    15: "Chapter 15 - Influencing and Communication.pdf",
    18: "Chapter 18 - Groups and Teams.pdf",
    21: "Chapter 21  - Controlling Fundamentals.pdf",
}

TOPIC_TITLES: dict[int, str] = {
    1: "Introduction",
    2: "History and Current Thinking",
    3: "Business Ethics",
    7: "Principles of Planning",
    8: "Making Decisions",
    11: "Fundamentals of Organizing",
    13: "Human Resource Management",
    15: "Influencing and Communication",
    18: "Groups and Teams",
    21: "Controlling Fundamentals",
}

SLIDE_REF_RE = re.compile(
    r"^ch(\d+):(s[\d,\-]+|all|course)$", re.IGNORECASE
)

# Slides with empty/unreadable diagrams in the PDF viewer (do not cite or open).
CH7_BLOCKED_SLIDE_PAGES: frozenset[int] = frozenset({8})


def chapter_from_topic(topic: str | None) -> int | None:
    if not topic:
        return None
    m = re.match(r"Chapter\s+(\d+)\s*:", topic, re.I)
    return int(m.group(1)) if m else None


def lecture_id(chapter: int) -> str:
    return f"ch{chapter}"


def get_page_count(pdf_path: Path) -> int:
    from pypdf import PdfReader

    return len(PdfReader(str(pdf_path)).pages)


def build_manifest() -> dict:
    manifest = {
        "syntax": "ch{N}:s{pages}|all|course — see slide_ref.py docstring",
        "slideEqualsPdfPage": True,
        "lectures": {},
    }
    for ch, filename in sorted(LECTURE_FILES.items()):
        pdf_path = LECTURES_DIR / filename
        if not pdf_path.exists():
            raise FileNotFoundError(f"Lecture PDF missing: {pdf_path}")
        page_count = get_page_count(pdf_path)
        lid = lecture_id(ch)
        manifest["lectures"][lid] = {
            "lectureId": lid,
            "chapterNumber": ch,
            "topic": f"Chapter {ch}: {TOPIC_TITLES[ch]}",
            "lectureFile": filename,
            "pdfPath": f"Lectures/{filename}",
            "pageCount": page_count,
        }
    return manifest


def load_manifest() -> dict:
    if MANIFEST_PATH.exists():
        return json.loads(MANIFEST_PATH.read_text(encoding="utf-8"))
    manifest = build_manifest()
    MANIFEST_PATH.write_text(json.dumps(manifest, indent=2, ensure_ascii=False), encoding="utf-8")
    return manifest


def get_lecture_manifest() -> dict[str, dict]:
    return load_manifest()["lectures"]


def extract_slide_numbers(reference: str) -> list[int]:
    """Pull slide/page numbers from human-readable reference text."""
    if not reference:
        return []
    nums: list[int] = []
    for m in re.finditer(r"(?i)slides?\s+(\d+)\s*(?:[-–—]|to)\s*(\d+)", reference):
        a, b = int(m.group(1)), int(m.group(2))
        nums.extend(range(min(a, b), max(a, b) + 1))
    for m in re.finditer(r"(?i)slide\s+(\d+)", reference):
        nums.append(int(m.group(1)))
    return sorted(set(nums))


def classify_reference_kind(reference: str) -> str:
    r = (reference or "").lower()
    if "not explicitly" in r or "standard hr management principle" in r:
        return "course"
    if "throughout the slides" in r or "throughout the provided" in r:
        return "all"
    if extract_slide_numbers(reference):
        return "slides"
    if "general management" in r or "fundamental management theory" in r:
        return "course"
    return "course"


def compress_pages(pages: list[int]) -> str:
    pages = sorted(set(pages))
    if not pages:
        return ""
    runs: list[tuple[int, int]] = []
    start = end = pages[0]
    for p in pages[1:]:
        if p == end + 1:
            end = p
        else:
            runs.append((start, end))
            start = end = p
    runs.append((start, end))
    segs = [str(a) if a == b else f"{a}-{b}" for a, b in runs]
    return "s" + ",".join(segs)


def build_slide_ref(chapter: int, reference: str, manifest: dict | None = None) -> tuple[str, dict]:
    """Return (slideRef string, slideRefParsed object)."""
    manifest = manifest or load_manifest()
    lid = lecture_id(chapter)
    lec = manifest["lectures"][lid]
    page_count = lec["pageCount"]
    kind = classify_reference_kind(reference)
    pages: list[int] = []

    if kind == "slides":
        pages = extract_slide_numbers(reference)
        if not pages:
            kind = "course"
        else:
            for p in pages:
                if p < 1 or p > page_count:
                    raise ValueError(
                        f"{lid} slide {p} out of range 1..{page_count} for ref: {reference[:80]}"
                    )
            spec = compress_pages(pages)
            slide_ref = f"{lid}:{spec}"
    elif kind == "all":
        pages = list(range(1, page_count + 1))
        slide_ref = f"{lid}:all"
    else:
        slide_ref = f"{lid}:course"

    parsed = {
        "lectureId": lid,
        "chapterNumber": chapter,
        "topic": lec["topic"],
        "lectureFile": lec["lectureFile"],
        "pdfPath": lec["pdfPath"],
        "kind": kind,
        "pages": pages,
        "pageCount": page_count,
        "syntax": slide_ref,
    }
    return slide_ref, parsed


def parse_slide_ref(slide_ref: str, manifest: dict | None = None) -> dict:
    """Parse slideRef string into structured dict (same shape as slideRefParsed)."""
    manifest = manifest or load_manifest()
    m = SLIDE_REF_RE.match(slide_ref.strip())
    if not m:
        raise ValueError(f"Invalid slideRef: {slide_ref}")
    ch = int(m.group(1))
    spec = m.group(2).lower()
    lid = lecture_id(ch)
    lec = manifest["lectures"][lid]
    page_count = lec["pageCount"]

    if spec == "course":
        return {
            "lectureId": lid,
            "chapterNumber": ch,
            "topic": lec["topic"],
            "lectureFile": lec["lectureFile"],
            "pdfPath": lec["pdfPath"],
            "kind": "course",
            "pages": [],
            "pageCount": page_count,
            "syntax": slide_ref,
        }
    if spec == "all":
        return {
            "lectureId": lid,
            "chapterNumber": ch,
            "topic": lec["topic"],
            "lectureFile": lec["lectureFile"],
            "pdfPath": lec["pdfPath"],
            "kind": "all",
            "pages": list(range(1, page_count + 1)),
            "pageCount": page_count,
            "syntax": slide_ref,
        }

    pages = expand_page_spec(spec[1:])  # drop leading 's'
    for p in pages:
        if p < 1 or p > page_count:
            raise ValueError(f"{lid} page {p} out of range 1..{page_count}")
    return {
        "lectureId": lid,
        "chapterNumber": ch,
        "topic": lec["topic"],
        "lectureFile": lec["lectureFile"],
        "pdfPath": lec["pdfPath"],
        "kind": "slides",
        "pages": pages,
        "pageCount": page_count,
        "syntax": slide_ref,
    }


def expand_page_spec(spec: str) -> list[int]:
    """Expand '9' or '18-19' or '7-8,24' to sorted page list."""
    pages: list[int] = []
    for part in spec.split(","):
        part = part.strip()
        if "-" in part:
            a, b = part.split("-", 1)
            pages.extend(range(int(a), int(b) + 1))
        else:
            pages.append(int(part))
    return sorted(set(pages))


def expand_pages(slide_ref: str, manifest: dict | None = None) -> list[int]:
    return parse_slide_ref(slide_ref, manifest)["pages"]


def resolve_pdf(slide_ref: str, root: Path | None = None) -> tuple[Path, list[int], dict]:
    """
    Resolve slideRef to an on-disk PDF path and 1-based page list.

    Example:
        path, pages, meta = resolve_pdf("ch18:s16")
        # open path in viewer at pages[0]
    """
    root = root or ROOT
    parsed = parse_slide_ref(slide_ref)
    pdf_path = root / parsed["pdfPath"]
    return pdf_path, parsed["pages"], parsed
