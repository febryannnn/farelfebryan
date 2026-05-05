"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Calendar, MapPin, Award, X, Briefcase } from "lucide-react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform, LayoutGroup } from "motion/react";
import Stack from "@/components/Stack";

const g = { fontFamily: "var(--font-geist), sans-serif" } as const;
const gm = { fontFamily: "var(--font-geist-mono), monospace" } as const;

type Cat = "All" | "Work" | "Competition" | "Organization";
const filters: Cat[] = ["All", "Work", "Competition", "Organization"];

const toImageArray = (img: string | string[] | undefined): string[] => {
    if (!img) return [];
    return Array.isArray(img) ? img : [img];
};

const experiences = [
    {
        id: "02",
        featured: true,
        title: "2nd Winner ICON 3.0 by Pelindo Solusi Digital",
        subtitle: "National Competition",
        role: "Team Lead & Developer",
        organization: "Pelindo Solusi Digital",
        location: "Jakarta, Indonesia",
        period: "2024",
        desc: "Secured 2nd place in the national-level ICON 3.0 competition organized by Pelindo Solusi Digital. Designed and developed an innovative digital solution addressing real-world port logistics and operational challenges.",
        category: "Competition" as Cat,
        tags: ["Innovation", "Digital Solution", "Teamwork"],
        year: "2024",
        achievement: "🥈 2nd Place — National",
        image: ["/pelindo-2.JPEG", "/pelindo-3.JPG", "/pelindo-1.JPG", "/pelindo-6.jpeg"] as string | string[],
    },
    {
        id: "03",
        featured: false,
        title: "Bronze Medal ISIF Teknofest Istanbul 2023",
        subtitle: "International Competition",
        role: "Inventor & Presenter",
        organization: "Istanbul International Inventions Fair",
        location: "Istanbul, Turkey",
        period: "2023",
        desc: "Awarded a Bronze Medal at the Istanbul International Inventions Fair (ISIF) 2023, representing Indonesia on a global stage with an innovative project recognized for its creativity and real-world impact.",
        category: "Competition" as Cat,
        tags: ["International", "Innovation", "Research"],
        year: "2023",
        achievement: "🥉 Bronze Medal — International",
        image: ["/isif-1.jpeg", "/isif-2.jpeg", "/isif-3.jpeg", "/isif-4.jpeg"] as string | string[],
    },
    {
        id: "07",
        featured: false,
        title: "Bronze Medal Indonesian Youth STEM Challenge",
        subtitle: "National Competition",
        role: "3rd Winner",
        organization: "IYSC",
        location: "Bandung, West Java, Indonesia",
        period: "2023",
        desc: "Awarded a Bronze Medal at the Indonesian Youth STEM Challenge 2023, held by ISS and SEAQIS",
        category: "Competition" as Cat,
        tags: ["National", "Physics", "Bridge Challenge"],
        year: "2023",
        achievement: "🥉 Bronze Medal — National",
        image: ["bandung.jpg"] as string | string[],
    },
    {
        id: "01",
        featured: false,
        title: "Teaching Assistant",
        subtitle: "Academic Mentor",
        role: "Teaching Assistant",
        organization: "Institut Teknologi Sepuluh Nopember",
        location: "Surabaya, Indonesia",
        period: "2024 — Present",
        desc: "Assisted lecturers in delivering course materials, guided students through programming exercises, evaluated assignments, and held weekly mentoring sessions to help students grasp complex concepts in computer science.",
        category: "Work" as Cat,
        tags: ["Mentoring", "Programming", "Education"],
        year: "2024",
        achievement: "Mentored 60+ students",
        image: ["./asdos-1.png", "./komnum-1.png", "./asdos-2.png", "./komnum-2.png", "./asdos-3.png", "./komnum-3.png"] as string | string[],
    },
    {
        id: "04",
        featured: false,
        title: "External Staff HMTC Niat Baik",
        subtitle: "Student Organization",
        role: "External Relations Staff",
        organization: "HMTC ITS",
        location: "Surabaya, Indonesia",
        period: "2026 - Present",
        desc: "Served as external staff for HMTC (Computer Engineering Student Association), handle external benchmarking and support strategic collaborations in the External Bureau.",
        category: "Organization" as Cat,
        tags: ["Leadership", "Partnership", "Communication"],
        year: "2023",
        achievement: "",
        image: ["/hmtcxhmpl.jpeg", "ea-benchmark-internal.jpeg", "/ea-2.JPG", "/ea-1.jpeg"] as string | string[],
    },
    {
        id: "05",
        featured: false,
        title: "Schematics NLC Staff",
        subtitle: "Student Organization",
        role: "Technical Subdivision Staff",
        organization: "Schematics",
        location: "Surabaya, Indonesia",
        period: "2025",
        desc: "Responsible as a member of the Technical Subdivision Staff for NLC 2025, with approximately 1,000 teams (around 3,000 participants) competing in the event.",
        category: "Organization" as Cat,
        tags: ["Leadership", "Partnership", "Communication"],
        year: "2023",
        achievement: "",
        image: ["/nlc-1.jpeg", "/nlc-2.jpeg", "/nlc-3.jpeg"] as string | string[],
    },
    {
        id: "06",
        featured: false,
        title: "Vice Project Officer ASTEC 2023",
        subtitle: "Student Organization",
        role: "VPO 3",
        organization: "ASTEC",
        location: "Surabaya, Indonesia",
        period: "2023",
        desc: "ASTEC 2023 is an annual event organized by Al Hikmah Senior High School Surabaya, providing a platform for junior and senior high school students across Indonesia to showcase their talents in sports, reasoning, business, and arts. The event also featured a talk show, FilmTalk, with Bayu Skak as the speaker, attended by over 250 participants.",
        category: "Organization" as Cat,
        tags: ["Leadership", "Partnership", "Communication"],
        year: "2023",
        achievement: "",
        image: ["bayuskak1.jpg", "bayuskak2.jpg", "bayuskak3.jpg", "bayuskak4.jpg"] as string | string[],
    },
];

