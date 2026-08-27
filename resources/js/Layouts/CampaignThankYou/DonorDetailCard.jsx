import React from "react";
import GlassPanel from "@/Layouts/CampaignThankYou/GlassPanel.jsx";

const STATUS_DOT = {
    success: {
        dot: "bg-emerald-500",
        text: "text-emerald-700",
        label: "Your donation has been successfully processed",
    },
    pending: {
        dot: "bg-amber-500",
        text: "text-amber-700",
        label: "Waiting for payment",
    },
    initiated: {
        dot: "bg-amber-500",
        text: "text-amber-700",
        label: "Waiting for payment",
    },
    failed: {
        dot: "bg-red-500",
        text: "text-red-700",
        label: "The payment failed to process",
    },
    expired: {
        dot: "bg-stone-400",
        text: "text-stone-600",
        label: "Your payment has expired. Please start your donation again.",
    },
};

export default function DonorDetailCard({ donor, status }) {
    const tone = STATUS_DOT[status] ?? STATUS_DOT.pending;

    const rows = [
        { k: "Name", v: donor.name },
        { k: "Email", v: donor.email },
        { k: "Invoice Number", v: donor.invoice, mono: true },
    ];

    return (
        <GlassPanel
            className="rounded-[26px] p-7"
            style={{ gridArea: "detail" }}
        >
            <p className="mb-[18px] text-[11px] font-bold uppercase tracking-[.12em] text-[#6b6764]">
                Donor Details
            </p>

            <div className="grid gap-0">
                {rows.map((row, i) => (
                    <div
                        key={row.k}
                        className={
                            "flex justify-between gap-4 py-[13px] text-[14.5px] " +
                            (i > 0 ? "border-t border-[#e6ddd4]/70" : "")
                        }
                    >
                        <span className="text-[#6b6764]">{row.k}</span>
                        <span
                            className={
                                "text-right font-semibold text-[#1c1b1b] " +
                                (row.mono ? "font-mono" : "")
                            }
                        >
                            {row.v}
                        </span>
                    </div>
                ))}
            </div>

            <div
                className={`mt-[18px] inline-flex items-center gap-2 text-[13.5px] font-semibold ${tone.text}`}
            >
                <span className={`h-[7px] w-[7px] rounded-full ${tone.dot}`} />
                {tone.label}
            </div>
        </GlassPanel>
    );
}
