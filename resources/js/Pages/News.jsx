import { Header } from "@/Layouts/Homepage/Header";
import { Footer } from "@/Layouts/Homepage/Footer";
import { NewsHero } from "@/Layouts/News/NewsHero";
import { NewsGrid } from "@/Layouts/News/NewsGrid";

export default function News() {
    return (
        <div className="min-h-screen bg-white">
            <Header />

            <main className="pt-20">
                <NewsHero />
                <NewsGrid />
            </main>

            <Footer />
        </div>
    );
}
