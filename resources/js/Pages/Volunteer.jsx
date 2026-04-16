import { Header } from "@/Layouts/Homepage/Header";
import { Footer } from "@/Layouts/Homepage/Footer";
import { VolunteerHero } from "@/Layouts/Volunteer/VolunteerHero";
import { WhoArePinkRangers } from "@/Layouts/Volunteer/WhoArePinkRanger";
import { WhyBecome } from "@/Layouts/Volunteer/WhyBecome";
import { VolunteerGallery } from "@/Layouts/Volunteer/VolunteerGallery";
import { CommitmentSection } from "@/Layouts/Volunteer/CommitmentSection";

export default function News() {
    return (
        <div className="min-h-screen bg-white">
            <Header />

            <main className="pt-20">
                <VolunteerHero />
                <WhoArePinkRangers />
                <WhyBecome />
                <VolunteerGallery />
                <CommitmentSection />
            </main>

            <Footer />
        </div>
    );
}
