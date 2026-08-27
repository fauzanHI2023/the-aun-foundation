import { useEffect, useRef, useState } from "react";
import { Head, router } from "@inertiajs/react";
import { Hero } from "@/Layouts/Transaction/Hero";
import { SearchCard } from "@/Layouts/Transaction/SearchCard";
import { SearchingPanel } from "@/Layouts/Transaction/SearchingPanel";
import { NotFoundPanel } from "@/Layouts/Transaction/NotFoundPanel";
import { ResultPanel } from "@/Layouts/Transaction/ResultPanel";

const STATUS_MAP = {
    success: { label: "Berhasil", tone: "success" },
    settlement: { label: "Berhasil", tone: "success" },
    paid: { label: "Berhasil", tone: "success" },
    pending: { label: "Menunggu Pembayaran", tone: "pending" },
    challenge: { label: "Menunggu Pembayaran", tone: "pending" },
    expired: { label: "Kedaluwarsa", tone: "failed" },
    expire: { label: "Kedaluwarsa", tone: "failed" },
    failed: { label: "Gagal", tone: "failed" },
    failure: { label: "Gagal", tone: "failed" },
    cancel: { label: "Dibatalkan", tone: "failed" },
    deny: { label: "Ditolak", tone: "failed" },
};

function statusInfo(status) {
    if (!status) return { label: "-", tone: "pending" };
    const key = String(status).toLowerCase();
    return STATUS_MAP[key] || { label: status, tone: "pending" };
}

function formatCurrency(value) {
    const n = Number(value || 0);
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    }).format(n);
}

function formatDate(iso) {
    if (!iso) return null;
    try {
        return new Intl.DateTimeFormat("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        }).format(new Date(iso));
    } catch (e) {
        return iso;
    }
}

export default function Check({ donation, searched, notFoundFor }) {
    const [invoiceNumber, setInvoiceNumber] = useState(
        donation?.invoice_number || notFoundFor || ""
    );
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        if (!searched && inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    function search(value) {
        const trimmed = value.trim();
        setHasError(false);

        if (!trimmed) {
            setHasError(true);
            return;
        }

        setIsLoading(true);
        router.get(
            window.location.pathname,
            { invoice_number: trimmed },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
                onFinish: () => setIsLoading(false),
            }
        );
    }

    function handleSubmit() {
        search(invoiceNumber);
    }

    function handleCheckAnother() {
        setInvoiceNumber("");
        setHasError(false);
        router.get(
            window.location.pathname,
            {},
            {
                preserveState: false,
                preserveScroll: false,
                replace: true,
            }
        );
    }

    function handleShare() {
        navigator.clipboard?.writeText(window.location.href).catch(() => {});
    }

    const status = donation ? statusInfo(donation.status) : null;

    const progressPct =
        donation && donation.target_amount
            ? Math.min(
                  100,
                  Math.round(
                      (Number(donation.collected_amount || 0) /
                          Number(donation.target_amount)) *
                          100
                  )
              )
            : null;

    const infoRows = donation
        ? [
              {
                  k: "No. Invoice",
                  v: donation.invoice_number,
                  mono: true,
              },
              {
                  k: "Waktu transaksi",
                  v: formatDate(donation.created_at),
                  mono: false,
              },
              {
                  k: "Waktu pembayaran",
                  v: formatDate(donation.paid_at),
                  mono: false,
              },
              {
                  k: "Jumlah",
                  v: formatCurrency(donation.amount),
                  mono: false,
              },
              {
                  k: "Metode pembayaran",
                  v: donation.payment_method,
                  mono: true,
              },
              {
                  k: "Channel",
                  v: donation.payment_channel,
                  mono: true,
              },
          ]
        : [];

    const campaign =
        donation && donation.target_amount
            ? {
                  title: donation.item_title,
                  raisedLabel: formatCurrency(donation.collected_amount),
                  targetLabel: formatCurrency(donation.target_amount),
                  percent: progressPct,
              }
            : null;

    return (
        <>
            <Head title="Cek Donasi" />

            <div className="relative min-h-[50rem] overflow-hidden bg-mesh">
                <div className="bg-grain pointer-events-none absolute inset-0 z-[1]" />

                <div className="relative z-[2] mx-auto max-w-[720px] px-[18px] pb-[110px] pt-5 sm:px-8">
                    <Hero />

                    <SearchCard
                        inputRef={inputRef}
                        value={invoiceNumber}
                        onChange={setInvoiceNumber}
                        onSubmit={handleSubmit}
                        hasError={hasError}
                        isLoading={isLoading}
                    />

                    {isLoading && <SearchingPanel />}

                    {!isLoading && searched && !donation && (
                        <NotFoundPanel
                            invoiceNumber={notFoundFor}
                            onTryAgain={() => inputRef.current?.focus()}
                        />
                    )}

                    {!isLoading && searched && donation && (
                        <ResultPanel
                            donorName={donation.name}
                            statusLabel={status.label}
                            statusTone={status.tone}
                            infoRows={infoRows}
                            createdAtLabel={formatDate(donation.created_at)}
                            paidAtLabel={formatDate(donation.paid_at)}
                            campaign={campaign}
                            onCheckAnother={handleCheckAnother}
                            onShare={handleShare}
                        />
                    )}

                    {!searched && !isLoading && (
                        <div className="glass-panel rounded-xl px-8 py-12 text-center text-[#4b5b50]">
                            <div className="font-display text-4xl text-pitch-black opacity-25 mb-3">
                                ＃
                            </div>
                            <p className="mx-auto max-w-[340px] text-sm leading-relaxed">
                                Belum ada pencarian. Nomor invoice bisa
                                ditemukan di email konfirmasi atau bukti
                                pembayaran Anda.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
