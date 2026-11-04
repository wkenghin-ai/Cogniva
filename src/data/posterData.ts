export type LensCategory = 'STEM' | 'BIZ' | 'GOV' | 'SSH';

export interface CitationRef {
  label: string;
  sourceNumber: number;
}

export interface HotspotItem {
  id: string;
  chapterId: number;
  chapterTitle: string;
  icon: string;
  label: string;
  teaser?: string;
  title: string;
  body: string[];
  accent: string;
  citations?: CitationRef[];
  isHighlighted?: boolean;
  cluster?: 'STEM' | 'Business & Governance' | 'Social Sciences & Humanities';
  viewMode?: 'older-adult' | 'caregiver' | 'both';
  specialWidget?:
    | 'dementia-counter'
    | 'ai-guide-demo'
    | 'difficulty-dial'
    | 'game-stage'
    | 'source-card';
  gameData?: {
    kind: 'core' | 'pipeline';
    hook: string;
    focusTag: 'Memory' | 'Attention' | 'Association' | 'Reminiscence';
    howYouPlay: string;
    whatAiDoes: string;
    whatItExercises: string;
    demoType?: 'spot-diff' | 'match-names' | 'mahjong' | 'question-day' | 'familiar-sounds';
  };
  sourceData?: {
    number: number;
    shortCitation: string;
    fullTitle: string;
    lens: LensCategory;
    url: string;
    roleInKnowledgeBase: string;
  };
}

export interface ChapterData {
  id: number;
  navLabel: string;
  kicker: string;
  heading: string;
  subline?: string;
  alwaysVisibleCard?: string;
  accent: string;
  worldRegionName: string;
  hotspots: HotspotItem[];
}

