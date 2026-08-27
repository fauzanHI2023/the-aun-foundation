import { useState } from "react";

export function PageHeader({ userName, onDownloadReport }) {
    const [isGenerating, setIsGenerating] = useState(false);

    async function handleDownload() {
        if (isGenerating) return;
        setIsGenerating(true);
        try {
            await onDownloadReport?.();
        } finally {
            setIsGenerating(false);
        }
    }

    return (
        <div className="pt-11 pb-2 flex items-end justify-between gap-6 flex-wrap">
            <div>
                <h1 className="text-white font-display font-bold text-[32px] leading-[40px] tracking-[-.01em] mb-1.5">
                    Welcome back, {userName}
                </h1>
                <p className="text-white text-onsurface-var text-base">
                    Here is a summary of the impact of each contribution you’ve
                    made.
                </p>
            </div>
            <div className="flex gap-2.5">
                <button
                    type="button"
                    onClick={handleDownload}
                    disabled={isGenerating}
                    className="text-white inline-flex items-center gap-2 py-[11px] px-[18px] rounded-full font-label text-[13px] font-semibold border border-white/10 bg-white/5 text-onsurface backdrop-blur-md hover:border-primary/35 hover:bg-white/[0.09] transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isGenerating ? (
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            className="w-3.5 h-3.5 animate-spin"
                        >
                            <circle
                                cx="12"
                                cy="12"
                                r="9"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeOpacity="0.25"
                            />
                            <path
                                d="M21 12a9 9 0 0 0-9-9"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                        </svg>
                    ) : (
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="w-3.5 h-3.5"
                        >
                            <path d="M12 3v13m0 0l-4-4m4 4l4-4M4 21h16" />
                        </svg>
                    )}
                    {isGenerating ? "Membuat laporan..." : "Unduh Laporan"}
                </button>
                {/* <button className="text-white inline-flex items-center gap-2 py-[11px] px-[18px] rounded-full font-label text-[13px] font-semibold bg-primary text-white hover:brightness-[1.06] transition-[filter] duration-150">
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth="2"
                        className="w-3.5 h-3.5"
                    >
                        <path d="M12 5v14M5 12h14" />
                    </svg>
                    Donasi Baru
                </button> */}
            </div>
        </div>
    );
}
