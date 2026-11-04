import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { SourceBoxRect } from './DetailSceneModal';

export interface ClickBurstEvent {
  id: number;
  x: number;
  y: number;
  accent: string;
  label: string;
  rect: SourceBoxRect;
}

interface ClickTransitionFXProps {
  activeBurst: ClickBurstEvent | null;
}

const PARTICLE_ANGLES = Array.from({ length: 10 }, (_, i) => (i * Math.PI * 2) / 10);

/**
 * Pure GPU-composited (transform + opacity only) click ripple & particle burst for 60fps smoothness.
 */
export const ClickTransitionFX: React.FC<ClickTransitionFXProps> = ({ activeBurst }) => {
  return (
    <AnimatePresence>
      {activeBurst && (
        <div
          key={activeBurst.id}
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[60] overflow-hidden"
        >
          {/* GPU-Accelerated Expanding Ripple Ring */}
          <motion.div
            initial={{
              scale: 0.1,
              opacity: 0.85
            }}
            animate={{
              scale: 2.8,
              opacity: 0
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.48, ease: [0.16, 1, 0.3, 1] }}
            style={{
              left: activeBurst.x - 90,
              top: activeBurst.y - 90,
              width: 180,
              height: 180,
              borderColor: activeBurst.accent,
              willChange: 'transform, opacity'
            }}
            className="fixed rounded-full border-[3px]"
          />

          {/* Subtle Radial Sparkles */}
          {PARTICLE_ANGLES.map((angle, idx) => {
            const dist = idx % 2 === 0 ? 110 : 70;
            return (
              <motion.span
                key={idx}
                initial={{
                  x: 0,
                  y: 0,
                  scale: 1,
                  opacity: 0.9
                }}
                animate={{
                  x: Math.cos(angle) * dist,
                  y: Math.sin(angle) * dist,
                  scale: 0.1,
                  opacity: 0
                }}
                transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  left: activeBurst.x - 4,
                  top: activeBurst.y - 4,
                  backgroundColor: idx % 2 === 0 ? activeBurst.accent : '#38BDF8',
                  willChange: 'transform, opacity'
                }}
                className="fixed h-2 w-2 rounded-full"
              />
            );
          })}
        </div>
      )}
    </AnimatePresence>
  );
};
