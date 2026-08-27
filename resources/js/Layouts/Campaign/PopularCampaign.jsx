import React from "react";
import CampaignCard from "./CampaignCard";
import Reveal from "./Reveal";
import useSlider from "./useSlider";
import { btnBase, btnOutline, btnSizeSm, cx } from "./buttonVariants";

export const popularCampaigns = [
    {
        id: "papua",
        image: "https://picsum.photos/seed/aun-papua/640/480",
        alt: "School Supplies for Papua",
        badgeFloat: "#1 Most Popular",
        badgeCat: "Education",
        title: "School Supplies for Papua",
        story: "New books and uniforms are helping 210 children in remote Papua walk back into school with confidence.",
        percent: 85,
        raised: "Rp 170M",
        goal: "Rp 200M",
        donors: "1,204 donors",
    },
    {
        id: "mangrove",
        image: "https://picsum.photos/seed/aun-mangrove/640/480",
        alt: "Mangrove Restoration",
        badgeFloat: "#2 Most Popular",
        badgeCat: "Environment",
        title: "Mangrove Restoration",
        story: "Replanting lost coastline to protect fishing villages from erosion while restoring their catch.",
        percent: 60,
        raised: "Rp 300M",
        goal: "Rp 500M",
        donors: "842 donors",
    },
    {
        id: "oxygen",
        image: "https://picsum.photos/seed/aun-oxygen/640/480",
        alt: "Oxygen for Remote Clinics",
        badgeFloat: "#3 Most Popular",
        badgeCat: "Health",
        title: "Oxygen for Remote Clinics",
        story: "Emergency oxygen supply reaching remote clinics that used to wait hours for help.",
        percent: 45,
        raised: "Rp 540M",
        goal: "Rp 1.2B",
        donors: "613 donors",
    },
    {
        id: "mosque",
        image: "https://picsum.photos/seed/aun-mosque/640/480",
        alt: "Mosque Development",
        badgeFloat: "#4 Most Popular",
        badgeCat: "Facilities",
        title: "Mosque Renovation in a Remote Village",
        story: "Repairing the roof and floor of the village's only place of worship and Qur'an learning.",
        percent: 72,
        raised: "Rp 216M",
        goal: "Rp 300M",
        donors: "905 donors",
    },
    {
        id: "skill",
        image: "https://picsum.photos/seed/aun-skill/640/480",
        alt: "Skills Training",
        badgeFloat: "#5 Most Popular",
        badgeCat: "Economy",
        title: "Skills Training for Homemakers",
        story: "Sewing classes and micro-enterprise support helping mothers build their own income.",
        percent: 38,
        raised: "Rp 76M",
        goal: "Rp 200M",
        donors: "331 donors",
    },
    {
        id: "orphan",
        image: "https://picsum.photos/seed/aun-orphan/640/480",
        alt: "Orphans Support",
        badgeFloat: "#6 Most Popular",
        badgeCat: "Orphans",
        title: "Scholarships for Orphans in Central Java",
        story: "Covering school fees and daily needs for 80 orphaned children so their education never stops.",
        percent: 54,
        raised: "Rp 108M",
        goal: "Rp 200M",
        donors: "470 donors",
    },
];

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

export function PopularCampaigns() {
    const { trackRef, goPrev, goNext } = useSlider();

    return (
        <section className="bg-[#F3F3F2] pt-[44px] pb-[84px]" id="sec-popular">
            <div className={wrap}>
                <Reveal className="flex justify-between items-end gap-6 mb-10 flex-wrap">
                    <div className="text-left">
                        <div className="text-xs tracking-[.14em] uppercase text-brown inline-flex items-center gap-2 mb-[14px]">
                            <span className="w-[22px] h-[1.5px] bg-primary" />{" "}
                            Most Popular Campaign
                        </div>
                        <h2 className="font-title font-bold text-[clamp(24px,3vw,34px)] tracking-[-.01em] text-pitch leading-[1.2] mb-3">
                            Stories the community is rallying behind
                        </h2>
                        <p className="text-grey text-[15px] leading-[1.6] font-body">
                            Campaigns with the highest donor support.
                        </p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                        <a
                            href="#"
                            className="inline-flex items-center justify-center gap-2 rounded-full font-bold transition-all duration-[250ms] ease-aun whitespace-nowrap bg-transparent border-[1.5px] border-[#E6E6E6] text-[#232629] hover:border-primary hover:text-primary hover:-translate-y-0.5 px-4 py-[9px] text-[12.5px]"
                        >
                            View All
                        </a>
                        <div className="flex gap-2">
                            <div
                                className="w-[42px] h-[42px] rounded-full border-[1.5px] border-[#E6E6E6] flex items-center justify-center cursor-pointer bg-white transition-all duration-200 text-[#232629] hover:border-primary hover:text-primary hover:bg-[#F3F3F2]"
                                onClick={goPrev}
                            >
                                ←
                            </div>
                            <div
                                className="w-[42px] h-[42px] rounded-full border-[1.5px] border-[#E6E6E6] flex items-center justify-center cursor-pointer bg-white transition-all duration-200 text-[#232629] hover:border-primary hover:text-primary hover:bg-[#F3F3F2]"
                                onClick={goNext}
                            >
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
                                <CampaignCard {...c} />
                            </div>
                        ))}
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
