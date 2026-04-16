import { Header } from "@/Layouts/Homepage/Header";
import { Footer } from "@/Layouts/Homepage/Footer";
import { ProgramsBanner } from "@/Layouts/Programs/ProgramsSection";
import { ProgramsCompact } from "@/Layouts/Programs/ProgramsCompact";

export default function Programs() {
    return (
        <div className="min-h-screen bg-white">
            <Header />

            <main className="pt-20">
                <ProgramsBanner />
                <ProgramsCompact />
            </main>

            <Footer />
        </div>
    );
}
