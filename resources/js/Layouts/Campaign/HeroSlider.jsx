import React, { useState } from "react";
import Reveal from "./Reveal";
import {
    btnBase,
    btnPrimary,
    btnOutline,
    btnSizeHero,
    btnSizeSearch,
    cx,
} from "./buttonVariants";
import { Heart } from "lucide-react";

export function HeroSlider() {
    const [query, setQuery] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        // TODO: hubungkan ke logika pencarian kampanye
        console.log("search:", query);
    };

    return (
        <section
            className="relative overflow-hidden pt-6 pb-24 sm:pt-8 sm:pb-5"
            style={{
                background:
                    "linear-gradient(135deg, rgb(45 30 9) 0%, rgb(107, 66, 38) 100%)",
            }}
        >
            {/* halo dekoratif (pengganti .hero::before) */}
            <div
                className="absolute top-[8%] -right-[6%] w-[640px] h-[640px] bg-[radial-gradient(circle,rgba(185,135,63,.24),transparent_68%)] blur-[6px] pointer-events-none z-0"
                aria-hidden="true"
            />

            <div className="relative z-[2] max-w-[1240px] mx-auto px-8 pt-[22px] grid grid-cols-1 gap-[34px] items-center min-[900px]:grid-cols-[1.05fr_.95fr] min-[900px]:gap-11">
                {/* content */}
                <div className="max-w-full min-[900px]:max-w-[560px] text-left">
                    <Reveal
                        delay={0}
                        className="inline-flex items-center gap-2 font-title text-[11px] tracking-[.16em] uppercase rounded-full mb-[14px]"
                    >
                        <span className="eyebrow inline-block px-3 py-1 rounded-full mb-6 bg-white/[0.15] border border-white/20 text-white">
                            Asa Untuk Negeri
                        </span>
                    </Reveal>

                    <Reveal
                        as="h1"
                        delay={0.05}
                        className="font-bold lg:text-5xl text-2xl leading-[1.16] tracking-[-.01em] mb-3 text-white/[0.82]"
                    >
                        Every donation writes a{" "}
                        <em className="not-italic text-white/55">
                            new chapter
                        </em>{" "}
                        in their story.
                    </Reveal>

                    <Reveal
                        as="p"
                        delay={0.1}
                        className="text-grey text-[15px] leading-[1.6] max-w-[460px] mb-[22px] font-normal text-primary-white"
                    >
                        AUN Foundation connects your kindness directly with
                        communities in need — transparent, trackable, and
                        meaningful from the first donation to real impact.
                    </Reveal>

                    <Reveal delay={0.15} className="flex gap-3 flex-wrap mb-5">
                        <a
                            href="/donasi"
                            className="btn-cta-primary bg-primary inline-flex items-center gap-2 px-7 py-3.5 rounded-lg font-semibold text-sm text-white"
                        >
                            <Heart className="text-white" />
                            Donate Now
                        </a>
                        <a
                            href="#sec-popular"
                            className="btn-cta-ghost inline-flex items-center gap-2 px-7 py-3.5 rounded-lg font-semibold text-sm"
                        >
                            Explore Campaigns
                        </a>
                    </Reveal>

                    {/* <Reveal
                        as="form"
                        delay={0.2}
                        onSubmit={handleSearch}
                        className="max-w-[520px] mb-5 bg-white border border-alabaster rounded-full pl-[22px] pr-[7px] py-[7px] flex items-center gap-2.5 shadow-[0_16px_36px_-18px_rgba(22,21,17,.16)]"
                    >
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="shrink-0 opacity-55 text-carbon"
                        >
                            <circle cx="11" cy="11" r="7" />
                            <path d="m21 21-4.3-4.3" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search campaigns by location, category, or story…"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="flex-1 bg-transparent border-none outline-none text-carbon text-[14.5px] font-body py-2.5 placeholder:text-grey"
                        />
                        <button
                            type="submit"
                            className={cx(btnBase, btnPrimary, btnSizeSearch)}
                        >
                            Search
                        </button>
                    </Reveal> */}
                </div>

                {/* visual arch */}
                <Reveal
                    delay={0.25}
                    className="relative flex items-center justify-center h-full order-first min-[900px]:order-none min-h-[340px] sm:min-h-[520px]"
                >
                    <div
                        className="absolute inset-[6%_4%] z-0 opacity-50 bg-[radial-gradient(rgba(116,77,44,.35)_1px,transparent_1.4px)] bg-[length:16px_16px]"
                        aria-hidden="true"
                    />
                    <div className="absolute z-[1] w-[48%] sm:w-[56%] aspect-[3/4] rounded-[32px_32%_22px_32%] bg-[#AF9B7E] opacity-55 translate-x-[18%] translate-y-[14%]" />
                    <div className="absolute z-[1] w-[56%] sm:w-[64%] aspect-[3/4] rounded-[32px_32%_22px_32%] border-[1.5px] border-[rgba(185,135,63,.55)] -translate-x-[16%] -translate-y-[12%]" />

                    <div className="relative z-[2] w-[60%] sm:w-[65%] aspect-[3/4] rounded-[32px_32%_22px_32%] overflow-hidden shadow-[0_26px_54px_-20px_rgba(22,21,17,.32)]">
                        <img
                            src="/images/IMG_8383 (1).jpg"
                            alt="AUN Foundation volunteers with the community"
                            className="w-full h-full object-cover grayscale-[15%] contrast-[1.06] brightness-[1.02]"
                        />
                        <div className="absolute inset-0" />
                    </div>

                    <div className="absolute z-[3] w-[15px] h-[15px] rounded-full bg-brown border-[3px] border-white shadow-[0_6px_14px_-4px_rgba(22,21,17,.3)] bottom-[9%] right-[14%]" />
                    <div className="absolute z-[3] w-[9px] h-[9px] rounded-full bg-amberl2 border-[3px] border-white top-[11%] left-[10%]" />
                </Reveal>
            </div>
        </section>
    );
}
