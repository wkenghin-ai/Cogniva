# cogniva. — Interactive A3 Academic Research Poster (NTU CC0007)

> **Empowering Minds. Enriching Lives.**  
> *Gamified & AI-Assisted Cognitive Rehabilitation for Older Adults with Early-Stage Dementia*

**Course:** Nanyang Technological University (NTU) — **CC0007: Science & Technology for Humanity**  
**Project Team:** Khai Liang · Qunming · Shan Xi · Keng · Qin Yan

---

## 1. Project Purpose & Overview

**Cogniva** is an interactive, single-screen **A3 Academic Research Poster** web application developed for NTU's **CC0007** interdisciplinary curriculum.

Rather than presenting a static wall of text or a multi-page scrolling website, Cogniva reimagines the university research poster as a **proportional, single-screen Canva-style A3 canvas** (`420 × 297 mm` Wide and `297 × 420 mm` Portrait aspect ratios). The entire poster remains visible within a single browser viewport without vertical scrolling. Viewers can click on any category box, evidence card, or application callout to smoothly expand detailed academic arguments, interactive demonstrations, playable cognitive test games, and peer-reviewed citations.

### Research Thesis
Older adults with mild cognitive impairment (MCI) or early-stage dementia in Singapore often struggle to sustain participation in home-based cognitive rehabilitation due to low motivation, complex digital interfaces, and limited caregiver or professional bandwidth. **Cogniva** proposes an integrated home-support model combining culturally familiar games, bounded AI-assisted personalisation (`75%–85%` comfort band), zero-friction senior UX, and lightweight caregiver summaries.

---

## 2. Core Features

### Single-Screen Proportional A3 Poster
- **Zero-Scroll Viewport Scaling**: Uses a `ResizeObserver` container to proportionally scale the A3 sheet (`1.414:1` aspect ratio) so all five academic categories are legible at a glance on any laptop, monitor, or projector.
- **A3 Orientation & Print Modes**: Switchable between **A3 Wide (`1640 × 1160 px`)** and **Canva A3 Portrait (`1120 × 1584 px`)**, with built-in `@media print` rules for single-page A3 PDF export.
- **60fps Spring-Physics Box Expansion**: Clicking any sub-box triggers a hardware-accelerated ripple burst and springs the detail modal open directly from the clicked box's coordinates using `motion/react`.

### Five Structured Academic Categories
1. **01 · Problem Statement (Proof Why)**
   - **Singapore's Growing Dementia Need (`1.1`)**: Features an interactive projection counter animating Singapore's rising dementia caseload from **53,000 in 2020** to **80,000 by 2030** (*GovTech Singapore, 2026*; *MOH, 2023*).
   - **Empirical Proof on Engagement (`1.2`)**: Synthesizes evidence from a systematic review and meta-analysis of **55 randomised controlled trials** showing that sustained engagement and adherence directly determine cognitive training outcomes (*Li et al., 2024*).
   - **Three Participation Barriers (`1.3`)**: Analyses usability friction (*Contreras-Somoza et al., 2021*), fading motivation (*Park et al., 2020*), and personalisation gaps (*Kwek et al., 2024*).
   - **The Unsolved Home Routine Gap (`1.4`)**: Highlights the transition gap between short, clinically supervised trials and independent daily home routines (*Clare et al., 2023*).

2. **02 · Solution & Playable Test Games**
   - **Bounded AI Activity Guide (`2.1`)**: Includes an interactive *"Help me understand"* widget that rewrites complex game rules into warm, plain-language prompts and speaks them aloud via Web Speech synthesis.
   - **Adaptive Support Dial (`2.2`)**: Interactive simulation demonstrating how task difficulty stays inside a frustration-free **`75%–85%` success comfort zone**.
   - **Five Playable Cognitive Test Games (`2.3 – 2.7`)**:
     - **Game 1 — Mahjong Matching (`2.3`)**: Culturally familiar Singapore Mahjong tile matching (`中`, `發`, `白`, `東`) exercising visual-spatial working memory and attention.
     - **Game 2 — Find the Differences (`2.4`)**: Side-by-side household scene comparison exercising selective visual attention and scanning.
     - **Game 3 — Match Photos to Names (`2.5`)**: Face-name association pairing family portraits with names and relationships.
     - **Game 4 — Question of the Day (`2.6`)**: Daily reminiscence prompt supporting spoken voice-to-text responses with no wrong answers.
     - **Game 5 — Familiar Everyday Sounds (`2.7`)**: Web Audio API synthesized household and nature sound recognition (boiling kopi kettle, morning songbird, afternoon rain).
   - **Senior-Friendly Support Toolbar**: Every test game includes an always-visible support bar with **Hint**, **Pause**, **Replay instructions**, **Easier option**, **Close**, and a **Post-game 1–5 star preference check**.

3. **03 · Three Interdisciplinary Lenses**
   - **STEM (`3.1 – 3.3`)**: Auto-adjusting game difficulty (`75%–85%` band), on-device frustration detection, and personalised game & caregiver summary generation.
   - **BIZ / GOV (`3.4 – 3.6`)**: Alignment with Singapore's *2023 Action Plan for Successful Ageing* (*MOH, 2023*), compliance with *AIHGle 2.0* healthcare AI guidelines (*MOH & HSA, 2026*), and low-cost web delivery without proprietary VR hardware (*Gentili et al., 2022*).
   - **Social Science (`3.7 – 3.9`)**: Zero-friction senior UX, culturally grounded & dignity-first design, and caregiver partnership (*Zhang & Wu, 2026*).

