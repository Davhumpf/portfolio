"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

/* ---------------- Types ---------------- */
export type Lang = "es" | "en" | "de";

/** Mensajes base del sitio */
type BaseMessages = {
  brand: string;
  about: string;
  projects: string;
  skills: string;
  contacts: string;
  // Hero
  hero_hello: string;
  hero_im: string;
  hero_role: string;
  hero_name: string;
  hero_tagline_1: string;
  hero_tagline_2: string;
  hero_tagline_3: string;
  // About
  about_title: string;
  about_sub: string;
  about_p1: string;
  about_p2: string;
  // Projects
  projects_title: string;
  projects_sub: string;
  proj_ui: string; proj_ui_desc: string;
  proj_motion: string; proj_motion_desc: string;
  proj_i18n: string; proj_i18n_desc: string;
  // Skills
  skills_title: string;
  skills_sub: string;
  skills_frontend: string;
  skills_quality: string;
  skills_tools: string;
  // Contacts
  contacts_title: string;
  contacts_sub: string;
  form_name: string; form_email: string; form_msg: string; form_send: string;
};

/** Mensajes extra (nuevas secciones del header) */
type ExtraMessages = {
  experience: string;   // "Experiencia"
  caseStudies: string;  // "Casos de estudio"
  talks: string;        // "Charlas & Workshops"
};

/** About section extras */
type AboutExtras = {
  about_section_title: string;
  about_techstack_title: string;
  about_techstack_subtitle: string;
};

/** Timeline */
type TimelineMessages = {
  timeline_title: string;
  timeline_subtitle: string;
  timeline_section_title: string;
  // 8 eventos
  timeline_event1_year: string;
  timeline_event1_title: string;
  timeline_event1_subtitle: string;
  timeline_event1_description: string;
  timeline_event2_year: string;
  timeline_event2_title: string;
  timeline_event2_subtitle: string;
  timeline_event2_description: string;
  timeline_event3_year: string;
  timeline_event3_title: string;
  timeline_event3_subtitle: string;
  timeline_event3_description: string;
  timeline_event3_detail1: string;
  timeline_event3_detail2: string;
  timeline_event3_detail3: string;
  timeline_event4_year: string;
  timeline_event4_title: string;
  timeline_event4_subtitle: string;
  timeline_event4_description: string;
  timeline_event5_year: string;
  timeline_event5_title: string;
  timeline_event5_subtitle: string;
  timeline_event5_description: string;
  timeline_event6_year: string;
  timeline_event6_title: string;
  timeline_event6_subtitle: string;
  timeline_event6_description: string;
  timeline_event6_detail1: string;
  timeline_event6_detail2: string;
  timeline_event7_year: string;
  timeline_event7_title: string;
  timeline_event7_subtitle: string;
  timeline_event7_description: string;
  timeline_event7_detail1: string;
  timeline_event7_detail2: string;
  timeline_event8_year: string;
  timeline_event8_title: string;
  timeline_event8_subtitle: string;
  timeline_event8_description: string;
};

/** Blog */
type BlogMessages = {
  blog_title: string;
  blog_subtitle: string;
  blog_article1_title: string;
  blog_article1_desc: string;
  blog_article2_title: string;
  blog_article2_desc: string;
};

/** Talks */
type TalksMessages = {
  talks_title: string;
  talks_subtitle: string;
  talks_item1: string;
  talks_item1_desc: string;
  talks_item2: string;
  talks_item2_desc: string;
};

/** Uses */
type UsesMessages = {
  uses_title: string;
  uses_subtitle: string;
  uses_hardware_title: string;
  uses_hardware_item1: string;
  uses_hardware_item2: string;
  uses_software_title: string;
  uses_software_item1: string;
  uses_software_item2: string;
};

/** Now */
type NowMessages = {
  now_title: string;
  now_subtitle: string;
  now_item1: string;
  now_item2: string;
  now_item3: string;
  now_item4: string;
  now_item5: string;

};

/** Case Studies */
type CaseStudiesMessages = {
  cases_title: string;
  cases_subtitle: string;
  cases_problem_label: string;
  cases_process_label: string;
  cases_impact_label: string;
  // 6 casos
  case1_title: string;
  case1_problem: string;
  case1_process: string;
  case1_impact: string;
  case2_title: string;
  case2_problem: string;
  case2_process: string;
  case2_impact: string;
  case3_title: string;
  case3_problem: string;
  case3_process: string;
  case3_impact: string;
  case4_title: string;
  case4_problem: string;
  case4_process: string;
  case4_impact: string;
  case5_title: string;
  case5_problem: string;
  case5_process: string;
  case5_impact: string;
  case6_title: string;
  case6_problem: string;
  case6_process: string;
  case6_impact: string;
};

/** Open Source */
type OpenSourceMessages = {
  opensource_title: string;
  opensource_subtitle: string;
  opensource_item1: string;
  opensource_item2: string;
};

type Messages = BaseMessages & ExtraMessages & AboutExtras & TimelineMessages & BlogMessages & TalksMessages & UsesMessages & NowMessages & CaseStudiesMessages & OpenSourceMessages;