export const SOURCE_LIBRARY_ITEMS: NonNullable<HotspotItem['sourceData']>[] = [
  {
    number: 1,
    shortCitation: 'Jia et al. (2024)',
    fullTitle:
      'Associations of computer gaming with incident dementia, cognitive functions, and brain structure.',
    lens: 'STEM',
    url: 'https://doi.org/10.1186/s13195-024-01496-7',
    roleInKnowledgeBase:
      'Examines the relationship between computer gaming, cognitive function, brain structure, and dementia risk. Provides evidence that game-based activities support cognitive function and justify engaging digital activities in cognitive rehabilitation.'
  },
  {
    number: 2,
    shortCitation: 'National Academies Press (2021)',
    fullTitle: 'Economic costs of dementia.',
    lens: 'BIZ',
    url: 'https://www.ncbi.nlm.nih.gov/books/NBK574335/',
    roleInKnowledgeBase:
      'Examines the economic burden of dementia, including medical care, long-term care, and unpaid caregiving costs. Shows that dementia creates substantial financial pressures on families and healthcare systems.'
  },
  {
    number: 3,
    shortCitation: 'GovTech Singapore (2026)',
    fullTitle: "Three ways tech is supporting Alzheimer's.",
    lens: 'GOV',
    url: 'https://www.tech.gov.sg/technews/three-ways-tech-is-supporting-alzheimers/',
    roleInKnowledgeBase:
      'Provides Singapore-specific context on the growing dementia population (53,000 in 2020 projected to reach 80,000 by 2030) and highlights how AI and smart technologies support dementia care.'
  },
  {
    number: 4,
    shortCitation: 'Zhang & Wu (2026)',
    fullTitle: 'Editorial: Transforming dementia caregiving through assistive technologies.',
    lens: 'SSH',
    url: 'https://doi.org/10.3389/fmed.2026.1864422',
    roleInKnowledgeBase:
      'Reviews how assistive technologies support people with dementia and their caregivers by improving safety, independence, and care delivery.'
  },
  {
    number: 5,
    shortCitation: 'Li, Z., He, H., Chen, Y., & Guan, Q. (2024)',
    fullTitle:
      'Effects of engagement, persistence and adherence on cognitive training outcomes (systematic review and meta-analysis).',
    lens: 'STEM',
    url: 'https://academic.oup.com/ageing/article/53/1/afad247/7585890',
    roleInKnowledgeBase:
      'Reviews evidence from 55 randomised controlled trials on how engagement, persistence, and adherence affect cognitive-training outcomes. Establishes sustained participation as a critical factor in rehabilitation effectiveness.'
  },
  {
    number: 6,
    shortCitation: 'Ministry of Health (2023)',
    fullTitle: 'Launch of the 2023 Action Plan for Successful Ageing.',
    lens: 'GOV',
    url: 'https://www.moh.gov.sg/newsroom/launch-of-the-2023-action-plan-for-successful-ageing/',
    roleInKnowledgeBase:
      "Outlines Singapore's national approach to successful ageing, including community support, preventive health, and home-based care innovation."
  },
  {
    number: 7,
    shortCitation: 'Kwek et al. (2024)',
    fullTitle:
      'Exploring the general acceptability and user experience of a digital therapeutic for cognitive training in a Singaporean senior population.',
    lens: 'SSH',
    url: 'https://formative.jmir.org/2025/1/e63568/',
    roleInKnowledgeBase:
      'Examines acceptability and user experience of a digital cognitive-training intervention among older adults in Singapore, highlighting local usability needs.'
  },
  {
    number: 8,
    shortCitation: 'Clare et al. (2023)',
    fullTitle:
      'Implementing a home-based personalised cognitive rehabilitation intervention for people with mild-to-moderate dementia: GREAT into Practice.',
    lens: 'STEM',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10510653/',
    roleInKnowledgeBase:
      'Evaluates how home-based, personalised cognitive rehabilitation can be implemented for people with mild-to-moderate dementia around meaningful everyday goals.'
  },
  {
    number: 9,
    shortCitation: 'Bernuzzi et al. (2026)',
    fullTitle:
      'Technology acceptance and perceived safety in AI-assisted eldercare interventions.',
    lens: 'SSH',
    url: 'https://doi.org/10.1016/j.archger.2025.105412',
    roleInKnowledgeBase:
      'Explores how older adults and families perceive AI-assisted support tools, emphasizing transparency, clear boundaries, and human oversight.'
  },
  {
    number: 10,
    shortCitation: 'Park et al. (2020)',
    fullTitle:
      'Virtual reality-based cognitive-motor rehabilitation in older adults with mild cognitive impairment: A randomized controlled study.',
    lens: 'SSH',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC7019601/',
    roleInKnowledgeBase:
      'Investigates a six-week VR rehabilitation programme in older adults with MCI, showing improved motivation and cognitive outcomes compared to conventional exercises.'
  },
  {
    number: 11,
    shortCitation: 'Konecny et al. (2026)',
    fullTitle:
      'Immersive technologies for cognitive rehabilitation in older adults: Systematic review.',
    lens: 'STEM',
    url: 'https://doi.org/10.3390/healthcare14020198',
    roleInKnowledgeBase:
      'Synthesizes evidence on digital and adaptive rehabilitation systems, highlighting real-time task calibration to reduce user frustration.'
  },
  {
    number: 12,
    shortCitation: 'Gentili et al. (2022)',
    fullTitle: 'The cost-effectiveness of digital health interventions: A systematic review.',
    lens: 'BIZ',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9399874/',
    roleInKnowledgeBase:
      'Reviews cost-effectiveness evidence for digital health tools, supporting scalable browser-based delivery over expensive specialized hardware.'
  },
  {
    number: 13,
    shortCitation: 'Ministry of Health & Health Sciences Authority (2026)',
    fullTitle: 'Artificial intelligence in healthcare guidelines (AIHGle 2.0).',
    lens: 'GOV',
    url: 'https://www.moh.gov.sg/resources-statistics/guidelines/artificial-intelligence-in-healthcare-guidelines/',
    roleInKnowledgeBase:
      'Sets out Singapore regulatory and governance expectations for safe, transparent, and non-diagnostic AI deployment in healthcare and community care.'
  },
  {
    number: 14,
    shortCitation: 'Li, Q. et al. (2026)',
    fullTitle: 'Online interventions for dementia caregiver burden and well-being.',
    lens: 'SSH',
    url: 'https://doi.org/10.1016/j.jamda.2025.11.008',
    roleInKnowledgeBase:
      'Demonstrates how structured digital tools and summaries reduce family caregiver stress and improve confidence in supporting home routines.'
  },
  {
    number: 15,
    shortCitation: 'Chang et al.',
    fullTitle:
      'Pilot randomized controlled study of a virtual reality cognitive intervention.',
    lens: 'STEM',
    url: 'https://doi.org/10.1155/2021/6689231',
    roleInKnowledgeBase:
      'Provides clinical trial evidence on interactive cognitive task engagement and short-term attention outcomes.'
  },
  {
    number: 16,
    shortCitation: 'Eaglestone & Gkaintatzi',
    fullTitle:
      'Cost-effectiveness of non-pharmacological interventions for mild-to-moderate dementia.',
    lens: 'BIZ',
    url: 'https://doi.org/10.1002/gps.5892',
    roleInKnowledgeBase:
      'Evaluates the economic value of non-pharmacological home and community interventions in delaying institutional care costs.'
  },
  {
    number: 17,
    shortCitation: 'Unsworth et al. (2021)',
    fullTitle:
      'The NICE Evidence Standards Framework for digital health technologies.',
    lens: 'GOV',
    url: 'https://doi.org/10.1016/S2589-7500(21)00042-X',
    roleInKnowledgeBase:
      'Establishes evaluation standards for digital health proposals, emphasizing longitudinal feasibility and real-world adherence testing.'
  },
  {
    number: 18,
    shortCitation: 'Contreras-Somoza et al. (2021)',
    fullTitle:
      'Usability and user experience of cognitive intervention technologies for elderly people with MCI or dementia: A systematic review.',
    lens: 'SSH',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8100576/',
    roleInKnowledgeBase:
      'Systematically reviews usability and UX of cognitive intervention technologies for older adults with MCI or dementia, identifying the need for extra time, assistance, and senior-friendly interfaces.'
  }
];

