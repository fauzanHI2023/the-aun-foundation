import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function InclusiveApproach() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);

    return (
        <section
            className="py-12 md:py-20 lg:py-32 relative overflow-hidden"
            ref={containerRef}
        >
            <div className="container mx-auto px-6 md:px-12">
                <div className="grid lg:grid-cols-2 gap-10 md:gap-16 lg:gap-20 items-center">
                    {/* Left Text */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-4 md:space-y-6 lg:space-y-8"
                    >
                        <div className="inline-block">
                            <div
                                className="bg-[#ef1968] text-white px-8 py-3 inline-block"
                                style={{ borderRadius: "20px 20px 20px 4px" }}
                            >
                                <p className="text-sm font-bold uppercase tracking-widest">
                                    Inclusive
                                </p>
                            </div>
                        </div>

                        <h2 className="text-5xl md:text-6xl font-bold leading-tight">
                            Engaging Men
                            <br />
                            <span className="text-[#ef1968]">as Partners</span>
                        </h2>

                        <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                            <p>
                                Sustainable change cannot be achieved by
                                excluding men. Men—as fathers, caregivers,
                                youth, and community leaders—play a critical
                                role in shaping family welfare, social norms,
                                and economic stability.
                            </p>
                            <p>
                                All programs actively engage men as partners and
                                allies, strengthening shared responsibility,
                                gender equity, and inclusive community
                                resilience.
                            </p>
                        </div>

                        <div className="flex gap-4 pt-4">
                            <div className="w-2 bg-gradient-to-b from-[#ef1968] to-[#f7c498]" />
                            <div>
                                <p className="text-sm font-bold text-gray-900 mb-2">
                                    Shared Responsibility
                                </p>
                                <p className="text-sm text-gray-600">
                                    Building equitable systems together
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Images Collage */}
                    <motion.div
                        // style={{ y: y1 }}
                        className="relative h-[500px]"
                    >
                        <div className="absolute top-0 left-0 w-[55%] h-[60%]">
                            <img
                                src="images/aboutus/IMG_5443.jpg"
                                alt="Family togetherness"
                                className="w-full h-full object-cover"
                                style={{ borderRadius: "32px 32px 32px 8px" }}
                            />
                        </div>

                        <div className="absolute bottom-0 right-0 w-[60%] h-[55%]">
                            <img
                                src="/images/aboutus/DSC04025.jpg"
                                alt="Unity"
                                className="w-full h-full object-cover border-8 border-white"
                                style={{ borderRadius: "32px 32px 32px 8px" }}
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
