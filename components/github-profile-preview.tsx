import { ExternalLink, Github, Maximize2, GitBranch, MapPin } from "lucide-react"

type GithubProfilePreviewProps = {
  url: string
}

export function GithubProfilePreview({ url }: GithubProfilePreviewProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium">Davhumpf</p>
          <p className="text-xs text-white/50">Actividad, lenguajes y contribuciones</p>
        </div>
        <a href={url} target="_blank" rel="noreferrer" className="text-white/50 transition-colors hover:text-white">
          <ExternalLink className="h-4 w-4" />
          <span className="sr-only">Abrir perfil en GitHub</span>
        </a>
      </div>
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-neutral-950">
        <div className="flex items-center gap-1 border-b border-white/10 bg-white/5 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-red-400/80" />
          <span className="h-2 w-2 rounded-full bg-yellow-400/80" />
          <span className="h-2 w-2 rounded-full bg-green-400/80" />
          <span className="ml-2 text-[10px] text-white/40">github.com/Davhumpf</span>
        </div>
        <div className="flex items-center gap-3 p-4">
          <img
            src="https://github.com/Davhumpf.png?size=96"
            alt="Avatar de Davhumpf en GitHub"
            className="h-12 w-12 rounded-full border border-white/20"
          />
          <div>
            <p className="font-semibold text-white">Davhumpf</p>
            <p className="text-xs text-white/50">Software Developer · Colombia</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-px border-t border-white/10 bg-white/10">
          <div className="bg-neutral-950 p-3 text-center">
            <GitBranch className="mx-auto mb-1 h-4 w-4 text-violet-300" />
            <p className="text-xs text-white/50">Repos</p>
          </div>
          <div className="bg-neutral-950 p-3 text-center">
            <Github className="mx-auto mb-1 h-4 w-4 text-violet-300" />
            <p className="text-xs text-white/50">Código</p>
          </div>
          <div className="bg-neutral-950 p-3 text-center">
            <MapPin className="mx-auto mb-1 h-4 w-4 text-violet-300" />
            <p className="text-xs text-white/50">Colombia</p>
          </div>
        </div>
      </div>
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-neutral-950 p-3">
        <img
          src="https://ghchart.rshah.org/a78bfa/Davhumpf"
          alt="Gráfico de contribuciones de Davhumpf"
          className="h-auto w-full"
          loading="lazy"
        />
      </div>
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70 transition-colors hover:border-violet-400/50 hover:text-white"
      >
        <Github className="h-4 w-4" />
        Ver actividad completa en GitHub
        <Maximize2 className="h-3.5 w-3.5" />
      </a>
    </div>
  )
}
