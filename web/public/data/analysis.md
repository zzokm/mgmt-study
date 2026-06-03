# Management Final Exams — Combined Question Pool & Examiner Analysis

*Generated: 2026-06-04*

## Executive summary

This report merges **192 questions** from four exam JSON sources (`final19.json`, `final21.json`, `final24.json`, `final25.json`) into **10 lecture-based pool files** under `question-pools-by-lecture/`. Each entry includes **answer keys, explanations, and chapter-prefixed references** where available (**192/192** fully answered).

| Exam origin | Source file | Questions | Answered |
|-------------|-------------|----------:|---------:|
| **2019** | `final19.json` | 18 | 18 |
| **2021** | `final21.json` | 48 | 48 |
| **2024** | `final24.json` | 66 | 66 |
| **2025** | `final25.json` | 60 | 60 |
| **Total** | — | **192** | **192** |

### Question format mix

| Type | Count | Share |
|------|------:|------:|
| Mcq | 130 | 67.7% |
| True False | 62 | 32.3% |

### Highest-yield lectures (by pooled frequency)

| Rank | Lecture | Questions | % of pool |
|-----:|---------|----------:|----------:|
| 1 | Chapter 21: Controlling Fundamentals | 31 | 16.1% |
| 2 | Chapter 7: Principles of Planning | 30 | 15.6% |
| 3 | Chapter 18: Groups and Teams | 28 | 14.6% |
| 4 | Chapter 11: Fundamentals of Organizing | 27 | 14.1% |
| 5 | Chapter 15: Influencing and Communication | 22 | 11.5% |
| 6 | Chapter 1: Introduction | 16 | 8.3% |
| 7 | Chapter 8: Making Decisions | 15 | 7.8% |
| 8 | Chapter 13: Human Resource Management | 15 | 7.8% |
| 9 | Chapter 3: Business Ethics | 7 | 3.6% |
| 10 | Chapter 2: History and Current Thinking | 1 | 0.5% |

## Combined pool structure

Each lecture file contains every question tagged with:

- `origin` — `2019`, `2021`, `2024`, or `2025`
- `sourceFile` — original JSON filename
- `sourceQuestionId` — original question id (e.g. `Q12`, `Q1.a`)
- `questionType` — `true_false` or `mcq`
- `correctAnswerId`, `explanation`, `reference` — answer key and study notes (from merged exams)
- `slideRef`, `slideRefParsed` — programmatic lecture slide locator (`ch18:s9`, `ch13:s36-39`, `ch21:all`, `ch13:course`)

| Pool file | Lecture | Total | 2019 | 2021 | 2024 | 2025 |
|-----------|---------|------:|-----:|-----:|-----:|-----:|
| `chapter-1-introduction.json` | Chapter 1: Introduction | 16 | 0 | 7 | 5 | 4 |
| `chapter-2-history-and-current-thinking.json` | Chapter 2: History and Current Thinking | 1 | 0 | 0 | 0 | 1 |
| `chapter-3-business-ethics.json` | Chapter 3: Business Ethics | 7 | 0 | 0 | 6 | 1 |
| `chapter-7-principles-of-planning.json` | Chapter 7: Principles of Planning | 30 | 4 | 7 | 9 | 10 |
| `chapter-8-making-decisions.json` | Chapter 8: Making Decisions | 15 | 3 | 5 | 6 | 1 |
| `chapter-11-fundamentals-of-organizing.json` | Chapter 11: Fundamentals of Organizing | 27 | 2 | 5 | 8 | 12 |
| `chapter-13-human-resource-management.json` | Chapter 13: Human Resource Management | 15 | 0 | 4 | 0 | 11 |
| `chapter-15-influencing-and-communication.json` | Chapter 15: Influencing and Communication | 22 | 2 | 5 | 13 | 2 |
| `chapter-18-groups-and-teams.json` | Chapter 18: Groups and Teams | 28 | 3 | 5 | 13 | 7 |
| `chapter-21-controlling-fundamentals.json` | Chapter 21: Controlling Fundamentals | 31 | 4 | 10 | 6 | 11 |

See `question-pools-by-lecture/_index.json` for machine-readable metadata.

