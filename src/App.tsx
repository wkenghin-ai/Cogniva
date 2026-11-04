import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowUp,
  Bell,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  Compass,
  Filter,
  Gamepad2,
  Home,
  Lock,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Unlock,
  Users
} from 'lucide-react';
import { DetailSceneModal } from './components/DetailSceneModal';
import { DogMascot } from './components/DogMascot';
import { HotspotIcon } from './components/HotspotIcon';
import { DiveCanvasState, WorldCanvas } from './components/WorldCanvas';
import {
  findHotspotById,
  HotspotItem,
  LensCategory,
  POSTER_DATA
} from './data/posterData';

/**
 * TWEAKABLE TRANSITION CONSTANTS
 * Change DIVE_PRE_DELAY_MS to adjust how long the camera dolly/warp plays before the circular reveal opens.
 */
export const DIVE_PRE_DELAY_MS = 240;

interface MagneticHotspotButtonProps {
  hotspot: HotspotItem;
  index: number;
  isDivingOut: boolean;
  isActiveTarget: boolean;
  onDive: (hotspot: HotspotItem, e: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: 'default' | 'compact' | 'shield' | 'star';
}

/**
 * Surface Hotspot Component:
 * Strictly displays ONLY the pulsing icon ring, short point label (max 6 words),
 * and optional 1-line hover/focus teaser. Never displays the long explanation on the surface.
 */
const MagneticHotspotButton: React.FC<MagneticHotspotButtonProps> = ({
  hotspot,
  index,
  isDivingOut,
  isActiveTarget,
  onDive,
  variant = 'default'
}) => {
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * 0.14;
    const dy = (e.clientY - cy) * 0.14;
    setOffset({ x: dx, y: dy });
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  return (
    <button
      ref={btnRef}
      type="button"
      data-testid={`hotspot-${hotspot.id}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={(e) => onDive(hotspot, e)}
      style={{
        transform: isDivingOut
          ? isActiveTarget
            ? 'scale(1.28)'
            : 'scale(0.82)'
          : `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        opacity: isDivingOut && !isActiveTarget ? 0 : 1,
        animationDelay: `${(index % 6) * 0.35}s`
      }}
      className={`hotspot-drift group relative flex flex-col items-center text-center transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-300 cursor-pointer ${
        variant === 'shield'
          ? 'rounded-3xl border-2 border-emerald-400/70 bg-emerald-950/50 p-6 shadow-[0_0_40px_rgba(16,185,129,0.28)]'
          : variant === 'compact' || variant === 'star'
          ? 'rounded-2xl border border-white/15 bg-slate-900/75 px-4 py-3.5 hover:border-teal-400/60 backdrop-blur-md'
          : hotspot.isHighlighted
          ? 'rounded-3xl border-2 border-amber-400/70 bg-slate-900/85 p-5 shadow-[0_0_35px_rgba(245,158,11,0.22)] backdrop-blur-md'
          : 'rounded-3xl border border-white/15 bg-slate-900/75 p-5 hover:border-white/35 backdrop-blur-md shadow-xl'
      }`}
    >
      {/* Pulsing Ring + Icon */}
      <div className="relative mb-3 flex items-center justify-center">
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full opacity-40 group-hover:opacity-75 group-hover:scale-125 transition-all duration-500 animate-ping"
          style={{
            backgroundColor: hotspot.accent,
            animationDuration: '3.2s'
          }}
        />
        <span
          aria-hidden="true"
          className="relative flex h-14 w-14 items-center justify-center rounded-full border-2 shadow-lg transition-transform duration-300 group-hover:scale-110"
          style={{
            backgroundColor: `${hotspot.accent}24`,
            borderColor: hotspot.accent,
            boxShadow: `0 0 22px ${hotspot.accent}44`
          }}
        >
          <HotspotIcon
            name={hotspot.icon}
            className="w-6 h-6"
            style={{ color: hotspot.accent }}
          />
        </span>
      </div>

      {/* Point ID & Optional Lens Badge */}
      <div className="flex items-center gap-1.5 mb-1">
        <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
          {hotspot.id}
        </span>
        {hotspot.sourceData && (
          <span
            className="rounded-md px-1.5 py-0.5 text-[10px] font-black uppercase"
            style={{
              backgroundColor: `${hotspot.accent}28`,
              color: hotspot.accent
            }}
          >
            {hotspot.sourceData.lens}
          </span>
        )}
        {hotspot.isHighlighted && (
          <span className="rounded-md bg-amber-400/20 px-1.5 py-0.5 text-[10px] font-extrabold uppercase text-amber-300">
            Key Focus
          </span>
        )}
      </div>

      {/* Short Point Label (Max 6 words) */}
      <span className="text-base sm:text-lg font-extrabold text-white leading-snug group-hover:text-teal-200 transition-colors">
        {hotspot.label}
      </span>

      {/* Optional 1-line Hover / Focus Teaser */}
      {hotspot.teaser && (
        <span className="mt-1.5 text-xs sm:text-sm font-medium text-slate-300/90 opacity-85 group-hover:opacity-100 transition-opacity line-clamp-1">
          {hotspot.teaser}
        </span>
      )}
    </button>
  );
};

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeChapterId, setActiveChapterId] = useState<number>(0);

  // Dive & Detail Scene State
  const [divingHotspotId, setDivingHotspotId] = useState<string | null>(null);
  const [openHotspotId, setOpenHotspotId] = useState<string | null>(null);
  const [returnFromSourceId, setReturnFromSourceId] = useState<string | null>(null);
  const [diveOrigin, setDiveOrigin] = useState({ x: 720, y: 450, accent: '#14B8A6' });
  const lastClickedTriggerRef = useRef<HTMLButtonElement | null>(null);

  // Chapter 5: Game Focus Filter & Progressive Unlocking Toggle
  const [gameFocusFilter, setGameFocusFilter] = useState<
    'All' | 'Memory' | 'Attention' | 'Association' | 'Reminiscence'
  >('All');
  const [unlockedShelfStage, setUnlockedShelfStage] = useState<'starter' | 'expanded'>('expanded');

  // Chapter 6: Older Adult View vs Caregiver View Toggle
  const [experienceViewMode, setExperienceViewMode] = useState<'older-adult' | 'caregiver'>(
    'older-adult'
  );

  // Chapter 9: Source Library Lens Filter
  const [sourceLensFilter, setSourceLensFilter] = useState<'ALL' | LensCategory>('ALL');

  // Track scroll progress & active chapter
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;
      setScrollProgress(progress);

      // Determine active chapter by section offset
      const sections = document.querySelectorAll<HTMLElement>('[data-chapter-section]');
      let currentId = 0;
      for (const sec of Array.from(sections)) {
        const rect = sec.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.45) {
          currentId = Number(sec.dataset.chapterSection || 0);
        }
      }
      setActiveChapterId(currentId);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll while DetailSceneModal is open
  useEffect(() => {
    if (openHotspotId) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [openHotspotId]);

  const activeChapterAccent = useMemo(() => {
    if (activeChapterId === 0) return '#14B8A6';
    const found = POSTER_DATA.chapters.find((c) => c.id === activeChapterId);
    return found ? found.accent : '#14B8A6';
  }, [activeChapterId]);

  const activeHotspotLookup = useMemo(
    () => (openHotspotId ? findHotspotById(openHotspotId) : null),
    [openHotspotId]
  );

  const handleDiveIntoHotspot = (
    hotspot: HotspotItem,
    e?: React.MouseEvent<HTMLButtonElement>
  ) => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (e?.currentTarget) {
      lastClickedTriggerRef.current = e.currentTarget;
      const rect = e.currentTarget.getBoundingClientRect();
      setDiveOrigin({
        x: Math.round(rect.left + rect.width / 2),
        y: Math.round(rect.top + rect.height / 2),
        accent: hotspot.accent
      });
    } else {
      setDiveOrigin({
        x: Math.round(window.innerWidth / 2),
        y: Math.round(window.innerHeight / 2),
        accent: hotspot.accent
      });
    }

    setReturnFromSourceId(null);

    if (prefersReducedMotion) {
      setOpenHotspotId(hotspot.id);
      return;
    }

    setDivingHotspotId(hotspot.id);
    setTimeout(() => {
      setOpenHotspotId(hotspot.id);
      setDivingHotspotId(null);
    }, DIVE_PRE_DELAY_MS);
  };

  const handleSelectHotspotInsideModal = (targetId: string, isFromCitationChip?: boolean) => {
    const found = findHotspotById(targetId);
    if (!found) return;
    if (isFromCitationChip && openHotspotId) {
      setReturnFromSourceId(openHotspotId);
    } else if (!isFromCitationChip) {
      setReturnFromSourceId(null);
    }
    setDiveOrigin((prev) => ({ ...prev, accent: found.hotspot.accent }));
    setOpenHotspotId(targetId);
  };

  const handleCloseDetailModal = () => {
    setOpenHotspotId(null);
    setReturnFromSourceId(null);
    setTimeout(() => {
      lastClickedTriggerRef.current?.focus();
    }, 60);
  };

  const scrollToChapter = (chapterId: number) => {
    const el = document.getElementById(`chapter-${chapterId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const diveCanvasState: DiveCanvasState = {
    isDiving: Boolean(divingHotspotId),
    isDetailOpen: Boolean(openHotspotId),
    originX: diveOrigin.x,
    originY: diveOrigin.y,
    accent: diveOrigin.accent
  };

  return (
    <div className="relative min-h-screen text-slate-100 selection:bg-teal-400 selection:text-slate-950">
      {/* Persistent 3D/Parallax Memory Constellation World */}
      <WorldCanvas
        scrollProgress={scrollProgress}
        activeChapterAccent={activeChapterAccent}
        diveState={diveCanvasState}
      />

      {/* Top Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-40 h-1.5 bg-slate-900/80 backdrop-blur">
        <div
          className="h-full bg-gradient-to-r from-teal-400 via-sky-400 to-amber-400 transition-all duration-150"
          style={{ width: `${Math.round(scrollProgress * 100)}%` }}
        />
      </div>

      {/* Fixed Top Glass Header */}
      <header className="fixed top-1.5 left-0 right-0 z-30 mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/75 px-4 py-2.5 backdrop-blur-xl shadow-lg">
          <button
            type="button"
            onClick={() => scrollToChapter(0)}
            className="flex items-center gap-2.5 text-left focus:outline-none"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-teal-400/20 border border-teal-400/50 text-teal-300 font-black text-sm">
              C
            </span>
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-teal-300 block leading-none">
                {POSTER_DATA.hero.courseTag}
              </span>
              <span className="text-sm font-bold text-white hidden sm:inline">
                Gamified &amp; AI-Assisted Cognitive Rehabilitation
              </span>
            </div>
          </button>

          <div className="flex items-center gap-2">
            <span className="hidden md:inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Click any pulsing hotspot to dive in</span>
            </span>

            <button
              type="button"
              onClick={() => scrollToChapter(5)}
              className="rounded-xl bg-teal-400/20 border border-teal-400/40 px-3 py-1.5 text-xs font-bold text-teal-200 hover:bg-teal-400 hover:text-slate-950 transition cursor-pointer"
            >
              05 · The Games
            </button>
            <button
              type="button"
              onClick={() => scrollToChapter(9)}
              className="rounded-xl bg-sky-400/20 border border-sky-400/40 px-3 py-1.5 text-xs font-bold text-sky-200 hover:bg-sky-400 hover:text-slate-950 transition cursor-pointer"
            >
              09 · 18 Sources
            </button>
          </div>
        </div>
      </header>

      {/* Fixed Right Chapter-Dot Navigation Rail */}
      <nav
        aria-label="Chapter navigation"
        className="fixed right-3.5 top-1/2 -translate-y-1/2 z-30 hidden xl:flex flex-col items-center gap-3 rounded-full border border-white/10 bg-slate-950/80 px-2.5 py-3.5 backdrop-blur-md shadow-xl"
      >
        <button
          type="button"
          onClick={() => scrollToChapter(0)}
          aria-label="Jump to Hero"
          className="group relative flex items-center justify-center p-0.5 cursor-pointer"
        >
          <span
            className={`pointer-events-none absolute right-8 rounded-lg border border-white/10 bg-slate-950/95 px-2.5 py-1 text-xs font-bold whitespace-nowrap shadow-lg transition-opacity ${
              activeChapterId === 0
                ? 'opacity-100 text-teal-300'
                : 'opacity-0 group-hover:opacity-100 text-slate-200'
            }`}
          >
            00 · Hero
          </span>
          <span
            className={`h-3 w-3 rounded-full transition-all ${
              activeChapterId === 0
                ? 'bg-teal-400 scale-125 ring-4 ring-teal-400/30'
                : 'bg-slate-600 group-hover:bg-slate-400'
            }`}
          />
        </button>

        {POSTER_DATA.chapters.map((chap) => {
          const isActive = activeChapterId === chap.id;
          return (
            <button
              key={chap.id}
              type="button"
              onClick={() => scrollToChapter(chap.id)}
              aria-label={`Jump to ${chap.navLabel}`}
              className="group relative flex items-center justify-center p-0.5 cursor-pointer"
            >
              <span
                className={`pointer-events-none absolute right-8 rounded-lg border border-white/10 bg-slate-950/95 px-2.5 py-1 text-xs font-bold whitespace-nowrap shadow-lg transition-opacity ${
                  isActive
                    ? 'opacity-100 text-white'
                    : 'opacity-0 group-hover:opacity-100 text-slate-200'
                }`}
              >
                {chap.navLabel}
              </span>
              <span
                className="h-3 w-3 rounded-full transition-all"
                style={{
                  backgroundColor: isActive ? chap.accent : '#475569',
                  transform: isActive ? 'scale(1.3)' : 'scale(1)',
                  boxShadow: isActive ? `0 0 12px ${chap.accent}` : 'none'
                }}
              />
            </button>
          );
        })}
      </nav>

      {/* MAIN SURFACE CHAPTERS */}
      <main className="relative z-10">
        {/* =========================================================
            CHAPTER 0 — HERO
           ========================================================= */}
        <section
          id="chapter-0"
          data-chapter-section="0"
          className="relative min-h-screen flex flex-col justify-between px-5 pt-28 pb-12 sm:px-10 max-w-6xl mx-auto"
        >
          <div className="my-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-teal-400/40 bg-teal-400/15 px-4 py-1.5 text-sm font-extrabold uppercase tracking-widest text-teal-200">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>{POSTER_DATA.hero.courseTag}</span>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.06]">
                {POSTER_DATA.hero.title}
              </h1>

              {/* One-line Pitch (Always Visible on Surface) */}
              <p className="text-xl sm:text-2xl font-medium text-slate-200 leading-relaxed max-w-3xl border-l-4 border-teal-400 pl-5 py-1">
                {POSTER_DATA.hero.pitch}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => scrollToChapter(1)}
                  className="inline-flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-teal-400 to-sky-400 px-6 py-4 text-lg font-black text-slate-950 shadow-xl shadow-teal-950/60 hover:brightness-110 transition cursor-pointer"
                >
                  <span>{POSTER_DATA.hero.scrollCue}</span>
                  <ChevronDown className="w-5 h-5 animate-bounce" />
                </button>

                <button
                  type="button"
                  onClick={() => scrollToChapter(5)}
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-slate-900/80 px-5 py-4 text-base font-bold text-white hover:border-teal-400/60 transition cursor-pointer"
                >
                  <Gamepad2 className="w-5 h-5 text-teal-300" />
                  <span>Try Playable Games (Ch. 5)</span>
                </button>
              </div>
            </div>

            {/* Friendly Cartoon Dog Mascot (waves + notification ping) */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center">
              <div className="rounded-3xl border border-white/15 bg-slate-900/65 p-6 backdrop-blur-xl text-center shadow-2xl">
                <DogMascot
                  mode="ping"
                  size="lg"
                  pingNotificationText="Hi! I'm Kopi, your gentle activity companion. Tap any glowing hotspot as you scroll to dive in!"
                />
                <div className="mt-3 text-xs font-bold uppercase tracking-widest text-teal-300">
                  Interactive Companion Mascot · Tap Kopi!
                </div>
              </div>
            </div>
          </div>

          {/* Team Names at Edge of Hero */}
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5 text-sm text-slate-300">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-bold uppercase tracking-wider text-teal-300">
                Project Team:
              </span>
              <span>{POSTER_DATA.hero.team.join(' · ')}</span>
            </div>
            <div className="text-xs uppercase tracking-widest text-slate-400">
              Surface &gt; Dive &gt; Detail Interactive Poster
            </div>
          </div>
        </section>

        {/* =========================================================
            CHAPTERS 1 TO 10
           ========================================================= */}
        {POSTER_DATA.chapters.map((chapter) => {
          const isDivingOut = Boolean(divingHotspotId);

          return (
            <section
              key={chapter.id}
              id={`chapter-${chapter.id}`}
              data-chapter-section={chapter.id}
              className="relative min-h-[88vh] flex flex-col justify-center px-5 py-24 sm:px-10 max-w-6xl mx-auto"
            >
              {/* Chapter Surface Header */}
              <div className="max-w-3xl mb-12">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-slate-900/80 px-3.5 py-1 text-xs font-extrabold uppercase tracking-widest mb-3"
                  style={{ color: chapter.accent }}
                >
                  <span>{chapter.kicker}</span>
                  <span>·</span>
                  <span className="text-slate-400">{chapter.worldRegionName}</span>
                </div>

                <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
                  {chapter.heading}
                </h2>

                {chapter.subline && (
                  <p className="mt-3 text-lg sm:text-xl font-medium text-slate-300 leading-relaxed">
                    {chapter.subline}
                  </p>
                )}

                {chapter.alwaysVisibleCard && (
                  <div className="mt-5 rounded-3xl border border-amber-400/40 bg-slate-900/85 p-6 shadow-xl backdrop-blur-md">
                    <div className="text-xs font-bold uppercase tracking-widest text-amber-300 mb-2">
                      Core Problem Statement
                    </div>
                    <p className="text-lg sm:text-xl font-medium text-slate-100 leading-relaxed">
                      {chapter.alwaysVisibleCard}
                    </p>
                  </div>
                )}
              </div>

              {/* ---------------------------------------------------------
                  CHAPTER 3 SPECIAL SURFACE: 5 Pillars Ring around Glowing Home
                 --------------------------------------------------------- */}
              {chapter.id === 3 && (
                <div className="space-y-8">
                  <div className="mx-auto flex flex-col items-center justify-center rounded-3xl border border-teal-400/30 bg-slate-900/60 p-6 max-w-md text-center backdrop-blur-md">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-400/20 border border-teal-400 text-teal-300 mb-2 shadow-[0_0_30px_rgba(20,184,166,0.4)]">
                      <Home className="w-8 h-8" />
                    </div>
                    <div className="text-base font-extrabold text-white">
                      Calm Home Rehabilitation Hub
                    </div>
                    <div className="text-xs text-slate-300">
                      Click any of the 5 pillars below to inspect how the platform works
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
                    {chapter.hotspots.map((h, i) => (
                      <MagneticHotspotButton
                        key={h.id}
                        hotspot={h}
                        index={i}
                        isDivingOut={isDivingOut}
                        isActiveTarget={divingHotspotId === h.id}
                        onDive={handleDiveIntoHotspot}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* ---------------------------------------------------------
                  CHAPTER 4 SPECIAL SURFACE: AI Orbit + Highlighted Safety Shield
                 --------------------------------------------------------- */}
              {chapter.id === 4 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {chapter.hotspots.map((h, i) => (
                    <MagneticHotspotButton
                      key={h.id}
                      hotspot={h}
                      index={i}
                      isDivingOut={isDivingOut}
                      isActiveTarget={divingHotspotId === h.id}
                      onDive={handleDiveIntoHotspot}
                      variant={h.id === '4.6' ? 'shield' : 'default'}
                    />
                  ))}
                </div>
              )}

              {/* ---------------------------------------------------------
                  CHAPTER 5 SPECIAL SURFACE: THE GAMES (Product Showcase)
                 --------------------------------------------------------- */}
              {chapter.id === 5 && (
                <div className="space-y-10">
                  {/* Shared Features Strip */}
                  <div className="rounded-2xl border border-teal-400/35 bg-teal-950/40 px-5 py-4 text-sm sm:text-base font-semibold text-teal-100 shadow-lg backdrop-blur-md">
                    <span className="font-black uppercase tracking-wider text-teal-300 mr-2">
                      Every game includes:
                    </span>
                    Hints · Pause · Replay instructions · Easier option · Friendly mascot encouragement · Post-game rating · No timers, penalties or leaderboards.
                  </div>

                  {/* Focus Filter Chips + Progressive Unlocking Visual */}
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter games by cognitive focus">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400 mr-1">
                        <Filter className="w-3.5 h-3.5 text-teal-300" />
                        <span>Focus:</span>
                      </span>
                      {(['All', 'Memory', 'Attention', 'Association', 'Reminiscence'] as const).map(
                        (tag) => (
                          <button
                            key={tag}
                            type="button"
                            onClick={() => setGameFocusFilter(tag)}
                            className={`rounded-xl px-3.5 py-2 text-xs sm:text-sm font-bold transition cursor-pointer ${
                              gameFocusFilter === tag
                                ? 'bg-teal-400 text-slate-950 shadow-md'
                                : 'bg-slate-900/80 border border-white/15 text-slate-200 hover:border-teal-400/50'
                            }`}
                          >
                            {tag}
                          </button>
                        )
                      )}
                    </div>

                    {/* Progressive Unlocking Toggle */}
                    <div className="flex items-center gap-2 rounded-2xl border border-amber-400/35 bg-slate-900/85 p-2">
                      <button
                        type="button"
                        onClick={() => setUnlockedShelfStage('starter')}
                        className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition cursor-pointer ${
                          unlockedShelfStage === 'starter'
                            ? 'bg-amber-400 text-slate-950'
                            : 'text-slate-300 hover:text-white'
                        }`}
                      >
                        <Lock className="w-3.5 h-3.5" />
                        <span>Start with a small set (Day 1)</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setUnlockedShelfStage('expanded')}
                        className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition cursor-pointer ${
                          unlockedShelfStage === 'expanded'
                            ? 'bg-teal-400 text-slate-950'
                            : 'text-slate-300 hover:text-white'
                        }`}
                      >
                        <Unlock className="w-3.5 h-3.5" />
                        <span>Unlock more as you feel comfortable</span>
                      </button>
                    </div>
                  </div>

                  {/* PART A — 5 Core Game Cards (5.1 to 5.5) */}
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest text-teal-300 mb-4">
                      Part A · Five Core Games (Click any card to dive into its Game Stage &amp; playable demo)
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {chapter.hotspots
                        .filter((h) => h.gameData?.kind === 'core')
                        .filter(
                          (h) =>
                            gameFocusFilter === 'All' ||
                            h.gameData?.focusTag === gameFocusFilter
                        )
                        .map((h, idx) => {
                          const isStarterLocked =
                            unlockedShelfStage === 'starter' && idx >= 2;
                          return (
                            <button
                              key={h.id}
                              type="button"
                              data-testid={`hotspot-${h.id}`}
                              onClick={(e) => handleDiveIntoHotspot(h, e)}
                              className={`group relative flex flex-col justify-between rounded-3xl border p-6 text-left transition-all duration-300 cursor-pointer ${
                                isStarterLocked
                                  ? 'border-white/10 bg-slate-900/45 opacity-75 hover:opacity-100'
                                  : 'border-white/15 bg-slate-900/85 hover:-translate-y-1 hover:border-teal-400/70 shadow-xl'
                              }`}
                            >
                              <div>
                                <div className="flex items-center justify-between gap-2 mb-4">
                                  <span
                                    className="flex h-14 w-14 items-center justify-center rounded-2xl border-2 shadow-md transition-transform group-hover:scale-110"
                                    style={{
                                      backgroundColor: `${h.accent}22`,
                                      borderColor: h.accent
                                    }}
                                  >
                                    <HotspotIcon
                                      name={h.icon}
                                      className="w-7 h-7"
                                      style={{ color: h.accent }}
                                    />
                                  </span>

                                  <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-bold text-teal-200">
                                    {h.gameData?.focusTag}
                                  </span>
                                </div>

                                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                                  Core Game {h.id}
                                </div>
                                <h3 className="text-2xl font-black text-white group-hover:text-teal-200 transition-colors">
                                  {h.label}
                                </h3>
                                <p className="mt-2 text-base font-medium text-slate-300 leading-snug">
                                  {h.gameData?.hook}
                                </p>
                              </div>

                              <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-3.5 text-sm font-bold text-teal-300">
                                <span>
                                  {isStarterLocked
                                    ? 'Unlocks as confidence grows · Preview'
                                    : 'Dive in & Play Demo'}
                                </span>
                                <Gamepad2 className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                              </div>
                            </button>
                          );
                        })}
                    </div>
                  </div>

                  {/* PART B — 5 Pipeline Activities (5.6 to 5.10) */}
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest text-amber-300 mb-4">
                      Part B · More Activities in the Pipeline (5.6 – 5.10)
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                      {chapter.hotspots
                        .filter((h) => h.gameData?.kind === 'pipeline')
                        .filter(
                          (h) =>
                            gameFocusFilter === 'All' ||
                            h.gameData?.focusTag === gameFocusFilter
                        )
                        .map((h, i) => (
                          <MagneticHotspotButton
                            key={h.id}
                            hotspot={h}
                            index={i}
                            isDivingOut={isDivingOut}
                            isActiveTarget={divingHotspotId === h.id}
                            onDive={handleDiveIntoHotspot}
                            variant="compact"
                          />
                        ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ---------------------------------------------------------
                  CHAPTER 6 SPECIAL SURFACE: Interactive App Mock + View Toggle
                 --------------------------------------------------------- */}
              {chapter.id === 6 && (
                <div className="space-y-8">
                  {/* Top Row: View Mode Switcher + 3 Stress-Free Guarantee Chips */}
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div
                      className="inline-flex rounded-2xl border border-white/15 bg-slate-900/90 p-1.5"
                      role="group"
                      aria-label="Switch interface walkthrough perspective"
                    >
                      <button
                        type="button"
                        onClick={() => setExperienceViewMode('older-adult')}
                        className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition cursor-pointer ${
                          experienceViewMode === 'older-adult'
                            ? 'bg-teal-400 text-slate-950 shadow-md'
                            : 'text-slate-300 hover:text-white'
                        }`}
                      >
                        <Smartphone className="w-4 h-4" />
                        <span>Older adult view (6.1 – 6.6)</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setExperienceViewMode('caregiver')}
                        className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition cursor-pointer ${
                          experienceViewMode === 'caregiver'
                            ? 'bg-amber-400 text-slate-950 shadow-md'
                            : 'text-slate-300 hover:text-white'
                        }`}
                      >
                        <Users className="w-4 h-4" />
                        <span>Caregiver view (6.7 – 6.11)</span>
                      </button>
                    </div>

                    {/* 3 Required Chips */}
                    <div className="flex flex-wrap gap-2">
                      {[
                        'No leaderboards',
                        'No missed-day penalties',
                        'No countdown timers'
                      ].map((chip) => (
                        <span
                          key={chip}
                          className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-emerald-950/50 px-3.5 py-1.5 text-xs font-bold text-emerald-200"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>{chip}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Central Interactive Device Preview + Orbiting Hotspots */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    <div className="lg:col-span-5 rounded-3xl border-2 border-white/15 bg-slate-950/90 p-6 shadow-2xl">
                      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                        <span className="text-xs font-bold uppercase tracking-wider text-teal-300">
                          {experienceViewMode === 'older-adult'
                            ? 'Senior Tablet Interface Preview'
                            : 'Caregiver Companion Portal Preview'}
                        </span>
                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                      </div>

                      {experienceViewMode === 'older-adult' ? (
                        <div className="space-y-4">
                          <div className="rounded-2xl bg-slate-900 p-4 border border-teal-400/30">
                            <div className="text-xs font-bold text-amber-300">
                              Good morning, Uncle Tan!
                            </div>
                            <div className="text-lg font-black text-white mt-0.5">
                              Ready for a calm 10-minute activity?
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="rounded-2xl bg-teal-500/20 border border-teal-400/50 p-4 text-center">
                              <div className="text-2xl font-black text-teal-300">中 / 發</div>
                              <div className="text-sm font-bold text-white mt-1">
                                Mahjong Tiles
                              </div>
                            </div>
                            <div className="rounded-2xl bg-sky-500/20 border border-sky-400/50 p-4 text-center">
                              <div className="text-2xl font-black text-sky-300">🫖 🐦</div>
                              <div className="text-sm font-bold text-white mt-1">
                                Familiar Sounds
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-slate-300">
                            <span>Hint · Pause · Replay · Easier</span>
                            <span className="text-teal-300">Audio Guide ON</span>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="rounded-2xl bg-slate-900 p-4 border border-amber-400/30">
                            <div className="text-xs font-bold text-amber-300">
                              Family &amp; Caregiver Support View
                            </div>
                            <div className="text-lg font-black text-white mt-0.5">
                              3 Calm Sessions Completed This Week
                            </div>
                          </div>
                          <div className="rounded-2xl bg-slate-900/90 border border-white/10 p-4 space-y-2 text-xs text-slate-300">
                            <div className="flex justify-between font-bold text-white">
                              <span>Uploaded Family Photos</span>
                              <span className="text-teal-300">12 Photos Active</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Favourite Activity</span>
                              <span className="text-amber-300">Mahjong Matching (5★)</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Comfort Band</span>
                              <span className="text-emerald-300">81% Success (Optimal)</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {chapter.hotspots
                        .filter((h) => h.viewMode === experienceViewMode)
                        .map((h, i) => (
                          <MagneticHotspotButton
                            key={h.id}
                            hotspot={h}
                            index={i}
                            isDivingOut={isDivingOut}
                            isActiveTarget={divingHotspotId === h.id}
                            onDive={handleDiveIntoHotspot}
                          />
                        ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ---------------------------------------------------------
                  CHAPTER 7 SPECIAL SURFACE: 3 Interdisciplinary Lens Clusters
                 --------------------------------------------------------- */}
              {chapter.id === 7 && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
                  {(
                    [
                      {
                        name: 'STEM',
                        border: 'border-sky-400/40',
                        badge: 'bg-sky-400/20 text-sky-200'
                      },
                      {
                        name: 'Business & Governance',
                        border: 'border-amber-400/40',
                        badge: 'bg-amber-400/20 text-amber-200'
                      },
                      {
                        name: 'Social Sciences & Humanities',
                        border: 'border-rose-400/40',
                        badge: 'bg-rose-400/20 text-rose-200'
                      }
                    ] as const
                  ).map((clusterGroup) => (
                    <div
                      key={clusterGroup.name}
                      className={`rounded-3xl border ${clusterGroup.border} bg-slate-900/50 p-5 space-y-4 backdrop-blur-md`}
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={`rounded-xl px-3 py-1 text-xs font-black uppercase tracking-wider ${clusterGroup.badge}`}
                        >
                          {clusterGroup.name}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 gap-4">
                        {chapter.hotspots
                          .filter((h) => h.cluster === clusterGroup.name)
                          .map((h, i) => (
                            <MagneticHotspotButton
                              key={h.id}
                              hotspot={h}
                              index={i}
                              isDivingOut={isDivingOut}
                              isActiveTarget={divingHotspotId === h.id}
                              onDive={handleDiveIntoHotspot}
                            />
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* ---------------------------------------------------------
                  CHAPTER 9 SPECIAL SURFACE: 18-Star Source Constellation
                 --------------------------------------------------------- */}
              {chapter.id === 9 && (
                <div className="space-y-6">
                  <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter 18 sources by discipline lens">
                    {(['ALL', 'STEM', 'BIZ', 'GOV', 'SSH'] as const).map((lens) => (
                      <button
                        key={lens}
                        type="button"
                        onClick={() => setSourceLensFilter(lens)}
                        className={`rounded-xl px-4 py-2 text-xs sm:text-sm font-black uppercase tracking-wider transition cursor-pointer ${
                          sourceLensFilter === lens
                            ? 'bg-sky-400 text-slate-950 shadow-md'
                            : 'bg-slate-900/80 border border-white/15 text-slate-300 hover:border-sky-400/50'
                        }`}
                      >
                        {lens === 'ALL' ? 'All 18 Sources' : lens}
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
                    {chapter.hotspots
                      .filter(
                        (h) =>
                          sourceLensFilter === 'ALL' ||
                          h.sourceData?.lens === sourceLensFilter
                      )
                      .map((h, i) => (
                        <MagneticHotspotButton
                          key={h.id}
                          hotspot={h}
                          index={i}
                          isDivingOut={isDivingOut}
                          isActiveTarget={divingHotspotId === h.id}
                          onDive={handleDiveIntoHotspot}
                          variant="star"
                        />
                      ))}
                  </div>
                </div>
              )}

              {/* ---------------------------------------------------------
                  STANDARD CONSTELLATION GRID FOR CHAPTERS 1, 2, 8, 10
                 --------------------------------------------------------- */}
              {![3, 4, 5, 6, 7, 9].includes(chapter.id) && (
                <div
                  className={`grid grid-cols-1 sm:grid-cols-2 ${
                    chapter.hotspots.length === 3
                      ? 'lg:grid-cols-3'
                      : 'lg:grid-cols-4'
                  } gap-6`}
                >
                  {chapter.hotspots.map((h, i) => (
                    <MagneticHotspotButton
                      key={h.id}
                      hotspot={h}
                      index={i}
                      isDivingOut={isDivingOut}
                      isActiveTarget={divingHotspotId === h.id}
                      onDive={handleDiveIntoHotspot}
                    />
                  ))}
                </div>
              )}
            </section>
          );
        })}
      </main>

      {/* =========================================================
          FOOTER
         ========================================================= */}
      <footer className="relative z-10 border-t border-white/10 bg-slate-950/90 px-6 py-10 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm sm:text-base font-semibold text-slate-300 text-center sm:text-left">
            CC0007 · Prototype proposal · Team: Khai Liang, Qunming, Shan Xi, Keng, Qin Yan
          </div>

          <button
            type="button"
            onClick={() => scrollToChapter(0)}
            className="inline-flex items-center gap-2 rounded-xl border border-teal-400/40 bg-teal-400/15 px-4 py-2 text-sm font-bold text-teal-200 hover:bg-teal-400 hover:text-slate-950 transition cursor-pointer"
          >
            <ArrowUp className="w-4 h-4" />
            <span>Back to Top</span>
          </button>
        </div>
      </footer>

      {/* =========================================================
          DIVE -> DETAIL SCENE MODAL
         ========================================================= */}
      {activeHotspotLookup && (
        <DetailSceneModal
          hotspot={activeHotspotLookup.hotspot}
          chapter={activeHotspotLookup.chapter}
          prevHotspot={activeHotspotLookup.prevHotspot}
          nextHotspot={activeHotspotLookup.nextHotspot}
          originX={diveOrigin.x}
          originY={diveOrigin.y}
          returnFromSourceHotspotId={returnFromSourceId}
          onClose={handleCloseDetailModal}
          onSelectHotspot={handleSelectHotspotInsideModal}
        />
      )}
    </div>
  );
}
