"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Github, Twitter, Linkedin, Mail, ArrowDown } from "lucide-react";
import ProfileCard from '@/components/ProfileCard';
import '@/components/ProfileCard.css';
import { FaCode } from "react-icons/fa";
import LiquidEther from '@/components/LiquidEther'; // adjust path to where you placed the component

const g = { fontFamily: "var(--font-geist), sans-serif" } as const;
const gm = { fontFamily: "var(--font-geist-mono), monospace" } as const;
const gs = { fontFamily: "var(--font-script), cursive" } as const;

/* ─── Cursor glow ─── */
function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!ref.current) return;
      ref.current.style.left = e.clientX + "px";
      ref.current.style.top = e.clientY + "px";
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return (
    <div ref={ref} className="pointer-events-none fixed z-0"
      style={{
        width: 500, height: 500, borderRadius: "50%", transform: "translate(-50%,-50%)",
        background: "radial-gradient(circle, rgba(255,255,255,0.028) 0%, transparent 70%)",
        transition: "left 0.12s ease, top 0.12s ease"
      }} />
  );
}

/* ─── Fade-in on scroll ─── */
function FadeIn({ children, delay = 0, className = "", style = {} }: {
  children: React.ReactNode; delay?: number; className?: string; style?: React.CSSProperties
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} style={{
      ...style,
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

/* ─── Animated counter ─── */
function Counter({ target }: { target: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [started, setStarted] = useState(false);
  const num = parseInt(target.replace(/\D/g, ""));
  const suffix = target.replace(/[0-9]/g, "");
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setStarted(true); obs.disconnect(); } },
      { threshold: 0.5 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  useEffect(() => {
    if (!started || !ref.current) return;
    let start = 0;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / 1200, 1);
      const e = 1 - Math.pow(1 - p, 3);
      if (ref.current) ref.current.textContent = Math.floor(e * num) + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, num, suffix]);
  return <span ref={ref}>0{suffix}</span>;
}

/* ─── Typewriter ─── */
function Typewriter({ texts }: { texts: string[] }) {
  const [idx, setIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const current = texts[idx];
    const speed = deleting ? 40 : 80;
    const t = setTimeout(() => {
      if (!deleting) {
        setDisplayed(current.slice(0, displayed.length + 1));
        if (displayed.length + 1 === current.length) setTimeout(() => setDeleting(true), 1800);
      } else {
        setDisplayed(current.slice(0, displayed.length - 1));
        if (displayed.length === 0) { setDeleting(false); setIdx((idx + 1) % texts.length); }
      }
    }, speed);
    return () => clearTimeout(t);
  }, [displayed, deleting, idx, texts]);
  return (
    <span>
      {displayed}
      <span className="inline-block w-0.5 h-[1em] bg-white align-middle ml-0.5"
        style={{ animation: "blink 1s step-end infinite" }} />
    </span>
  );
}

/* ─── Magnetic button ─── */
function MagneticBtn({ children, href, primary }: { children: React.ReactNode; href: string; primary?: boolean }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const onMove = (e: React.MouseEvent) => {
    const rect = ref.current!.getBoundingClientRect();
    setPos({ x: (e.clientX - rect.left - rect.width / 2) * 0.25, y: (e.clientY - rect.top - rect.height / 2) * 0.25 });
  };
  return (
    <Link ref={ref} href={href} onMouseMove={onMove} onMouseLeave={() => setPos({ x: 0, y: 0 })}
      className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium"
      style={{
        ...g, transform: `translate(${pos.x}px,${pos.y}px)`,
        transition: "transform 0.2s ease, background-color 0.2s, border-color 0.2s",
        backgroundColor: primary ? "rgba(255,255,255,0.1)" : "transparent",
        border: `1px solid ${primary ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.08)"}`,
        color: primary ? "#fff" : "rgba(255,255,255,0.45)",
        backdropFilter: "blur(8px)",
      }}>
      {children}
    </Link>
  );
}

/* ─── Data ─── */
const stats = [
  { num: "3+", label: "Years of experience" },
  { num: "24+", label: "Projects completed" },
  { num: "12+", label: "Happy clients" },
  { num: "99%", label: "Satisfaction rate" },
];
const services = [
  {
    title: "Machine Learning",
    desc: "Building predictive models and intelligent systems using Python, scikit-learn, and deep learning frameworks to solve real-world problems."
  },
  {
    title: "Data Science",
    desc: "Data cleaning, exploratory analysis, and visualization to extract meaningful insights and support data-driven decision making."
  },
  {
    title: "Web Development",
    desc: "Developing responsive and efficient web applications using modern frameworks with clean architecture and scalable backend systems."
  },
];
const skills = [
  "Next.js", "React", "TypeScript", "Node.js", "PostgreSQL",
  "Prisma", "Tailwind CSS", "shadcn/ui", "GraphQL", "Docker", "AWS", "Figma",
];

/* ─── Page ─── */
export default function HomePage() {
  return (
    <>
      <style>{`
        @keyframes float { from { transform: translateY(0); } to { transform: translateY(-10px); } }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin { from{transform:translate(-50%,-50%) rotate(0deg)} to{transform:translate(-50%,-50%) rotate(360deg)} }
      `}</style>

      <CursorGlow />

      <main style={{ backgroundColor: "#0f0f0f", color: "#ededed", minHeight: "100vh", position: "relative", zIndex: 1 }}>

        {/* ══════════════════════════════════════
            HERO
        ══════════════════════════════════════ */}
        <section
          className="relative min-h-screen overflow-hidden px-8 md:px-16 lg:px-24 pt-24"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "2rem",
          }}
        >
          {/* ── LiquidEther — pinned full-bleed behind everything ── */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 0,
              // LiquidEther renders its own <canvas> that fills the container
            }}
          >
            <LiquidEther
              colors={['#ffffff', '#cccccc', '#888888']}
              mouseForce={20}
              cursorSize={100}
              isViscous
              viscous={30}
              iterationsViscous={32}
              iterationsPoisson={32}
              resolution={0.5}
              isBounce={false}
              autoDemo
              autoSpeed={0.5}
              autoIntensity={2.2}
              takeoverDuration={0.25}
              autoResumeDelay={3000}
              autoRampDuration={0.6}
            />
          </div>

          {/* Radial vignette — keeps edges dark so text stays readable */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 1,
              background:
                "radial-gradient(ellipse 90% 90% at 50% 50%, rgba(15,15,15,0.15) 0%, rgba(15,15,15,0.70) 65%, rgba(15,15,15,0.92) 100%)",
              pointerEvents: "none",
            }}
          />

          {/* Left: text content */}
          <div className="relative z-10 max-w-lg mx-20" style={{ flexShrink: 0 }}>
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-10 text-sm"
              style={{
                ...g,
                backgroundColor: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.13)",
                backdropFilter: "blur(16px)",
                color: "rgba(255,255,255,0.65)",
                animation: "fadeUp 0.6s ease both",
              }}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400" style={{ boxShadow: "0 0 6px #4ade80" }} />
              Creating Experiences at{" "}
              <span style={{ color: "#ededed", textDecoration: "underline", textUnderlineOffset: 3 }}>Informatics Engineering</span>
              <span
                className="w-5 h-5 rounded flex items-center justify-center text-xs"
                style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
              >✦</span>
            </div>

            {/* Headline */}
            <h1
              className="font-bold text-white leading-[1.05] mb-6"
              style={{ ...g, fontSize: "clamp(3rem,6vw,5rem)", animation: "fadeUp 0.6s ease 0.15s both" }}
            >
              I&apos;m Farel Febryan<br />
              <span style={{ color: "rgba(255,255,255,0.55)" }}>
                <Typewriter texts={["C28.", "a learner.", "a student.", "TC'24."]} />
              </span>
            </h1>

            {/* Body */}
            <p
              className="mb-10 leading-relaxed"
              style={{
                ...g,
                fontSize: "1rem",
                color: "rgba(255,255,255,0.55)",
                maxWidth: 400,
                animation: "fadeUp 0.6s ease 0.3s both",
              }}
            >
              Informatics student passionate about data science and software development, driven to build impactful, data-driven applications.
            </p>

            {/* Buttons */}
            <div className="flex items-center gap-3 mb-12" style={{ animation: "fadeUp 0.6s ease 0.45s both" }}>
              <MagneticBtn href="/projects" primary>View Projects <ArrowDown className="w-4 h-4" /></MagneticBtn>
              <MagneticBtn href="/about">More about me</MagneticBtn>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-4" style={{ animation: "fadeUp 0.6s ease 0.6s both" }}>
              {[
                { icon: <Github className="w-5 h-5" />, href: "https://github.com" },
                { icon: <Twitter className="w-5 h-5" />, href: "https://x.com" },
                { icon: <Linkedin className="w-5 h-5" />, href: "https://linkedin.com" },
                { icon: <Mail className="w-5 h-5" />, href: "mailto:farel@dev.id" },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-all hover:text-white hover:scale-110"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Right: Profile Card */}
          <div
            className="relative z-10 hidden md:flex items-center justify-center mx-20"
            style={{
              flex: "0 0 auto",
              animation: "fadeUp 0.8s ease 0.3s both",
            }}
          >
            <ProfileCard
              name="Farel Febryan"
              title={
                <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <FaCode />
                  Informatics Student
                </span>
              }
              handle="javicodes"
              status="Online"
              contactText="Contact Me"
              avatarUrl="/profile.jpeg"
              showUserInfo
              enableTilt={true}
              enableMobileTilt={false}
              onContactClick={() => console.log('Contact clicked')}
              behindGlowColor="rgba(125, 190, 255, 0.67)"
              iconUrl="/profile.jpg"
              grainUrl="./grain.jpg"
              behindGlowEnabled
              innerGradient="linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)"
            />
          </div>
        </section>

        <div style={{ height: 1, backgroundColor: "rgba(255,255,255,0.06)" }} />

        {/* ── SERVICES ── */}
        <section className="px-8 md:px-16 lg:px-24 py-24" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <FadeIn><p className="text-xs tracking-[0.25em] uppercase mb-12" style={{ ...gm, color: "rgba(255,255,255,0.25)" }}>What I Do</p></FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ backgroundColor: "rgba(255,255,255,0.06)" }}>
            {services.map((svc, i) => (
              <FadeIn key={i} delay={i * 120}>
                <div className="p-8 hover:bg-white/[0.025] transition-all duration-200 hover:-translate-y-0.5 h-full"
                  style={{ backgroundColor: "#0f0f0f" }}>
                  <p className="text-xs mb-5" style={{ ...gm, color: "rgba(255,255,255,0.18)" }}>0{i + 1}</p>
                  <h3 className="font-semibold text-white text-lg mb-3" style={g}>{svc.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ ...g, color: "rgba(255,255,255,0.38)" }}>{svc.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="px-8 md:px-16 lg:px-24 py-6 flex flex-col sm:flex-row items-center justify-between gap-2"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <p style={{ ...gm, fontSize: "11px", color: "rgba(255,255,255,0.18)" }}>© 2024 Farel Febryan · Built with Next.js</p>
          <p style={{ ...gm, fontSize: "11px", color: "rgba(255,255,255,0.18)" }}>Made with precision ✦</p>
        </footer>
      </main>
    </>
  );
}