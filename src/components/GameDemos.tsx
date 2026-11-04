import React, { useState } from 'react';
import {
  CheckCircle2,
  Eye,
  HelpCircle,
  Lightbulb,
  Mic,
  Pause,
  Play,
  RotateCcw,
  Sliders,
  Sparkles,
  Star,
  Volume2,
  X
} from 'lucide-react';
import {
  createInitialGameState,
  MahjongGameState,
  resolveMismatch,
  selectTile,
  triggerGentleHint
} from '../game/mahjongLogic';
import { DogMascot } from './DogMascot';

export type CoreDemoType =
  | 'spot-diff'
  | 'match-names'
  | 'mahjong'
  | 'question-day'
  | 'familiar-sounds';

interface GameCoverSvgProps {
  demoType?: CoreDemoType;
  accent: string;
}

/**
 * Large animated SVG cover artwork shown on the left side of the Chapter 5 Detail Game Stage.
 */
export const GameCoverSvg: React.FC<GameCoverSvgProps> = ({ demoType, accent }) => {
  switch (demoType) {
    case 'spot-diff':
      return (
        <svg viewBox="0 0 320 220" className="w-full h-auto rounded-2xl bg-slate-950/90 border border-white/10 p-3">
          <rect x="14" y="18" width="136" height="184" rx="14" fill="#0F172A" stroke="#38BDF8" strokeWidth="2" />
          <rect x="170" y="18" width="136" height="184" rx="14" fill="#0F172A" stroke="#F59E0B" strokeWidth="2" />
          {/* Left Scene */}
          <circle cx="52" cy="56" r="16" fill="#FDE047" />
          <path d="M36 150 L82 102 L128 150 Z" fill="#1E293B" stroke="#38BDF8" strokeWidth="2" />
          <rect x="52" y="150" width="60" height="36" rx="4" fill="#334155" />
          <circle cx="115" cy="70" r="10" fill="#14B8A6" />
          {/* Right Scene with circled differences */}
          <circle cx="208" cy="56" r="16" fill="#FB923C" />
          <circle cx="208" cy="56" r="23" fill="none" stroke="#FDE047" strokeWidth="2.5" strokeDasharray="5 3" className="animate-spin" style={{ transformOrigin: '208px 56px', animationDuration: '9s' }} />
          <path d="M192 150 L238 102 L284 150 Z" fill="#1E293B" stroke="#38BDF8" strokeWidth="2" />
          <rect x="208" y="150" width="60" height="36" rx="4" fill="#334155" />
          <circle cx="271" cy="70" r="15" fill="none" stroke="#F43F5E" strokeWidth="2.5" className="animate-pulse" />
        </svg>
      );

    case 'match-names':
      return (
        <svg viewBox="0 0 320 220" className="w-full h-auto rounded-2xl bg-slate-950/90 border border-white/10 p-3">
          <rect x="22" y="26" width="110" height="74" rx="12" fill="#1E293B" stroke="#14B8A6" strokeWidth="2" />
          <circle cx="77" cy="56" r="16" fill="#FBBF24" />
          <path d="M54 90 Q77 72 100 90" fill="#14B8A6" />
          <rect x="22" y="118" width="110" height="74" rx="12" fill="#1E293B" stroke="#38BDF8" strokeWidth="2" />
          <circle cx="77" cy="148" r="16" fill="#F472B6" />
          <path d="M54 182 Q77 164 100 182" fill="#38BDF8" />
          {/* Connecting lines */}
          <path d="M134 63 C165 63, 165 63, 192 63" stroke="#14B8A6" strokeWidth="3" strokeDasharray="6 4" />
          <path d="M134 155 C165 155, 165 155, 192 155" stroke="#38BDF8" strokeWidth="3" />
          {/* Name tags */}
          <rect x="192" y="42" width="106" height="42" rx="10" fill="#0F172A" stroke="#14B8A6" strokeWidth="2" />
          <text x="245" y="68" textAnchor="middle" fill="#E2E8F0" fontSize="13" fontWeight="bold">Uncle Tan</text>
          <rect x="192" y="134" width="106" height="42" rx="10" fill="#0F172A" stroke="#38BDF8" strokeWidth="2" />
          <text x="245" y="160" textAnchor="middle" fill="#E2E8F0" fontSize="13" fontWeight="bold">Ah Ma Mei</text>
        </svg>
      );

    case 'mahjong':
      return (
        <svg viewBox="0 0 320 220" className="w-full h-auto rounded-2xl bg-slate-950/90 border border-white/10 p-3">
          {/* Tile 1 */}
          <g transform="translate(52, 34)">
            <rect x="0" y="6" width="88" height="122" rx="14" fill="#0D9488" />
            <rect x="0" y="0" width="88" height="122" rx="14" fill="#FFFBEB" stroke="#FDE68A" strokeWidth="3" />
            <text x="44" y="76" textAnchor="middle" fill="#DC2626" fontSize="48" fontWeight="bold">中</text>
            <text x="44" y="106" textAnchor="middle" fill="#475569" fontSize="12" fontWeight="bold">RED DRAGON</text>
          </g>
          {/* Tile 2 */}
          <g transform="translate(176, 34)">
            <rect x="0" y="6" width="88" height="122" rx="14" fill="#0D9488" />
            <rect x="0" y="0" width="88" height="122" rx="14" fill="#FFFBEB" stroke="#14B8A6" strokeWidth="3" />
            <text x="44" y="76" textAnchor="middle" fill="#16A34A" fontSize="48" fontWeight="bold">發</text>
            <text x="44" y="106" textAnchor="middle" fill="#475569" fontSize="12" fontWeight="bold">FORTUNE</text>
          </g>
          <path d="M144 95 L172 95" stroke="#FDE047" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );

    case 'question-day':
      return (
        <svg viewBox="0 0 320 220" className="w-full h-auto rounded-2xl bg-slate-950/90 border border-white/10 p-3">
          <rect x="28" y="24" width="264" height="118" rx="16" fill="#1E293B" stroke="#A855F7" strokeWidth="2" />
          <circle cx="82" cy="82" r="28" fill="#F59E0B" opacity="0.25" />
          <circle cx="82" cy="82" r="18" fill="#FDE047" />
          <text x="126" y="72" fill="#F8FAFC" fontSize="14" fontWeight="bold">“What was your favourite</text>
          <text x="126" y="94" fill="#F8FAFC" fontSize="14" fontWeight="bold">Sunday breakfast stall?”</text>
          <rect x="96" y="156" width="128" height="42" rx="21" fill="#A855F7" />
          <text x="160" y="182" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="bold">Tap Mic to Share</text>
        </svg>
      );

    case 'familiar-sounds':
    default:
      return (
        <svg viewBox="0 0 320 220" className="w-full h-auto rounded-2xl bg-slate-950/90 border border-white/10 p-3">
          <circle cx="92" cy="110" r="42" fill={accent} opacity="0.2" className="animate-ping" style={{ animationDuration: '3s' }} />
          <circle cx="92" cy="110" r="32" fill={accent} />
          <path d="M80 102 L80 118 L90 118 L102 128 L102 92 L90 102 Z" fill="#0F172A" />
          {/* Waveform bars */}
          {[0, 1, 2, 3, 4, 5, 6].map((bar) => (
            <rect
              key={bar}
              x={155 + bar * 18}
              y={80 + (bar % 3) * 10}
              width="10"
              height={60 - (bar % 3) * 20}
              rx="5"
              fill="#38BDF8"
            />
          ))}
        </svg>
      );
  }
};