export const POSTER_DATA: {
  hero: {
    courseTag: string;
    title: string;
    pitch: string;
    team: string[];
  };
  chapters: ChapterData[];
} = {
  hero: {
    courseTag: 'NTU CC0007 · Prototype Proposal',
    title: 'Gamified & AI-Assisted Cognitive Rehabilitation for Dementia',
    pitch:
      'Our proposed platform uses bounded AI to explain cognitive activities in accessible ways, personalise their content, and help caregivers support regular participation at home.',
    team: ['Khai Liang', 'Qunming', 'Shan Xi', 'Keng', 'Qin Yan']
  },
  chapters: [
    // =========================================================================
    // CATEGORY 1: PROBLEM STATEMENT (PROOF WHY)
    // =========================================================================
    {
      id: 1,
      navLabel: '01 · Problem Statement (Proof Why)',
      kicker: '01 · PROBLEM STATEMENT & PROOF',
      heading: 'Why is home-based cognitive rehabilitation so hard to sustain?',
      alwaysVisibleCard:
        'Older adults with early-stage dementia in Singapore may struggle to consistently participate in home-based cognitive rehabilitation due to low motivation, difficulties using digital tools, and limited professional or caregiver support.',
      accent: '#1E88E5',
      worldRegionName: 'Problem Statement & Empirical Proof',
      hotspots: [
        {
          id: '1.1',
          chapterId: 1,
          chapterTitle: 'Problem Statement (Proof Why)',
          icon: 'trending-up',
          label: "Singapore's Growing Need (53k → 80k)",
          teaser: '53,000 in 2020 projected to reach 80,000 by 2030',
          title: "Proof of Need: Singapore's Rising Dementia Caseload",
          body: [
            'Dementia is a rapidly growing public health concern in Singapore. Approximately 53,000 people were living with dementia in 2020, and this figure is projected to reach 80,000 by 2030 (GovTech Singapore, 2026).',
            'Beyond direct medical care, dementia creates substantial long-term caregiving and financial pressures on families and healthcare systems (National Academies Press, 2021). Singapore’s 2023 Action Plan for Successful Ageing therefore prioritises sustainable home- and community-based support (MOH, 2023).'
          ],
          accent: '#F59E0B',
          specialWidget: 'dementia-counter',
          citations: [
            { label: 'GovTech, 2026', sourceNumber: 3 },
            { label: 'MOH, 2023', sourceNumber: 6 },
            { label: 'National Academies Press, 2021', sourceNumber: 2 }
          ]
        },
        {
          id: '1.2',
          chapterId: 1,
          chapterTitle: 'Problem Statement (Proof Why)',
          icon: 'bar-chart-2',
          label: 'Proof: 55 RCTs on Engagement',
          teaser: 'Meta-analysis proves adherence drives outcomes',
          title: 'Empirical Proof: Why Sustained Participation Matters',
          body: [
            'A systematic review and meta-analysis of 55 randomised controlled trials demonstrated that engagement, persistence, and adherence are decisive factors in whether cognitive training produces meaningful cognitive benefits (Li et al., 2024).',
            'Even well-designed cognitive exercises lose effectiveness when older adults drop out early or participate inconsistently. In contrast, a six-week VR rehabilitation trial with older adults with MCI showed that interactive, engaging activities significantly improved training motivation and cognitive performance compared with conventional drills (Park et al., 2020).'
          ],
          accent: '#00BDEB',
          citations: [
            { label: 'Li et al., 2024', sourceNumber: 5 },
            { label: 'Park et al., 2020', sourceNumber: 10 },
            { label: 'Jia et al., 2024', sourceNumber: 1 }
          ]
        },
        {
          id: '1.3',
          chapterId: 1,
          chapterTitle: 'Problem Statement (Proof Why)',
          icon: 'smartphone',
          label: 'Proof: Usability & Digital Barriers',
          teaser: 'Complex instructions demotivate seniors at home',
          title: 'Three Participation Barriers: Usability, Motivation & Personalisation',
          body: [
            '1. Usability Barrier: A systematic review of cognitive intervention technologies for older adults with MCI or dementia found that complex menus and unclear instructions require extra time and assistance to operate, creating cognitive friction when no therapist is present (Contreras-Somoza et al., 2021).',
            '2. Motivation Barrier: Repetitive, clinical-style drills cause interest to fade rapidly without warm feedback or culturally familiar context (Kwek et al., 2024).',
            '3. Personalisation & Support Barrier: One-size-fits-all difficulty levels either overwhelm users or bore them, while family caregivers cannot supervise every daily session (Zhang & Wu, 2026).'
          ],
          accent: '#38BDF8',
          citations: [
            { label: 'Contreras-Somoza et al., 2021', sourceNumber: 18 },
            { label: 'Kwek et al., 2024', sourceNumber: 7 },
            { label: 'Zhang & Wu, 2026', sourceNumber: 4 }
          ]
        },
        {
          id: '1.4',
          chapterId: 1,
          chapterTitle: 'Problem Statement (Proof Why)',
          icon: 'alert-circle',
          label: 'The Unsolved Home Routine Gap',
          teaser: 'Supervised trials work, but home routines falter',
          title: 'The Research Gap: Sustaining Independent Home Use',
          isHighlighted: true,
          body: [
            'While short, clinically supervised cognitive training trials show promising outcomes, far less is known about how to sustain participation independently in everyday home settings once intensive professional supervision ends (Clare et al., 2023; Li et al., 2024).',
            'Our project directly targets this gap by combining culturally familiar games, bounded AI guidance, and lightweight caregiver connection.'
          ],
          accent: '#F43F5E',
          citations: [
            { label: 'Clare et al., 2023', sourceNumber: 8 },
            { label: 'Li et al., 2024', sourceNumber: 5 }
          ]
        }
      ]
    },

    // =========================================================================
    // CATEGORY 2: SOLUTION (INCLUDING THE TEST GAMES)
    // =========================================================================
    {
      id: 2,
      navLabel: '02 · Solution & Test Games',
      kicker: '02 · SOLUTION & PLAYABLE TEST GAMES',
      heading: 'Gamified cognitive activities with bounded AI personalisation',
      subline:
        'Every test game includes: Hints · Pause · Replay instructions · Easier option · Post-game rating · No timers, penalties or leaderboards.',
      accent: '#14B8A6',
      worldRegionName: 'Solution Architecture & Playable Test Games',
      hotspots: [
        {
          id: '2.1',
          chapterId: 2,
          chapterTitle: 'Solution & Test Games',
          icon: 'bot',
          label: "AI Guide ('Help Me Understand')",
          teaser: 'Plain-language prompts & spoken audio guidance',
          title: 'Bounded AI Activity Guide & Senior-Friendly UX',
          specialWidget: 'ai-guide-demo',
          body: [
            'When an older adult feels unsure during an activity, tapping "Help me understand" rewrites the instruction into a shorter, step-by-step plain-language prompt and speaks it aloud.',
            'The interface uses a single prominent "Start Today" button, high-contrast typography, and zero countdown timers so seniors can participate comfortably without constant caregiver supervision (Contreras-Somoza et al., 2021; Kwek et al., 2024).'
          ],
          accent: '#14B8A6',
          citations: [
            { label: 'Contreras-Somoza et al., 2021', sourceNumber: 18 },
            { label: 'Kwek et al., 2024', sourceNumber: 7 }
          ]
        },
        {
          id: '2.2',
          chapterId: 2,
          chapterTitle: 'Solution & Test Games',
          icon: 'gauge',
          label: 'Adaptive Support (75%–85% Band)',
          teaser: 'Real-time calibration within safe limits',
          title: 'Bounded AI Personalisation & Adaptive Difficulty',
          specialWidget: 'difficulty-dial',
          body: [
            'Our AI personalises activity themes around caregiver-uploaded family photos and interests (such as cooking, gardening, or local neighbourhoods) while adjusting task difficulty by at most ±1 step per session to maintain a comfortable 75%–85% success band (Clare et al., 2023).',
            'Strict Safety Boundaries: The AI never diagnoses dementia progression, never alters clinical care plans, and never uses competitive leaderboards or failure screens (MOH & HSA, 2026).'
          ],
          accent: '#10B981',
          citations: [
            { label: 'Clare et al., 2023', sourceNumber: 8 },
            { label: 'MOH & HSA, 2026', sourceNumber: 13 }
          ]
        },
        {
          id: '2.3',
          chapterId: 2,
          chapterTitle: 'Solution & Test Games',
          icon: 'grid',
          label: 'Test Game 1: Mahjong Matching ★',
          teaser: 'Playable Demo · Visual memory & attention',
          title: 'Mahjong Matching (Playable Test Game)',
          accent: '#F59E0B',
          specialWidget: 'game-stage',
          body: [],
          gameData: {
            kind: 'core',
            hook: 'A culturally familiar Singapore tabletop favourite, adapted for calm, unhurried memory training.',
            focusTag: 'Memory',
            howYouPlay:
              'Tap large, high-contrast Mahjong tiles (Red Dragon 中, Fortune 發, White Dragon 白, East Wind 東) to find matching pairs at your own pace.',
            whatAiDoes:
              'Starts with a small 4-pair board, offers gentle gold-border hints when needed, and adjusts tile count within the 75%–85% comfort zone.',
            whatItExercises:
              'Visual-spatial working memory, pattern recognition, and sustained attention.',
            demoType: 'mahjong'
          },
          citations: [
            { label: 'Jia et al., 2024', sourceNumber: 1 },
            { label: 'Kwek et al., 2024', sourceNumber: 7 }
          ]
        },
        {
          id: '2.4',
          chapterId: 2,
          chapterTitle: 'Solution & Test Games',
          icon: 'search',
          label: 'Test Game 2: Find the Differences ★',
          teaser: 'Playable Demo · Visual scanning & observation',
          title: 'Find the Differences — Family Edition (Playable Test Game)',
          accent: '#38BDF8',
          specialWidget: 'game-stage',
          body: [],
          gameData: {
            kind: 'core',
            hook: 'Compare two warm home scenes side-by-side and tap the gentle visual changes.',
            focusTag: 'Attention',
            howYouPlay:
              'Look at two side-by-side living-room illustrations and tap the 3 subtle differences on the right-hand picture (or switch to Easier option for 2 differences).',
            whatAiDoes:
              'Generates subtle, high-contrast changes in familiar household scenes and provides plain-language location hints on request.',
            whatItExercises:
              'Selective visual attention, detail comparison, and visual scanning.',
            demoType: 'spot-diff'
          },
          citations: [
            { label: 'Jia et al., 2024', sourceNumber: 1 },
            { label: 'Contreras-Somoza et al., 2021', sourceNumber: 18 }
          ]
        },
        {
          id: '2.5',
          chapterId: 2,
          chapterTitle: 'Solution & Test Games',
          icon: 'image',
          label: 'Test Game 3: Match Photos to Names ★',
          teaser: 'Playable Demo · Face-name association',
          title: 'Match Photos to Names (Playable Test Game)',
          accent: '#14B8A6',
          specialWidget: 'game-stage',
          body: [],
          gameData: {
            kind: 'core',
            hook: 'Connect familiar family portraits with their names and relationships.',
            focusTag: 'Association',
            howYouPlay:
              'Tap a family portrait on the left (e.g., Uncle Tan, Ah Ma Mei, Grandson Ryan) and tap their matching name card on the right.',
            whatAiDoes:
              'Uses caregiver-uploaded family photos and adjusts the number of choices on screen if the user hesitates.',
            whatItExercises:
              'Episodic memory, face-name association, and personal identity connection.',
            demoType: 'match-names'
          },
          citations: [{ label: 'Clare et al., 2023', sourceNumber: 8 }]
        },
        {
          id: '2.6',
          chapterId: 2,
          chapterTitle: 'Solution & Test Games',
          icon: 'mic',
          label: 'Test Game 4: Question of the Day ★',
          teaser: 'Playable Demo · Voice reminiscence prompt',
          title: 'Question of the Day (Playable Test Game)',
          accent: '#A855F7',
          specialWidget: 'game-stage',
          body: [],
          gameData: {
            kind: 'core',
            hook: 'One warm reminiscence question each day—answered by speaking or typing, with no wrong answers.',
            focusTag: 'Reminiscence',
            howYouPlay:
              'View a familiar local prompt (e.g., Sunday Kopi at Tiong Bahru) and tap the microphone to share a spoken memory via voice-to-text.',
            whatAiDoes:
              'Tailors prompts around the user’s life history and shares a brief, uplifting conversation starter with family caregivers.',
            whatItExercises:
              'Autobiographical memory, expressive language, and emotional connection.',
            demoType: 'question-day'
          },
          citations: [
            { label: 'Clare et al., 2023', sourceNumber: 8 },
            { label: 'Zhang & Wu, 2026', sourceNumber: 4 }
          ]
        },
        {
          id: '2.7',
          chapterId: 2,
          chapterTitle: 'Solution & Test Games',
          icon: 'volume-2',
          label: 'Test Game 5: Familiar Sounds ★',
          teaser: 'Playable Demo · Auditory recognition',
          title: 'Familiar Sounds (Playable Test Game)',
          accent: '#0EA5E9',
          specialWidget: 'game-stage',
          body: [],
          gameData: {
            kind: 'core',
            hook: 'Listen to everyday household and nature sounds and match them to illustrated cards.',
            focusTag: 'Association',
            howYouPlay:
              'Tap "Play Sound" to hear a boiling kopi kettle, morning songbird, or afternoon rainstorm, then tap the matching picture card.',
            whatAiDoes:
              'Selects culturally familiar everyday sounds and narrows choices from 3 cards to 2 when Easier option is enabled.',
            whatItExercises:
              'Auditory processing, semantic association, and sensory recall.',
            demoType: 'familiar-sounds'
          },
          citations: [{ label: 'Kwek et al., 2024', sourceNumber: 7 }]
        }
      ]
    },

    // =========================================================================
    // CATEGORY 3: THREE LENSES (STEM, BIZ / GOV, SOCIAL SCIENCE)
    // =========================================================================
    {
      id: 3,
      navLabel: '03 · Three Lenses',
      kicker: '03 · INTERDISCIPLINARY LENSES',
      heading: 'Examined across STEM, Business & Governance, and Social Science',
      accent: '#155EEF',
      worldRegionName: 'Three Interdisciplinary Lenses',
      hotspots: [
        {
          id: '3.1',
          chapterId: 3,
          chapterTitle: 'Three Lenses',
          cluster: 'STEM',
          icon: 'gauge',
          label: 'Auto-Adjusting Game Difficulty',
          teaser: 'Keeps sessions in a 75%–85% success band',
          title: 'STEM Lens: Auto-Adjusting Game Difficulty',
          body: [
            'Starts with simple baseline games and uses reinforcement learning to track touch latency, hesitation pauses, and error rates, keeping the player inside a comfortable 75%–85% success rate across morning clarity or evening fatigue (Jia et al., 2024; Li et al., 2024).',
            'By preventing tasks from becoming either overwhelmingly hard or trivially repetitive, algorithmic pacing directly supports long-term adherence.'
          ],
          accent: '#38BDF8',
          citations: [
            { label: 'Jia et al., 2024', sourceNumber: 1 },
            { label: 'Li et al., 2024', sourceNumber: 5 }
          ]
        },
        {
          id: '3.2',
          chapterId: 3,
          chapterTitle: 'Three Lenses',
          cluster: 'STEM',
          icon: 'cpu',
          label: 'On-Device Frustration Detection',
          teaser: 'Detects distress locally & pivots gently',
          title: 'STEM Lens: On-Device Frustration Detection',
          body: [
            'Monitors interaction patterns locally on the device—such as rapid repeated taps, long inactivity pauses, or consecutive mismatches—to detect frustration early (Konecny et al., 2026; Contreras-Somoza et al., 2021).',
            'Instead of displaying a "Game Over" or failure screen, the system automatically offers a gentle hint, spoken encouragement, or a one-tap switch to an easier layout.'
          ],
          accent: '#38BDF8',
          citations: [
            { label: 'Konecny et al., 2026', sourceNumber: 11 },
            { label: 'Contreras-Somoza et al., 2021', sourceNumber: 18 }
          ]
        },
        {
          id: '3.3',
          chapterId: 3,
          chapterTitle: 'Three Lenses',
          cluster: 'STEM',
          icon: 'sparkles',
          label: 'Personalised Game & Summary Engine',
          teaser: 'Turns family photos into tailored activities',
          title: 'STEM Lens: Personalised Game & Summary Engine',
          body: [
            'Transforms caregiver-uploaded family photos, names, and hobby tags into tailored game rounds while generating concise, plain-language weekly participation summaries for family caregivers (Clare et al., 2023; Zhang & Wu, 2026).'
          ],
          accent: '#38BDF8',
          citations: [
            { label: 'Clare et al., 2023', sourceNumber: 8 },
            { label: 'Zhang & Wu, 2026', sourceNumber: 4 }
          ]
        },
        {
          id: '3.4',
          chapterId: 3,
          chapterTitle: 'Three Lenses',
          cluster: 'Business & Governance',
          icon: 'home',
          label: "Fits Singapore's Ageing Plans",
          teaser: 'Supports MOH 2023 Action Plan for Successful Ageing',
          title: "BIZ / GOV Lens: Alignment with Singapore's Ageing Strategy",
          body: [
            "Supports Singapore's 2023 Action Plan for Successful Ageing by shifting sustainable cognitive support into the home and community as national dementia cases rise toward 80,000 by 2030 (MOH, 2023; GovTech Singapore, 2026)."
          ],
          accent: '#14B8A6',
          citations: [
            { label: 'MOH, 2023', sourceNumber: 6 },
            { label: 'GovTech, 2026', sourceNumber: 3 }
          ]
        },
        {
          id: '3.5',
          chapterId: 3,
          chapterTitle: 'Three Lenses',
          cluster: 'Business & Governance',
          icon: 'shield-check',
          label: 'Follows Healthcare AI Rules',
          teaser: 'Compliant with MOH & HSA AIHGle 2.0 guidelines',
          title: 'BIZ / GOV Lens: Healthcare AI Governance (AIHGle 2.0)',
          body: [
            'Designed in accordance with Singapore’s Artificial Intelligence in Healthcare Guidelines (AIHGle 2.0) and the NICE Evidence Standards Framework (MOH & HSA, 2026; Unsworth et al., 2021).',
            'All AI recommendations remain bounded, non-diagnostic, transparent, and under human caregiver oversight.'
          ],
          accent: '#14B8A6',
          citations: [
            { label: 'MOH & HSA, 2026', sourceNumber: 13 },
            { label: 'Unsworth et al., 2021', sourceNumber: 17 }
          ]
        },
        {
          id: '3.6',
          chapterId: 3,
          chapterTitle: 'Three Lenses',
          cluster: 'Business & Governance',
          icon: 'dollar-sign',
          label: 'Low-Cost & Built to Last',
          teaser: 'Browser-based delivery without expensive hardware',
          title: 'BIZ / GOV Lens: Cost-Effective & Scalable Delivery',
          body: [
            'Delivered as a lightweight web application that runs on tablets and smartphones families already own—avoiding expensive VR headsets or clinical hardware while helping families manage the high economic burden of dementia care (National Academies Press, 2021; Gentili et al., 2022).'
          ],
          accent: '#14B8A6',
          citations: [
            { label: 'National Academies Press, 2021', sourceNumber: 2 },
            { label: 'Gentili et al., 2022', sourceNumber: 12 }
          ]
        },
        {
          id: '3.7',
          chapterId: 3,
          chapterTitle: 'Three Lenses',
          cluster: 'Social Sciences & Humanities',
          icon: 'smile',
          label: 'Zero-Friction Senior UX',
          teaser: 'One-button start, large text & audio prompts',
          title: 'Social Science Lens: Zero-Friction Senior UX',
          body: [
            'Eliminates complex navigation menus with a calm one-button homepage, generous touch targets, spoken instructions, and an always-visible support bar (Hint, Pause, Replay instructions, Easier option) tailored for older adults with MCI or early dementia (Contreras-Somoza et al., 2021; Kwek et al., 2024).'
          ],
          accent: '#0284C7',
          citations: [
            { label: 'Contreras-Somoza et al., 2021', sourceNumber: 18 },
            { label: 'Kwek et al., 2024', sourceNumber: 7 }
          ]
        },
        {
          id: '3.8',
          chapterId: 3,
          chapterTitle: 'Three Lenses',
          cluster: 'Social Sciences & Humanities',
          icon: 'heart',
          label: 'Culturally Grounded & Dignity-First',
          teaser: 'Mahjong tiles, local kopitiam memories & family photos',
          title: 'Social Science Lens: Culturally Grounded & Dignity-First Design',
          body: [
            'Respects the life experience and dignity of Singaporean seniors by anchoring activities in culturally resonant themes—such as traditional Mahjong tiles, family photo albums, and local everyday sounds—rather than infantilising or test-like drills (Kwek et al., 2024; Bernuzzi et al., 2026).'
          ],
          accent: '#0284C7',
          citations: [
            { label: 'Kwek et al., 2024', sourceNumber: 7 },
            { label: 'Bernuzzi et al., 2026', sourceNumber: 9 }
          ]
        },
        {
          id: '3.9',
          chapterId: 3,
          chapterTitle: 'Three Lenses',
          cluster: 'Social Sciences & Humanities',
          icon: 'users',
          label: 'Caregiver Partnership & Relief',
          teaser: 'Reduces family burnout with 2-minute setup & summaries',
          title: 'Social Science Lens: Supporting Both Seniors & Caregivers',
          body: [
            'Empowers older adults to complete 10–15 minute sessions more independently while giving caregivers concise, non-clinical progress updates and conversation starters—reducing caregiver burden and supporting shared family moments (Zhang & Wu, 2026; Li, Q. et al., 2026).'
          ],
          accent: '#0284C7',
          citations: [
            { label: 'Zhang & Wu, 2026', sourceNumber: 4 },
            { label: 'Li, Q. et al., 2026', sourceNumber: 14 }
          ]
        }
      ]
    },

    // =========================================================================
    // CATEGORY 4: ADVANTAGES
    // =========================================================================
    {
      id: 4,
      navLabel: '04 · Advantages',
      kicker: '04 · KEY ADVANTAGES',
      heading: 'Why our integrated approach improves home rehabilitation',
      accent: '#10B981',
      worldRegionName: 'Key Platform Advantages',
      hotspots: [
        {
          id: '4.1',
          chapterId: 4,
          chapterTitle: 'Advantages',
          icon: 'award',
          label: 'Sustained Intrinsic Motivation',
          teaser: 'No timers, no penalties & culturally familiar play',
          title: 'Advantage 1: Sustained Home Engagement Without Stress',
          body: [
            'Unlike clinical drill apps that cause anxiety through countdown timers or error scores, Cogniva removes all timers, leaderboards, and missed-day penalties.',
            'Combining familiar games (such as Mahjong Matching) with adaptive 75%–85% pacing sustains intrinsic motivation—the primary driver of cognitive training effectiveness across 55 RCTs (Li et al., 2024; Jia et al., 2024).'
          ],
          accent: '#10B981',
          citations: [
            { label: 'Li et al., 2024', sourceNumber: 5 },
            { label: 'Jia et al., 2024', sourceNumber: 1 }
          ]
        },
        {
          id: '4.2',
          chapterId: 4,
          chapterTitle: 'Advantages',
          icon: 'heart-handshake',
          label: 'Lower Caregiver Burden',
          teaser: 'On-demand AI help frees caregivers from constant supervision',
          title: 'Advantage 2: Independent Use & Reduced Caregiver Burnout',
          body: [
            'Because the AI Activity Guide explains rules in plain language and speaks instructions aloud whenever a user taps "Help me understand", seniors require less moment-to-moment supervision during daily sessions.',
            'Caregivers can upload family photos in minutes and receive short, factual weekly summaries rather than having to coach every exercise manually (Zhang & Wu, 2026; Li, Q. et al., 2026).'
          ],
          accent: '#14B8A6',
          citations: [
            { label: 'Zhang & Wu, 2026', sourceNumber: 4 },
            { label: 'Li, Q. et al., 2026', sourceNumber: 14 }
          ]
        },
        {
          id: '4.3',
          chapterId: 4,
          chapterTitle: 'Advantages',
          icon: 'dollar-sign',
          label: 'Low Cost & Hardware-Free',
          teaser: 'Runs on standard tablets & phones at home',
          title: 'Advantage 3: Accessible, Scalable & Cost-Effective',
          body: [
            'Unlike VR-based rehabilitation systems that require costly headsets and physical clinic space, Cogniva runs in any standard web browser on tablets or smartphones families already own (Gentili et al., 2022; Eaglestone & Gkaintatzi).',
            'This makes daily cognitive support practical to scale across community care partners and households in Singapore (MOH, 2023).'
          ],
          accent: '#38BDF8',
          citations: [
            { label: 'Gentili et al., 2022', sourceNumber: 12 },
            { label: 'Eaglestone & Gkaintatzi', sourceNumber: 16 },
            { label: 'MOH, 2023', sourceNumber: 6 }
          ]
        },
        {
          id: '4.4',
          chapterId: 4,
          chapterTitle: 'Advantages',
          icon: 'shield-check',
          label: 'Safe, Bounded & Transparent AI',
          teaser: 'Strict guardrails aligned with AIHGle 2.0',
          title: 'Advantage 4: Bounded AI Governance & Emotional Safety',
          body: [
            'All AI personalisation operates within predetermined difficulty steps and caregiver-approved family media. The platform never makes clinical diagnoses or autonomous medical decisions, aligning with MOH & HSA AIHGle 2.0 guidelines (MOH & HSA, 2026; Bernuzzi et al., 2026).'
          ],
          accent: '#F59E0B',
          citations: [
            { label: 'MOH & HSA, 2026', sourceNumber: 13 },
            { label: 'Bernuzzi et al., 2026', sourceNumber: 9 }
          ]
        }
      ]
    },

    // =========================================================================
    // CATEGORY 5: POTENTIAL LIMITATIONS
    // =========================================================================
    {
      id: 5,
      navLabel: '05 · Potential Limitations',
      kicker: '05 · POTENTIAL LIMITATIONS & HONEST SCOPE',
      heading: 'Honest limitations and what must be tested next',
      accent: '#F43F5E',
      worldRegionName: 'Potential Limitations & Evaluation Scope',
      hotspots: [
        {
          id: '5.1',
          chapterId: 5,
          chapterTitle: 'Potential Limitations',
          icon: 'alert-triangle',
          label: 'Unvalidated Prototype Proposal',
          teaser: 'Requires a 20-week longitudinal trial to prove efficacy',
          title: 'Limitation 1: Design Proposal Requiring Empirical Validation',
          isHighlighted: true,
          body: [
            'Our platform and game mechanics are research-informed design proposals, not yet clinically proven interventions. While grounded in 18 peer-reviewed and policy sources, real-world effectiveness must be tested through our proposed 20-week study (12 weeks of supported home use followed by 8 weeks of reduced support) to verify whether engagement and cognitive benefits persist over time (Unsworth et al., 2021; Li et al., 2024).'
          ],
          accent: '#F43F5E',
          citations: [
            { label: 'Unsworth et al., 2021', sourceNumber: 17 },
            { label: 'Li et al., 2024', sourceNumber: 5 }
          ]
        },
        {
          id: '5.2',
          chapterId: 5,
          chapterTitle: 'Potential Limitations',
          icon: 'users',
          label: 'Initial Caregiver Setup Needed',
          teaser: 'Seniors living alone may need community onboarding',
          title: 'Limitation 2: Onboarding & Caregiver Setup Dependency',
          body: [
            'Personalised games rely on family members or community care staff to upload initial photos, names, and interest tags, and to help introduce the tablet routine during the first weeks (Contreras-Somoza et al., 2021; Clare et al., 2023).',
            'Older adults living alone with limited family support may require assistance from Active Ageing Centres (AACs) to set up and personalise their profile.'
          ],
          accent: '#F59E0B',
          citations: [
            { label: 'Contreras-Somoza et al., 2021', sourceNumber: 18 },
            { label: 'Clare et al., 2023', sourceNumber: 8 }
          ]
        },
        {
          id: '5.3',
          chapterId: 5,
          chapterTitle: 'Potential Limitations',
          icon: 'activity',
          label: 'Gameplay Signals ≠ Clinical Status',
          teaser: 'Fatigue or glare can affect tap speed and errors',
          title: 'Limitation 3: Confounding Factors in Touch & Gameplay Metrics',
          body: [
            'Slower tap responses or mismatches during a game can be caused by tired eyes, screen glare, arthritis, or distraction rather than cognitive decline (Bernuzzi et al., 2026; Kwek et al., 2024).',
            'Therefore, gameplay metrics can only guide in-game comfort adjustments and must never be interpreted as a clinical measurement of dementia progression.'
          ],
          accent: '#38BDF8',
          citations: [
            { label: 'Bernuzzi et al., 2026', sourceNumber: 9 },
            { label: 'Kwek et al., 2024', sourceNumber: 7 }
          ]
        },
        {
          id: '5.4',
          chapterId: 5,
          chapterTitle: 'Potential Limitations',
          icon: 'slash',
          label: 'Scope Limited to Early-Stage',
          teaser: 'Not a replacement for clinical care in advanced stages',
          title: 'Limitation 4: Intended for Early-Stage Dementia / MCI Only',
          body: [
            'Self-directed tablet activities are designed specifically for older adults with mild cognitive impairment (MCI) or early-stage dementia who retain sufficient visual and motor ability to interact with a screen.',
            'As dementia progresses to moderate or severe stages, digital games cannot replace direct occupational therapy, medical care, and human caregiving (MOH & HSA, 2026; Clare et al., 2023).'
          ],
          accent: '#FB7185',
          citations: [
            { label: 'MOH & HSA, 2026', sourceNumber: 13 },
            { label: 'Clare et al., 2023', sourceNumber: 8 }
          ]
        }
      ]
    },

    // =========================================================================
    // SOURCE LIBRARY LOOKUP (For Citation Chips inside the 5 Categories)
    // =========================================================================
    {
      id: 9,
      navLabel: 'References · 18 Sources',
      kicker: 'EVIDENCE BASE · 18 VERIFIED SOURCES',
      heading: '18 verified sources across STEM, Business, Governance & Humanities',
      accent: '#38BDF8',
      worldRegionName: 'Academic & Policy Reference Library',
      hotspots: SOURCE_LIBRARY_ITEMS.map((src) => ({
        id: `9.${src.number}`,
        chapterId: 9,
        chapterTitle: 'Evidence & Source Library',
        icon: 'book-open',
        label: src.shortCitation,
        teaser: `${src.lens} · ${src.fullTitle.slice(0, 48)}...`,
        title: `${src.shortCitation}`,
        body: [src.roleInKnowledgeBase],
        accent:
          src.lens === 'STEM'
            ? '#38BDF8'
            : src.lens === 'BIZ'
            ? '#F59E0B'
            : src.lens === 'GOV'
            ? '#14B8A6'
            : '#FB7185',
        specialWidget: 'source-card',
        sourceData: src
      }))
    }
  ]
};

/**
 * Helper to look up any hotspot across all chapters by its ID, or get its chapter sibling list.
 */
export function findHotspotById(id: string): {
  hotspot: HotspotItem;
  chapter: ChapterData;
  prevHotspot: HotspotItem | null;
  nextHotspot: HotspotItem | null;
} | null {
  for (const chapter of POSTER_DATA.chapters) {
    const idx = chapter.hotspots.findIndex((h) => h.id === id);
    if (idx !== -1) {
      return {
        hotspot: chapter.hotspots[idx],
        chapter,
        prevHotspot: idx > 0 ? chapter.hotspots[idx - 1] : null,
        nextHotspot: idx < chapter.hotspots.length - 1 ? chapter.hotspots[idx + 1] : null
      };
    }
  }
  return null;
}
