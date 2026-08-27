import { Head, Link } from "@inertiajs/react";

function formatRupiah(value) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    }).format(value || 0);
}

const STATUS_LABEL = {
    initiated: {
        label: "Menunggu pembayaran",
        tone: "bg-amber-50 text-amber-700 ring-amber-200",
    },
    success: {
        label: "Pembayaran berhasil",
        tone: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    },
    failed: {
        label: "Pembayaran gagal",
        tone: "bg-red-50 text-red-700 ring-red-200",
    },
    expired: {
        label: "Pembayaran kedaluwarsa",
        tone: "bg-stone-100 text-stone-600 ring-stone-200",
    },
};

export default function Return({ donation }) {
    const status = STATUS_LABEL[donation.status] ?? STATUS_LABEL.initiated;

    return (
        <>
            <Head title="Status Donasi" />

            <div className="flex min-h-screen items-center justify-center bg-stone-50 px-6 py-16">
                <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center ring-1 ring-stone-200">
                    <span
                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ring-1 ${status.tone}`}
                    >
                        {status.label}
                    </span>

                    <h1 className="mt-4 font-serif text-xl text-stone-900">
                        Terima kasih, {donation.name}
                    </h1>

                    <p className="mt-1 text-sm text-stone-500">
                        Nomor invoice {donation.invoice_number}
                    </p>

                    <div className="mt-6 space-y-3 rounded-xl bg-stone-50 p-4 text-left text-sm">
                        {donation.items?.map((item, index) => (
                            <div key={index} className="flex justify-between">
                                <span className="text-stone-600">
                                    {item.program_title}
                                </span>
                                <span className="font-medium text-stone-900">
                                    {formatRupiah(item.amount)}
                                </span>
                            </div>
                        ))}
                        <div className="flex justify-between border-t border-stone-200 pt-3 font-medium">
                            <span className="text-stone-900">Total</span>
                            <span className="text-[#1F4741]">
                                {formatRupiah(donation.grand_total)}
                            </span>
                        </div>
                    </div>

                    <Link
                        href="/"
                        className="mt-8 inline-block w-full rounded-lg bg-[#1F4741] py-3 text-sm font-semibold text-white transition hover:bg-[#183A35]"
                    >
                        Kembali ke beranda
                    </Link>
                </div>
            </div>
        </>
    );
}
