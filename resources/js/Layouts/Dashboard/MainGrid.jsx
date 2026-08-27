import TrendChart from "./TrendChart";
import HeatmapCard from "./HeatmapCard";
import StatusDonut from "./StatusDonut";
import PaymentMethods from "./PaymentMethods";
import AiInsight from "./AiInsight";

export default function MainGrid({
    trend,
    heatmap,
    statusBreakdown,
    paymentMethods,
    stats,
    transactions,
    campaigns,
}) {
    return (
        <div className="grid grid-cols-1 [@media(min-width:1101px)]:grid-cols-[1.6fr_1fr] gap-5 mt-5 items-start">
            <div>
                <TrendChart trend={trend} />
                <HeatmapCard heatmap={heatmap} />
            </div>

            <div className="flex flex-col gap-5">
                <StatusDonut statusBreakdown={statusBreakdown} />
                <PaymentMethods paymentMethods={paymentMethods} />
                <AiInsight
                    stats={stats}
                    transactions={transactions}
                    campaigns={campaigns}
                />
            </div>
        </div>
    );
}