type Experience = (typeof experiences)[number];

/* ─── Stagger variants ─── */
const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};
const item = {
    hidden: { opacity: 0, y: 28, filter: "blur(4px)" },
    show: {
        opacity: 1, y: 0, filter: "blur(0px)",
        transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    },
};

/* ─── Magnetic button ─── */
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
        x.set((e.clientX - (rect.left + rect.width / 2)) * 0.35);
        y.set((e.clientY - (rect.top + rect.height / 2)) * 0.35);
    };
    const handleLeave = () => { x.set(0); y.set(0); };

    return (
        <motion.div ref={ref} style={{ x: sx, y: sy, display: "inline-block" }}
            onMouseMove={handleMove} onMouseLeave={handleLeave}>
            <div className={className} style={style} onClick={onClick}>{children}</div>
        </motion.div>
    );
}

/* ─── Experience row with 3-D tilt ─── */
function ExperienceRow({ p, onClick }: { p: Experience; onClick: () => void }) {
    const ref = useRef<HTMLElement>(null);
    const rotX = useMotionValue(0);
    const rotY = useMotionValue(0);
    const srX = useSpring(rotX, { stiffness: 120, damping: 18 });
    const srY = useSpring(rotY, { stiffness: 120, damping: 18 });

    const imgs = toImageArray(p.image);
    const thumb = imgs[0];

    const handleMove = (e: React.MouseEvent) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        rotX.set(-((e.clientY - rect.top) / rect.height - 0.5) * 4);
        rotY.set(((e.clientX - rect.left) / rect.width - 0.5) * 4);
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
                <p className="text-xs mb-2" style={{ ...gm, color: "rgba(255,255,255,0.22)" }}>{p.period}</p>
                <h2 className="font-semibold text-white text-xl mb-1.5 group-hover:text-white/80 transition-colors" style={g}>
                    {p.title}
                </h2>
                <p className="text-sm mb-3" style={{ ...g, color: "rgba(255,255,255,0.38)" }}>{p.desc}</p>
                <div className="flex items-center flex-wrap gap-4">
                    {p.achievement && (
                        <span className="flex items-center gap-1 text-xs" style={{ ...gm, color: "rgba(255,255,255,0.35)" }}>
                            <Award className="w-3 h-3" /> {p.achievement}
                        </span>
                    )}
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
                className="w-32 h-20 md:w-48 md:h-28 rounded-xl shrink-0 overflow-hidden flex items-center justify-center"
                style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", translateZ: 12 }}
                whileHover={{ scale: 1.04, borderColor: "rgba(255,255,255,0.18)" }}
                transition={{ duration: 0.3, ease: "easeOut" }}
            >
                {thumb ? (
                    <img src={thumb} alt={p.title} className="w-full h-full object-cover" draggable={false} />
                ) : (
                    <Briefcase className="w-8 h-8" style={{ color: "rgba(255,255,255,0.15)" }} />
                )}
            </motion.div>
        </motion.article>
    );
}

