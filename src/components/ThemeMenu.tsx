"use client";
import Dropdown from "./Dropdown";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

type ThemeOpt = "light" | "dark" | "system";

const THEMES = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System" },
];

export default function ThemeMenu() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <Dropdown
      ariaLabel="Cambiar tema"
      value={(theme as ThemeOpt) ?? "system"}
      items={THEMES}
      onChange={(v) => setTheme(v as ThemeOpt)}
    />
  );
}
