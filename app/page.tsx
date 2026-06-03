import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Github, Linkedin, Mail, MapPin, Calendar, ExternalLink, Terminal, Monitor, Database, Wrench, RotateCw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import DotGridShader from "@/components/DotGridShader"
import AnimatedHeading from "@/components/animated-heading"
import RevealOnView from "@/components/reveal-on-view"
import LiveClock from "@/components/live-clock"
import { ThemeToggle } from "@/components/theme-toggle"
import { ProjectPreview } from "@/components/project-preview"

// Background card component with image
function CardWithBackground({ 
  children, 
  imageSrc, 
  className = "" 
}: { 
  children: React.ReactNode
  imageSrc?: string
  className?: string 
}) {
  return (
    <RevealOnView className={`relative overflow-hidden rounded-3xl border border-white/10 dark:border-white/10 light:border-black/10 bg-neutral-900/60 dark:bg-neutral-900/60 ${className}`}>
      {imageSrc && (
        <div className="absolute inset-0">
          <Image
            src={imageSrc}
            alt=""
            fill
            className="object-cover opacity-10 dark:opacity-10 blur-sm"
          />
          <div className="absolute inset-0 bg-neutral-900/80 dark:bg-neutral-900/80" />
        </div>
      )}
      <div className="relative p-6 sm:p-8">
        {children}
      </div>
    </RevealOnView>
  )
}

