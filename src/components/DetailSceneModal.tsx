import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  ChevronRight,
  ExternalLink,
  Gamepad2,
  HelpCircle,
  Layers,
  RotateCcw,
  Sparkles,
  Volume2,
  X
} from 'lucide-react';
import { ChapterData, HotspotItem } from '../data/posterData';
import { CoreDemoType, GameCoverSvg, PlayableGameStage } from './GameDemos';
import { HotspotIcon } from './HotspotIcon';

export interface SourceBoxRect {
  left: number;
  top: number;
  width: number;
  height: number;
}

interface DetailSceneModalProps {
  hotspot: HotspotItem;
  chapter: ChapterData;
  prevHotspot: HotspotItem | null;
  nextHotspot: HotspotItem | null;
  originX: number;
  originY: number;
  sourceRect?: SourceBoxRect | null;
  returnFromSourceHotspotId: string | null;
  onClose: () => void;
  onSelectHotspot: (hotspotId: string, fromSourceJump?: boolean) => void;
}

/**
 * Special Widget: Animated count-up from 53,000 (2020) to 80,000 (2030)
 */
const DementiaCounterWidget: React.FC = () => {
  const [count, setCount] = useState(53000);

  useEffect(() => {
    let start = 53000;
    const end = 80000;
    const duration = 1200;
    const startTime = performance.now();
    let rafId = 0;

    const step = (now: number) => {
      const progress = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.round(53000 + (end - 53000) * eased);
      setCount(start);
      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      }
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div className="my-5 rounded-3xl border border-amber-400/40 bg-slate-900/90 p-5 sm:p-6 shadow-xl">
      <div className="text-xs font-bold uppercase tracking-widest text-amber-300 mb-3">
        Singapore Dementia Projection Proof (GovTech, 2026)
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
        <div className="rounded-2xl bg-slate-950/80 border border-white/10 p-4">
          <div className="text-sm font-semibold text-slate-400">2020 Baseline</div>
          <div className="text-3xl sm:text-4xl font-black text-slate-200 mt-1">53,000</div>
          <div className="text-sm text-slate-400 mt-1">People living with dementia</div>
        </div>

        <div className="rounded-2xl bg-amber-500/15 border border-amber-400/50 p-4">
          <div className="text-sm font-semibold text-amber-300">2030 Projected Need</div>
          <div
            className="text-4xl sm:text-5xl font-black text-amber-300 mt-1 tabular-nums"
            data-testid="dementia-counter-value"
          >
            {count.toLocaleString()}
          </div>
          <div className="text-sm text-amber-100/90 mt-1">+50.9% projected increase by 2030</div>
        </div>
      </div>
    </div>
  );
};

/**
 * Special Widget: Interactive "Help me understand" button demo
 */
const AiGuideDemoWidget: React.FC = () => {
  const [simplified, setSimplified] = useState(false);

  const originalInstruction =
    'Select matching pairs of visual tokens within the grid matrix to exercise visual-spatial working memory.';
  const simplifiedInstruction =
    'Tap any tile to turn it over, then tap another tile that looks the same. Take your time—there is no rush!';

  const handleHelpClick = () => {
    setSimplified(true);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(simplifiedInstruction);
      u.rate = 0.9;
      window.speechSynthesis.speak(u);
    }
  };

  return (
    <div className="my-5 rounded-3xl border border-teal-400/40 bg-slate-900/90 p-5 sm:p-6 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <span className="text-xs font-bold uppercase tracking-widest text-teal-300">
          Interactive AI Guide Demo · Plain-Language Simplification
        </span>
        {simplified && (
          <button
            type="button"
            onClick={() => setSimplified(false)}
            className="inline-flex items-center gap-1 text-xs font-semibold text-slate-300 hover:text-white cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset prompt</span>
          </button>
        )}
      </div>

      <div className="rounded-2xl border border-white/10 bg-slate-950 p-4 mb-4">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
          {simplified ? 'AI-Simplified & Spoken Prompt:' : 'Standard Activity Instruction:'}
        </div>
        <p className="text-xl sm:text-2xl font-bold text-white leading-snug">
          “{simplified ? simplifiedInstruction : originalInstruction}”
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={handleHelpClick}
          className="inline-flex items-center gap-2 rounded-2xl bg-teal-400 px-5 py-3 text-base font-bold text-slate-950 hover:bg-teal-300 transition shadow-lg cursor-pointer"
        >
          <HelpCircle className="w-5 h-5" />
          <span>Help me understand</span>
        </button>

        {simplified && (
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-300">
            <Volume2 className="w-4 h-4 animate-pulse" />
            <span>Rewritten in warm, everyday wording &amp; spoken aloud</span>
          </span>
        )}
      </div>
    </div>
  );
};

