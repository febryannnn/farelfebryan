"use client";

import { useState, useEffect, useCallback } from "react";
import { Calendar, MapPin, Award, X, Briefcase } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Stack from "@/components/Stack";

const g = { fontFamily: "var(--font-geist), sans-serif" } as const;
const gm = { fontFamily: "var(--font-geist-mono), monospace" } as const;

type Cat = "All" | "Work" | "Competition" | "Organization";
const filters: Cat[] = ["All", "Work", "Competition", "Organization"];

// Helper: normalize image field (string or array) into an array
const toImageArray = (img: string | string[] | undefined): string[] => {
    if (!img) return [];
    return Array.isArray(img) ? img : [img];
};

const experiences = [
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
        title: "ISIF Turkey 2023 — Bronze Medal",
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
        id: "04",
        featured: false,
        title: "External Staff HMTC & Schematics NLC Staff",
        subtitle: "Student Organization",
        role: "External Relations Staff",
        organization: "HMTC ITS & Schematics",
        location: "Surabaya, Indonesia",
        period: "2023 — 2024",
        desc: "Served as external staff for HMTC (Computer Engineering Student Association) and Schematics, managing partnerships, sponsorships, and stakeholder communication for major faculty events and national-scale tech competitions.",
        category: "Organization" as Cat,
        tags: ["Leadership", "Partnership", "Communication"],
        year: "2023",
        achievement: "Managed 15+ partnerships",
        image: ["/ea-2.JPG", "/ea-1.jpeg", "/nlc-1.jpeg", "/nlc-2.jpeg", "/nlc-3.jpeg"] as string | string[],
    },
];

