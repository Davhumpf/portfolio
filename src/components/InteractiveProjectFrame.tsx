"use client";

import { useEffect, useState } from "react";
import { ExternalLink, Globe, LoaderCircle, RefreshCcw } from "lucide-react";

type InteractiveProjectFrameProps = {
  title: string;
  url: string;
  openLabel: string;
  loadingLabel: string;
  loadingHint: string;
  fallbackLabel: string;
  retryLabel: string;
  frameLabel: string;
  className?: string;
  heightClassName?: string;
};

export default function InteractiveProjectFrame({
  title,
  url,
  openLabel,
  loadingLabel,
  loadingHint,
  fallbackLabel,
  retryLabel,
  frameLabel,
  className = "",
  heightClassName = "h-[320px] md:h-[380px]",
}: InteractiveProjectFrameProps) {
  const [frameKey, setFrameKey] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setShowFallback(false);

    const timeoutId = window.setTimeout(() => {
      setShowFallback(true);
    }, 6000);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [frameKey, url]);

  const refreshFrame = () => {
    setFrameKey((prev) => prev + 1);
  };

  return (
    <div
      className={`overflow-hidden rounded-2xl border ${className}`}
      style={{
        borderColor: "color-mix(in oklab, var(--border) 62%, transparent)",
        background: "color-mix(in oklab, var(--panel) 76%, transparent)",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      <div
        className="flex flex-wrap items-center justify-between gap-3 border-b px-3 py-2"
        style={{
          borderColor: "color-mix(in oklab, var(--border) 58%, transparent)",
          background: "color-mix(in oklab, var(--panel) 92%, transparent)",
        }}
      >
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <div className="flex items-center gap-1.5" aria-hidden>
            <span className="h-2.5 w-2.5 rounded-full bg-[#fb7185]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#fbbf24]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#34d399]" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-xs font-semibold" style={{ color: "var(--text-1)" }}>
              {title}
            </p>
            <p className="flex items-center gap-1 truncate text-[11px] muted">
              <Globe size={12} />
              {new URL(url).hostname}
            </p>
          </div>
        </div>

        <div className="flex w-full items-center justify-end gap-2 sm:w-auto">
          <button
            type="button"
            onClick={refreshFrame}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border transition hover:scale-[1.04]"
            style={{
              borderColor: "color-mix(in oklab, var(--border) 58%, transparent)",
              background: "color-mix(in oklab, var(--bg-card) 90%, transparent)",
            }}
            aria-label={retryLabel}
            title={retryLabel}
          >
            <RefreshCcw size={14} />
          </button>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition hover:scale-[1.04]"
            style={{
              borderColor: "color-mix(in oklab, var(--border) 58%, transparent)",
              background: "color-mix(in oklab, var(--bg-card) 90%, transparent)",
              color: "var(--text-1)",
            }}
          >
            <ExternalLink size={13} />
            {openLabel}
          </a>
        </div>
      </div>

      <div className={`relative ${heightClassName}`}>
        <iframe
          key={frameKey}
          src={url}
          title={frameLabel}
          className="h-full w-full"
          loading="eager"
          referrerPolicy="strict-origin-when-cross-origin"
          allow="clipboard-read; clipboard-write; fullscreen"
          sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox allow-modals allow-downloads allow-top-navigation-by-user-activation"
          onLoad={() => {
            setIsLoading(false);
            setShowFallback(false);
          }}
        />

        {(isLoading || showFallback) && (
          <div
            className="absolute inset-0 flex items-center justify-center p-4"
            style={{
              background: "linear-gradient(180deg, rgba(255,255,255,0.10), rgba(255,255,255,0.02))",
              backdropFilter: "blur(1.5px)",
            }}
          >
            <div
              className="max-w-sm rounded-2xl border px-4 py-4 text-center"
              style={{
                borderColor: "color-mix(in oklab, var(--border) 58%, transparent)",
                background: "color-mix(in oklab, var(--bg-card) 92%, transparent)",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <div
                className="mx-auto mb-2 inline-flex h-10 w-10 items-center justify-center rounded-full border"
                style={{ borderColor: "color-mix(in oklab, var(--accent) 40%, var(--border))" }}
              >
                <LoaderCircle
                  size={18}
                  className={isLoading ? "animate-spin" : ""}
                  style={{ color: "var(--accent)" }}
                />
              </div>
              <p className="text-sm font-semibold" style={{ color: "var(--text-1)" }}>
                {showFallback ? fallbackLabel : loadingLabel}
              </p>
              <p className="mt-1 text-xs leading-relaxed muted">{loadingHint}</p>
              <div className="mt-3 flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={refreshFrame}
                  className="rounded-full border px-3 py-1.5 text-xs font-semibold transition hover:scale-[1.04]"
                  style={{
                    borderColor: "color-mix(in oklab, var(--border) 58%, transparent)",
                    background: "color-mix(in oklab, var(--bg-card) 96%, transparent)",
                  }}
                >
                  {retryLabel}
                </button>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full px-3 py-1.5 text-xs font-semibold transition hover:scale-[1.04]"
                  style={{
                    background: "var(--accent)",
                    color: "#fff",
                  }}
                >
                  {openLabel}
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
