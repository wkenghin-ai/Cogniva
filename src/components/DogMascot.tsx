import React, { useState } from 'react';
import { Bell, Sparkles, Volume2 } from 'lucide-react';

export interface DogMascotProps {
  mode?: 'wave' | 'ping' | 'cheer' | 'idle';
  size?: 'sm' | 'md' | 'lg';
  speechText?: string;
  pingNotificationText?: string;
  onPingClick?: () => void;
  className?: string;
}

/**
 * Friendly Duolingo-style SVG cartoon dog mascot ("Kopi the Companion Pup").
 * Customization note: Edit colors in MASCOT_PALETTE below to tweak fur, collar, or badge colors.
 */
export const MASCOT_PALETTE = {
  furPrimary: '#F59E0B',     // Warm golden-amber coat
  furLight: '#FEF3C7',       // Cream muzzle, belly & paws
  furEar: '#B45309',         // Rich caramel floppy ears
  collar: '#14B8A6',         // Cogniva teal collar
  tagGold: '#FDE047',        // Bright gold heart/star tag
  noseDark: '#1E293B',       // Slate nose & eyes
  blush: '#FDA4AF'           // Soft rose cheek blush
};

export const DogMascot: React.FC<DogMascotProps> = ({
  mode = 'wave',
  size = 'md',
  speechText,
  pingNotificationText = "Good morning, Uncle Tan! Ready for 10 calm minutes of Mahjong or Familiar Sounds?",
  onPingClick,
  className = ''
}) => {
  const [showPingBubble, setShowPingBubble] = useState(mode === 'ping');
  const [isBarking, setIsBarking] = useState(false);

  const dimensions =
    size === 'sm' ? 'w-20 h-20' : size === 'lg' ? 'w-40 h-40' : 'w-28 h-28';

  const handleMascotClick = () => {
    setIsBarking(true);
    setShowPingBubble((prev) => !prev);
    if (onPingClick) onPingClick();
    setTimeout(() => setIsBarking(false), 700);
  };

  return (
    <div className={`relative inline-flex flex-col items-center select-none ${className}`}>
      {/* Interactive Notification / Speech Bubble */}
      {(speechText || showPingBubble) && (
        <div
          role="status"
          aria-live="polite"
          className="mb-3 max-w-xs sm:max-w-sm rounded-2xl border border-teal-400/40 bg-slate-900/95 px-4 py-3 text-left shadow-xl shadow-teal-950/50 backdrop-blur-md transition-all duration-300"
        >
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-300 mb-1">
            <Bell className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
            <span>Gentle Mascot Companion</span>
          </div>
          <p className="text-sm sm:text-base font-medium leading-snug text-slate-100">
            {speechText || pingNotificationText}
          </p>
        </div>
      )}

      {/* Clickable Mascot Stage */}
      <button
        type="button"
        onClick={handleMascotClick}
        aria-label="Interact with friendly companion dog mascot"
        className="group relative flex items-center justify-center rounded-full p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
      >
        {/* Ambient Halo */}
        <span
          className={`absolute inset-0 rounded-full transition-transform duration-500 ${
            mode === 'cheer'
              ? 'bg-amber-400/25 scale-110 animate-pulse'
              : 'bg-teal-400/15 group-hover:bg-teal-400/25 group-hover:scale-105'
          }`}
        />

        {/* Notification Ping Badge */}
        {(mode === 'ping' || mode === 'wave') && (
          <span
            title="Click to preview gentle reminder"
            className="absolute -top-1 -right-1 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-amber-400 text-slate-950 shadow-lg ring-4 ring-slate-950 transition-transform group-hover:scale-110"
          >
            {isBarking ? (
              <Volume2 className="h-4 w-4 animate-ping" />
            ) : (
              <Bell className="h-4 w-4 animate-wiggle" />
            )}
          </span>
        )}

        {mode === 'cheer' && (
          <span className="absolute -top-2 -left-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-400 text-slate-950 shadow-lg ring-4 ring-slate-950 animate-bounce">
            <Sparkles className="h-4 w-4" />
          </span>
        )}

        {/* Vector Dog Illustration */}
        <svg
          viewBox="0 0 160 160"
          className={`${dimensions} overflow-visible drop-shadow-[0_10px_20px_rgba(0,0,0,0.45)] transition-transform duration-300 ${
            mode === 'cheer' || isBarking ? '-translate-y-1.5 scale-105' : 'group-hover:-translate-y-1'
          }`}
          aria-hidden="true"
        >
          {/* Wagging Tail */}
          <g
            className="origin-[122px_115px] animate-[wag_1.4s_ease-in-out_infinite]"
            style={{ transformOrigin: '122px 115px' }}
          >
            <path
              d="M118 116 C140 105, 148 82, 134 74 C125 70, 118 90, 114 108 Z"
              fill={MASCOT_PALETTE.furPrimary}
              stroke="#78350F"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <circle cx="136" cy="77" r="6" fill={MASCOT_PALETTE.furLight} />
          </g>

          {/* Rounded Body */}
          <rect
            x="46"
            y="86"
            width="68"
            height="56"
            rx="28"
            fill={MASCOT_PALETTE.furPrimary}
            stroke="#78350F"
            strokeWidth="3"
          />

          {/* Cream Belly Patch */}
          <ellipse cx="80" cy="116" rx="22" ry="20" fill={MASCOT_PALETTE.furLight} />

          {/* Collar & Gold Companion Tag */}
          <path
            d="M52 92 Q80 104 108 92"
            fill="none"
            stroke={MASCOT_PALETTE.collar}
            strokeWidth="8"
            strokeLinecap="round"
          />
          <circle
            cx="80"
            cy="102"
            r="7"
            fill={MASCOT_PALETTE.tagGold}
            stroke="#78350F"
            strokeWidth="2.5"
          />

          {/* Left Resting Paw */}
          <ellipse
            cx="58"
            cy="138"
            rx="12"
            ry="9"
            fill={MASCOT_PALETTE.furLight}
            stroke="#78350F"
            strokeWidth="3"
          />
          {/* Right Resting Foot */}
          <ellipse
            cx="102"
            cy="138"
            rx="12"
            ry="9"
            fill={MASCOT_PALETTE.furLight}
            stroke="#78350F"
            strokeWidth="3"
          />

          {/* Waving / Cheering Front Paw */}
          <g
            style={{ transformOrigin: '48px 102px' }}
            className={
              mode === 'wave' || mode === 'cheer' || isBarking
                ? 'animate-[wavePaw_1.2s_ease-in-out_infinite]'
                : ''
            }
          >
            <path
              d="M48 102 C26 92, 20 72, 32 64 C42 58, 52 76, 54 96 Z"
              fill={MASCOT_PALETTE.furPrimary}
              stroke="#78350F"
              strokeWidth="3"
            />
            <circle
              cx="32"
              cy="68"
              r="9"
              fill={MASCOT_PALETTE.furLight}
              stroke="#78350F"
              strokeWidth="2.5"
            />
          </g>

          {/* Left Floppy Ear */}
          <path
            d="M44 42 C24 44, 20 76, 36 82 C46 84, 50 64, 48 48 Z"
            fill={MASCOT_PALETTE.furEar}
            stroke="#78350F"
            strokeWidth="3"
          />

          {/* Right Floppy Ear */}
          <path
            d="M116 42 C136 44, 140 76, 124 82 C114 84, 110 64, 112 48 Z"
            fill={MASCOT_PALETTE.furEar}
            stroke="#78350F"
            strokeWidth="3"
          />

          {/* Head */}
          <rect
            x="40"
            y="26"
            width="80"
            height="68"
            rx="34"
            fill={MASCOT_PALETTE.furPrimary}
            stroke="#78350F"
            strokeWidth="3"
          />

          {/* Cream Muzzle Patch */}
          <ellipse cx="80" cy="69" rx="25" ry="18" fill={MASCOT_PALETTE.furLight} />

          {/* Soft Cheek Blush */}
          <ellipse cx="52" cy="68" rx="7" ry="4.5" fill={MASCOT_PALETTE.blush} opacity="0.75" />
          <ellipse cx="108" cy="68" rx="7" ry="4.5" fill={MASCOT_PALETTE.blush} opacity="0.75" />

          {/* Friendly Eyes */}
          {mode === 'cheer' ? (
            <>
              {/* Happy Arcs when cheering */}
              <path
                d="M56 54 Q63 45 70 54"
                fill="none"
                stroke={MASCOT_PALETTE.noseDark}
                strokeWidth="4"
                strokeLinecap="round"
              />
              <path
                d="M90 54 Q97 45 104 54"
                fill="none"
                stroke={MASCOT_PALETTE.noseDark}
                strokeWidth="4"
                strokeLinecap="round"
              />
            </>
          ) : (
            <>
              <circle cx="63" cy="53" r="6.5" fill={MASCOT_PALETTE.noseDark} />
              <circle cx="61" cy="50.5" r="2.2" fill="#FFFFFF" />
              <circle cx="97" cy="53" r="6.5" fill={MASCOT_PALETTE.noseDark} />
              <circle cx="95" cy="50.5" r="2.2" fill="#FFFFFF" />
            </>
          )}

          {/* Eyebrows */}
          <path
            d="M55 41 Q63 37 69 41"
            fill="none"
            stroke="#78350F"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M91 41 Q97 37 105 41"
            fill="none"
            stroke="#78350F"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Nose */}
          <ellipse cx="80" cy="62" rx="8" ry="5.5" fill={MASCOT_PALETTE.noseDark} />
          <ellipse cx="78" cy="60.5" rx="2.5" ry="1.2" fill="#94A3B8" />

          {/* Smile & Happy Tongue */}
          <path
            d="M71 71 Q80 79 89 71"
            fill="none"
            stroke={MASCOT_PALETTE.noseDark}
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          <path
            d="M76 75 Q80 86 84 75 Z"
            fill="#FB7185"
            stroke={MASCOT_PALETTE.noseDark}
            strokeWidth="2"
          />
        </svg>
      </button>
    </div>
  );
};
