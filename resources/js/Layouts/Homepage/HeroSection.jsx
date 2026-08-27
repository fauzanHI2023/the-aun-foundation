import { ArrowRight, Sparkles, HeartHandshake } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export function HeroSection() {
    const scrollToContact = () => {
        const element = document.getElementById("contact");
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    // ⬇️ NEW: daftar gambar untuk slider
    const heroImages = [
        "/images/IMG_3620.webp",
        "/images/IMG_3644.webp",
        "/images/IMG_9777.webp",
        "/images/IMG_9848.webp",
    ];

    const [currentSlide, setCurrentSlide] = useState(0);

    // ⬇️ NEW: auto-slide setiap 4 detik
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroImages.length);
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section id="home" className="relative bg-white">
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-4">
                <div className="grid lg:grid-cols-12 gap-8 items-center min-h-[calc(100vh-8rem)]">
                    {/* Text Content - Takes 6 columns */}
                    <div className="lg:col-span-6 space-y-8 z-10">
                        <div className="space-y-6">
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-primary-black leading-[1.1]">
                                Nurturing
                                <span className="block mt-2 bg-[linear-gradient(100deg,#8B5E34,#B9873F_65%)] bg-clip-text text-transparent">
                                    Hope & Change
                                </span>
                                <span className="block mt-2 text-3xl md:text-4xl lg:text-5xl">
                                    for Communities
                                </span>
                            </h1>

                            <p className="text-base text-gray-600 leading-relaxed max-w-lg">
                                Through{" "}
                                <span className="font-bold text-[#754c24]">
                                    ta'awun
                                </span>{" "}
                                (mutual support), we bring practical solutions
                                to communities in need, creating sustainable
                                impact that transforms lives.
                            </p>
                        </div>

                        <div className="flex flex-row sm:flex-row gap-4 pt-6">
                            <button
                                onClick={scrollToContact}
                                className="group cursor-pointer cta-glow text-white lg:px-6 lg:py-3 px-4 py-2 rounded-xl hover:shadow-2xl transition-all flex items-center justify-center gap-3 lg:text-base text-base font-bold"
                            >
                                Start Making Impact
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                            </button>
                            <button
                                onClick={() => {
                                    const element =
                                        document.getElementById("about");
                                    if (element) {
                                        element.scrollIntoView({
                                            behavior: "smooth",
                                        });
                                    }
                                }}
                                className="bg-white border cursor-pointer border-[#754c24] text-[#754c24] lg:px-8 lg:py-3 px-4 py-2 rounded-xl hover:bg-third hover:text-white transition-all lg:text-lg text-base font-bold shadow-lg"
                            >
                                Our Story
                            </button>
                        </div>

                        {/* Stats */}
                        <div class="mt-14 max-w-md">
                            <div class="inline-flex items-center gap-2 bg-white border border-border-grey rounded-full pl-2 pr-4 py-1.5 mb-5">
                                <div class="w-5 h-5 rounded-full bg-bark/10 flex items-center justify-center">
                                    <svg
                                        width="11"
                                        height="11"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="#744D2C"
                                        stroke-width="2.5"
                                    >
                                        <path d="m9 12 2 2 4-4" />
                                        <circle cx="12" cy="12" r="9" />
                                    </svg>
                                </div>
                                <span class="text-[12px] font-semibold text-carbon">
                                    Est. 2025 · South Jakarta
                                </span>
                            </div>
                            <blockquote class="border-l-2 border-bark pl-5">
                                <p class="text-carbon/80 text-[15px] italic leading-relaxed">
                                    "To build an empowered and compassionate
                                    society where people support one another to
                                    create a dignified, sustainable future."
                                </p>
                            </blockquote>
                        </div>
                    </div>

                    {/* Image Grid - Takes 6 columns */}
                    <div className="lg:col-span-6 relative">
                        {/* Main large image with organic shape */}
                        <div className="relative">
                            <div className="absolute -inset-4 bg-gradient-to-br from-primary to-grey-light rounded-[3rem] rotate-3 opacity-20"></div>
                            <div className="relative rounded-[32px_32%_32px_32%] overflow-hidden shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform duration-500 h-[270px] lg:h-[450px]">
                                <AnimatePresence mode="wait">
                                    <motion.img
                                        key={currentSlide}
                                        src={heroImages[currentSlide]}
                                        alt="Community volunteering"
                                        className="absolute inset-0 w-full h-full object-cover"
                                        initial={{
                                            clipPath: "inset(0 0 100% 0)",
                                            scale: 1.15,
                                        }}
                                        animate={{
                                            clipPath: "inset(0 0 0% 0)",
                                            scale: 1,
                                        }}
                                        exit={{
                                            opacity: 0,
                                            scale: 1.05,
                                        }}
                                        transition={{
                                            clipPath: {
                                                duration: 0.9,
                                                ease: [0.83, 0, 0.17, 1],
                                            },
                                            scale: {
                                                duration: 1.1,
                                                ease: "easeOut",
                                            },
                                            opacity: { duration: 0.4 },
                                        }}
                                    />
                                </AnimatePresence>
                                <div className="absolute inset-0 bg-gradient-to-t from-[#754c24]/40 to-transparent"></div>
                                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                                    {heroImages.map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setCurrentSlide(i)}
                                            className={`h-2 rounded-[22px_32px_22px_32px] transition-all duration-300 ${
                                                i === currentSlide
                                                    ? "w-8 bg-white"
                                                    : "w-2 bg-white/50 hover:bg-white/80"
                                            }`}
                                            aria-label={`Go to slide ${i + 1}`}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Small floating image 1 */}
                            <div className="absolute -bottom-8 -left-8 w-48 h-48 rounded-3xl overflow-hidden shadow-xl border-4 border-white transform rotate-6 hover:rotate-12 transition-transform duration-500 hidden md:block">
                                <img
                                    src="/images/IMG_9749.webp"
                                    alt="Happy children"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Small floating image 2 */}
                            <div className="absolute -top-8 -right-8 w-40 h-40 rounded-3xl overflow-hidden shadow-xl border-4 border-white transform -rotate-12 hover:-rotate-6 transition-transform duration-500 hidden lg:block">
                                <img
                                    src="/images/Copy of 2025_03_15_16_17_IMG_3343.webp"
                                    alt="Teamwork"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Floating badge */}
                            <div className="absolute top-4 left-4 bg-white rounded-2xl shadow-lg p-4 backdrop-blur-sm bg-white/90 hidden md:block">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-grey-light rounded-xl flex items-center justify-center">
                                        <HeartHandshake className="text-white text-2xl" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-gray-900">
                                            Ta'awun
                                        </div>
                                        <div className="text-xs text-gray-600">
                                            Mutual Support
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Decorative organic shapes */}
                        <div className="absolute -z-10 top-1/4 right-0 w-72 h-72 bg-amber-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
                        <div
                            className="absolute -z-10 bottom-1/4 left-0 w-72 h-72 bg-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
                            style={{ animationDelay: "1s" }}
                        ></div>
                    </div>
                </div>
            </div>
            <div className="bg-primary-white max-w-7xl mx-auto rounded-xl text-fourty relative">
                <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                        {[
                            { label: "Ta'awun", desc: "Mutual Support" },
                            { label: "Amanah", desc: "Integrity" },
                            { label: "Rahmah", desc: "Compassion" },
                            { label: "Impact", desc: "Meaningful Change" },
                            { label: "Collaboration", desc: "Together" },
                        ].map((value, i) => (
                            <motion.div
                                key={value.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 + i * 0.1 }}
                                className="text-center"
                            >
                                <h3 className="text-3xl font-bold mb-1">
                                    {value.label}
                                </h3>
                                <p className="text-sm text-white/70">
                                    {value.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