/**
 * Special Widget: Animated difficulty dial staying in the 75%–85% green band
 */
const DifficultyDialWidget: React.FC = () => {
  const [simulatedSuccess, setSimulatedSuccess] = useState(80);
  const [aiAdjustmentNote, setAiAdjustmentNote] = useState(
    'Comfort Band Active (80% success rate): Optimal challenge without frustration.'
  );

  const simulateScenario = (mode: 'struggle' | 'optimal' | 'breezy') => {
    if (mode === 'struggle') {
      setSimulatedSuccess(58);
      setAiAdjustmentNote(
        'Player success dipped to 58% → AI gently reduces distractors & offers a warm hint to return to 80%.'
      );
      setTimeout(() => setSimulatedSuccess(79), 750);
    } else if (mode === 'breezy') {
      setSimulatedSuccess(95);
      setAiAdjustmentNote(
        'Player reached 95% effortlessly → AI adds one gentle pair next round to sustain engagement at 82%.'
      );
      setTimeout(() => setSimulatedSuccess(82), 750);
    } else {
      setSimulatedSuccess(80);
      setAiAdjustmentNote(
        'Comfort Band Active (80% success rate): Optimal challenge without frustration.'
      );
    }
  };

  return (
    <div className="my-5 rounded-3xl border border-emerald-400/40 bg-slate-900/90 p-5 sm:p-6 shadow-xl">
      <div className="text-xs font-bold uppercase tracking-widest text-emerald-300 mb-3">
        Adaptive Difficulty Calibration · Target 75%–85% Comfort Band
      </div>

      <div className="relative h-9 w-full rounded-2xl bg-slate-950 border border-white/15 overflow-hidden mb-3">
        <div className="absolute inset-y-0 left-0 w-[60%] bg-rose-500/20 border-r border-white/10 flex items-center pl-3 text-xs font-semibold text-rose-300">
          Too Hard (&lt;75%)
        </div>
        <div className="absolute inset-y-0 left-[60%] w-[24%] bg-emerald-500/35 border-r border-white/10 flex items-center justify-center text-xs font-black text-emerald-200">
          75%–85% Zone
        </div>
        <div className="absolute inset-y-0 left-[84%] right-0 bg-amber-500/20 flex items-center justify-end pr-3 text-xs font-semibold text-amber-200">
          &gt;85%
        </div>

        <div
          className="absolute inset-y-0 w-2 bg-white shadow-[0_0_12px_#fff] transition-all duration-500 rounded-full"
          style={{
            left: `${Math.min(94, Math.max(8, (simulatedSuccess - 40) * 1.35))}%`
          }}
        />
      </div>

      <p className="text-base font-semibold text-emerald-200 mb-4">{aiAdjustmentNote}</p>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => simulateScenario('struggle')}
          className="rounded-xl bg-slate-800 border border-white/15 px-3.5 py-2 text-sm font-semibold text-slate-200 hover:bg-slate-700 transition cursor-pointer"
        >
          Simulate Hard Round (58% → Auto-Ease)
        </button>
        <button
          type="button"
          onClick={() => simulateScenario('optimal')}
          className="rounded-xl bg-emerald-500/20 border border-emerald-400/40 px-3.5 py-2 text-sm font-semibold text-emerald-200 hover:bg-emerald-500/30 transition cursor-pointer"
        >
          Hold in 80% Sweet Spot
        </button>
        <button
          type="button"
          onClick={() => simulateScenario('breezy')}
          className="rounded-xl bg-slate-800 border border-white/15 px-3.5 py-2 text-sm font-semibold text-slate-200 hover:bg-slate-700 transition cursor-pointer"
        >
          Simulate Easy Round (95% → Gentle Step-Up)
        </button>
      </div>
    </div>
  );
};

