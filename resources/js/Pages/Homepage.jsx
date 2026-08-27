import { Head, Link } from "@inertiajs/react";
import { HeroSection } from "@/Layouts/Homepage/HeroSection";
import { AboutSection } from "@/Layouts/Homepage/AboutSection";
import { Programs } from "@/Layouts/Homepage/Program";
import { NewsSection } from "@/Layouts/Homepage/NewsSection";
import { ContactSection } from "@/Layouts/Homepage/ContactSection";
import CTASection from "@/Layouts/Campaign/CTASection";

export default function Homepage() {
    return (
        <>
            <Head title="AUN (Asa Untuk Negeri) Foundation" />
            <HeroSection />
            <AboutSection />
            <Programs />
            <NewsSection />
            <ContactSection />
            <CTASection />
        </>
    );
}
