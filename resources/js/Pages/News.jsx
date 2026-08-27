import { NewsHeroSection } from "@/Layouts/News/NewsHeroSection";
import { NewsCommunitySection } from "@/Layouts/News/NewsCommunitySection";
import { NewsEducationSection } from "@/Layouts/News/NewsEducationSection";
import { NewsEconomicSection } from "@/Layouts/News/NewsEconomicSection";
import { NewsSeasonalSection } from "@/Layouts/News/NewsSeasonalSection";
import CTASection from "@/Layouts/Campaign/CTASection";

export default function News() {
    return (
        <div className="min-h-screen bg-white">
            <main className="">
                <NewsHeroSection />
                <NewsCommunitySection />
                <NewsEducationSection />
                <NewsEconomicSection />
                <NewsSeasonalSection />
                <CTASection />
            </main>
        </div>
    );
}
