"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "motion/react";

export default function ProjectDetailAnimations() {
    /* ── Scroll-reveal via IntersectionObserver ── */
    useEffect(() => {
        const els = document.querySelectorAll<HTMLElement>(".reveal");
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach((entry, i) => {
                    if (entry.isIntersecting) {
                        const el = entry.target as HTMLElement;
                        const delay = Number(el.dataset.delay ?? 0);
                        setTimeout(() => el.classList.add("visible"), delay);
                        observer.unobserve(el);
                    }
                });
            },
            { threshold: 0.12 }
        );
        els.forEach((el, i) => {
            (el as HTMLElement).dataset.delay = String(i * 40);
            observer.observe(el);
        });
        return () => observer.disconnect();
    }, []);

    /* ── Cursor glow ── */
    const cursorX = useMotionValue(-600);
    const cursorY = useMotionValue(-600);
    useEffect(() => {
        const move = (e: MouseEvent) => { cursorX.set(e.clientX); cursorY.set(e.clientY); };
        window.addEventListener("mousemove", move);
        return () => window.removeEventListener("mousemove", move);
    }, []);

    /* ── Scroll progress bar ── */
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

    return (
        <>
            {/* Scroll progress bar */}
            <motion.div
                style={{
                    scaleX,
                    transformOrigin: "left",
                    position: "fixed",
                    top: 0, left: 0, right: 0,
                    height: 2,
                    background: "linear-gradient(90deg, rgba(255,255,255,0.5), rgba(255,255,255,0.15))",
                    zIndex: 99999,
                }}
            />

            {/* Ambient cursor glow */}
            <motion.div
                style={{
                    position: "fixed", top: 0, left: 0,
                    width: 600, height: 600,
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(255,255,255,0.028) 0%, transparent 70%)",
                    pointerEvents: "none",
                    zIndex: 0,
                    x: useTransform(cursorX, v => v - 300),
                    y: useTransform(cursorY, v => v - 300),
                }}
            />
        </>
    );
}