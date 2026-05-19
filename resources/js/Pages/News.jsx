import { Header } from "@/Layouts/Homepage/Header";
import { Footer } from "@/Layouts/Homepage/Footer";
import { NewsHero } from "@/Layouts/News/NewsHero";
import { NewsGrid } from "@/Layouts/News/NewsGrid";
import { NewsHeroSection } from "@/Layouts/News/NewsHeroSection";
import { NewsCommunitySection } from "@/Layouts/News/NewsCommunitySection";
import { NewsEducationSection } from "@/Layouts/News/NewsEducationSection";
import { NewsEconomicSection } from "@/Layouts/News/NewsEconomicSection";
import { NewsSeasonalSection } from "@/Layouts/News/NewsSeasonalSection";

export default function News() {
    return (
        <div className="min-h-screen bg-white">
            <Header />

            <main className="">
                <NewsHeroSection />
                <NewsCommunitySection />
                <NewsEducationSection />
                <NewsEconomicSection />
                <NewsSeasonalSection />
            </main>

            <Footer />
        </div>
    );
}