export const DetailSceneModal: React.FC<DetailSceneModalProps> = ({
  hotspot,
  chapter,
  prevHotspot,
  nextHotspot,
  originX,
  originY,
  returnFromSourceHotspotId,
  onClose,
  onSelectHotspot
}) => {
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [slideDirection, setSlideDirection] = useState<1 | -1>(1);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setIsDemoOpen(false);
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [hotspot.id]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowLeft' && prevHotspot && !isDemoOpen) {
        e.preventDefault();
        setSlideDirection(-1);
        onSelectHotspot(prevHotspot.id);
      } else if (e.key === 'ArrowRight' && nextHotspot && !isDemoOpen) {
        e.preventDefault();
        setSlideDirection(1);
        onSelectHotspot(nextHotspot.id);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onSelectHotspot, prevHotspot, nextHotspot, isDemoOpen]);

  // Subtle directional pull toward the clicked box so the modal springs out and collapses back naturally
  const offsetX =
    typeof window !== 'undefined' ? (originX - window.innerWidth / 2) * 0.28 : 0;
  const offsetY =
    typeof window !== 'undefined' ? (originY - window.innerHeight / 2) * 0.28 : 0;

  return (
    <motion.div
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="detail-scene-title"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xl text-slate-100 flex items-center justify-center p-3 sm:p-6"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Expanded Card Window with Subtle, Fluid Spring Expand/Collapse Physics */}
      <motion.div
        layout
        initial={{
          opacity: 0,
          x: offsetX,
          y: offsetY + 14,
          scale: 0.86
        }}
        animate={{
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          transition: {
            type: 'spring',
            stiffness: 270,
            damping: 23,
            mass: 0.85
          }
        }}
        exit={{
          opacity: 0,
          x: offsetX * 0.75,
          y: offsetY * 0.75 + 10,
          scale: 0.88,
          transition: {
            type: 'spring',
            stiffness: 320,
            damping: 28,
            mass: 0.75
          }
        }}
        style={{
          borderColor: `${hotspot.accent}66`,
          boxShadow: `0 25px 90px rgba(0,0,0,0.8), 0 0 48px ${hotspot.accent}24`,
          willChange: 'transform, opacity'
        }}
        className="relative z-10 w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-[28px] border-2 bg-slate-950/95 p-5 sm:p-8"
      >
        {/* Top Bar: Breadcrumb + Close Box Button */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4 mb-5">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm sm:text-base">
            <span
              className="rounded-lg px-2.5 py-1 font-black uppercase tracking-wider text-xs"
              style={{
                backgroundColor: `${chapter.accent}24`,
                color: chapter.accent,
                border: `1px solid ${chapter.accent}55`
              }}
            >
              {chapter.kicker}
            </span>
            <ChevronRight className="w-4 h-4 text-slate-500" />
            <span className="font-extrabold text-white">{hotspot.label}</span>
          </nav>

          <div className="flex items-center gap-2">
            {returnFromSourceHotspotId && (
              <button
                type="button"
                onClick={() => onSelectHotspot(returnFromSourceHotspotId, false)}
                className="inline-flex items-center gap-1.5 rounded-xl border border-amber-400/50 bg-amber-400/15 px-3.5 py-2 text-xs sm:text-sm font-bold text-amber-200 hover:bg-amber-400/25 transition cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to cited point</span>
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              data-testid="detail-back-button"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-slate-900 px-4 py-2 text-sm sm:text-base font-bold text-white hover:bg-teal-400 hover:text-slate-950 hover:border-teal-300 transition shadow-md cursor-pointer"
            >
              <X className="w-4 h-4" />
              <span>Close Box (Esc)</span>
            </button>
          </div>
        </div>

        {/* Category Sibling Pill Switcher */}
        <div className="mb-6">
          <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
            <Layers className="w-3.5 h-3.5 text-teal-300" />
            <span>Points in {chapter.navLabel} — Click any box to switch smoothly:</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {chapter.hotspots.map((sib, idx) => {
              const isCurrent = sib.id === hotspot.id;
              return (
                <button
                  key={sib.id}
                  type="button"
                  onClick={() => {
                    const currIdx = chapter.hotspots.findIndex((h) => h.id === hotspot.id);
                    setSlideDirection(idx >= currIdx ? 1 : -1);
                    onSelectHotspot(sib.id);
                  }}
                  className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                    isCurrent
                      ? 'bg-teal-400 text-slate-950 shadow-md scale-105'
                      : 'bg-slate-900/90 border border-white/10 text-slate-300 hover:border-teal-400/50 hover:text-white'
                  }`}
                >
                  <span className="opacity-70">{sib.id}</span>
                  <span>{sib.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Subtle Spring Glide Stage when switching between Hotspots */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={hotspot.id}
            initial={{
              opacity: 0,
              x: slideDirection * 24,
              scale: 0.98
            }}
            animate={{
              opacity: 1,
              x: 0,
              scale: 1
            }}
            exit={{
              opacity: 0,
              x: -slideDirection * 24,
              scale: 0.98
            }}
            transition={{
              type: 'spring',
              stiffness: 310,
              damping: 27,
              mass: 0.8
            }}
          >
            {/* Header: Icon + Title */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
              <div
                className="flex h-16 w-16 sm:h-20 sm:w-20 shrink-0 items-center justify-center rounded-3xl border-2 shadow-2xl"
                style={{
                  backgroundColor: `${hotspot.accent}24`,
                  borderColor: hotspot.accent,
                  boxShadow: `0 0 28px ${hotspot.accent}38`
                }}
              >
                <HotspotIcon
                  name={hotspot.icon}
                  className="w-9 h-9 sm:w-10 sm:h-10"
                  style={{ color: hotspot.accent }}
                />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400">
                    Point {hotspot.id}
                  </span>
                  {hotspot.cluster && (
                    <span className="rounded-full bg-white/10 px-3 py-0.5 text-xs font-bold text-teal-200">
                      {hotspot.cluster}
                    </span>
                  )}
                  {hotspot.gameData && (
                    <span className="rounded-full bg-teal-400/20 border border-teal-400/40 px-3 py-0.5 text-xs font-bold text-teal-200">
                      Test Game · Playable Demo · {hotspot.gameData.focusTag}
                    </span>
                  )}
                </div>

                <h2
                  id="detail-scene-title"
                  className="text-2xl sm:text-4xl font-black tracking-tight text-white leading-tight"
                >
                  {hotspot.title}
                </h2>
              </div>
            </div>

            {/* CONTENT BY TYPE */}
            {hotspot.gameData ? (
              <div className="space-y-6">
                <AnimatePresence mode="wait" initial={false}>
                  {!isDemoOpen ? (
                    <motion.div
                      key="game-overview"
                      initial={{ opacity: 0, scale: 0.96, y: 8 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.96, y: -8 }}
                      transition={{ type: 'spring', stiffness: 290, damping: 25, mass: 0.8 }}
                      className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
                    >
                      <div className="lg:col-span-5 rounded-3xl border border-white/15 bg-slate-900/85 p-5 space-y-4">
                        <GameCoverSvg
                          demoType={hotspot.gameData.demoType as CoreDemoType | undefined}
                          accent={hotspot.accent}
                        />
                        <p className="text-[20px] font-semibold text-teal-200 leading-snug">
                          {hotspot.gameData.hook}
                        </p>

                        {hotspot.gameData.demoType && (
                          <button
                            type="button"
                            data-testid="try-game-demo-button"
                            onClick={() => setIsDemoOpen(true)}
                            className="w-full inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-teal-400 to-sky-400 px-6 py-4 text-xl font-black text-slate-950 shadow-xl shadow-teal-950/60 hover:brightness-110 transition cursor-pointer"
                          >
                            <Gamepad2 className="w-6 h-6" />
                            <span>Launch Playable Test Game</span>
                          </button>
                        )}
                      </div>

                      <div className="lg:col-span-7 space-y-3.5">
                        <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-5">
                          <div className="text-xs font-bold uppercase tracking-widest text-sky-300 mb-1.5">
                            How you play
                          </div>
                          <p className="text-[20px] leading-relaxed text-slate-100">
                            {hotspot.gameData.howYouPlay}
                          </p>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-5">
                          <div className="text-xs font-bold uppercase tracking-widest text-teal-300 mb-1.5">
                            What the AI does
                          </div>
                          <p className="text-[20px] leading-relaxed text-slate-100">
                            {hotspot.gameData.whatAiDoes}
                          </p>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-5">
                          <div className="text-xs font-bold uppercase tracking-widest text-amber-300 mb-1.5">
                            What it exercises
                          </div>
                          <p className="text-[20px] leading-relaxed text-slate-100">
                            {hotspot.gameData.whatItExercises}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    hotspot.gameData.demoType && (
                      <motion.div
                        key="game-playable-stage"
                        initial={{ opacity: 0, scale: 0.94, y: 12 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        transition={{ type: 'spring', stiffness: 280, damping: 24, mass: 0.85 }}
                      >
                        <PlayableGameStage
                          demoType={hotspot.gameData.demoType}
                          gameTitle={hotspot.title}
                          howYouPlay={hotspot.gameData.howYouPlay}
                          onClose={() => setIsDemoOpen(false)}
                        />
                      </motion.div>
                    )
                  )}
                </AnimatePresence>
              </div>
            ) : hotspot.specialWidget === 'source-card' && hotspot.sourceData ? (
              <div className="rounded-3xl border border-white/15 bg-slate-900/85 p-6 sm:p-7 space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span
                    className="inline-flex items-center gap-2 rounded-xl px-4 py-1.5 text-sm font-black uppercase tracking-wider"
                    style={{
                      backgroundColor: `${hotspot.accent}25`,
                      color: hotspot.accent,
                      border: `1px solid ${hotspot.accent}60`
                    }}
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>
                      Source #{hotspot.sourceData.number} · Lens: {hotspot.sourceData.lens}
                    </span>
                  </span>

                  <a
                    href={hotspot.sourceData.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-2xl bg-teal-400 px-5 py-2.5 text-base font-bold text-slate-950 hover:bg-teal-300 transition shadow-lg"
                  >
                    <span>Open source</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">
                    Full Reference Title
                  </div>
                  <p className="text-[21px] sm:text-[23px] font-bold text-white leading-snug">
                    {hotspot.sourceData.fullTitle}
                  </p>
                </div>

                <div className="rounded-2xl border border-teal-400/30 bg-slate-950/80 p-5">
                  <div className="text-xs font-bold uppercase tracking-widest text-teal-300 mb-2">
                    Role in our knowledge base
                  </div>
                  <p className="text-[20px] sm:text-[21px] leading-relaxed text-slate-100">
                    {hotspot.sourceData.roleInKnowledgeBase}
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                {hotspot.specialWidget === 'dementia-counter' && <DementiaCounterWidget />}
                {hotspot.specialWidget === 'ai-guide-demo' && <AiGuideDemoWidget />}
                {hotspot.specialWidget === 'difficulty-dial' && <DifficultyDialWidget />}

                <div className="rounded-3xl border border-white/12 bg-slate-900/80 p-5 sm:p-7 space-y-4 shadow-xl">
                  {hotspot.body.map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-[20px] sm:text-[21px] leading-[1.68] text-slate-100 font-normal"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* Citation Chips -> Jump directly to Source Reference Card */}
            {hotspot.citations && hotspot.citations.length > 0 && (
              <div className="mt-6 rounded-2xl border border-white/10 bg-slate-900/60 p-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 mb-2.5">
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Evidence &amp; Citations — Click any chip to inspect academic source</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {hotspot.citations.map((cit) => (
                    <button
                      key={`${cit.label}-${cit.sourceNumber}`}
                      type="button"
                      onClick={() => {
                        setSlideDirection(1);
                        onSelectHotspot(`9.${cit.sourceNumber}`, true);
                      }}
                      className="inline-flex items-center gap-2 rounded-xl border border-teal-400/40 bg-teal-950/60 px-3.5 py-2 text-sm sm:text-base font-semibold text-teal-200 hover:bg-teal-400 hover:text-slate-950 transition cursor-pointer"
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>{cit.label}</span>
                      <span className="text-xs opacity-75">[{cit.sourceNumber}]</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Bottom Prev / Next Hotspot Gliding Bar */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5">
          {prevHotspot ? (
            <button
              type="button"
              onClick={() => {
                setSlideDirection(-1);
                onSelectHotspot(prevHotspot.id);
              }}
              className="group flex items-center gap-3 rounded-2xl border border-white/15 bg-slate-900/80 px-4 py-3 text-left hover:border-teal-400/50 hover:bg-slate-800/90 transition cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5 text-teal-300 group-hover:-translate-x-1 transition-transform" />
              <div>
                <div className="text-[11px] uppercase tracking-wider text-slate-400">
                  Previous Box (←)
                </div>
                <div className="text-sm sm:text-base font-bold text-white">{prevHotspot.label}</div>
              </div>
            </button>
          ) : (
            <div />
          )}

          {nextHotspot ? (
            <button
              type="button"
              onClick={() => {
                setSlideDirection(1);
                onSelectHotspot(nextHotspot.id);
              }}
              className="group flex items-center gap-3 rounded-2xl border border-white/15 bg-slate-900/80 px-4 py-3 text-right hover:border-teal-400/50 hover:bg-slate-800/90 transition ml-auto cursor-pointer"
            >
              <div>
                <div className="text-[11px] uppercase tracking-wider text-slate-400">
                  Next Box (→)
                </div>
                <div className="text-sm sm:text-base font-bold text-white">{nextHotspot.label}</div>
              </div>
              <ArrowRight className="w-5 h-5 text-teal-300 group-hover:translate-x-1 transition-transform" />
            </button>
          ) : (
            <div />
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};
