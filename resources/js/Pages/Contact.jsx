import { Header } from "@/Layouts/Homepage/Header";
import { Footer } from "@/Layouts/Homepage/Footer";
import { ContactHero } from "@/Layouts/Contact/ContactHero";
import { ContactCTA } from "@/Layouts/Contact/ContactCTA";
import { ContactForm } from "@/Layouts/Contact/ContactForm";

export default function Contact() {
    return (
        <div className="min-h-screen bg-white">
            <Header />

            <main className="pt-20">
                <ContactHero />
                <ContactCTA />
                <ContactForm />
            </main>

            <Footer />
        </div>
    );
}
