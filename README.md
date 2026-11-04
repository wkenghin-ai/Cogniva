# Cogniva — Interactive A3 Academic Research Poster (NTU CC0007)

**Empowering Minds. Enriching Lives.**  
*Gamified & AI-Assisted Cognitive Rehabilitation for Older Adults with Early-Stage Dementia*

**Project Team (NTU CC0007):** Khai Liang · Qunming · Shan Xi · Keng · Qin Yan

---

## Overview

**Cogniva** is an interactive, single-screen Canva-style **A3 Academic Research Poster** built for Nanyang Technological University's **CC0007** interdisciplinary project.

The entire A3 poster fits proportionally inside a single screen without requiring vertical scrolling. Viewers can click on any category box, evidence point, or game callout on the poster to smoothly expand its detailed academic explanation, interactive widgets, citation links, and playable cognitive game demos.

---

## Core Poster Categories

The poster is structured around five core academic categories:

1. **01 · Problem Statement (Proof Why)**
   - **1.1 Proof of Growing Need in Singapore**: Rising dementia prevalence from **53,000 (2020)** to **80,000 by 2030** (*GovTech Singapore, 2026*; *MOH, 2023*) — featuring an interactive animated projection counter.
   - **1.2 Proof Why Participation Matters (55 RCTs)**: Systematic review and meta-analysis showing sustained engagement, persistence, and adherence directly drive cognitive training outcomes (*Li et al., 2024*; *Park et al., 2020*).
   - **1.3 Three Participation Barriers (Usability, Motivation, Personalisation)**: Why existing digital tools struggle to sustain participation at home (*Contreras-Somoza et al., 2021*; *Kwek et al., 2024*).
   - **1.4 The Home Routine Gap**: Bridging the gap between short, clinically supervised trials and long-term independent home routines (*Clare et al., 2023*).

2. **02 · Solution (Including Playable Test Games)**
   - **2.1 Bounded AI Activity Guide**: Interactive *"Help me understand"* plain-language instruction simplifier with spoken audio output.
   - **2.2 Adaptive Support (`75%–85%` Comfort Band)**: Interactive difficulty calibration dial keeping sessions inside a frustration-free success zone.
   - **2.3 Test Game 1 — Mahjong Matching (Playable Demo)**: Culturally familiar Singapore Mahjong tile matching (`中`, `發`, `白`, `東`) with hints, pause, spoken instructions, and easier options.
   - **2.4 Test Game 2 — Find the Differences (Playable Demo)**: Side-by-side home scene comparison exercising selective visual attention.
   - **2.5 Test Game 3 — Match Photos to Names (Playable Demo)**: Face-name association using familiar family portraits.
   - **2.6 Test Game 4 — Question of the Day (Playable Demo)**: Daily reminiscence prompt with voice-to-text and no wrong answers.
   - **2.7 Test Game 5 — Familiar Everyday Sounds (Playable Demo)**: Web Audio synthesized household and nature sound recognition.

3. **03 · Three Interdisciplinary Lenses**
   - **STEM**: Auto-adjusting game difficulty (`75%–85%` band), on-device frustration detection, and personalised game & summary engine.
   - **BIZ / GOV**: Alignment with Singapore's *2023 Action Plan for Successful Ageing* (*MOH, 2023*), compliance with *AIHGle 2.0* healthcare AI guidelines (*MOH & HSA, 2026*), and low-cost browser-based delivery.
   - **SOCIAL SCIENCE**: Zero-friction senior UX, culturally grounded & dignity-first activities, and caregiver partnership.

4. **04 · Advantages**
   - **4.1 Sustained Intrinsic Motivation**: Zero countdown timers, zero missed-day penalties, and zero competitive leaderboards.
   - **4.2 Lower Caregiver Burden**: On-demand AI spoken guidance and concise weekly caregiver summaries.
   - **4.3 Low Cost & Hardware-Free**: Runs in standard web browsers on existing family tablets and smartphones.
   - **4.4 Safe, Bounded & Transparent AI**: Operates strictly within predetermined difficulty steps and non-diagnostic boundaries.

5. **05 · Potential Limitations**
   - **5.1 Unvalidated Prototype Proposal**: Requires a 20-week longitudinal evaluation (12-week supported programme + 8-week reduced-support follow-up) to establish real-world efficacy.
   - **5.2 Initial Caregiver Setup Dependency**: Requires family or Active Ageing Centre (AAC) assistance for initial photo uploads and onboarding.
   - **5.3 Gameplay Signals $\neq$ Clinical Status**: Touch latency and errors can reflect fatigue, glare, or arthritis rather than cognitive status.
   - **5.4 Scope Limited to Early-Stage Dementia / MCI**: Not a replacement for clinical occupational therapy in moderate-to-severe dementia.

---

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling & Animations**: Tailwind CSS (`@tailwindcss/vite`), `motion/react` (60fps spring-physics modal transitions andGPU ripple effects), Lucide React icons
- **Testing**: Node.js built-in test runner (`node:test` via `tsx`)

---

## Getting Started Locally

```bash
# 1. Install dependencies
npm install

# 2. Start the development server on port 3000
npm run dev

# 3. Run unit tests for the Mahjong matching engine
npx tsx --test src/game/mahjongLogic.test.ts

# 4. Build for production
npm run build
```

---

## Project Structure

```text
├── public/assets/aistudio/
│   ├── image_7924f9f4.png        # Original Cogniva Hero Banner (Image A)
│   └── image_c956a4a3.png        # Original Cogniva Smartphone App Mockup (Image B)
├── src/
│   ├── components/
│   │   ├── ClickTransitionFX.tsx # 60fps GPU-composited click ripple & sparkle burst
│   │   ├── DetailSceneModal.tsx  # Spring-animated expanded modal, widgets & citation viewer
│   │   ├── GameDemos.tsx         # 5 playable cognitive test games + senior support toolbar
│   │   ├── HotspotIcon.tsx       # Vector icon mapper
│   │   └── WorldCanvas.tsx       # Ambient background constellation canvas
│   ├── data/
│   │   └── posterData.ts         # Complete academic content for all 5 categories & 18 sources
│   ├── game/
│   │   ├── mahjongLogic.ts       # Pure TypeScript Mahjong matching & adaptive hint engine
│   │   └── mahjongLogic.test.ts  # Unit test suite
│   ├── App.tsx                   # Single-screen Canva A3 poster layout & orientation controller
│   └── index.css                 # Theme tokens, A3 print rules & reduced-motion media queries
└── README.md
```