## Cross-exam repetition (normalized stems + matching answers)

**34** distinct question stems (normalized text + correct answer) appear more than once across the four exams (**37** duplicate appearances). These are the strongest signals of examiner priority.

### Appeared in all four exams (maximum yield)

- **Chapter 18: Groups and Teams** (true_false): "A task group is a formal group outlined in the chain of command on an organization chart."

### Appeared in three exams

- [2019, 2021, 2024] **Chapter 15: Influencing and Communication**: "_________ is the process of sharing information with other individuals."

### Top repeated stems (2+ appearances)

| Times | Origins | Ans | Type | Lecture | Question (truncated) |
|------:|---------|:---:|------|---------|----------------------|
| 4 | 2019, 2021, 2024, 2025 | b | true_false | Chapter 18: Groups and Teams | A task group is a formal group outlined in the chain of command on an organizati |
| 3 | 2019, 2021, 2024 | 2 | mcq | Chapter 15: Influencing and Communication | _________ is the process of sharing information with other individuals. |
| 2 | 2019, 2021 | b | true_false | Chapter 8: Making Decisions | Implementation of the chosen alternative is the final step in the decision-makin |
| 2 | 2019, 2024 | a | true_false | Chapter 11: Fundamentals of Organizing | Bureaucracy can be characterized as a management system with detailed procedures |
| 2 | 2019, 2024 | b | true_false | Chapter 15: Influencing and Communication | Communication is considered a supplementary management skill rather than a funda |
| 2 | 2019, 2024 | b | true_false | Chapter 21: Controlling Fundamentals | In order to preserve their position power, managers should avoid doing personal  |
| 2 | 2021, 2025 | b | true_false | Chapter 1: Introduction | Human skills, unlike technical skills, involve the ability to see the organizati |
| 2 | 2021, 2024 | b | true_false | Chapter 18: Groups and Teams | Groupthink is a group decision-making process in which negative feedback on any  |
| 2 | 2021, 2025 | b | true_false | Chapter 11: Fundamentals of Organizing | Span of management refers to the number of organizational levels below that of a |
| 2 | 2021, 2025 | b | true_false | Chapter 13: Human Resource Management | Wikstrom's human resource inventory forms are meant to be used exclusively for f |
| 2 | 2021, 2024 | b | true_false | Chapter 15: Influencing and Communication | The basic elements of the interpersonal communication process are the source, th |
| 2 | 2024, 2025 | b | true_false | Chapter 11: Fundamentals of Organizing | Henri Fayol recommends that businesses establish multiple guiding authorities wh |
| 2 | 2024, 2025 | a | true_false | Chapter 11: Fundamentals of Organizing | Vertical dimensioning is directly related to the concept of the scalar relations |
| 2 | 2019, 2021 | 3 | mcq | Chapter 11: Fundamentals of Organizing | _________ is the assignment of various portions of a particular task among a num |
| 2 | 2019, 2021 | 2 | mcq | Chapter 7: Principles of Planning | Which of the following is an advantage of planning? |
| 2 | 2019, 2021 | 2 | mcq | Chapter 21: Controlling Fundamentals | _________ is managerial activity aimed at bringing organizational performance up |
| 2 | 2019, 2021 | 3 | mcq | Chapter 21: Controlling Fundamentals | _________ is the systematic effort to compare performance to predetermined stand |
| 2 | 2021, 2024 | a | mcq | Chapter 1: Introduction | The more resources unused during the production process, the more ________ the m |
| 2 | 2021, 2024 | e | mcq | Chapter 8: Making Decisions | This is an example of a(n) |
| 2 | 2021, 2024 | c | mcq | Chapter 8: Making Decisions | Which of the following is a traditional technique for solving a programmed decis |
| 2 | 2021, 2024 | e | mcq | Chapter 15: Influencing and Communication | The person in the interpersonal communication situation who originates and encod |
| 2 | 2021, 2024 | a | mcq | Chapter 15: Influencing and Communication | Which of the following is a communication macrobarrier? |
| 2 | 2021, 2024 | c | mcq | Chapter 21: Controlling Fundamentals | ________ and ________ have been called the "Siamese twins of management." |
| 2 | 2021, 2024 | c | mcq | Chapter 21: Controlling Fundamentals | The level of activity established to serve as a model for evaluating organizatio |
| 2 | 2024, 2025 | c | mcq | Chapter 21: Controlling Fundamentals | ____ is the management function through which managers compare present performan |
| 2 | 2024, 2025 | a | mcq | Chapter 11: Fundamentals of Organizing | ____ includes determining tasks and groupings of work. It should not be rigid, b |
| 2 | 2024, 2025 | a | mcq | Chapter 1: Introduction | Which of the following statements is true for the management function? |
| 2 | 2024, 2025 | a | mcq | Chapter 1: Introduction | Name one of the basic concepts for smoothly running an organisation. |
| 2 | 2024, 2025 | c | mcq | Chapter 7: Principles of Planning | At what step of the planning can be processed with the topmost and applicable pl |
| 2 | 2024, 2025 | d | mcq | Chapter 7: Principles of Planning | In which pace of the planning process, two sides of a coin of each alternative a |