export default function Page() {
  const timeline = [
    { year: "2019", event: "Primer contacto con la programacion" },
    { year: "2021", event: "Formacion tecnica y primeros proyectos personales" },
    { year: "2023", event: "Transicion universitaria y proyectos academicos" },
    { year: "2023-2025", event: "Nova Store: de idea a producto funcional" },
    { year: "2025", event: "Actualidad: Frontend Dev y Experiencia Interactiva" },
  ]

  const skills = {
    frontend: [
      { name: "Angular", icon: "A" },
      { name: "TypeScript", icon: "TS" },
      { name: "JavaScript", icon: "JS" },
      { name: "React", icon: "R" },
      { name: "Tailwind CSS", icon: "TW" },
      { name: "GSAP", icon: "GS" },
    ],
    backend: [
      { name: "Node.js", icon: "N" },
      { name: "NestJS", icon: "Ne" },
      { name: "Python", icon: "Py" },
    ],
    database: [
      { name: "MySQL", icon: "My" },
      { name: "Oracle", icon: "Or" },
    ],
    tools: [
      { name: "Docker", icon: "D" },
      { name: "Firebase", icon: "Fb" },
      { name: "Google Cloud", icon: "GC" },
      { name: "GitHub", icon: "Gh" },
      { name: "Vercel", icon: "V" },
      { name: "Vite", icon: "Vi" },
    ],
  }

  const openSourceRepos = [
    { name: "nova-store-page", tech: "TypeScript / Next.js", url: "https://github.com/Davhumpf/nova-store-page" },
    { name: "portfolio", tech: "TypeScript / Next.js", url: "https://github.com/Davhumpf/portfolio" },
    { name: "ProgreS.O.S.", tech: "Python", url: "https://github.com/Davhumpf/ProgreS.O.S." },
    { name: "gluter", tech: "Dart / Flutter", url: "https://github.com/Davhumpf/gluter" },
  ]

  const blogPosts = [
    "Solucionando errores de hidratacion en Next.js con next-themes.",
    "Animaciones GSAP sin romper layout ni accesibilidad.",
    "Sistema de themes estable en Next.js sin flash visual.",
    "Stack frontend 2025: decisiones tecnicas y trade-offs reales.",
  ]

  const talks = [
    { title: "Seminario Nacional de Ingenieria de Software", year: "2023", description: "Industria de software en Colombia" },
    { title: "Seminario Privado de Desarrollo Cali - Bogota", year: "2024", description: "Colaboracion tecnica entre equipos distribuidos" },
    { title: "Desarrollo Frontend y Ciberseguridad", year: "2025", description: "Buenas practicas de seguridad en aplicaciones web" },
  ]

  const setup = {
    hardware: [
      "Acer Nitro AN515-58",
      "Intel Core i7-12700H",
      "24 GB RAM DDR4",
      "SSD NVMe 1 TB",
      "NVIDIA RTX 3060",
    ],
    software: [
      "VS Code + Material Icons",
      "Figma",
      "GitHub Desktop + Git CLI",
      "Node.js + PNPM/Bun",
      "PowerShell + Windows Terminal",
    ],
  }

  const nowSection = [
    "Refactorizando mi sistema de componentes hacia una arquitectura mas limpia, escalable y basada en slots.",
    "Mejorando animaciones de entrada, interaccion y scroll con GSAP, equilibrando fluidez, rendimiento y accesibilidad.",
    "Estudiando patrones avanzados de UI, motion design y practicas WAI-ARIA para navegacion con teclado.",
    "Construyendo un UI kit modular personal como espacio de experimentacion visual y tecnica.",
    "Escribiendo un articulo sobre accesibilidad en menus, navegacion y gestion del foco.",
  ]

  return (
    <main className="bg-neutral-950 dark:bg-neutral-950 text-white dark:text-white min-h-screen">
      {/* Theme Toggle - Fixed position */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      {/* HERO SECTION */}
      <section className="px-4 pt-4 pb-16 lg:pb-4">
        <div className="grid h-full grid-cols-1 gap-4 lg:grid-cols-[420px_1fr]">
          {/* LEFT: sticky sidebar */}
          <aside className="lg:sticky lg:top-4 lg:h-[calc(100svh-2rem)]">
            <RevealOnView
              as="div"
              intensity="hero"
              className="relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-neutral-900/60 p-6 sm:p-8"
              staggerChildren
            >
              {/* Texture background */}
              <div className="pointer-events-none absolute inset-0 opacity-5 mix-blend-soft-light">
                <DotGridShader />
              </div>
              <div>
                {/* Wordmark */}
                <div className="mb-8 flex items-center gap-2">
                  <div className="text-2xl font-extrabold tracking-tight">DavRump</div>
                  <div className="h-2 w-2 rounded-full bg-white/60" aria-hidden="true" />
                </div>

                {/* Headline */}
                <AnimatedHeading
                  className="text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl"
                  lines={["David Esteban", "Rodriguez Rump"]}
                />

                <p className="mt-2 text-lg font-medium text-white/90">Software Developer Freelance</p>

                <p className="mt-4 max-w-[42ch] text-base text-white/70 leading-relaxed">
                  Desarrollador frontend y full-stack apasionado por crear experiencias digitales excepcionales. Me enfoco en construir aplicaciones web modernas, escalables y con gran atencion al detalle en UI/UX.
                </p>

                {/* Stats */}
                <div className="mt-6 flex flex-wrap gap-6">
                  <div>
                    <p className="text-xs font-semibold tracking-widest text-white/50">EXPERIENCIA ACTIVA</p>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold">2019</span>
                      <span className="text-white/50">-</span>
                      <LiveClock timeZone="America/Bogota" className="text-lg font-bold" />
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold tracking-widest text-white/50">PROYECTOS CLAVE</p>
                    <p className="text-lg font-bold">10+</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold tracking-widest text-white/50">ENFOQUE</p>
                    <p className="text-lg font-bold">UI + Producto</p>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Button asChild size="lg" className="rounded-full">
                    <Link href="mailto:vincho0528@gmail.com">
                      Contactar
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="rounded-full border-white/20 bg-white/5 hover:bg-white/10">
                    <Link href="#" target="_blank">
                      Ver CV
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Social links */}
              <div className="mt-8 flex items-center gap-4">
                <Link href="https://github.com/Davhumpf" target="_blank" className="text-white/50 hover:text-white transition-colors">
                  <Github className="h-5 w-5" />
                </Link>
                <Link href="https://www.linkedin.com/in/davhumpf/" target="_blank" className="text-white/50 hover:text-white transition-colors">
                  <Linkedin className="h-5 w-5" />
                </Link>
                <Link href="mailto:vincho0528@gmail.com" className="text-white/50 hover:text-white transition-colors">
                  <Mail className="h-5 w-5" />
                </Link>
              </div>
            </RevealOnView>
          </aside>

          {/* RIGHT: Content sections */}
          <div className="space-y-4">
            {/* Profile Image Card */}
            <RevealOnView
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-neutral-900/60 p-1"
            >
              <div className="relative flex aspect-[16/9] items-center justify-center overflow-hidden rounded-[1.35rem] bg-black">
                <video
                  className="absolute inset-0 h-full w-full object-cover opacity-70"
                  src="/images/311046.mov"
                  autoPlay
                  muted
                  loop
                  playsInline
                  aria-hidden="true"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-black/30" />
                <div className="relative h-40 w-40 overflow-hidden rounded-full border border-white/20 bg-black/30 shadow-2xl shadow-black/50 sm:h-56 sm:w-56 lg:h-64 lg:w-64">
                <Image
                  src="/profile.png"
                  alt="David Esteban Rodriguez Rump"
                  fill
                  className="object-cover"
                  priority
                />
                </div>
              </div>
            </RevealOnView>

            {/* About Me Section */}
            <CardWithBackground imageSrc="/images/project-1.webp">
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-sm font-bold">A</div>
                <h2 className="text-xl font-bold">Sobre mi</h2>
              </div>
              <p className="text-white/70 leading-relaxed">
                Como freelancer, combino desarrollo tecnico de alto nivel con un fuerte enfoque en el crecimiento personal, el aprendizaje continuo y la ejecucion de proyectos de calidad. Especializado en React, Next.js, TypeScript y animaciones avanzadas.
              </p>
            </CardWithBackground>

            {/* Timeline Section */}
            <CardWithBackground imageSrc="/images/project-2.webp">
              <div className="mb-6 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
                  <Calendar className="h-4 w-4" />
                </div>
                <h2 className="text-xl font-bold">Mi Trayectoria</h2>
              </div>
              <div className="space-y-4">
                {timeline.map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <span className="shrink-0 text-sm font-bold text-white/50 w-24">{item.year}</span>
                    <span className="text-white/80">{item.event}</span>
                  </div>
                ))}
              </div>
            </CardWithBackground>

            {/* Skills Section */}
            <CardWithBackground imageSrc="/images/project-3.webp">
              <h2 className="mb-6 text-xl font-bold">Stack Tecnico y Habilidades</h2>
              
              <div className="space-y-6">
                {/* Frontend */}
                <div>
                  <div className="mb-3 flex items-center gap-2">
                    <Monitor className="h-4 w-4 text-white/50" />
                    <span className="text-sm font-semibold text-white/50">FRONTEND</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skills.frontend.map((skill) => (
                      <Badge key={skill.name} variant="secondary" className="bg-white/10 text-white border-white/10 px-3 py-1.5">
                        <span className="mr-2 font-mono text-xs text-white/50">{skill.icon}</span>
                        {skill.name}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Backend */}
                <div>
                  <div className="mb-3 flex items-center gap-2">
                    <Terminal className="h-4 w-4 text-white/50" />
                    <span className="text-sm font-semibold text-white/50">BACKEND / FULLSTACK</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skills.backend.map((skill) => (
                      <Badge key={skill.name} variant="secondary" className="bg-white/10 text-white border-white/10 px-3 py-1.5">
                        <span className="mr-2 font-mono text-xs text-white/50">{skill.icon}</span>
                        {skill.name}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Database */}
                <div>
                  <div className="mb-3 flex items-center gap-2">
                    <Database className="h-4 w-4 text-white/50" />
                    <span className="text-sm font-semibold text-white/50">BASES DE DATOS</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skills.database.map((skill) => (
                      <Badge key={skill.name} variant="secondary" className="bg-white/10 text-white border-white/10 px-3 py-1.5">
                        <span className="mr-2 font-mono text-xs text-white/50">{skill.icon}</span>
                        {skill.name}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Tools */}
                <div>
                  <div className="mb-3 flex items-center gap-2">
                    <Wrench className="h-4 w-4 text-white/50" />
                    <span className="text-sm font-semibold text-white/50">HERRAMIENTAS Y OTROS</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skills.tools.map((skill) => (
                      <Badge key={skill.name} variant="secondary" className="bg-white/10 text-white border-white/10 px-3 py-1.5">
                        <span className="mr-2 font-mono text-xs text-white/50">{skill.icon}</span>
                        {skill.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardWithBackground>

            {/* Projects Section */}
            <CardWithBackground imageSrc="/images/project-5.webp">
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-sm font-bold">P</div>
                <h2 className="text-xl font-bold">Proyectos</h2>
              </div>
              <p className="text-white/50 mb-6">Productos con orientacion a impacto real y ejecucion tecnica consistente.</p>
              
              <div className="space-y-8 pr-6">
                <ProjectPreview
                  title="LexMind Cloud"
                  category="PLATAFORMA LEGAL"
                  description="Plataforma cloud para abogados. Gestion de casos, documentos y clientes con enfoque en productividad legal."
                  url="https://lex-mind-cloud.vercel.app/"
                  technologies={["Next.js", "TypeScript"]}
                />

                <ProjectPreview
                  title="Moka"
                  category="GESTOR DE VENTAS"
                  description="Gestor de ventas y pedidos para heladerias. Control de inventario, ordenes y reportes en tiempo real."
                  url="https://mokaapp.vercel.app/"
                  technologies={["React", "Node.js"]}
                />

                <ProjectPreview
                  title="NovaHub"
                  category="E-COMMERCE"
                  description="E-commerce personal. Tienda online con carrito, pagos y gestion de productos moderna y escalable."
                  url="https://novahub-app.vercel.app/"
                  technologies={["Next.js", "Tailwind"]}
                />
              </div>
            </CardWithBackground>

            {/* Open Source & Blog Grid */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* Open Source */}
              <CardWithBackground imageSrc="/images/project-6.webp" className="h-full">
                <div className="mb-4 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
                    <Github className="h-4 w-4" />
                  </div>
                  <h2 className="text-lg font-bold">Codigo abierto</h2>
                </div>
                <div className="space-y-3">
                  {openSourceRepos.map((repo) => (
                    <div key={repo.name} className="group">
                      <p className="font-medium">{repo.name}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-white/50">{repo.tech}</span>
                        <Link href={repo.url} target="_blank" className="text-xs text-white/50 hover:text-white transition-colors">
                          Ver repositorio
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </CardWithBackground>

              {/* Blog */}
              <CardWithBackground imageSrc="/images/project-1.webp" className="h-full">
                <div className="mb-4 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-sm font-bold">B</div>
                  <h2 className="text-lg font-bold">Blog</h2>
                </div>
                <div className="space-y-3">
                  {blogPosts.map((post, idx) => (
                    <p key={idx} className="text-sm text-white/70 leading-relaxed">{post}</p>
                  ))}
                </div>
              </CardWithBackground>
            </div>

            {/* Talks & Setup Grid */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* Talks */}
              <CardWithBackground imageSrc="/images/project-2.webp" className="h-full">
                <div className="mb-4 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-sm font-bold">C</div>
                  <h2 className="text-lg font-bold">Charlas & Workshops</h2>
                </div>
                <div className="space-y-4">
                  {talks.map((talk, idx) => (
                    <div key={idx}>
                      <p className="font-medium">{talk.title}</p>
                      <p className="text-xs text-white/50">{talk.year}</p>
                      <p className="text-sm text-white/60">{talk.description}</p>
                    </div>
                  ))}
                </div>
              </CardWithBackground>

              {/* Setup */}
              <CardWithBackground imageSrc="/images/project-3.webp" className="h-full">
                <div className="mb-4 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
                    <Monitor className="h-4 w-4" />
                  </div>
                  <h2 className="text-lg font-bold">Setup</h2>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="mb-2 text-xs font-semibold text-white/50">HARDWARE</p>
                    <div className="space-y-1">
                      {setup.hardware.map((item, idx) => (
                        <p key={idx} className="text-sm text-white/70">{item}</p>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="mb-2 text-xs font-semibold text-white/50">SOFTWARE</p>
                    <div className="space-y-1">
                      {setup.software.map((item, idx) => (
                        <p key={idx} className="text-sm text-white/70">{item}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </CardWithBackground>
            </div>

            {/* Now Section */}
            <CardWithBackground imageSrc="/images/project-4.webp">
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/20 text-violet-400 text-sm font-bold">A</div>
                <h2 className="text-xl font-bold">Ahora</h2>
              </div>
              <div className="space-y-3">
                {nowSection.map((item, idx) => (
                  <p key={idx} className="text-white/70 leading-relaxed">{item}</p>
                ))}
              </div>
            </CardWithBackground>

            {/* Contact Section */}
            <CardWithBackground imageSrc="/images/project-5.webp">
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
                  <Mail className="h-4 w-4" />
                </div>
                <h2 className="text-xl font-bold">Contactos</h2>
              </div>
              <div className="flex flex-wrap gap-4">
                {/* Gmail */}
                <Link
                  href="mailto:vincho0528@gmail.com"
                  className="group flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3 text-white/70 hover:bg-white/20 hover:text-white transition-colors"
                >
                  <Mail className="h-6 w-6" />
                  <span className="text-sm hidden sm:inline">vincho0528@gmail.com</span>
                </Link>
                {/* GitHub */}
                <Link
                  href="https://github.com/Davhumpf"
                  target="_blank"
                  className="group flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3 text-white/70 hover:bg-white/20 hover:text-white transition-colors"
                >
                  <Github className="h-6 w-6" />
                  <span className="text-sm hidden sm:inline">Davhumpf</span>
                </Link>
                {/* LinkedIn */}
                <Link
                  href="https://www.linkedin.com/in/davhumpf/"
                  target="_blank"
                  className="group flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3 text-white/70 hover:bg-white/20 hover:text-white transition-colors"
                >
                  <Linkedin className="h-6 w-6" />
                  <span className="text-sm hidden sm:inline">davhumpf</span>
                </Link>
                {/* WhatsApp Personal */}
                <Link
                  href="https://wa.me/573188656961"
                  target="_blank"
                  className="group flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3 text-white/70 hover:bg-emerald-500/20 hover:text-emerald-400 transition-colors"
                >
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  <span className="text-sm hidden sm:inline">Personal</span>
                </Link>
                {/* WhatsApp NovaHub */}
                <Link
                  href="https://wa.me/573027214125"
                  target="_blank"
                  className="group flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3 text-white/70 hover:bg-violet-500/20 hover:text-violet-400 transition-colors"
                >
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  <span className="text-sm hidden sm:inline">NovaHub</span>
                </Link>
              </div>
            </CardWithBackground>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 px-4 py-8">
        <div className="flex items-center justify-center gap-2 text-sm text-white/50">
          <span>Designed</span>
          <span className="text-red-500">&#9829;</span>
          <span>by DavRump</span>
        </div>
      </footer>
    </main>
  )
}
