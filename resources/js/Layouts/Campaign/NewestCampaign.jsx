import React, { useState, useEffect } from "react";
import CampaignCardDark from "./CampaignCardDark";
import Reveal from "./Reveal";
import axios from "axios";
import useSlider from "./useSlider";
import {
    btnBase,
    btnOutline,
    btnSizeSm,
    btnGhostDark,
    cx,
} from "./buttonVariants";

// Pengganti .wrap { max-width:1240px; margin:0 auto; padding:0 32px; }
export const wrap = "max-w-[1240px] mx-auto px-8";

// Pengganti .slide { width:min(320px,84vw); } + 2 media query breakpoint (700px, 1100px)
export const slideWidth =
    "flex-none snap-start w-[min(320px,84vw)] " +
    "min-[700px]:w-[calc((100%-22px)/2)] " +
    "min-[1100px]:w-[calc((100%-44px)/3)]";

// Pengganti .slider-track { display:flex; gap:22px; overflow-x:auto; scroll-snap-type:x mandatory; }
export const sliderTrack =
    "flex gap-[22px] overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2.5 scrollbar-hide";

// Pengganti .arrow-btn (versi terang & versi on-dark)
export const arrowBtn =
    "w-[42px] h-[42px] rounded-full border-[1.5px] border-alabaster flex items-center justify-center " +
    "cursor-pointer bg-white transition-all duration-200 text-carbon hover:border-brown hover:text-brown hover:bg-smoke";

export const arrowBtnDark =
    "w-[42px] h-[42px] rounded-full border-[1.5px] border-white/25 flex items-center justify-center " +
    "cursor-pointer bg-white/[0.06] transition-all duration-200 text-white hover:border-amberl2 hover:text-amberl2 hover:bg-white/10";

export function NewestCampaigns() {
    const { trackRef, goPrev, goNext } = useSlider();
    const [popularCampaigns, setPopularCampaigns] = useState([]);

    useEffect(() => {
        axios
            .get("/api/campaigns") // sesuaikan endpoint-nya
            .then((res) => setPopularCampaigns(res.data));
    }, []);

    return (
        <section className="py-[104px] pb-[96px] bg-[radial-gradient(80%_100%_at_100%_0%,rgba(139,94,52,.28),transparent_60%),radial-gradient(60%_80%_at_0%_100%,rgba(107,66,38,.3),transparent_55%),linear-gradient(180deg,#161511,#1c1912_100%)]">
            <div className={wrap}>
                <Reveal className="flex justify-between items-end gap-6 mb-10 flex-wrap">
                    <div className="max-w-[600px] text-left">
                        <div className="text-[11.5px] tracking-[.14em] uppercase text-amber-100 inline-flex items-center gap-2 mb-[14px]">
                            <span className="w-[22px] h-[1.5px] bg-amber-100" />{" "}
                            Just Added
                        </div>
                        <h2 className="font-title font-bold text-[clamp(24px,3vw,34px)] tracking-[-.01em] text-white leading-[1.2] mb-3">
                            Stories that just began — be part of the first
                            chapter
                        </h2>
                        <p className="text-white/60 text-[15px] leading-[1.6] font-body">
                            Early donations are often what shape a story&apos;s
                            whole direction.
                        </p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                        <a
                            href="#"
                            className={cx(btnBase, btnGhostDark, btnSizeSm)}
                        >
                            View All
                        </a>
                        <div className="flex gap-2">
                            <div className={arrowBtnDark} onClick={goPrev}>
                                ←
                            </div>
                            <div className={arrowBtnDark} onClick={goNext}>
                                →
                            </div>
                        </div>
                    </div>
                </Reveal>

                <Reveal className="relative">
                    <div className={sliderTrack} ref={trackRef}>
                        {popularCampaigns.map((c) => (
                            <div
                                className={slideWidth}
                                data-slide-item
                                key={c.id}
                            >
                                <CampaignCardDark c={c} />
                            </div>
                        ))}
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
