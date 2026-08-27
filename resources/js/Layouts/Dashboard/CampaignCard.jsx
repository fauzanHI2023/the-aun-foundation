function fmtRp(n) {
    return "Rp" + Number(n).toLocaleString("id-ID");
}

export function CampaignCard({ campaign }) {
    const {
        title,
        category,
        thumbnail,
        percent,
        collected,
        target,
        your_contribution,
        days_left,
    } = campaign;

    return (
        <div className="glass flex-none w-[300px] rounded-card overflow-hidden">
            <div
                className="h-[130px] relative bg-cover bg-center bg-surface-low"
                style={
                    thumbnail
                        ? { backgroundImage: `url('${thumbnail}')` }
                        : undefined
                }
            >
                <div className="absolute inset-0 bg-thumb-fade" />
                {category && (
                    <span className="absolute top-3 left-3 font-label text-[10px] font-semibold tracking-[.04em] py-[5px] px-[11px] rounded-full bg-white/15 backdrop-blur-md border border-white/25 z-[2] text-white uppercase">
                        {category}
                    </span>
                )}
            </div>

            <div className="px-[19px] pt-[17px] pb-[19px]">
                <div className="font-display text-[15px] font-bold mb-3.5 leading-[1.3] min-h-[39px]">
                    {title}
                </div>

                <div className="flex justify-between items-baseline mb-2">
                    <span className="font-label text-[13.5px] font-semibold">
                        {fmtRp(collected)}
                    </span>
                    <span className="font-label text-xs font-semibold text-primary">
                        {percent}%
                    </span>
                </div>
                <div className="bar-track">
                    <div
                        className="bar-fill"
                        style={{
                            width: `${percent}%`,
                            background:
                                "linear-gradient(90deg,#c9832b,#ffb875)",
                        }}
                    />
                </div>
                <div className="text-[11px] text-onsurface-var mt-[7px]">
                    of the target {fmtRp(target)}
                </div>

                <div className="flex justify-between items-center mt-[15px] pt-3.5 border-t border-white/[0.08]">
                    <div className="text-[11.5px] text-onsurface-var">
                        your contribution{" "}
                        <b className="text-success font-label font-semibold">
                            {fmtRp(your_contribution)}
                        </b>
                    </div>
                    <div className="font-label text-[10.5px] text-outline font-semibold">
                        {days_left === null
                            ? ""
                            : days_left > 0
                            ? `${days_left} HARI LAGI`
                            : "BERAKHIR"}
                    </div>
                </div>
            </div>
        </div>
    );
}
