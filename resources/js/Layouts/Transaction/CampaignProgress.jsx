export function CampaignProgress({ title, raisedLabel, targetLabel, percent }) {
    return (
        <div className="glass-panel mb-3.5 rounded-xl px-7 pb-7 pt-[26px]">
            <p className="m-0 mb-4 text-[12.5px] font-bold uppercase tracking-[0.08em] text-grey-light">
                Ditujukan untuk
            </p>

            <div className="mb-[22px]">
                <h3 className="m-0 mb-2.5 font-display text-[19px] font-medium leading-[1.3] text-pitch-black">
                    {title}
                </h3>
            </div>

            <div className="mb-3 flex items-baseline justify-between">
                <span className="text-[13px] font-bold text-pitch-black">
                    Progres pengumpulan dana
                </span>
                <span className="font-mono text-[13px] font-semibold text-warm-bark">
                    {percent}%
                </span>
            </div>
            <div className="mb-3 h-[7px] overflow-hidden rounded-full bg-grey/[.16]">
                <div
                    className="h-full rounded-full bg-gradient-to-r from-amber-light to-brown-bark transition-[width] duration-[1400ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]"
                    style={{ width: `${percent}%` }}
                />
            </div>
            <div className="flex justify-between text-xs text-grey">
                <span>
                    Terkumpul <b className="text-carbon-black">{raisedLabel}</b>
                </span>
                <span>
                    Target <b className="text-carbon-black">{targetLabel}</b>
                </span>
            </div>
        </div>
    );
}

export default CampaignProgress;
