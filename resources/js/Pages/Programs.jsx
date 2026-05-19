import { Header } from "@/Layouts/Homepage/Header";
import { Footer } from "@/Layouts/Homepage/Footer";
import { ProgramsBanner } from "@/Layouts/Programs/ProgramsSection";
import { ProgramsCompact } from "@/Layouts/Programs/ProgramsCompact";
import { ProgramHeroSection } from "@/Layouts/Programs/ProgramHeroSection";
import { SeasonalProgramSection } from "@/Layouts/Programs/SeasonalProgramSection";

export default function Programs() {
    return (
        <div className="min-h-screen bg-white">
            <Header />

            <main className="pt-20">
                <ProgramHeroSection />
                <ProgramsBanner />
                <SeasonalProgramSection />
            </main>

            <Footer />
        </div>
    );
}
