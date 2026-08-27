const TONE_ICON_BG = {
    success: "from-[#B9873F] to-[#6B4226]",
    pending: "from-[#AF9B7E] to-[#8B5E34]",
    failed: "from-[#C15C46] to-[#9A4A3A]",
};

const TONE_BADGE = {
    success: "bg-[#4C8B67]/[0.14] text-[#33604A]",
    pending: "bg-[#8B5E34]/[0.14] text-#8B5E34",
    failed: "bg-[#4C8B67]/[0.14] text-[#9A4A3A]",
};

export function ResultHead({ donorName, statusLabel, statusTone }) {
    return (
        <div className="flex items-center justify-between gap-3.5 px-7 py-[26px]">
            <div className="flex items-center gap-3.5">
                <div
                    className={`flex h-[38px] w-[38px] flex-none items-center justify-center rounded-full bg-gradient-to-br shadow-[0_6px_16px_-6px_rgba(107,66,38,0.5)] ${
                        TONE_ICON_BG[statusTone] || TONE_ICON_BG.pending
                    }`}
                >
                    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]">
                        <path
                            d="M5 12.5l4.5 4.5L19 7.5"
                            stroke="#fff"
                            strokeWidth="3"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
                <div>
                    <h3 className="text-base font-extrabold text-primary-black">
                        Donation found
                    </h3>
                    <p className="mt-0.5 text-[13px] text-grey">
                        On behalf of {donorName || "-"}
                    </p>
                </div>
            </div>

            <span
                className={`text-[11px] font-semibold uppercase tracking-wide whitespace-nowrap rounded-full px-2.5 py-1.5 ${
                    TONE_BADGE[statusTone] || TONE_BADGE.pending
                }`}
            >
                {statusLabel}
            </span>
        </div>
    );
}

export default ResultHead;