4. **04 · Advantages**
   - **Sustained Intrinsic Motivation (`4.1`)**: No countdown timers, no missed-day penalties, and no competitive leaderboards.
   - **Lower Caregiver Burden (`4.2`)**: On-demand spoken AI help and concise weekly caregiver summaries.
   - **Low Cost & Hardware-Free (`4.3`)**: Runs in standard web browsers on existing family tablets and smartphones.
   - **Safe, Bounded & Transparent AI (`4.4`)**: Strictly non-diagnostic difficulty adjustments within caregiver-approved boundaries.

5. **05 · Potential Limitations**
   - **Unvalidated Prototype Proposal (`5.1`)**: Requires a 20-week longitudinal trial (12-week supported home programme + 8-week reduced-support follow-up) to establish clinical and real-world efficacy (*Unsworth et al., 2021*).
   - **Initial Caregiver Setup Dependency (`5.2`)**: Relies on family members or Active Ageing Centres (AACs) for initial photo uploads and onboarding.
   - **Gameplay Signals $\neq$ Clinical Status (`5.3`)**: Touch latency and errors can reflect fatigue, glare, or arthritis rather than cognitive decline.
   - **Early-Stage Scope (`5.4`)**: Designed for MCI and early-stage dementia; cannot replace direct occupational therapy in moderate-to-severe stages.

### Interactive 18-Source Evidence Library
- Every claim across the poster includes clickable **citation chips** (e.g., `Jia et al., 2024 [1]`, `Li et al., 2024 [5]`, `MOH & HSA, 2026 [13]`) that jump directly to the corresponding source card with its disciplinary lens badge (`STEM`, `BIZ`, `GOV`, `SSH`), full reference title, role in the knowledge base, and external DOI/URL link.

---

## 3. Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | React 19 + TypeScript |
| **Build Tool** | Vite 8 |
| **Styling** | Tailwind CSS v4 (`@tailwindcss/vite`) |
| **Animations** | `motion/react` (spring physics & shared layout transitions) |
| **Icons & Graphics** | `lucide-react` + custom SVG illustrations & HTML5 `<canvas>` |
| **Audio Synthesis** | Browser Web Audio API & Web Speech API (`speechSynthesis`) |
| **Unit Testing** | Node.js Test Runner (`node:test` via `tsx`) |

---

## 4. Getting Started: Build & Run Instructions

### Prerequisites
- **Node.js**: v18.0.0 or higher (v20+ recommended)
- **npm**: v9.0.0 or higher

### 1. Install Dependencies
From the project root directory, install all required packages:

```bash
npm install
```

### 2. Run the Development Server
Start the local Vite development server on `http://localhost:3000`:

```bash
npm run dev
```

Open **`http://localhost:3000`** in your browser to interact with the A3 poster.

### 3. Run Unit Tests
Execute the unit test suite for the Mahjong tile-matching and adaptive hint engine:

```bash
npx tsx --test src/game/mahjongLogic.test.ts
```

### 4. Type-Check & Lint
Verify TypeScript types across the codebase:

```bash
npm run lint
```

### 5. Build for Production
Compile and bundle the application into the `/dist` directory for deployment:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

## 5. Project Directory Structure

```text
├── public/
│   └── assets/aistudio/
│       ├── image_7924f9f4.png        # Original Cogniva Hero Banner (Image A)
│       └── image_c956a4a3.png        # Original Cogniva Smartphone App Mockup (Image B)
├── src/
│   ├── components/
│   │   ├── ClickTransitionFX.tsx     # 60fps GPU-composited click ripple & sparkle burst
│   │   ├── DetailSceneModal.tsx      # Spring-animated expanded modal, widgets & citation viewer
│   │   ├── GameDemos.tsx             # 5 playable cognitive test games + senior support toolbar
│   │   ├── HotspotIcon.tsx           # Vector icon mapper for all poster points
│   │   └── WorldCanvas.tsx           # Ambient background constellation canvas
│   ├── data/
│   │   └── posterData.ts             # Structured academic content for all 5 categories & 18 sources
│   ├── game/
│   │   ├── mahjongLogic.ts           # Pure TypeScript Mahjong matching & adaptive hint logic
│   │   └── mahjongLogic.test.ts      # Automated unit tests for game state & hint rules
│   ├── App.tsx                       # Single-screen Canva A3 poster layout & modal controller
│   ├── index.css                     # Theme variables, A3 print rules & reduced-motion styles
│   └── main.tsx                      # React application entry point
├── index.html                        # HTML entry point & OpenGraph metadata
├── metadata.json                     # Application metadata
├── package.json                      # Scripts and dependencies
├── tsconfig.json                     # TypeScript configuration
└── README.md                         # Project documentation
```

---

## 6. Customization Guide

- **Colour Palette & Typography**: Edit the CSS custom properties at the top of `src/index.css` (`--poster-bg`, `--canva-sheet-bg`, `--poster-navy`, `--poster-cyan`, `--poster-teal`, `--poster-gold`).
- **Poster Content & Citations**: Edit `POSTER_DATA` and `SOURCE_LIBRARY_ITEMS` in `src/data/posterData.ts` to update any heading, explanation paragraph, or reference link.
- **Modal Transition Physics**: Adjust the spring configuration (`stiffness`, `damping`, `mass`) inside `src/components/DetailSceneModal.tsx`.
