import React, { useEffect, useRef } from 'react';

export interface DiveCanvasState {
  isDiving: boolean;
  isDetailOpen: boolean;
  originX: number;
  originY: number;
  accent: string;
}

interface WorldCanvasProps {
  scrollProgress: number; // 0 to 1 across entire poster
  activeChapterAccent: string;
  diveState: DiveCanvasState;
}

interface StarParticle {
  x: number;
  y: number;
  z: number;
  radius: number;
  color: string;
  pulseOffset: number;
  isConstellationNode: boolean;
}

const PARTICLE_COLORS = ['#38BDF8', '#14B8A6', '#F59E0B', '#A855F7', '#FDE047', '#E2E8F0'];

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const clean = hex.replace('#', '');
  const num = parseInt(clean.length === 3 ? clean.replace(/(.)/g, '$1$1') : clean, 16);
  if (Number.isNaN(num)) return { r: 20, g: 184, b: 166 };
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255
  };
}

export const WorldCanvas: React.FC<WorldCanvasProps> = ({
  scrollProgress,
  activeChapterAccent,
  diveState
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const propsRef = useRef({ scrollProgress, activeChapterAccent, diveState });

  useEffect(() => {
    propsRef.current = { scrollProgress, activeChapterAccent, diveState };
  }, [scrollProgress, activeChapterAccent, diveState]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Create 3D memory constellation particles
    const count = prefersReducedMotion ? 55 : 110;
    const particles: StarParticle[] = Array.from({ length: count }, (_, i) => ({
      x: (Math.random() - 0.5) * 2400,
      y: (Math.random() - 0.5) * 1600,
      z: Math.random() * 1000 + 80,
      radius: i % 6 === 0 ? 3.2 : Math.random() * 1.8 + 0.9,
      color: PARTICLE_COLORS[i % PARTICLE_COLORS.length],
      pulseOffset: Math.random() * Math.PI * 2,
      isConstellationNode: i < 28
    }));

    let animId = 0;
    let time = 0;
    let smoothScroll = propsRef.current.scrollProgress;
    let warpSpeed = 0;

    const render = () => {
      time += prefersReducedMotion ? 0.004 : 0.016;
      const { scrollProgress: targetScroll, activeChapterAccent: chapHex, diveState: dive } =
        propsRef.current;

      smoothScroll += (targetScroll - smoothScroll) * 0.08;

      // Warp speed accelerates during a dive transition
      const targetWarp = dive.isDiving && !prefersReducedMotion ? 28 : 0.45;
      warpSpeed += (targetWarp - warpSpeed) * 0.12;

      const activeHex = dive.isDiving || dive.isDetailOpen ? dive.accent : chapHex;
      const rgb = hexToRgb(activeHex);

      // Deep midnight base fill
      ctx.fillStyle = '#06101E';
      ctx.fillRect(0, 0, width, height);

      // Focal center shifts toward clicked hotspot during dive
      const focalX = dive.isDiving
        ? width * 0.5 + (dive.originX - width * 0.5) * 0.65
        : width * 0.5 + Math.sin(smoothScroll * Math.PI * 2) * 80;
      const focalY = dive.isDiving
        ? height * 0.5 + (dive.originY - height * 0.5) * 0.65
        : height * 0.45 + Math.cos(smoothScroll * Math.PI * 2) * 50;

      // Atmospheric radial nebula glow
      const radial = ctx.createRadialGradient(
        focalX,
        focalY,
        20,
        focalX,
        focalY,
        Math.max(width, height) * 0.72
      );
      radial.addColorStop(0, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${dive.isDiving ? 0.34 : 0.18})`);
      radial.addColorStop(0.45, `rgba(16, 45, 75, 0.28)`);
      radial.addColorStop(1, 'rgba(6, 16, 30, 0.96)');
      ctx.fillStyle = radial;
      ctx.fillRect(0, 0, width, height);

      // Project 3D points to 2D screen coordinates
      const projectedNodes: { sx: number; sy: number; alpha: number; color: string }[] = [];
      const fov = 520;

      for (const p of particles) {
        if (!prefersReducedMotion) {
          p.z -= warpSpeed + (targetScroll - smoothScroll) * 320;
          if (p.z < 40) p.z += 1000;
          if (p.z > 1040) p.z -= 1000;
        }

        const scale = fov / p.z;
        const driftX = Math.sin(time + p.pulseOffset) * 14;
        const driftY = Math.cos(time * 0.8 + p.pulseOffset) * 14 - smoothScroll * 220;

        const sx = focalX + (p.x + driftX) * scale;
        const sy = focalY + (((p.y + driftY + 800) % 1600) - 800) * scale;

        if (sx < -60 || sx > width + 60 || sy < -60 || sy > height + 60) continue;

        const depthAlpha = Math.min(1, Math.max(0.12, (1040 - p.z) / 850));
        const pulse = 0.75 + 0.25 * Math.sin(time * 2.2 + p.pulseOffset);
        const alpha = depthAlpha * pulse;

        if (p.isConstellationNode) {
          projectedNodes.push({ sx, sy, alpha, color: p.color });
        }

        // Draw warp streak if diving
        if (warpSpeed > 3 && !prefersReducedMotion) {
          const prevScale = fov / (p.z + warpSpeed * 2.4);
          const px = focalX + (p.x + driftX) * prevScale;
          const py = focalY + (((p.y + driftY + 800) % 1600) - 800) * prevScale;
          ctx.strokeStyle = p.color;
          ctx.globalAlpha = alpha * 0.65;
          ctx.lineWidth = Math.max(1, p.radius * scale * 0.75);
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(sx, sy);
          ctx.stroke();
        }

        // Draw star/memory orb
        ctx.globalAlpha = alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(sx, sy, Math.max(0.9, p.radius * scale), 0, Math.PI * 2);
        ctx.fill();
      }

      // Connect nearby constellation nodes with delicate filaments
      ctx.lineWidth = 0.85;
      for (let i = 0; i < projectedNodes.length; i++) {
        for (let j = i + 1; j < projectedNodes.length; j++) {
          const a = projectedNodes[i];
          const b = projectedNodes[j];
          const dx = a.sx - b.sx;
          const dy = a.sy - b.sy;
          const dist = Math.hypot(dx, dy);
          if (dist < 165) {
            const lineAlpha = (1 - dist / 165) * 0.22 * Math.min(a.alpha, b.alpha);
            ctx.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${lineAlpha})`;
            ctx.globalAlpha = 1;
            ctx.beginPath();
            ctx.moveTo(a.sx, a.sy);
            ctx.lineTo(b.sx, b.sy);
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
};