## Lecture-level trends by exam year

### 2019

| Lecture | Count | T/F | MCQ |
|---------|------:|----:|----:|
| Chapter 7: Principles of Planning | 4 | 1 | 3 |
| Chapter 21: Controlling Fundamentals | 4 | 2 | 2 |
| Chapter 8: Making Decisions | 3 | 2 | 1 |
| Chapter 18: Groups and Teams | 3 | 1 | 2 |
| Chapter 11: Fundamentals of Organizing | 2 | 1 | 1 |
| Chapter 15: Influencing and Communication | 2 | 1 | 1 |

### 2021

| Lecture | Count | T/F | MCQ |
|---------|------:|----:|----:|
| Chapter 21: Controlling Fundamentals | 10 | 4 | 6 |
| Chapter 7: Principles of Planning | 7 | 6 | 1 |
| Chapter 1: Introduction | 7 | 4 | 3 |
| Chapter 8: Making Decisions | 5 | 3 | 2 |
| Chapter 18: Groups and Teams | 5 | 2 | 3 |
| Chapter 11: Fundamentals of Organizing | 5 | 2 | 3 |
| Chapter 15: Influencing and Communication | 5 | 1 | 4 |
| Chapter 13: Human Resource Management | 4 | 2 | 2 |

### 2024

| Lecture | Count | T/F | MCQ |
|---------|------:|----:|----:|
| Chapter 18: Groups and Teams | 13 | 4 | 9 |
| Chapter 15: Influencing and Communication | 13 | 3 | 10 |
| Chapter 7: Principles of Planning | 9 | 0 | 9 |
| Chapter 11: Fundamentals of Organizing | 8 | 4 | 4 |
| Chapter 8: Making Decisions | 6 | 2 | 4 |
| Chapter 21: Controlling Fundamentals | 6 | 2 | 4 |
| Chapter 3: Business Ethics | 6 | 0 | 6 |
| Chapter 1: Introduction | 5 | 0 | 5 |

### 2025

| Lecture | Count | T/F | MCQ |
|---------|------:|----:|----:|
| Chapter 11: Fundamentals of Organizing | 12 | 3 | 9 |
| Chapter 21: Controlling Fundamentals | 11 | 2 | 9 |
| Chapter 13: Human Resource Management | 11 | 3 | 8 |
| Chapter 7: Principles of Planning | 10 | 0 | 10 |
| Chapter 18: Groups and Teams | 7 | 3 | 4 |
| Chapter 1: Introduction | 4 | 1 | 3 |
| Chapter 15: Influencing and Communication | 2 | 0 | 2 |
| Chapter 2: History and Current Thinking | 1 | 1 | 0 |
| Chapter 3: Business Ethics | 1 | 1 | 0 |
| Chapter 8: Making Decisions | 1 | 1 | 0 |

## Thematic / conceptual high-yield map

Keyword-based tagging across all stems (one question may match multiple themes):

