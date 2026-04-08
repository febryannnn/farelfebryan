"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/experience", label: "Experience" },
    { href: "/about", label: "About" },
];

const g = { fontFamily: "var(--font-geist), sans-serif" } as const;

export default function Navbar() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center px-8 pt-6">
                {/* Desktop */}
                <div
                    className="hidden md:flex items-center gap-1 px-2 py-1.5 rounded-2xl"
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

                    <span className="w-px h-4 mx-1" style={{ backgroundColor: "rgba(255,255,255,0.12)" }} />

                    <button
                        className="px-4 py-1.5 rounded-xl text-sm transition-all flex items-center gap-1.5"
                        style={{ ...g, color: "rgba(255,255,255,0.45)" }}
                    >
                        More <span style={{ fontSize: "10px" }}>▾</span>
                    </button>
                </div>

                {/* Mobile */}
                <div
                    className="flex md:hidden items-center gap-2 px-2 py-1.5 rounded-2xl w-full max-w-sm justify-between"
                    style={{
                        backgroundColor: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        backdropFilter: "blur(16px)",
                    }}
                >
                    {/* Active page label */}
                    <span
                        className="px-3 py-1.5 rounded-xl text-sm"
                        style={{
                            ...g,
                            color: "#fff",
                            backgroundColor: "rgba(255,255,255,0.1)",
                            fontWeight: 500,
                        }}
                    >
                        {links.find((l) => l.href === pathname)?.label ?? "Menu"}
                    </span>

                    {/* Hamburger */}
                    <button
                        onClick={() => setOpen((prev) => !prev)}
                        className="flex flex-col justify-center gap-1.5 px-3 py-2 rounded-xl transition-all"
                        style={{ color: "rgba(255,255,255,0.7)" }}
                        aria-label="Toggle menu"
                    >
                        <span
                            className="block h-px w-5 transition-all origin-center"
                            style={{
                                backgroundColor: "currentColor",
                                transform: open ? "translateY(5px) rotate(45deg)" : "none",
                            }}
                        />
                        <span
                            className="block h-px transition-all"
                            style={{
                                backgroundColor: "currentColor",
                                width: open ? "20px" : "14px",
                                opacity: open ? 0 : 1,
                            }}
                        />
                        <span
                            className="block h-px w-5 transition-all origin-center"
                            style={{
                                backgroundColor: "currentColor",
                                transform: open ? "translateY(-5px) rotate(-45deg)" : "none",
                            }}
                        />
                    </button>
                </div>
            </nav>

            {/* Mobile Dropdown */}
            {open && (
                <div
                    className="fixed top-20 left-0 right-0 z-40 mx-8 md:hidden rounded-2xl p-2 flex flex-col gap-1"
                    style={{
                        backgroundColor: "rgba(14,14,14,0.97)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        backdropFilter: "blur(20px)",
                    }}
                >
                    {links.map((l) => {
                        const active = pathname === l.href;
                        return (
                            <Link
                                key={l.href}
                                href={l.href}
                                onClick={() => setOpen(false)}
                                className="px-4 py-2.5 rounded-xl text-sm transition-all"
                                style={{
                                    ...g,
                                    color: active ? "#fff" : "rgba(255,255,255,0.55)",
                                    backgroundColor: active ? "rgba(255,255,255,0.1)" : "transparent",
                                    fontWeight: active ? 500 : 400,
                                }}
                            >
                                {l.label}
                            </Link>
                        );
                    })}

                    <span className="w-full h-px my-1" style={{ backgroundColor: "rgba(255,255,255,0.08)" }} />

                    <button
                        className="px-4 py-2.5 rounded-xl text-sm text-left flex items-center gap-1.5"
                        style={{ ...g, color: "rgba(255,255,255,0.55)" }}
                    >
                        More <span style={{ fontSize: "10px" }}>▾</span>
                    </button>
                </div>
            )}
        </>
    );
}