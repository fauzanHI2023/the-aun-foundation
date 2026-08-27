import { useMemo } from "react";

const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

export function AiInsight({ stats = [], transactions = [], campaigns = [] }) {
    const insight = useMemo(() => {
        const successTx = transactions.filter(
            (t) => t.status === "success" && t.date_iso
        );

        // Hari paling aktif berdasarkan jumlah transaksi sukses
        const dayCounts = {};
        successTx.forEach((t) => {
            const day = new Date(t.date_iso).getDay();
            dayCounts[day] = (dayCounts[day] ?? 0) + 1;
        });
        const topDayIndex = Object.entries(dayCounts).sort(
            (a, b) => b[1] - a[1]
        )[0]?.[0];
        const topDay = topDayIndex !== undefined ? dayNames[topDayIndex] : null;

        // Kategori campaign yang paling sering didukung
        const catCounts = {};
        campaigns.forEach((c) => {
            if (!c.category) return;
            catCounts[c.category] = (catCounts[c.category] ?? 0) + 1;
        });
        const topCategories = Object.entries(catCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 2)
            .map(([cat]) => cat);

        // Campaign yang belum kamu dukung, mungkin relevan (dari kategori favorit)
        const recommended =
            campaigns.find((c) => !catCounts[c.category]) ?? null;

        return { topDay, topCategories, recommended };
    }, [transactions, campaigns]);

    const trendDirection = stats.total_donated_trend?.direction ?? "up";
    const trendValue = stats.total_donated_trend?.value ?? 0;

    return (
        <div
            id="insight"
            className="glass rounded-xl p-6 relative overflow-hidden bg-white/5"
        >
            <div className="flex items-center gap-[9px]">
                <div className="w-[30px] h-[30px] rounded-[10px] flex items-center justify-center bg-avatar-gradient">
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth="2"
                        className="w-3.5 h-3.5 text-onprimary"
                    >
                        <path d="M12 3l1.9 5.3L19 10l-5.1 1.7L12 17l-1.9-5.3L5 10l5.1-1.7L12 3z" />
                    </svg>
                </div>
                <h4 className="font-display text-[15px] font-bold text-white">
                    Insight For You
                </h4>
            </div>

            <p className="text-[13.5px] text-[#b9ab99] mt-3 leading-[1.65]">
                Your contribution this month{" "}
                {trendDirection === "up" ? "up" : "down"}{" "}
                <b className="text-[#b9ab99] font-semibold">{trendValue}%</b>{" "}
                compared to the previous period
                {insight.topCategories.length > 0 && (
                    <>
                        , driven by regular donations to the category{" "}
                        {insight.topCategories.map((cat, i) => (
                            <span key={cat}>
                                <b className="text-onsurface font-semibold">
                                    {cat}
                                </b>
                                {i < insight.topCategories.length - 1
                                    ? " dan "
                                    : ""}
                            </span>
                        ))}
                    </>
                )}
                .
                {insight.topDay && (
                    <>
                        {" "}
                        You donate most often on{" "}
                        <b className="text-[#b9ab99] font-semibold">
                            {insight.topDay}
                        </b>{" "}
                        — This might be the best time to remind you about the
                        new campaign.
                    </>
                )}
            </p>

            {insight.recommended && (
                <p className="text-[13.5px] text-[#b9ab99] mt-3 leading-[1.65]">
                    Based on this pattern, the following campaigns may be
                    relevant:{" "}
                    <b className="text-onsurface font-semibold">
                        {insight.recommended.title}
                    </b>
                    .
                </p>
            )}

            <div className="flex gap-2 mt-3.5 flex-wrap">
                {insight.topCategories.map((cat) => (
                    <span
                        key={cat}
                        className="font-label text-[10.5px] font-semibold tracking-[.03em] py-1.5 px-[11px] rounded-full bg-white/[0.06] backdrop-blur-sm text-onsurface-var"
                    >
                        Focus: {cat}
                    </span>
                ))}
            </div>
        </div>
    );
}
