import { NewsDetailHero } from "@/Layouts/NewsDetail/NewsDetailHero";
import { NewsDetailContent } from "@/Layouts/NewsDetail/NewsDetailContent";
import { NewsHeroDetailSection } from "@/Layouts/NewsDetail/NewsHeroDetailSection";

export default function NewsDetail({ article }) {
    // If article not found, redirect to news page
    return (
        <div className="min-h-screen bg-white">
            <main className="pt-20">
                <NewsHeroDetailSection article={article} />
                <NewsDetailContent article={article} />
            </main>
        </div>
    );
}
