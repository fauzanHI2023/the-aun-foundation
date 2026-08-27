export function Hero() {
    return (
        <div className="mb-10 max-w-[600px] text-left">
            <p className="mb-3.5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#8B5E34]">
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    className="h-3.5 w-3.5"
                >
                    <circle cx="11" cy="11" r="7" />
                    <path d="M21 21l-4.3-4.3" />
                </svg>
                Check donation
            </p>

            <h1 className="m-0 mb-4 font-display text-[clamp(34px,5.4vw,52px)] font-medium leading-[1.05] tracking-[-0.02em] text-[#161511]">
                Track your{" "}
                <em className="bg-gradient-to-r from-amber-dark to-[#744D2C] bg-clip-text font-medium not-italic italic text-transparent">
                    donation
                </em>
                <br />
                journey.
            </h1>

            <p className="m-0 max-w-[52ch] text-base leading-[1.65] text-carbon-400 opacity-70">
                Enter the invoice number or donation ID you received by email to
                see its verification and disbursement status in real time.
            </p>
        </div>
    );
}