interface PlayableGameStageProps {
  demoType: CoreDemoType;
  gameTitle: string;
  howYouPlay: string;
  onClose: () => void;
}

/**
 * Synthesizes gentle everyday sounds using the browser's Web Audio API so Familiar Sounds works offline & reliably.
 */
function playSynthesizedSound(soundId: 'rain' | 'kettle' | 'bird') {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;

    if (soundId === 'bird') {
      // Two warm morning bird chirps
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(680, now);
      osc.frequency.exponentialRampToValueAtTime(1180, now + 0.18);
      osc.frequency.setValueAtTime(720, now + 0.28);
      osc.frequency.exponentialRampToValueAtTime(1320, now + 0.48);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.22, now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.56);
    } else if (soundId === 'kettle') {
      // Gentle whistling steam tone
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(920, now);
      osc.frequency.linearRampToValueAtTime(1040, now + 0.65);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.18, now + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.72);
    } else {
      // Soft rain pattering (filtered white noise burst)
      const bufferSize = ctx.sampleRate * 0.65;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.4));
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 1100;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.64);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      noise.start(now);
    }
  } catch {
    // Ignore audio context restrictions if blocked
  }
}

export const PlayableGameStage: React.FC<PlayableGameStageProps> = ({
  demoType,
  gameTitle,
  howYouPlay,
  onClose
}) => {
  // Shared senior-friendly support bar states
  const [isPaused, setIsPaused] = useState(false);
  const [showInstructionsBanner, setShowInstructionsBanner] = useState(false);
  const [easierMode, setEasierMode] = useState(false);
  const [activeHintMessage, setActiveHintMessage] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [starRating, setStarRating] = useState<number | null>(null);

  // 5.1 Spot the Difference state
  const [foundDiffs, setFoundDiffs] = useState<number[]>([]);
  const totalDiffs = easierMode ? 2 : 3;

  // 5.2 Match Photos to Names state
  const [selectedPersonId, setSelectedPersonId] = useState<string | null>(null);
  const [matchedPersonIds, setMatchedPersonIds] = useState<string[]>([]);

  // 5.3 Mahjong Matching state
  const [mahjongState, setMahjongState] = useState<MahjongGameState>(() =>
    createInitialGameState('easy', 42)
  );
  const [mahjongHintIds, setMahjongHintIds] = useState<[string, string] | null>(null);

  // 5.4 Question of the Day state
  const [memoryAnswer, setMemoryAnswer] = useState('');
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);

  // 5.5 Familiar Sounds state
  const [soundRound, setSoundRound] = useState<0 | 1 | 2>(0);
  const [isPlayingSoundWave, setIsPlayingSoundWave] = useState(false);
  const [soundFeedback, setSoundFeedback] = useState<string | null>(null);

  const triggerHint = () => {
    if (demoType === 'spot-diff') {
      const remaining = [1, 2, 3].slice(0, totalDiffs).find((id) => !foundDiffs.includes(id));
      const hints: Record<number, string> = {
        1: 'Look at the warm sun/moon outside the top-left window.',
        2: 'Check the colour of the teacup on the living room table.',
        3: 'Look at the blooming plant on the right shelf.'
      };
      setActiveHintMessage(remaining ? hints[remaining] : 'All differences found!');
    } else if (demoType === 'match-names') {
      setActiveHintMessage(
        'Tap a family portrait on the left first, then tap the matching name card on the right (e.g., Uncle Tan wears glasses).'
      );
    } else if (demoType === 'mahjong') {
      const hintedState = triggerGentleHint(mahjongState);
      setMahjongState(hintedState);
      setActiveHintMessage(hintedState.lastFeedbackMessage);
    } else if (demoType === 'question-day') {
      setActiveHintMessage(
        'Think about who poured the kopi, or tap "Speak with Microphone" to try a sample voice memory.'
      );
    } else if (demoType === 'familiar-sounds') {
      const roundHints = [
        'Listen for the whistling steam of a morning kitchen kettle.',
        'Listen for the cheerful rising call of a morning bird.',
        'Listen for the gentle pattering of afternoon rain on the window.'
      ];
      setActiveHintMessage(roundHints[soundRound]);
    }
  };

  const toggleEasierMode = () => {
    const nextEasy = !easierMode;
    setEasierMode(nextEasy);
    setActiveHintMessage(
      nextEasy
        ? 'Easier option active: fewer choices on screen and extra visual guidance.'
        : 'Standard comfort level restored.'
    );
    if (demoType === 'spot-diff' && nextEasy && foundDiffs.length >= 2) {
      setIsCompleted(true);
    }
  };

  const speakInstructions = () => {
    setShowInstructionsBanner(true);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(`${gameTitle}. ${howYouPlay}`);
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Spot the difference click handler
  const handleSpotDiffClick = (diffId: number) => {
    if (isPaused) return;
    if (!foundDiffs.includes(diffId)) {
      const updated = [...foundDiffs, diffId];
      setFoundDiffs(updated);
      if (updated.length >= totalDiffs) {
        setIsCompleted(true);
      }
    }
  };

  // Match Photos to Names data & handler
  const familyPeople = [
    { id: 'tan', name: 'Uncle Tan', role: 'Older Brother · Wears Glasses', color: '#14B8A6' },
    { id: 'mei', name: 'Ah Ma Mei', role: 'Sister · Loves Orchids', color: '#F59E0B' },
    { id: 'ryan', name: 'Grandson Ryan', role: 'Grandson · National Service', color: '#38BDF8' }
  ].slice(0, easierMode ? 2 : 3);

  const handleMatchNameClick = (personId: string) => {
    if (isPaused) return;
    if (selectedPersonId === personId) {
      const updated = Array.from(new Set([...matchedPersonIds, personId]));
      setMatchedPersonIds(updated);
      setSelectedPersonId(null);
      if (updated.length >= familyPeople.length) {
        setIsCompleted(true);
      }
    } else {
      setActiveHintMessage('Not quite that name—take your time and try matching the highlighted portrait.');
    }
  };

  // Mahjong tile click handler
  const handleMahjongTileClick = (tileUid: string) => {
    if (isPaused) return;
    const nextState = selectTile(mahjongState, tileUid);
    setMahjongState(nextState);
    if (nextState.isLocked) {
      setTimeout(() => {
        setMahjongState((prev) => resolveMismatch(prev));
      }, 750);
    } else if (nextState.isCompleted) {
      setIsCompleted(true);
    }
  };

  // Familiar Sounds rounds
  const soundRounds: {
    id: 'kettle' | 'bird' | 'rain';
    prompt: string;
    correctLabel: string;
    options: { label: string; subtitle: string; emoji: string }[];
  }[] = [
    {
      id: 'kettle',
      prompt: 'Sound 1 of 3: A warm whistle from the kitchen stove...',
      correctLabel: 'Boiling Kopi Kettle',
      options: [
        { label: 'Boiling Kopi Kettle', subtitle: 'Kitchen stove steam', emoji: '🫖' },
        { label: 'Afternoon Rainstorm', subtitle: 'Raindrops on window', emoji: '🌧️' },
        { label: 'Morning Songbird', subtitle: 'Garden tree branch', emoji: '🐦' }
      ]
    },
    {
      id: 'bird',
      prompt: 'Sound 2 of 3: A cheerful call outside the window at dawn...',
      correctLabel: 'Morning Songbird',
      options: [
        { label: 'Morning Songbird', subtitle: 'Garden tree branch', emoji: '🐦' },
        { label: 'Boiling Kopi Kettle', subtitle: 'Kitchen stove steam', emoji: '🫖' },
        { label: 'Afternoon Rainstorm', subtitle: 'Raindrops on window', emoji: '🌧️' }
      ]
    },
    {
      id: 'rain',
      prompt: 'Sound 3 of 3: A soothing patter on the balcony leaves...',
      correctLabel: 'Afternoon Rainstorm',
      options: [
        { label: 'Afternoon Rainstorm', subtitle: 'Raindrops on window', emoji: '🌧️' },
        { label: 'Boiling Kopi Kettle', subtitle: 'Kitchen stove steam', emoji: '🫖' },
        { label: 'Morning Songbird', subtitle: 'Garden tree branch', emoji: '🐦' }
      ]
    }
  ];

  const currentSound = soundRounds[soundRound];

  return (
    <div className="rounded-3xl border border-teal-400/40 bg-slate-900/95 p-5 sm:p-7 shadow-2xl">
      {/* Mandatory Senior-Friendly Support Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4 mb-5">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-3 w-3 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-sm font-bold uppercase tracking-wider text-teal-300">
            Interactive Demo Stage · {gameTitle}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2" role="toolbar" aria-label="Activity support controls">
          <button
            type="button"
            onClick={triggerHint}
            className="inline-flex items-center gap-1.5 rounded-xl bg-amber-400/15 border border-amber-400/40 px-3.5 py-2 text-sm font-semibold text-amber-200 hover:bg-amber-400/25 transition"
          >
            <Lightbulb className="w-4 h-4 text-amber-300" />
            <span>Hint</span>
          </button>

          <button
            type="button"
            onClick={() => setIsPaused((p) => !p)}
            className="inline-flex items-center gap-1.5 rounded-xl bg-slate-800 border border-white/15 px-3.5 py-2 text-sm font-semibold text-slate-100 hover:bg-slate-700 transition"
          >
            {isPaused ? <Play className="w-4 h-4 text-emerald-400" /> : <Pause className="w-4 h-4 text-sky-300" />}
            <span>{isPaused ? 'Resume' : 'Pause'}</span>
          </button>

          <button
            type="button"
            onClick={speakInstructions}
            className="inline-flex items-center gap-1.5 rounded-xl bg-slate-800 border border-white/15 px-3.5 py-2 text-sm font-semibold text-slate-100 hover:bg-slate-700 transition"
          >
            <Volume2 className="w-4 h-4 text-teal-300" />
            <span>Replay instructions</span>
          </button>

          <button
            type="button"
            onClick={toggleEasierMode}
            aria-pressed={easierMode}
            className={`inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-sm font-semibold transition ${
              easierMode
                ? 'bg-teal-500 text-slate-950 border-teal-300'
                : 'bg-slate-800 border-white/15 text-slate-100 hover:bg-slate-700'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>{easierMode ? 'Easier option: ON' : 'Easier option'}</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 rounded-xl bg-rose-500/20 border border-rose-400/40 px-3.5 py-2 text-sm font-semibold text-rose-200 hover:bg-rose-500/30 transition"
          >
            <X className="w-4 h-4" />
            <span>Close</span>
          </button>
        </div>
      </div>

      {/* Optional Replayed Instructions or Hint Banner */}
      {(showInstructionsBanner || activeHintMessage) && (
        <div className="mb-5 flex items-start justify-between gap-4 rounded-2xl border border-teal-400/30 bg-teal-950/50 px-4 py-3 text-base text-teal-100">
          <div className="flex items-start gap-2.5">
            <HelpCircle className="w-5 h-5 text-teal-300 shrink-0 mt-0.5" />
            <div>
              {showInstructionsBanner && <p className="font-medium mb-1">{howYouPlay}</p>}
              {activeHintMessage && <p className="text-amber-200 font-semibold">{activeHintMessage}</p>}
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              setShowInstructionsBanner(false);
              setActiveHintMessage(null);
            }}
            className="text-xs uppercase tracking-wider text-teal-300 hover:underline shrink-0"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Paused Overlay */}
      {isPaused && (
        <div className="my-6 rounded-2xl border border-sky-400/30 bg-slate-950/90 p-8 text-center">
          <p className="text-2xl font-bold text-white mb-2">Activity Paused — Take All the Time You Need</p>
          <p className="text-lg text-slate-300 mb-5">
            There are no timers or penalties. Whenever you feel ready, tap Resume to continue.
          </p>
          <button
            type="button"
            onClick={() => setIsPaused(false)}
            className="inline-flex items-center gap-2 rounded-2xl bg-teal-400 px-6 py-3 text-lg font-bold text-slate-950 hover:bg-teal-300 transition"
          >
            <Play className="w-5 h-5" />
            <span>Resume Activity</span>
          </button>
        </div>
      )}

      {/* Active Game Area */}
      {!isPaused && (
        <div>
          {/* 5.1 SPOT THE DIFFERENCE */}
          {demoType === 'spot-diff' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-lg font-semibold text-slate-100">
                  Tap the {totalDiffs} gentle differences on the right-hand picture ({foundDiffs.length} of {totalDiffs} found)
                </p>
                <span className="text-sm text-teal-300 font-medium">
                  No time limit · Tap Hint anytime
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Original Scene */}
                <div className="rounded-2xl border border-white/15 bg-slate-950 p-4">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Original Family Living Room
                  </div>
                  <svg viewBox="0 0 300 190" className="w-full h-auto rounded-xl bg-slate-900">
                    {/* Window & Sun */}
                    <rect x="24" y="20" width="84" height="68" rx="8" fill="#0EA5E9" opacity="0.25" stroke="#38BDF8" strokeWidth="2" />
                    <circle cx="66" cy="54" r="16" fill="#FDE047" />
                    {/* Table & Teacup */}
                    <rect x="40" y="132" width="220" height="16" rx="6" fill="#78350F" />
                    <rect x="128" y="106" width="38" height="26" rx="6" fill="#38BDF8" />
                    {/* Shelf & Plant */}
                    <rect x="195" y="45" width="76" height="10" rx="4" fill="#78350F" />
                    <circle cx="233" cy="32" r="14" fill="#10B981" />
                  </svg>
                </div>

                {/* Interactive Comparison Scene */}
                <div className="rounded-2xl border border-teal-400/40 bg-slate-950 p-4">
                  <div className="text-xs font-bold uppercase tracking-wider text-teal-300 mb-2">
                    Tap the differences here
                  </div>
                  <svg viewBox="0 0 300 190" className="w-full h-auto rounded-xl bg-slate-900">
                    {/* Diff 1: Window Sun changed color */}
                    <g
                      onClick={() => handleSpotDiffClick(1)}
                      className="cursor-pointer"
                      role="button"
                      tabIndex={0}
                      aria-label="Difference 1: Sunset orange sun in window"
                      onKeyDown={(e) => e.key === 'Enter' && handleSpotDiffClick(1)}
                    >
                      <rect x="24" y="20" width="84" height="68" rx="8" fill="#0EA5E9" opacity="0.25" stroke="#38BDF8" strokeWidth="2" />
                      <circle cx="66" cy="54" r="18" fill="#F97316" />
                      {foundDiffs.includes(1) && (
                        <circle cx="66" cy="54" r="28" fill="none" stroke="#FDE047" strokeWidth="4" />
                      )}
                    </g>

                    {/* Table & Diff 2: Teacup changed to Rose */}
                    <rect x="40" y="132" width="220" height="16" rx="6" fill="#78350F" />
                    <g
                      onClick={() => handleSpotDiffClick(2)}
                      className="cursor-pointer"
                      role="button"
                      tabIndex={0}
                      aria-label="Difference 2: Pink teacup on the table"
                      onKeyDown={(e) => e.key === 'Enter' && handleSpotDiffClick(2)}
                    >
                      <rect x="128" y="106" width="38" height="26" rx="6" fill="#F43F5E" />
                      {foundDiffs.includes(2) && (
                        <circle cx="147" cy="119" r="28" fill="none" stroke="#FDE047" strokeWidth="4" />
                      )}
                    </g>

                    {/* Shelf & Diff 3: Plant (hidden if easierMode only needs 2, or still clickable) */}
                    <rect x="195" y="45" width="76" height="10" rx="4" fill="#78350F" />
                    <g
                      onClick={() => handleSpotDiffClick(3)}
                      className="cursor-pointer"
                      role="button"
                      tabIndex={0}
                      aria-label="Difference 3: Golden orchid on the right shelf"
                      onKeyDown={(e) => e.key === 'Enter' && handleSpotDiffClick(3)}
                    >
                      <circle cx="233" cy="32" r="16" fill="#A855F7" />
                      {foundDiffs.includes(3) && (
                        <circle cx="233" cy="32" r="26" fill="none" stroke="#FDE047" strokeWidth="4" />
                      )}
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          )}

          {/* 5.2 MATCH PHOTOS TO NAMES */}
          {demoType === 'match-names' && (
            <div className="space-y-4">
              <p className="text-lg font-semibold text-slate-100">
                Step 1: Tap a family portrait on the left · Step 2: Tap their matching name on the right ({matchedPersonIds.length} of {familyPeople.length} paired)
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Family Portraits
                  </div>
                  {familyPeople.map((person) => {
                    const isMatched = matchedPersonIds.includes(person.id);
                    const isSelected = selectedPersonId === person.id;
                    return (
                      <button
                        key={person.id}
                        type="button"
                        disabled={isMatched}
                        onClick={() => setSelectedPersonId(person.id)}
                        className={`w-full flex items-center gap-4 rounded-2xl border p-4 text-left transition ${
                          isMatched
                            ? 'border-emerald-400/50 bg-emerald-950/30 opacity-75'
                            : isSelected
                            ? 'border-amber-400 bg-amber-400/15 ring-2 ring-amber-400'
                            : 'border-white/15 bg-slate-950 hover:border-teal-400/50'
                        }`}
                      >
                        <div
                          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-xl font-black text-slate-950"
                          style={{ backgroundColor: person.color }}
                        >
                          {person.name.charAt(0)}
                        </div>
                        <div>
                          <div className="text-base font-bold text-white">{person.role}</div>
                          <div className="text-sm text-slate-300">
                            {isMatched ? `Matched with ${person.name}` : 'Tap to select portrait'}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="space-y-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Family Names
                  </div>
                  {[...familyPeople].reverse().map((person) => {
                    const isMatched = matchedPersonIds.includes(person.id);
                    return (
                      <button
                        key={person.id}
                        type="button"
                        disabled={isMatched || !selectedPersonId}
                        onClick={() => handleMatchNameClick(person.id)}
                        className={`w-full flex items-center justify-between rounded-2xl border p-5 text-left transition ${
                          isMatched
                            ? 'border-emerald-400/50 bg-emerald-950/30 text-emerald-200'
                            : selectedPersonId
                            ? 'border-teal-400/50 bg-slate-950 hover:bg-teal-950/40 text-white'
                            : 'border-white/10 bg-slate-950/60 text-slate-400'
                        }`}
                      >
                        <span className="text-xl font-bold">{person.name}</span>
                        {isMatched && <CheckCircle2 className="w-6 h-6 text-emerald-400" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* 5.3 MAHJONG MATCHING */}
          {demoType === 'mahjong' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-lg font-semibold text-slate-100">
                  Match identical Singapore Mahjong tiles ({mahjongState.matchesFound} of {mahjongState.totalPairs} pairs matched)
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setMahjongState(createInitialGameState('easy', Date.now() % 1000));
                    setIsCompleted(false);
                  }}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-300 hover:underline"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>New Tile Deal</span>
                </button>
              </div>

              <div className="grid grid-cols-4 gap-3 sm:gap-4">
                {mahjongState.tiles.map((tile) => {
                  const isFaceUp = easierMode || tile.isFlipped || tile.isMatched;
                  return (
                    <button
                      key={tile.uid}
                      type="button"
                      disabled={tile.isMatched}
                      onClick={() => handleMahjongTileClick(tile.uid)}
                      className={`flex flex-col items-center justify-center rounded-2xl border-2 p-3 sm:p-4 min-h-[104px] transition-all ${
                        tile.isMatched
                          ? 'border-emerald-400/40 bg-emerald-950/30 opacity-55 scale-95'
                          : tile.isHinted
                          ? 'border-amber-300 bg-amber-400/20 ring-4 ring-amber-300/40 scale-105'
                          : tile.isFlipped
                          ? 'border-teal-300 bg-amber-50 text-slate-950 scale-105 shadow-lg'
                          : isFaceUp
                          ? 'border-amber-200/80 bg-amber-50/95 text-slate-900 hover:-translate-y-0.5'
                          : 'border-teal-500/40 bg-teal-900/60 text-teal-100 hover:bg-teal-800/70'
                      }`}
                    >
                      {isFaceUp ? (
                        <>
                          <span
                            className="text-3xl sm:text-4xl font-black leading-none mb-1"
                            style={{ color: tile.symbol.accentColor }}
                          >
                            {tile.symbol.hanzi}
                          </span>
                          <span className="text-xs font-bold uppercase tracking-tight text-slate-700">
                            {tile.symbol.englishName}
                          </span>
                        </>
                      ) : (
                        <>
                          <Eye className="w-6 h-6 text-teal-300 mb-1" />
                          <span className="text-xs font-bold uppercase tracking-wider text-teal-200">
                            Tap Tile
                          </span>
                        </>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* 5.4 QUESTION OF THE DAY */}
          {demoType === 'question-day' && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-purple-400/30 bg-slate-950 p-5">
                <div className="text-xs font-bold uppercase tracking-wider text-purple-300 mb-1">
                  Today’s Family Photo Prompt · Tiong Bahru Kopitiam
                </div>
                <p className="text-xl font-bold text-white mb-2">
                  {easierMode
                    ? '“Did you enjoy warm Kopi or Teh more on Sunday mornings?”'
                    : '“Who used to order the kaya toast and soft-boiled eggs on Sunday mornings?”'}
                </p>
                <p className="text-base text-slate-300">
                  There are no right or wrong answers—every memory you share is celebrated.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsRecordingVoice(true);
                    setTimeout(() => {
                      setMemoryAnswer(
                        'Uncle Tan always ordered the kaya toast with two soft-boiled eggs and Kopi-O Kosong for everyone.'
                      );
                      setIsRecordingVoice(false);
                    }, 900);
                  }}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-purple-500 px-5 py-3.5 text-base font-bold text-white hover:bg-purple-400 transition"
                >
                  <Mic className={`w-5 h-5 ${isRecordingVoice ? 'animate-ping' : ''}`} />
                  <span>
                    {isRecordingVoice ? 'Listening to your voice...' : 'Speak with Microphone (Voice-to-Text)'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (!memoryAnswer.trim()) {
                      setMemoryAnswer('We loved having warm Kaya Toast and Kopi together.');
                    }
                    setIsCompleted(true);
                  }}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-teal-400 px-5 py-3.5 text-base font-bold text-slate-950 hover:bg-teal-300 transition"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>Share Memory</span>
                </button>
              </div>

              <textarea
                value={memoryAnswer}
                onChange={(e) => setMemoryAnswer(e.target.value)}
                rows={2}
                placeholder="Or type a short memory here..."
                className="w-full rounded-2xl border border-white/15 bg-slate-950 p-4 text-lg text-white placeholder:text-slate-500 focus:border-teal-400 focus:outline-none"
              />
            </div>
          )}

          {/* 5.5 FAMILIAR SOUNDS */}
          {demoType === 'familiar-sounds' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-sky-400/30 bg-slate-950 p-4">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-sky-300">
                    Everyday Sound Recognition
                  </div>
                  <p className="text-lg font-bold text-white">{currentSound.prompt}</p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setIsPlayingSoundWave(true);
                    playSynthesizedSound(currentSound.id);
                    setTimeout(() => setIsPlayingSoundWave(false), 750);
                  }}
                  className="inline-flex items-center gap-2 rounded-2xl bg-sky-400 px-5 py-3 text-base font-bold text-slate-950 hover:bg-sky-300 transition"
                >
                  <Volume2 className={`w-5 h-5 ${isPlayingSoundWave ? 'animate-bounce' : ''}`} />
                  <span>Play Sound</span>
                </button>
              </div>

              {soundFeedback && (
                <p className="text-base font-semibold text-teal-300">{soundFeedback}</p>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {currentSound.options.slice(0, easierMode ? 2 : 3).map((opt) => (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => {
                      if (opt.label === currentSound.correctLabel) {
                        if (soundRound < 2) {
                          setSoundFeedback(`Wonderful! That was the ${opt.label}. Try the next sound!`);
                          setSoundRound((r) => (r + 1) as 0 | 1 | 2);
                        } else {
                          setSoundFeedback(`Wonderful! You recognised all three familiar sounds!`);
                          setIsCompleted(true);
                        }
                      } else {
                        setSoundFeedback(
                          `Take your time—tap "Play Sound" again and listen closely.`
                        );
                      }
                    }}
                    className="flex flex-col items-center rounded-2xl border border-white/15 bg-slate-950 p-5 text-center hover:border-sky-400 transition"
                  >
                    <span className="text-4xl mb-2" role="img" aria-label={opt.label}>
                      {opt.emoji}
                    </span>
                    <span className="text-lg font-bold text-white">{opt.label}</span>
                    <span className="text-sm text-slate-400">{opt.subtitle}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Post-Game Cheering Dog Mascot & Preference Rating */}
      {isCompleted && (
        <div className="mt-6 rounded-3xl border border-amber-400/50 bg-gradient-to-br from-teal-950/90 via-slate-900 to-amber-950/40 p-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <DogMascot
              mode="cheer"
              size="md"
              speechText="Wonderful job! Every calm session helps keep your mind active!"
            />

            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-300 mb-1">
                <Sparkles className="w-4 h-4" />
                <span>Session Complete · Post-Game Preference Check</span>
              </div>
              <h4 className="text-2xl font-bold text-white mb-2">
                How much did you enjoy {gameTitle} today?
              </h4>
              <p className="text-base text-slate-300 mb-4">
                Your star rating helps our AI recommend more of the themes and activities you genuinely enjoy.
              </p>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setStarRating(star)}
                    aria-label={`Rate ${star} out of 5 stars`}
                    className={`inline-flex items-center gap-1 rounded-xl border px-4 py-2.5 text-base font-bold transition ${
                      starRating && star <= starRating
                        ? 'border-amber-300 bg-amber-400 text-slate-950'
                        : 'border-white/15 bg-slate-950 text-slate-300 hover:border-amber-400/50'
                    }`}
                  >
                    <Star className="w-5 h-5 fill-current" />
                    <span>{star}</span>
                  </button>
                ))}
              </div>

              {starRating && (
                <p className="mt-3 text-sm font-semibold text-emerald-300">
                  Thank you! Saved {starRating}/5 stars to your personal activity preference profile.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
