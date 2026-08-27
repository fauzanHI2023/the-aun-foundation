import StatCard from "./StatCard";

const icons = {
    heart: (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
        >
            <path d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0112 5.5 5.5 5.5 0 0121.5 12c-2.5 4.5-9.5 9-9.5 9z" />
        </svg>
    ),
    check: (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
        >
            <path d="M20 6L9 17l-5-5" />
        </svg>
    ),
    heartHands: (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
        >
            <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
        </svg>
    ),
    trend: (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
        >
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
        </svg>
    ),
};

export default function StatsGrid({
    stats = {},
    periodLabel = "30 hari terakhir",
}) {
    const sparklines = stats.sparklines ?? {};

    if (!stats) {
        return null; // or a loading skeleton
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 [@media(min-width:1101px)]:grid-cols-4 gap-[18px] mt-[30px]">
            <StatCard
                hero
                icon={icons.heart}
                iconVariant="primary"
                trend={stats.total_donated_trend}
                isRupiah
                target={stats.total_donated}
                label={`Total Contribution · ${periodLabel}`}
                sparkline={sparklines.total ?? []}
                sparkColor="#ffb875"
            />
            <StatCard
                icon={icons.check}
                iconVariant="success"
                trend={stats.tx_count_trend}
                target={stats.tx_count}
                label={`Successful transactions · success rate ${stats.tx_success_rate}%`}
                sparkline={sparklines.tx ?? []}
                sparkColor="#b7c793"
            />
            <StatCard
                icon={icons.heartHands}
                iconVariant="secondary"
                trend={stats.campaigns_new_trend}
                target={stats.campaigns_count}
                label="Campaigns you support"
                sparkline={sparklines.campaigns ?? []}
                sparkColor="#c6c6c7"
            />
            <StatCard
                icon={icons.trend}
                iconVariant="tertiary"
                trend={stats.avg_donation_trend}
                isRupiah
                target={stats.avg_donation}
                label="Average amount per donation"
                sparkline={sparklines.avg ?? []}
                sparkColor="#e8a35f"
            />
        </div>
    );
}
