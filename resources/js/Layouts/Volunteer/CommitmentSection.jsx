import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function CommitmentSection() {
    return (
        <section className="py-32 bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden relative">
            {/* Gradient Accents */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-[#ef1968]/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#f7c498]/10 rounded-full blur-3xl" />

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-block mb-8">
                        <div
                            className="px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-white"
                            style={{
                                background:
                                    "linear-gradient(135deg, #ef1968 0%, #f7c498 100%)",
                                borderRadius: "12px 12px 12px 3px",
                            }}
                        >
                            Our Promise
                        </div>
                    </div>

                    <h2 className="text-4xl md:text-6xl font-bold mb-8">
                        Commitment to{" "}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ef1968] to-[#f7c498]">
                            Impact
                        </span>
                    </h2>

                    <p className="text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto mb-20">
                        Rembulan Relief Nusantara is committed to delivering
                        humanitarian and development interventions that are
                        ethical, inclusive, and evidence-based. By focusing on
                        women and children while constructively engaging men,
                        the organization works to reduce vulnerability,
                        strengthen social and environmental resilience, and
                        advance dignity for a better future for all.
                    </p>
                </motion.div>

                {/* Quote Section */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="max-w-5xl mx-auto text-center"
                >
                    <div
                        className="p-12 md:p-16 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10"
                        style={{ borderRadius: "48px 48px 48px 12px" }}
                    >
                        <div className="mb-6">
                            <div className="inline-block w-16 h-1 bg-gradient-to-r from-[#ef1968] to-[#f7c498]" />
                        </div>

                        <blockquote className="text-3xl md:text-5xl font-bold leading-tight mb-8">
                            <span className="block text-white mb-4">
                                DIGNITY IS NOT GIVEN.
                            </span>
                            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-[#ef1968] to-[#f7c498]">
                                IT IS PROTECTED, NURTURED,
                            </span>
                            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-[#ef1968] to-[#f7c498]">
                                AND SUSTAINED TOGETHER.
                            </span>
                        </blockquote>

                        <div className="flex justify-center">
                            <div className="inline-block w-16 h-1 bg-gradient-to-r from-[#ef1968] to-[#f7c498]" />
                        </div>
                    </div>
                </motion.div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-16"
                >
                    <button
                        className="group bg-gradient-to-r from-[#ef1968] to-[#f7c498] text-white px-12 py-6 font-bold text-xl flex items-center gap-3 hover:gap-5 transition-all hover:shadow-2xl mx-auto"
                        style={{ borderRadius: "28px 28px 28px 7px" }}
                    >
                        <span>Become a Pink Ranger Today</span>
                        <ArrowRight size={24} />
                    </button>
                </motion.div>
            </div>
        </section>
    );
}
