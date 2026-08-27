import { useMemo, useState } from "react";
import { CampaignCard } from "./CampaignCard";

const tabs = ["Aktif", "Berakhir", "Semua"];

export default function CampaignsSection({ campaigns = [] }) {
    const [tab, setTab] = useState("Aktif");

    const filtered = useMemo(() => {
        if (tab === "Aktif") return campaigns.filter((c) => c.is_active);
        if (tab === "Berakhir") return campaigns.filter((c) => !c.is_active);
        return campaigns;
    }, [campaigns, tab]);

    return (
        <div id="campaign" className="mt-[34px]">
            <div className="flex items-end justify-between mb-[18px] gap-3 flex-wrap">
                <div>
                    <div className="font-display text-xl font-bold tracking-[-.01em] text-white">
                        Campaigns You Support
                    </div>
                    <div className="text-[13px] text-onsurface-var mt-[3px]">
                        Fundraising progress for the campaigns you've supported
                    </div>
                </div>
                <div className="flex gap-[3px] bg-white/5 p-1 rounded-full">
                    {tabs.map((t) => (
                        <button
                            key={t}
                            onClick={() => setTab(t)}
                            className={`py-[7px] px-3.5 font-label text-xs font-semibold rounded-full transition-colors duration-150 ${
                                tab === t
                                    ? "bg-[#332921] text-[#ffb875] shadow-[0_2px_8px_rgba(0,0,0,.3)]"
                                    : "text-[#b9ab99]"
                            }`}
                        >
                            {t}
                        </button>
                    ))}
                </div>
            </div>

            {filtered.length === 0 ? (
                <div className="glass rounded-xl p-8 text-center text-[#b9ab99] text-sm">
                    There are no campaigns in this category yet.
                </div>
            ) : (
                <div className="flex gap-4 overflow-x-auto pb-2 [scroll-snap-type:x_proximity]">
                    {filtered.map((c) => (
                        <div key={c.id} className="[scroll-snap-align:start]">
                            <CampaignCard campaign={c} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
