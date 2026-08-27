import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";

import { useMemo, useState } from "react";

import FilterBar, { DATE_RANGES } from "@/Layouts/Dashboard/FilterBar";
import StatsGrid from "@/Layouts/Dashboard/StatsGrid";
import MainGrid from "@/Layouts/Dashboard/MainGrid";
import CampaignsSection from "@/Layouts/Dashboard/CampaignsSection";
import TransactionsTable from "@/Layouts/Dashboard/TransactionsTable";
import { PageHeader } from "@/Layouts/Dashboard/PageHeader";
import { computeFilteredStats } from "@/Layouts/Dashboard/computeFilteredStats";
import { downloadFilteredReport } from "@/Layouts/Dashboard/generateDonorReportPdf";

const DEFAULT_FILTERS = {
    dateRange: "all",
    status: "all",
    campaign: "all",
    method: "all",
};

export default function Dashboard({
    stats,
    campaigns,
    transactions,
    statusBreakdown,
    paymentMethods,
    trend,
    heatmap,
}) {
    const { auth } = usePage().props;
    const [search, setSearch] = useState("");
    const [filters, setFilters] = useState(DEFAULT_FILTERS);
    const [resetKey, setResetKey] = useState(0);

    // Daftar metode pembayaran unik, diambil langsung dari data transaksi
    // (field `method` di transactions sekarang berasal dari payment_channel)
    const methods = useMemo(
        () => [...new Set(transactions.map((t) => t.method).filter(Boolean))],
        [transactions]
    );

    // Angka di StatsGrid dihitung ulang di sini setiap kali filter/pencarian
    // berubah, supaya kartu statistik selalu mengikuti FilterBar — bukan lagi
    // angka statis all-time dari controller.
    const computedStats = useMemo(
        () => computeFilteredStats(transactions, filters, search),
        [transactions, filters, search]
    );

    const periodLabel =
        DATE_RANGES.find((r) => r.value === filters.dateRange)?.label ??
        "Sepanjang waktu";

    function handleReset() {
        setSearch("");
        setFilters(DEFAULT_FILTERS);
        setResetKey((k) => k + 1);
    }

    function handleDownloadReport() {
        downloadFilteredReport({
            userName: auth.user.name,
            periodLabel,
            filters,
            search,
            stats: computedStats,
            campaigns,
            transactions,
        });
    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-white">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
                <PageHeader
                    userName={auth.user.name.split(" ")[0]}
                    onDownloadReport={handleDownloadReport}
                />

                <FilterBar
                    filters={filters}
                    onFilterChange={setFilters}
                    search={search}
                    onSearchChange={setSearch}
                    onReset={handleReset}
                    campaigns={campaigns}
                    methods={methods}
                />

                <StatsGrid stats={computedStats} periodLabel={periodLabel} />

                <MainGrid
                    trend={trend}
                    heatmap={heatmap}
                    statusBreakdown={statusBreakdown}
                    paymentMethods={paymentMethods}
                    stats={stats}
                    transactions={transactions}
                    campaigns={campaigns}
                />

                <CampaignsSection campaigns={campaigns} />

                <TransactionsTable
                    transactions={transactions}
                    search={search}
                    filters={filters}
                    onFilterChange={setFilters}
                    resetKey={resetKey}
                />
            </div>
        </AuthenticatedLayout>
    );
}
