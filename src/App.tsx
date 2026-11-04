import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import {
  AlertTriangle,
  Award,
  BookOpen,
  Eye,
  Gamepad2,
  Heart,
  Maximize2,
  Minimize2,
  Printer,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { ClickBurstEvent, ClickTransitionFX } from './components/ClickTransitionFX';
import { DetailSceneModal, SourceBoxRect } from './components/DetailSceneModal';
import { HotspotIcon } from './components/HotspotIcon';
import { DiveCanvasState, WorldCanvas } from './components/WorldCanvas';
import { findHotspotById, HotspotItem, POSTER_DATA } from './data/posterData';

type A3Orientation = 'landscape' | 'portrait';

export default function App() {
  const [orientation, setOrientation] = useState<A3Orientation>('landscape');
  const [scale, setScale] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Active expanded box & smooth click ripple state
  const [openHotspotId, setOpenHotspotId] = useState<string | null>(null);
  const [returnFromSourceId, setReturnFromSourceId] = useState<string | null>(null);
  const [diveOrigin, setDiveOrigin] = useState({ x: 720, y: 450, accent: '#00BDEB' });
  const [sourceRect, setSourceRect] = useState<SourceBoxRect | null>(null);
  const [activeBurst, setActiveBurst] = useState<ClickBurstEvent | null>(null);

  const stageContainerRef = useRef<HTMLDivElement | null>(null);
  const lastClickedTriggerRef = useRef<HTMLButtonElement | null>(null);

  // True A3 aspect ratio dimensions (1.414 : 1)
  const posterWidth = orientation === 'landscape' ? 1640 : 1120;
  const posterHeight = orientation === 'landscape' ? 1160 : 1584;

  // Automatically scale the entire A3 sheet to fit the viewport without any scrolling
  useEffect(() => {
    const updateScale = () => {
      if (!stageContainerRef.current) return;
      const availW = stageContainerRef.current.clientWidth - 24;
      const availH = stageContainerRef.current.clientHeight - 20;
      const scaleX = availW / posterWidth;
      const scaleY = availH / posterHeight;
      setScale(Math.max(0.25, Math.min(scaleX, scaleY)));
    };

    updateScale();
    const observer = new ResizeObserver(updateScale);
    if (stageContainerRef.current) {
      observer.observe(stageContainerRef.current);
    }
    window.addEventListener('resize', updateScale);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateScale);
    };
  }, [posterWidth, posterHeight]);

  const activeHotspotLookup = useMemo(
    () => (openHotspotId ? findHotspotById(openHotspotId) : null),
    [openHotspotId]
  );

  // Zero-delay, 60fps smooth click handler
  const handleBoxClick = (
    hotspotId: string,
    e?: React.MouseEvent<HTMLButtonElement | HTMLDivElement>
  ) => {
    const found = findHotspotById(hotspotId);
    if (!found) return;
    const { hotspot } = found;

    let clickX = Math.round(window.innerWidth / 2);
    let clickY = Math.round(window.innerHeight / 2);
    let rect: SourceBoxRect = {
      left: clickX - 80,
      top: clickY - 28,
      width: 160,
      height: 56
    };

    if (e?.currentTarget) {
      if (e.currentTarget instanceof HTMLButtonElement) {
        lastClickedTriggerRef.current = e.currentTarget;
      }
      const domRect = e.currentTarget.getBoundingClientRect();
      clickX = Math.round(e.clientX || domRect.left + domRect.width / 2);
      clickY = Math.round(e.clientY || domRect.top + domRect.height / 2);
      rect = {
        left: Math.round(domRect.left),
        top: Math.round(domRect.top),
        width: Math.round(domRect.width),
        height: Math.round(domRect.height)
      };
    }

    setDiveOrigin({ x: clickX, y: clickY, accent: hotspot.accent });
    setSourceRect(rect);
    setReturnFromSourceId(null);

    // Open modal immediately on the same frame for silky-smooth spring expansion
    setOpenHotspotId(hotspot.id);

    // Trigger lightweight GPU ripple ring
    setActiveBurst({
      id: Date.now(),
      x: clickX,
      y: clickY,
      accent: hotspot.accent,
      label: hotspot.label,
      rect
    });

    setTimeout(() => {
      setActiveBurst(null);
    }, 480);
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
    }, 40);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const diveCanvasState: DiveCanvasState = {
    isDiving: Boolean(activeBurst),
    isDetailOpen: Boolean(openHotspotId),
    originX: diveOrigin.x,
    originY: diveOrigin.y,
    accent: diveOrigin.accent
  };

  // Helper to render a clickable Canva box / bullet item
  const renderMiniBox = (
    id: string,
    customLabel?: string,
    variant: 'light' | 'navy' | 'teal' | 'amber' | 'emerald' | 'rose' = 'light',
    subtitle?: string
  ) => {
    const found = findHotspotById(id);
    if (!found) return null;
    const h: HotspotItem = found.hotspot;

    const variantStyles = {
      light:
        'bg-sky-50/95 hover:bg-sky-100 border-sky-200/90 text-[#071F3D] shadow-sm',
      navy:
        'bg-[#0D2E59] hover:bg-[#133B70] border-sky-400/40 text-white shadow-sm',
      teal:
        'bg-teal-50/95 hover:bg-teal-100 border-teal-300 text-[#071F3D] shadow-sm',
      amber:
        'bg-amber-50/95 hover:bg-amber-100 border-amber-300 text-[#071F3D] shadow-sm',
      emerald:
        'bg-emerald-50/95 hover:bg-emerald-100 border-emerald-300 text-[#071F3D] shadow-sm',
      rose:
        'bg-rose-50/95 hover:bg-rose-100 border-rose-300 text-[#071F3D] shadow-sm'
    }[variant];

    return (
      <button
        key={id}
        type="button"
        data-testid={`hotspot-${id}`}
        onClick={(e) => handleBoxClick(id, e)}
        className={`canva-box-interactive group flex items-center justify-between gap-2 rounded-xl border px-3 py-2 text-left cursor-pointer ${variantStyles}`}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <span
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg"
            style={{
              backgroundColor: `${h.accent}22`,
              color: variant === 'navy' ? '#38BDF8' : h.accent
            }}
          >
            <HotspotIcon name={h.icon} className="w-4 h-4" />
          </span>
          <div className="min-w-0">
            <div className="text-[14px] font-extrabold leading-snug truncate">
              {customLabel || h.label}
            </div>
            {subtitle && (
              <div
                className={`text-[12px] font-medium leading-snug truncate mt-0.5 ${
                  variant === 'navy' ? 'text-sky-200/90' : 'text-slate-600'
                }`}
              >
                {subtitle}
              </div>
            )}
          </div>
        </div>
        <span className="shrink-0 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-black/5 text-[11px] font-black opacity-70 group-hover:opacity-100 group-hover:bg-sky-500 group-hover:text-white transition">
          ↗
        </span>
      </button>
    );
  };

  return (
    <div className="relative flex flex-col w-screen h-screen overflow-hidden select-none bg-[#071324]">
      {/* Ambient Background Constellation Behind the A3 Sheet */}
      <WorldCanvas
        scrollProgress={0.25}
        activeChapterAccent={diveOrigin.accent}
        diveState={diveCanvasState}
      />

      {/* Lightweight 60fps Click Ripple & Sparkle Burst */}
      <ClickTransitionFX activeBurst={activeBurst} />

      {/* =====================================================================
          CANVA-STYLE TOP BAR (No-Print)
         ===================================================================== */}
      <header className="no-print relative z-20 flex items-center justify-between border-b border-white/10 bg-slate-950/90 px-4 py-2 text-slate-200 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-teal-500 font-black text-slate-950 text-xs shadow">
            A3
          </span>
          <div className="flex items-center gap-2">
            <span className="text-sm font-extrabold text-white">
              Page 1 — Cogniva Interactive A3 Poster (CC0007)
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick Category Jump Pills in Header */}
          <div className="hidden xl:flex items-center gap-1.5 mr-2">
            <button
              type="button"
              onClick={(e) => handleBoxClick('1.1', e)}
              className="rounded-lg bg-white/5 hover:bg-white/15 px-2.5 py-1 text-xs font-bold text-slate-200 transition cursor-pointer"
            >
              1. Problem
            </button>
            <button
              type="button"
              onClick={(e) => handleBoxClick('2.3', e)}
              className="rounded-lg bg-white/5 hover:bg-white/15 px-2.5 py-1 text-xs font-bold text-teal-300 transition cursor-pointer"
            >
              2. Solution &amp; Games
            </button>
            <button
              type="button"
              onClick={(e) => handleBoxClick('3.1', e)}
              className="rounded-lg bg-white/5 hover:bg-white/15 px-2.5 py-1 text-xs font-bold text-sky-300 transition cursor-pointer"
            >
              3. Three Lenses
            </button>
            <button
              type="button"
              onClick={(e) => handleBoxClick('4.1', e)}
              className="rounded-lg bg-white/5 hover:bg-white/15 px-2.5 py-1 text-xs font-bold text-emerald-300 transition cursor-pointer"
            >
              4. Advantages
            </button>
            <button
              type="button"
              onClick={(e) => handleBoxClick('5.1', e)}
              className="rounded-lg bg-white/5 hover:bg-white/15 px-2.5 py-1 text-xs font-bold text-rose-300 transition cursor-pointer"
            >
              5. Limitations
            </button>
          </div>

          {/* A3 Format Switcher: Wide A3 vs Canva Portrait A3 */}
          <div
            className="inline-flex rounded-xl border border-white/15 bg-slate-900 p-0.5"
            role="group"
            aria-label="A3 orientation mode"
          >
            <button
              type="button"
              onClick={() => setOrientation('landscape')}
              className={`rounded-lg px-2.5 py-1 text-xs font-bold transition cursor-pointer ${
                orientation === 'landscape'
                  ? 'bg-cyan-400 text-slate-950 shadow'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              A3 Wide
            </button>
            <button
              type="button"
              onClick={() => setOrientation('portrait')}
              className={`rounded-lg px-2.5 py-1 text-xs font-bold transition cursor-pointer ${
                orientation === 'portrait'
                  ? 'bg-cyan-400 text-slate-950 shadow'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Canva A3 Portrait
            </button>
          </div>

          <button
            type="button"
            onClick={(e) => handleBoxClick('9.1', e)}
            className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-sky-400/40 bg-sky-400/15 px-3 py-1.5 text-xs font-bold text-sky-200 hover:bg-sky-400 hover:text-slate-950 transition cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>18 Sources</span>
          </button>

          <button
            type="button"
            onClick={() => window.print()}
            className="hidden md:inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-slate-900 px-2.5 py-1.5 text-xs font-bold text-slate-200 hover:bg-slate-800 transition cursor-pointer"
            title="Print Single-Page A3 Poster"
          >
            <Printer className="w-3.5 h-3.5 text-cyan-300" />
            <span>Print A3</span>
          </button>

          <button
            type="button"
            onClick={toggleFullscreen}
            aria-label="Toggle fullscreen"
            className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-slate-900 p-1.5 text-slate-200 hover:bg-slate-800 transition cursor-pointer"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* =====================================================================
          SINGLE-SCREEN PROPORTIONAL A3 STAGE (Zero Scrolling Needed)
         ===================================================================== */}
      <main
        ref={stageContainerRef}
        className="relative z-10 flex-1 flex items-center justify-center overflow-hidden p-2"
      >
        <div
          id="canva-a3-sheet"
          style={{
            width: `${posterWidth}px`,
            height: `${posterHeight}px`,
            transform: `scale(${scale * (openHotspotId ? 0.985 : 1)})`,
            transformOrigin: 'center center',
            transition: 'transform 320ms cubic-bezier(0.22, 1, 0.36, 1), opacity 260ms ease',
            willChange: 'transform'
          }}
          className={`relative flex flex-col justify-between rounded-[22px] bg-[#DEF2F4] text-[#071F3D] shadow-[0_25px_90px_rgba(0,0,0,0.65)] ring-4 ring-white/40 overflow-hidden p-5 ${
            openHotspotId ? 'opacity-80' : 'opacity-100'
          }`}
        >
          {/* =================================================================
              TOP HERO BANNER (Original Image A + Interactive Game Callouts)
             ================================================================= */}
          <div
            className={`relative w-full overflow-hidden rounded-2xl border-2 border-white shadow-md shrink-0 ${
              orientation === 'landscape' ? 'h-[190px]' : 'h-[230px]'
            }`}
          >
            <img
              src="/assets/aistudio/image_7924f9f4.png"
              alt="cogniva. Empowering Minds. Enriching Lives. Gamified & AI-Assisted Cognitive Rehabilitation"
              className="w-full h-full object-cover object-center"
            />

            <div className="absolute top-3 left-3 flex items-center gap-2 rounded-full bg-[#071F3D]/90 border border-cyan-300/50 px-3.5 py-1 text-[13px] font-extrabold uppercase tracking-wider text-cyan-200 backdrop-blur-md shadow">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>NTU CC0007 · Gamified &amp; AI-Assisted Cognitive Rehabilitation</span>
            </div>

            <div className="absolute bottom-2.5 left-3 right-3 flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-1.5 rounded-xl bg-[#071F3D]/85 border border-white/20 px-3 py-1 text-[12.5px] font-bold text-white backdrop-blur-md">
                <span className="text-cyan-300 font-black">Team:</span>
                <span>{POSTER_DATA.hero.team.join(' · ')}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={(e) => handleBoxClick('2.3', e)}
                  className="canva-box-interactive inline-flex items-center gap-1.5 rounded-xl bg-amber-400 px-3 py-1.5 text-[13px] font-black text-slate-950 shadow-md cursor-pointer"
                >
                  <Gamepad2 className="w-4 h-4" />
                  <span>Play Mahjong Test Game</span>
                </button>
                <button
                  type="button"
                  onClick={(e) => handleBoxClick('2.4', e)}
                  className="canva-box-interactive inline-flex items-center gap-1.5 rounded-xl bg-cyan-400 px-3 py-1.5 text-[13px] font-black text-slate-950 shadow-md cursor-pointer"
                >
                  <Eye className="w-4 h-4" />
                  <span>Play Find the Differences</span>
                </button>
              </div>
            </div>
          </div>

          {/* =================================================================
              CATEGORY 1: PROBLEM STATEMENT (PROOF WHY)
              - Left White Canva Card: Focused Problem & Empirical Proof
              - Right Deep Navy Canva Card: Three Participation Barriers & Gap
             ================================================================= */}
          <div className="grid grid-cols-12 gap-3.5 my-2.5 shrink-0">
            {/* Left White Rounded Canva Card: Focused Problem */}
            <div className="col-span-7 rounded-[22px] bg-white border border-cyan-200/80 px-5 py-3.5 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-[21px] font-extrabold text-[#1E88E5] tracking-tight leading-snug">
                    01 · Focused Problem (Proof Why)
                  </h2>
                </div>
                <div className="text-[17px] font-extrabold text-[#071F3D] mt-0.5">
                  The struggle to keep going at home
                </div>
                <p className="text-[14.5px] font-medium text-slate-700 leading-snug mt-0.5">
                  Digital cognitive interventions show promise, but regular participation can be
                  difficult for older adults with early-stage dementia in Singapore (53,000 in 2020
                  → 80,000 by 2030).
                </p>
                <div className="h-[2px] w-full bg-[#1E88E5]/60 my-2 rounded-full" />
                <p className="text-[14px] font-bold text-[#1E88E5]">
                  Our focus: usability, motivation and personalisation in everyday routines.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2.5 mt-2.5">
                {renderMiniBox(
                  '1.1',
                  "1.1 Proof: Singapore's 53k → 80k Need",
                  'amber',
                  'GovTech (2026) & MOH (2023) projections'
                )}
                {renderMiniBox(
                  '1.2',
                  '1.2 Proof: 55 RCTs on Engagement',
                  'teal',
                  'Li et al. (2024) meta-analysis on adherence'
                )}
              </div>
            </div>

            {/* Right Deep Navy Rounded Canva Card: Three Participation Barriers */}
            <div className="col-span-5 rounded-[22px] bg-[#061F3E] text-white px-5 py-3.5 shadow-md flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-[20px] font-extrabold text-[#38BDF8] tracking-tight">
                    Three Participation Barriers
                  </h2>
                </div>

                <ul className="mt-1.5 space-y-1.5 text-[14px] leading-snug">
                  <li className="flex items-start gap-1.5">
                    <span className="text-cyan-400 font-black">•</span>
                    <div>
                      <span className="font-extrabold text-white">Usability: </span>
                      <span className="text-slate-200">
                        Confusing interfaces and instructions require extra time and help.
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-cyan-400 font-black">•</span>
                    <div>
                      <span className="font-extrabold text-white">Motivation: </span>
                      <span className="text-slate-200">
                        Interest may fade without warm feedback and familiar themes.
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-cyan-400 font-black">•</span>
                    <div>
                      <span className="font-extrabold text-white">Personalisation: </span>
                      <span className="text-slate-200">
                        One-size-fits-all activities may not suit individual abilities and needs.
                      </span>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-2.5">
                {renderMiniBox(
                  '1.3',
                  '1.3 Proof: Digital UX Barriers',
                  'navy',
                  'Contreras-Somoza (2021) & Kwek (2024)'
                )}
                {renderMiniBox(
                  '1.4',
                  '1.4 The Home Routine Gap ★',
                  'navy',
                  'Clare et al. (2023) independent home use'
                )}
              </div>
            </div>
          </div>

          {/* =================================================================
              MAIN CANVA A3 BODY: 3 COLUMNS
              - Col 1 (4 cols): CATEGORY 3 — INTERDISCIPLINARY LENSES (STEM, BIZ/GOV, SOCIAL SCIENCE)
              - Col 2 (4 cols): CATEGORY 4 — ADVANTAGES & CATEGORY 5 — POTENTIAL LIMITATIONS
              - Col 3 (4 cols): CATEGORY 2 — SOLUTION (INCLUDING THE TEST GAMES & IMAGE B)
             ================================================================= */}
          <div className="grid grid-cols-12 gap-3.5 flex-1 min-h-0">
            {/* ---------------------------------------------------------------
                COLUMN 1: CATEGORY 3 — 3 INTERDISCIPLINARY LENSES
               --------------------------------------------------------------- */}
            <div className="col-span-4 flex flex-col justify-between gap-2.5 min-h-0">
              <div className="flex items-center justify-between px-1">
                <h3 className="text-[17.5px] font-black tracking-wide uppercase text-[#071F3D]">
                  03 · INTERDISCIPLINARY LENSES
                </h3>
              </div>

              {/* STEM Card */}
              <div className="flex-1 rounded-[18px] bg-white border border-sky-200 px-4 py-2.5 shadow-sm flex flex-col justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#155EEF] text-white shadow">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[17.5px] font-black text-[#071F3D] leading-tight">STEM</h4>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-1.5 mt-1.5">
                  {renderMiniBox('3.1', '• Auto-Adjusting Game Difficulty (75–85%)', 'light')}
                  {renderMiniBox('3.2', '• On-Device Frustration Detection', 'light')}
                  {renderMiniBox('3.3', '• Personalized Game & Summary Engine', 'light')}
                </div>
              </div>

              {/* BIZ / GOV Card */}
              <div className="flex-1 rounded-[18px] bg-white border border-teal-200 px-4 py-2.5 shadow-sm flex flex-col justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#00A896] text-white shadow">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[17.5px] font-black text-[#071F3D] leading-tight">
                      BIZ / GOV
                    </h4>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-1.5 mt-1.5">
                  {renderMiniBox('3.4', "• Fits Singapore's Ageing Plans (MOH)", 'teal')}
                  {renderMiniBox('3.5', '• Follows Healthcare AI Rules (AIHGle 2.0)', 'teal')}
                  {renderMiniBox('3.6', '• Low-Cost & Built to Last (Web Delivery)', 'teal')}
                </div>
              </div>

              {/* SOCIAL SCIENCE Card */}
              <div className="flex-1 rounded-[18px] bg-white border border-sky-200 px-4 py-2.5 shadow-sm flex flex-col justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0284C7] text-white shadow">
                    <Heart className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[17.5px] font-black text-[#071F3D] leading-tight">
                      SOCIAL SCIENCE
                    </h4>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-1.5 mt-1.5">
                  {renderMiniBox('3.7', '• Zero-Friction Senior UX (One-Button)', 'light')}
                  {renderMiniBox('3.8', '• Culturally Grounded & Dignity-First', 'light')}
                  {renderMiniBox('3.9', '• Caregiver Partnership & Relief', 'light')}
                </div>
              </div>
            </div>

            {/* ---------------------------------------------------------------
                COLUMN 2: CATEGORY 4 — ADVANTAGES & CATEGORY 5 — POTENTIAL LIMITATIONS
               --------------------------------------------------------------- */}
            <div className="col-span-4 flex flex-col justify-between gap-3 min-h-0">
              {/* CATEGORY 4: ADVANTAGES */}
              <div className="flex-1 rounded-[20px] bg-white border-2 border-emerald-200 px-4 py-3 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500 text-white shadow">
                        <Award className="w-4 h-4" />
                      </span>
                      <div>
                        <h3 className="text-[17.5px] font-black uppercase text-[#071F3D] leading-tight">
                          04 · Advantages
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-2 my-auto">
                  {renderMiniBox(
                    '4.1',
                    '4.1 Sustained Intrinsic Motivation',
                    'emerald',
                    'No timers, penalties or leaderboards · 75–85% zone'
                  )}
                  {renderMiniBox(
                    '4.2',
                    '4.2 Lower Caregiver Burden',
                    'teal',
                    'On-demand AI spoken guide + brief weekly summaries'
                  )}
                  {renderMiniBox(
                    '4.3',
                    '4.3 Low Cost & Hardware-Free',
                    'light',
                    'Runs on existing family tablets/phones without VR gear'
                  )}
                  {renderMiniBox(
                    '4.4',
                    '4.4 Safe, Bounded & Transparent AI',
                    'amber',
                    'Non-diagnostic guardrails aligned with AIHGle 2.0'
                  )}
                </div>
              </div>

              {/* CATEGORY 5: POTENTIAL LIMITATIONS */}
              <div className="flex-1 rounded-[20px] bg-[#061F3E] text-white border-2 border-rose-400/35 px-4 py-3 shadow-md flex flex-col justify-between">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-rose-500 text-white shadow">
                      <AlertTriangle className="w-4 h-4" />
                    </span>
                    <div>
                      <h3 className="text-[17.5px] font-black uppercase text-rose-300 leading-tight">
                        05 · Potential Limitations
                      </h3>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => handleBoxClick('9.1', e)}
                    className="canva-box-interactive rounded-lg bg-amber-400 px-3 py-1 text-[12px] font-black text-slate-950 cursor-pointer"
                  >
                    18 Sources →
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-2 my-auto">
                  {renderMiniBox(
                    '5.1',
                    '5.1 Unvalidated Prototype Proposal ★',
                    'navy',
                    'Requires 20-week trial (12-wk + 8-wk follow-up)'
                  )}
                  {renderMiniBox(
                    '5.2',
                    '5.2 Initial Caregiver Setup Dependency',
                    'navy',
                    'Needs family or AAC help to upload initial photos'
                  )}
                  {renderMiniBox(
                    '5.3',
                    '5.3 Gameplay Signals ≠ Clinical Status',
                    'navy',
                    'Fatigue, glare or arthritis can affect tap speed'
                  )}
                  {renderMiniBox(
                    '5.4',
                    '5.4 Scope Limited to Early-Stage / MCI',
                    'navy',
                    'Cannot replace clinical therapy in advanced stages'
                  )}
                </div>
              </div>
            </div>

            {/* ---------------------------------------------------------------
                COLUMN 3: CATEGORY 2 — SOLUTION (INCLUDING THE TEST GAMES & IMAGE B)
               --------------------------------------------------------------- */}
            <div className="col-span-4 flex flex-col justify-between gap-2.5 min-h-0">
              <div className="relative flex-1 rounded-[20px] bg-white border-2 border-cyan-300 p-3 shadow-md flex flex-col justify-between overflow-hidden min-h-0">
                <div className="flex items-center justify-between px-1 mb-1.5 shrink-0">
                  <div>
                    <h3 className="text-[17px] font-black uppercase text-[#071F3D] leading-tight">
                      02 · Solution &amp; Playable Test Games
                    </h3>
                  </div>
                </div>

                {/* Top 2 Solution Core Pillar Boxes */}
                <div className="grid grid-cols-2 gap-1.5 mb-2 shrink-0">
                  {renderMiniBox('2.1', '2.1 AI Activity Guide', 'teal', "'Help me understand'")}
                  {renderMiniBox('2.2', '2.2 Adaptive Support', 'emerald', '75%–85% Comfort Band')}
                </div>

                {/* Original Image B Container with Clickable Callout Overlays */}
                <div className="relative flex-1 w-full rounded-xl overflow-hidden bg-[#EAF7FB] flex items-center justify-center min-h-0">
                  <img
                    src="/assets/aistudio/image_c956a4a3.png"
                    alt="Cogniva smartphone application mockup featuring Mahjong Matching, Find the Differences, Sequence Recall, Visual Search, Adaptive Support, and Brain Training Tools"
                    className="max-h-full max-w-full object-contain"
                  />

                  {/* Interactive Transparent Hotspot Overlays Mapped to Image B Callouts */}
                  {/* Top-Left: Mahjong Matching */}
                  <button
                    type="button"
                    onClick={(e) => handleBoxClick('2.3', e)}
                    title="Click to play Mahjong Matching Test Game"
                    className="absolute top-[14%] left-[4%] w-[24%] h-[36%] rounded-2xl border-2 border-transparent hover:border-teal-400 hover:bg-teal-400/15 transition cursor-pointer"
                  />
                  {/* Bottom-Left: Adaptive Support */}
                  <button
                    type="button"
                    onClick={(e) => handleBoxClick('2.2', e)}
                    title="Click to inspect Adaptive Support (75%–85% Band)"
                    className="absolute bottom-[6%] left-[4%] w-[24%] h-[36%] rounded-2xl border-2 border-transparent hover:border-cyan-400 hover:bg-cyan-400/15 transition cursor-pointer"
                  />
                  {/* Top-Right: Find the Differences */}
                  <button
                    type="button"
                    onClick={(e) => handleBoxClick('2.4', e)}
                    title="Click to play Find the Differences Test Game"
                    className="absolute top-[6%] right-[4%] w-[26%] h-[34%] rounded-2xl border-2 border-transparent hover:border-sky-400 hover:bg-sky-400/15 transition cursor-pointer"
                  />
                  {/* Middle-Right: Sequence Recall / Question of the Day */}
                  <button
                    type="button"
                    onClick={(e) => handleBoxClick('2.6', e)}
                    title="Click to play Question of the Day Test Game"
                    className="absolute top-[43%] right-[4%] w-[26%] h-[25%] rounded-2xl border-2 border-transparent hover:border-amber-400 hover:bg-amber-400/15 transition cursor-pointer"
                  />
                  {/* Bottom-Right: Brain Training Tools / Match Photos to Names */}
                  <button
                    type="button"
                    onClick={(e) => handleBoxClick('2.5', e)}
                    title="Click to play Match Photos to Names Test Game"
                    className="absolute bottom-[4%] right-[4%] w-[26%] h-[26%] rounded-2xl border-2 border-transparent hover:border-purple-400 hover:bg-purple-400/15 transition cursor-pointer"
                  />
                </div>

                {/* Clickable Grid for the 5 Playable Test Games */}
                <div className="mt-2 pt-2 border-t border-cyan-100 shrink-0">
                  <div className="grid grid-cols-2 gap-1.5">
                    {renderMiniBox('2.3', 'Game 1: Mahjong Matching ★', 'amber')}
                    {renderMiniBox('2.4', 'Game 2: Find Differences ★', 'teal')}
                    {renderMiniBox('2.5', 'Game 3: Photo to Names ★', 'light')}
                    {renderMiniBox('2.6', 'Game 4: Question of Day ★', 'light')}
                  </div>
                  <div className="mt-1.5">
                    {renderMiniBox(
                      '2.7',
                      'Game 5: Familiar Everyday Sounds (Audio Demo) ★',
                      'teal'
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* =====================================================================
          EXPANDED DETAIL SCENE MODAL (Ultra-Smooth 60fps Spring Transition)
         ===================================================================== */}
      <AnimatePresence>
        {activeHotspotLookup && (
          <DetailSceneModal
            key="detail-scene-modal"
            hotspot={activeHotspotLookup.hotspot}
            chapter={activeHotspotLookup.chapter}
            prevHotspot={activeHotspotLookup.prevHotspot}
            nextHotspot={activeHotspotLookup.nextHotspot}
            originX={diveOrigin.x}
            originY={diveOrigin.y}
            sourceRect={sourceRect}
            returnFromSourceHotspotId={returnFromSourceId}
            onClose={handleCloseDetailModal}
            onSelectHotspot={handleSelectHotspotInsideModal}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