| Theme | Matches | 2019 | 2021 | 2024 | 2025 |
|-------|--------:|-----:|-----:|-----:|-----:|
| Management functions (planning/organizing/influencing/controlling) | 43 | 4 | 10 | 9 | 20 |
| Groups & teams | 21 | 3 | 3 | 9 | 6 |
| Decision making & problem solving | 17 | 2 | 5 | 8 | 2 |
| Controlling / standards / deviations | 17 | 1 | 4 | 3 | 9 |
| Communication | 12 | 1 | 4 | 7 | 0 |
| Organizing / structure / span | 9 | 1 | 2 | 2 | 4 |
| Ethics | 6 | 0 | 0 | 5 | 1 |
| Power & politics | 4 | 1 | 2 | 1 | 0 |
| Skills (technical/human/conceptual) | 3 | 0 | 2 | 0 | 1 |
| HR / staffing | 3 | 0 | 2 | 0 | 1 |
| Fayol / classical management | 2 | 0 | 0 | 1 | 1 |

## Item-type patterns

- **True/False items:** 62 (32.3%)
- **Multiple choice (4–5 options):** 130
- **Fill-in-the-blank stems** (contain `____`): 34
- **T/F with negation/trap wording** (not, never, only, unlike, avoid, etc.): 7 (11% of all T/F)

### Format evolution by year

| Origin | True/False | MCQ | T/F share |
|--------|----------:|----:|----------:|
| 2019 | 8 | 10 | 44% |
| 2021 | 24 | 24 | 50% |
| 2024 | 15 | 51 | 23% |
| 2025 | 15 | 45 | 25% |

**Trend:** 2021 is evenly split T/F vs MCQ (50/50). 2024 and 2025 shift heavily toward MCQ (~77–75% MCQ). The **2019** sample (`final19.json`) is small (18 items) and MCQ-heavy—likely a condensed or alternate final blueprint.

## Psychological profile of the question writer

The following is an *inferred* profile from item design across four papers—not a claim about any individual instructor. It describes **recurring psychometric habits** visible in the pool.

### 1. Stability bias — recycle high-value concepts

The examiner reuses identical or near-identical stems across years (25 exact duplicates). Favorites include **groups vs teams**, **planning advantages**, **division of labor**, **communication barriers**, and **controlling fundamentals**. This suggests preparation should prioritize **recognition memory** on classic definitions, not only novel application.

### 2. Definition-truth testing (especially in 2021)

True/False items often pair a term with a *plausible but swapped* definition—e.g. confusing **influencing vs organizing**, **human vs conceptual skills**, **planning vs long-term horizon**. The writer tests whether students can **reject attractive false definitions**, not merely recall keywords.

### 3. Negation and contrast traps

At least **7** T/F stems (11% of T/F) use explicit negation or contrast cues (not, never, only, unlike, avoid, etc.)—and many more flip definitions without those keywords. The pattern rewards careful reading: **"unlike technical skills"**, **"does not highlight deviations"**, **"avoid doing personal favors"**. Under time pressure, students who pattern-match positive definitions will systematically miss these.

### 4. Textbook-faithful, chapter-aligned sampling

Topics map cleanly to textbook chapters (1, 3, 7, 8, 11, 13, 15, 18, 21 dominate; Chapter 2 barely appears). The writer appears to **sample proportionally from assigned chapters** rather than invent scenario-heavy cases. Expect **term-definition** and **list-advantage/disadvantage** MCQs over integrative case studies.

### 5. Classical management canon as anchor

Repeated references to **Fayol**, **bureaucracy**, **division of labor**, **scalar chain**, and **Mintzberg-style roles** show a **canonical theory** bias—modern agile/startup framing is largely absent.

### 6. Escalating MCQ sophistication (2024–2025)

Later exams add more **fill-in-blank MCQs** (sentence completion with five options) and longer stems. Difficulty moves from binary truth judgments to **discriminating among similar phrases** (e.g. types of groups, control steps, HR techniques).

### 7. Controlling and organizing as "terminal" chapters

Chapters **21 (Controlling)** and **11 (Organizing)** together account for ~30% of the pool—the highest share. Groups/teams (Ch. 18) and Planning (Ch. 7) follow. **Chapter 2 (History)** is essentially ignored—low ROI for cramming.

### 8. Fair but punitive on common student misconceptions

