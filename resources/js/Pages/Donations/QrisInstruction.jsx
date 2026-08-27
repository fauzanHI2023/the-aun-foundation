import { Head, router } from "@inertiajs/react";
import { useEffect, useMemo, useState } from "react";
import { QrCode, Clock, RefreshCw } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

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
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
    const seconds = String(totalSeconds % 60).padStart(2, "0");

    return { minutes, seconds, isExpired: remainingMs <= 0 };
}

export default function QrisInstruction({ donation, qris }) {
    const [checking, setChecking] = useState(false);
    const [notPaidYet, setNotPaidYet] = useState(false);

    function handleExpired() {
        router.visit(
            route("campaign-donations.return", donation.invoice_number)
        );
    }

    const { minutes, seconds, isExpired } = useCountdown(
        qris.expired_date,
        handleExpired
    );

    async function checkStatus() {
        setChecking(true);
        setNotPaidYet(false);

        try {
            const res = await fetch(
                route(
                    "campaign-donations.check-status",
                    donation.invoice_number
                ),
                {
                    method: "POST",
                    headers: {
                        "X-CSRF-TOKEN": document.querySelector(
                            'meta[name="csrf-token"]'
                        )?.content,
                        Accept: "application/json",
                    },
                }
            );
            const data = await res.json();

            if (data.status && data.status !== "initiated") {
                router.visit(
                    route("campaign-donations.return", donation.invoice_number)
                );
                return;
            }

            setNotPaidYet(true);
        } catch (e) {
            setNotPaidYet(true);
        } finally {
            setChecking(false);
        }
    }

    return (
        <>
            <Head title="Scan QRIS" />

            <div className="flex min-h-screen items-center justify-center bg-stone-50 px-6 py-16">
                <div className="w-full max-w-md">
                    <div className="rounded-[24px] border border-stone-200 bg-white p-8 text-center">
                        <div className="mb-6 flex items-center justify-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-800/10 text-amber-800">
                                <QrCode size={20} />
                            </div>
                            <div className="text-left">
                                <p className="text-xs uppercase tracking-wide text-stone-400">
                                    Scan QRIS
                                </p>
                                <p className="font-semibold text-stone-900">
                                    Semua e-wallet & mobile banking
                                </p>
                            </div>
                        </div>

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
                                    Selesaikan dalam {minutes}:{seconds}
                                </span>
                            )}
                        </div>

                        <div className="mx-auto mb-6 flex w-fit items-center justify-center rounded-2xl border border-stone-200 bg-white p-4">
                            {isExpired ? (
                                <div className="flex h-[240px] w-[240px] items-center justify-center rounded-xl bg-stone-50 text-sm text-stone-400">
                                    QR kedaluwarsa
                                </div>
                            ) : (
                                <QRCodeSVG value={qris.qr_content} size={240} />
                            )}
                        </div>

                        {!isExpired && (
                            <button
                                type="button"
                                onClick={checkStatus}
                                disabled={checking}
                                className="mb-6 flex w-full items-center justify-center gap-2 rounded-xl bg-amber-800 py-3 text-sm font-semibold text-white transition hover:bg-amber-900 disabled:opacity-60"
                            >
                                <RefreshCw
                                    size={16}
                                    className={checking ? "animate-spin" : ""}
                                />
                                {checking
                                    ? "Memeriksa..."
                                    : "Saya sudah bayar, cek status"}
                            </button>
                        )}

                        {notPaidYet && (
                            <p className="mb-4 text-sm text-amber-700">
                                Pembayaran belum terdeteksi. Pastikan kamu sudah
                                menyelesaikan pembayaran, lalu coba cek lagi.
                            </p>
                        )}

                        <dl className="mb-2 space-y-3 border-t border-stone-100 pt-6 text-left text-sm">
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
                                    Total pembayaran
                                </dt>
                                <dd className="text-xl font-semibold text-amber-800">
                                    {formatRupiah(donation.grand_total)}
                                </dd>
                            </div>
                        </dl>

                        <p className="mt-4 text-xs text-stone-400">
                            Buka aplikasi e-wallet atau mobile banking, pilih
                            Scan QRIS, lalu arahkan kamera ke kode di atas.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
