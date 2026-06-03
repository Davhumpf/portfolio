"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { ExternalLink, RotateCw } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface ProjectPreviewProps {
  title: string
  category: string
  description: string
  url: string
  technologies: string[]
}

export function ProjectPreview({ title, category, description, url, technologies }: ProjectPreviewProps) {
  const [refreshKey, setRefreshKey] = useState(0)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1)
  }

  return (
    <div className="group relative">
      {/* Refresh button - positioned outside container */}
      <button
        onClick={handleRefresh}
        className="absolute -right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-neutral-900 text-white/50 transition-all hover:border-violet-500/50 hover:bg-neutral-800 hover:text-violet-400"
        title="Refrescar preview"
      >
        <RotateCw className="h-4 w-4" />
      </button>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-all hover:border-violet-500/50">
        <div className="p-4 pb-0">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold tracking-wider text-violet-400">{category}</span>
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                </span>
                <span className="text-xs text-emerald-400">Live</span>
              </div>
            </div>
            <Link 
              href={url} 
              target="_blank" 
              className="flex items-center gap-2 text-white/50 hover:text-violet-400 transition-colors"
            >
              <span className="text-xs">Abrir proyecto</span>
              <ExternalLink className="h-4 w-4" />
            </Link>
          </div>
          <h3 className="text-lg font-bold mb-2">{title}</h3>
          <p className="text-sm text-white/60 leading-relaxed mb-3">{description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {technologies.map((tech) => (
              <Badge key={tech} variant="secondary" className="bg-white/10 text-white/70 border-white/10 text-xs">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
        
        {/* Scaled iframe preview */}
        <div className="relative overflow-hidden rounded-t-xl border-t border-white/10 bg-neutral-950" style={{ height: "280px" }}>
          <div className="absolute inset-0 origin-top-left scale-[0.4]" style={{ width: "250%", height: "250%" }}>
            <iframe
              key={refreshKey}
              ref={iframeRef}
              src={url}
              title={`${title} Preview`}
              className="h-full w-full"
              loading="lazy"
              sandbox="allow-scripts allow-same-origin"
            />
          </div>
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-neutral-950/30 to-transparent" />
        </div>
      </div>
    </div>
  )
}
