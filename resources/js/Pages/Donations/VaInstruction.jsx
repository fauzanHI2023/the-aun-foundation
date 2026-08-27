import { Head, router } from "@inertiajs/react";
import { useEffect, useMemo, useState } from "react";
import { Copy, Check, Landmark, Clock } from "lucide-react";

function formatRupiah(value) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    }).format(value || 0);
}

function useCountdown(expiredDate, onExpired) {
    const targetTime = useMemo(
        () => (expiredDate ? new Date(expiredDate).getTime() : null),
        [expiredDate]
    );

    const [remainingMs, setRemainingMs] = useState(() =>
        targetTime ? Math.max(0, targetTime - Date.now()) : 0
    );

    useEffect(() => {
        if (!targetTime) return;

        const interval = setInterval(() => {
            const diff = targetTime - Date.now();

            if (diff <= 0) {
                clearInterval(interval);
                setRemainingMs(0);
                onExpired();
                return;
            }

            setRemainingMs(diff);
        }, 1000);

        return () => clearInterval(interval);
    }, [targetTime, onExpired]);

    const totalSeconds = Math.floor(remainingMs / 1000);
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(
        2,
        "0"
    );
    const seconds = String(totalSeconds % 60).padStart(2, "0");

    return { hours, minutes, seconds, isExpired: remainingMs <= 0 };
}

export default function VaInstruction({ donation, va }) {
    const [copied, setCopied] = useState(false);

    function handleExpired() {
        router.visit(
            route("campaign-donations.return", donation.invoice_number)
        );
    }

    const { hours, minutes, seconds, isExpired } = useCountdown(
        va.expired_date,
        handleExpired
    );

    function copyVaNumber() {
        navigator.clipboard.writeText(va.virtual_account_no);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    return (
        <>
            <Head title="Instruksi Pembayaran" />

            <div className="flex min-h-screen items-center justify-center bg-stone-50 px-6 py-16">
                <div className="w-full max-w-md">
                    <div className="rounded-[24px] border border-stone-200 bg-white p-8">
                        <div className="mb-6 flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-800/10 text-amber-800">
                                <Landmark size={20} />
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-wide text-stone-400">
                                    Transfer Virtual Account
                                </p>
                                <p className="font-semibold text-stone-900">
                                    {va.bank_label}
                                </p>
                            </div>
                        </div>

                        {/* Countdown */}
                        <div
                            className={`mb-6 flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium ${
                                isExpired
                                    ? "border-red-200 bg-red-50 text-red-600"
                                    : "border-amber-200 bg-amber-50 text-amber-800"
                            }`}
                        >
                            <Clock size={16} />
                            {isExpired ? (
                                <span>Waktu pembayaran telah habis</span>
                            ) : (
                                <span className="font-mono tracking-wider">
                                    Selesaikan dalam {hours}:{minutes}:{seconds}
                                </span>
                            )}
                        </div>

                        {/* Nomor VA */}
                        <div className="mb-6">
                            <p className="mb-2 text-xs uppercase tracking-wide text-stone-400">
                                Nomor Virtual Account
                            </p>
                            <div className="flex items-center justify-between rounded-xl border border-stone-200 bg-stone-50 px-4 py-3">
                                <span className="font-mono text-lg font-semibold tracking-wider text-stone-900">
                                    {va.virtual_account_no}
                                </span>
                                <button
                                    type="button"
                                    onClick={copyVaNumber}
                                    className="flex items-center gap-1 rounded-lg bg-amber-800 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-amber-900"
                                >
                                    {copied ? (
                                        <Check size={14} />
                                    ) : (
                                        <Copy size={14} />
                                    )}
                                    {copied ? "Tersalin" : "Salin"}
                                </button>
                            </div>
                        </div>

                        {/* Ringkasan */}
                        <dl className="mb-6 space-y-3 border-t border-stone-100 pt-6 text-sm">
                            <div className="flex justify-between">
                                <dt className="text-stone-500">
                                    Untuk campaign
                                </dt>
                                <dd className="text-right font-medium text-stone-900">
                                    {donation.campaign_title}
                                </dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-stone-500">
                                    Nomor invoice
                                </dt>
                                <dd className="text-stone-900">
                                    {donation.invoice_number}
                                </dd>
                            </div>
                            <div className="flex justify-between border-t border-stone-100 pt-3">
                                <dt className="font-medium text-stone-900">
                                    Total transfer
                                </dt>
                                <dd className="text-xl font-semibold text-amber-800">
                                    {formatRupiah(donation.grand_total)}
                                </dd>
                            </div>
                        </dl>

                        {/* Instruksi */}
                        <div className="rounded-xl bg-stone-50 p-4 text-sm text-stone-600">
                            <p className="mb-2 font-medium text-stone-800">
                                Cara pembayaran:
                            </p>
                            <ol className="list-decimal space-y-1 pl-4">
                                <li>
                                    Buka aplikasi mobile banking / ATM{" "}
                                    {va.bank_label}.
                                </li>
                                <li>
                                    Pilih menu Transfer &gt; Virtual Account.
                                </li>
                                <li>
                                    Masukkan nomor Virtual Account{" "}
                                    <span className="font-mono font-medium">
                                        {va.virtual_account_no}
                                    </span>
                                    .
                                </li>
                                <li>
                                    Pastikan nominal transfer sesuai{" "}
                                    <span className="font-medium">
                                        {formatRupiah(donation.grand_total)}
                                    </span>
                                    , lalu selesaikan pembayaran.
                                </li>
                            </ol>
                        </div>
                    </div>

                    <p className="mt-4 text-center text-xs text-stone-400">
                        Halaman ini akan otomatis memeriksa status transaksi
                        setelah waktu habis.
                    </p>
                </div>
            </div>
        </>
    );
}
