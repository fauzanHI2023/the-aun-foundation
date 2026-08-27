import { matchesFilters } from "./transactionFilters";

const RANGE_DAYS = { "7d": 7, "30d": 30, "3m": 90 };

function subDays(date, days) {
    const d = new Date(date);
    d.setDate(d.getDate() - days);
    return d;
}

function dayKey(dateIso) {
    const d = new Date(dateIso);
    d.setHours(0, 0, 0, 0);
    return d.getTime();
}

function sumAmount(rows) {
    return rows.reduce((s, t) => s + Number(t.amount || 0), 0);
}

/** Rentang waktu untuk periode yang sedang dipilih di FilterBar. `null` = tanpa batas (Sepanjang waktu). */
function currentBounds(range) {
    const now = new Date();
    if (range === "ytd") return { from: new Date(now.getFullYear(), 0, 1), to: now };
    const days = RANGE_DAYS[range];
    if (!days) return null; // 'all'
    return { from: subDays(now, days), to: now };
}

/**
 * Rentang waktu periode SEBELUMNYA, dengan panjang yang sama, dipakai untuk trend naik/turun.
 * Hanya masuk akal untuk rentang relatif (7 hari / 30 hari / 3 bulan terakhir) —
 * untuk 'Tahun ini' dan 'Sepanjang waktu', trend disembunyikan (return null).
 */
function previousBounds(range) {
    const days = RANGE_DAYS[range];
    if (!days) return null;
    const now = new Date();
    return { from: subDays(now, days * 2), to: subDays(now, days) };
}

function inBounds(dateIso, bounds) {
    if (!bounds) return true;
    if (!dateIso) return false;
    const d = new Date(dateIso);
    return d >= bounds.from && d <= bounds.to;
}

function percentTrend(prev, current) {
    if (prev === 0) return { direction: "up", value: current > 0 ? 100 : 0 };
    const raw = ((current - prev) / Math.abs(prev)) * 100;
    return { direction: raw >= 0 ? "up" : "down", value: Math.round(Math.abs(raw) * 10) / 10 };
}

/**
 * Menghitung semua angka untuk StatsGrid, mengikuti filter yang sedang aktif
 * di FilterBar (dateRange, status, campaign, method, search).
 *
 * Butuh field `date_iso` di tiap baris transaksi.
 */
export function computeFilteredStats(transactions, filters, search) {
    const matched = transactions.filter((t) => matchesFilters(t, filters, search));

    const curBounds = currentBounds(filters.dateRange);
    const currentRows = matched.filter((t) => inBounds(t.date_iso, curBounds));
    const currentSuccess = currentRows.filter((t) => t.status === "success");

    const totalDonated = sumAmount(currentSuccess);
    const txCount = currentSuccess.length;
    const successRate =
        currentRows.length > 0 ? Math.round((txCount / currentRows.length) * 100) : 0;
    const avgDonation = txCount > 0 ? totalDonated / txCount : 0;
    const campaignsCount = new Set(currentSuccess.map((t) => t.campaign_title)).size;

    const prevBounds = previousBounds(filters.dateRange);
    let totalDonatedTrend, txCountTrend, avgDonationTrend, campaignsNewTrend;

    if (prevBounds) {
        const previousRows = matched.filter((t) => inBounds(t.date_iso, prevBounds));
        const previousSuccess = previousRows.filter((t) => t.status === "success");
        const prevTotal = sumAmount(previousSuccess);
        const prevTxCount = previousSuccess.length;
        const prevAvg = prevTxCount > 0 ? prevTotal / prevTxCount : 0;

        totalDonatedTrend = percentTrend(prevTotal, totalDonated);
        txCountTrend = percentTrend(prevTxCount, txCount);
        avgDonationTrend = percentTrend(prevAvg, avgDonation);

        const prevCampaigns = new Set(previousSuccess.map((t) => t.campaign_title));
        const curCampaigns = new Set(currentSuccess.map((t) => t.campaign_title));
        const newCount = [...curCampaigns].filter((c) => !prevCampaigns.has(c)).length;
        campaignsNewTrend = { direction: "up", value: newCount, suffix: " baru" };
    }

    // sparkline 7 hari terakhir, dari transaksi sukses yang cocok dengan filter (di luar tanggal)
    const successMatched = matched.filter((t) => t.status === "success" && t.date_iso);
    const days = Array.from({ length: 7 }, (_, i) => dayKey(subDays(new Date(), 6 - i)));

    const sparkTotal = days.map((day) =>
        Math.round(
            sumAmount(successMatched.filter((t) => dayKey(t.date_iso) === day)) / 100000
        )
    );
    const sparkTx = days.map(
        (day) => successMatched.filter((t) => dayKey(t.date_iso) === day).length
    );
    const sparkAvg = days.map((day) => {
        const dayTx = successMatched.filter((t) => dayKey(t.date_iso) === day);
        return dayTx.length > 0 ? Math.round(sumAmount(dayTx) / dayTx.length / 100000) : 0;
    });
    const sparkCampaigns = days.map(
        (day) =>
            new Set(
                successMatched
                    .filter((t) => dayKey(t.date_iso) <= day)
                    .map((t) => t.campaign_title)
            ).size
    );

    return {
        total_donated: totalDonated,
        total_donated_trend: totalDonatedTrend,
        tx_count: txCount,
        tx_success_rate: successRate,
        tx_count_trend: txCountTrend,
        campaigns_count: campaignsCount,
        campaigns_new_trend: campaignsNewTrend,
        avg_donation: Math.round(avgDonation),
        avg_donation_trend: avgDonationTrend,
        sparklines: {
            total: sparkTotal,
            tx: sparkTx,
            campaigns: sparkCampaigns,
            avg: sparkAvg,
        },
    };
}