type Experience = (typeof experiences)[number];

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
            if (e.key === "ArrowRight" && imgs.length > 1) {
                setModalImgIdx((i) => (i < imgs.length - 1 ? i + 1 : 0));
            }
            if (e.key === "ArrowLeft" && imgs.length > 1) {
                setModalImgIdx((i) => (i > 0 ? i - 1 : imgs.length - 1));
            }
        };
        document.addEventListener("keydown", handler);
        return () => document.removeEventListener("keydown", handler);
    }, [selected, close]);

    useEffect(() => {
        if (selected) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "";
        return () => { document.body.style.overflow = ""; };
    }, [selected]);

    const filtered = active === "All" ? experiences : experiences.filter(p => p.category === active);
    const featured = filtered.find(p => p.featured);
    const rest = filtered.filter(p => !p.featured);

    const featuredImages = featured ? toImageArray(featured.image) : [];
    const selectedImages = selected ? toImageArray(selected.image) : [];

    return (
        <main style={{ backgroundColor: "#0f0f0f", color: "#ededed", minHeight: "100vh" }}>

            {/* Header */}
            <section className="px-8 md:px-16 lg:px-24 pt-28 pb-14" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <p className="text-xs tracking-[0.25em] uppercase mb-5" style={{ ...gm, color: "rgba(255,255,255,0.25)" }}>My Journey</p>
                <p className="text-4xl leading-none mb-1" style={{ ...g, color: "rgba(255,255,255,0.3)" }}>Professional</p>
                <h1 className="font-bold text-white mb-5" style={{ ...g, fontSize: "clamp(2.2rem,5vw,4rem)", lineHeight: 1.05 }}>
                    Experience &amp; Awards
                </h1>
                <p className="mb-8 text-sm leading-relaxed" style={{ ...g, color: "rgba(255,255,255,0.38)", maxWidth: "480px" }}>
                    A timeline of work, achievements, and contributions — from teaching and organizational leadership to national and international recognitions.
                </p>
                <div className="flex flex-wrap gap-2">
                    {filters.map(f => (
                        <button
                            key={f}
                            onClick={() => setActive(f)}
                            className="px-4 py-1.5 text-xs rounded-xl transition-all"
                            style={{
                                ...g,
                                border: "1px solid",
                                borderColor: active === f ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.07)",
                                backgroundColor: active === f ? "rgba(255,255,255,0.08)" : "transparent",
                                color: active === f ? "#fff" : "rgba(255,255,255,0.35)",
                            }}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </section>

            {/* Featured */}
            {featured && (
                <section
                    className="grid grid-cols-1 lg:grid-cols-2 cursor-pointer"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", minHeight: 480 }}
                    onClick={() => setSelected(featured)}
                >
                    {/* Left: info */}
                    <div
                        className="px-8 md:px-16 lg:px-24 py-14 flex flex-col justify-center"
                        style={{ borderRight: "1px solid rgba(255,255,255,0.06)" }}
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <p className="text-[11px]" style={{ ...gm, color: "rgba(255,255,255,0.2)" }}>{featured.id}</p>
                            <span className="px-2.5 py-0.5 rounded-md text-[11px]"
                                style={{ ...gm, backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.3)" }}>
                                Featured
                            </span>
                        </div>
                        <h2 className="font-bold text-white mb-1"
                            style={{ ...g, fontSize: "clamp(1.8rem,3.5vw,2.8rem)", lineHeight: 1.1 }}>
                            {featured.title}
                        </h2>
                        <p className="text-xs tracking-widest uppercase mb-5"
                            style={{ ...gm, color: "rgba(255,255,255,0.25)" }}>
                            {featured.subtitle}
                        </p>
                        <p className="text-sm leading-relaxed mb-7" style={{ ...g, color: "rgba(255,255,255,0.4)" }}>
                            {featured.desc}
                        </p>

                        {/* Meta info */}
                        <div className="flex flex-col gap-2 mb-6">
                            <div className="flex items-center gap-2 text-xs" style={{ ...gm, color: "rgba(255,255,255,0.35)" }}>
                                <Briefcase className="w-3.5 h-3.5" /> {featured.organization}
                            </div>
                            <div className="flex items-center gap-2 text-xs" style={{ ...gm, color: "rgba(255,255,255,0.35)" }}>
                                <MapPin className="w-3.5 h-3.5" /> {featured.location}
                            </div>
                            <div className="flex items-center gap-2 text-xs" style={{ ...gm, color: "rgba(255,255,255,0.35)" }}>
                                <Calendar className="w-3.5 h-3.5" /> {featured.period}
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-8">
                            {featured.tags.map(t => (
                                <span key={t} className="px-2.5 py-1 rounded-md text-[11px]"
                                    style={{ ...gm, backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.3)" }}>
                                    {t}
                                </span>
                            ))}
                        </div>

                        <div className="flex items-center gap-1.5 text-xs" style={{ ...gm, color: "rgba(255,255,255,0.35)" }}>
                            <Award className="w-3.5 h-3.5" /> {featured.achievement}
                        </div>
                    </div>

                    {/* Right: image(s) */}
                    <div
                        className="flex items-center justify-center"
                        style={{
                            padding: "3.5rem",
                            backgroundColor: "rgba(255,255,255,0.01)",
                        }}
                        onClick={(e) => {
                            if (featuredImages.length > 1) e.stopPropagation();
                        }}
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
                                        <div
                                            key={i}
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                borderRadius: "16px",
                                                overflow: "hidden",
                                                border: "1px solid rgba(255,255,255,0.1)",
                                                background: "#111",
                                            }}
                                        >
                                            <img
                                                src={src}
                                                alt={`${featured.title}-${i}`}
                                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                                draggable={false}
                                            />
                                        </div>
                                    ))}
                                />
                            ) : featuredImages.length === 1 ? (
                                <div
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        borderRadius: "16px",
                                        overflow: "hidden",
                                        border: "1px solid rgba(255,255,255,0.1)",
                                        background: "#111",
                                    }}
                                >
                                    <img
                                        src={featuredImages[0]}
                                        alt={featured.title}
                                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                        draggable={false}
                                    />
                                </div>
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <Briefcase className="w-16 h-16" style={{ color: "rgba(255,255,255,0.1)" }} />
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            )}

            {/* Experience list */}
            <section className="px-8 md:px-16 lg:px-24 py-14" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="flex flex-col divide-y" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                    {rest.map(p => {
                        const imgs = toImageArray(p.image);
                        const thumb = imgs[0];
                        return (
                            <article
                                key={p.id}
                                onClick={() => setSelected(p)}
                                className="py-8 flex items-start justify-between gap-6 group cursor-pointer"
                            >
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs mb-2" style={{ ...gm, color: "rgba(255,255,255,0.22)" }}>{p.period}</p>
                                    <h2 className="font-semibold text-white text-xl mb-1.5 group-hover:text-white/80 transition-colors" style={g}>
                                        {p.title}
                                    </h2>
                                    <p className="text-sm mb-3" style={{ ...g, color: "rgba(255,255,255,0.38)" }}>{p.desc}</p>
                                    <div className="flex items-center flex-wrap gap-4">
                                        <span className="flex items-center gap-1 text-xs" style={{ ...gm, color: "rgba(255,255,255,0.35)" }}>
                                            <Award className="w-3 h-3" /> {p.achievement}
                                        </span>
                                        {p.tags.slice(0, 2).map(t => (
                                            <span key={t} className="px-2.5 py-0.5 rounded-md text-[11px]"
                                                style={{ ...gm, backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.3)" }}>
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                {/* Thumbnail */}
                                <div
                                    className="w-32 h-20 md:w-48 md:h-28 rounded-xl shrink-0 overflow-hidden group-hover:border-white/15 transition-colors flex items-center justify-center"
                                    style={{
                                        backgroundColor: "rgba(255,255,255,0.04)",
                                        border: "1px solid rgba(255,255,255,0.07)",
                                    }}
                                >
                                    {thumb ? (
                                        <img
                                            src={thumb}
                                            alt={p.title}
                                            className="w-full h-full object-cover"
                                            draggable={false}
                                        />
                                    ) : (
                                        <Briefcase className="w-8 h-8" style={{ color: "rgba(255,255,255,0.15)" }} />
                                    )}
                                </div>
                            </article>
                        );
                    })}
                </div>
            </section>

            <footer className="px-8 md:px-16 lg:px-24 py-6 flex flex-col sm:flex-row items-center justify-between gap-2">
                <p style={{ ...gm, fontSize: "11px", color: "rgba(255,255,255,0.18)" }}>© 2024 Farel Febryan · {experiences.length} experiences</p>
                <p style={{ ...gm, fontSize: "11px", color: "rgba(255,255,255,0.18)" }}>Made with precision ✦</p>
            </footer>

            {/* Detail Modal */}
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
                        <div
                            className="absolute inset-0"
                            style={{ backgroundColor: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)" }}
                            onClick={close}
                        />

                        {/* Modal */}
                        <motion.div
                            className="relative w-full max-w-3xl rounded-2xl overflow-hidden overflow-y-auto"
                            style={{
                                backgroundColor: "#161616",
                                border: "1px solid rgba(255,255,255,0.08)",
                                boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
                                zIndex: 10000,
                                maxHeight: "90vh",
                            }}
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Image(s) — 16:9 with swipe */}
                            {selectedImages.length > 0 ? (
                                <div
                                    className="relative w-full overflow-hidden select-none"
                                    style={{
                                        aspectRatio: "16 / 9",
                                        backgroundColor: "#0b0b0b",
                                        borderBottom: "1px solid rgba(255,255,255,0.06)",
                                        touchAction: "pan-y",
                                    }}
                                >
                                    <AnimatePresence initial={false} mode="wait">
                                        <motion.img
                                            key={modalImgIdx}
                                            src={selectedImages[modalImgIdx]}
                                            alt={selected.title}
                                            className="absolute inset-0 w-full h-full object-contain"
                                            draggable={false}
                                            onDragStart={(e) => e.preventDefault()}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                            drag={selectedImages.length > 1 ? "x" : false}
                                            dragConstraints={{ left: 0, right: 0 }}
                                            dragElastic={0.2}
                                            onDragEnd={(_, info) => {
                                                const threshold = 60;
                                                if (info.offset.x < -threshold && modalImgIdx < selectedImages.length - 1) {
                                                    setModalImgIdx(modalImgIdx + 1);
                                                } else if (info.offset.x > threshold && modalImgIdx > 0) {
                                                    setModalImgIdx(modalImgIdx - 1);
                                                }
                                            }}
                                        />
                                    </AnimatePresence>

                                    {/* Prev/Next buttons */}
                                    {selectedImages.length > 1 && (
                                        <>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setModalImgIdx((i) => (i > 0 ? i - 1 : selectedImages.length - 1));
                                                }}
                                                className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-white/20"
                                                style={{ backgroundColor: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
                                                aria-label="Previous image"
                                            >
                                                <span className="text-white/80 text-lg leading-none">‹</span>
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setModalImgIdx((i) => (i < selectedImages.length - 1 ? i + 1 : 0));
                                                }}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-white/20"
                                                style={{ backgroundColor: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
                                                aria-label="Next image"
                                            >
                                                <span className="text-white/80 text-lg leading-none">›</span>
                                            </button>
                                        </>
                                    )}

                                    {/* Pagination dots */}
                                    {selectedImages.length > 1 && (
                                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
                                            {selectedImages.map((_, i) => (
                                                <button
                                                    key={i}
                                                    onClick={(e) => { e.stopPropagation(); setModalImgIdx(i); }}
                                                    className="transition-all rounded-full"
                                                    style={{
                                                        width: i === modalImgIdx ? 20 : 6,
                                                        height: 6,
                                                        backgroundColor: i === modalImgIdx ? "#fff" : "rgba(255,255,255,0.4)",
                                                    }}
                                                    aria-label={`Image ${i + 1}`}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div
                                    className="relative w-full flex items-center justify-center"
                                    style={{
                                        aspectRatio: "16 / 9",
                                        backgroundColor: "rgba(255,255,255,0.03)",
                                        borderBottom: "1px solid rgba(255,255,255,0.06)",
                                    }}
                                >
                                    <Briefcase className="w-16 h-16" style={{ color: "rgba(255,255,255,0.1)" }} />
                                </div>
                            )}

                            {/* Close button */}
                            <button
                                onClick={close}
                                className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-white/15"
                                style={{ backgroundColor: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)", zIndex: 10 }}
                            >
                                <X className="w-4 h-4 text-white/70" />
                            </button>

                            {/* Content */}
                            <div className="p-6 md:p-8">
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="text-[11px]" style={{ ...gm, color: "rgba(255,255,255,0.25)" }}>{selected.id}</span>
                                    <span className="px-2.5 py-0.5 rounded-md text-[11px]"
                                        style={{ ...gm, backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.35)" }}>
                                        {selected.category}
                                    </span>
                                    <span className="text-[11px]" style={{ ...gm, color: "rgba(255,255,255,0.2)" }}>{selected.period}</span>
                                </div>

                                <h3 className="font-bold text-white text-xl md:text-2xl mb-1" style={g}>{selected.title}</h3>
                                <p className="text-xs tracking-widest uppercase mb-4" style={{ ...gm, color: "rgba(255,255,255,0.25)" }}>
                                    {selected.subtitle}
                                </p>

                                <p className="text-sm leading-relaxed mb-5" style={{ ...g, color: "rgba(255,255,255,0.45)" }}>
                                    {selected.desc}
                                </p>

                                {/* Meta info */}
                                <div className="flex flex-col gap-2 mb-5">
                                    <div className="flex items-center gap-2 text-xs" style={{ ...gm, color: "rgba(255,255,255,0.4)" }}>
                                        <Briefcase className="w-3.5 h-3.5" /> {selected.role} · {selected.organization}
                                    </div>
                                    <div className="flex items-center gap-2 text-xs" style={{ ...gm, color: "rgba(255,255,255,0.4)" }}>
                                        <MapPin className="w-3.5 h-3.5" /> {selected.location}
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    {selected.tags.map((t, i) => {
                                        const colors = [
                                            { bg: "rgba(34,197,94,0.12)", border: "rgba(34,197,94,0.25)", text: "#4ade80" },
                                            { bg: "rgba(234,179,8,0.12)", border: "rgba(234,179,8,0.25)", text: "#facc15" },
                                            { bg: "rgba(59,130,246,0.12)", border: "rgba(59,130,246,0.25)", text: "#60a5fa" },
                                        ];
                                        const c = colors[i % 3];
                                        return (
                                            <span key={t} className="px-2.5 py-1 rounded-md text-[11px]"
                                                style={{ ...gm, backgroundColor: c.bg, border: `1px solid ${c.border}`, color: c.text }}>
                                                {t}
                                            </span>
                                        );
                                    })}
                                </div>

                                <div className="flex items-center gap-1.5 text-xs" style={{ ...gm, color: "rgba(255,255,255,0.35)" }}>
                                    <Award className="w-3.5 h-3.5" /> {selected.achievement}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}