Items target known confusions: **consensus = slow but committed**, **intuitive ≠ systematic**, **task group vs informal group**, **implementation as last decision step**. The writer assumes students have **read chapter summaries** and lecture slides, not deep industry experience.

## Study strategy derived from this analysis

1. **Master the repeat list** — drill all exact cross-year duplicates first (see table above).
2. **Chapter weighting** — prioritize Ch. 21 → 7 → 18 → 11 → 15 → 8 → 13 → 1; skim Ch. 2.
3. **T/F drill** — practice negation-heavy stems; always identify *which function or skill* is named.
4. **MCQ drill** — for 2024/2025 style, practice **advantage/disadvantage** and **"which is NOT"** lists.
5. **Use lecture pool files** — study one JSON per chapter; filter by `origin` to simulate a specific year.
6. **Functions map** — one-page chart: Planning / Organizing / Influencing / Controlling definitions and synonyms.

## Appendix: fill-in-the-blank MCQ stems

- [2019] Chapter 11: Fundamentals of Organizing: "_________ is the assignment of various portions of a particular task among a number of organization members.…"
- [2019] Chapter 15: Influencing and Communication: "_________ is the process of sharing information with other individuals.…"
- [2019] Chapter 21: Controlling Fundamentals: "_________ is managerial activity aimed at bringing organizational performance up to the level of performance s…"
- [2019] Chapter 21: Controlling Fundamentals: "_________ is the systematic effort to compare performance to predetermined standards in order to determine whe…"
- [2021] Chapter 1: Introduction: "The more resources unused during the production process, the more ________ the manager.…"
- [2021] Chapter 11: Fundamentals of Organizing: "________ is the process of establishing orderly uses for resources within the management system.…"
- [2021] Chapter 11: Fundamentals of Organizing: "________ is the assignment of various portions of a particular task among a number of organization members.…"
- [2021] Chapter 13: Human Resource Management: "________ is the initial attraction and screening of the supply of prospective human resources available to fil…"
- [2021] Chapter 15: Influencing and Communication: "________ is the process of sharing information with other individuals.…"
- [2021] Chapter 15: Influencing and Communication: "The person in the interpersonal communication situation who originates and encodes information to be shared wi…"
- [2021] Chapter 18: Groups and Teams: "A formal group is a group that ________…"
- [2021] Chapter 18: Groups and Teams: "Formal groups that handle routine activities and are outlined on an organization chart are called ________…"
- [2021] Chapter 18: Groups and Teams: "Two formal groups that are often established in organizations are ________ and ________…"
- [2021] Chapter 21: Controlling Fundamentals: "________ is the systematic effort to compare performance to predetermined standards in order to determine whet…"
- [2021] Chapter 21: Controlling Fundamentals: "________ and ________ have been called the "Siamese twins of management."…"
- [2021] Chapter 21: Controlling Fundamentals: "The level of activity established to serve as a model for evaluating organizational performance is a(n) ______…"
- [2021] Chapter 21: Controlling Fundamentals: "________ is managerial activity aimed at bringing organizational performance up to the level of performance st…"
- [2021] Chapter 21: Controlling Fundamentals: "Because Jamie is the manager, her subordinates follow her instructions. This is an example of ________ power.…"
- [2024] Chapter 7: Principles of Planning: "____ and ____ have been called the "Siamese twins of management."…"
- [2024] Chapter 21: Controlling Fundamentals: "____ is the management function through which managers compare present performance to preestablished performan…"
- *…14 additional fill-in-blank items in pool files*

## Data files produced

```
question-pools-by-lecture/
  _index.json
  chapter-1-introduction.json
  chapter-2-history-and-current-thinking.json
  chapter-3-business-ethics.json
  chapter-7-principles-of-planning.json
  chapter-8-making-decisions.json
  chapter-11-fundamentals-of-organizing.json
  chapter-13-human-resource-management.json
  chapter-15-influencing-and-communication.json
  chapter-18-groups-and-teams.json
  chapter-21-controlling-fundamentals.json
repetitive-questions.json
lectures_manifest.json
SLIDE_REF_VALIDATION.md
slide_ref.py / apply_slide_refs.py
EXAM_QUESTION_ANALYSIS.md  (this file)
```