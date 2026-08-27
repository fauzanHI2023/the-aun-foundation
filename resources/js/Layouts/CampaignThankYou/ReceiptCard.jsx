import React, { useEffect, useState } from "react";
import GlassPanel from "@/Layouts/CampaignThankYou/GlassPanel.jsx";

function formatRupiah(value) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    }).format(value || 0);
}

export default function ReceiptCard({
    total,
    date,
    invoice,
    method,
    items,
    campaign,
    percentage,
    onCopyId,
    animateTotal = false,
}) {
    const [amount, setAmount] = useState(animateTotal ? 0 : total);

    useEffect(() => {
        if (!animateTotal) {
            setAmount(total);
            return;
        }
        const step = Math.ceil(total / 40) || 1;
        let cur = 0;
        const t = setInterval(() => {
            cur += step;
            if (cur >= total) {
                cur = total;
                clearInterval(t);
            }
            setAmount(cur);
        }, 25);
        return () => clearInterval(t);
    }, [total, animateTotal]);

    return (
        <GlassPanel
            className="md:w-[40%] overflow-hidden rounded-[28px] p-0"
            style={{ gridArea: "receipt" }}
        >
            <div className="relative">
                {/* head */}
                <div className="relative bg-gradient-to-b from-primary via-primary to-secondary px-7 pb-10 pt-[30px] text-white">
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_15%_0%,rgba(255,255,255,.28),transparent_55%)]" />
                    <div className="relative z-[1] flex items-start justify-between">
                        <div>
                            <h4 className="text-[11px] font-bold uppercase tracking-[.14em] opacity-85">
                                Total paid
                            </h4>
                            <h3 className="mt-2 text-[34px] font-semibold">
                                {formatRupiah(amount)}
                            </h3>
                        </div>
                        {/* <div className="grid h-11 w-11 grid-cols-4 gap-0.5 rounded-[9px] bg-white/[.18] p-1.5">
                            {Array.from({ length: 16 }).map((_, i) => (
                                <i
                                    key={i}
                                    className={
                                        "rounded-[1px] " +
                                        ((i + 1) % 3 === 0 || (i + 1) % 5 === 0
                                            ? "bg-white/[.28]"
                                            : "bg-white/85")
                                    }
                                />
                            ))}
                        </div> */}
                    </div>
                </div>

                {/* body */}
                <div className="bg-white/[.72] px-7 pb-[30px] pt-2 backdrop-blur-[30px]">
                    <div className="flex justify-between py-[13px] text-[13.5px]">
                        <span className="text-[#6b6764]">Date</span>
                        <span className="font-semibold">{date}</span>
                    </div>

                    <div className="flex justify-between border-t border-[#e6ddd4]/70 py-[13px] text-[13.5px]">
                        <span className="text-[#6b6764]">Donation Number</span>
                        <span className="flex items-center gap-1.5 font-semibold">
                            {invoice}
                            <button
                                onClick={onCopyId}
                                title="Salin ID"
                                className="flex h-[22px] w-[22px] items-center justify-center rounded-[7px] bg-[#6b6764]/10 text-[#ac6c29] transition-colors duration-150 hover:bg-[#6b6764]/20"
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.4"
                                    className="h-[11px] w-[11px]"
                                >
                                    <rect
                                        x="9"
                                        y="9"
                                        width="12"
                                        height="12"
                                        rx="2"
                                    />
                                    <path d="M5 15V5a2 2 0 0 1 2-2h10" />
                                </svg>
                            </button>
                        </span>
                    </div>

                    <div className="flex justify-between border-t border-[#e6ddd4]/70 py-[13px] text-[13.5px]">
                        <span className="text-[#6b6764]">Payment Method</span>
                        <span className="font-semibold">{method ?? "-"}</span>
                    </div>

                    {items?.length > 0 && (
                        <div className="border-t border-[#e6ddd4]/70 pt-2">
                            {items.map((item, index) => (
                                <div key={index} className="flex gap-4 py-4">
                                    {campaign?.thumbnail && (
                                        <img
                                            src={campaign.thumbnail}
                                            alt={item.campaign_title}
                                            className="h-14 w-14 flex-shrink-0 rounded-[12px] object-cover"
                                        />
                                    )}
                                    <div className="flex-1">
                                        <div className="mb-0.5 text-[14.5px] font-semibold text-[#1c1b1b]">
                                            {item.campaign_title}
                                        </div>
                                        {(campaign?.category ||
                                            campaign?.location) && (
                                            <div className="text-[12px] text-[#6b6764]">
                                                {[
                                                    campaign?.category,
                                                    campaign?.location,
                                                ]
                                                    .filter(Boolean)
                                                    .join(" · ")}
                                            </div>
                                        )}
                                    </div>
                                    <div className="whitespace-nowrap text-[14px] font-semibold text-[#1c1b1b]">
                                        {formatRupiah(item.amount)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {campaign &&
                        percentage !== null &&
                        percentage !== undefined && (
                            <div className="border-t border-[#e6ddd4]/70 pb-1 pt-4">
                                <div className="mb-2 flex justify-between text-[12.5px] text-[#1c1b1b]">
                                    <span>
                                        Terkumpul{" "}
                                        <span className="font-semibold text-[#ac6c29]">
                                            {formatRupiah(
                                                campaign.collected_amount
                                            )}
                                        </span>
                                    </span>
                                    <span className="text-[#6b6764]">
                                        dari{" "}
                                        {formatRupiah(campaign.target_amount)}
                                    </span>
                                </div>
                                <div className="h-[7px] w-full overflow-hidden rounded-full bg-[#e6ddd4]">
                                    <div
                                        className="h-full rounded-full bg-[#ac6c29]"
                                        style={{ width: `${percentage}%` }}
                                    />
                                </div>
                                <div className="mt-2 text-[11.5px] text-[#6b6764]">
                                    {percentage}% tercapai
                                    {campaign.donors_count != null &&
                                        ` · ${campaign.donors_count} donatur turut membantu`}
                                </div>
                            </div>
                        )}

                    <div className="relative mt-[18px] flex items-baseline justify-between border-t border-[#e6ddd4]/70 pt-[18px]">
                        <h4 className="text-[14.5px] font-semibold text-[#1c1b1b]">
                            Donation Amount
                        </h4>
                        <span className="font-serif text-[26px] font-semibold text-[#ac6c29]">
                            {formatRupiah(total)}
                        </span>
                    </div>
                </div>
            </div>
        </GlassPanel>
    );
}
