"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Eye, ExternalLink, Github, X, ArrowRight } from "lucide-react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform, LayoutGroup } from "motion/react";
import Stack from '@/components/Stack';
import Link from "next/link";
import { projects as projectsData, getThumb, getGallery } from "@/lib/projects";

const g = { fontFamily: "var(--font-geist), sans-serif" } as const;
const gm = { fontFamily: "var(--font-geist-mono), monospace" } as const;

const images = ["/dermadiff-3.png", "/dermadiff-6.png", "/dermadiff-2.png", "/dermadiff-5.png", "/dermadiff-4.png", "/dermadiff-1.png"];

type Cat = "All" | "Web App" | "AI / ML";
const filters: Cat[] = ["All", "Web App", "AI / ML"];
type Project = (typeof projectsData)[number];

/* ─── Magnetic button wrapper ─── */
function MagneticButton({ children, className, style, onClick }: {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    onClick?: () => void;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const sx = useSpring(x, { stiffness: 200, damping: 20 });
    const sy = useSpring(y, { stiffness: 200, damping: 20 });

    const handleMove = (e: React.MouseEvent) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        x.set((e.clientX - cx) * 0.35);
        y.set((e.clientY - cy) * 0.35);
    };
    const handleLeave = () => { x.set(0); y.set(0); };

    return (
        <motion.div
            ref={ref}
            style={{ x: sx, y: sy, display: "inline-block" }}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
        >
            <div className={className} style={style} onClick={onClick}>{children}</div>
        </motion.div>
    );
}

