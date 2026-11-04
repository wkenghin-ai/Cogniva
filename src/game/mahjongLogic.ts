export type DifficultyLevel = 'easy' | 'medium' | 'hard';

export interface MahjongSymbol {
  id: string;
  hanzi: string;
  pinyin: string;
  englishName: string;
  category: 'Dragons' | 'Winds' | 'Flowers';
  accentColor: string;
  culturalNote: string;
}

export interface TileInstance {
  uid: string;
  symbolId: string;
  symbol: MahjongSymbol;
  isFlipped: boolean;
  isMatched: boolean;
  isHinted: boolean;
}

export interface MahjongGameState {
  difficulty: DifficultyLevel;
  tiles: TileInstance[];
  selectedUids: string[];
  attempts: number;
  matchesFound: number;
  totalPairs: number;
  consecutiveMistakes: number;
  totalMistakes: number;
  hintsUsed: number;
  adaptivePromptVisible: boolean;
  adaptivePromptDismissedAtMistakeCount: number;
  easierSwitchCount: number;
  isLocked: boolean;
  isCompleted: boolean;
  lastFeedbackMessage: string;
}

export interface BoundedRecommendation {
  suggestedNextLevel: DifficultyLevel;
  rationale: string;
  boundarySafeguardNote: string;
  accuracyRatePercent: number;
}

export const MAHJONG_SYMBOLS: MahjongSymbol[] = [
  {
    id: 'zhong',
    hanzi: '中',
    pinyin: 'Zhōng',
    englishName: 'Red Dragon (Center)',
    category: 'Dragons',
    accentColor: '#DC2626',
    culturalNote: 'Iconic crimson honor tile representing success and focus in traditional tabletop play.'
  },
  {
    id: 'fa',
    hanzi: '發',
    pinyin: 'Fā',
    englishName: 'Green Dragon (Prosperity)',
    category: 'Dragons',
    accentColor: '#15803D',
    culturalNote: 'Classic emerald honor tile immediately recognizable to seniors across Singapore.'
  },
  {
    id: 'bai',
    hanzi: '白',
    pinyin: 'Bái',
    englishName: 'White Dragon (Clarity)',
    category: 'Dragons',
    accentColor: '#1D4ED8',
    culturalNote: 'Framed cobalt-blue border tile symbolizing pure slate and calm visual recognition.'
  },
  {
    id: 'dong',
    hanzi: '東',
    pinyin: 'Dōng',
    englishName: 'East Wind',
    category: 'Winds',
    accentColor: '#102D4B',
    culturalNote: 'Primary directional wind tile that anchors round openings in social Mahjong.'
  },
  {
    id: 'nan',
    hanzi: '南',
    pinyin: 'Nán',
    englishName: 'South Wind',
    category: 'Winds',
    accentColor: '#102D4B',
    culturalNote: 'Second directional wind tile with distinct symmetrical stroke geometry.'
  },
  {
    id: 'xi',
    hanzi: '西',
    pinyin: 'Xī',
    englishName: 'West Wind',
    category: 'Winds',
    accentColor: '#102D4B',
    culturalNote: 'High-contrast geometric character familiar from everyday directional signage.'
  },
  {
    id: 'bei',
    hanzi: '北',
    pinyin: 'Běi',
    englishName: 'North Wind',
    category: 'Winds',
    accentColor: '#102D4B',
    culturalNote: 'Fourth directional wind tile completing the traditional four-wind compass.'
  },
  {
    id: 'mei',
    hanzi: '梅',
    pinyin: 'Méi',
    englishName: 'Plum Blossom',
    category: 'Flowers',
    accentColor: '#B45309',
    culturalNote: 'Bonus floral tile celebrating resilience and seasonal familiarity.'
  }
];

export const DIFFICULTY_CONFIG: Record<
  DifficultyLevel,
  { pairs: number; label: string; gridCols: string; description: string }
