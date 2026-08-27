import { Link } from "@inertiajs/react";

const STATUS_MAP = {
    success: {
        label: "Pembayaran Berhasil",
        accent: "#7FC8A9",
        message: "Terima kasih, donasi Anda telah kami terima.",
    },
    pending: {
        label: "Menunggu Pembayaran",
        accent: "#E3C567",
        message: "Kami masih menunggu konfirmasi pembayaran Anda.",
    },
    paying: {
        label: "Sedang Diproses",
        accent: "#E3C567",
        message: "Pembayaran Anda sedang diproses.",
    },
    initiated: {
        label: "Menunggu Pembayaran",
        accent: "#E3C567",
        message: "Kami masih menunggu konfirmasi pembayaran Anda.",
    },
    failed: {
        label: "Pembayaran Gagal",
        accent: "#F4B4A6",
        message: "Pembayaran tidak berhasil diselesaikan.",
    },
    canceled: {
        label: "Dibatalkan",
        accent: "#A9C4BA",
        message: "Transaksi ini telah dibatalkan.",
    },
};

export default function Return({ donation }) {
    const status = STATUS_MAP[donation.status] ?? {
        label: donation.status,
        accent: "#A9C4BA",
        message: "Status pembayaran Anda sedang kami perbarui.",
    };

    const isFinal = donation.status === "success";

    return (
        <div className="min-h-screen bg-[#0F1A17] text-[#EAF2EE] flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md text-center">
                <div
                    className="w-14 h-14 mx-auto mb-6 rounded-full flex items-center justify-center border-2"
                    style={{ borderColor: status.accent }}
                >
                    <span className="text-2xl" style={{ color: status.accent }}>
                        {isFinal ? "✓" : "•"}
                    </span>
                </div>

                <h1 className="text-2xl font-semibold text-white mb-2">
                    {isFinal ? `Terima kasih, ${donation.name}!` : status.label}
                </h1>
                <p className="text-[#A9C4BA] mb-8">{status.message}</p>

                <div className="bg-[#152420] border border-[#264238] rounded-2xl p-6 text-left space-y-3 mb-8">
                    <Row
                        label="Nomor referensi"
                        value={donation.partner_reference_no}
                    />
                    <Row
                        label="Jumlah"
                        value={`Rp${Number(donation.amount).toLocaleString(
                            "id-ID"
                        )}`}
                    />
                    <Row
                        label="Status"
                        value={status.label}
                        valueStyle={{ color: status.accent }}
                    />
                </div>

                {!isFinal && (
                    <p className="text-xs text-[#5C776D] mb-8">
                        Status akan diperbarui otomatis setelah kami menerima
                        konfirmasi dari Doitpay.
                    </p>
                )}

                <Link
                    href={route("donations.create")}
                    className="inline-block rounded-lg border border-[#2C4A3E] px-6 py-2.5 text-sm text-[#A9C4BA] hover:border-[#7FC8A9] hover:text-white transition-colors"
                >
                    Kembali ke halaman donasi
                </Link>
            </div>
        </div>
    );
}

function Row({ label, value, valueStyle }) {
    return (
        <div className="flex items-center justify-between gap-4 text-sm">
            <span className="text-[#5C776D]">{label}</span>
            <span
                className="text-white font-medium truncate"
                style={valueStyle}
            >
                {value}
            </span>
        </div>
    );
}
