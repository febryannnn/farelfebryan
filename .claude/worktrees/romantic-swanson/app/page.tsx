"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Github, Twitter, Linkedin, Mail, ArrowDown } from "lucide-react";
import ProfileCard from '@/components/ProfileCard';
import '@/components/ProfileCard.css';
import { FaCode } from "react-icons/fa";
import LiquidEther from '@/components/LiquidEther';

const g = { fontFamily: "var(--font-geist), sans-serif" } as const;
const gm = { fontFamily: "var(--font-geist-mono), monospace" } as const;

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
    <div ref={ref} className="pointer-events-none fixed z-0 hidden md:block"
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
        whiteSpace: "nowrap",
      }}>
      {children}
    </Link>
  );
}

/* ─── Data ─── */
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

/* ─── Page ─── */
export default function HomePage() {
  return (
    <>
      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }

        /* ── Hero layout ── */
        .hero-inner {
          position: relative;
          z-index: 10;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
          padding: 5rem 1.5rem 3rem;
          text-align: center;
        }

        /* Min height only on tablet+ */
        @media (min-width: 768px) {
          section.hero-section { min-height: 100vh; }
        }

        /* Tablet+ → side-by-side */
        @media (min-width: 768px) {
          .hero-inner {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            text-align: left;
            padding: 6rem 4rem 4rem;
            gap: 2rem;
          }
        }

        /* Desktop */
        @media (min-width: 1024px) {
          .hero-inner {
            padding: 6rem 6rem 4rem;
          }
        }

        /* Text block */
        .hero-text {
          flex-shrink: 0;
          max-width: 100%;
        }
        @media (min-width: 768px) {
          .hero-text {
            max-width: 440px;
            margin-left: 5rem;
          }
        }
        @media (min-width: 1024px) {
          .hero-text {
            max-width: 520px;
            margin-left: 5rem;
          }
        }

        /* Badge centering on mobile */
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.625rem;
          padding: 0.5rem 1rem;
          border-radius: 999px;
          font-size: 0.75rem;
          margin-bottom: 1.75rem;
          background-color: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.13);
          backdrop-filter: blur(16px);
          color: rgba(255,255,255,0.65);
          animation: fadeUp 0.6s ease both;
          flex-wrap: wrap;
          justify-content: center;
        }
        @media (min-width: 768px) {
          .hero-badge {
            flex-wrap: nowrap;
            justify-content: flex-start;
          }
        }

        /* CTA buttons */
        .hero-ctas {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 3rem;
          animation: fadeUp 0.6s ease 0.45s both;
          justify-content: center;
          flex-wrap: wrap;
        }
        @media (min-width: 768px) {
          .hero-ctas { justify-content: flex-start; }
        }

        /* Social icons */
        .hero-socials {
          display: flex;
          align-items: center;
          gap: 1rem;
          animation: fadeUp 0.6s ease 0.6s both;
          justify-content: center;
        }
        @media (min-width: 768px) {
          .hero-socials { justify-content: flex-start; }
        }

        /* ProfileCard wrapper – hidden on small mobile, shown md+ */
        .hero-card {
          display: none;
          flex: 0 0 auto;
          animation: fadeUp 0.8s ease 0.3s both;
        }
        @media (min-width: 768px) {
          .hero-card {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 5rem;
          }
        }

        /* Services grid */
        .services-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1px;
          background-color: rgba(255,255,255,0.06);
        }
        @media (min-width: 640px) {
          .services-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 1024px) {
          .services-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        /* Section padding helper */
        .section-pad {
          padding: 4rem 1.5rem;
        }
        @media (min-width: 768px) {
          .section-pad { padding: 5rem 4rem; }
        }
        @media (min-width: 1024px) {
          .section-pad { padding: 6rem 6rem; }
        }
      `}</style>

      <CursorGlow />

      <main style={{ backgroundColor: "#0f0f0f", color: "#ededed", minHeight: "100vh", position: "relative", zIndex: 1 }}>

        {/* ══════ HERO ══════ */}
        <section className="hero-section relative overflow-hidden">

          {/* LiquidEther background */}
          <div aria-hidden style={{ position: "absolute", inset: 0, zIndex: 0 }}>
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

          {/* Vignette */}
          <div aria-hidden style={{
            position: "absolute", inset: 0, zIndex: 1,
            background: "radial-gradient(ellipse 90% 90% at 50% 50%, rgba(15,15,15,0.15) 0%, rgba(15,15,15,0.70) 65%, rgba(15,15,15,0.92) 100%)",
            pointerEvents: "none",
          }} />

          {/* Content row */}
          <div className="hero-inner">

            {/* Left: text */}
            <div className="hero-text">

              {/* Badge */}
              <div className="hero-badge" style={g}>
                <span className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0" style={{ boxShadow: "0 0 6px #4ade80" }} />
                Creating Experiences at{" "}
                <span style={{ color: "#ededed", textDecoration: "underline", textUnderlineOffset: 3 }}>
                  Informatics Engineering
                </span>
                <span className="w-5 h-5 rounded flex items-center justify-center text-xs flex-shrink-0"
                  style={{ backgroundColor: "rgba(255,255,255,0.12)" }}>✦</span>
              </div>

              {/* Headline */}
              <h1
                className="font-bold text-white leading-[1.05] mb-6"
                style={{
                  ...g,
                  fontSize: "clamp(2.2rem, 6vw, 5rem)",
                  animation: "fadeUp 0.6s ease 0.15s both",
                }}
              >
                I&apos;m Farel Febryan<br />
                <span style={{ color: "rgba(255,255,255,0.55)" }}>
                  <Typewriter texts={["C28.", "a learner.", "a student.", "TC'24."]} />
                </span>
              </h1>

              {/* Body */}
              <p className="mb-8 leading-relaxed" style={{
                ...g,
                fontSize: "1rem",
                color: "rgba(255,255,255,0.55)",
                maxWidth: 400,
                margin: "0 auto 2rem 0",
                animation: "fadeUp 0.6s ease 0.3s both",
              }}>
                Informatics student passionate about data science and software development,
                driven to build impactful, data-driven applications.
              </p>

              {/* Buttons */}
              <div className="hero-ctas">
                <MagneticBtn href="/projects" primary>View Projects <ArrowDown className="w-4 h-4" /></MagneticBtn>
                <MagneticBtn href="/about">More about me</MagneticBtn>
              </div>

              {/* Socials */}
              <div className="hero-socials">
                {[
                  { icon: <Github className="w-5 h-5" />, href: "https://github.com" },
                  { icon: <Twitter className="w-5 h-5" />, href: "https://x.com" },
                  { icon: <Linkedin className="w-5 h-5" />, href: "https://linkedin.com" },
                  { icon: <Mail className="w-5 h-5" />, href: "mailto:farel@dev.id" },
                ].map((s, i) => (
                  <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                    className="transition-all hover:text-white hover:scale-110"
                    style={{ color: "rgba(255,255,255,0.4)" }}>
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Right: ProfileCard */}
            <div className="hero-card">
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
          </div>
        </section>

        <div style={{ height: 1, backgroundColor: "rgba(255,255,255,0.06)" }} />

        {/* ══════ SERVICES ══════ */}
        <section className="section-pad" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <FadeIn>
            <p className="text-xs tracking-[0.25em] uppercase mb-10"
              style={{ ...gm, color: "rgba(255,255,255,0.25)" }}>
              What I Do
            </p>
          </FadeIn>

          <div className="services-grid">
            {services.map((svc, i) => (
              <FadeIn key={i} delay={i * 120}>
                <div
                  className="p-6 md:p-8 hover:bg-white/[0.025] transition-all duration-200 hover:-translate-y-0.5 h-full"
                  style={{ backgroundColor: "#0f0f0f" }}
                >
                  <p className="text-xs mb-5" style={{ ...gm, color: "rgba(255,255,255,0.18)" }}>0{i + 1}</p>
                  <h3 className="font-semibold text-white text-lg mb-3" style={g}>{svc.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ ...g, color: "rgba(255,255,255,0.38)" }}>{svc.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ══════ FOOTER ══════ */}
        <footer
          className="section-pad flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            paddingTop: "1.5rem",
            paddingBottom: "1.5rem",
          }}
        >
          <p style={{ ...gm, fontSize: "11px", color: "rgba(255,255,255,0.18)" }}>
            © 2024 Farel Febryan · Built with Next.js
          </p>
          <p style={{ ...gm, fontSize: "11px", color: "rgba(255,255,255,0.18)" }}>
            Made with precision ✦
          </p>
        </footer>
      </main>
    </>
  );
}