> = {
  easy: {
    pairs: 4,
    label: 'Easy (4 Pairs)',
    gridCols: 'grid-cols-4',
    description: '8 large tiles · Gentle warm-up focusing on iconic Dragon & Wind honours'
  },
  medium: {
    pairs: 6,
    label: 'Medium (6 Pairs)',
    gridCols: 'grid-cols-4',
    description: '12 tiles · Balanced visual working-memory and attention activity'
  },
  hard: {
    pairs: 8,
    label: 'Hard (8 Pairs)',
    gridCols: 'grid-cols-4',
    description: '16 tiles · Full set of Dragons, Winds & Blossom honour pairs'
  }
};

/**
 * Deterministic-capable shuffle using an optional seed so unit tests and demos remain predictable.
 */
export function createShuffledDeck(difficulty: DifficultyLevel, seed?: number): TileInstance[] {
  const pairCount = DIFFICULTY_CONFIG[difficulty].pairs;
  const chosenSymbols = MAHJONG_SYMBOLS.slice(0, pairCount);

  const rawDeck: TileInstance[] = [];
  chosenSymbols.forEach((symbol) => {
    rawDeck.push({
      uid: `${symbol.id}-a`,
      symbolId: symbol.id,
      symbol,
      isFlipped: false,
      isMatched: false,
      isHinted: false
    });
    rawDeck.push({
      uid: `${symbol.id}-b`,
      symbolId: symbol.id,
      symbol,
      isFlipped: false,
      isMatched: false,
      isHinted: false
    });
  });

  // Linear congruential generator when seed is provided, otherwise Math.random
  let currentSeed = seed !== undefined ? seed : Math.floor(Math.random() * 100000) + 1;
  const nextRand = () => {
    currentSeed = (currentSeed * 1664525 + 1013904223) % 4294967296;
    return currentSeed / 4294967296;
  };

  const deck = [...rawDeck];
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(nextRand() * (i + 1));
    const temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }

  return deck;
}

export function createInitialGameState(
  difficulty: DifficultyLevel = 'easy',
  seed?: number,
  easierSwitchCount = 0
): MahjongGameState {
  const tiles = createShuffledDeck(difficulty, seed);
  return {
    difficulty,
    tiles,
    selectedUids: [],
    attempts: 0,
    matchesFound: 0,
    totalPairs: DIFFICULTY_CONFIG[difficulty].pairs,
    consecutiveMistakes: 0,
    totalMistakes: 0,
    hintsUsed: 0,
    adaptivePromptVisible: false,
    adaptivePromptDismissedAtMistakeCount: 0,
    easierSwitchCount,
    isLocked: false,
    isCompleted: false,
    lastFeedbackMessage: 'Select any tile to reveal its Mahjong symbol. Take your time—there is no timer.'
  };
}

/**
 * Handles clicking or pressing Enter/Space on a tile.
 * Prevents duplicate clicks on already flipped, matched, or locked boards.
 */
