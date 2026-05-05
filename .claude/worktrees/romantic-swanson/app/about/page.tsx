"use client";

import Link from "next/link";
import { Mail, Github, Linkedin, Twitter, Download, ArrowRight, Eye } from "lucide-react";

const g = { fontFamily: "var(--font-geist), sans-serif" } as const;
const gm = { fontFamily: "var(--font-geist-mono), monospace" } as const;
const gs = { fontFamily: "var(--font-script), cursive" } as const;

const experience = [
    { role: "Data Structure Teaching Assistant", company: "ITS", location: "Surabaya", period: "2026 — Present", current: true },
    { role: "Numerical Computing Teaching Assistant", company: "ITS", location: "Surabaya", period: "2026 — Present", current: true },
    { role: "IT Support & Data Administrator SPMB Jawa Timur 2026", company: "Dinas Pendidikan Provinsi", location: "Surabaya, Jawa Timur", period: "2026 — Present", current: true },
    { role: "Digital Marketing Staff", company: "PT. Wahana Supra Sinergi", location: "Remote Work", period: "2025 — Present", current: true },
    { role: "Linear Algebra Teaching Assistant", company: "ITS", location: "Surabaya", period: "2025", current: false },

];

const tools = [
    "Python", "Anaconda", "Scikit-Learn", "Pandas & Numpy", "Next.js", "TypeScript", "React", "Laravel",
    "Figma", "shadcn/ui", "Tailwind CSS",
];

const contacts = [
    { icon: <Mail className="w-4 h-4" />, label: "Email", val: "farelfebryan06@gmail.com", href: "farelfebryan06@gmail.com" },
    { icon: <Github className="w-4 h-4" />, label: "GitHub", val: "febryannnn", href: "https://github.com/febryannnn" },
    { icon: <Linkedin className="w-4 h-4" />, label: "LinkedIn", val: "farelfebryan", href: "https://www.linkedin.com/in/farel-febryan-912184318/" },
    // { icon: <Twitter className="w-4 h-4" />, label: "Twitter / X", val: "@alexreid_dev", href: "https://x.com" },
];

// Retro-style cards like "The Yearly Retro" section
const retroCards = [
    { year: "2024", title: "The 2024 Retrospective", sub: "Full-time work, open source, and growth.", views: "4,594" },
    { year: "2023", title: "The 2023 Retrospective", sub: "First junior role, learning TypeScript, first blog post.", views: "3,115" },
];

