"use client";

import { useState } from "react";
import { Eye, ExternalLink, Github } from "lucide-react";
import Stack from '@/components/Stack';

const g = { fontFamily: "var(--font-geist), sans-serif" } as const;
const gm = { fontFamily: "var(--font-geist-mono), monospace" } as const;

const images = [
    "./daftar.png",
    "./login.png",
    "./dashboard.png",
    "./property.png",
];

type Cat = "All" | "Web App" | "AI / ML";
const filters: Cat[] = ["All", "Web App", "AI / ML"];

const projects = [
    { id: "01", featured: true, title: "Victoria Property Website", subtitle: "Real Estate Platform", desc: "Modern responsive property listing website with dynamic pages, advanced search and filtering, interactive maps, and optimized performance for seamless user experience.", category: "Web App" as Cat, tags: ["Next.js", "TypeScript", "Tailwind CSS"], year: "2026", views: "8,421",image:"./tcanteen.png" },
    { id: "02", featured: false, title: "TCanteen Frontend Development", subtitle: "AI Writing Assistant", desc: "Responsive frontend for a smart campus canteen system with real-time interaction and clean UI.", category: "Web App" as Cat, tags: ["Vite", "React"], year: "2025", views: "5,203", image: "./tcanteen.png" },
    { id: "03", featured: false, title: "AI Route Optimizer for HFFCVRP Website", subtitle: "Image AI Pipeline", desc: "Web-based route optimization system implementing a Hybrid Firefly–Genetic algorithm for cost-efficient vehicle routing.", category: "AI / ML" as Cat, tags: ["Python", "Genetic-Algorithm", "Simulated Annealing", "Tabu-Search"], year: "2025", views: "1,244", image: "./kka.png" },
    { id: "04", featured: false, title: "Lucretia Fashion Brand Website", subtitle: "Habit Tracker App", desc: "Modern fashion brand website with dynamic catalog and visually refined design.", category: "Web App" as Cat, tags: ["HTML", "CSS", "Javascript"], year: "2025", views: "3,847", image: "./lucretia.png" },
    { id: "05", featured: false, title: "Pothole Segmentation using SegFormer-b2 (ARA ITS Data Science)", subtitle: "Scaffold Generator", desc: "Deep learning model using SegFormer-b2 for accurate pothole detection and road condition analysis.", category: "AI / ML" as Cat, tags: ["Computer Vision", "PyTorch", "TensorFlow"], year: "2026", views: "2,190", image: "./ara.png" },
    { id: "06", featured: false, title: "Customer Segmentation Using KMeans Clustering (Unsupervised Learning)", subtitle: "Portfolio Manager", desc: "KMeans-based clustering to identify customer segments from purchasing behavior data.", category: "AI / ML" as Cat, tags: ["Scikit-Learn", "K-Means"], year: "2025", views: "1,932", image: "./lbe.png" },
    { id: "07", featured: false, title: "TV Network Classification Using Ensemble Learning (Stacking)", subtitle: "Image AI Pipeline", desc: "Ensemble stacking model for multi-class TV network classification with improved predictive performance.", category: "AI / ML" as Cat, tags: ["Stacking", "Ensemble Learning"], year: "2026", views: "1,244", image:"./kcv.png" },
];

