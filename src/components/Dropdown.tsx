"use client";
import { useEffect, useMemo, useRef, useState } from "react";

type Item = { value: string; label: string };

export default function Dropdown({
  value,
  items,
  onChange,
  ariaLabel,
  className = "",
}: {
  value: string;
  items: Item[];
  onChange: (v: string) => void;
  ariaLabel: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState<number>(() =>
    Math.max(0, items.findIndex((i) => i.value === value))
  );
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  const current = useMemo(
    () => items.find((i) => i.value === value) ?? items[0],
    [items, value]
  );

  // Cerrar con click fuera
  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (
        !btnRef.current?.contains(e.target as Node) &&
        !listRef.current?.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  // Nav teclado
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!open) {
      if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setOpen(true);
      }
      return;
    }
    if (e.key === "Escape") {
      setOpen(false);
      btnRef.current?.focus();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => (i + 1) % items.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => (i - 1 + items.length) % items.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const picked = items[activeIdx];
      if (picked) {
        onChange(picked.value);
        setOpen(false);
        btnRef.current?.focus();
      }
    }
  };

  return (
    <div className={`relative ${className}`} onKeyDown={onKeyDown}>
      <button
        ref={btnRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel}
        className="btn btn-ghost h-10 select-none gap-2"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="truncate">{current.label}</span>
        <svg
          className={`h-4 w-4 transition ${open ? "rotate-180" : ""}`}
          viewBox="0 0 20 20" fill="currentColor" aria-hidden
        >
          <path d="M5.25 7.5L10 12.25L14.75 7.5" stroke="currentColor" strokeWidth="1.7" fill="none" strokeLinecap="round" />
        </svg>
      </button>

      {open && (
        <div
          ref={listRef}
          role="listbox"
          tabIndex={-1}
          className="absolute right-0 z-50 mt-2 min-w-40 overflow-hidden rounded-2xl bg-[var(--panel)] shadow-xl ring-1"
          style={{ borderColor: "var(--ring)" }}
        >
          {items.map((it, i) => {
            const active = i === activeIdx;
            const selected = it.value === value;
            return (
              <button
                key={it.value}
                role="option"
                aria-selected={selected}
                className={`w-full cursor-pointer px-4 py-2.5 text-left text-sm transition
                  ${active ? "bg-[var(--accent)] text-slate-900" : "bg-transparent text-[var(--text)]"}
                  ${selected && !active ? "opacity-80" : ""}
                `}
                onMouseEnter={() => setActiveIdx(i)}
                onClick={() => {
                  onChange(it.value);
                  setOpen(false);
                  btnRef.current?.focus();
                }}
              >
                {it.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
