import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
} from "chart.js";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale);

export default function Sparkline({ data, color }) {
    const chartData = {
        labels: data.map((_, i) => i),
        datasets: [
            {
                data,
                borderColor: color,
                borderWidth: 2,
                pointRadius: 0,
                tension: 0.4,
            },
        ],
    };
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { enabled: false } },
        scales: { x: { display: false }, y: { display: false } },
    };
    return (
        <div className="mt-3.5 h-8">
            <Line data={chartData} options={options} />
        </div>
    );
}
