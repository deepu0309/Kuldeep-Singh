import React, { useEffect, useRef } from 'react';

const SYMBOLS = ["{", "}", ";", "/", "<", ">", "0", "1", "[]", "(", ")", "=>"];
const COLORS = [
  "rgba(109, 179, 63,", // Spring Green
  "rgba(248, 152, 32,", // Java Orange
  "rgba(0, 206, 201,", // Teal
  "rgba(107, 107, 133,"  // Muted
];

interface Particle {
  x: number;
  y: number;
  size: number;
  speed: number;
  drift: number;
  opacity: number;
  rot: number;
  rotSpeed: number;
  sym: string;
  col: string;
  pulse: number;
  pulseSpeed: number;
}

const SymbolRain: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    let particles: Particle[] = [];
    const count = 70;

    const createParticle = (isInitial = false): Particle => {
      const sym = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
      const col = COLORS[Math.floor(Math.random() * COLORS.length)];
      return {
        x: Math.random() * W,
        y: isInitial ? Math.random() * H : -20,
        size: Math.random() * 10 + 8,
        speed: Math.random() * 0.4 + 0.1,
        drift: (Math.random() - 0.5) * 0.2,
        opacity: Math.random() * 0.15 + 0.05,
        rot: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.005,
        sym,
        col,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.01 + 0.005,
      };
    };

    for (let i = 0; i < count; i++) {
      particles.push(createParticle(true));
    }

    const animate = () => {
      ctx.clearRect(0, 0, W, H);
      
      particles.forEach((p, i) => {
        p.pulse += p.pulseSpeed;
        const op = p.opacity + Math.sin(p.pulse) * 0.02;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.font = `bold ${p.size}px "JetBrains Mono", monospace`;
        ctx.fillStyle = `${p.col}${Math.min(op, 0.3)})`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(p.sym, 0, 0);
        ctx.restore();

        p.y += p.speed;
        p.x += p.drift;
        p.rot += p.rotSpeed;

        if (p.y > H + 20 || p.x < -20 || p.x > W + 20) {
          particles[i] = createParticle();
        }
      });

      requestAnimationFrame(animate);
    };

    const handleResize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
    };

    window.addEventListener('resize', handleResize);
    const animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-0"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default SymbolRain;
