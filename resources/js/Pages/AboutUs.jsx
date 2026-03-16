import { Header } from "@/Layouts/Homepage/Header";
import { Footer } from "@/Layouts/Homepage/Footer";
import { HeroSection } from "@/Layouts/AboutUs/HeroSection";
import { OrganizationalStatement } from "@/Layouts/AboutUs/OrganizationStatement";
import { InclusiveApproach } from "@/Layouts/AboutUs/InclusiveApproach";
import { RembulanSymbol } from "@/Layouts/AboutUs/RembulanSymbol";
import { VisionSection } from "@/Layouts/AboutUs/VisionSection";
import { MissionsSection } from "@/Layouts/AboutUs/MissionSection";
import { StrategicApproach } from "@/Layouts/AboutUs/StrategicApproach";

export default function About() {
    return (
        <div className="min-h-screen bg-white">
            <Header />

            <main className="pt-20">
                <HeroSection />
                <OrganizationalStatement />
                <InclusiveApproach />
                <RembulanSymbol />
                <VisionSection />
                <MissionsSection />
                <StrategicApproach />
            </main>

            <Footer />
        </div>
    );
}
