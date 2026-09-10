'use client'

import * as React from "react"
import { ExternalLink, Maximize2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"

type Certification = {
  name: string
  cisco: string
  credly: string
}

type CertificateSource = "Cisco" | "Credly"

export function CertificatesGallery({ certifications }: { certifications: Certification[] }) {
  const [selected, setSelected] = React.useState<{
    name: string
    source: CertificateSource
    url: string
  } | null>(null)

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        {certifications.map((certification) => (
          <div key={certification.name} className="rounded-2xl border border-white/10 bg-white/5 p-3">
            <p className="mb-3 font-medium text-white/90">{certification.name}</p>
            <div className="grid grid-cols-2 gap-2">
              {(["Cisco", "Credly"] as const).map((source) => {
                const filename = source === "Cisco" ? certification.cisco : certification.credly
                const url = `/certificates/${source.toLowerCase()}/${filename}`

                return (
                  <button
                    key={source}
                    type="button"
                    onClick={() => setSelected({ name: certification.name, source, url })}
                    className="group relative overflow-hidden rounded-xl border border-white/10 bg-black/40 text-left transition-transform hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                    aria-label={`Abrir certificado ${certification.name} de ${source}`}
                  >
                    <iframe
                      src={`${url}#page=1&view=FitH`}
                      title={`${source}: ${certification.name}`}
                      className="pointer-events-none h-32 w-full bg-white transition-transform duration-300 group-hover:scale-105"
                    />
                    <span className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-black/75 px-2 py-1.5 text-xs text-white/80">
                      {source}
                      <Maximize2 className="h-3.5 w-3.5" />
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      <Dialog open={selected !== null} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="max-w-5xl border-white/10 bg-neutral-950 p-3 text-white sm:p-5">
          {selected && (
            <>
              <DialogTitle>{selected.name} - {selected.source}</DialogTitle>
              <DialogDescription className="text-white/60">
                Vista previa del certificado. También puedes abrir el PDF en una pestaña nueva.
              </DialogDescription>
              <iframe
                src={`${selected.url}#toolbar=1&navpanes=0`}
                title={`${selected.source}: ${selected.name}`}
                className="h-[70vh] min-h-[420px] w-full rounded-lg bg-white"
              />
              <a
                href={selected.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
              >
                Abrir PDF en una pestaña nueva <ExternalLink className="h-4 w-4" />
              </a>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