export default function ProjectsPage() {
    const [active, setActive] = useState<Cat>("All");
    const filtered = active === "All" ? projects : projects.filter(p => p.category === active);
    const featured = filtered.find(p => p.featured);
    const rest = filtered.filter(p => !p.featured);

    return (
        <main style={{ backgroundColor: "#0f0f0f", color: "#ededed", minHeight: "100vh" }}>

            {/* Header */}
            <section className="px-8 md:px-16 lg:px-24 pt-28 pb-14" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <p className="text-xs tracking-[0.25em] uppercase mb-5" style={{ ...gm, color: "rgba(255,255,255,0.25)" }}>Selected Work</p>
                <p className="text-4xl leading-none mb-1" style={{ ...g, color: "rgba(255,255,255,0.3)" }}>Featured</p>
                <h1 className="font-bold text-white mb-5" style={{ ...g, fontSize: "clamp(2.2rem,5vw,4rem)", lineHeight: 1.05 }}>
                    Projects &amp; Work
                </h1>
                <p className="mb-8 text-sm leading-relaxed" style={{ ...g, color: "rgba(255,255,255,0.38)", maxWidth: "480px" }}>
                    A curated selection — from Machine Learning and Data Science to Website Development. Each built with care and shipped with intention.
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

            {/* Featured — proper two-column grid */}
            {featured && (
                <section
                    className="grid grid-cols-1 lg:grid-cols-2"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", minHeight: 480 }}
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
                        <div className="flex flex-wrap gap-2 mb-8">
                            {featured.tags.map(t => (
                                <span key={t} className="px-2.5 py-1 rounded-md text-[11px]"
                                    style={{ ...gm, backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.3)" }}>
                                    {t}
                                </span>
                            ))}
                        </div>
                        <div className="flex items-center gap-3 mb-5">
                            <button className="flex items-center gap-2 px-4 py-2 text-sm text-white rounded-xl transition-all hover:bg-white/15"
                                style={{ ...g, backgroundColor: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}>
                                <ExternalLink className="w-3.5 h-3.5" /> Under Development
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 text-sm rounded-xl transition-all hover:bg-white/8"
                                style={{ ...g, border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.45)" }}>
                                <Github className="w-3.5 h-3.5" /> Not Deployed Yet
                            </button>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs" style={{ ...gm, color: "rgba(255,255,255,0.22)" }}>
                            <Eye className="w-3.5 h-3.5" /> {featured.views} views
                        </div>
                    </div>

                    {/* Right: Stack card — properly centered */}
                    <div
                        className="flex items-center justify-center"
                        style={{
                            padding: "3.5rem",
                            backgroundColor: "rgba(255,255,255,0.01)",
                        }}
                    >
                        {/* Stack needs a sized container to work correctly */}
                        <div style={{ width: "100%", maxWidth: 460, aspectRatio: "4/3", position: "relative" }}>
                            <Stack
                                randomRotation={false}
                                sensitivity={200}
                                sendToBackOnClick={true}
                                cards={images.map((src, i) => (
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
                                            alt={`preview-${i}`}
                                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                        />
                                    </div>
                                ))}
                                autoplay={false}
                                autoplayDelay={3000}
                                pauseOnHover={true}
                            />
                        </div>
                    </div>
                </section>
            )}

            {/* Project list */}
            <section className="px-8 md:px-16 lg:px-24 py-14" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="flex flex-col divide-y" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                    {rest.map(p => (
                        <article key={p.id} className="py-8 flex items-start justify-between gap-6 group cursor-pointer">
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
                                        <span key={t} className="px-2.5 py-0.5 rounded-md text-[11px]"
                                            style={{ ...gm, backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.3)" }}>
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            {/* Thumbnail */}
                            <div
                                className="w-32 h-20 md:w-48 md:h-28 rounded-xl shrink-0 overflow-hidden group-hover:border-white/15 transition-colors"
                                style={{
                                    backgroundColor: "rgba(255,255,255,0.04)",
                                    border: "1px solid rgba(255,255,255,0.07)",
                                }}
                            >
                                {p.image ? (
                                    <img
                                        src={p.image}
                                        alt={p.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <span className="text-xs opacity-30">{p.id}</span>
                                )}
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <footer className="px-8 md:px-16 lg:px-24 py-6 flex flex-col sm:flex-row items-center justify-between gap-2">
                <p style={{ ...gm, fontSize: "11px", color: "rgba(255,255,255,0.18)" }}>© 2024 Farel Febryan · {projects.length} projects</p>
                <p style={{ ...gm, fontSize: "11px", color: "rgba(255,255,255,0.18)" }}>Made with precision ✦</p>
            </footer>
        </main>
    );
}