export default function ExperiencePage() {
    const [active, setActive] = useState<Cat>("All");
    const [selected, setSelected] = useState<Experience | null>(null);
    const [modalImgIdx, setModalImgIdx] = useState(0);

    const close = useCallback(() => setSelected(null), []);

    useEffect(() => {
        if (!selected) return;
        setModalImgIdx(0);
        const imgs = toImageArray(selected.image);
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") close();
            if (e.key === "ArrowRight" && imgs.length > 1) setModalImgIdx(i => (i < imgs.length - 1 ? i + 1 : 0));
            if (e.key === "ArrowLeft" && imgs.length > 1) setModalImgIdx(i => (i > 0 ? i - 1 : imgs.length - 1));
        };
        document.addEventListener("keydown", handler);
        return () => document.removeEventListener("keydown", handler);
    }, [selected, close]);

    useEffect(() => {
        document.body.style.overflow = selected ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [selected]);

    const filtered = active === "All" ? experiences : experiences.filter(p => p.category === active);
    const featured = filtered.find(p => p.featured);
    const rest = filtered.filter(p => !p.featured);
    const featuredImages = featured ? toImageArray(featured.image) : [];
    const selectedImages = selected ? toImageArray(selected.image) : [];

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
                    position: "fixed", top: 0, left: 0,
                    width: 600, height: 600, borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(255,255,255,0.028) 0%, transparent 70%)",
                    pointerEvents: "none", zIndex: 0,
                    x: useTransform(cursorX, v => v - 300),
                    y: useTransform(cursorY, v => v - 300),
                }}
            />

            {/* Header */}
            <motion.section
                className="px-8 md:px-16 lg:px-24 pt-28 pb-14"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", position: "relative", zIndex: 1 }}
                variants={container}
                initial="hidden"
                animate="show"
            >
                <motion.p variants={item} className="text-xs tracking-[0.25em] uppercase mb-5" style={{ ...gm, color: "rgba(255,255,255,0.25)" }}>
                    My Journey
                </motion.p>
                <motion.p variants={item} className="text-4xl leading-none mb-1" style={{ ...g, color: "rgba(255,255,255,0.3)" }}>
                    Professional
                </motion.p>
                <motion.h1 variants={item} className="font-bold text-white mb-5" style={{ ...g, fontSize: "clamp(2.2rem,5vw,4rem)", lineHeight: 1.05 }}>
                    Experience, Awards, and Organization
                </motion.h1>
                <motion.p variants={item} className="mb-8 text-sm leading-relaxed" style={{ ...g, color: "rgba(255,255,255,0.38)", maxWidth: "480px" }}>
                    A timeline of work, achievements, and contributions — from teaching and organizational leadership to national and international recognitions.
                </motion.p>

                {/* Filter pills with shared layout indicator */}
                <motion.div variants={item} className="flex flex-wrap gap-2">
                    <LayoutGroup>
                        {filters.map(f => (
                            <motion.button
                                key={f}
                                layout
                                onClick={() => setActive(f)}
                                className="relative px-4 py-1.5 text-xs rounded-xl"
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
                                        layoutId="exp-pill-bg"
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
                        className="grid grid-cols-1 lg:grid-cols-2 cursor-pointer"
                        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", minHeight: 480, position: "relative", zIndex: 1 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                        onClick={() => setSelected(featured)}
                    >
                        {/* Left info */}
                        <motion.div
                            className="px-8 md:px-16 lg:px-24 py-14 flex flex-col justify-center"
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

                            <motion.h2 variants={item} className="font-bold text-white mb-1"
                                style={{ ...g, fontSize: "clamp(1.8rem,3.5vw,2.8rem)", lineHeight: 1.1 }}>
                                {featured.title}
                            </motion.h2>
                            <motion.p variants={item} className="text-xs tracking-widest uppercase mb-5" style={{ ...gm, color: "rgba(255,255,255,0.25)" }}>
                                {featured.subtitle}
                            </motion.p>
                            <motion.p variants={item} className="text-sm leading-relaxed mb-7" style={{ ...g, color: "rgba(255,255,255,0.4)" }}>
                                {featured.desc}
                            </motion.p>

                            <motion.div variants={item} className="flex flex-col gap-2 mb-6">
                                {[
                                    { icon: <Briefcase className="w-3.5 h-3.5" />, text: featured.organization },
                                    { icon: <MapPin className="w-3.5 h-3.5" />, text: featured.location },
                                    { icon: <Calendar className="w-3.5 h-3.5" />, text: featured.period },
                                ].map(({ icon, text }, i) => (
                                    <motion.div
                                        key={i}
                                        className="flex items-center gap-2 text-xs"
                                        style={{ ...gm, color: "rgba(255,255,255,0.35)" }}
                                        initial={{ opacity: 0, x: -12 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3 + i * 0.07, duration: 0.35 }}
                                    >
                                        {icon} {text}
                                    </motion.div>
                                ))}
                            </motion.div>

                            <motion.div variants={item} className="flex flex-wrap gap-2 mb-8">
                                {featured.tags.map((t, i) => (
                                    <motion.span
                                        key={t}
                                        className="px-2.5 py-1 rounded-md text-[11px]"
                                        style={{ ...gm, backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.3)" }}
                                        initial={{ opacity: 0, scale: 0.85 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.4 + i * 0.05, duration: 0.3, ease: "backOut" }}
                                        whileHover={{ scale: 1.1, color: "rgba(255,255,255,0.7)", borderColor: "rgba(255,255,255,0.2)" }}
                                    >
                                        {t}
                                    </motion.span>
                                ))}
                            </motion.div>

                            {featured.achievement && (
                                <motion.div variants={item} className="flex items-center gap-1.5 text-xs" style={{ ...gm, color: "rgba(255,255,255,0.35)" }}>
                                    <Award className="w-3.5 h-3.5" /> {featured.achievement}
                                </motion.div>
                            )}
                        </motion.div>

                        {/* Right: Stack / image */}
                        <motion.div
                            className="flex items-center justify-center"
                            style={{ padding: "3.5rem", backgroundColor: "rgba(255,255,255,0.01)" }}
                            initial={{ opacity: 0, x: 40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                            onClick={e => { if (featuredImages.length > 1) e.stopPropagation(); }}
                        >
                            <div style={{ width: "100%", maxWidth: 460, aspectRatio: "4/3", position: "relative" }}>
                                {featuredImages.length > 1 ? (
                                    <Stack
                                        randomRotation={false}
                                        sensitivity={200}
                                        sendToBackOnClick={true}
                                        autoplay={false}
                                        autoplayDelay={3000}
                                        pauseOnHover={true}
                                        cards={featuredImages.map((src, i) => (
                                            <div key={i} style={{ width: "100%", height: "100%", borderRadius: "16px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)", background: "#111" }}>
                                                <img src={src} alt={`${featured.title}-${i}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} draggable={false} />
                                            </div>
                                        ))}
                                    />
                                ) : featuredImages.length === 1 ? (
                                    <div style={{ width: "100%", height: "100%", borderRadius: "16px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)", background: "#111" }}>
                                        <img src={featuredImages[0]} alt={featured.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} draggable={false} />
                                    </div>
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <Briefcase className="w-16 h-16" style={{ color: "rgba(255,255,255,0.1)" }} />
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.section>
                )}
            </AnimatePresence>

            {/* Experience list */}
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
                        {rest.map(p => (
                            <ExperienceRow key={p.id} p={p} onClick={() => setSelected(p)} />
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
                <p style={{ ...gm, fontSize: "11px", color: "rgba(255,255,255,0.18)" }}>© 2024 Farel Febryan · {experiences.length} experiences</p>
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
                            onClick={e => e.stopPropagation()}
                        >
                            {/* Image carousel */}
                            {selectedImages.length > 0 ? (
                                <motion.div
                                    className="relative w-full overflow-hidden select-none"
                                    style={{
                                        aspectRatio: "16 / 9",
                                        backgroundColor: "#0b0b0b",
                                        borderBottom: "1px solid rgba(255,255,255,0.06)",
                                        touchAction: "pan-y",
                                    }}
                                    initial={{ scale: 1.06 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 0.45, ease: "easeOut" }}
                                >
                                    <AnimatePresence initial={false} mode="wait">
                                        <motion.img
                                            key={modalImgIdx}
                                            src={selectedImages[modalImgIdx]}
                                            alt={selected.title}
                                            className="absolute inset-0 w-full h-full object-contain"
                                            draggable={false}
                                            initial={{ opacity: 0, scale: 1.04 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.97 }}
                                            transition={{ duration: 0.25 }}
                                            drag={selectedImages.length > 1 ? "x" : false}
                                            dragConstraints={{ left: 0, right: 0 }}
                                            dragElastic={0.2}
                                            onDragEnd={(_, info) => {
                                                if (info.offset.x < -60 && modalImgIdx < selectedImages.length - 1) setModalImgIdx(i => i + 1);
                                                else if (info.offset.x > 60 && modalImgIdx > 0) setModalImgIdx(i => i - 1);
                                            }}
                                        />
                                    </AnimatePresence>

                                    {/* Shimmer on open */}
                                    <motion.div
                                        className="absolute inset-0 pointer-events-none"
                                        style={{ background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.06) 50%, transparent 60%)", backgroundSize: "200% 100%" }}
                                        initial={{ backgroundPositionX: "-100%" }}
                                        animate={{ backgroundPositionX: "200%" }}
                                        transition={{ duration: 0.7, delay: 0.05, ease: "easeOut" }}
                                    />

                                    {/* Prev / Next */}
                                    {selectedImages.length > 1 && (
                                        <>
                                            <motion.button
                                                onClick={e => { e.stopPropagation(); setModalImgIdx(i => i > 0 ? i - 1 : selectedImages.length - 1); }}
                                                className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full"
                                                style={{ backgroundColor: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
                                                whileHover={{ scale: 1.15, backgroundColor: "rgba(255,255,255,0.15)" }}
                                                whileTap={{ scale: 0.9 }}
                                            >
                                                <span className="text-white/80 text-lg leading-none">‹</span>
                                            </motion.button>
                                            <motion.button
                                                onClick={e => { e.stopPropagation(); setModalImgIdx(i => i < selectedImages.length - 1 ? i + 1 : 0); }}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full"
                                                style={{ backgroundColor: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
                                                whileHover={{ scale: 1.15, backgroundColor: "rgba(255,255,255,0.15)" }}
                                                whileTap={{ scale: 0.9 }}
                                            >
                                                <span className="text-white/80 text-lg leading-none">›</span>
                                            </motion.button>
                                        </>
                                    )}

                                    {/* Dots */}
                                    {selectedImages.length > 1 && (
                                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
                                            {selectedImages.map((_, i) => (
                                                <motion.button
                                                    key={i}
                                                    onClick={e => { e.stopPropagation(); setModalImgIdx(i); }}
                                                    className="rounded-full"
                                                    animate={{
                                                        width: i === modalImgIdx ? 20 : 6,
                                                        backgroundColor: i === modalImgIdx ? "#fff" : "rgba(255,255,255,0.4)",
                                                    }}
                                                    style={{ height: 6 }}
                                                    transition={{ duration: 0.25, ease: "easeOut" }}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </motion.div>
                            ) : (
                                <div className="relative w-full flex items-center justify-center"
                                    style={{ aspectRatio: "16 / 9", backgroundColor: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                                    <Briefcase className="w-16 h-16" style={{ color: "rgba(255,255,255,0.1)" }} />
                                </div>
                            )}

                            {/* Close */}
                            <motion.button
                                onClick={close}
                                className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full"
                                style={{ backgroundColor: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)", zIndex: 10 }}
                                whileHover={{ scale: 1.15, backgroundColor: "rgba(255,255,255,0.15)" }}
                                whileTap={{ scale: 0.9 }}
                                initial={{ opacity: 0, rotate: -90 }}
                                animate={{ opacity: 1, rotate: 0 }}
                                transition={{ delay: 0.2, duration: 0.3 }}
                            >
                                <X className="w-4 h-4 text-white/70" />
                            </motion.button>

                            {/* Content */}
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
                                    <span className="text-[11px]" style={{ ...gm, color: "rgba(255,255,255,0.2)" }}>{selected.period}</span>
                                </motion.div>

                                <motion.h3 variants={item} className="font-bold text-white text-xl md:text-2xl mb-1" style={g}>{selected.title}</motion.h3>
                                <motion.p variants={item} className="text-xs tracking-widest uppercase mb-4" style={{ ...gm, color: "rgba(255,255,255,0.25)" }}>
                                    {selected.subtitle}
                                </motion.p>
                                <motion.p variants={item} className="text-sm leading-relaxed mb-5" style={{ ...g, color: "rgba(255,255,255,0.45)" }}>
                                    {selected.desc}
                                </motion.p>

                                <motion.div variants={item} className="flex flex-col gap-2 mb-5">
                                    {[
                                        { icon: <Briefcase className="w-3.5 h-3.5" />, text: `${selected.role} · ${selected.organization}` },
                                        { icon: <MapPin className="w-3.5 h-3.5" />, text: selected.location },
                                    ].map(({ icon, text }, i) => (
                                        <div key={i} className="flex items-center gap-2 text-xs" style={{ ...gm, color: "rgba(255,255,255,0.4)" }}>
                                            {icon} {text}
                                        </div>
                                    ))}
                                </motion.div>

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

                                {selected.achievement && (
                                    <motion.div variants={item} className="flex items-center gap-1.5 text-xs" style={{ ...gm, color: "rgba(255,255,255,0.35)" }}>
                                        <Award className="w-3.5 h-3.5" /> {selected.achievement}
                                    </motion.div>
                                )}
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}