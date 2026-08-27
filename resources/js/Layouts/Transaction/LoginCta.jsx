export function LoginCta() {
    return (
        <div className="glass-panel mb-3.5 flex flex-wrap items-center gap-[18px] rounded-xl px-[26px] py-[22px]">
            <div className="flex h-11 w-11 flex-none items-center justify-center rounded-2xl bg-gradient-to-br from-amber-light/[.22] to-amber-dark/[.16] text-amber-dark">
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    className="h-5 w-5"
                >
                    <rect x="4" y="10" width="16" height="10" rx="2" />
                    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                </svg>
            </div>
            <div className="min-w-[220px] flex-1">
                <h4 className="m-0 mb-1 text-[14.5px] font-extrabold text-[#161511]">
                    Want to see more detail?
                </h4>
                <p className="m-0 max-w-[46ch] text-[13px] leading-[1.5] text-grey">
                    Log in to view the fund disbursement report by stage, photo
                    evidence of activities, and your full donation history at
                    AUN Foundation.
                </p>
            </div>
            <a
                href="/login"
                className="flex-none rounded-full border-none bg-[#161511] px-6 py-3.5 text-sm font-bold text-white transition-all duration-[250ms] ease-in-out hover:-translate-y-px hover:bg-deep-walnut hover:shadow-[0_12px_24px_-12px_rgba(74,50,28,0.4)]"
            >
                Log in / Sign up
            </a>
        </div>
    );
}
