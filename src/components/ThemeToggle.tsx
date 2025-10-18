"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const current = theme === "system" ? `${systemTheme} (system)` : theme;

  return (
    <button
      className="btn-outline h-10"
      onClick={() =>
        setTheme(theme === "light" ? "dark" : theme === "dark" ? "system" : "light")
      }
      title="Cambia: light → dark → system"
    >
      {current}
    </button>
  );
}
