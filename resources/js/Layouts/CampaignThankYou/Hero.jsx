import React from "react";

const ICONS = {
    success: (
        <path
            d="M5 12.5l4.5 4.5L19 7.5"
            stroke="#fff"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    ),
    pending: (
        <>
            <circle
                cx="12"
                cy="12"
                r="7.5"
                stroke="#fff"
                strokeWidth="2.4"
                fill="none"
            />
            <path
                d="M12 7.5v5l3.2 2"
                stroke="#fff"
                strokeWidth="2.4"
                fill="none"
                strokeLinecap="round"
            />
        </>
    ),
    failed: (
        <path
            d="M8 8l8 8M16 8l-8 8"
            stroke="#fff"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
        />
    ),
    expired: (
        <path
            d="M8 8l8 8M16 8l-8 8"
            stroke="#fff"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
        />
    ),
};

const RING_TONE = {
    success: "border-[#ac6c29] from-[#c48a44] to-[#ac6c29]",
    pending: "border-[#b99b6a] from-[#c9ac7c] to-[#9c8354]",
    failed: "border-[#c0524a] from-[#d4695f] to-[#a83f38]",
    expired: "border-[#8f877c] from-[#a49c8f] to-[#79726a]",
};

export default function Hero({ status, eyebrow, title, description }) {
    const ring = RING_TONE[status] ?? RING_TONE.pending;
    const icon = ICONS[status] ?? ICONS.pending;

    return (
        <div className="mb-11 text-left">
            <div className="mb-[26px] flex items-center gap-4">
                <div className="relative h-[52px] w-[52px] flex-none">
                    {status === "success" && (
                        <>
                            <div
                                className={`absolute inset-0 animate-ping rounded-full border-[1.5px] opacity-40 ${
                                    ring.split(" ")[0]
                                }`}
                            />
                        </>
                    )}
                    <div
                        className={`absolute inset-0 flex items-center justify-center rounded-full bg-gradient-to-br shadow-[0_10px_26px_-8px_rgba(28,27,27,0.35)] ${ring}`}
                    >
                        <svg viewBox="0 0 24 24" className="h-6 w-6">
                            {icon}
                        </svg>
                    </div>
                </div>
                <div>
                    <p className="mb-1 text-xs font-bold uppercase tracking-[.14em] text-[#ac6c29]">
                        {eyebrow}
                    </p>
                    <p className="m-0 text-[13.5px] text-[#6b6764]">
                        Check the details of your donation below
                    </p>
                </div>
            </div>

            <h1 className="mb-[22px] font-serif text-[clamp(36px,6vw,60px)] font-semibold leading-[1.05] tracking-[-.01em] text-[#1c1b1b]">
                {title}
            </h1>
            <p className="max-w-[52ch] text-[16px] leading-[1.65] text-[#6b6764]">
                {description}
            </p>
        </div>
    );
}
