'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
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

    // Caracteres Matrix: letras, números, binarios y símbolos
    const matrixChars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
    const chars = matrixChars.split('');

    // Configuración optimizada para bajo consumo
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = [];

    // Inicializar gotas con posiciones aleatorias
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100; // Empiezan arriba fuera de vista
    }

    let lastTime = 0;
    const fps = 20; // FPS bajo para reducir consumo de recursos
    const interval = 1000 / fps;

    const draw = (currentTime: number) => {
      if (currentTime - lastTime < interval) {
        requestAnimationFrame(draw);
        return;
      }
      lastTime = currentTime;

      // Fade effect - se adapta al tema
      const isDark = resolvedTheme === 'dark';
      ctx.fillStyle = isDark
        ? 'rgba(28, 28, 30, 0.05)' // Fondo oscuro para dark mode
        : 'rgba(229, 231, 235, 0.05)'; // Fondo claro para light mode
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Color del texto - morado adaptado al tema
      ctx.fillStyle = isDark
        ? 'rgba(167, 139, 250, 0.7)' // Morado brillante (#A78BFA) para dark mode
        : 'rgba(124, 58, 237, 0.4)'; // Morado (#7C3AED) para light mode
      ctx.font = `${fontSize}px monospace`;

      // Dibujar caracteres
      for (let i = 0; i < drops.length; i++) {
        // Dibuja más columnas para mayor visibilidad
        if (Math.random() > 0.2) {
          const char = chars[Math.floor(Math.random() * chars.length)];
          const x = i * fontSize;
          const y = drops[i] * fontSize;

          ctx.fillText(char, x, y);
        }

        // Reiniciar gota si llega al final
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.95) {
          drops[i] = 0;
        }

        // Avanzar gota
        drops[i]++;
      }

      requestAnimationFrame(draw);
    };

    // Iniciar animación
    const animationId = requestAnimationFrame(draw);

    // Manejar resize con debounce para optimización
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        setCanvasSize();
        // Recalcular columnas
        const newColumns = Math.floor(canvas.width / fontSize);
        drops.length = newColumns;
        for (let i = 0; i < newColumns; i++) {
          if (drops[i] === undefined) {
            drops[i] = Math.random() * -100;
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
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: -5,
        opacity: 1, // Opacidad completa, la visibilidad se controla con los colores RGBA
      }}
      aria-hidden="true"
    />
  );
}
