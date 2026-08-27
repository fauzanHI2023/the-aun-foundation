import { Header } from "@/Layouts/Homepage/Header";
import { Footer } from "@/Layouts/Homepage/Footer";
import { HeroSection } from "@/Layouts/AboutUs/HeroSection";
import { OurStory } from "@/Layouts/AboutUs/OurStory";
import { OurVision } from "@/Layouts/AboutUs/OurVision";
import { OurMission } from "@/Layouts/AboutUs/OurMission";
import { OurValues } from "@/Layouts/AboutUs/OurValues";
import { OurCommitment } from "@/Layouts/AboutUs/OurCommitment";
import CTASection from "@/Layouts/Campaign/CTASection";

export default function About() {
    return (
        <div className="min-h-screen bg-white">
            <main>
                <HeroSection />
                <OurStory />
                <OurMission />
                <OurValues />
                <OurCommitment />
                <CTASection />
                {/* <StrategicApproach /> */}
            </main>
        </div>
    );
}
