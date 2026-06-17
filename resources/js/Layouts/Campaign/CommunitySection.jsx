import React, { useEffect, useState, useCallback } from "react";
import { ChevronRight, ArrowUpRight, TrendingUp } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import axios from "axios";
import { Link } from "@inertiajs/react";

const communityData = [
    {
        id: 101,
        title: "Renovasi Balai Desa dan Ruang Belajar Terdampak Bencana",
        cat: "Community",
        image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=700&h=900&fit=crop&auto=format",
        raised: 78000000,
        goal: 120000000,
        donors: 834,
        daysLeft: 19,
        org: "Yayasan Rumah Harapan",
    },
    {
        id: 102,
        title: "Dapur Umum untuk 500 Keluarga Pesisir yang Membutuhkan",
        cat: "Community",
        image: "https://images.unsplash.com/photo-1710092784814-4a6f158913b8?w=700&h=900&fit=crop&auto=format",
        raised: 45000000,
        goal: 80000000,
        donors: 612,
        daysLeft: 12,
        org: "Komunitas Peduli Nusantara",
    },
    {
        id: 103,
        title: "Sumur Bersih untuk Desa Terpencil di Kalimantan Tengah",
        cat: "Community",
        image: "https://images.unsplash.com/photo-1776507178339-504c9f129d80?w=700&h=900&fit=crop&auto=format",
        raised: 32000000,
        goal: 55000000,
        donors: 390,
        daysLeft: 30,
        org: "Air untuk Kehidupan",
    },
    {
        id: 104,
        title: "Pemulihan Nelayan Pasca Badai di Sulawesi Utara",
        cat: "Community",
        image: "https://images.unsplash.com/photo-1628717341663-0007b0ee2597?w=700&h=900&fit=crop&auto=format",
        raised: 61000000,
        goal: 100000000,
        donors: 720,
        daysLeft: 8,
        org: "Laut Lestari Foundation",
    },
    {
        id: 105,
        title: "10 Rumah Layak Huni untuk Lansia Terlantar Jawa Tengah",
        cat: "Community",
        image: "https://images.unsplash.com/photo-1560220604-1985ebfe28b1?w=700&h=900&fit=crop&auto=format",
        raised: 56000000,
        goal: 90000000,
        donors: 540,
        daysLeft: 22,
        org: "Rumah untuk Semua",
    },
];

function useCarousel() {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: "start",
        containScroll: "trimSnaps",
        dragFree: true,
    });
    const [canPrev, setCanPrev] = useState(false);
    const [canNext, setCanNext] = useState(true);
    const sync = useCallback(() => {
        if (!emblaApi) return;
        setCanPrev(emblaApi.canScrollPrev());
        setCanNext(emblaApi.canScrollNext());
    }, [emblaApi]);
    useEffect(() => {
        if (!emblaApi) return;
        emblaApi.on("select", sync);
        emblaApi.on("reInit", sync);
        sync();
    }, [emblaApi, sync]);
    return { emblaRef, emblaApi, canPrev, canNext };
}

function PortraitCard({ c }) {
    const pct = Math.min((c.collected / c.target) * 100, 100);
    return (
        <div
            className="group relative overflow-hidden cursor-pointer"
            style={{ height: "420px", background: C.black }}
        >
            <Link href={`/campaigns/${c.slug}`}>
                <img
                    src={c.image}
                    alt={c.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ filter: "brightness(0.45) saturate(0.75)" }}
                />
                {/* gradient from bottom */}
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "linear-gradient(to top, rgba(10,10,10,0.97) 0%, rgba(10,10,10,0.3) 55%, transparent 100%)",
                    }}
                />
                {/* top cat */}
                <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start">
                    <span
                        className="text-xs tracking-widest uppercase"
                        style={{
                            color: C.goldLight,
                            fontFamily: "Inter, sans-serif",
                            letterSpacing: "0.14em",
                        }}
                    >
                        {c.cat}
                    </span>
                    <div
                        className="w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        style={{ background: C.goldLight }}
                    >
                        <ArrowUpRight size={14} color={C.black} />
                    </div>
                </div>
                {/* bottom content */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p
                        className="text-xs mb-2"
                        style={{
                            color: "rgba(255,255,255,0.4)",
                            fontFamily: "Inter, sans-serif",
                        }}
                    >
                        {c.org}
                    </p>
                    <h3
                        className="mb-4"
                        style={{
                            fontFamily: "'Playfair Display', Georgia, serif",
                            fontSize: "1.05rem",
                            fontWeight: 700,
                            color: C.offwhite,
                            lineHeight: 1.4,
                            display: "-webkit-box",
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                        }}
                    >
                        {c.title}
                    </h3>
                    {/* progress */}
                    <div
                        className="h-px w-full mb-3"
                        style={{ background: "rgba(255,255,255,0.1)" }}
                    >
                        <div
                            className="h-full"
                            style={{
                                width: `${pct}%`,
                                background: C.goldLight,
                            }}
                        />
                    </div>
                    <div className="flex justify-between items-center">
                        <span
                            style={{
                                fontFamily: "Inter, sans-serif",
                                fontSize: "0.875rem",
                                fontWeight: 700,
                                color: C.goldLight,
                            }}
                        >
                            Rp {c.collected}
                        </span>
                        <span
                            className="text-xs"
                            style={{
                                color: "rgba(255,255,255,0.35)",
                                fontFamily: "Inter, sans-serif",
                            }}
                        >
                            {Math.round(pct)}% · {c.daysLeft}h
                        </span>
                    </div>
                </div>
            </Link>
        </div>
    );
}

