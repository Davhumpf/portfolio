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

    // Caracteres Matrix
    const matrixChars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
    const chars = matrixChars.split('');

    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = [];

    // Inicializar gotas - muchas empiezan visibles inmediatamente
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * canvas.height / fontSize);
    }

    let lastTime = 0;
    const fps = 24;
    const interval = 1000 / fps;

    const draw = (currentTime: number) => {
      if (currentTime - lastTime < interval) {
        requestAnimationFrame(draw);
        return;
      }
      lastTime = currentTime;

      const isDark = resolvedTheme !== 'light';

      // Fade effect MUY SUAVE para que las líneas sean más largas y visibles
      ctx.fillStyle = isDark
        ? 'rgba(28, 28, 30, 0.03)' // Borrado muy suave
        : 'rgba(255, 255, 255, 0.03)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Color brillante y totalmente opaco
      ctx.fillStyle = isDark
        ? '#A78BFA' // Morado brillante sólido
        : '#7C3AED'; // Morado sólido
      ctx.font = `bold ${fontSize}px monospace`;

      // Dibujar caracteres
      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(char, x, y);

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
            drops[i] = Math.floor(Math.random() * canvas.height / fontSize);
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

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: -1,
        opacity: 0.6,
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
