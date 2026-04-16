import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export function VolunteerHero() {
    return (
        <section className="relative bg-white overflow-hidden pt-16 md:pt-20 pb-8 md:pb-12 lg:pt-16 lg:pb-16">
            {/* Decorative Elements */}
            <div className="absolute top-20 right-0 w-[400px] h-[400px] bg-[#ef1968]/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#f7c498]/10 rounded-full blur-3xl" />

            {/* Diagonal Stripe Pattern */}
            <div className="absolute top-0 right-0 w-1/3 h-full opacity-5">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `repeating-linear-gradient(45deg, #ef1968 0px, #ef1968 2px, transparent 2px, transparent 20px)`,
                    }}
                />
            </div>

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <div className="grid lg:grid-cols-12 gap-6 md:gap-8 items-center">
                    {/* Left Content - 7 cols */}
                    <div className="lg:col-span-7">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            {/* Badge & Title Group */}
                            <div className="mb-4 md:mb-6">
                                <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 text-[10px] md:text-xs font-bold uppercase tracking-widest text-[#ef1968] mb-3 md:mb-4">
                                    Join the Movement
                                </div>
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-bold leading-[0.9] mb-4 md:mb-6">
                                <span className="block text-gray-900">
                                    Be a
                                </span>
                                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-[#ef1968] to-[#f7c498]">
                                    Pink Ranger
                                </span>
                            </h1>

                            <p className="text-lg md:text-xl lg:text-2xl text-gray-700 mb-4 md:mb-6 leading-relaxed max-w-2xl">
                                Volunteers committed to advancing{" "}
                                <span className="font-bold text-[#ef1968]">
                                    Dignity
                                </span>
                                ,{" "}
                                <span className="font-bold text-[#f7c498]">
                                    Equity
                                </span>
                                , and{" "}
                                <span className="font-bold text-[#ef1968]">
                                    Sustainability
                                </span>
                            </p>

                            {/* Description replacing Stats */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="mb-6 md:mb-8 p-5 md:p-6 bg-gradient-to-br from-gray-50 to-white border-l-4 border-[#ef1968]"
                                style={{ borderRadius: "0 20px 20px 0" }}
                            >
                                <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                                    Rembulan Relief Nusantara believes that
                                    lasting and meaningful change is only
                                    possible through collective action. We
                                    invite individuals, communities, and
                                    professionals from diverse backgrounds to
                                    join us as{" "}
                                    <span className="font-bold text-[#ef1968]">
                                        Pink Rangers
                                    </span>{" "}
                                    — volunteers and change partners committed
                                    to advancing human dignity, social equity,
                                    and environmental sustainability.
                                </p>
                            </motion.div>

                            {/* CTA Buttons */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="flex flex-wrap gap-3"
                            >
                                <button
                                    className="group bg-gradient-to-r from-[#ef1968] to-[#f7c498] text-white px-6 md:px-8 py-3 md:py-4 font-bold text-sm md:text-base flex items-center gap-3 hover:gap-4 transition-all hover:shadow-xl"
                                    style={{
                                        borderRadius: "20px 20px 20px 5px",
                                    }}
                                >
                                    <span>Join Now</span>
                                    <ArrowRight size={18} />
                                </button>
                                <button
                                    className="group bg-white text-gray-900 border-2 border-gray-900 px-6 md:px-8 py-3 md:py-4 font-bold text-sm md:text-base flex items-center gap-2 hover:bg-gray-900 hover:text-white transition-all"
                                    style={{
                                        borderRadius: "20px 20px 20px 5px",
                                    }}
                                >
                                    <span>Learn More</span>
                                </button>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Right Image Grid - 5 cols - More Dynamic */}
                    <div className="lg:col-span-5">
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative"
                        >
                            {/* Main Image - Shifted Layout */}
                            <div className="relative">
                                {/* Large Main Image */}
                                <div
                                    className="relative overflow-hidden"
                                    style={{
                                        borderRadius: "32px 32px 32px 8px",
                                    }}
                                >
                                    <img
                                        src="/images/DSC02810-2.jpg"
                                        alt="Pink Rangers"
                                        className="w-full h-[300px] md:h-[400px] lg:h-[450px] object-cover"
                                    />

                                    {/* Gradient Overlay Bottom */}
                                    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/40 to-transparent" />

                                    {/* Bottom Badge */}
                                    <div
                                        className="absolute bottom-4 md:bottom-6 left-4 md:left-6 right-4 md:right-6 bg-white/95 backdrop-blur-sm px-3 md:px-4 py-2 md:py-3 flex items-center justify-between"
                                        style={{
                                            borderRadius: "16px 16px 16px 4px",
                                        }}
                                    >
                                        <div>
                                            <div className="text-[10px] md:text-xs text-gray-600">
                                                Making Impact Since
                                            </div>
                                            <div className="text-lg md:text-xl font-bold text-[#ef1968]">
                                                2020
                                            </div>
                                        </div>
                                        <div
                                            className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#ef1968] to-[#f7c498] flex items-center justify-center"
                                            style={{
                                                borderRadius:
                                                    "12px 12px 12px 3px",
                                            }}
                                        >
                                            <Sparkles
                                                size={18}
                                                className="md:w-5 md:h-5 text-white"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Floating Card - Top Right */}
                                <motion.div
                                    animate={{ y: [0, -8, 0] }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                    className="hidden md:block absolute -top-4 -right-4 bg-gradient-to-br from-[#f7c498] to-[#f7c498]/80 p-4 shadow-xl"
                                    style={{
                                        borderRadius: "20px 20px 20px 5px",
                                    }}
                                >
                                    <div className="text-white">
                                        <div className="text-xs font-bold mb-1">
                                            Collective Action
                                        </div>
                                        <div className="text-2xl font-bold">
                                            Together
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Small Accent Card - Bottom Right */}
                                <motion.div
                                    animate={{ y: [0, 8, 0] }}
                                    transition={{
                                        duration: 3.5,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: 0.5,
                                    }}
                                    className="hidden md:block absolute -bottom-3 -right-3 bg-[#ef1968] w-24 py-4 flex items-center justify-center shadow-lg"
                                    style={{
                                        borderRadius: "24px 24px 24px 6px",
                                    }}
                                >
                                    <div className="flex flex-col items-center text-center text-white h-full">
                                        <div className="text-3xl font-bold">
                                            4
                                        </div>
                                        <div className="text-[10px] uppercase tracking-wider">
                                            Roles
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
