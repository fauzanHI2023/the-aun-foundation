/**
 * Mengecek apakah satu baris transaksi cocok dengan filter status/campaign/method
 * dan kata kunci pencarian dari FilterBar. Dipakai bersama oleh TransactionsTable
 * dan perhitungan StatsGrid supaya keduanya selalu konsisten.
 *
 * Sengaja TIDAK mengecek rentang tanggal di sini — itu ditangani terpisah
 * (lihat utils/dateRange.js) karena StatsGrid butuh logika rentang yang beda
 * (current vs previous period untuk trend).
 */
export function matchesFilters(t, filters, search) {
    const q = (search ?? "").trim().toLowerCase();

    const matchStatus = filters.status === "all" || t.status === filters.status;
    const matchCampaign =
        filters.campaign === "all" || t.campaign_title === filters.campaign;
    const matchMethod = filters.method === "all" || t.method === filters.method;
    const matchQuery =
        !q ||
        (t.invoice_number ?? "").toLowerCase().includes(q) ||
        (t.campaign_title ?? "").toLowerCase().includes(q);

    return matchStatus && matchCampaign && matchMethod && matchQuery;
}
