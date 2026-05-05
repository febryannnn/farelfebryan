"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/about", label: "About" },
];

const g = { fontFamily: "var(--font-geist), sans-serif" } as const;

export default function Navbar() {
    const pathname = usePathname();

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center px-8 pt-6">
            <div
                className="flex items-center gap-1 px-2 py-1.5 rounded-2xl"
                style={{
                    backgroundColor: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    backdropFilter: "blur(16px)",
                }}
            >
                {links.map((l) => {
                    const active = pathname === l.href;
                    return (
                        <Link
                            key={l.href}
                            href={l.href}
                            className="px-4 py-1.5 rounded-xl text-sm transition-all"
                            style={{
                                ...g,
                                color: active ? "#fff" : "rgba(255,255,255,0.45)",
                                backgroundColor: active ? "rgba(255,255,255,0.1)" : "transparent",
                                fontWeight: active ? 500 : 400,
                            }}
                        >
                            {l.label}
                        </Link>
                    );
                })}

                {/* Divider */}
                <span className="w-px h-4 mx-1" style={{ backgroundColor: "rgba(255,255,255,0.12)" }} />

                <button
                    className="px-4 py-1.5 rounded-xl text-sm transition-all flex items-center gap-1.5"
                    style={{ ...g, color: "rgba(255,255,255,0.45)" }}
                >
                    More <span style={{ fontSize: "10px" }}>▾</span>
                </button>
            </div>
        </nav>
    );
}