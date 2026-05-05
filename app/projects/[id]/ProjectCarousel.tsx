// app/projects/[id]/ProjectCarousel.tsx
"use client";

import { useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

export default function ProjectCarousel({
    images,
    title,
}: {
    images: string[];
    title: string;
}) {
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(0);

    const prev = useCallback(() => {
        setDirection(-1);
        setCurrent(i => (i === 0 ? images.length - 1 : i - 1));
    }, [images.length]);

    const next = useCallback(() => {
        setDirection(1);
        setCurrent(i => (i === images.length - 1 ? 0 : i + 1));
    }, [images.length]);

    const variants = {
        enter: (dir: number) => ({
            x: dir > 0 ? "100%" : "-100%",
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
        },
        exit: (dir: number) => ({
            x: dir > 0 ? "-100%" : "100%",
            opacity: 0,
        }),
    };

    return (
        <div
            className="relative w-full rounded-2xl overflow-hidden"
            style={{ border: "1px solid rgba(255,255,255,0.08)" }}
        >
            <div className="relative w-full aspect-video bg-black/30 overflow-hidden">
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                    <motion.img
                        key={current}
                        src={images[current]}
                        alt={`${title} - ${current + 1}`}
                        className="absolute inset-0 w-full h-full object-cover"
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                    />
                </AnimatePresence>
            </div>

            {images.length > 1 && (
                <>
                    <button
                        onClick={prev}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full transition-colors hover:bg-white/20"
                        style={{ backgroundColor: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
                    >
                        <ChevronLeft className="w-5 h-5 text-white/80" />
                    </button>
                    <button
                        onClick={next}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full transition-colors hover:bg-white/20"
                        style={{ backgroundColor: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
                    >
                        <ChevronRight className="w-5 h-5 text-white/80" />
                    </button>

                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                        {images.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => {
                                    setDirection(i > current ? 1 : -1);
                                    setCurrent(i);
                                }}
                                className="w-2 h-2 rounded-full transition-all"
                                style={{
                                    backgroundColor: i === current ? "#fff" : "rgba(255,255,255,0.3)",
                                    transform: i === current ? "scale(1.2)" : "scale(1)",
                                }}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}