import { Header } from "@/Layouts/Homepage/Header";
import { Footer } from "@/Layouts/Homepage/Footer";
import { HeroSection } from "@/Layouts/AboutUs/HeroSection";
import { OrganizationalStatement } from "@/Layouts/AboutUs/OrganizationStatement";
import { InclusiveApproach } from "@/Layouts/AboutUs/InclusiveApproach";
import { RembulanSymbol } from "@/Layouts/AboutUs/RembulanSymbol";
import { VisionSection } from "@/Layouts/AboutUs/VisionSection";
import { MissionsSection } from "@/Layouts/AboutUs/MissionSection";
import { StrategicApproach } from "@/Layouts/AboutUs/StrategicApproach";
import { OurStory } from "@/Layouts/AboutUs/OurStory";
import { OurVision } from "@/Layouts/AboutUs/OurVision";
import { OurMission } from "@/Layouts/AboutUs/OurMission";
import { OurValues } from "@/Layouts/AboutUs/OurValues";
import { OurCommitment } from "@/Layouts/AboutUs/OurCommitment";

export default function About() {
    return (
        <div className="min-h-screen bg-white">
            <Header />

            <main className="pt-20">
                <HeroSection />
                <OurStory />
                <OurMission />
                <OurValues />
                <OurCommitment />
                {/* <StrategicApproach /> */}
            </main>

            <Footer />
        </div>
    );
}
