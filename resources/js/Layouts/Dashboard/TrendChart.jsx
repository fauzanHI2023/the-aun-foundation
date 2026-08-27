import { useMemo, useState } from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Tooltip,
    Filler,
} from "chart.js";

ChartJS.register(
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Tooltip,
    Filler
);

const tabs = [
    { key: "daily", label: "Daily" },
    { key: "weekly", label: "Weekly" },
    { key: "monthly", label: "Monthly" },
];

export default function TrendChart({ trend = {} }) {
    const [group, setGroup] = useState("daily");
    const active = trend[group] ?? { labels: [], values: [] };

    const data = useMemo(
        () => ({
            labels: active.labels,
            datasets: [
                {
                    data: active.values,
                    borderColor: "#ffb875",
                    borderWidth: 2.5,
                    backgroundColor: (ctx) => {
                        const { ctx: c, chartArea } = ctx.chart;
                        if (!chartArea) return "rgba(255,184,117,0)";
                        const grad = c.createLinearGradient(
                            0,
                            chartArea.top,
                            0,
                            chartArea.bottom
                        );
                        grad.addColorStop(0, "rgba(255,184,117,.32)");
                        grad.addColorStop(1, "rgba(255,184,117,0)");
                        return grad;
                    },
                    fill: true,
                    tension: 0.4,
                    pointRadius: 0,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "#ffb875",
                    pointHoverBorderColor: "#2d1600",
                    pointHoverBorderWidth: 2,
                },
            ],
        }),
        [active]
    );

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: "#2d2015",
                borderColor: "rgba(255,255,255,.08)",
                borderWidth: 1,
                padding: 10,
                titleColor: "#f3f0ef",
                bodyColor: "#f3f0ef",
                cornerRadius: 10,
                callbacks: {
                    label: (ctx) =>
                        "Rp" + Number(ctx.parsed.y).toLocaleString("id-ID"),
                },
            },
        },
        scales: {
            x: {
                grid: { display: false },
                ticks: { color: "#83705d", font: { size: 11 } },
            },
            y: {
                grid: { color: "rgba(255,255,255,.06)" },
                ticks: {
                    color: "#83705d",
                    font: { size: 11 },
                    callback: (v) => "Rp" + v / 1000 + "rb",
                },
            },
        },
    };

    return (
        <div className="glass card rounded-xl p-[26px]">
            <div className="flex items-end justify-between mb-[18px] gap-3 flex-wrap">
                <div>
                    <div className="font-display text-xl font-bold tracking-[-.01em] text-white">
                        Contribution Trends
                    </div>
                    <div className="text-[13px] text-[#b9ab99] mt-[3px]">
                        Total nominal amount of successful donations, by
                        transaction time
                    </div>
                </div>
                <div className="flex gap-[3px] bg-white/5 p-1 rounded-full">
                    {tabs.map((t) => (
                        <button
                            key={t.key}
                            onClick={() => setGroup(t.key)}
                            className={`py-[7px] px-3.5 font-label text-xs font-semibold rounded-full transition-colors duration-150 ${
                                group === t.key
                                    ? "bg-surface-highest text-primary shadow-[0_2px_8px_rgba(0,0,0,.3)]"
                                    : "text-white"
                            }`}
                        >
                            {t.label}
                        </button>
                    ))}
                </div>
            </div>
            <div className="mt-[18px] h-[270px]">
                {active.values.length > 0 ? (
                    <Line data={data} options={options} />
                ) : (
                    <div className="h-full flex items-center justify-center text-white text-sm">
                        There is no donation data for this period.
                    </div>
                )}
            </div>
        </div>
    );
}
