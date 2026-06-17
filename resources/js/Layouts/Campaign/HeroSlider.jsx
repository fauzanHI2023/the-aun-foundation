import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Play } from "lucide-react";

const slides = [
    {
        id: 1,
        cat: "Community",
        tag: "01",
        title: "Bangun Kembali\nRumah Korban\nBanjir Cimanuk",
        raised: 142500000,
        goal: 200000000,
        donors: 1842,
        daysLeft: 14,
        image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=1600&h=900&fit=crop&auto=format",
    },
    {
        id: 2,
        cat: "Education",
        tag: "02",
        title: "Perpustakaan\nuntuk 500 Anak\ndi Pelosok Negeri",
        raised: 87000000,
        goal: 150000000,
        donors: 965,
        daysLeft: 21,
        image: "https://images.unsplash.com/photo-1632215861513-130b66fe97f4?w=1600&h=900&fit=crop&auto=format",
    },
    {
        id: 3,
        cat: "Health",
        tag: "03",
        title: "Air Bersih untuk\n3.000 Keluarga\nNusa Tenggara",
        raised: 210000000,
        goal: 300000000,
        donors: 3104,
        daysLeft: 7,
        image: "https://images.unsplash.com/photo-1776507178339-504c9f129d80?w=1600&h=900&fit=crop&auto=format",
    },
];

function fmt(n) {
    if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}M`;
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(0)}jt`;
    return n.toLocaleString("id-ID");
}