const C = {
    black: "#0A0A0A",
    dark: "#111111",
    dark2: "#1C1612",
    gold: "#8B6835",
    goldLight: "#ac6c29",
    white: "#FFFFFF",
    offwhite: "#F7F3EB",
    cream: "#EDE5D4",
    muted: "#6B6055",
};

export function CommunitySection() {
    const [campaignsFeatureds, setCampaignsFeatureds] = useState([]);

    useEffect(() => {
        axios
            .get("/api/campaigns")
            .then((res) => setCampaignsFeatureds(res.data));
    }, []);

    const listCampaign = campaignsFeatureds;
    const { emblaRef, emblaApi, canPrev, canNext } = useCarousel();
    return (
        <section className="py-20 overflow-hidden bg-white">
            <div className="max-w-7xl mx-auto px-8 lg:px-16">
                {/* header */}
                <div className="flex items-end justify-between mb-10">
                    <div>
                        <div className="flex items-center gap-4 mb-3">
                            <div
                                className="h-px w-8"
                                style={{ background: C.gold }}
                            />
                            <span
                                className="text-xs tracking-[0.2em] uppercase"
                                style={{
                                    color: C.gold,
                                    fontFamily: "Inter, sans-serif",
                                }}
                            >
                                Community
                            </span>
                        </div>
                        <h2
                            style={{
                                fontFamily: "'Playfair Display', serif",
                                fontSize: "clamp(1.8rem, 3.2vw, 2.6rem)",
                                fontWeight: 800,
                                color: C.dark2,
                                lineHeight: 1.1,
                                letterSpacing: "-0.02em",
                            }}
                        >
                            Building Together
                            <br />
                            <span style={{ color: C.goldLight }}>
                                Community
                            </span>
                        </h2>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => emblaApi?.scrollPrev()}
                            disabled={!canPrev}
                            className="w-10 h-10 border flex items-center justify-center transition-colors hover:border-[#C9A050] hover:text-[#C9A050] disabled:opacity-20"
                            style={{
                                borderColor: "rgba(255,255,255,0.15)",
                                color: "rgba(255,255,255,0.4)",
                            }}
                        >
                            <ArrowUpRight
                                size={15}
                                style={{
                                    transform:
                                        "rotate(180deg) scaleY(-1) scaleX(-1)",
                                }}
                            />
                        </button>
                        <button
                            onClick={() => emblaApi?.scrollNext()}
                            disabled={!canNext}
                            className="w-10 h-10 border flex items-center justify-center transition-colors hover:border-[#C9A050] hover:text-[#C9A050] disabled:opacity-20"
                            style={{
                                borderColor: "rgba(255,255,255,0.15)",
                                color: "rgba(255,255,255,0.4)",
                            }}
                        >
                            <ArrowUpRight
                                size={15}
                                style={{
                                    transform: "scaleX(-1) rotate(90deg)",
                                }}
                            />
                        </button>
                        <button
                            className="flex rounded-lg items-center gap-2 px-5 py-2 text-sm border border-transition-colors hover:border-[#C9A050] hover:text-[#C9A050] border-[#8B6835] text-[#8B6835]"
                            style={{
                                fontFamily: "Inter, sans-serif",
                            }}
                        >
                            Semua <ChevronRight size={14} />
                        </button>
                    </div>
                </div>

                {/* slider */}
                <div
                    ref={emblaRef}
                    className="overflow-hidden"
                    style={{ marginRight: "-4rem" }}
                >
                    <div className="flex gap-4">
                        {listCampaign?.map((c) => (
                            <div
                                key={c.id}
                                className="flex-none"
                                style={{ width: "clamp(240px, 22vw, 280px)" }}
                            >
                                <PortraitCard c={c} />
                            </div>
                        ))}
                        <div className="flex-none w-16" />
                    </div>
                </div>
            </div>
        </section>
    );
}
