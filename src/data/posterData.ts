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

export const SOURCE_LIBRARY_ITEMS: HotspotItem['sourceData'][] = [
  {
    number: 1,
    shortCitation: 'Jia et al. (2024)',
    fullTitle: 'Associations of computer gaming with incident dementia, cognitive functions, and brain structure.',
    lens: 'STEM',
    url: 'https://doi.org/10.1186/s13195-024-01496-7',
    roleInKnowledgeBase:
      'Examines the relationship between computer gaming, cognitive function, brain structure, and dementia risk. It provides evidence that game-based activities may have cognitive benefits, supporting further exploration of engaging digital activities in cognitive rehabilitation.'
  },
  {
    number: 2,
    shortCitation: 'National Academies Press (2021)',
    fullTitle: 'Economic costs of dementia.',
    lens: 'BIZ',
    url: 'https://www.ncbi.nlm.nih.gov/books/NBK574335/',
    roleInKnowledgeBase:
      'Examines the economic burden of dementia, including medical care, long-term care, and unpaid caregiving costs. It shows that dementia is not only a health issue but also creates substantial financial pressures on families and healthcare systems.'
  },
  {
    number: 3,
    shortCitation: 'GovTech Singapore (2026)',
    fullTitle: "Three ways tech is supporting Alzheimer's.",
    lens: 'GOV',
    url: 'https://www.tech.gov.sg/technews/three-ways-tech-is-supporting-alzheimers/',
    roleInKnowledgeBase:
      'Provides Singapore-specific context on the growing dementia population and highlights how technologies such as AI, VR, and smart-home systems are being explored for dementia detection, education, and support. It connects our problem to local technological and policy developments.'
  },
  {
    number: 4,
    shortCitation: 'Zhang & Wu (2026)',
    fullTitle: 'Editorial: Transforming dementia caregiving through assistive technologies.',
    lens: 'SSH',
    url: 'https://doi.org/10.3389/fmed.2026.1864422',
    roleInKnowledgeBase:
      'Reviews how assistive technologies can support people with dementia and their caregivers by improving safety, independence, and care delivery. It adds a caregiver perspective, showing that successful technological interventions must consider both older adults and those supporting them.'
  },
  {
    number: 5,
    shortCitation: 'Li, Z., He, H., Chen, Y., & Guan, Q. (2024)',
    fullTitle: 'Effects of engagement, persistence and adherence on cognitive training outcomes (systematic review and meta-analysis).',
    lens: 'STEM',
    url: 'https://academic.oup.com/ageing/article/53/1/afad247/7585890',
    roleInKnowledgeBase:
      'Reviews evidence from randomised controlled trials on how engagement, persistence and adherence affect cognitive-training outcomes. It establishes sustained participation as a key factor in rehabilitation effectiveness, directly supporting our focus on keeping older adults engaged over time.'
  },
  {
    number: 6,
    shortCitation: 'Ministry of Health (2023)',
    fullTitle: 'Launch of the 2023 Action Plan for Successful Ageing.',
    lens: 'GOV',
    url: 'https://www.moh.gov.sg/newsroom/launch-of-the-2023-action-plan-for-successful-ageing/',
    roleInKnowledgeBase:
      "Outlines Singapore's national approach to successful ageing, including community support, preventive health and innovation. It places our problem within Singapore's wider ageing strategy and supports the relevance of developing interventions that can work effectively within community and home settings."
  },
  {
    number: 7,
    shortCitation: 'Kwek et al. (2024)',
    fullTitle: 'Exploring the general acceptability and user experience of a digital therapeutic for cognitive training in a Singaporean senior population.',
    lens: 'SSH',
    url: 'https://formative.jmir.org/2025/1/e63568/',
    roleInKnowledgeBase:
      "Investigates Singaporean older adults' experiences with digital cognitive training. Participants generally accepted and enjoyed the intervention, but faced comprehension and instruction difficulties. The study highlights motivation, clear guidance, and usability as important factors affecting adoption and continued participation."
  },
  {
    number: 8,
    shortCitation: 'Clare et al. (2023)',
    fullTitle: 'Implementing a home-based personalised cognitive rehabilitation intervention for people with mild-to-moderate dementia: GREAT into practice.',
    lens: 'STEM',
    url: 'https://doi.org/10.1186/s12877-022-03705-0',
    roleInKnowledgeBase:
      'Examines the implementation of personalised cognitive rehabilitation for people with mild-to-moderate dementia in home and community settings. It shows that rehabilitation can be delivered outside controlled research environments while revealing organisational and practical barriers that may affect long-term sustainability.'
  },
  {
    number: 9,
    shortCitation: 'Bernuzzi et al. (2026)',
    fullTitle: 'Technology acceptance and perceived safety in AI-driven home monitoring for mild cognitive impairment.',
    lens: 'SSH',
    url: 'https://doi.org/10.1016/j.ssci.2026.107303',
    roleInKnowledgeBase:
      'Examines how people with mild cognitive impairment and caregivers perceive AI-driven monitoring used in the home over time. It highlights how safety, autonomy, everyday routines, and acceptance influence continued technology use, extending our understanding beyond technical performance alone.'
  },
  {
    number: 10,
    shortCitation: 'Park et al. (2020)',
    fullTitle: 'Virtual reality-based cognitive-motor rehabilitation in older adults with mild cognitive impairment: Motivation and cognitive function.',
    lens: 'SSH',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC7551774/',
    roleInKnowledgeBase:
      'Compares VR-based cognitive-motor rehabilitation with conventional approaches for older adults with mild cognitive impairment. It reports greater interest and motivation alongside improvements in selected cognitive outcomes, supporting the potential value of more engaging rehabilitation experiences.'
  },
  {
    number: 11,
    shortCitation: 'Konecny et al. (2026)',
    fullTitle: 'Immersive technologies for cognitive rehabilitation in dementia and mild cognitive impairment: Systematic review.',
    lens: 'STEM',
    url: 'https://doi.org/10.2196/84349',
    roleInKnowledgeBase:
      'Systematically reviews immersive technologies such as VR, AR and related systems for cognitive rehabilitation in dementia and MCI. It identifies both potential benefits and practical barriers involving usability, accessibility, and implementation, providing a broad technical view of immersive rehabilitation.'
  },
  {
    number: 12,
    shortCitation: 'Gentili et al. (2022)',
    fullTitle: 'The cost-effectiveness of digital health interventions: A systematic review of the literature.',
    lens: 'BIZ',
    url: 'https://doi.org/10.3389/fpubh.2022.787135',
    roleInKnowledgeBase:
      'Reviews the cost-effectiveness of digital health interventions across healthcare settings. While many findings are favourable, the economic evidence remains varied. This source adds a business perspective by showing that effectiveness alone is insufficient if an intervention cannot be delivered sustainably at scale.'
  },
  {
    number: 13,
    shortCitation: 'Ministry of Health & Health Sciences Authority (2026)',
    fullTitle: 'Artificial intelligence in healthcare guidelines (AIHGle 2.0).',
    lens: 'GOV',
    url: 'https://isomer-user-content.by.gov.sg/3/23fb5b36-56b4-4abb-9370-75c9ddcaf3ed/AIHGle%202.0.pdf',
    roleInKnowledgeBase:
      "Provides Singapore-specific guidance for the responsible use of AI in healthcare, covering areas such as accountability, transparency, safety and risk management. It helps ensure that any future AI-assisted rehabilitation concept is considered within Singapore's healthcare governance and regulatory environment."
  },
  {
    number: 14,
    shortCitation: 'Li, Q. et al. (2026)',
    fullTitle: 'Online interventions for dementia caregiver burden and self-efficacy: A systematic review and meta-analysis.',
    lens: 'SSH',
    url: 'https://doi.org/10.1016/j.ijnsa.2026.100490',
    roleInKnowledgeBase:
      "Reviews online interventions designed to reduce dementia caregiver burden and improve caregiver self-efficacy. The findings add the caregiver perspective to home-based care and show that digital support may improve caregivers' confidence even when reducing overall caregiving burden remains difficult."
  },
  {
    number: 15,
    shortCitation: 'Chang et al.',
    fullTitle: 'Pilot randomized controlled study of a virtual reality-based dementia prevention program using self-regulated learning strategies among older adults with MCI.',
    lens: 'STEM',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC12071285/',
    roleInKnowledgeBase:
      'Investigates a VR-based dementia-prevention education programme for older adults with mild cognitive impairment. It reports improvements in areas such as dementia knowledge, health literacy and self-efficacy, showing how immersive technologies may support learning and confidence alongside rehabilitation.'
  },
  {
    number: 16,
    shortCitation: 'Eaglestone & Gkaintatzi',
    fullTitle: 'Cost-effectiveness of non-pharmacological interventions for mild cognitive impairment and dementia.',
    lens: 'BIZ',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10721583/',
    roleInKnowledgeBase:
      'Reviews economic evaluations of non-pharmacological interventions for mild cognitive impairment and dementia. It identifies promising cost-effective approaches while showing variation in economic evidence, helping our group consider whether cognitive interventions can provide sustainable value beyond clinical effectiveness.'
  },
  {
    number: 17,
    shortCitation: 'Unsworth et al. (2021)',
    fullTitle: 'The NICE Evidence Standards Framework for digital health and care technologies.',
    lens: 'GOV',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8236783/',
    roleInKnowledgeBase:
      'Explains the NICE Evidence Standards Framework for evaluating digital health and care technologies. It shows that digital interventions should demonstrate appropriate clinical and economic evidence before widespread adoption, adding an important governance and evidence-evaluation perspective to our project.'
  },
  {
    number: 18,
    shortCitation: 'Contreras-Somoza et al. (2021)',
    fullTitle: 'Usability and user experience of cognitive intervention technologies for elderly people with MCI or dementia: A systematic review.',
    lens: 'SSH',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8100576/',
    roleInKnowledgeBase:
      'Systematically reviews usability and user experience of cognitive intervention technologies for older adults with MCI or dementia. It identifies difficulties such as needing additional assistance and time, reinforcing the importance of simple, accessible, and senior-centred design for sustained home use.'
  }
];

