const checklistItems = [
    "Salin langsung dari email konfirmasi",
    "Pastikan tidak ada spasi tersembunyi",
    "Huruf besar/kecil tidak berpengaruh",
];

export function NotFoundPanel({ invoiceNumber, onTryAgain, onContactSupport }) {
    return (
        <div className="glass-panel mb-5 animate-fadeUp rounded-card px-9 pb-[38px] pt-11 text-center">
            <div className="relative mx-auto mb-[26px] h-[132px] w-[132px]">
                <div className="absolute inset-0 animate-nf-spin rounded-full border-[1.5px] border-dashed border-warm-bark/35" />
                <div className="absolute inset-4 animate-nf-spin-rev rounded-full border-[1.5px] border-dashed border-khaki-beige/40" />

                <span className="absolute left-[2%] top-[6%] h-[5px] w-[5px] animate-nf-drift rounded-full bg-warm-bark [animation-delay:0.2s]" />
                <span className="absolute left-0 top-[78%] h-[5px] w-[5px] animate-nf-drift rounded-full bg-khaki-beige [animation-delay:1.4s]" />
                <span className="absolute right-[8%] top-[4%] h-[5px] w-[5px] animate-nf-drift rounded-full bg-khaki-beige [animation-delay:2.2s]" />

                <div className="absolute inset-[38px] flex items-center justify-center rounded-2xl bg-gradient-to-br from-white/90 to-smoke/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_10px_22px_-12px_rgba(74,50,28,0.25)]">
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        className="h-[26px] w-[26px] text-khaki-beige"
                    >
                        <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
                        <path d="M14 3v5h5" />
                    </svg>
                </div>

                <div className="absolute -right-1 bottom-0.5 flex h-[46px] w-[46px] animate-nf-bob items-center justify-center rounded-full bg-gradient-to-br from-amber-light to-amber-dark shadow-[0_10px_22px_-8px_rgba(107,66,38,0.55)]">
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#fff"
                        strokeWidth="2.4"
                        className="h-5 w-5"
                    >
                        <circle cx="11" cy="11" r="6.5" />
                        <path d="M20 20l-4-4" />
                    </svg>
                </div>
            </div>

            <h3 className="m-0 mb-2.5 font-display text-[23px] font-medium leading-[1.25] text-pitch-black">
                Hmm, belum
                <br />
                ada jejaknya{" "}
                <em className="bg-gradient-to-r from-amber-dark to-brown-bark bg-clip-text not-italic italic text-transparent">
                    ditemukan.
                </em>
            </h3>
            <p className="mx-auto mb-[22px] max-w-[40ch] text-sm leading-[1.65] text-carbon-black opacity-[.68]">
                Kami sudah menelusuri seluruh catatan donasi, tapi nomor{" "}
                <strong className="font-mono not-italic">
                    {invoiceNumber}
                </strong>{" "}
                tidak terdaftar. Jangan khawatir — ini belum tentu berarti
                donasi Anda hilang, bisa jadi hanya salah ketik.
            </p>

            <div className="mb-[26px] inline-flex flex-col gap-2.5 rounded-2xl bg-grey/[.06] px-5 py-4 text-left">
                {checklistItems.map((item) => (
                    <div
                        key={item}
                        className="flex items-center gap-2.5 text-[12.5px] text-carbon-black opacity-[.78]"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.6"
                            className="h-[13px] w-[13px] flex-none text-warm-bark"
                        >
                            <path d="M20 6L9 17l-5-5" />
                        </svg>
                        {item}
                    </div>
                ))}
            </div>

            <div className="mb-4 flex flex-wrap justify-center gap-3">
                <button
                    onClick={onTryAgain}
                    className="inline-flex items-center gap-2 rounded-full border-none bg-pitch-black px-6 py-3.5 text-sm font-bold text-white transition-all duration-[250ms] ease-in-out hover:-translate-y-px hover:bg-deep-walnut hover:shadow-[0_12px_24px_-12px_rgba(74,50,28,0.4)]"
                >
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.4"
                        className="h-3.5 w-3.5"
                    >
                        <path d="M21 12a9 9 0 1 1-2.6-6.36" />
                        <path d="M21 3v6h-6" />
                    </svg>
                    Coba lagi
                </button>
                {onContactSupport && (
                    <button
                        onClick={onContactSupport}
                        className="inline-flex items-center gap-[7px] rounded-full border-none bg-white/50 px-5 py-3 text-[13.5px] font-bold text-deep-walnut shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] backdrop-blur-[10px] transition-colors duration-200 hover:bg-white/80"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.2"
                            className="h-3.5 w-3.5"
                        >
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                        Hubungi kami
                    </button>
                )}
            </div>
        </div>
    );
}

export default NotFoundPanel;
