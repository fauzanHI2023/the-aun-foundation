import { CommunitySection } from "@/Layouts/Campaign/CommunitySection";
import CTASection from "@/Layouts/Campaign/CTASection";
import { HeroSlider } from "@/Layouts/Campaign/HeroSlider";
import { NewestCampaigns } from "@/Layouts/Campaign/NewestCampaign";
import { PopularCampaigns } from "@/Layouts/Campaign/PopularCampaign";
import { Head, Link } from "@inertiajs/react";

function formatRupiah(value) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    }).format(value || 0);
}

export default function Index() {
    return (
        <>
            <Head title="Program Donasi" />

            <div className="min-h-screen bg-stone-50">
                <HeroSlider />
                <PopularCampaigns />
                <NewestCampaigns />
                <CommunitySection />
                <CTASection />
                {/* <main className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
                    {campaigns.length === 0 ? (
                        <div className="rounded-2xl border border-dashed border-stone-300 bg-white py-20 text-center">
                            <p className="font-serif text-lg text-stone-700">
                                Belum ada program yang tersedia
                            </p>
                            <p className="mt-2 text-sm text-stone-500">
                                Program baru akan muncul di sini begitu dibuka.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {campaigns.map((campaign) => (
                                <CampaignCard
                                    key={campaign.id}
                                    campaign={campaign}
                                />
                            ))}
                        </div>
                    )}
                </main> */}
            </div>
        </>
    );
}