export const POSTER_DATA: {
  hero: {
    courseTag: string;
    title: string;
    pitch: string;
    scrollCue: string;
    team: string[];
  };
  chapters: ChapterData[];
} = {
  hero: {
    courseTag: 'CC0007 · Prototype proposal',
    title: 'Gamified & AI-Assisted Cognitive Rehabilitation for Dementia',
    pitch:
      'Our proposed platform uses AI to explain cognitive activities in accessible ways, personalise their content, and help caregivers support regular participation at home.',
    scrollCue: 'Scroll to explore',
    team: ['Khai Liang', 'Qunming', 'Shan Xi', 'Keng', 'Qin Yan']
  },
  chapters: [
    // CHAPTER 1: THE PROBLEM
    {
      id: 1,
      navLabel: '01 · The Problem',
      kicker: 'CHAPTER 01 · THE PROBLEM',
      heading: 'Why is home-based cognitive rehabilitation so hard to sustain?',
      alwaysVisibleCard:
        'Older adults with early-stage dementia in Singapore may struggle to consistently participate in home-based cognitive rehabilitation due to low motivation, difficulties using digital tools, and limited professional or caregiver support. These barriers make it challenging to sustain long-term engagement and benefit from cognitive activities.',
      accent: '#F59E0B',
      worldRegionName: 'The Fragile Home Routine',
      hotspots: [
        {
          id: '1.1',
          chapterId: 1,
          chapterTitle: 'The Problem',
          icon: 'trending-up',
          label: "Singapore's growing need",
          teaser: '53,000 in 2020 → 80,000 by 2030',
          title: "Singapore's growing need",
          body: [
            'Dementia is a growing concern in Singapore. Approximately 53,000 people were living with dementia in 2020, with the number projected to reach 80,000 by 2030.',
            "The need for ongoing care makes accessible and sustainable support important for affected families. Singapore's ageing strategy also places strong emphasis on community-based care and caregiver support."
          ],
          accent: '#F59E0B',
          specialWidget: 'dementia-counter',
          citations: [
            { label: 'GovTech, 2026', sourceNumber: 3 },
            { label: 'MOH, 2023', sourceNumber: 6 }
          ]
        },
        {
          id: '1.2',
          chapterId: 1,
          chapterTitle: 'The Problem',
          icon: 'battery-charging',
          label: 'Low motivation',
          teaser: 'Benefit depends on staying engaged',
          title: 'Low motivation',
          body: [
            'Early-stage dementia affects abilities such as memory, attention and problem-solving.',
            'Cognitive rehabilitation can help maintain function, but its benefit depends heavily on continued participation and adherence. If seniors do not stay engaged, the intervention becomes less effective.'
          ],
          accent: '#FB7185',
          citations: [
            { label: 'Li et al., 2024', sourceNumber: 5 },
            { label: 'Park et al., 2020', sourceNumber: 10 }
          ]
        },
        {
          id: '1.3',
          chapterId: 1,
          chapterTitle: 'The Problem',
          icon: 'smartphone',
          label: 'Hard-to-use digital tools',
          teaser: 'Instructions are easy to lose',
          title: 'Hard-to-use digital tools',
          body: [
            'Difficulties understanding instructions and using digital tools may make regular participation challenging when professional guidance is not readily available.',
            'Older adults with cognitive impairment may require additional time and assistance when using cognitive intervention technologies.'
          ],
          accent: '#38BDF8',
          citations: [
            { label: 'Contreras-Somoza et al., 2021', sourceNumber: 18 },
            { label: 'Kwek et al., 2024', sourceNumber: 7 }
          ]
        },
        {
          id: '1.4',
          chapterId: 1,
          chapterTitle: 'The Problem',
          icon: 'heart-handshake',
          label: 'Limited professional & caregiver support',
          teaser: "Help isn't always on hand",
          title: 'Limited professional & caregiver support',
          body: [
            'Regular participation is hard to maintain when professional guidance is not readily available, and families should not be expected to supervise every session.',
            "Singapore's ageing strategy emphasises community-based care and caregiver support, which is where this problem sits."
          ],
          accent: '#A78BFA',
          citations: [
            { label: 'MOH, 2023', sourceNumber: 6 },
            { label: 'Zhang & Wu, 2026', sourceNumber: 4 }
          ]
        }
      ]
    },

    // CHAPTER 2: WHAT THE EVIDENCE SAYS, AND THE GAP
    {
      id: 2,
      navLabel: '02 · Evidence & Gap',
      kicker: 'CHAPTER 02 · WHAT THE EVIDENCE SAYS, AND THE GAP',
      heading: 'What the evidence says — and the gap left behind',
      subline:
        'Supervised trials show promise, but sustaining engagement in everyday home routines remains an open challenge.',
      accent: '#38BDF8',
      worldRegionName: 'The Evidence Bridge',
      hotspots: [
        {
          id: '2.1',
          chapterId: 2,
          chapterTitle: 'What the Evidence Says, and the Gap',
          icon: 'bar-chart-3',
          label: 'Engagement drives results',
          teaser: '55 randomised trials',
          title: 'Engagement drives results',
          body: [
            'Research indicates that cognitive interventions can offer benefits, although participation and usability remain important considerations.',
            'A meta-analysis of 55 randomised controlled trials identified engagement, persistence and adherence as important factors in cognitive training outcomes. (Li et al., 2024)'
          ],
          accent: '#38BDF8',
          citations: [{ label: 'Li et al., 2024', sourceNumber: 5 }]
        },
        {
          id: '2.2',
          chapterId: 2,
          chapterTitle: 'What the Evidence Says, and the Gap',
          icon: 'glasses',
          label: 'Engaging tech can motivate',
          teaser: 'A six-week VR trial',
          title: 'Engaging tech can motivate',
          body: [
            'In a six-week trial involving 40 older adults with mild cognitive impairment, therapist-supported virtual reality rehabilitation produced higher motivation and improvements in selected cognitive outcomes than conventional rehabilitation. (Park et al., 2020)'
          ],
          accent: '#2DD4BF',
          citations: [{ label: 'Park et al., 2020', sourceNumber: 10 }]
        },
        {
          id: '2.3',
          chapterId: 2,
          chapterTitle: 'What the Evidence Says, and the Gap',
          icon: 'clock',
          label: 'Usability needs time and help',
          teaser: 'Extra time and assistance',
          title: 'Usability needs time and help',
          body: [
            'However, older adults with cognitive impairment may require additional time and assistance when using cognitive intervention technologies. (Contreras-Somoza et al., 2021)'
          ],
          accent: '#F59E0B',
          citations: [{ label: 'Contreras-Somoza et al., 2021', sourceNumber: 18 }]
        },
        {
          id: '2.4',
          chapterId: 2,
          chapterTitle: 'What the Evidence Says, and the Gap',
          icon: 'puzzle',
          label: 'The gap',
          teaser: 'Can engagement last at home?',
          title: 'The gap: Can engagement last at home?',
          isHighlighted: true,
          body: [
            'These findings raise questions about whether engagement during supported programmes can be sustained at home. The six-week trial included no post-intervention follow-up, while a Singapore-based study examined initial experience through a single playtest and interview.',
            'Difficulties understanding instructions and using digital tools may make regular participation challenging when professional guidance is not readily available.',
            'Therefore, the gap can be filled by focusing on the practical barriers to sustained participation in home-based digital cognitive rehabilitation among older adults with cognitive decline in Singapore. This highlights the need to understand how usability, motivation, and caregiver support affect participation within everyday routines.'
          ],
          accent: '#F43F5E',
          citations: [
            { label: 'Park et al., 2020', sourceNumber: 10 },
            { label: 'Kwek et al., 2024', sourceNumber: 7 },
            { label: 'Clare et al., 2023', sourceNumber: 8 }
          ]
        }
      ]
    },

    // CHAPTER 3: OUR SOLUTION
    {
      id: 3,
      navLabel: '03 · Our Solution',
      kicker: 'CHAPTER 03 · OUR SOLUTION',
      heading: 'An integrated home-based cognitive support model',
      subline:
        'Accessible gamified activities, bounded AI-assisted personalisation, and community support to encourage sustained engagement among older adults with early-stage dementia.',
      accent: '#14B8A6',
      worldRegionName: 'The Glowing Home Sanctuary',
      hotspots: [
        {
          id: '3.1',
          chapterId: 3,
          chapterTitle: 'Our Solution',
          icon: 'gamepad-2',
          label: 'Gamified cognitive activities',
          teaser: 'Familiar play without stressful competition',
          title: 'Gamified cognitive activities',
          body: [
            'Simple, familiar games involving memory, attention, and everyday tasks, with encouraging feedback rather than stressful competition.',
            'Addresses: motivation and engagement.'
          ],
          accent: '#14B8A6',
          citations: [
            { label: 'Jia et al., 2024', sourceNumber: 1 },
            { label: 'Park et al., 2020', sourceNumber: 10 }
          ]
        },
        {
          id: '3.2',
          chapterId: 3,
          chapterTitle: 'Our Solution',
          icon: 'sparkles',
          label: 'AI-assisted personalisation',
          teaser: 'Safe, predetermined limits',
          title: 'AI-assisted personalisation',
          body: [
            'The system recommends activities and adjusts difficulty using performance and participation patterns, within safe, predetermined limits.',
            'Addresses: different cognitive abilities and frustration.'
          ],
          accent: '#00BDEB',
          citations: [{ label: 'Clare et al., 2023', sourceNumber: 8 }]
        },
        {
          id: '3.3',
          chapterId: 3,
          chapterTitle: 'Our Solution',
          icon: 'ear',
          label: 'Senior-friendly design',
          teaser: 'Large buttons & voice guidance',
          title: 'Senior-friendly design',
          body: [
            'Large buttons, simple instructions, voice guidance, and minimal navigation, with assisted or non-digital alternatives where needed.',
            'Addresses: usability and accessibility barriers.'
          ],
          accent: '#F59E0B',
          citations: [
            { label: 'Contreras-Somoza et al., 2021', sourceNumber: 18 },
            { label: 'Kwek et al., 2024', sourceNumber: 7 }
          ]
        },
        {
          id: '3.4',
          chapterId: 3,
          chapterTitle: 'Our Solution',
          icon: 'users',
          label: 'Community & caregiver support',
          teaser: 'Support without constant supervision',
          title: 'Community & caregiver support',
          body: [
            'Train community volunteers or facilitators to introduce the app and provide occasional assistance.',
            'Family members can participate when appropriate, but should not be required to supervise constantly.',
            'Addresses: limited professional guidance and potential caregiver burden.'
          ],
          accent: '#A78BFA',
          citations: [
            { label: 'Zhang & Wu, 2026', sourceNumber: 4 },
            { label: 'Li et al., 2026', sourceNumber: 14 }
          ]
        },
        {
          id: '3.5',
          chapterId: 3,
          chapterTitle: 'Our Solution',
          icon: 'calendar-check',
          label: 'Long-term engagement evaluation',
          teaser: '12-week programme + 8-week follow-up',
          title: 'Long-term engagement evaluation',
          body: [
            'Test the programme over 12 weeks, followed by an eight-week observation period with reduced support.',
            'Addresses: limited long-term evidence.'
          ],
          accent: '#38BDF8',
          citations: [
            { label: 'Li et al., 2024', sourceNumber: 5 },
            { label: 'Unsworth et al., 2021', sourceNumber: 17 }
          ]
        }
      ]
    },

    // CHAPTER 4: HOW THE AI WORKS
    {
      id: 4,
      navLabel: '04 · How AI Works',
      kicker: 'CHAPTER 04 · HOW THE AI WORKS (BOUNDED AND TRANSPARENT)',
      heading: 'Bounded, transparent AI designed around safety',
      subline:
        'Orbiting a senior-friendly companion interface, every AI capability operates within strict caregiver-approved guardrails.',
      accent: '#00BDEB',
      worldRegionName: 'The Transparent AI Core',
      hotspots: [
        {
          id: '4.1',
          chapterId: 4,
          chapterTitle: 'How the AI Works',
          icon: 'message-circle-question',
          label: 'AI Activity Guide',
          teaser: "Press 'Help me understand'",
          title: 'AI Activity Guide',
          specialWidget: 'ai-guide-demo',
          body: [
            "The user presses 'Help me understand'. The AI receives the current instruction and approved rules, then produces a shorter explanation or a familiar example.",
            'The user can hear it aloud, repeat it, or return to the original worked example.',
            'The explanation must preserve the task and must not reveal the answer unless the user explicitly chooses a hint.'
          ],
          accent: '#00BDEB',
          citations: [{ label: 'Kwek et al., 2024', sourceNumber: 7 }]
        },
        {
          id: '4.2',
          chapterId: 4,
          chapterTitle: 'How the AI Works',
          icon: 'palette',
          label: 'Personalised activity content',
          teaser: 'Cooking, gardening, shopping',
          title: 'Personalised activity content',
          body: [
            'The older adult or caregiver selects interests such as cooking, gardening, or shopping. AI suggests content within a controlled template.',
            'For the first prototype, content should be reviewed before it is shown, and the game logic should check that each task has valid answers.',
            'Personalisation changes the content; it does not imply clinical assessment or treatment selection.'
          ],
          accent: '#14B8A6',
          citations: [{ label: 'Clare et al., 2023', sourceNumber: 8 }]
        },
        {
          id: '4.3',
          chapterId: 4,
          chapterTitle: 'How the AI Works',
          icon: 'gauge',
          label: 'Real-time difficulty adjustment',
          teaser: 'Always the right level',
          title: 'Real-time difficulty adjustment (75%–85% Zone)',
          specialWidget: 'difficulty-dial',
          body: [
            'Starts with simple baseline games to determine the level and difficulty of the games that follow. The platform then continuously tracks non-invasive behavioural telemetry, including touch response latency, hesitation pauses, error clustering and motor tremor variance.',
            'A reinforcement learning model processes these metrics in real time to calculate cognitive load, dynamically adjusting task complexity to maintain a 75% to 85% success rate.',
            'This adaptive calibration accommodates daily cognitive fluctuations, such as morning clarity versus late-afternoon fatigue, preventing both boredom and distressing failure.'
          ],
          accent: '#10B981',
          citations: [
            { label: 'Jia et al., 2024', sourceNumber: 1 },
            { label: 'Li et al., 2024', sourceNumber: 5 }
          ]
        },
        {
          id: '4.4',
          chapterId: 4,
          chapterTitle: 'How the AI Works',
          icon: 'heart-pulse',
          label: 'Frustration & agitation support',
          teaser: "No 'failure' screens",
          title: 'Frustration & agitation support',
          body: [
            'On-device models monitor interaction cadences, erratic tapping, and vocal cues to detect emerging signs of user distress or cognitive exhaustion.',
            "When agitation is identified, the system bypasses punitive 'failure' screens and seamlessly deploys supportive visual scaffolding or pivots to low-load reminiscence activities like nostalgic music.",
            'This response mitigates the shame and anxiety associated with functional decline, transforming potentially stressful rehabilitation into a safe, reassuring routine.'
          ],
          accent: '#FB7185',
          citations: [
            { label: 'Bernuzzi et al., 2026', sourceNumber: 9 },
            { label: 'Park et al., 2020', sourceNumber: 10 }
          ]
        },
        {
          id: '4.5',
          chapterId: 4,
          chapterTitle: 'How the AI Works',
          icon: 'clipboard-list',
          label: 'AI Caregiver Summary',
          teaser: 'Short, factual, useful',
          title: 'AI Caregiver Summary',
          body: [
            "AI turns recorded activity information into a short factual summary. For example: 'Completed the shopping activity and requested instructions twice.'",
            'The summary should help a caregiver decide where assistance may be useful. It must not infer memory decline, diagnose a condition, or claim clinical improvement from game activity.'
          ],
          accent: '#A78BFA',
          citations: [
            { label: 'Zhang & Wu, 2026', sourceNumber: 4 },
            { label: 'Li et al., 2026', sourceNumber: 14 }
          ]
        },
        {
          id: '4.6',
          chapterId: 4,
          chapterTitle: 'How the AI Works',
          icon: 'shield-check',
          label: 'Safety by design',
          teaser: 'What the AI will NOT do',
          title: 'Safety by design — What the AI will NOT do',
          isHighlighted: true,
          body: [
            'AI would provide three bounded functions. These are proposed mechanisms to test; their benefits for understanding, motivation, and caregiver support are not yet established.',
            "The AI only uses caregiver-approved inputs and checked content libraries, and it never diagnoses, infers memory decline, or claims clinical improvement from game activity, in line with Singapore's AIHGle 2.0 healthcare AI guidelines (MOH & HSA, 2026)."
          ],
          accent: '#F59E0B',
          citations: [{ label: 'MOH & HSA, 2026', sourceNumber: 13 }]
        }
      ]
    },

    // CHAPTER 5: THE GAMES
    {
      id: 5,
      navLabel: '05 · The Games',
      kicker: 'CHAPTER 05 · THE GAMES SHOWCASE',
      heading: 'Games designed to feel like home',
      subline:
        'Every game includes: Hints · Pause · Replay instructions · Easier option · Friendly mascot encouragement · Post-game rating · No timers, penalties or leaderboards.',
      alwaysVisibleCard: 'Game concepts are design proposals to test with users.',
      accent: '#F59E0B',
      worldRegionName: 'The Living Room Game Table',
      hotspots: [
        {
          id: '5.1',
          chapterId: 5,
          chapterTitle: 'The Games',
          icon: 'images',
          label: 'Spot the Difference (Family Edition)',
          teaser: 'Spot what changed in a familiar photo.',
          title: 'Spot the Difference (Family Edition)',
          accent: '#F59E0B',
          specialWidget: 'game-stage',
          gameData: {
            kind: 'core',
            hook: 'Spot what changed in a familiar photo.',
            focusTag: 'Attention',
            howYouPlay:
              'Look at a familiar family photo or a photo of people the user wants to remember, then spot what has been added or changed.',
            whatAiDoes:
              "Fed with the elderly person's family photos, the AI can change the photo to add or change people inside it, so there is always a new difference to find.",
            whatItExercises: 'Visual attention and autobiographical memory.',
            demoType: 'spot-diff'
          },
          body: [
            'Look at a familiar family photo or a photo of people the user wants to remember, then spot what has been added or changed.',
            "Fed with the elderly person's family photos, the AI can change the photo to add or change people inside it, so there is always a new difference to find."
          ]
        },
        {
          id: '5.2',
          chapterId: 5,
          chapterTitle: 'The Games',
          icon: 'user-check',
          label: 'Match Photos to Names',
          teaser: 'Put names to the faces you love.',
          title: 'Match Photos to Names',
          accent: '#38BDF8',
          specialWidget: 'game-stage',
          gameData: {
            kind: 'core',
            hook: 'Put names to the faces you love.',
            focusTag: 'Association',
            howYouPlay: 'Match photos of loved ones, or people to remember, with their names.',
            whatAiDoes:
              'Builds rounds from the family photos and adjusts the level through the difficulty adjustment.',
            whatItExercises: 'Face-name association and memory.',
            demoType: 'match-names'
          },
          body: [
            'Match photos of loved ones, or people to remember, with their names.',
            'Builds rounds from the family photos and adjusts the level through the difficulty adjustment.'
          ]
        },
        {
          id: '5.3',
          chapterId: 5,
          chapterTitle: 'The Games',
          icon: 'grid',
          label: 'Mahjong Matching',
          teaser: 'A familiar game, relaxed.',
          title: 'Mahjong Matching',
          accent: '#14B8A6',
          specialWidget: 'game-stage',
          gameData: {
            kind: 'core',
            hook: 'A familiar game, relaxed.',
            focusTag: 'Memory',
            howYouPlay: 'Match familiar Mahjong tiles in an untimed, welcoming layout.',
            whatAiDoes: 'The difficulty adjustment keeps the game at a comfortable level.',
            whatItExercises: 'Visual search and short-term memory.',
            demoType: 'mahjong'
          },
          body: [
            'Match familiar Mahjong tiles in an untimed, welcoming layout.',
            'The difficulty adjustment keeps the game at a comfortable level.'
          ]
        },
        {
          id: '5.4',
          chapterId: 5,
          chapterTitle: 'The Games',
          icon: 'mic',
          label: 'Question of the Day',
          teaser: 'One gentle question, every day.',
          title: 'Question of the Day',
          accent: '#A78BFA',
          specialWidget: 'game-stage',
          gameData: {
            kind: 'core',
            hook: 'One gentle question, every day.',
            focusTag: 'Reminiscence',
            howYouPlay: 'Answer one question about yourself each day, by voice or by typing.',
            whatAiDoes:
              'Converts voice to text, stores the answers, and can quiz the user on them in the future.',
            whatItExercises: 'Episodic recall, reminiscence and conversation.',
            demoType: 'question-day'
          },
          body: [
            'Answer one question about yourself each day, by voice or by typing.',
            'Converts voice to text, stores the answers, and can quiz the user on them in the future.'
          ]
        },
        {
          id: '5.5',
          chapterId: 5,
          chapterTitle: 'The Games',
          icon: 'volume-2',
          label: 'Familiar Sounds',
          teaser: 'What does this sound remind you of?',
          title: 'Familiar Sounds',
          accent: '#FB7185',
          specialWidget: 'game-stage',
          gameData: {
            kind: 'core',
            hook: 'What does this sound remind you of?',
            focusTag: 'Association',
            howYouPlay:
              'Listen to a sound, such as rain or a kettle, and choose the matching picture; users can also share what it reminds them of.',
            whatAiDoes:
              'Creates personalised prompts and conversation starters around a checked sound library.',
            whatItExercises: 'Auditory attention and association.',
            demoType: 'familiar-sounds'
          },
          body: [
            'Listen to a sound, such as rain or a kettle, and choose the matching picture; users can also share what it reminds them of.',
            'Creates personalised prompts and conversation starters around a checked sound library.'
          ]
        },
        // 5 Pipeline Activities
        {
          id: '5.6',
          chapterId: 5,
          chapterTitle: 'The Games (Pipeline)',
          icon: 'book-heart',
          label: 'My Memory Album',
          teaser: 'Reminiscence and conversation',
          title: 'My Memory Album (Pipeline Activity)',
          accent: '#F59E0B',
          gameData: {
            kind: 'pipeline',
            hook: 'Explore a family photo with gentle conversation prompts.',
            focusTag: 'Reminiscence',
            howYouPlay:
              'Explore a family photo and respond to gentle prompts such as "What do you enjoy about celebrations?" Users can listen, speak, or skip.',
            whatAiDoes:
              'AI generates prompts from caregiver-approved captions and simplifies questions when requested.',
            whatItExercises: 'Reminiscence and conversation.'
          },
          body: [
            'Explore a family photo and respond to gentle prompts such as "What do you enjoy about celebrations?" Users can listen, speak, or skip.',
            'AI generates prompts from caregiver-approved captions and simplifies questions when requested.',
            'Focus: reminiscence and conversation.'
          ]
        },
        {
          id: '5.7',
          chapterId: 5,
          chapterTitle: 'The Games (Pipeline)',
          icon: 'shopping-basket',
          label: 'Shopping Basket',
          teaser: 'Attention and short-term recall',
          title: 'Shopping Basket (Pipeline Activity)',
          accent: '#14B8A6',
          gameData: {
            kind: 'pipeline',
            hook: 'Select familiar items from a virtual market stall.',
            focusTag: 'Memory',
            howYouPlay:
              'Look at a short shopping list, then select those items from a virtual stall; an easier mode keeps the list visible.',
            whatAiDoes:
              'AI personalises items around familiar foods and explains the task in different ways.',
            whatItExercises: 'Attention and short-term recall.'
          },
          body: [
            'Look at a short shopping list, then select those items from a virtual stall; an easier mode keeps the list visible.',
            'AI personalises items around familiar foods and explains the task in different ways.',
            'Focus: attention and short-term recall.'
          ]
        },
        {
          id: '5.8',
          chapterId: 5,
          chapterTitle: 'The Games (Pipeline)',
          icon: 'list-ordered',
          label: 'Put the Steps in Order',
          teaser: 'Sequencing and planning',
          title: 'Put the Steps in Order (Pipeline Activity)',
          accent: '#38BDF8',
          gameData: {
            kind: 'pipeline',
            hook: 'Arrange illustrated steps for everyday routines.',
            focusTag: 'Attention',
            howYouPlay:
              'Arrange illustrated steps for a familiar activity, such as preparing a sandwich or planting a seed.',
            whatAiDoes:
              'AI generates variations from checked activity templates and provides step-specific hints.',
            whatItExercises: 'Sequencing and planning.'
          },
          body: [
            'Arrange illustrated steps for a familiar activity, such as preparing a sandwich or planting a seed.',
            'AI generates variations from checked activity templates and provides step-specific hints.',
            'Focus: sequencing and planning.'
          ]
        },
        {
          id: '5.9',
          chapterId: 5,
          chapterTitle: 'The Games (Pipeline)',
          icon: 'shapes',
          label: 'Match the Everyday Objects',
          teaser: 'Categorisation and reasoning',
          title: 'Match the Everyday Objects (Pipeline Activity)',
          accent: '#A78BFA',
          gameData: {
            kind: 'pipeline',
            hook: 'Pair related household and garden items.',
            focusTag: 'Association',
            howYouPlay:
              'Match related items, such as a watering can with a plant, or sort objects into kitchen and garden categories.',
            whatAiDoes:
              'AI selects themes based on interests and explains connections in simple language.',
            whatItExercises: 'Categorisation and reasoning.'
          },
          body: [
            'Match related items, such as a watering can with a plant, or sort objects into kitchen and garden categories.',
            'AI selects themes based on interests and explains connections in simple language.',
            'Focus: categorisation and reasoning.'
          ]
        },
        {
          id: '5.10',
          chapterId: 5,
          chapterTitle: 'The Games (Pipeline)',
          icon: 'sun',
          label: 'Pack for an Outing',
          teaser: 'Planning and decision-making',
          title: 'Pack for an Outing (Pipeline Activity)',
          accent: '#FB7185',
          gameData: {
            kind: 'pipeline',
            hook: 'Choose sensible items for a pleasant outing.',
            focusTag: 'Association',
            howYouPlay:
              'Choose items for a fictional outing, such as a picnic: water, a hat, and a mat. Several reasonable answers can be accepted.',
            whatAiDoes:
              'AI creates interest-based scenarios within approved templates and explains why an item might fit.',
            whatItExercises: 'Planning and decision-making.'
          },
          body: [
            'Choose items for a fictional outing, such as a picnic: water, a hat, and a mat. Several reasonable answers can be accepted.',
            'AI creates interest-based scenarios within approved templates and explains why an item might fit.',
            'Focus: planning and decision-making.'
          ]
        }
      ]
    },

    // CHAPTER 6: PROTOTYPE EXPERIENCE
    {
      id: 6,
      navLabel: '06 · Prototype UX',
      kicker: 'CHAPTER 06 · PROTOTYPE EXPERIENCE',
      heading: 'Dual-view prototype experience: Older Adult & Caregiver',
      subline: 'No leaderboards · No missed-day penalties · No countdown timers',
      alwaysVisibleCard:
        'These features are design proposals to test, rather than established findings from our research.',
      accent: '#A78BFA',
      worldRegionName: 'The Dual-View Companion Interface',
      hotspots: [
        {
          id: '6.1',
          chapterId: 6,
          chapterTitle: 'Prototype Experience',
          icon: 'home',
          label: 'Simple homepage',
          teaser: "One prominent 'Start today's activity' button",
          title: 'Simple homepage',
          viewMode: 'older-adult',
          body: [
            "One prominent 'Start today's activity' button leads to a short session.",
            'Problem addressed: reduces the steps needed to begin.'
          ],
          accent: '#00BDEB'
        },
        {
          id: '6.2',
          chapterId: 6,
          chapterTitle: 'Prototype Experience',
          icon: 'help-circle',
          label: 'AI activity guide',
          teaser: 'Shorter explanation or familiar example',
          title: 'AI activity guide',
          viewMode: 'older-adult',
          body: [
            'Rephrases the current instruction into a shorter explanation or familiar example, with optional spoken playback.',
            'Problem addressed: supports understanding when the user needs help.'
          ],
          accent: '#14B8A6'
        },
        {
          id: '6.3',
          chapterId: 6,
          chapterTitle: 'Prototype Experience',
          icon: 'shuffle',
          label: 'Personalised activities',
          teaser: 'Tailored around selected interests',
          title: 'Personalised activities',
          viewMode: 'older-adult',
          body: [
            'Two activities, such as picture matching and shopping recall, with AI-generated content based on selected interests.',
            'Problem addressed: explores whether relevant content encourages participation.'
          ],
          accent: '#F59E0B'
        },
        {
          id: '6.4',
          chapterId: 6,
          chapterTitle: 'Prototype Experience',
          icon: 'life-buoy',
          label: 'Support during activities',
          teaser: 'Hints, pause, replay & easier option',
          title: 'Support during activities',
          viewMode: 'older-adult',
          body: [
            'Hints, pause, replay instructions, and an easier option.',
            'Problem addressed: helps users continue when confused or frustrated.'
          ],
          accent: '#38BDF8'
        },
        {
          id: '6.5',
          chapterId: 6,
          chapterTitle: 'Prototype Experience',
          icon: 'smile',
          label: 'Gentle completion feedback',
          teaser: 'Friendly acknowledgement & history',
          title: 'Gentle completion feedback',
          viewMode: 'older-adult',
          body: [
            'Friendly acknowledgement and a simple activity history.',
            'Problem addressed: explores encouragement to return.'
          ],
          accent: '#10B981'
        },
        {
          id: '6.6',
          chapterId: 6,
          chapterTitle: 'Prototype Experience',
          icon: 'clipboard-check',
          label: 'AI caregiver summary',
          teaser: 'Factual completions & help requests',
          title: 'AI caregiver summary (Caregiver View)',
          viewMode: 'caregiver',
          body: [
            'Summarises recorded completions and requests for help; caregivers can also set preferred session times.',
            'Problem addressed: makes participation information easier to review.'
          ],
          accent: '#A78BFA'
        },
        {
          id: '6.7',
          chapterId: 6,
          chapterTitle: 'Prototype Experience',
          icon: 'ticket',
          label: 'Streak rewards',
          teaser: 'Healthier SG style vouchers',
          title: 'Streak rewards',
          viewMode: 'both',
          body: [
            'Once users hit a certain quota or streak, they receive vouchers, similar to the Healthier SG steps challenge, to give them something to keep coming back for.'
          ],
          accent: '#F59E0B'
        },
        {
          id: '6.8',
          chapterId: 6,
          chapterTitle: 'Prototype Experience',
          icon: 'bell-ring',
          label: 'Daily reminder & mascot',
          teaser: 'Welcoming companion notification',
          title: 'Daily reminder & mascot',
          viewMode: 'both',
          body: [
            'A daily notification, ping or call reminds them to do their daily activities.',
            'A small cartoon mascot (like Duolingo), such as a dog or a Japanese-style mascot, makes the app more welcoming and can appear on the phone when a notification pings.'
          ],
          accent: '#FB7185'
        },
        {
          id: '6.9',
          chapterId: 6,
          chapterTitle: 'Prototype Experience',
          icon: 'unlock',
          label: 'Progressive game introduction',
          teaser: 'Gradual setup-based unlocking',
          title: 'Progressive game introduction',
          viewMode: 'caregiver',
          body: [
            "So seniors aren't bombarded with a huge list of games at once, recommendations and progression are based on the information gathered when the app is set up."
          ],
          accent: '#38BDF8'
        },
        {
          id: '6.10',
          chapterId: 6,
          chapterTitle: 'Prototype Experience',
          icon: 'star',
          label: 'Post-game rating',
          teaser: 'AI adapts to what users enjoy',
          title: 'Post-game rating',
          viewMode: 'older-adult',
          body: [
            "After a game, the user is asked to rate it; if they don't like it, the AI recommends it less often."
          ],
          accent: '#F59E0B'
        },
        {
          id: '6.11',
          chapterId: 6,
          chapterTitle: 'Prototype Experience',
          icon: 'flag',
          label: 'Recommended first version',
          teaser: 'Manageable scope & welcoming rules',
          title: 'Recommended first version',
          viewMode: 'both',
          isHighlighted: true,
          body: [
            'Build two well-developed activities first. Make the AI activity guide the main feature, supported by simple navigation, hints, and a caregiver summary. Add personalised content within controlled activity templates. This keeps the prototype manageable and makes the link to our problem easier to demonstrate.',
            'For the initial design, avoid competitive leaderboards, penalties for missed days, and countdown timers. This is a design recommendation aimed at making participation feel manageable and welcoming; it should be reviewed through user feedback.'
          ],
          accent: '#14B8A6'
        }
      ]
    },

    // CHAPTER 7: THROUGH THREE LENSES
    {
      id: 7,
      navLabel: '07 · Three Lenses',
      kicker: 'CHAPTER 07 · THROUGH THREE INTERDISCIPLINARY LENSES',
      heading: 'Through three lenses: STEM, Business & Governance, and Humanities',
      subline:
        'Nine interconnected perspectives showing how technical design, policy governance, and human dignity reinforce one another.',
      accent: '#38BDF8',
      worldRegionName: 'The Tri-Lens Prism',
      hotspots: [
        // STEM
        {
          id: '7.1',
          chapterId: 7,
          chapterTitle: 'Through Three Lenses (STEM)',
          cluster: 'STEM',
          icon: 'gauge',
          label: 'Auto-adjusting game difficulty',
          teaser: '75%–85% comfortable success band',
          title: 'Auto-adjusting game difficulty',
          body: [
            'Starts with simple baseline games and uses reinforcement learning to track touch latency, hesitation pauses, errors, and hand tremors, keeping a comfortable 75%-85% success rate across morning clarity or evening fatigue (Jia et al., 2024; Li et al., 2024).'
          ],
          accent: '#00BDEB',
          citations: [
            { label: 'Jia et al., 2024', sourceNumber: 1 },
            { label: 'Li et al., 2024', sourceNumber: 5 }
          ]
        },
        {
          id: '7.2',
          chapterId: 7,
          chapterTitle: 'Through Three Lenses (STEM)',
          cluster: 'STEM',
          icon: 'activity',
          label: 'On-device frustration detection',
          teaser: 'Spots distress early & pivots gently',
          title: 'On-device frustration detection',
          body: [
            'Monitors erratic tapping and vocal cues directly on the device to spot user distress early and automatically switch to visual hints or calming nostalgic music.'
          ],
          accent: '#00BDEB',
          citations: [{ label: 'Bernuzzi et al., 2026', sourceNumber: 9 }]
        },
        {
          id: '7.3',
          chapterId: 7,
          chapterTitle: 'Through Three Lenses (STEM)',
          cluster: 'STEM',
          icon: 'cpu',
          label: 'Personalised game & summary engine',
          teaser: 'Family photos, voice-to-text & summaries',
          title: 'Personalised game & summary engine',
          body: [
            'Uses family photo datasets to swap/add people in Spot the Difference, converts spoken answers via voice-to-text for Question of the Day, adjusts recommendations from user ratings, and compiles factual AI Caregiver Summaries.'
          ],
          accent: '#00BDEB',
          citations: [{ label: 'Clare et al., 2023', sourceNumber: 8 }]
        },
        // Business & Governance
        {
          id: '7.4',
          chapterId: 7,
          chapterTitle: 'Through Three Lenses (Business & Governance)',
          cluster: 'Business & Governance',
          icon: 'map-pin',
          label: "Fits Singapore's ageing plans",
          teaser: 'Home-based eldercare toward 80,000 cases',
          title: "Fits Singapore's ageing plans",
          body: [
            "Supports Singapore's national push for home-based eldercare as dementia cases rise toward 80,000 (MOH, 2023; GovTech, 2026)."
          ],
          accent: '#F59E0B',
          citations: [
            { label: 'MOH, 2023', sourceNumber: 6 },
            { label: 'GovTech, 2026', sourceNumber: 3 }
          ]
        },
        {
          id: '7.5',
          chapterId: 7,
          chapterTitle: 'Through Three Lenses (Business & Governance)',
          cluster: 'Business & Governance',
          icon: 'shield-check',
          label: 'Follows healthcare AI rules',
          teaser: 'Compliant with AIHGle 2.0 guidelines',
          title: 'Follows healthcare AI rules',
          body: [
            "Meets AIHGle 2.0 safety rules by keeping AI within caregiver-approved inputs and checked sound libraries, while ensuring AI Caregiver Summaries only report factual activity (e.g., 'requested instructions twice') and never claim clinical improvement or diagnosis (MOH & HSA, 2026)."
          ],
          accent: '#F59E0B',
          citations: [{ label: 'MOH & HSA, 2026', sourceNumber: 13 }]
        },
        {
          id: '7.6',
          chapterId: 7,
          chapterTitle: 'Through Three Lenses (Business & Governance)',
          cluster: 'Business & Governance',
          icon: 'coins',
          label: 'Low-cost & built to last',
          teaser: 'Web app + streak vouchers + 20-week validation',
          title: 'Low-cost & built to last',
          body: [
            'Uses an affordable web app with quota/streak vouchers (like the Healthier SG steps challenge) and daily phone notifications/calls to sustain participation, validated over a 12-week trial and 8-week follow-up to save long-term care costs (National Academies Press, 2021; Gentili et al., 2022; Unsworth et al., 2021).'
          ],
          accent: '#F59E0B',
          citations: [
            { label: 'National Academies Press, 2021', sourceNumber: 2 },
            { label: 'Gentili et al., 2022', sourceNumber: 12 },
            { label: 'Unsworth et al., 2021', sourceNumber: 17 }
          ]
        },
        // Social Sciences & Humanities
        {
          id: '7.7',
          chapterId: 7,
          chapterTitle: 'Through Three Lenses (Social Sciences & Humanities)',
          cluster: 'Social Sciences & Humanities',
          icon: 'mouse-pointer-click',
          label: 'Zero-friction senior UX',
          teaser: 'One-button start & spoken prompts',
          title: 'Zero-friction senior UX',
          body: [
            'Overcomes instruction barriers via a one-button homepage, spoken prompts, progressive game introduction based on initial setup, and built-in help buttons for hints, pause, instruction replay, and easier mode (Kwek et al., 2024; Contreras-Somoza et al., 2021).'
          ],
          accent: '#14B8A6',
          citations: [
            { label: 'Kwek et al., 2024', sourceNumber: 7 },
            { label: 'Contreras-Somoza et al., 2021', sourceNumber: 18 }
          ]
        },
        {
          id: '7.8',
          chapterId: 7,
          chapterTitle: 'Through Three Lenses (Social Sciences & Humanities)',
          cluster: 'Social Sciences & Humanities',
          icon: 'heart',
          label: 'Culturally grounded & dignity-first',
          teaser: 'Mahjong, family albums & friendly mascot',
          title: 'Culturally grounded & dignity-first',
          body: [
            "Replaces shameful 'failure' screens with nostalgic music when seniors feel agitated, while fostering motivation through familiar activities (Mahjong Matching, family photo albums, Familiar Sounds), a friendly dog/Japanese mascot, and post-game ratings (Park et al., 2020; Bernuzzi et al., 2026)."
          ],
          accent: '#14B8A6',
          citations: [
            { label: 'Park et al., 2020', sourceNumber: 10 },
            { label: 'Bernuzzi et al., 2026', sourceNumber: 9 }
          ]
        },
        {
          id: '7.9',
          chapterId: 7,
          chapterTitle: 'Through Three Lenses (Social Sciences & Humanities)',
          cluster: 'Social Sciences & Humanities',
          icon: 'users',
          label: 'Caregiver partnership',
          teaser: 'Reduces family burnout & boosts confidence',
          title: 'Caregiver partnership',
          body: [
            'Reduces family burnout and boosts care self-efficacy via a dual-view interface with short, factual AI Caregiver Summaries and community volunteer onboarding so relatives know where help is needed without supervising every session (Zhang & Wu, 2026; Li et al., 2026).'
          ],
          accent: '#14B8A6',
          citations: [
            { label: 'Zhang & Wu, 2026', sourceNumber: 4 },
            { label: 'Li et al., 2026', sourceNumber: 14 }
          ]
        }
      ]
    },

    // CHAPTER 8: HOW WE'LL TEST IT
    {
      id: 8,
      navLabel: "08 · How We'll Test It",
      kicker: "CHAPTER 08 · HOW WE'LL TEST IT",
      heading: 'A 20-week longitudinal evaluation pathway',
      subline:
        'Following participants from supported home onboarding into an eight-week reduced-support observation period.',
      accent: '#10B981',
      worldRegionName: 'The Horizon Timeline',
      hotspots: [
        {
          id: '8.1',
          chapterId: 8,
          chapterTitle: "How We'll Test It",
          icon: 'calendar',
          label: 'Weeks 1-12: the programme',
          teaser: 'Supported home participation & usability',
          title: 'Weeks 1–12: The Programme',
          body: [
            'Test the programme over 12 weeks at home with community and caregiver support, looking at sustained participation, usability, motivation and the caregiver experience.'
          ],
          accent: '#10B981',
          citations: [
            { label: 'Clare et al., 2023', sourceNumber: 8 },
            { label: 'Li et al., 2024', sourceNumber: 5 }
          ]
        },
        {
          id: '8.2',
          chapterId: 8,
          chapterTitle: "How We'll Test It",
          icon: 'eye',
          label: 'Weeks 13-20: reduced support',
          teaser: 'Does engagement last independently?',
          title: 'Weeks 13–20: Reduced Support Observation',
          body: [
            'Followed by an eight-week observation period with reduced support, to see whether engagement lasts when professional help is limited.',
            'This directly addresses the limited long-term evidence noted in our gap, since the six-week trial had no post-intervention follow-up.'
          ],
          accent: '#00BDEB',
          citations: [{ label: 'Park et al., 2020', sourceNumber: 10 }]
        },
        {
          id: '8.3',
          chapterId: 8,
          chapterTitle: "How We'll Test It",
          icon: 'scale',
          label: 'Our honest limits',
          teaser: 'Design proposals to test, not proven claims',
          title: 'Our honest limits',
          isHighlighted: true,
          body: [
            'These features are design proposals to test, rather than established findings from our research.',
            'Its proposed value lies in combining activity access with participation support. We should compare this combination with existing solutions before claiming that it is unique or superior.'
          ],
          accent: '#F59E0B',
          citations: [{ label: 'Unsworth et al., 2021', sourceNumber: 17 }]
        }
      ]
    },

    // CHAPTER 9: SOURCE LIBRARY (18 STAR-NODES)
    {
      id: 9,
      navLabel: '09 · Source Library',
      kicker: 'CHAPTER 09 · SOURCE LIBRARY CONSTELLATION',
      heading: '18 verified sources across STEM, Business, Governance & Humanities',
      subline:
        'Filter the star-nodes by disciplinary lens or click any citation node to inspect its role in our knowledge base.',
      accent: '#38BDF8',
      worldRegionName: 'The Knowledge Constellation',
      hotspots: SOURCE_LIBRARY_ITEMS.map((src) => ({
        id: `9.${src!.number}`,
        chapterId: 9,
        chapterTitle: 'Source Library',
        icon: 'star',
        label: src!.shortCitation,
        teaser: `${src!.lens} · ${src!.fullTitle.slice(0, 48)}...`,
        title: `${src!.number}. ${src!.shortCitation}`,
        body: [src!.fullTitle, src!.roleInKnowledgeBase],
        accent:
          src!.lens === 'STEM'
            ? '#00BDEB'
            : src!.lens === 'BIZ'
            ? '#F59E0B'
            : src!.lens === 'GOV'
            ? '#A78BFA'
            : '#14B8A6',
        specialWidget: 'source-card',
        sourceData: src
      }))
    },

    // CHAPTER 10: HOW WE USED AI CRITICALLY
    {
      id: 10,
      navLabel: '10 · Critical AI Reflection',
      kicker: 'CHAPTER 10 · HOW WE USED AI CRITICALLY',
      heading: 'How we used AI critically in our research workflow',
      subline:
        'Reflecting on where AI synthesis helped connect disciplines, where it failed, and how human verification stayed in control.',
      accent: '#F43F5E',
      worldRegionName: 'The Reflection Observatory',
      hotspots: [
        {
          id: '10.1',
          chapterId: 10,
          chapterTitle: 'How We Used AI Critically',
          icon: 'lightbulb',
          label: 'The initial insight',
          teaser: 'Connecting technical UX and psychological adherence',
          title: 'The initial insight',
          body: [
            'When analysing all the sources across our four disciplines, NotebookLM helped us find a connection between technical design and psychological adherence.',
            'We cross-referenced an analysis showing that sustained engagement is essential for cognitive training effectiveness with studies stating that older adults require extra time and aid to operate digital technologies; the AI also found that poor UI/UX design negatively affects rehabilitation, as it creates cognitive barriers for users, which causes them to be demotivated.',
            'Without NotebookLM identifying this interaction, we might view usability and adherence as separate entities, without realising that senior-friendly design is a prerequisite for rehabilitation effectiveness.'
          ],
          accent: '#14B8A6',
          citations: [
            { label: 'Li et al., 2024', sourceNumber: 5 },
            { label: 'Contreras-Somoza et al., 2021', sourceNumber: 18 }
          ]
        },
        {
          id: '10.2',
          chapterId: 10,
          chapterTitle: 'How We Used AI Critically',
          icon: 'alert-triangle',
          label: 'The system failure',
          teaser: 'Secondary citation blurring & rejected policy URLs',
          title: 'The system failure',
          isHighlighted: true,
          body: [
            "We encountered two main problems when using Gemini. First, although we had imported only one source, Gemini began discussing other studies listed in that paper's references. This made it unclear which findings came from the uploaded paper and which came from other studies, so we could not assume the extensions were reliable or accurate simply because Gemini mentioned them.",
            'Second, when we used NotebookLM in the Gemini Enterprise environment to analyse local policies and healthcare guidelines, some responses produced an irrelevant list of internal citations instead of an explanation of the documents, and the system rejected the website URLs we tried to import, including local MOH resources and the AIHGle 2.0 guidelines.',
            "Without these sources, the analysis could miss important information about Singapore's healthcare policies and responsibilities, leaving a general discussion of technology that did not sufficiently consider its use in Singapore."
          ],
          accent: '#F43F5E',
          citations: [
            { label: 'MOH, 2023', sourceNumber: 6 },
            { label: 'MOH & HSA, 2026', sourceNumber: 13 }
          ]
        },
        {
          id: '10.3',
          chapterId: 10,
          chapterTitle: 'How We Used AI Critically',
          icon: 'compass',
          label: 'The strategic intervention',
          teaser: 'Switching workspaces, PDF uploads & manual checking',
          title: 'The strategic intervention',
          body: [
            'We addressed the technical problems by switching from the Google enterprise tool to a standard Google NotebookLM workspace, which resolved the citation error. We also downloaded relevant information from the MOH websites, saved it as PDFs and uploaded them, adding the policy material that the website imports had failed to include.',
            'Next, we asked NotebookLM to examine the problem from government and business perspectives, specifically considering the costs of dementia described in the National Academies publication together with the AIHGle 2.0 guidelines. Uploading more sources was only part of the process; we also identified what was lacking and asked questions that directed the AI towards those areas.',
            "However, a clearer and more detailed response did not necessarily mean every claim was correct. In future, we would ask it to separate the uploaded paper's findings from references it quoted from other studies, and we would obtain and check any such studies separately. We remained responsible for deciding whether the AI's conclusions were supported by the sources, by manually checking and validating them."
          ],
          accent: '#F59E0B',
          citations: [
            { label: 'National Academies Press, 2021', sourceNumber: 2 },
            { label: 'MOH & HSA, 2026', sourceNumber: 13 }
          ]
        }
      ]
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
