/**
 * Menyusun 3 langkah (Diterima -> Verifikasi -> Selesai) dari data donasi
 * mentah (created_at, paid_at, status) karena backend belum menyimpan
 * riwayat tahapan secara eksplisit.
 */
export function buildSteps({ createdAtLabel, paidAtLabel, statusTone }) {
    const isFailed = statusTone === "failed";
    const isSuccess = statusTone === "success";

    return [
        {
            label: "Diterima",
            time: createdAtLabel || "-",
            status: "done",
        },
        {
            label: isFailed ? "Pembayaran gagal" : "Verifikasi Pembayaran",
            time: isFailed
                ? paidAtLabel || "-"
                : paidAtLabel || "Menunggu pembayaran",
            status: isFailed ? "failed" : isSuccess ? "done" : "active",
        },
        {
            label: "Selesai",
            time: isSuccess ? paidAtLabel || "-" : "Menunggu",
            status: isSuccess ? "done" : isFailed ? "failed" : "upcoming",
        },
    ];
}

export function DonationSteps({ steps }) {
    return (
        <div className="mt-[22px] flex items-start">
            {steps.map((step, i) => (
                <div key={step.label} className="relative flex-1 text-left">
                    {i > 0 && (
                        <div
                            className={`absolute left-[calc(-100%+8px)] top-2 z-0 h-0.5 w-[calc(100%-16px)] ${
                                step.status === "done" ||
                                steps[i - 1].status === "done"
                                    ? "bg-[#8B5E34] shadow-[0_0_0_5px_rgba(139,94,52,0.15)]"
                                    : "bg-primary-white shadow-[inset_0_0_0_2px_#8B5E34,0_0_0_6px_rgba(139,94,52,0.14)]"
                            }`}
                        />
                    )}

                    <div
                        className={`relative z-[1] mb-3 flex h-4 w-4 items-center justify-center rounded-full ${
                            step.status === "done"
                                ? "bg-[#8B5E34] shadow-[0_0_0_5px_rgba(139,94,52,0.15)]"
                                : step.status === "active"
                                ? "shadow-[inset_0_0_0_2px_#8B5E34,0_0_0_6px_rgba(139,94,52,0.14)]"
                                : step.status === "failed"
                                ? "bg-[#4C8B67] shadow-[0_0_0_5px_rgba(193,92,70,0.15)]"
                                : "shadow-[inset_0_0_0_2px_#E6E6E6]"
                        }`}
                    >
                        {step.status === "done" && (
                            <span className="text-[9px] font-bold text-white">
                                ✓
                            </span>
                        )}
                        {step.status === "active" && (
                            <span className="h-1.5 w-1.5 animate-blink rounded-full bg-warm-bark" />
                        )}
                        {step.status === "failed" && (
                            <span className="text-[9px] font-bold text-white">
                                ✕
                            </span>
                        )}
                    </div>

                    <div
                        className={`text-[13px] font-bold ${
                            step.status === "upcoming"
                                ? "text-grey"
                                : step.status === "failed"
                                ? "text-err-text"
                                : "text-pitch-black"
                        }`}
                    >
                        {step.label}
                    </div>
                    <div className="mt-0.5 text-[11.5px] text-grey">
                        {step.time}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default DonationSteps;
