const scale = [
    "rgba(255,184,117,.18)",
    "rgba(255,184,117,.4)",
    "rgba(255,184,117,.62)",
    "rgba(255,184,117,.85)",
    "#ffb875",
];

function bucketColor(count, max) {
    if (count <= 0) return "rgba(255,255,255,.05)";
    if (max <= 1) return scale[4];
    const ratio = count / max;
    if (ratio > 0.85) return scale[4];
    if (ratio > 0.65) return scale[3];
    if (ratio > 0.45) return scale[2];
    if (ratio > 0.25) return scale[1];
    return scale[0];
}

export default function HeatmapCard({ heatmap = [] }) {
    const max = Math.max(1, ...heatmap);

    return (
        <div className="glass card rounded-xl p-[26px] mt-5">
            <div className="flex items-end justify-between mb-[18px] gap-3 flex-wrap">
                <div>
                    <div className="text-white text-xl font-bold tracking-[-.01em]">
                        Donation Rhythm
                    </div>
                    <div className="text-[13px] text-[#b9ab99] mt-[3px]">
                        Breakdown of your donation activity over the past 12
                        weeks
                    </div>
                </div>
            </div>

            <div className="grid grid-flow-col grid-rows-7 gap-[3px] mt-[18px] overflow-x-auto pb-1.5">
                {heatmap.map((count, i) => (
                    <div
                        key={i}
                        className="hm-cell h-8"
                        style={{ background: bucketColor(count, max) }}
                        title={`${count} transaksi`}
                    />
                ))}
            </div>

            <div className="flex justify-between items-center mt-3">
                <span className="text-[13px] text-[#b9ab99]">
                    Each box represents one day
                </span>
                <div className="flex items-center gap-[5px]">
                    <span className="text-[13px] text-[#b9ab99] mr-0.5">
                        Quiet
                    </span>
                    {scale.map((bg, i) => (
                        <div
                            key={i}
                            className="w-[9px] h-[9px] rounded-[4px]"
                            style={{ background: bg }}
                        />
                    ))}
                    <span className="text-[13px] text-[#b9ab99] ml-0.5">
                        Crowded
                    </span>
                </div>
            </div>
        </div>
    );
}
