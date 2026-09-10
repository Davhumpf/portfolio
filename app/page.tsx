import Link from "next/link"
import Image from "next/image"
import { Github, Linkedin, Mail, Calendar, ExternalLink, Terminal, Monitor, Database, Wrench, Code2 } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { ProjectPreview } from "@/components/project-preview"
import { CertificatesGallery } from "@/components/certificates-gallery"
import { GithubProfilePreview } from "@/components/github-profile-preview"
import LiveClock from "@/components/live-clock"

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
    <div className={`glass-panel relative overflow-hidden rounded-3xl border border-white/10 dark:border-white/10 light:border-black/10 bg-neutral-900/60 dark:bg-neutral-900/60 ${className}`}>
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
    </div>
  )
}

export default function Page() {
  const certifications = [
    { name: "Networking Basics", cisco: "Networking_Basics.pdf", credly: "NetworkingBasics.pdf" },
    { name: "Networking Devices and Initial Configuration", cisco: "Networking_Devices_and_Initial_Configuration.pdf", credly: "NetworkingDevicesandBasicConfig.pdf" },
    { name: "Network Defense", cisco: "Network_Defense.pdf", credly: "NetworkDefense.pdf" },
    { name: "Junior Cybersecurity Analyst Career Path", cisco: "Junior_Cybersecurity_Analyst_Career_Path.pdf", credly: "JuniorCybersecurityAnalyst.pdf" },
    { name: "JavaScript Essentials 1", cisco: "JavaScript_Essentials_1.pdf", credly: "JavaScriptEssentials1.pdf" },
    { name: "JavaScript Essentials 2", cisco: "JavaScript_Essentials_2.pdf", credly: "JavaScriptEssentials2.pdf" },
    { name: "Endpoint Security", cisco: "Endpoint_Security_certificate.pdf", credly: "EndpointSecurity.pdf" },
    { name: "Digital Safety and Security Awareness", cisco: "Digital_Safety_and_Security_Awareness.pdf", credly: "DigitalSafetyandSecurityAwareness.pdf" },
    { name: "Cyber Threat Management", cisco: "Cyber_Threat_Management.pdf", credly: "CyberThreatManagement.pdf" },
    { name: "Cisco and Credly certificates", cisco: "Cisco_Grated.pdf", credly: "Credly_Grated_Certificated.pdf" },
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

  const blogPosts = [
    {
      project: "Moka · Gestión operativa",
      title: "Diseñar el flujo de pedidos antes que la interfaz",
      description: "En Moka, la pantalla gira alrededor de estados operativos reales: pedidos por mesa, mostrador, confirmación, preparación y entrega. El frontend debe hacer visible cada cambio sin convertir el panel en ruido.",
      takeaway: "Decisión: priorizar estado, contexto y acción en cada tarjeta.",
      stack: ["React", "Node.js", "Tiempo real"],
      type: "Caso de producto",
      url: "https://mokaos.vercel.app/",
    },
    {
      project: "LexMind Cloud · Documentos legales",
      title: "Convertir archivos dispersos en información consultable",
      description: "LexMind Cloud recibe PDF, Word, documentos escaneados y correos para procesarlos e indexarlos. El reto no es solo cargar archivos: es diseñar una entrada confiable para búsquedas y flujos legales posteriores.",
      takeaway: "Aprendizaje: la experiencia de carga también es parte de la arquitectura de datos.",
      stack: ["Next.js", "TypeScript", "Indexación"],
      type: "Arquitectura aplicada",
      url: "https://lex-mind-cloud.vercel.app/",
    },
    {
      project: "ProgreS.O.S. · Django académico",
      title: "Permisos y trazabilidad para proyectos académicos",
      description: "El sistema separa las capacidades de estudiantes y docentes: enviar, revisar, calificar, aprobar o rechazar. Comentarios, estados, métricas, reportes y una API REST convierten el seguimiento en un flujo auditable.",
      takeaway: "Principio: cada transición debe tener un rol, un estado y una evidencia.",
      stack: ["Django", "Django REST", "Bootstrap 5"],
      type: "Backend y seguridad",
      url: "https://github.com/Davhumpf/ProgreS.O.S.",
    },
    {
      project: "NovaHub · Comercio digital",
      title: "Una tienda no termina en el catálogo",
      description: "NovaHub plantea una experiencia de compra orientada a Colombia: catálogo, carrito y gestión de productos deben convivir con precios en COP y una navegación clara para reducir fricción hasta la decisión.",
      takeaway: "Enfoque: diseñar el producto alrededor del flujo de compra, no de una colección de pantallas.",
      stack: ["Next.js", "Tailwind CSS", "E-commerce"],
      type: "Producto digital",
      url: "https://novahub-app.vercel.app/",
    },
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

  return (
    <main className="portfolio-shell bg-neutral-950 dark:bg-neutral-950 text-white dark:text-white min-h-screen">
      {/* Theme Toggle - Fixed position */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      {/* HERO SECTION */}
      <section className="px-4 pt-4 pb-16 lg:pb-4">
        <div className="grid h-full grid-cols-1 gap-4 lg:grid-cols-[420px_1fr]">
          {/* LEFT: sticky sidebar */}
          <aside className="lg:sticky lg:top-4 lg:h-[calc(100svh-2rem)]">
            <div className="glass-panel relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-neutral-900/60 p-6 sm:p-8">
              {/* Texture background */}
              <div className="pointer-events-none absolute inset-0 opacity-[0.08] dot-grid-texture" aria-hidden="true" />
              <div>
                {/* Wordmark */}
                <div className="mb-8 flex items-center gap-2">
                  <div className="text-2xl font-extrabold tracking-tight">Davhumpf</div>
                  <div className="h-2 w-2 rounded-full bg-white/60" aria-hidden="true" />
                </div>

                {/* Headline */}
                <h1 className="text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl">
                  <span className="block">David Esteban</span>
                  <span className="block">Rodriguez Rump</span>
                </h1>

                <p className="mt-2 text-lg font-medium text-white/90">Software Developer Freelance</p>
                <p className="mt-1 text-sm text-white/50">Pasto, Nariño, Colombia</p>

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

              </div>
            </div>
          </aside>

          {/* RIGHT: Content sections */}
          <div className="space-y-4">
            {/* Profile Image Card */}
            <div className="glass-panel relative overflow-hidden rounded-3xl border border-white/10 bg-neutral-900/60 p-1">
              <div className="relative flex h-56 items-center justify-center overflow-hidden rounded-[1.35rem] bg-black photo-pattern sm:h-64 lg:h-72">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(167,139,250,0.2),transparent_52%)]" />
                <div className="relative h-32 w-32 overflow-hidden rounded-full border border-white/20 bg-black/30 shadow-2xl shadow-violet-950/50 sm:h-44 sm:w-44 lg:h-52 lg:w-52">
                <Image
                  src="/profile.png"
                  alt="David Esteban Rodriguez Rump"
                  fill
                  className="object-cover"
                  priority
                />
                </div>
              </div>
            </div>

            {/* About Me Section */}
            <CardWithBackground imageSrc="/images/project-1.webp">
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-400/15 text-violet-300">
                  <Code2 className="h-4 w-4" />
                </div>
                <h2 className="text-xl font-bold">Sobre mí</h2>
              </div>
              <div className="space-y-3 text-white/70 leading-relaxed">
                <p>
                  Soy desarrollador de software freelance desde Pasto, Nariño, Colombia. Diseño y construyo productos digitales que combinan interfaces claras, buen rendimiento y una base técnica preparada para crecer.
                </p>
                <p>
                  Mi trabajo se concentra en frontend y soluciones full-stack con React, Next.js, TypeScript y Node.js. Me interesa convertir necesidades reales en experiencias útiles, accesibles y consistentes, desde la idea inicial hasta su implementación.
                </p>
                <p>
                  También mantengo una formación activa en ciberseguridad, redes y arquitectura web, porque cada proyecto debe ser atractivo para las personas y confiable para quienes lo utilizan.
                </p>
              </div>
            </CardWithBackground>

            {/* Certifications Section */}
            <CardWithBackground imageSrc="/images/project-2.webp">
              <div className="mb-6 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
                  <Calendar className="h-4 w-4" />
                </div>
                <h2 className="text-xl font-bold">Certificaciones</h2>
              </div>
              <p className="mb-6 text-white/60">
                Formación reciente en redes, ciberseguridad y desarrollo con JavaScript.
              </p>
              <CertificatesGallery certifications={certifications} />
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
                  url="https://mokaos.vercel.app/"
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
                <GithubProfilePreview url="https://github.com/Davhumpf" />
              </CardWithBackground>

              {/* Blog */}
              <CardWithBackground imageSrc="/images/project-1.webp" className="h-full">
                <div className="mb-4 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-sm font-bold">B</div>
                  <div>
                    <h2 className="text-lg font-bold">Blog</h2>
                    <p className="text-xs text-white/50">Notas sobre proyectos, stack y aprendizaje</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {blogPosts.map((post) => (
                    <article key={post.title} className="glass-panel rounded-2xl border border-white/10 bg-white/5 p-4 transition-colors hover:border-violet-400/40 hover:bg-white/10">
                      <div className="mb-3 flex items-center justify-between gap-3">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-violet-300">{post.type}</span>
                        <a href={post.url} target="_blank" rel="noreferrer" className="text-xs text-white/40 transition-colors hover:text-white">
                          Ver proyecto
                        </a>
                      </div>
                      <p className="mb-1 text-xs font-medium text-white/50">{post.project}</p>
                      <h3 className="font-medium text-white/90">{post.title}</h3>
                      <p className="text-sm leading-relaxed text-white/60">{post.description}</p>
                      <p className="mt-3 border-l-2 border-violet-400/60 pl-3 text-xs leading-relaxed text-white/70">{post.takeaway}</p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {post.stack.map((technology) => (
                          <Badge key={technology} variant="secondary" className="border-white/10 bg-white/10 px-2 py-0.5 text-[10px] text-white/60">
                            {technology}
                          </Badge>
                        ))}
                      </div>
                    </article>
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
                  aria-label="WhatsApp personal"
                  title="WhatsApp personal"
                  className="group flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3 text-white/70 hover:bg-emerald-500/20 hover:text-emerald-400 transition-colors"
                >
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  <span className="text-xs font-medium sm:text-sm">Personal</span>
                </Link>
                {/* WhatsApp NovaHub */}
                <Link
                  href="https://wa.me/573027214125"
                  target="_blank"
                  aria-label="WhatsApp NovaHub"
                  title="WhatsApp NovaHub"
                  className="group flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3 text-white/70 hover:bg-violet-500/20 hover:text-violet-400 transition-colors"
                >
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  <span className="text-xs font-medium sm:text-sm">NovaHub</span>
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
          <span>by Davhumpf</span>
        </div>
      </footer>
    </main>
  )
}
