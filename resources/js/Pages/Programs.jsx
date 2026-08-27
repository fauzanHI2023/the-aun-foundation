import { Header } from "@/Layouts/Homepage/Header";
import { Footer } from "@/Layouts/Homepage/Footer";
import { ProgramsBanner } from "@/Layouts/Programs/ProgramsSection";
import { ProgramsCommunity } from "@/Layouts/Programs/ProgramsCommunity";
import { ProgramHeroSection } from "@/Layouts/Programs/ProgramHeroSection";
import { SeasonalProgramSection } from "@/Layouts/Programs/SeasonalProgramSection";
import CTASection from "@/Layouts/Campaign/CTASection";
import { ProgramsEducation } from "@/Layouts/Programs/ProgramsEducation";
import { ProgramsEconomic } from "@/Layouts/Programs/ProgramsEconomic";
import { ProgramsRamadhan } from "@/Layouts/Programs/ProgramsRamadhan";
import { ProgramsQurban } from "@/Layouts/Programs/ProgramsQurban";

export default function Programs() {
    return (
        <div className="min-h-screen bg-white">
            <main>
                <ProgramHeroSection />
                <ProgramsCommunity />
                <ProgramsEducation />
                <ProgramsEconomic />
                <ProgramsRamadhan />
                <ProgramsQurban />
                <CTASection />
            </main>
        </div>
    );
}
