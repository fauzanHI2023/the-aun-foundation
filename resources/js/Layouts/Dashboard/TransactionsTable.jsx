import { useEffect, useMemo, useState } from "react";
import { isWithinDateRange } from "./dateRange";
import { matchesFilters } from "./transactionFilters";

const statusMeta = {
    success: { label: "Success" },
    pending: { label: "Pending" },
    failed: { label: "Failed" },
    expired: { label: "Expired" },
};

const statusTabs = [
    { key: "all", label: "Semua" },
    { key: "success", label: "Success", dot: "bg-[#b7c793]" },
    { key: "pending", label: "Pending", dot: "bg-[#744d2c]" },
    { key: "failed", label: "Failed", dot: "bg-[#ff9086]" },
    { key: "expired", label: "Expired", dot: "bg-secondary" },
];

const badgeClass = {
    success: "bg-[#333a25] text-[#b7c793]",
    pending: "bg-[#ffb875]/[0.14] text-[#ffb875]",
    failed: "bg-[#f49f9885] text-[#ffffff]",
    expired: "bg-[#3a3c3c] text-[#c6c6c7]",
};

const PER_PAGE = 8;

function fmtRp(n) {
    return "Rp" + Number(n).toLocaleString("id-ID");
}

export default function TransactionsTable({
    transactions = [],
    search = "",
    filters,
    onFilterChange,
    resetKey,
}) {
    const [sort, setSort] = useState("newest");
    const [page, setPage] = useState(1);

    useEffect(() => {
        setSort("newest");
        setPage(1);
    }, [resetKey]);

    useEffect(() => {
        setPage(1);
    }, [search, filters, sort]);

    const rows = useMemo(() => {
        let list = transactions.filter(
            (t) =>
                matchesFilters(t, filters, search) &&
                isWithinDateRange(t.date_iso, filters.dateRange)
        );
        if (sort === "highest")
            list = [...list].sort((a, b) => b.amount - a.amount);
        if (sort === "lowest")
            list = [...list].sort((a, b) => a.amount - b.amount);
        if (sort === "oldest") list = [...list].reverse();
        return list;
    }, [transactions, search, filters, sort]);

    const pageCount = Math.max(1, Math.ceil(rows.length / PER_PAGE));
    const pagedRows = rows.slice((page - 1) * PER_PAGE, page * PER_PAGE);

    function setStatus(status) {
        onFilterChange({ ...filters, status });
    }

    return (
        <div id="riwayat" className="mt-[34px] mb-[70px]">
            <div className="mb-[18px]">
                <div className="font-display text-xl font-bold tracking-[-.01em] text-white">
                    Transaction History
                </div>
                <div className="text-[13px] text-[#b9ab99] mt-[3px]">
                    All the donation transactions you've ever made
                </div>
            </div>

            <div className="glass rounded-xl overflow-hidden">
                {/* Toolbar */}
                <div className="flex items-center gap-2.5 py-[18px] px-6 border-b border-white/[0.08] flex-wrap">
                    <div className="flex gap-[3px] bg-white/5 p-1 rounded-full">
                        {statusTabs.map((s) => (
                            <button
                                key={s.key}
                                onClick={() => setStatus(s.key)}
                                className={`py-[7px] px-3.5 font-label text-[11.5px] font-semibold rounded-full flex items-center gap-1.5 transition-colors duration-150 ${
                                    filters.status === s.key
                                        ? "bg-[#ffb875]/[0.14] text-white shadow-[0_2px_8px_rgba(0,0,0,.3)]"
                                        : "text-[#b9ab99]"
                                }`}
                            >
                                {s.dot && (
                                    <span
                                        className={`w-1.5 h-1.5 rounded-full ${s.dot}`}
                                    />
                                )}
                                {s.label}
                            </button>
                        ))}
                    </div>

                    <div className="select-dashboard-donor ml-auto flex items-center gap-2 py-2 px-3 rounded-full text-xs text-white">
                        <select
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                        >
                            <option value="newest">Latest</option>
                            <option value="oldest">Longest</option>
                            <option value="highest">Highest amount</option>
                            <option value="lowest">Lowest amount</option>
                        </select>
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="w-3 h-3 text-outline pointer-events-none -ml-4"
                        >
                            <path d="M6 9l6 6 6-6" />
                        </svg>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr>
                                {[
                                    "Invoice",
                                    "Campaign",
                                    "Date",
                                    "Payment Method",
                                    "Amount",
                                    "Status",
                                    "Action",
                                ].map((h) => (
                                    <th
                                        key={h}
                                        className="text-left font-label text-[10.5px] font-semibold uppercase tracking-[.06em] text-[#b9ab99] py-3 px-6 border-b border-white/[0.08] whitespace-nowrap"
                                    >
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {pagedRows.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={7}
                                        className="py-[46px] px-6 text-center text-primary-white text-[13px]"
                                    >
                                        No transactions match these filters.
                                        Please adjust the filters above.
                                    </td>
                                </tr>
                            ) : (
                                pagedRows.map((t) => {
                                    const sm = statusMeta[t.status] ?? {
                                        label: t.status,
                                    };
                                    return (
                                        <tr
                                            key={t.invoice_number}
                                            className="transition-colors duration-150 hover:bg-primary/[0.04]"
                                        >
                                            <td className="text-[#b9ab99] py-[15px] px-6 border-b border-white/5 font-label font-semibold text-[13.5px] whitespace-nowrap">
                                                {t.invoice_number}
                                            </td>
                                            <td className="py-[15px] px-6 border-b border-white/5 whitespace-nowrap">
                                                <div className="flex items-center gap-2.5 whitespace-normal max-w-[220px]">
                                                    {t.campaign_thumbnail && (
                                                        <img
                                                            src={
                                                                t.campaign_thumbnail
                                                            }
                                                            alt=""
                                                            className="w-8 h-8 rounded-[9px] object-cover shrink-0"
                                                        />
                                                    )}
                                                    <span className="font-semibold text-[#b9ab99] text-[13px] leading-[1.3]">
                                                        {t.campaign_title}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="py-[15px] px-6 text-[#b9ab99] border-b border-white/5 text-[13.5px] whitespace-nowrap">
                                                {t.date}
                                            </td>
                                            <td className="py-[15px] px-6 text-[#b9ab99] border-b border-white/5 text-[13.5px] whitespace-nowrap">
                                                {t.method}
                                            </td>
                                            <td className="num py-[15px] text-[#b9ab99] px-6 border-b border-white/5 text-[13.5px] whitespace-nowrap">
                                                {fmtRp(t.amount)}
                                            </td>
                                            <td className="py-[15px] px-6 border-b border-white/5 whitespace-nowrap">
                                                <span
                                                    className={`font-label text-[10.5px] font-semibold py-[5px] px-[11px] rounded-full inline-flex items-center gap-1.5 ${
                                                        badgeClass[t.status] ??
                                                        "bg-secondary-container text-secondary"
                                                    }`}
                                                >
                                                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                                                    {sm.label}
                                                </span>
                                            </td>
                                            <td className="py-[15px] px-6 border-b border-white/5 whitespace-nowrap">
                                                <div className="flex gap-1.5">
                                                    <button
                                                        title="Lihat detail"
                                                        className="w-[30px] h-[30px] rounded-[10px] border border-white/[0.08] bg-surface-low flex items-center justify-center text-[#b9ab99] hover:text-primary hover:border-primary/30 transition-colors duration-150"
                                                    >
                                                        <svg
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            className="w-3.5 h-3.5"
                                                        >
                                                            <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
                                                            <circle
                                                                cx="12"
                                                                cy="12"
                                                                r="3"
                                                            />
                                                        </svg>
                                                    </button>
                                                    <button
                                                        title="Unduh invoice"
                                                        className="w-[30px] h-[30px] rounded-[10px] border border-white/[0.08] bg-surface-low flex items-center justify-center text-[#b9ab99] hover:text-primary hover:border-primary/30 transition-colors duration-150"
                                                    >
                                                        <svg
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            className="w-3.5 h-3.5"
                                                        >
                                                            <path d="M12 3v13m0 0l-4-4m4 4l4-4M4 21h16" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Footer + pagination */}
                <div className="flex items-center justify-between py-4 px-6 font-label text-[11.5px] text-[#b9ab99] flex-wrap gap-2">
                    <span>
                        Menampilkan {pagedRows.length} dari {rows.length}{" "}
                        transaksi
                    </span>
                    <div className="flex gap-1.5">
                        <button
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            disabled={page === 1}
                            className="w-[30px] h-[30px] rounded-[10px] border border-white/[0.08] bg-transparent text-[#b9ab99] font-label text-xs font-semibold disabled:opacity-40"
                        >
                            ‹
                        </button>
                        {Array.from({ length: pageCount }, (_, i) => i + 1).map(
                            (p) => (
                                <button
                                    key={p}
                                    onClick={() => setPage(p)}
                                    className={`w-[30px] h-[30px] rounded-[10px] border font-label text-xs font-semibold ${
                                        p === page
                                            ? "bg-primary border-primary text-onprimary"
                                            : "border-white/[0.08] bg-transparent text-[#b9ab99]"
                                    }`}
                                >
                                    {p}
                                </button>
                            )
                        )}
                        <button
                            onClick={() =>
                                setPage((p) => Math.min(pageCount, p + 1))
                            }
                            disabled={page === pageCount}
                            className="w-[30px] h-[30px] rounded-[10px] border border-white/[0.08] bg-transparent text-[#b9ab99] font-label text-xs font-semibold disabled:opacity-40"
                        >
                            ›
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
