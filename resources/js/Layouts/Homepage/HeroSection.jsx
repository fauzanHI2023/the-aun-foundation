import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export function HeroSection() {
    const scrollToContact = () => {
        const element = document.getElementById("contact");
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section
            id="home"
            className="relative pt-16 min-h-screen overflow-hidden"
        >
            {/* Background with organic shapes */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-white to-orange-50">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#754c24] opacity-5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-400 opacity-10 rounded-full blur-3xl"></div>
            </div>

            {/* Curved shape divider */}
            <div
                className="absolute bottom-0 left-0 right-0 h-32 bg-white"
                style={{
                    clipPath: "ellipse(70% 100% at 100% 100%)",
                }}
            ></div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
                <div className="grid lg:grid-cols-12 gap-8 items-center min-h-[calc(100vh-8rem)]">
                    {/* Text Content - Takes 6 columns */}
                    <div className="lg:col-span-6 space-y-8 z-10">
                        {/* <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-[#754c24]/20 px-4 py-2 rounded-full shadow-lg">
              <Sparkles className="w-4 h-4 text-[#754c24]" />
              <span className="text-sm font-semibold text-[#754c24]">
                Humanitarian Organization
              </span>
            </div> */}

                        <div className="space-y-6">
                            <h1 className="text-3xl md:text-6xl lg:text-7xl font-black text-gray-900 leading-[1.1]">
                                Nurturing
                                <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-[#754c24] to-amber-600">
                                    Hope & Change
                                </span>
                                <span className="block mt-2 text-3xl md:text-5xl lg:text-6xl">
                                    for Communities
                                </span>
                            </h1>

                            <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
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
                                className="group bg-gradient-to-r from-[#412c17] to-[#5d3a1c] text-white lg:px-8 lg:py-5 px-4 py-2 rounded-md hover:shadow-2xl transition-all flex items-center justify-center gap-3 lg:text-lg text-base font-bold"
                            >
                                Start Making Impact
                                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
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
                                className="bg-white border border-[#754c24] text-[#754c24] lg:px-8 lg:py-5 px-4 py-2 rounded-md hover:bg-[#342414] hover:text-white transition-all lg:text-lg text-base font-bold shadow-lg"
                            >
                                Our Story
                            </button>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
                            <div>
                                <div className="text-3xl md:text-4xl font-black text-[#754c24]">
                                    5K+
                                </div>
                                <div className="text-sm text-gray-600 mt-1">
                                    Lives Impacted
                                </div>
                            </div>
                            <div>
                                <div className="text-3xl md:text-4xl font-black text-[#754c24]">
                                    50+
                                </div>
                                <div className="text-sm text-gray-600 mt-1">
                                    Programs
                                </div>
                            </div>
                            <div>
                                <div className="text-3xl md:text-4xl font-black text-[#754c24]">
                                    20+
                                </div>
                                <div className="text-sm text-gray-600 mt-1">
                                    Communities
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Image Grid - Takes 6 columns */}
                    <div className="lg:col-span-6 relative">
                        {/* Main large image with organic shape */}
                        <div className="relative">
                            <div className="absolute -inset-4 bg-gradient-to-br from-[#754c24] to-amber-600 rounded-[3rem] rotate-3 opacity-20"></div>
                            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                                <img
                                    src="/images/IMG_3620.jpg"
                                    alt="Community volunteering"
                                    className="w-full h-[270px] lg:h-[550px] object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#754c24]/40 to-transparent"></div>
                            </div>

                            {/* Small floating image 1 */}
                            <div className="absolute -bottom-8 -left-8 w-48 h-48 rounded-3xl overflow-hidden shadow-xl border-4 border-white transform rotate-6 hover:rotate-12 transition-transform duration-500 hidden md:block">
                                <img
                                    src="/images/IMG_9749.jpg"
                                    alt="Happy children"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Small floating image 2 */}
                            <div className="absolute -top-8 -right-8 w-40 h-40 rounded-3xl overflow-hidden shadow-xl border-4 border-white transform -rotate-12 hover:-rotate-6 transition-transform duration-500 hidden lg:block">
                                <img
                                    src="/images/Copy of 2025_03_15_16_17_IMG_3343.jpg"
                                    alt="Teamwork"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Floating badge */}
                            <div className="absolute top-4 left-4 bg-white rounded-2xl shadow-lg p-4 backdrop-blur-sm bg-white/90 hidden md:block">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-gradient-to-br from-[#754c24] to-amber-600 rounded-xl flex items-center justify-center">
                                        <span className="text-white text-2xl">
                                            🤝
                                        </span>
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
            <div className="bg-[#754c24] text-white relative">
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
                                <h3 className="text-2xl font-bold mb-1">
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
