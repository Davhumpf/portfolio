'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';

export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Evitar problemas de hidratación
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Configuración del canvas
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();

    // Caracteres Matrix - mix de japonés, binario y símbolos
    const matrixChars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789';
    const chars = matrixChars.split('');

    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = [];

    // Inicializar gotas con posiciones aleatorias
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * -100);
    }

    let lastTime = 0;
    const fps = 30;
    const interval = 1000 / fps;

    const draw = (currentTime: number) => {
      if (currentTime - lastTime < interval) {
        requestAnimationFrame(draw);
        return;
      }
      lastTime = currentTime;

      const isDark = resolvedTheme === 'dark';
      const isLight = resolvedTheme === 'light';

      // Fade effect suave para rastros largos
      if (isDark) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      } else if (isLight) {
        ctx.fillStyle = 'rgba(229, 231, 235, 0.05)'; // var(--bg-page) light
      } else {
        // system theme - detectar preferencia del sistema
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        ctx.fillStyle = prefersDark ? 'rgba(0, 0, 0, 0.05)' : 'rgba(229, 231, 235, 0.05)';
      }
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Color según el tema
      let mainColor: string;
      let glowColor: string;

      if (isDark) {
        mainColor = '#A78BFA'; // accent-2 dark - morado claro
        glowColor = '#7C3AED';
      } else if (isLight) {
        mainColor = '#7C3AED'; // accent light - violeta
        glowColor = '#A78BFA';
      } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        mainColor = prefersDark ? '#A78BFA' : '#7C3AED';
        glowColor = prefersDark ? '#7C3AED' : '#A78BFA';
      }

      ctx.font = `${fontSize}px monospace`;

      // Dibujar caracteres con efecto de brillo
      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Solo dibujar si está dentro del viewport
        if (y > 0 && y < canvas.height) {
          // Brillo sutil
          ctx.shadowBlur = 8;
          ctx.shadowColor = glowColor;

          // Carácter principal
          ctx.fillStyle = mainColor;
          ctx.fillText(char, x, y);

          // Resetear sombra
          ctx.shadowBlur = 0;
        }

        // Reiniciar gota si llega al final
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        // Avanzar gota
        drops[i]++;
      }

      requestAnimationFrame(draw);
    };

    // Iniciar animación
    const animationId = requestAnimationFrame(draw);

    // Manejar resize
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        setCanvasSize();
        const newColumns = Math.floor(canvas.width / fontSize);
        drops.length = newColumns;
        for (let i = 0; i < newColumns; i++) {
          if (drops[i] === undefined) {
            drops[i] = Math.floor(Math.random() * -100);
          }
        }
      }, 250);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, [mounted, resolvedTheme]);

  if (!mounted) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: 0,
        opacity: 0.7,
        width: '100vw',
        height: '100vh',
        maxWidth: '100vw',
        maxHeight: '100vh',
        display: 'block',
      }}
      aria-hidden="true"
    />
  );
}
