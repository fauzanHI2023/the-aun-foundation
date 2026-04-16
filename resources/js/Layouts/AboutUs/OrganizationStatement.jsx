import { motion } from "framer-motion";

export function OrganizationalStatement() {
    return (
        <section className="py-12 md:py-16 lg:py-20 bg-black text-white">
            <div className="container mx-auto px-6 md:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-5xl mx-auto"
                >
                    <p className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold md:leading-relaxed">
                        We focus primarily on{" "}
                        <span className="text-[#ef1968]">
                            women and children
                        </span>
                        , who are disproportionately affected by structural
                        inequality in access to{" "}
                        <span className="text-[#f7c498]">
                            education, health services, economic opportunities
                        </span>
                        , social protection, and a healthy environment.
                    </p>

                    <div className="mt-8 md:mt-12 pt-8 md:pt-12 border-t border-white/10 grid grid-cols-3 gap-4 md:gap-8">
                        <div>
                            <p className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#ef1968] mb-2">
                                100%
                            </p>
                            <p className="text-xs md:text-sm text-white/70">
                                Community-Centered
                            </p>
                        </div>
                        <div>
                            <p className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#f7c498] mb-2">
                                6
                            </p>
                            <p className="text-xs md:text-sm text-white/70">
                                Main Missions
                            </p>
                        </div>
                        <div>
                            <p className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2">
                                ∞
                            </p>
                            <p className="text-xs md:text-sm text-white/70">
                                Lasting Impact
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
