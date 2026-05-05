// app/projects/[id]/page.tsx
import { projects, getProjectById, getGallery } from "@/lib/projects";
import { notFound } from "next/navigation";
import { ArrowLeft, Github, ExternalLink, Eye } from "lucide-react";
import Link from "next/link";
import ProjectCarousel from "./ProjectCarousel";

export function generateStaticParams() {
    return projects.map(p => ({ id: p.id }));
}

const g = { fontFamily: "var(--font-geist), sans-serif" } as const;
const gm = { fontFamily: "var(--font-geist-mono), monospace" } as const;

export default async function ProjectDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const project = getProjectById(id);
    if (!project) notFound();

    const gallery = getGallery(project);

    return (
        <main style={{ backgroundColor: "#0f0f0f", color: "#ededed", minHeight: "100vh" }}>

            {/* ── Back Button ── */}
            <div className="px-8 md:px-16 lg:px-24 pt-28 pb-6">
                <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 text-sm transition-colors hover:text-white/70"
                    style={{ ...g, color: "rgba(255,255,255,0.35)" }}
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Projects
                </Link>
            </div>

            {/* ── Carousel ── */}
            <div className="px-8 md:px-16 lg:px-24 mb-10 flex justify-center">
                <div className="w-full max-w-4xl">
                    <ProjectCarousel images={gallery} title={project.title} />
                </div>
            </div>

            {/* ── Hero Info ── */}
            <div className="px-8 md:px-16 lg:px-24 pb-10">
                {/* Meta row */}
                <div className="flex items-center gap-3 mb-5">
                    <span className="text-xs" style={{ ...gm, color: "rgba(255,255,255,0.25)" }}>
                        {project.id}
                    </span>
                    <span
                        className="px-2.5 py-0.5 rounded-md text-[11px]"
                        style={{
                            ...gm,
                            backgroundColor: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            color: "rgba(255,255,255,0.35)",
                        }}
                    >
                        {project.category}
                    </span>
                    <span className="text-xs" style={{ ...gm, color: "rgba(255,255,255,0.2)" }}>
                        {project.year}
                    </span>
                </div>

                {/* Title */}
                <h1
                    className="font-bold text-white mb-3"
                    style={{ ...g, fontSize: "clamp(1.8rem, 4vw, 3rem)", lineHeight: 1.1 }}
                >
                    {project.title}
                </h1>

                {/* Short desc */}
                <p
                    className="text-sm leading-relaxed mb-8"
                    style={{ ...g, color: "rgba(255,255,255,0.42)" }}
                >
                    {project.desc}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((t, i) => {
                        const colors = [
                            { bg: "rgba(34,197,94,0.12)", border: "rgba(34,197,94,0.25)", text: "#4ade80" },
                            { bg: "rgba(234,179,8,0.12)", border: "rgba(234,179,8,0.25)", text: "#facc15" },
                            { bg: "rgba(59,130,246,0.12)", border: "rgba(59,130,246,0.25)", text: "#60a5fa" },
                            { bg: "rgba(168,85,247,0.12)", border: "rgba(168,85,247,0.25)", text: "#c084fc" },
                        ];
                        const c = colors[i % colors.length];
                        return (
                            <span
                                key={t}
                                className="px-3 py-1 rounded-md text-[11px]"
                                style={{ ...gm, backgroundColor: c.bg, border: `1px solid ${c.border}`, color: c.text }}
                            >
                                {t}
                            </span>
                        );
                    })}
                </div>

                {/* Views */}
                <div className="flex items-center gap-1.5 text-xs" style={{ ...gm, color: "rgba(255,255,255,0.22)" }}>
                    <Eye className="w-3.5 h-3.5" /> {project.views} views
                </div>
            </div>

            {/* ═══════════════════════════════════════════════════════════════
                SECTIONS — each renders only if data exists
               ═══════════════════════════════════════════════════════════════ */}

            {/* ── About ── */}
            {project.longDesc && (
                <Section title="About This Project">
                    <p className="leading-relaxed" style={{ ...g, color: "rgba(255,255,255,0.4)", fontSize: "0.938rem" }}>
                        {project.longDesc}
                    </p>
                </Section>
            )}

            {/* ── Problem Statement ── */}
            {project.problem && (
                <Section title="Problem Statement">
                    <div
                        className="p-5 rounded-xl"
                        style={{ backgroundColor: "rgba(239,68,68,0.04)", border: "1px solid rgba(239,68,68,0.1)" }}
                    >
                        <p className="leading-relaxed" style={{ ...g, color: "rgba(255,255,255,0.45)", fontSize: "0.938rem" }}>
                            {project.problem}
                        </p>
                    </div>
                </Section>
            )}

            {/* ── Key Features ── */}
            {project.features && project.features.length > 0 && (
                <Section title="Key Features">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                        {project.features.map((f, i) => {
                            const accents = ["#4ade80", "#facc15", "#60a5fa", "#c084fc"];
                            const accent = accents[i % accents.length];
                            return (
                                <div
                                    key={i}
                                    className="p-5 rounded-xl relative overflow-hidden"
                                    style={{
                                        backgroundColor: "rgba(255,255,255,0.025)",
                                        border: "1px solid rgba(255,255,255,0.07)",
                                    }}
                                >
                                    {/* Top accent line */}
                                    <div
                                        className="absolute top-0 left-0 right-0 h-[2px]"
                                        style={{ backgroundColor: accent, opacity: 0.5 }}
                                    />
                                    <p className="text-xs mb-1" style={{ ...gm, color: accent, opacity: 0.7 }}>
                                        0{i + 1}
                                    </p>
                                    <h3 className="text-white text-sm font-semibold mb-2" style={g}>
                                        {f.title}
                                    </h3>
                                    <p className="text-xs leading-relaxed" style={{ ...g, color: "rgba(255,255,255,0.35)" }}>
                                        {f.desc}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </Section>
            )}

            {/* ── Tech Stack ── */}
            {project.techStack && project.techStack.length > 0 && (
                <Section title="Tech Stack">
                    <div className="flex flex-wrap gap-3">
                        {project.techStack.map((t) => (
                            <div
                                key={t}
                                className="px-4 py-2.5 rounded-xl text-sm"
                                style={{
                                    ...gm,
                                    backgroundColor: "rgba(255,255,255,0.04)",
                                    border: "1px solid rgba(255,255,255,0.08)",
                                    color: "rgba(255,255,255,0.5)",
                                }}
                            >
                                {t}
                            </div>
                        ))}
                    </div>
                </Section>
            )}

            {/* ── Architecture ── */}
            {project.architecture && (
                <Section title="Architecture">
                    <div
                        className="rounded-xl overflow-hidden"
                        style={{ border: "1px solid rgba(255,255,255,0.08)", backgroundColor: "rgba(255,255,255,0.02)" }}
                    >
                        <img
                            src={project.architecture}
                            alt="Architecture diagram"
                            className="w-full"
                            style={{ display: "block" }}
                        />
                    </div>
                </Section>
            )}

            {/* ── Results / Metrics ── */}
            {project.results && project.results.length > 0 && (
                <Section title="Results">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                                    {["Metric", "Baseline", "Best", "Δ", "Experiment"].map((h) => (
                                        <th
                                            key={h}
                                            className="text-left py-3 pr-8"
                                            style={{ ...gm, color: "rgba(255,255,255,0.3)", fontSize: "11px", letterSpacing: "0.05em" }}
                                        >
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {project.results.map((r, i) => {
                                    const delta = r.best - r.baseline;
                                    const deltaPercent = ((delta / r.baseline) * 100).toFixed(2);
                                    const isPositive = delta > 0;
                                    return (
                                        <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                                            <td className="py-3.5 pr-8 text-white/70" style={gm}>{r.metric}</td>
                                            <td className="py-3.5 pr-8 text-white/40" style={gm}>{r.baseline.toFixed(4)}</td>
                                            <td className="py-3.5 pr-8 font-medium" style={{ ...gm, color: "#4ade80" }}>
                                                {r.best.toFixed(4)}
                                            </td>
                                            <td className="py-3.5 pr-8" style={{ ...gm, color: isPositive ? "#4ade80" : "#f87171" }}>
                                                {isPositive ? "+" : ""}{deltaPercent}%
                                            </td>
                                            <td className="py-3.5 text-white/40" style={gm}>{r.experiment}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </Section>
            )}

            {/* ── Challenges & Lessons ── */}
            {project.challenges && project.challenges.length > 0 && (
                <Section title="Challenges & Lessons Learned">
                    <div className="flex flex-col gap-4">
                        {project.challenges.map((c, i) => (
                            <div
                                key={i}
                                className="flex gap-4 items-start p-4 rounded-xl"
                                style={{ backgroundColor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
                            >
                                <span
                                    className="mt-0.5 w-6 h-6 rounded-lg flex items-center justify-center shrink-0 text-[11px] font-medium"
                                    style={{ ...gm, backgroundColor: "rgba(234,179,8,0.1)", color: "#facc15", border: "1px solid rgba(234,179,8,0.2)" }}
                                >
                                    {i + 1}
                                </span>
                                <p className="text-sm leading-relaxed" style={{ ...g, color: "rgba(255,255,255,0.4)" }}>
                                    {c}
                                </p>
                            </div>
                        ))}
                    </div>
                </Section>
            )}

            {/* ── Actions / Links ── */}
            <div className="px-8 md:px-16 lg:px-24 py-12" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="flex items-center gap-3">
                    {project.links?.demo ? (
                        <a
                            href={project.links.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-5 py-2.5 text-sm text-white rounded-xl transition-all hover:bg-white/15"
                            style={{ ...g, backgroundColor: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)" }}
                        >
                            <ExternalLink className="w-3.5 h-3.5" /> Live Demo
                        </a>
                    ) : (
                        <button
                            disabled
                            className="flex items-center gap-2 px-5 py-2.5 text-sm rounded-xl cursor-not-allowed opacity-40"
                            style={{ ...g, backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.4)" }}
                        >
                            <ExternalLink className="w-3.5 h-3.5" /> Demo Not Available
                        </button>
                    )}

                    {project.links?.github ? (
                        <a
                            href={project.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2.5 text-sm rounded-xl transition-all hover:bg-white/8"
                            style={{ ...g, border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.45)" }}
                        >
                            <Github className="w-3.5 h-3.5" /> Source Code
                        </a>
                    ) : (
                        <button
                            disabled
                            className="flex items-center gap-2 px-4 py-2.5 text-sm rounded-xl cursor-not-allowed opacity-40"
                            style={{ ...g, border: "1px solid rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.3)" }}
                        >
                            <Github className="w-3.5 h-3.5" /> Source (Private)
                        </button>
                    )}
                </div>
            </div>

            {/* ── Footer ── */}
            <footer className="px-8 md:px-16 lg:px-24 py-6" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
                <p style={{ ...gm, fontSize: "11px", color: "rgba(255,255,255,0.15)" }}>
                    © 2024 Farel Febryan · Made with precision ✦
                </p>
            </footer>
        </main>
    );
}

/* ──────────────────────────────────────────────────────────────
   Reusable Section wrapper
   ────────────────────────────────────────────────────────────── */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
    const g = { fontFamily: "var(--font-geist), sans-serif" } as const;
    return (
        <div
            className="px-8 md:px-16 lg:px-24 py-10"
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
            <h2 className="text-white text-xl font-semibold mb-6" style={g}>
                {title}
            </h2>
            {children}
        </div>
    );
}