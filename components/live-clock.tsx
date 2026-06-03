"use client"

import { useEffect, useState } from "react"

type Props = {
  timeZone?: string
  className?: string
  showLiveIndicator?: boolean
}

export default function LiveClock({ timeZone = "America/Bogota", className = "", showLiveIndicator = true }: Props) {
  const [mounted, setMounted] = useState(false)
  const [now, setNow] = useState<Date>(new Date())

  useEffect(() => {
    setMounted(true)
    const id = setInterval(() => {
      setNow(new Date())
    }, 1000)
    return () => clearInterval(id)
  }, [])

  if (!mounted) {
    return (
      <div className={className}>
        <div className="flex items-center gap-2">
          {showLiveIndicator && (
            <span className="flex items-center gap-1.5 text-xs font-semibold text-purple-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-purple-500"></span>
              </span>
              LIVE
            </span>
          )}
          <span className="font-mono text-sm tabular-nums">--:--:--</span>
        </div>
      </div>
    )
  }

  const formatter = new Intl.DateTimeFormat("es-CO", {
    timeZone,
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  })

  const formatted = formatter.format(now)

  return (
    <div className={className}>
      <div className="flex items-center gap-2">
        {showLiveIndicator && (
          <span className="flex items-center gap-1.5 text-xs font-semibold text-purple-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-purple-500"></span>
            </span>
            LIVE
          </span>
        )}
        <span className="font-mono text-sm tabular-nums">{formatted}</span>
      </div>
    </div>
  )
}
