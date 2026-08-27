import CTASection from "@/Layouts/Campaign/CTASection";
import { ContactSectionPage } from "@/Layouts/Contact/ContactSectionPage";

export default function Contact() {
    return (
        <div className="min-h-screen bg-white">
            <main className="">
                <ContactSectionPage />
                <CTASection />
            </main>
        </div>
    );
}