export function selectTile(state: MahjongGameState, uid: string): MahjongGameState {
  if (state.isLocked || state.isCompleted) {
    return state;
  }

  const targetTile = state.tiles.find((t) => t.uid === uid);
  if (!targetTile || targetTile.isFlipped || targetTile.isMatched) {
    return state;
  }

  if (state.selectedUids.includes(uid) || state.selectedUids.length >= 2) {
    return state;
  }

  const nextSelectedUids = [...state.selectedUids, uid];
  const nextTiles = state.tiles.map((t) =>
    t.uid === uid ? { ...t, isFlipped: true, isHinted: false } : t
  );

  // First card of the pair flipped
  if (nextSelectedUids.length === 1) {
    return {
      ...state,
      tiles: nextTiles,
      selectedUids: nextSelectedUids,
      lastFeedbackMessage: `Revealed ${targetTile.symbol.englishName} (${targetTile.symbol.hanzi}). Now select a second tile to find its pair.`
    };
  }

  // Second card flipped -> Check if match immediately or lock briefly before resolving mismatch
  const [firstUid, secondUid] = nextSelectedUids;
  const firstTile = nextTiles.find((t) => t.uid === firstUid)!;
  const secondTile = nextTiles.find((t) => t.uid === secondUid)!;

  if (firstTile.symbolId === secondTile.symbolId) {
    // Immediate positive match!
    const matchedTiles = nextTiles.map((t) =>
      t.uid === firstUid || t.uid === secondUid
        ? { ...t, isMatched: true, isFlipped: true, isHinted: false }
        : { ...t, isHinted: false }
    );
    const nextMatchesFound = state.matchesFound + 1;
    const isCompleted = nextMatchesFound >= state.totalPairs;

    return {
      ...state,
      tiles: matchedTiles,
      selectedUids: [],
      attempts: state.attempts + 1,
      matchesFound: nextMatchesFound,
      consecutiveMistakes: 0,
      adaptivePromptVisible: false,
      isLocked: false,
      isCompleted,
      lastFeedbackMessage: isCompleted
        ? `Wonderful job! You matched all ${state.totalPairs} pairs at your own pace.`
        : `Great match! You paired ${firstTile.symbol.englishName} (${firstTile.symbol.hanzi}).`
    };
  }

  // Non-matching pair: lock board temporarily so user can observe both tiles before flip-back
  return {
    ...state,
    tiles: nextTiles,
    selectedUids: nextSelectedUids,
    isLocked: true,
    lastFeedbackMessage: `${firstTile.symbol.englishName} and ${secondTile.symbol.englishName} do not match yet. Remember their positions.`
  };
}

/**
 * Resolves a non-matching pair after the short observation delay.
 * Triggers supportive adaptive prompt after 2 consecutive mismatches.
 */
export function resolveMismatch(state: MahjongGameState): MahjongGameState {
  if (!state.isLocked || state.selectedUids.length !== 2) {
    return state;
  }

  const [firstUid, secondUid] = state.selectedUids;
  const nextConsecutiveMistakes = state.consecutiveMistakes + 1;
  const nextTotalMistakes = state.totalMistakes + 1;

  // Trigger supportive adaptive prompt when user makes >= 2 consecutive mistakes
  const shouldShowAdaptivePrompt =
    nextConsecutiveMistakes >= 2 &&
    nextTotalMistakes > state.adaptivePromptDismissedAtMistakeCount;

  const resetTiles = state.tiles.map((t) =>
    t.uid === firstUid || t.uid === secondUid ? { ...t, isFlipped: false } : t
  );

  return {
    ...state,
    tiles: resetTiles,
    selectedUids: [],
    attempts: state.attempts + 1,
    consecutiveMistakes: nextConsecutiveMistakes,
    totalMistakes: nextTotalMistakes,
    adaptivePromptVisible: shouldShowAdaptivePrompt || state.adaptivePromptVisible,
    isLocked: false,
    lastFeedbackMessage: shouldShowAdaptivePrompt
      ? 'No rush at all. Would you like to try an easier level or receive a gentle hint?'
      : 'Take your time and try another pair whenever you are ready.'
  };
}

/**
 * Highlights one unmatched pair so the user receives gentle guidance without penalty.
 */
export function triggerGentleHint(state: MahjongGameState): MahjongGameState {
  if (state.isCompleted || state.isLocked) {
    return state;
  }

  const unmatchedTiles = state.tiles.filter((t) => !t.isMatched);
  if (unmatchedTiles.length < 2) {
    return state;
  }

  // If one tile is already flipped, highlight its matching partner; otherwise highlight the first available pair
  const currentlyFlipped = state.tiles.find((t) => t.isFlipped && !t.isMatched);
  const targetSymbolId = currentlyFlipped
    ? currentlyFlipped.symbolId
    : unmatchedTiles[0].symbolId;

  const hintedTiles = state.tiles.map((t) =>
    t.symbolId === targetSymbolId && !t.isMatched ? { ...t, isHinted: true } : { ...t, isHinted: false }
  );

  const symbolName = unmatchedTiles.find((t) => t.symbolId === targetSymbolId)?.symbol.englishName ?? 'matching';

  return {
    ...state,
    tiles: hintedTiles,
    hintsUsed: state.hintsUsed + 1,
    adaptivePromptVisible: false,
    adaptivePromptDismissedAtMistakeCount: state.totalMistakes,
    lastFeedbackMessage: `Gentle Hint: Look for the two highlighted tiles with the gold border to pair ${symbolName}.`
  };
}