export default function AboutPage() {
    return (
        <main style={{ backgroundColor: "#0f0f0f", color: "#ededed", minHeight: "100vh" }}>

            {/* ── HERO ── */}
            <section className="px-8 md:px-16 lg:px-24 pt-28 pb-16" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="flex flex-col lg:flex-row gap-10 items-start lg:items-end justify-between">
                    <div className="max-w-xl">
                        {/* Avatar */}
                        {/* <div
                            className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold text-white mb-7 relative"
                            style={{ ...g, backgroundColor: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}
                        >
                            FF
                            <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-green-400 border-2" style={{ borderColor: "#0f0f0f", boxShadow: "0 0 6px #4ade80" }} />
                        </div> */}

                        {/* Status */}
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 text-xs"
                            style={{ ...g, backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.45)" }}>
                            <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                            Open to opportunities
                        </div>

                        {/* Script + bold headline */}
                        <p className="text-3xl leading-none mb-1" style={{ ...g, color: "rgba(255,255,255,0.3)" }}>Hello, I&apos;m</p>
                        <h1 className="font-bold text-white mb-2" style={{ ...g, fontSize: "clamp(2.2rem,5vw,4rem)", lineHeight: 1.05 }}>
                            Farel Febryan
                        </h1>
                        <p className="text-sm tracking-[0.15em] uppercase mb-6" style={{ ...gm, color: "rgba(255,255,255,0.25)" }}>
                            Undergraduate Student · ITS Surabaya, Indonesia
                        </p>
                        <p className="text-base leading-[1.8]" style={{ ...g, color: "rgba(255,255,255,0.42)", maxWidth: "420px" }}>
                            Second year Informatics student at ITS, passionate about machine learning, data science, and web development, focused on building impactful and intelligent solutions.
                        </p>
                    </div>

                    <a
                        href="/CV.pdf"
                        download
                        className="flex items-center gap-2 px-5 py-2.5 text-sm text-white rounded-xl transition-all hover:bg-white/12 shrink-0"
                        style={{
                            ...g,
                            backgroundColor: "rgba(255,255,255,0.07)",
                            border: "1px solid rgba(255,255,255,0.1)"
                        }}
                    >
                        <Download className="w-4 h-4" />
                        Download CV
                    </a>
                </div>
            </section>

            {/* ── TWO COL ── */}
            <div className="grid grid-cols-1 lg:grid-cols-2" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>

                {/* LEFT */}
                <div className="px-8 md:px-16 lg:px-24 py-14" style={{ borderRight: "1px solid rgba(255,255,255,0.06)" }}>
                    <p className="text-xs tracking-[0.25em] uppercase mb-6" style={{ ...gm, color: "rgba(255,255,255,0.22)" }}>About</p>

                    <p className="text-base leading-[1.85] mb-5" style={{ ...g, color: "rgba(255,255,255,0.42)" }}>
                        I’m a second year <span style={{ color: "rgba(255,255,255,0.9)" }}>Informatics student at ITS</span> driven by a strong curiosity for how technology shapes the way we solve real world problems. I’m especially enthusiastic about <span style={{ color: "rgba(255,255,255,0.9)" }}>machine learning</span>, <span style={{ color: "rgba(255,255,255,0.9)" }}>data science</span>, and <span style={{ color: "rgba(255,255,255,0.9)" }}>web development</span>, exploring how these fields connect to build <span style={{ color: "rgba(255,255,255,0.9)" }}>intelligent and impactful systems</span>.
                    </p>

                    <p className="text-base leading-[1.85] mb-5" style={{ ...g, color: "rgba(255,255,255,0.42)" }}>
                        I love turning ideas into <span style={{ color: "rgba(255,255,255,0.9)" }}>working solutions</span>, whether that means training models, analyzing data for insights, or building clean and responsive web applications. For me, learning is not just about completing coursework, but about <span style={{ color: "rgba(255,255,255,0.9)" }}>continuously improving and experimenting</span> to understand how things work under the hood.
                    </p>

                    <p className="text-base leading-[1.85] mb-12" style={{ ...g, color: "rgba(255,255,255,0.42)" }}>
                        Outside of academics, I enjoy diving into <span style={{ color: "rgba(255,255,255,0.9)" }}>side projects</span>, sharpening my <span style={{ color: "rgba(255,255,255,0.9)" }}>problem solving skills</span>, and staying updated with new tools and technologies that push me to <span style={{ color: "rgba(255,255,255,0.9)" }}>grow as a developer</span>.
                    </p>

                    <p className="text-xs tracking-[0.25em] uppercase mb-5" style={{ ...gm, color: "rgba(255,255,255,0.22)" }}>Contact</p>
                    <div className="flex flex-col gap-2">
                        {contacts.map(c => (
                            <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer"
                                className="flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all group hover:translate-x-1"
                                style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                                    style={{ backgroundColor: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.4)" }}>
                                    {c.icon}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-[10px] tracking-widest uppercase mb-0.5" style={{ ...gm, color: "rgba(255,255,255,0.2)" }}>{c.label}</p>
                                    <p className="text-sm text-white/65 truncate" style={g}>{c.val}</p>
                                </div>
                                <ArrowRight className="w-4 h-4 opacity-15 group-hover:opacity-40 transition-opacity" />
                            </a>
                        ))}
                    </div>
                </div>

                {/* RIGHT */}
                <div className="px-8 md:px-16 py-14">
                    <p className="text-xs tracking-[0.25em] uppercase mb-6" style={{ ...gm, color: "rgba(255,255,255,0.22)" }}>Experience</p>
                    <div className="flex flex-col mb-14" style={{ gap: 0 }}>
                        {experience.map((e, i) => (
                            <div key={e.role} className="py-5 flex items-start gap-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                                <div className="mt-1.5 shrink-0">
                                    <span className="block w-2 h-2 rounded-full"
                                        style={{
                                            backgroundColor: e.current ? "#4ade80" : "transparent",
                                            border: `1px solid ${e.current ? "#4ade80" : "rgba(255,255,255,0.2)"}`,
                                            boxShadow: e.current ? "0 0 6px rgba(74,222,128,0.5)" : "none",
                                        }}
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-white mb-0.5" style={g}>{e.role}</p>
                                    <p className="text-xs" style={{ ...gm, color: "rgba(255,255,255,0.28)" }}>{e.company} · {e.location}</p>
                                </div>
                                <span className="text-[11px] shrink-0" style={{ ...gm, color: e.current ? "#4ade80" : "rgba(255,255,255,0.2)" }}>{e.period}</span>
                            </div>
                        ))}
                    </div>

                    <p className="text-xs tracking-[0.25em] uppercase mb-5" style={{ ...gm, color: "rgba(255,255,255,0.22)" }}>Education</p>
                    <div className="mb-14 pb-8" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                        <p className="text-sm font-medium text-white mb-0.5" style={g}>Undergraduate Students Informatics Engineering</p>
                        <p className="text-xs mb-1" style={{ ...gm, color: "rgba(255,255,255,0.28)" }}>Institut Teknologi Sepuluh Nopember · Surabaya, Jawa Timur, Indonesia</p>
                        <span className="text-[11px]" style={{ ...gm, color: "rgba(255,255,255,0.2)" }}>2024 — 2028 (Expected)</span>
                    </div>

                    <p className="text-xs tracking-[0.25em] uppercase mb-5" style={{ ...gm, color: "rgba(255,255,255,0.22)" }}>Tools & Tech</p>
                    <div className="grid grid-cols-2 gap-2">
                        {tools.map(t => (
                            <div key={t} className="flex items-center gap-2.5 px-3.5 py-2.5 text-sm rounded-xl transition-colors hover:border-white/12"
                                style={{ ...g, backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.42)" }}>
                                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: "rgba(255,255,255,0.25)" }} />
                                {t}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── RETRO CARDS — inspired by "The Yearly Retro" section ── */}


            {/* ── CTA ── */}
            <section className="px-8 md:px-16 lg:px-24 py-16 flex flex-col sm:flex-row items-center justify-between gap-6" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <div>
                    <h2 className="font-bold text-white text-2xl mb-1.5" style={g}>Let&apos;s build something great.</h2>
                    <p className="text-sm" style={{ ...g, color: "rgba(255,255,255,0.38)" }}>I&apos;m open to new projects and full-time roles.</p>
                </div>
                <div className="flex gap-3 shrink-0">
                    <a href="mailto:farelfebryan06@gmail.com" className="flex items-center gap-2 px-5 py-2.5 text-sm text-white rounded-xl transition-all hover:bg-white/12"
                        style={{ ...g, backgroundColor: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}>
                        <Mail className="w-4 h-4" /> Get in Touch
                    </a>
                    <Link href="/projects" className="flex items-center gap-2 px-5 py-2.5 text-sm rounded-xl transition-all hover:bg-white/6"
                        style={{ ...g, border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.4)" }}>
                        View Projects
                    </Link>
                </div>
            </section>

            <footer className="px-8 md:px-16 lg:px-24 py-6 flex flex-col sm:flex-row items-center justify-between gap-2">
                <p style={{ ...gm, fontSize: "11px", color: "rgba(255,255,255,0.18)" }}>© 2024 Alexander Reid · Available for freelance</p>
                <p style={{ ...gm, fontSize: "11px", color: "rgba(255,255,255,0.18)" }}>Made with precision ✦</p>
            </footer>
        </main>
    );
}