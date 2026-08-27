import React from "react";
import { Link } from "@inertiajs/react";
import { btnBase, btnGhostDark, btnSizeSm, cx } from "./buttonVariants";

/**
 * CampaignCardDark — kartu kampanye versi gelap/glass.
 * Dipakai di section "Just Added" (sec-newest).
 */
export default function CampaignCardDark({ c }) {
    const pct = Math.min((c.collected / c.target) * 100, 100);
    return (
        <Link href={`/campaigns/${c.slug}`} className="">
            <div className="group flex flex-col overflow-hidden h-full bg-white/[0.05] border border-white/[0.12] backdrop-blur-[14px] rounded-[26px] transition-all duration-[350ms] ease-aun hover:-translate-y-1.5 hover:border-[rgba(232,180,106,.4)] hover:bg-white/[0.08]">
                <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                        src={c.image}
                        alt={c.title}
                        className="w-full h-full object-cover transition-transform duration-[600ms] ease-aun group-hover:scale-[1.06]"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(0,0,0,.65))]" />
                    <div className="absolute top-[14px] left-[14px] bg-[rgba(232,180,106,.9)] text-pitch font-title font-bold text-[10.5px] tracking-[.05em] px-[11px] py-[6px] rounded-full flex items-center gap-1.5">
                        ✦ New · {c.timeAgo}
                    </div>
                    <div className="absolute top-[14px] right-[14px] bg-khaki text-walnut font-title font-bold text-[10.5px] px-[11px] py-[6px] rounded-full">
                        {c.cat}
                    </div>
                </div>

                <div className="px-5 pt-5 pb-[22px] flex-1 flex flex-col">
                    <h3 className="font-title font-bold text-[16px] text-white leading-[1.32] mb-2">
                        {c.title}
                    </h3>
                    <p className="text-white/55 text-[13.5px] leading-[1.55] mb-4 flex-1 font-body">
                        {c.short_description}
                    </p>

                    <div className="h-1.5 rounded-full bg-white/10 overflow-hidden mb-2.5">
                        <div
                            className="block h-full rounded-full bg-[linear-gradient(90deg,#B9873F,#744D2C)]"
                            style={{ width: `${pct}%` }}
                        />
                    </div>

                    <div className="flex justify-between items-baseline mb-4">
                        <div className="font-title font-bold text-[14px] text-white">
                            {c.raised}{" "}
                            <span className="font-body font-semibold text-[12px] text-white/45">
                                raised
                            </span>
                        </div>
                        <div className="text-[12px] text-amber-100">
                            {Math.round(pct)}%
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="flex">
                                <span className="w-[22px] h-[22px] rounded-full border-2 border-[#221b13] bg-khaki -ml-2 first:ml-0" />
                            </div>
                            {/* <div className="font-title text-[11px] text-white/45">
                            {donors}
                        </div> */}
                        </div>
                        <a
                            href="#"
                            className={cx(btnBase, btnGhostDark, btnSizeSm)}
                        >
                            Support
                        </a>
                    </div>
                </div>
            </div>
        </Link>
    );
}