export function dismissAdaptivePrompt(state: MahjongGameState): MahjongGameState {
  return {
    ...state,
    adaptivePromptVisible: false,
    adaptivePromptDismissedAtMistakeCount: state.totalMistakes,
    lastFeedbackMessage: 'Continuing at your current level. You can request a hint anytime.'
  };
}

export function getEasierDifficulty(current: DifficultyLevel): DifficultyLevel {
  if (current === 'hard') return 'medium';
  return 'easy';
}

/**
 * Computes a rule-based bounded recommendation based on session interaction metrics.
 * Explicitly framed as a non-clinical, bounded design prototype.
 */
export function computeBoundedRecommendation(state: MahjongGameState): BoundedRecommendation {
  const accuracy =
    state.attempts > 0 ? Math.round((state.totalPairs / state.attempts) * 100) : 100;

  if (state.totalMistakes <= 2 && state.hintsUsed === 0) {
    const nextLevel: DifficultyLevel =
      state.difficulty === 'easy' ? 'medium' : state.difficulty === 'medium' ? 'hard' : 'hard';
    return {
      suggestedNextLevel: nextLevel,
      accuracyRatePercent: accuracy,
      rationale:
        state.difficulty === 'hard'
          ? `You completed all ${state.totalPairs} pairs smoothly with ${state.attempts} attempts and zero hints. Cogniva would maintain the 8-pair layout or suggest a complementary visual activity such as Find the Differences.`
          : `Because you completed the ${state.totalPairs}-pair board comfortably (${state.attempts} attempts, ${state.totalMistakes} mismatches), Cogniva's bounded rules suggest offering ${DIFFICULTY_CONFIG[nextLevel].label} as an optional next step.`,
      boundarySafeguardNote:
        'Simulated Rule-Based Prototype: Difficulty adjustments are capped to ±1 step per session and always require user confirmation. Gameplay metrics reflect task interaction only—never a clinical or diagnostic measure of cognitive status.'
    };
  }

  if (state.totalMistakes >= 5 || state.hintsUsed >= 2) {
    const nextLevel: DifficultyLevel =
      state.difficulty === 'hard' ? 'medium' : 'easy';
    return {
      suggestedNextLevel: nextLevel,
      accuracyRatePercent: accuracy,
      rationale: `Interaction log recorded ${state.attempts} attempts, ${state.totalMistakes} mismatches, and ${state.hintsUsed} hint(s). To keep sessions welcoming and unhurried, Cogniva recommends ${DIFFICULTY_CONFIG[nextLevel].label} with optional spoken prompts enabled.`,
      boundarySafeguardNote:
        'Simulated Rule-Based Prototype: Slower responses or mistakes can stem from fatigue, glare, or touchscreen unfamiliarity. Cogniva never infers cognitive decline and keeps adaptations strictly within safe, pre-set difficulty bounds.'
    };
  }

  return {
    suggestedNextLevel: state.difficulty,
    accuracyRatePercent: accuracy,
    rationale: `You completed all ${state.totalPairs} pairs in ${state.attempts} attempts (${state.totalMistakes} mismatches, ${state.hintsUsed} hint used). Cogniva recommends staying at ${DIFFICULTY_CONFIG[state.difficulty].label} to consolidate familiarity and confidence.`,
    boundarySafeguardNote:
      'Simulated Rule-Based Prototype: Adaptation rules operate within predetermined comfort thresholds and preserve full user autonomy over activity selection.'
  };
}
