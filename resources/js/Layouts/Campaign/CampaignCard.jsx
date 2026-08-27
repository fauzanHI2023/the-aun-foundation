import React from "react";
import { btnBase, btnOutline, btnSizeSm, cx } from "./buttonVariants";

/**
 * CampaignCard — kartu kampanye versi terang (light).
 * Dipakai di section "Most Popular".
 */
export default function CampaignCard({
    image,
    alt,
    badgeFloat,
    badgeCat,
    title,
    story,
    percent,
    raised,
    goal,
    donors,
}) {
    return (
        <div className="group h-full flex flex-col bg-white border border-[#E6E6E6] rounded-[26px] overflow-hidden transition-all duration-[350ms] ease-aun hover:-translate-y-1.5 hover:shadow-[0_30px_50px_-24px_rgba(22,21,17,.22)]">
            <div className="relative aspect-[4/3] overflow-hidden">
                <img
                    src={image}
                    alt={alt}
                    className="w-full h-full object-cover transition-transform duration-[600ms] ease-aun group-hover:scale-[1.06]"
                />
                {badgeFloat && (
                    <div className="absolute top-[14px] left-[14px] bg-[rgba(22,21,17,.55)] backdrop-blur-md text-white font-title text-[10.5px] tracking-[.05em] px-[11px] py-[6px] rounded-full flex items-center gap-1.5">
                        {badgeFloat}
                    </div>
                )}
                {badgeCat && (
                    <div className="absolute top-[14px] right-[14px] bg-[#AF9B7E] text-white font-bold text-[10.5px] px-[11px] py-[6px] rounded-full">
                        {badgeCat}
                    </div>
                )}
            </div>

            <div className="px-5 pt-5 pb-[22px] flex-1 flex flex-col">
                <h3 className="font-title font-bold text-[16px] text-pitch leading-[1.32] mb-2">
                    {title}
                </h3>
                <p className="text-grey text-[13.5px] leading-[1.55] mb-4 flex-1 font-body">
                    {story}
                </p>

                <div className="h-1.5 rounded-full bg-smoke overflow-hidden mb-2.5">
                    <div
                        className="block h-full rounded-full bg-[linear-gradient(90deg,#B9873F,#744D2C)]"
                        style={{ width: `${percent}%` }}
                    />
                </div>

                <div className="flex justify-between items-baseline mb-4">
                    <div className="font-title font-bold text-[14px] text-pitch">
                        {raised}{" "}
                        {goal && (
                            <span className="font-body font-semibold text-[12px] text-grey">
                                / {goal}
                            </span>
                        )}
                    </div>
                    <div className="font-title text-[12px] text-brown font-medium">
                        {percent}%
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="flex">
                            <span className="w-[22px] h-[22px] rounded-full border-2 border-white bg-grey-light -ml-2 first:ml-0" />
                            <span className="w-[22px] h-[22px] rounded-full border-2 border-white bg-grey-light -ml-2" />
                            <span className="w-[22px] h-[22px] rounded-full border-2 border-white bg-grey-light -ml-2" />
                        </div>
                        <div className="font-title text-[11px] text-grey">
                            {donors}
                        </div>
                    </div>
                    <a
                        href="#"
                        className="inline-flex items-center justify-center gap-2 rounded-full font-bold transition-all duration-[250ms] ease-aun whitespace-nowrap bg-transparent border-[1.5px] border-[#E6E6E6] text-[#232629] hover:border-brown hover:text-brown hover:-translate-y-0.5 px-4 py-[9px] text-[12.5px]"
                    >
                        Support
                    </a>
                </div>
            </div>
        </div>
    );
}
