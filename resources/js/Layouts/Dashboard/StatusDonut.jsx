import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";

ChartJS.register(ArcElement, Tooltip);

const colorMap = {
    success: { hex: "#333a25", dot: "bg-[#b7c793]" },
    pending: { hex: "#744d2c", dot: "bg-[#744d2c]" },
    failed: { hex: "#ff9086", dot: "bg-[#ff9086]" },
    expired: { hex: "#c6c6c7", dot: "bg-secondary" },
};

export default function StatusDonut({ statusBreakdown = [] }) {
    const total = statusBreakdown.reduce((sum, s) => sum + s.count, 0);

    const data = {
        labels: statusBreakdown.map((s) => s.label),
        datasets: [
            {
                data: statusBreakdown.map((s) => s.count),
                backgroundColor: statusBreakdown.map(
                    (s) => colorMap[s.status]?.hex ?? "#c6c6c7"
                ),
                borderWidth: 3,
                borderColor: "#1a1510",
                hoverOffset: 6,
            },
        ],
    };
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "74%",
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: "#2d2015",
                borderColor: "rgba(255,255,255,.08)",
                borderWidth: 1,
                padding: 10,
                cornerRadius: 10,
            },
        },
    };

    return (
        <div className="glass card rounded-xl p-[26px]">
            <div className="font-display text-xl font-bold tracking-[-.01em] text-white">
                Transaction Status
            </div>
            <div className="text-[13px] text-[#b9ab99] mt-[3px]">
                Breakdown for the Last 30 Days
            </div>

            <div className="relative h-[190px] flex items-center justify-center mt-2.5">
                {total > 0 ? (
                    <Doughnut data={data} options={options} />
                ) : (
                    <div className="text-onsurface-var text-sm">
                        No transactions yet
                    </div>
                )}
                {total > 0 && (
                    <div className="absolute text-center">
                        <div className="font-display text-[26px] font-bold text-white">
                            {total}
                        </div>
                        <div className="text-[10.5px] text-onsurface-var mt-0.5 text-white">
                            Total transaction
                        </div>
                    </div>
                )}
            </div>

            <div className="mt-3.5 flex flex-col gap-2.5">
                {statusBreakdown.map((s) => (
                    <div
                        key={s.status}
                        className="flex items-center gap-2.5 text-[12.5px]"
                    >
                        <span
                            className={`w-2 h-2 rounded-full shrink-0 ${
                                colorMap[s.status]?.dot ?? "bg-secondary"
                            }`}
                        />
                        <span className="text-[#b9ab99] font-medium flex-1">
                            {s.label}
                        </span>
                        <span className="num font-semibold text-white">
                            {s.count}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