export function HeroSlider() {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 35 });
    const [cur, setCur] = useState(0);
    const [paused, setPaused] = useState(false);

    useEffect(() => {
        if (!emblaApi) return;
        emblaApi.on("select", () => setCur(emblaApi.selectedScrollSnap()));
    }, [emblaApi]);

    useEffect(() => {
        if (paused) return;
        const t = setInterval(() => emblaApi?.scrollNext(), 5500);
        return () => clearInterval(t);
    }, [emblaApi, paused]);

    const s = slides[cur];
    const pct = Math.round((s.raised / s.goal) * 100);

    return (
        <section
            className="relative w-full overflow-hidden"
            style={{ height: "100vh", background: "#0A0A0A" }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            {/* image reel */}
            <div ref={emblaRef} className="absolute inset-0">
                <div className="flex h-full">
                    {slides.map((sl) => (
                        <div
                            key={sl.id}
                            className="relative flex-none w-full h-full"
                            style={{ minWidth: "100%" }}
                        >
                            <img
                                src={sl.image}
                                alt=""
                                className="absolute inset-0 w-full h-full object-cover"
                                style={{
                                    filter: "brightness(0.28) saturate(0.6)",
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* overlays */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-white/80 via-white/50 to-white/0" />

            {/* thin gold rule left edge */}
            <div
                className="absolute left-0 top-0 bottom-0 w-px pointer-events-none"
                style={{
                    background:
                        "linear-gradient(to bottom, transparent 15%, #C9A050 50%, transparent 85%)",
                }}
            />

            {/* main content */}
            <div className="relative z-10 h-full flex flex-col justify-between max-w-7xl mx-auto px-8 lg:px-16 py-12">
                {/* top bar */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <span
                            className="text-xs tracking-[0.22em] uppercase"
                            style={{
                                color: "rgba(255,255,255,0.3)",
                                fontFamily: "Inter, sans-serif",
                            }}
                        >
                            Ways to Help
                        </span>
                        <div
                            className="w-12 h-px"
                            style={{ background: "rgba(255,255,255,0.15)" }}
                        />
                        <span
                            className="text-xs"
                            style={{
                                color: "#C9A050",
                                fontFamily: "Inter, sans-serif",
                            }}
                        >
                            {s.cat}
                        </span>
                    </div>
                    <span
                        style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: "5rem",
                            fontWeight: 800,
                            color: "rgba(255,255,255,0.04)",
                            lineHeight: 1,
                            letterSpacing: "-0.04em",
                        }}
                    >
                        {s.tag}
                    </span>
                </div>

                {/* center — big title */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={cur}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="flex flex-col gap-0"
                    >
                        <h1
                            className="
                                font-extrabold
                                text-transparent bg-clip-text bg-gradient-to-r from-[#443216] via-[#6e4b27] to-[#845f38]
                                leading-[1.05]
                                tracking-[-0.025em]
                                whitespace-pre-line
                                text-[clamp(2.6rem,6.5vw,5.2rem)]
                            "
                            style={{
                                fontFamily:
                                    "'Playfair Display', Georgia, serif",
                            }}
                        >
                            {s.title}
                        </h1>

                        {/* progress row */}
                        <div className="mt-10 flex items-end gap-10">
                            <div>
                                <div className="flex items-end gap-2 mb-2">
                                    <span
                                        className="text-[#3f2812]"
                                        style={{
                                            fontFamily:
                                                "'Playfair Display', serif",
                                            fontSize: "2.4rem",
                                            fontWeight: 800,
                                            lineHeight: 1,
                                        }}
                                    >
                                        Rp {fmt(s.raised)}
                                    </span>
                                    <span
                                        className="mb-1 text-sm"
                                        style={{
                                            color: "#754c24",
                                            fontFamily: "Inter, sans-serif",
                                        }}
                                    >
                                        / Rp {fmt(s.goal)}
                                    </span>
                                </div>
                                <div
                                    className="w-72 h-0.5 rounded-full overflow-hidden"
                                    style={{
                                        background: "rgba(255,255,255,0.1)",
                                    }}
                                >
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${pct}%` }}
                                        transition={{
                                            duration: 1.2,
                                            ease: "easeOut",
                                            delay: 0.3,
                                        }}
                                        className="h-full"
                                        style={{
                                            background:
                                                "linear-gradient(to right, #8B6835, #C9A050)",
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="pb-1">
                                <span
                                    className="block text-2xl text-[#573418]"
                                    style={{
                                        fontFamily: "'Playfair Display', serif",
                                        fontWeight: 700,
                                    }}
                                >
                                    {s.donors.toLocaleString("id-ID")}
                                </span>
                                <span
                                    className="text-xs text-[#6b401e]"
                                    style={{
                                        fontFamily: "Inter, sans-serif",
                                    }}
                                >
                                    donatur
                                </span>
                            </div>
                            <div className="pb-1">
                                <span
                                    className="block text-2xl text-[#573418]"
                                    style={{
                                        fontFamily: "'Playfair Display', serif",
                                        fontWeight: 700,
                                    }}
                                >
                                    {s.daysLeft}
                                </span>
                                <span
                                    className="text-xs text-[#6b401e]"
                                    style={{
                                        fontFamily: "Inter, sans-serif",
                                    }}
                                >
                                    hari tersisa
                                </span>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* bottom bar */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            className="group flex items-center gap-3 px-6 py-3 bg-[#a26b35] transition-all duration-200 hover:gap-4"
                            style={{
                                color: "#ffffff",
                                fontFamily: "Inter, sans-serif",
                                fontWeight: 700,
                                fontSize: "0.85rem",
                                letterSpacing: "0.06em",
                            }}
                        >
                            DONASI SEKARANG
                            <ArrowUpRight size={16} />
                        </button>
                        <button
                            className="flex items-center gap-2 px-5 py-3 transition-all duration-200 hover:gap-4 text-[#ffffff] bg-[#4b2d0b]"
                            style={{
                                fontFamily: "Inter, sans-serif",
                                fontSize: "0.85rem",
                            }}
                        >
                            <Play size={13} fill="currentColor" />
                            Lihat Campaign
                        </button>
                    </div>

                    {/* slide nav */}
                    <div className="flex items-center gap-5">
                        <button
                            onClick={() => emblaApi?.scrollPrev()}
                            className="text-xs transition-colors hover:text-white"
                            style={{
                                color: "rgba(255,255,255,0.3)",
                                fontFamily: "Inter, sans-serif",
                            }}
                        >
                            PREV
                        </button>
                        <div className="flex gap-2">
                            {slides.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => emblaApi?.scrollTo(i)}
                                    className="rounded-full transition-all duration-300"
                                    style={{
                                        width: i === cur ? "24px" : "6px",
                                        height: "6px",
                                        background:
                                            i === cur
                                                ? "#C9A050"
                                                : "rgba(255,255,255,0.2)",
                                    }}
                                />
                            ))}
                        </div>
                        <button
                            onClick={() => emblaApi?.scrollNext()}
                            className="text-xs transition-colors hover:text-white"
                            style={{
                                color: "rgba(255,255,255,0.3)",
                                fontFamily: "Inter, sans-serif",
                            }}
                        >
                            NEXT
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
