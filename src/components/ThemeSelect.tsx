"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

type ThemeOpt = "light" | "dark" | "system";

export default function ThemeSelect() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  // theme puede ser undefined en primer render; caemos en 'system'
  const current: ThemeOpt = (theme as ThemeOpt) ?? "system";

  return (
    <label className="inline-flex items-center gap-2 text-sm">
      <span className="muted">Tema</span>
      <select
        value={current}
        onChange={(e) => setTheme(e.target.value as ThemeOpt)}
        className="rounded-xl bg-transparent px-3 py-2 ring-1 transition focus:outline-none"
        style={{ borderColor: "transparent", boxShadow: "none", WebkitAppearance: "none" }}
      >
        <option value="light" className="bg-[var(--panel)] text-[var(--text)]">Light</option>
        <option value="dark" className="bg-[var(--panel)] text-[var(--text)]">Dark</option>
        <option value="system" className="bg-[var(--panel)] text-[var(--text)]">System</option>
      </select>
    </label>
  );
}
