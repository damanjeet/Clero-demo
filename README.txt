# Clero – Career Growth Demo (Static)

This repository contains a static demo of **Clero**, a career transparency and growth platform.  
It is intended for internal partner review and UX validation.

## Concept

**Clero** helps professionals see:
- where they stand today (Growth Meter),
- how that score was calculated (Insights),
- what others said (Feedback),
- and what to do next (Actions).

Tagline: **“See your career, steer your path.”**

---

## Pages

### 1. Growth Meter (Landing)
- Overall growth score (1–10)
- Benchmark vs org average
- AI-generated summary (professional tone)
- Quick links to Insights, Feedback, Actions

### 2. Insights
Four capability areas:
- Technical
- Leadership
- Communication
- Innovation

Each area contains ~10 indicators (e.g. “Problem Solving”, “Decision Making”, “Written Communication”) with:
- individual score
- benchmark bar
- short explanation
- data sources (peer reviews, manager review, project outcomes)

### 3. Feedback
- **All comments**: anonymized feedback from peers/manager
- **AI summary**: corporate-style summary of feedback themes

### 4. Actions
- **Action plan**: short-term and long-term SMART-style goals, tied to indicators
- **Action progress**: simple kanban (To Do → In Progress → Completed)
- Completing actions is designed to update Growth Meter (mocked in this static demo)

---

## User

Demo user is **Raj Malhotra** (placeholder).  
All feedback and goals are generic / non-regional.

---

## Theme

- Default: **light**
- Header button toggles **dark mode**
- Modern SaaS styling (Inter font, card-based layout)

---

## How to run

1. Download / clone the repo
2. Open `index.html` in a browser  
   (or upload to GitHub Pages → Settings → Pages → Deploy from branch)

No build step is required.

---

## Notes for partners

- This is a **static prototype** – data is mocked in `script.js`
- In production, these objects would come from APIs:
  - insights (per role/level)
  - feedback (anonymized)
  - actions (with completion, evidence, and course suggestions)
- AI summaries are shown in a **corporate tone** to match enterprise expectations.

---

## Next steps (future)
- Add authentication
- Connect to HRIS / LMS for real learning suggestions
- Make scores editable / admin-configurable
- Convert to React (for component reuse and data fetching)