/* ─── Stagger container variants ─── */
const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};
const item = {
    hidden: { opacity: 0, y: 28, filter: "blur(4px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

/* ─── Article row with tilt-on-hover ─── */
function ProjectRow({ p, onClick, index }: { p: Project; onClick: () => void; index: number }) {
    const ref = useRef<HTMLElement>(null);
    const rotX = useMotionValue(0);
    const rotY = useMotionValue(0);
    const srX = useSpring(rotX, { stiffness: 120, damping: 18 });
    const srY = useSpring(rotY, { stiffness: 120, damping: 18 });

    const handleMove = (e: React.MouseEvent) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        rotX.set(-py * 4);
        rotY.set(px * 4);
    };
    const handleLeave = () => { rotX.set(0); rotY.set(0); };

    return (
        <motion.article
            ref={ref as any}
            variants={item}
            onClick={onClick}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            style={{
                rotateX: srX,
                rotateY: srY,
                transformPerspective: 900,
                transformStyle: "preserve-3d",
            }}
            whileHover={{ backgroundColor: "rgba(255,255,255,0.025)" }}
            transition={{ backgroundColor: { duration: 0.2 } }}
            className="py-8 flex items-start justify-between gap-6 group cursor-pointer rounded-xl px-4 -mx-4"
        >
            <div className="flex-1 min-w-0">
                <p className="text-xs mb-2" style={{ ...gm, color: "rgba(255,255,255,0.22)" }}>{p.year}</p>
                <h2 className="font-semibold text-white text-xl mb-1.5 group-hover:text-white/80 transition-colors" style={g}>
                    {p.title}
                </h2>
                <p className="text-sm mb-3" style={{ ...g, color: "rgba(255,255,255,0.38)" }}>{p.desc}</p>
                <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1 text-xs" style={{ ...gm, color: "rgba(255,255,255,0.22)" }}>
                        <Eye className="w-3 h-3" /> {p.views} views
                    </span>
                    {p.tags.slice(0, 2).map(t => (
                        <motion.span
                            key={t}
                            className="px-2.5 py-0.5 rounded-md text-[11px]"
                            style={{ ...gm, backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.3)" }}
                            whileHover={{ scale: 1.08, color: "rgba(255,255,255,0.6)" }}
                            transition={{ duration: 0.15 }}
                        >
                            {t}
                        </motion.span>
                    ))}
                </div>
            </div>
            <motion.div
                className="w-32 h-20 md:w-48 md:h-28 rounded-xl shrink-0 overflow-hidden"
                style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", translateZ: 12 }}
                whileHover={{ scale: 1.04, borderColor: "rgba(255,255,255,0.18)" }}
                transition={{ duration: 0.3, ease: "easeOut" }}
            >
                {p.image ? (
                    <img src={getThumb(p)} alt={p.title} className="w-full h-full object-cover" />
                ) : (
                    <span className="text-xs opacity-30">{p.id}</span>
                )}
            </motion.div>
        </motion.article>
    );
}

export default function ProjectsPage() {
    const [active, setActive] = useState<Cat>("All");
    const [selected, setSelected] = useState<Project | null>(null);

    const close = useCallback(() => setSelected(null), []);

    useEffect(() => {
        if (!selected) return;
        const handler = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
        document.addEventListener("keydown", handler);
        return () => document.removeEventListener("keydown", handler);
    }, [selected, close]);

    useEffect(() => {
        document.body.style.overflow = selected ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [selected]);

    const filtered = active === "All" ? projectsData : projectsData.filter(p => p.category === active);
    const featured = filtered.find(p => p.featured);
    const rest = filtered.filter(p => !p.featured);

    /* ambient cursor glow */
    const cursorX = useMotionValue(0);
    const cursorY = useMotionValue(0);
    useEffect(() => {
        const move = (e: MouseEvent) => { cursorX.set(e.clientX); cursorY.set(e.clientY); };
        window.addEventListener("mousemove", move);
        return () => window.removeEventListener("mousemove", move);
    }, []);

    return (
        <main style={{ backgroundColor: "#0f0f0f", color: "#ededed", minHeight: "100vh", position: "relative", overflow: "hidden" }}>

            {/* Ambient cursor glow */}
            <motion.div
                style={{
                    position: "fixed",
                    top: 0, left: 0,
                    width: 600, height: 600,
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(255,255,255,0.028) 0%, transparent 70%)",
                    pointerEvents: "none",
                    zIndex: 0,
                    x: useTransform(cursorX, v => v - 300),
                    y: useTransform(cursorY, v => v - 300),
                }}
            />

            {/* Header — stagger reveal */}
            <motion.section
                className="px-8 md:px-16 lg:px-24 pt-28 pb-14"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", position: "relative", zIndex: 1 }}
                variants={container}
                initial="hidden"
                animate="show"
            >
                <motion.p variants={item} className="text-xs tracking-[0.25em] uppercase mb-5" style={{ ...gm, color: "rgba(255,255,255,0.25)" }}>
                    Selected Work
                </motion.p>
                <motion.p variants={item} className="text-4xl leading-none mb-1" style={{ ...g, color: "rgba(255,255,255,0.3)" }}>
                    Featured
                </motion.p>
                <motion.h1 variants={item} className="font-bold text-white mb-5" style={{ ...g, fontSize: "clamp(2.2rem,5vw,4rem)", lineHeight: 1.05 }}>
                    Projects &amp; Work
                </motion.h1>
                <motion.p variants={item} className="mb-8 text-sm leading-relaxed" style={{ ...g, color: "rgba(255,255,255,0.38)", maxWidth: "480px" }}>
                    A curated selection — from Machine Learning and Data Science to Website Development. Each built with care and shipped with intention.
                </motion.p>

                {/* Filter pills with layout animation */}
                <motion.div variants={item} className="flex flex-wrap gap-2">
                    <LayoutGroup>
                        {filters.map(f => (
                            <motion.button
                                key={f}
                                layout
                                onClick={() => setActive(f)}
                                className="relative px-4 py-1.5 text-xs rounded-xl transition-colors"
                                style={{
                                    ...g,
                                    border: "1px solid",
                                    borderColor: active === f ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.07)",
                                    color: active === f ? "#fff" : "rgba(255,255,255,0.35)",
                                    backgroundColor: "transparent",
                                }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.96 }}
                            >
                                {active === f && (
                                    <motion.span
                                        layoutId="pill-bg"
                                        className="absolute inset-0 rounded-xl"
                                        style={{ backgroundColor: "rgba(255,255,255,0.08)", zIndex: -1 }}
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    />
                                )}
                                {f}
                            </motion.button>
                        ))}
                    </LayoutGroup>
                </motion.div>
            </motion.section>

            {/* Featured */}
            <AnimatePresence mode="wait">
                {featured && (
                    <motion.section
                        key={featured.id}
                        className="grid grid-cols-1 lg:grid-cols-2"
                        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", minHeight: 480, position: "relative", zIndex: 1 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                        onClick={() => setSelected(featured)}
                    >
                        {/* Left info */}
                        <motion.div
                            className="px-8 md:px-16 lg:px-24 py-14 flex flex-col justify-center cursor-pointer"
                            style={{ borderRight: "1px solid rgba(255,255,255,0.06)" }}
                            variants={container}
                            initial="hidden"
                            animate="show"
                        >
                            <motion.div variants={item} className="flex items-center gap-3 mb-4">
                                <p className="text-[11px]" style={{ ...gm, color: "rgba(255,255,255,0.2)" }}>{featured.id}</p>
                                <motion.span
                                    className="px-2.5 py-0.5 rounded-md text-[11px]"
                                    style={{ ...gm, backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.3)" }}
                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                    transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    Featured
                                </motion.span>
                            </motion.div>

                            <motion.h2 variants={item} className="text-white mb-1" style={{ ...g, fontSize: "clamp(1.4rem,2.5vw,2.2rem)", lineHeight: 1.1 }}>
                                <span className="font-bold">DermaDiff:</span>{" "}
                                <span className="font-normal">
                                    Improving Skin Lesion Classification of Rare Classes via Targeted Synthetic Augmentation with Latent Diffusion and Vision Foundation Models
                                </span>
                            </motion.h2>

                            <motion.p variants={item} className="text-xs tracking-widest uppercase mb-5" style={{ ...gm, color: "rgba(255,255,255,0.25)" }}>
                                {featured.subtitle}
                            </motion.p>

                            <motion.p variants={item} className="text-sm leading-relaxed mb-7" style={{ ...g, color: "rgba(255,255,255,0.4)" }}>
                                {featured.desc}
                            </motion.p>

                            <motion.div variants={item} className="flex flex-wrap gap-2 mb-8">
                                {featured.tags.map((t, i) => (
                                    <motion.span
                                        key={t}
                                        className="px-2.5 py-1 rounded-md text-[11px]"
                                        style={{ ...gm, backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.3)" }}
                                        initial={{ opacity: 0, scale: 0.85 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.35 + i * 0.05, duration: 0.3, ease: "backOut" }}
                                        whileHover={{ scale: 1.1, color: "rgba(255,255,255,0.7)", borderColor: "rgba(255,255,255,0.2)" }}
                                    >
                                        {t}
                                    </motion.span>
                                ))}
                            </motion.div>

                            <motion.div variants={item} className="flex items-center gap-3 mb-5">
                                <MagneticButton
                                    className="flex items-center gap-2 px-4 py-2 text-sm text-white rounded-xl cursor-pointer"
                                    style={{ ...g, backgroundColor: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}
                                >
                                    <ExternalLink className="w-3.5 h-3.5" /> Already Deployed
                                </MagneticButton>
                                <MagneticButton
                                    className="flex items-center gap-2 px-4 py-2 text-sm rounded-xl cursor-pointer"
                                    style={{ ...g, border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.45)" }}
                                >
                                    <Github className="w-3.5 h-3.5" /> Dermadiff GitHub
                                </MagneticButton>
                            </motion.div>

                            <motion.div variants={item} className="flex items-center gap-1.5 text-xs" style={{ ...gm, color: "rgba(255,255,255,0.22)" }}>
                                <Eye className="w-3.5 h-3.5" /> {featured.views} views
                            </motion.div>
                        </motion.div>

                        {/* Right: Stack */}
                        <motion.div
                            className="flex items-center justify-center"
                            style={{ padding: "3.5rem", backgroundColor: "rgba(255,255,255,0.01)" }}
                            initial={{ opacity: 0, x: 40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                        >
                            <div style={{ width: "100%", maxWidth: 460, aspectRatio: "4/3", position: "relative" }}>
                                <Stack
                                    randomRotation={false}
                                    sensitivity={200}
                                    sendToBackOnClick={true}
                                    cards={images.map((src, i) => (
                                        <div key={i} style={{ width: "100%", height: "100%", borderRadius: "16px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)", background: "#111" }}>
                                            <img src={src} alt={`preview-${i}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                        </div>
                                    ))}
                                    autoplay={false}
                                    autoplayDelay={3000}
                                    pauseOnHover={true}
                                />
                            </div>
                        </motion.div>
                    </motion.section>
                )}
            </AnimatePresence>

            {/* Project list */}
            <section className="px-8 md:px-16 lg:px-24 py-14" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", position: "relative", zIndex: 1 }}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={active}
                        className="flex flex-col divide-y"
                        style={{ borderColor: "rgba(255,255,255,0.06)" }}
                        variants={container}
                        initial="hidden"
                        animate="show"
                        exit={{ opacity: 0, transition: { duration: 0.15 } }}
                    >
                        {rest.map((p, i) => (
                            <ProjectRow key={p.id} p={p} onClick={() => setSelected(p)} index={i} />
                        ))}
                    </motion.div>
                </AnimatePresence>
            </section>

            <motion.footer
                className="px-8 md:px-16 lg:px-24 py-6 flex flex-col sm:flex-row items-center justify-between gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
            >
                <p style={{ ...gm, fontSize: "11px", color: "rgba(255,255,255,0.18)" }}>© 2024 Farel Febryan · {projectsData.length} projects</p>
                <p style={{ ...gm, fontSize: "11px", color: "rgba(255,255,255,0.18)" }}>Made with precision ✦</p>
            </motion.footer>

            {/* ── Modal ── */}
            <AnimatePresence>
                {selected && (
                    <motion.div
                        className="fixed inset-0 flex items-center justify-center p-4"
                        style={{ zIndex: 9999 }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {/* Backdrop */}
                        <motion.div
                            className="absolute inset-0"
                            style={{ backgroundColor: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)" }}
                            onClick={close}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                        />

                        {/* Modal card */}
                        <motion.div
                            className="relative w-full max-w-3xl rounded-2xl overflow-hidden overflow-y-auto"
                            style={{
                                backgroundColor: "#161616",
                                border: "1px solid rgba(255,255,255,0.08)",
                                boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
                                zIndex: 10000,
                                maxHeight: "90vh",
                            }}
                            initial={{ opacity: 0, scale: 0.93, y: 32, filter: "blur(6px)" }}
                            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                            exit={{ opacity: 0, scale: 0.95, y: 18, filter: "blur(4px)" }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Hero image with parallax shimmer */}
                            {selected.image ? (
                                <motion.div
                                    className="w-full h-56 md:h-72 overflow-hidden"
                                    style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
                                    initial={{ scale: 1.08 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                >
                                    <img src={getThumb(selected)} alt={selected.title} className="w-full h-full object-cover" />
                                    {/* shimmer overlay */}
                                    <motion.div
                                        className="absolute inset-0"
                                        style={{ background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.06) 50%, transparent 60%)", backgroundSize: "200% 100%" }}
                                        initial={{ backgroundPositionX: "-100%" }}
                                        animate={{ backgroundPositionX: "200%" }}
                                        transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
                                    />
                                </motion.div>
                            ) : (
                                <div className="w-full h-56 md:h-72 flex items-center justify-center" style={{ backgroundColor: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                                    <span className="text-3xl font-bold" style={{ ...gm, color: "rgba(255,255,255,0.1)" }}>{selected.id}</span>
                                </div>
                            )}

                            {/* Close button */}
                            <motion.button
                                onClick={close}
                                className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full"
                                style={{ backgroundColor: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
                                whileHover={{ scale: 1.15, backgroundColor: "rgba(255,255,255,0.15)" }}
                                whileTap={{ scale: 0.9 }}
                                initial={{ opacity: 0, rotate: -90 }}
                                animate={{ opacity: 1, rotate: 0 }}
                                transition={{ delay: 0.2, duration: 0.3 }}
                            >
                                <X className="w-4 h-4 text-white/70" />
                            </motion.button>

                            {/* Content — staggered */}
                            <motion.div
                                className="p-6 md:p-8"
                                variants={container}
                                initial="hidden"
                                animate="show"
                            >
                                <motion.div variants={item} className="flex items-center gap-3 mb-3">
                                    <span className="text-[11px]" style={{ ...gm, color: "rgba(255,255,255,0.25)" }}>{selected.id}</span>
                                    <span className="px-2.5 py-0.5 rounded-md text-[11px]"
                                        style={{ ...gm, backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.35)" }}>
                                        {selected.category}
                                    </span>
                                    <span className="text-[11px]" style={{ ...gm, color: "rgba(255,255,255,0.2)" }}>{selected.year}</span>
                                </motion.div>

                                <motion.h3 variants={item} className="font-bold text-white text-xl md:text-2xl mb-1" style={g}>{selected.title}</motion.h3>
                                <motion.p variants={item} className="text-xs tracking-widest uppercase mb-4" style={{ ...gm, color: "rgba(255,255,255,0.25)" }}>
                                    {selected.subtitle}
                                </motion.p>
                                <motion.p variants={item} className="text-sm leading-relaxed mb-5" style={{ ...g, color: "rgba(255,255,255,0.45)" }}>
                                    {selected.desc}
                                </motion.p>

                                <motion.div variants={item} className="flex flex-wrap gap-2 mb-6">
                                    {selected.tags.map((t, i) => {
                                        const colors = [
                                            { bg: "rgba(34,197,94,0.12)", border: "rgba(34,197,94,0.25)", text: "#4ade80" },
                                            { bg: "rgba(234,179,8,0.12)", border: "rgba(234,179,8,0.25)", text: "#facc15" },
                                            { bg: "rgba(59,130,246,0.12)", border: "rgba(59,130,246,0.25)", text: "#60a5fa" },
                                        ];
                                        const c = colors[i % 3];
                                        return (
                                            <motion.span
                                                key={t}
                                                className="px-2.5 py-1 rounded-md text-[11px]"
                                                style={{ ...gm, backgroundColor: c.bg, border: `1px solid ${c.border}`, color: c.text }}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: 0.25 + i * 0.06, duration: 0.28, ease: "backOut" }}
                                                whileHover={{ scale: 1.1 }}
                                            >
                                                {t}
                                            </motion.span>
                                        );
                                    })}
                                </motion.div>

                                <motion.div variants={item} className="flex items-center gap-1.5 text-xs mb-6" style={{ ...gm, color: "rgba(255,255,255,0.22)" }}>
                                    <Eye className="w-3.5 h-3.5" /> {selected.views} views
                                </motion.div>

                                <motion.div variants={item} className="flex items-center gap-3">
                                    <Link href={`/projects/${selected.id}`}>
                                        <motion.span
                                            className="flex items-center gap-2 px-5 py-2.5 text-sm text-white rounded-xl cursor-pointer"
                                            style={{ ...g, backgroundColor: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)" }}
                                            whileHover={{ backgroundColor: "rgba(255,255,255,0.16)", x: 2 }}
                                            whileTap={{ scale: 0.97 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            View Full Details <motion.span animate={{ x: [0, 3, 0] }} transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}>
                                                <ArrowRight className="w-3.5 h-3.5" />
                                            </motion.span>
                                        </motion.span>
                                    </Link>
                                    <motion.button
                                        className="flex items-center gap-2 px-4 py-2.5 text-sm rounded-xl"
                                        style={{ ...g, border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.45)" }}
                                        whileHover={{ backgroundColor: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.7)" }}
                                        whileTap={{ scale: 0.97 }}
                                        transition={{ duration: 0.18 }}
                                    >
                                        <Github className="w-3.5 h-3.5" /> Source
                                    </motion.button>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}