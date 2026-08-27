import { Head, router } from "@inertiajs/react";
import { useEffect, useMemo, useState } from "react";
import { Copy, Check, Landmark, Clock, RefreshCw } from "lucide-react";

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
    const [checking, setChecking] = useState(false);
    const [notPaidYet, setNotPaidYet] = useState(false);

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
            <Head title="Instruksi Pembayaran" />

            <div className="flex min-h-screen items-center justify-center bg-stone-50 px-6 py-16">
                <div className="w-full max-w-md">
                    <div className="rounded-[24px] donation-card-shadow bg-white p-8">
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
                            className={`mb-6 flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium ${
                                isExpired
                                    ? "border-red-200 bg-red-50 text-red-600"
                                    : " bg-yellow-700 text-white"
                            }`}
                        >
                            <Clock size={16} />
                            {isExpired ? (
                                <span>The payment period has expired</span>
                            ) : (
                                <span className="tracking-wider">
                                    Complete in {hours}:{minutes}:{seconds}
                                </span>
                            )}
                        </div>

                        {/* Nomor VA */}
                        <div className="mb-6">
                            <p className="mb-2 text-xs uppercase tracking-wide text-stone-400">
                                Virtual Account Number
                            </p>
                            <div className="flex items-center justify-between rounded-xl border border-stone-200 bg-stone-50 px-4 py-3">
                                <span className="font-mono text-lg font-semibold tracking-wider text-stone-900">
                                    {va.virtual_account_no}
                                </span>
                                <button
                                    type="button"
                                    onClick={copyVaNumber}
                                    className="flex items-center gap-1 rounded-lg bg-yellow-50 px-3 py-1.5 text-xs font-medium text-primary transition hover:bg-yellow-800 hover:text-white"
                                >
                                    {copied ? (
                                        <Check size={14} />
                                    ) : (
                                        <Copy size={14} />
                                    )}
                                    {copied ? "Copied" : "Copy"}
                                </button>
                            </div>
                        </div>

                        {/* Tombol cek status manual */}
                        {!isExpired && (
                            <button
                                type="button"
                                onClick={checkStatus}
                                disabled={checking}
                                className="mb-6 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-white transition hover:bg-primary/90 cursor-pointer disabled:opacity-60"
                            >
                                <RefreshCw
                                    size={16}
                                    className={checking ? "animate-spin" : ""}
                                />
                                {checking
                                    ? "Checking..."
                                    : "I've already paid; check the status"}
                            </button>
                        )}

                        {notPaidYet && (
                            <p className="mb-4 text-sm text-primary">
                                The payment has not been detected. Please make
                                sure you have completed the transfer for the
                                correct amount, then try checking again.
                            </p>
                        )}

                        {/* Ringkasan */}
                        <dl className="mb-6 space-y-3 border-t border-stone-100 pt-6 text-sm">
                            <div className="flex justify-between">
                                {/* <dt className="text-stone-500">
                                    Untuk campaign
                                </dt>
                                <dd className="text-right font-medium text-stone-900">
                                    {donation.campaign_title}
                                </dd> */}
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-stone-500">
                                    Invoice Number
                                </dt>
                                <dd className="text-stone-900">
                                    {donation.invoice_number}
                                </dd>
                            </div>
                            <div className="flex justify-between border-t border-stone-100 pt-3">
                                <dt className="font-medium text-stone-900">
                                    Total transfers
                                </dt>
                                <dd className="text-xl font-semibold text-primary">
                                    {formatRupiah(donation.grand_total)}
                                </dd>
                            </div>
                        </dl>

                        {/* Instruksi */}
                        <div className="rounded-xl bg-stone-50 p-4 text-sm text-stone-600">
                            <p className="mb-2 font-medium text-stone-800">
                                Payment methods:
                            </p>
                            <ol className="list-decimal space-y-1 pl-4">
                                <li>
                                    Open the mobile banking app / ATM{" "}
                                    {va.bank_label}.
                                </li>
                                <li>
                                    Select the “Transfer” menu &gt; Virtual
                                    Account.
                                </li>
                                <li>
                                    Enter your Virtual Account number{" "}
                                    <span className="font-mono font-medium">
                                        {va.virtual_account_no}
                                    </span>
                                    .
                                </li>
                                <li>
                                    Make sure the transfer amount is correct{" "}
                                    <span className="font-medium">
                                        {formatRupiah(donation.grand_total)}
                                    </span>
                                    , then complete the payment.
                                </li>
                            </ol>
                        </div>
                    </div>

                    <p className="mt-4 text-center text-xs text-stone-400">
                        This page will automatically check the transaction
                        status after the time has elapsed.
                    </p>
                </div>
            </div>
        </>
    );
}