/* ---------------- Diccionario ---------------- */
const messages: Record<Lang, Messages> = {
  es: {
    brand: "<DreamInCode />",
    about: "Sobre mi",
    projects: "Proyectos",
    skills: "Habilidades",
    contacts: "Contactos",

    hero_hello: "¡Hola!",
    hero_im: "Yo soy",
    hero_role: "Software Developer",
    hero_name: "David",
    hero_tagline_1: "Diseñando el futuro",
    hero_tagline_2: "del",
    hero_tagline_3: "software",

    about_title: "Sobre mi",
    about_sub: "UI & Frontend — enfoque en detalle y armonía diseño/función.",
    about_p1: "Me gusta construir interfaces limpias, accesibles y con microinteracciones sutiles. Trabajo con React/Next, TypeScript y GSAP.",
    about_p2: "Valoro la consistencia visual, el rendimiento y el cuidado por el usuario final. En este micro-portfolio iré agregando ejemplos y prácticas de UI.",

    projects_title: "Proyectos",
    projects_sub: "Muestras rápidas — luego enlazamos a repos o demos.",
    proj_ui: "DreamInCode UI",
    proj_ui_desc: "Componentes y patrones pastel/dark listos para producción.",
    proj_motion: "GSAP Lab",
    proj_motion_desc: "Microinteracciones y transiciones aplicadas a UI real.",
    proj_i18n: "i18n Starter",
    proj_i18n_desc: "Estructura mínima para sitios multilenguaje con Context.",

    skills_title: "Habilidades",
    skills_sub: "Stack principal y áreas donde más aporto.",
    skills_frontend: "Frontend",
    skills_quality: "Calidad",
    skills_tools: "Herramientas",

    contacts_title: "Contactos",
    contacts_sub: "¿Charlamos? Deja un mensaje o conecta por tus redes.",
    form_name: "Tu nombre",
    form_email: "Email",
    form_msg: "Mensaje",
    form_send: "Enviar",

    // Extras del Header
    experience: "Experiencia",
    caseStudies: "Casos de estudio",
    talks: "Charlas & Workshops",

    // About extras
    about_section_title: "Sobre mi",
    about_techstack_title: "Tech Stack",
    about_techstack_subtitle: "Herramientas y tecnologías que domino",

    // Timeline
    timeline_title: "Mi Trayectoria",
    timeline_subtitle: "Evolución profesional y técnica",
    timeline_section_title: "Mi Trayectoria",
    timeline_event1_year: "2019",
    timeline_event1_title: "Primer contacto con la programación",
    timeline_event1_subtitle: "Inicio autodidacta | HTML puro | Curiosidad técnica",
    timeline_event1_description: "Año previo a la pandemia. Estaba en noveno de colegio, emocionado por la idea de estudiar Ingeniería de Sistemas. Sin saberlo, ese entusiasmo fue el inicio de todo: comencé a aprender HTML desde cero, creando mis primeras páginas sin CSS, solo por el gusto de ver algo construido por mis propias manos. Fue mi primer acercamiento real al mundo digital, donde descubrí la satisfacción de convertir ideas en código.",
    timeline_event2_year: "2020",
    timeline_event2_title: "Primeros experimentos y el impulso de los videojuegos",
    timeline_event2_subtitle: "Java | Lógica de programación | Creatividad aplicada",
    timeline_event2_description: "Con más tiempo libre durante la pandemia, me lancé de lleno al aprendizaje con Java, mi primer lenguaje formal. Desarrollé pequeños proyectos y hasta creé un juego propio, que luego borré (pero marcó mi inicio en la programación interactiva). Los videojuegos se convirtieron en mi motivación: quería entender cómo se creaban, y soñaba con construir uno propio algún día.",
    timeline_event3_year: "2021",
    timeline_event3_title: "Formación técnica y primeros proyectos personales",
    timeline_event3_subtitle: "Platzi | Autodidacta | Desarrollo full-stack inicial",
    timeline_event3_description: "Ingresé a cursos técnicos en Platzi, donde aprendí desde los fundamentos de la web hasta conceptos avanzados de backend y frontend. Durante este tiempo desarrollé múltiples proyectos personales, pequeños pero significativos.",
    timeline_event3_detail1: "Una app de recordatorios simples",
    timeline_event3_detail2: "Un sistema para administrar cuentas de streaming",
    timeline_event3_detail3: "Una página de plantas dedicada a una persona especial",
    timeline_event4_year: "2022",
    timeline_event4_title: "Consolidación técnica y visión de producto",
    timeline_event4_subtitle: "Node.js / Python / MySQL / Docker / Cloud",
    timeline_event4_description: "Ya con bases más sólidas, comencé a comprender el ecosistema completo del desarrollo. Aprendí sobre servidores, APIs, bases de datos y despliegues, aplicando buenas prácticas con Docker y flujos de CI/CD. Empecé a ver el código no solo como algo funcional, sino como una herramienta para construir productos reales y escalables.",
    timeline_event5_year: "2023",
    timeline_event5_title: "Transición universitaria y proyectos académicos",
    timeline_event5_subtitle: "Matemática aplicada | Cálculo | Java / Python / Frontend avanzado",
    timeline_event5_description: "Al ingresar a la universidad, empecé a sentir que el conocimiento se transformaba en poder crear de verdad. Mi proyecto más destacado fue una calculadora de variables e integrales, desarrollada para mi clase de cálculo, que me mostró cómo la programación podía resolver problemas académicos reales. Ese mismo año nació Nova Store, inicialmente como un proyecto frontend personal… sin imaginar que se convertiría en mi plataforma insignia.",
    timeline_event6_year: "2023 - 2025",
    timeline_event6_title: "Nova Store: de idea a producto funcional",
    timeline_event6_subtitle: "React / Next.js / Tailwind / Node / Flutter / Cloud / GSAP",
    timeline_event6_description: "Nova Store comenzó como un e-commerce sencillo, pero con el tiempo lo expandí hacia un sistema semi-automatizado que combina la venta de productos digitales y físicos. Integré un backend propio, gestión de usuarios avanzada, panel de administración optimizado y sincronización con la nube. Incluso desarrollé una versión complementaria en Flutter, explorando la convergencia entre web y mobile.",
    timeline_event6_detail1: "Hoy, Nova Store genera ganancias tanto para mí como para otros usuarios sin necesidad de inversión directa.",
    timeline_event6_detail2: "Es un reflejo de mi evolución: de crear por curiosidad, a diseñar por propósito.",
    timeline_event7_year: "2025",
    timeline_event7_title: "Actualidad: Frontend Dev y Experiencia Interactiva",
    timeline_event7_subtitle: "React / Next.js / TypeScript / GSAP / Framer Motion / Tailwind / Supabase",
    timeline_event7_description: "Actualmente me dedico al desarrollo de interfaces modernas con un enfoque en animación, interacción y fluidez visual. Uso herramientas como GSAP, Framer Motion y Anime.js para crear experiencias inmersivas, dinámicas y naturales. Me apasiona que cada detalle tenga intención, que la navegación se sienta ligera y que la interfaz respire.",
    timeline_event7_detail1: "Una buena interfaz no solo se ve bien, se siente bien.",
    timeline_event7_detail2: "Cada transición, cada microinteracción, cada sombra es parte de una experiencia pensada para el usuario.",
    timeline_event8_year: "Visión a Futuro",
    timeline_event8_title: "Diseño interactivo y experiencias inmersivas",
    timeline_event8_subtitle: "Diseño interactivo | Realidad Virtual | Experiencias inmersivas",
    timeline_event8_description: "Mi meta a largo plazo es desarrollar páginas web con realidad virtual, donde el usuario pueda literalmente tocar la interfaz. Quiero fusionar diseño, tecnología y emoción para crear experiencias que no solo se vean o usen, sino que se vivan.",

    // Blog
    blog_title: "Blog",
    blog_subtitle: "Notas cortas, TIL y post-mortems.",
    blog_article1_title: "Accesibilidad en componentes de menú",
    blog_article1_desc: "Focus trap, roles y teclado.",
    blog_article2_title: "Motion con intención",
    blog_article2_desc: "GSAP + prefers-reduced-motion.",

    // Talks
    talks_title: "Charlas & Workshops",
    talks_subtitle: "Slides y grabaciones.",
    talks_item1: "Motion accesible",
    talks_item1_desc: "meetup React (slides + video).",
    talks_item2: "Design tokens",
    talks_item2_desc: "taller 90' (repo público).",

    // Uses
    uses_title: "Uses",
    uses_subtitle: "Mi setup de trabajo.",
    uses_hardware_title: "Hardware",
    uses_hardware_item1: "ThinkPad + 32GB RAM",
    uses_hardware_item2: "Monitor 27\" 1440p",
    uses_software_title: "Software",
    uses_software_item1: "VSCode, zsh, tmux",
    uses_software_item2: "Figma, Raycast",

    // Now
    now_title: "Now()",
    now_subtitle: "Qué hago este mes.",
    now_item1: "Refactorizando mi sistema de componentes hacia una arquitectura más limpia, escalable y basada en slots.",
    now_item2: "Mejorando animaciones de entrada, interacción y scroll con GSAP, equilibrando fluidez, rendimiento y accesibilidad.",
    now_item3: "Estudiando patrones avanzados de UI, motion design y prácticas WAI-ARIA para navegación con teclado.",
    now_item4: "Construyendo un UI kit modular personal como espacio de experimentación visual y técnica.",
    now_item5: "Escribiendo un artículo sobre accesibilidad en menús, navegación y gestión del foco.",


    // Case Studies
    cases_title: "Casos de Estudio",
    cases_subtitle: "Problema → Proceso → Impacto.",
    cases_problem_label: "Problema",
    cases_process_label: "Proceso",
    cases_impact_label: "Impacto",
    case1_title: "Nova Store — E-commerce híbrido inteligente",
    case1_problem: "Las pequeñas tiendas y creadores digitales necesitaban una plataforma sencilla para vender productos físicos y digitales sin depender de intermediarios.",
    case1_process: "Desarrollé una plataforma completa con React, Next.js, Tailwind y Node.js, integrando bases de datos en la nube con Supabase y Firebase. Añadí paneles de administración, gestión de usuarios avanzada, y animaciones con GSAP y Framer Motion.",
    case1_impact: "Reduje el tiempo de gestión en un 70%, aumenté la velocidad de carga, y generé un sistema semi-automatizado que permite a otros generar ingresos sin inversión inicial.",
    case2_title: "Miza — Asistente inteligente con IA emocional",
    case2_problem: "Los asistentes virtuales tradicionales ofrecen respuestas mecánicas y sin empatía, lo que reduce la conexión con el usuario.",
    case2_process: "Diseñé Miza, una asistente con enfoque psicológico y emocional, capaz de interactuar desde una app de escritorio o móvil. Combina IA conversacional y principios de psicología cognitiva, creando una experiencia más humana y adaptable al estado del usuario.",
    case2_impact: "Miza logra interacciones más naturales y empáticas, reduciendo la frustración del usuario y mejorando la retención en apps con soporte virtual. Es un proyecto que une tecnología y bienestar digital.",
    case3_title: "Itia — Inteligencia turística por visión computacional",
    case3_problem: "Varias zonas rurales y poco concurridas de Colombia carecen de herramientas tecnológicas que impulsen su turismo y visibilidad.",
    case3_process: "Desarrollé el proyecto Itia, un sistema IoT con cámaras y análisis de video en tiempo real, capaz de estudiar el flujo de personas y resaltar puntos de interés locales. Usa cloud computing y procesamiento de datos visuales para generar mapas de calor y reportes de atracción turística.",
    case3_impact: "Propone una forma sostenible de impulsar el turismo con tecnología, ayudando a comunidades a destacar su potencial sin alterar su entorno.",
    case4_title: "Calculadora de Integrales y Variables — Aplicación Académica",
    case4_problem: "Los estudiantes de cálculo perdían tiempo resolviendo integrales manualmente durante las clases.",
    case4_process: "Creé una app en Java con interfaz sencilla que ejecuta operaciones simbólicas y numéricas de forma automática.",
    case4_impact: "Reduje en más del 60% el tiempo de resolución de ejercicios, permitiendo centrarse en la interpretación matemática.",
    case5_title: "Design System — Estandarización visual multiplataforma",
    case5_problem: "Los proyectos que desarrollaba presentaban inconsistencias visuales y tiempos largos de diseño.",
    case5_process: "Construí un Design System modular con Tailwind y tokens reutilizables, incorporando modo oscuro y 26 componentes base.",
    case5_impact: "Reduje los tiempos de entrega en un 35% y logré coherencia visual total entre proyectos web y móviles.",
    case6_title: "Portfolio Personal — Experiencia inmersiva en movimiento",
    case6_problem: "Mi portafolio anterior no representaba mi enfoque creativo ni mi dominio en animación y UI.",
    case6_process: "Rediseñé toda la experiencia visual con React, Next.js, GSAP y Framer Motion, priorizando accesibilidad, velocidad y sensación de movimiento orgánico.",
    case6_impact: "Logré una experiencia de usuario fluida, viva y memorable, alineada con mi identidad como desarrollador de interfaces interactivas.",

    // Open Source
    opensource_title: "Open Source",
    opensource_subtitle: "PRs, issues y paquetes publicados.",
    opensource_item1: "Contribución a awesome-animations — ejemplo GSAP/ARIA.",
    opensource_item2: "Paquete @dreamincode/use-keypress — hook de accesibilidad.",
  },
  en: {
    brand: "<DreamInCode />",
    about: "About",
    projects: "Projects",
    skills: "Skills",
    contacts: "Contact",

    hero_hello: "Hello!",
    hero_im: "I am",
    hero_role: "Software Developer",
    hero_name: "David",
    hero_tagline_1: "Designing the future",
    hero_tagline_2: "of",
    hero_tagline_3: "software",

    about_title: "About me",
    about_sub: "UI & Frontend — detail-oriented, harmony between design & function.",
    about_p1: "I build clean, accessible interfaces with subtle micro-interactions. I work with React/Next, TypeScript and GSAP.",
    about_p2: "I care about visual consistency, performance and user delight. This micro-portfolio will grow with UI experiments.",

    projects_title: "Projects",
    projects_sub: "Quick samples — we'll link repos/demos soon.",
    proj_ui: "DreamInCode UI",
    proj_ui_desc: "Pastel/dark components & patterns ready for production.",
    proj_motion: "GSAP Lab",
    proj_motion_desc: "Micro-interactions & transitions applied to real UI.",
    proj_i18n: "i18n Starter",
    proj_i18n_desc: "Minimal multi-language structure using Context.",

    skills_title: "Skills",
    skills_sub: "Main stack and where I add the most value.",
    skills_frontend: "Frontend",
    skills_quality: "Quality",
    skills_tools: "Tools",

    contacts_title: "Contact",
    contacts_sub: "Let's talk! Send a message or connect.",
    form_name: "Your name",
    form_email: "Email",
    form_msg: "Message",
    form_send: "Send",

    // Extras del Header
    experience: "Experience",
    caseStudies: "Case studies",
    talks: "Talks & Workshops",

    // About extras
    about_section_title: "About me",
    about_techstack_title: "Tech Stack",
    about_techstack_subtitle: "Tools and technologies I master",

    // Timeline
    timeline_title: "My Journey",
    timeline_subtitle: "Professional and technical evolution",
    timeline_section_title: "My Journey",
    timeline_event1_year: "2019",
    timeline_event1_title: "First contact with programming",
    timeline_event1_subtitle: "Self-taught start | Pure HTML | Technical curiosity",
    timeline_event1_description: "Year before the pandemic. I was in ninth grade, excited about studying Systems Engineering. Unknowingly, that enthusiasm was the beginning of everything: I started learning HTML from scratch, creating my first pages without CSS, just for the pleasure of seeing something built by my own hands. It was my first real approach to the digital world, where I discovered the satisfaction of turning ideas into code.",
    timeline_event2_year: "2020",
    timeline_event2_title: "First experiments and the drive from videogames",
    timeline_event2_subtitle: "Java | Programming logic | Applied creativity",
    timeline_event2_description: "With more free time during the pandemic, I dove headfirst into learning with Java, my first formal language. I developed small projects and even created my own game, which I later deleted (but it marked my beginning in interactive programming). Videogames became my motivation: I wanted to understand how they were created, and I dreamed of building one myself someday.",
    timeline_event3_year: "2021",
    timeline_event3_title: "Technical training and first personal projects",
    timeline_event3_subtitle: "Platzi | Self-taught | Initial full-stack development",
    timeline_event3_description: "I enrolled in technical courses at Platzi, where I learned from web fundamentals to advanced backend and frontend concepts. During this time I developed multiple personal projects, small but significant.",
    timeline_event3_detail1: "A simple reminder app",
    timeline_event3_detail2: "A system to manage streaming accounts",
    timeline_event3_detail3: "A plant page dedicated to a special person",
    timeline_event4_year: "2022",
    timeline_event4_title: "Technical consolidation and product vision",
    timeline_event4_subtitle: "Node.js / Python / MySQL / Docker / Cloud",
    timeline_event4_description: "With more solid foundations, I began to understand the complete development ecosystem. I learned about servers, APIs, databases and deployments, applying best practices with Docker and CI/CD flows. I started to see code not just as something functional, but as a tool to build real and scalable products.",
    timeline_event5_year: "2023",
    timeline_event5_title: "University transition and academic projects",
    timeline_event5_subtitle: "Applied mathematics | Calculus | Java / Python / Advanced frontend",
    timeline_event5_description: "Upon entering university, I started to feel that knowledge was transforming into the power to truly create. My most outstanding project was a variable and integral calculator, developed for my calculus class, which showed me how programming could solve real academic problems. That same year Nova Store was born, initially as a personal frontend project... without imagining it would become my flagship platform.",
    timeline_event6_year: "2023 - 2025",
    timeline_event6_title: "Nova Store: from idea to functional product",
    timeline_event6_subtitle: "React / Next.js / Tailwind / Node / Flutter / Cloud / GSAP",
    timeline_event6_description: "Nova Store started as a simple e-commerce, but over time I expanded it into a semi-automated system that combines the sale of digital and physical products. I integrated my own backend, advanced user management, optimized admin panel and cloud synchronization. I even developed a complementary version in Flutter, exploring the convergence between web and mobile.",
    timeline_event6_detail1: "Today, Nova Store generates profits for both me and other users without the need for direct investment.",
    timeline_event6_detail2: "It's a reflection of my evolution: from creating out of curiosity, to designing with purpose.",
    timeline_event7_year: "2025",
    timeline_event7_title: "Present: Frontend Dev and Interactive Experience",
    timeline_event7_subtitle: "React / Next.js / TypeScript / GSAP / Framer Motion / Tailwind / Supabase",
    timeline_event7_description: "I currently dedicate myself to developing modern interfaces with a focus on animation, interaction and visual fluidity. I use tools like GSAP, Framer Motion and Anime.js to create immersive, dynamic and natural experiences. I'm passionate about every detail having intention, navigation feeling light and the interface breathing.",
    timeline_event7_detail1: "A good interface doesn't just look good, it feels good.",
    timeline_event7_detail2: "Every transition, every micro-interaction, every shadow is part of an experience designed for the user.",
    timeline_event8_year: "Future Vision",
    timeline_event8_title: "Interactive design and immersive experiences",
    timeline_event8_subtitle: "Interactive design | Virtual Reality | Immersive experiences",
    timeline_event8_description: "My long-term goal is to develop web pages with virtual reality, where the user can literally touch the interface. I want to merge design, technology and emotion to create experiences that are not only seen or used, but lived.",

    // Blog
    blog_title: "Blog",
    blog_subtitle: "Short notes, TIL and post-mortems.",
    blog_article1_title: "Accessibility in menu components",
    blog_article1_desc: "Focus trap, roles and keyboard.",
    blog_article2_title: "Motion with intention",
    blog_article2_desc: "GSAP + prefers-reduced-motion.",

    // Talks
    talks_title: "Talks & Workshops",
    talks_subtitle: "Slides and recordings.",
    talks_item1: "Accessible motion",
    talks_item1_desc: "React meetup (slides + video).",
    talks_item2: "Design tokens",
    talks_item2_desc: "90' workshop (public repo).",

    // Uses
    uses_title: "Uses",
    uses_subtitle: "My work setup.",
    uses_hardware_title: "Hardware",
    uses_hardware_item1: "ThinkPad + 32GB RAM",
    uses_hardware_item2: "27\" 1440p Monitor",
    uses_software_title: "Software",
    uses_software_item1: "VSCode, zsh, tmux",
    uses_software_item2: "Figma, Raycast",

    // Now
    now_title: "Now()",
    now_subtitle: "What I'm working on this month.",
    now_item1: "Refactoring my component system into a cleaner, more scalable slot-based architecture.",
    now_item2: "Improving entry, interaction, and scroll animations with GSAP, balancing fluidity, performance, and accessibility.",
    now_item3: "Studying advanced UI patterns, motion design, and WAI-ARIA best practices for keyboard navigation.",
    now_item4: "Building a modular personal UI kit as a space for visual and technical experimentation.",
    now_item5: "Writing an article about accessibility in menus, navigation, and focus management.",


    // Case Studies
    cases_title: "Case Studies",
    cases_subtitle: "Problem → Process → Impact.",
    cases_problem_label: "Problem",
    cases_process_label: "Process",
    cases_impact_label: "Impact",
    case1_title: "Nova Store — Smart hybrid e-commerce",
    case1_problem: "Small stores and digital creators needed a simple platform to sell physical and digital products without depending on intermediaries.",
    case1_process: "I developed a complete platform with React, Next.js, Tailwind and Node.js, integrating cloud databases with Supabase and Firebase. I added admin panels, advanced user management, and animations with GSAP and Framer Motion.",
    case1_impact: "I reduced management time by 70%, increased loading speed, and generated a semi-automated system that allows others to generate income without initial investment.",
    case2_title: "Miza — Intelligent assistant with emotional AI",
    case2_problem: "Traditional virtual assistants offer mechanical responses without empathy, which reduces connection with the user.",
    case2_process: "I designed Miza, an assistant with psychological and emotional focus, capable of interacting from a desktop or mobile app. It combines conversational AI and cognitive psychology principles, creating a more human experience adaptable to the user's state.",
    case2_impact: "Miza achieves more natural and empathetic interactions, reducing user frustration and improving retention in apps with virtual support. It's a project that unites technology and digital wellbeing.",
    case3_title: "Itia — Tourist intelligence through computer vision",
    case3_problem: "Several rural and less frequented areas of Colombia lack technological tools to boost their tourism and visibility.",
    case3_process: "I developed the Itia project, an IoT system with cameras and real-time video analysis, capable of studying people flow and highlighting local points of interest. It uses cloud computing and visual data processing to generate heat maps and tourist attraction reports.",
    case3_impact: "It proposes a sustainable way to boost tourism with technology, helping communities highlight their potential without altering their environment.",
    case4_title: "Integral and Variable Calculator — Academic Application",
    case4_problem: "Calculus students wasted time solving integrals manually during classes.",
    case4_process: "I created an app in Java with a simple interface that executes symbolic and numerical operations automatically.",
    case4_impact: "I reduced exercise solving time by more than 60%, allowing focus on mathematical interpretation.",
    case5_title: "Design System — Multi-platform visual standardization",
    case5_problem: "The projects I developed had visual inconsistencies and long design times.",
    case5_process: "I built a modular Design System with Tailwind and reusable tokens, incorporating dark mode and 26 base components.",
    case5_impact: "I reduced delivery times by 35% and achieved total visual coherence between web and mobile projects.",
    case6_title: "Personal Portfolio — Immersive experience in motion",
    case6_problem: "My previous portfolio didn't represent my creative approach or my mastery in animation and UI.",
    case6_process: "I redesigned the entire visual experience with React, Next.js, GSAP and Framer Motion, prioritizing accessibility, speed and organic motion feel.",
    case6_impact: "I achieved a fluid, lively and memorable user experience, aligned with my identity as an interactive interface developer.",

    // Open Source
    opensource_title: "Open Source",
    opensource_subtitle: "PRs, issues and published packages.",
    opensource_item1: "Contribution to awesome-animations — GSAP/ARIA example.",
    opensource_item2: "Package @dreamincode/use-keypress — accessibility hook.",
  },
  de: {
    brand: "<DreamInCode />",
    about: "Über mich",
    projects: "Projekte",
    skills: "Fähigkeiten",
    contacts: "Kontakt",

    hero_hello: "Hallo!",
    hero_im: "Ich bin",
    hero_role: "Softwareentwickler",
    hero_name: "David",
    hero_tagline_1: "Die Zukunft der Software",
    hero_tagline_2: "wird",
    hero_tagline_3: "gestaltet",

    about_title: "Über mich",
    about_sub: "UI & Frontend — Fokus auf Details und Balance zwischen Design & Funktion.",
    about_p1: "Ich baue klare, zugängliche Interfaces mit subtilen Mikro-Interaktionen. Ich arbeite mit React/Next, TypeScript und GSAP.",
    about_p2: "Wichtig sind mir visuelle Konsistenz, Performance und Freude am Produkt. Dieses Mikro-Portfolio wächst mit UI-Experimenten.",

    projects_title: "Projekte",
    projects_sub: "Schnelle Beispiele — Repos/Demos folgen.",
    proj_ui: "DreamInCode UI",
    proj_ui_desc: "Pastell/Dark-Komponenten & Patterns für die Produktion.",
    proj_motion: "GSAP Lab",
    proj_motion_desc: "Mikro-Interaktionen & Übergänge in echter UI.",
    proj_i18n: "i18n Starter",
    proj_i18n_desc: "Minimale Mehrsprachen-Struktur mit Context.",

    skills_title: "Fähigkeiten",
    skills_sub: "Hauptstack und Bereiche mit größtem Mehrwert.",
    skills_frontend: "Frontend",
    skills_quality: "Qualität",
    skills_tools: "Tools",

    contacts_title: "Kontakt",
    contacts_sub: "Lass uns sprechen! Nachricht senden oder verbinden.",
    form_name: "Dein Name",
    form_email: "E-Mail",
    form_msg: "Nachricht",
    form_send: "Senden",

    // Extras del Header
    experience: "Erfahrung",
    caseStudies: "Fallstudien",
    talks: "Vorträge & Workshops",

    // About extras
    about_section_title: "Über mich",
    about_techstack_title: "Tech Stack",
    about_techstack_subtitle: "Werkzeuge und Technologien, die ich beherrsche",

    // Timeline
    timeline_title: "Meine Reise",
    timeline_subtitle: "Berufliche und technische Entwicklung",
    timeline_section_title: "Meine Reise",
    timeline_event1_year: "2019",
    timeline_event1_title: "Erster Kontakt mit Programmierung",
    timeline_event1_subtitle: "Autodidaktischer Start | Reines HTML | Technische Neugier",
    timeline_event1_description: "Jahr vor der Pandemie. Ich war in der neunten Klasse, begeistert vom Studium der Systemtechnik. Ohne es zu wissen, war diese Begeisterung der Anfang von allem: Ich begann, HTML von Grund auf zu lernen, erstellte meine ersten Seiten ohne CSS, nur aus Freude daran, etwas mit meinen eigenen Händen zu bauen. Es war meine erste echte Annäherung an die digitale Welt, wo ich die Zufriedenheit entdeckte, Ideen in Code zu verwandeln.",
    timeline_event2_year: "2020",
    timeline_event2_title: "Erste Experimente und der Antrieb durch Videospiele",
    timeline_event2_subtitle: "Java | Programmierlogik | Angewandte Kreativität",
    timeline_event2_description: "Mit mehr Freizeit während der Pandemie stürzte ich mich kopfüber in das Lernen mit Java, meiner ersten formalen Sprache. Ich entwickelte kleine Projekte und erstellte sogar mein eigenes Spiel, das ich später löschte (aber es markierte meinen Beginn in der interaktiven Programmierung). Videospiele wurden meine Motivation: Ich wollte verstehen, wie sie erstellt wurden, und träumte davon, eines Tages ein eigenes zu bauen.",
    timeline_event3_year: "2021",
    timeline_event3_title: "Technische Ausbildung und erste persönliche Projekte",
    timeline_event3_subtitle: "Platzi | Autodidakt | Anfängliche Full-Stack-Entwicklung",
    timeline_event3_description: "Ich schrieb mich für technische Kurse bei Platzi ein, wo ich von Web-Grundlagen bis zu fortgeschrittenen Backend- und Frontend-Konzepten lernte. In dieser Zeit entwickelte ich mehrere persönliche Projekte, klein aber bedeutsam.",
    timeline_event3_detail1: "Eine einfache Erinnerungs-App",
    timeline_event3_detail2: "Ein System zur Verwaltung von Streaming-Konten",
    timeline_event3_detail3: "Eine Pflanzenseite für eine besondere Person",
    timeline_event4_year: "2022",
    timeline_event4_title: "Technische Konsolidierung und Produktvision",
    timeline_event4_subtitle: "Node.js / Python / MySQL / Docker / Cloud",
    timeline_event4_description: "Mit solideren Grundlagen begann ich, das komplette Entwicklungs-Ökosystem zu verstehen. Ich lernte über Server, APIs, Datenbanken und Deployments, wendete Best Practices mit Docker und CI/CD-Flows an. Ich begann, Code nicht nur als etwas Funktionales zu sehen, sondern als Werkzeug zum Aufbau realer und skalierbarer Produkte.",
    timeline_event5_year: "2023",
    timeline_event5_title: "Universitätsübergang und akademische Projekte",
    timeline_event5_subtitle: "Angewandte Mathematik | Kalkül | Java / Python / Fortgeschrittenes Frontend",
    timeline_event5_description: "Mit dem Eintritt in die Universität begann ich zu spüren, dass sich Wissen in die Kraft verwandelte, wirklich zu schaffen. Mein herausragendstes Projekt war ein Variablen- und Integralrechner, entwickelt für meinen Kalkülkurs, der mir zeigte, wie Programmierung echte akademische Probleme lösen konnte. Im selben Jahr wurde Nova Store geboren, zunächst als persönliches Frontend-Projekt... ohne zu ahnen, dass es meine Flaggschiff-Plattform werden würde.",
    timeline_event6_year: "2023 - 2025",
    timeline_event6_title: "Nova Store: von der Idee zum funktionalen Produkt",
    timeline_event6_subtitle: "React / Next.js / Tailwind / Node / Flutter / Cloud / GSAP",
    timeline_event6_description: "Nova Store begann als einfacher E-Commerce, aber im Laufe der Zeit erweiterte ich es zu einem halbautomatisierten System, das den Verkauf digitaler und physischer Produkte kombiniert. Ich integrierte ein eigenes Backend, fortgeschrittenes Benutzermanagement, optimiertes Admin-Panel und Cloud-Synchronisation. Ich entwickelte sogar eine ergänzende Version in Flutter und erforschte die Konvergenz zwischen Web und Mobile.",
    timeline_event6_detail1: "Heute generiert Nova Store Gewinne sowohl für mich als auch für andere Benutzer ohne direkte Investition.",
    timeline_event6_detail2: "Es ist ein Spiegelbild meiner Evolution: vom Erstellen aus Neugier zum Entwerfen mit Zweck.",
    timeline_event7_year: "2025",
    timeline_event7_title: "Gegenwart: Frontend Dev und Interaktive Erfahrung",
    timeline_event7_subtitle: "React / Next.js / TypeScript / GSAP / Framer Motion / Tailwind / Supabase",
    timeline_event7_description: "Derzeit widme ich mich der Entwicklung moderner Schnittstellen mit Fokus auf Animation, Interaktion und visuelle Flüssigkeit. Ich verwende Tools wie GSAP, Framer Motion und Anime.js, um immersive, dynamische und natürliche Erfahrungen zu schaffen. Mir ist wichtig, dass jedes Detail eine Absicht hat, dass die Navigation sich leicht anfühlt und dass die Schnittstelle atmet.",
    timeline_event7_detail1: "Eine gute Schnittstelle sieht nicht nur gut aus, sie fühlt sich gut an.",
    timeline_event7_detail2: "Jeder Übergang, jede Mikrointeraktion, jeder Schatten ist Teil einer für den Benutzer gestalteten Erfahrung.",
    timeline_event8_year: "Zukunftsvision",
    timeline_event8_title: "Interaktives Design und immersive Erfahrungen",
    timeline_event8_subtitle: "Interaktives Design | Virtuelle Realität | Immersive Erfahrungen",
    timeline_event8_description: "Mein langfristiges Ziel ist es, Webseiten mit virtueller Realität zu entwickeln, wo der Benutzer die Schnittstelle buchstäblich berühren kann. Ich möchte Design, Technologie und Emotion verschmelzen, um Erfahrungen zu schaffen, die nicht nur gesehen oder genutzt, sondern gelebt werden.",

    // Blog
    blog_title: "Blog",
    blog_subtitle: "Kurze Notizen, TIL und Post-Mortems.",
    blog_article1_title: "Barrierefreiheit in Menükomponenten",
    blog_article1_desc: "Focus trap, Rollen und Tastatur.",
    blog_article2_title: "Motion mit Absicht",
    blog_article2_desc: "GSAP + prefers-reduced-motion.",

    // Talks
    talks_title: "Vorträge & Workshops",
    talks_subtitle: "Folien und Aufzeichnungen.",
    talks_item1: "Barrierefreie Motion",
    talks_item1_desc: "React Meetup (Folien + Video).",
    talks_item2: "Design Tokens",
    talks_item2_desc: "90' Workshop (öffentliches Repo).",

    // Uses
    uses_title: "Uses",
    uses_subtitle: "Mein Arbeitsplatz-Setup.",
    uses_hardware_title: "Hardware",
    uses_hardware_item1: "ThinkPad + 32GB RAM",
    uses_hardware_item2: "27\" 1440p Monitor",
    uses_software_title: "Software",
    uses_software_item1: "VSCode, zsh, tmux",
    uses_software_item2: "Figma, Raycast",

    // Now
    now_title: "Now()",
    now_subtitle: "Woran ich diesen Monat arbeite.",
    now_item1: "Refactoring meines Komponenten-Systems zu einer saubereren, skalierbareren Slot-basierten Architektur.",
    now_item2: "Verbesserung von Entry-, Interaktions- und Scroll-Animationen mit GSAP, mit Fokus auf Fluidität, Leistung und Barrierefreiheit.",
    now_item3: "Studium fortgeschrittener UI-Patterns, Motion-Design und WAI-ARIA Best Practices für Tastaturnavigation.",
    now_item4: "Aufbau eines modularen persönlichen UI-Kits als Raum für visuelle und technische Experimente.",
    now_item5: "Verfassen eines Artikels über Barrierefreiheit in Menüs, Navigation und Fokus-Management.",


    // Case Studies
    cases_title: "Fallstudien",
    cases_subtitle: "Problem → Prozess → Auswirkung.",
    cases_problem_label: "Problem",
    cases_process_label: "Prozess",
    cases_impact_label: "Auswirkung",
    case1_title: "Nova Store — Intelligenter Hybrid-E-Commerce",
    case1_problem: "Kleine Geschäfte und digitale Kreative brauchten eine einfache Plattform, um physische und digitale Produkte ohne Zwischenhändler zu verkaufen.",
    case1_process: "Ich entwickelte eine vollständige Plattform mit React, Next.js, Tailwind und Node.js, integrierte Cloud-Datenbanken mit Supabase und Firebase. Ich fügte Admin-Panels, fortgeschrittenes Benutzermanagement und Animationen mit GSAP und Framer Motion hinzu.",
    case1_impact: "Ich reduzierte die Verwaltungszeit um 70%, erhöhte die Ladegeschwindigkeit und generierte ein halbautomatisiertes System, das anderen ermöglicht, ohne anfängliche Investition Einkommen zu generieren.",
    case2_title: "Miza — Intelligenter Assistent mit emotionaler KI",
    case2_problem: "Traditionelle virtuelle Assistenten bieten mechanische Antworten ohne Empathie, was die Verbindung zum Benutzer reduziert.",
    case2_process: "Ich entwarf Miza, einen Assistenten mit psychologischem und emotionalem Fokus, der von einer Desktop- oder mobilen App aus interagieren kann. Er kombiniert konversationelle KI und Prinzipien der kognitiven Psychologie und schafft eine menschlichere Erfahrung, die sich an den Zustand des Benutzers anpasst.",
    case2_impact: "Miza erreicht natürlichere und empathischere Interaktionen, reduziert Benutzerfrust und verbessert die Retention in Apps mit virtuellem Support. Es ist ein Projekt, das Technologie und digitales Wohlbefinden vereint.",
    case3_title: "Itia — Tourismusintelligenz durch Computer Vision",
    case3_problem: "Mehrere ländliche und weniger frequentierte Gebiete Kolumbiens fehlen technologische Werkzeuge, um ihren Tourismus und ihre Sichtbarkeit zu fördern.",
    case3_process: "Ich entwickelte das Itia-Projekt, ein IoT-System mit Kameras und Echtzeit-Videoanalyse, das den Personenstrom studieren und lokale Sehenswürdigkeiten hervorheben kann. Es verwendet Cloud Computing und visuelle Datenverarbeitung, um Heatmaps und Touristenattraktionsberichte zu generieren.",
    case3_impact: "Es schlägt einen nachhaltigen Weg vor, den Tourismus mit Technologie zu fördern und Gemeinschaften zu helfen, ihr Potenzial hervorzuheben, ohne ihre Umgebung zu verändern.",
    case4_title: "Integral- und Variablenrechner — Akademische Anwendung",
    case4_problem: "Kalkülstudenten verschwendeten Zeit beim manuellen Lösen von Integralen während des Unterrichts.",
    case4_process: "Ich erstellte eine App in Java mit einfacher Schnittstelle, die symbolische und numerische Operationen automatisch ausführt.",
    case4_impact: "Ich reduzierte die Lösungszeit für Übungen um mehr als 60% und ermöglichte den Fokus auf mathematische Interpretation.",
    case5_title: "Design System — Multiplattform-Visualstandardisierung",
    case5_problem: "Die Projekte, die ich entwickelte, hatten visuelle Inkonsistenzen und lange Designzeiten.",
    case5_process: "Ich baute ein modulares Design System mit Tailwind und wiederverwendbaren Tokens auf, integrierte Dark Mode und 26 Basiskomponenten.",
    case5_impact: "Ich reduzierte die Lieferzeiten um 35% und erreichte totale visuelle Kohärenz zwischen Web- und mobilen Projekten.",
    case6_title: "Persönliches Portfolio — Immersive Erfahrung in Bewegung",
    case6_problem: "Mein vorheriges Portfolio repräsentierte nicht meinen kreativen Ansatz oder meine Beherrschung von Animation und UI.",
    case6_process: "Ich gestaltete die gesamte visuelle Erfahrung mit React, Next.js, GSAP und Framer Motion neu, priorisierte Barrierefreiheit, Geschwindigkeit und organisches Bewegungsgefühl.",
    case6_impact: "Ich erreichte eine flüssige, lebendige und unvergessliche Benutzererfahrung, die mit meiner Identität als Entwickler interaktiver Schnittstellen übereinstimmt.",

    // Open Source
    opensource_title: "Open Source",
    opensource_subtitle: "PRs, Issues und veröffentlichte Pakete.",
    opensource_item1: "Beitrag zu awesome-animations — GSAP/ARIA Beispiel.",
    opensource_item2: "Paket @dreamincode/use-keypress — Barrierefreiheits-Hook.",
  },
};

/* ---------------- Context ---------------- */
type LangContext = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: keyof Messages) => string;
};

const LanguageContext = createContext<LangContext>({
  lang: "es",
  setLang: () => {},
  t: (k) => k as string,
});

export function useLang() { return useContext(LanguageContext); }
export function useT() { return useLang().t as (key: keyof Messages) => string; }

/* ---------------- Provider ---------------- */
export default function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("es");

  // idioma inicial: localStorage -> navegador -> 'es'
  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem("lang") as Lang | null;
    if (saved && ["es","en","de"].includes(saved)) { setLang(saved); return; }
    const nav = navigator.language?.toLowerCase() || "";
    if (nav.startsWith("es")) setLang("es");
    else if (nav.startsWith("de")) setLang("de");
    else setLang("en");
  }, []);

  // persistir
  useEffect(() => {
    if (typeof window !== "undefined") localStorage.setItem("lang", lang);
  }, [lang]);

  const t = (key: keyof Messages) => messages[lang][key] ?? (key as string);
  const value = useMemo(() => ({ lang, setLang, t }), [lang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
