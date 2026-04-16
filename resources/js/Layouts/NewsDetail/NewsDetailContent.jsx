import { motion } from "framer-motion";
import { Quote, Users, TrendingUp, Heart, Sparkles } from "lucide-react";

export function NewsDetailContent({ article }) {
    return (
        <section className="pb-20 md:pb-32 bg-white">
            <div className="container mx-auto px-6 md:px-12">
                <div className="max-w-4xl mx-auto">
                    {/* Lead Paragraph */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-12 md:mb-16"
                    >
                        <p className="text-xl md:text-2xl text-gray-700 leading-relaxed"></p>
                    </motion.div>

                    {/* Content Block 1 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-10 space-y-5"
                    >
                        <div
                            className="text-lg text-gray-700 leading-relaxed space-y-4 [&_img]:rounded-2xl
"
                            dangerouslySetInnerHTML={{
                                __html: article.content,
                            }}
                        />
                    </motion.div>

                    {/* Pull Quote - Clean Design */}
                    {/* <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="my-16 md:my-20"
                    >
                        <div className="relative pl-8 md:pl-12">
                            <div
                                className="absolute left-0 top-0 bottom-0 w-1"
                                // style={{ backgroundColor: categoryColor }}
                            />
                            <Quote
                                size={32}
                                // style={{ color: categoryColor }}
                                className="mb-4 opacity-40"
                            />
                            <blockquote className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-4">
                                "I used to think my life was already decided.
                                Now I know I can decide it myself."
                            </blockquote>
                            <cite className="text-base md:text-lg text-gray-500 not-italic font-medium">
                                — Sari, 14, RISE–ACCESS Scholar
                            </cite>
                        </div>
                    </motion.div> */}

                    {/* Stats Grid - Minimal & Fresh */}
                    {/* <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="my-16 md:my-20"
                    >
                        <div
                            className="p-8 md:p-12 bg-gradient-to-br from-gray-50 to-white"
                            style={{ borderRadius: "32px 32px 32px 8px" }}
                        >
                            <div className="flex items-center gap-3 mb-8">
                                <div
                                    className="w-10 h-10 flex items-center justify-center"
                                    style={{
                                        // backgroundColor: categoryColor,
                                        borderRadius: "10px 10px 10px 2px",
                                    }}
                                >
                                    <Sparkles
                                        size={20}
                                        className="text-white"
                                    />
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                                    By The Numbers
                                </h3>
                            </div>

                            <div className="grid grid-cols-3 gap-4 md:gap-8">
                                <div className="text-center">
                                    <div
                                        className="text-3xl md:text-5xl font-bold mb-2"
                                        // style={{ color: categoryColor }}
                                    >
                                        1,247
                                    </div>
                                    <div className="text-xs md:text-sm text-gray-600 font-medium">
                                        Girls Enrolled
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div
                                        className="text-3xl md:text-5xl font-bold mb-2"
                                        // style={{ color: categoryColor }}
                                    >
                                        94%
                                    </div>
                                    <div className="text-xs md:text-sm text-gray-600 font-medium">
                                        Attendance Rate
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div
                                        className="text-3xl md:text-5xl font-bold mb-2"
                                        // style={{ color: categoryColor }}
                                    >
                                        18
                                    </div>
                                    <div className="text-xs md:text-sm text-gray-600 font-medium">
                                        Villages Reached
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div> */}

                    {/* Image Gallery - Side by Side */}
                    {/* <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="grid md:grid-cols-2 gap-5 my-16 md:my-20"
                    >
                        <div
                            className="overflow-hidden h-[250px] md:h-[350px] group"
                            style={{ borderRadius: "24px 24px 24px 6px" }}
                        >
                            <img
                                src="https://images.unsplash.com/photo-1574130303188-31a915382726?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMHdvbWVuJTIwY2xhc3Nyb29tJTIwdGVhY2hpbmclMjBlZHVjYXRpb258ZW58MXx8fHwxNzc0MTA3NDM2fDA&ixlib=rb-4.1.0&q=80&w=1080"
                                alt="Teachers in action"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                        <div
                            className="overflow-hidden h-[250px] md:h-[350px] group"
                            style={{ borderRadius: "24px 24px 24px 6px" }}
                        >
                            <img
                                src="https://images.unsplash.com/photo-1565373086464-c8af0d586c0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMGhhcHB5JTIwc2Nob29sJTIwbGVhcm5pbmclMjB0b2dldGhlcnxlbnwxfHx8fDE3NzQxMDc0Mzd8MA&ixlib=rb-4.1.0&q=80&w=1080"
                                alt="Students learning"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                    </motion.div> */}

                    {/* Section: Breaking Cycles */}
                    {/* <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-12 md:mb-16"
                    >
                        <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-6">
                            Breaking Generational Cycles
                        </h2>

                        <div className="space-y-5">
                            <p className="text-lg text-gray-700 leading-relaxed">
                                The RISE–ACCESS program doesn't just provide
                                scholarships—it transforms entire communities.
                                By working directly with village leaders,
                                religious figures, and families, the program
                                addresses the root causes that keep girls out of
                                school: poverty, cultural norms, and lack of
                                infrastructure.
                            </p>

                            <p className="text-lg text-gray-700 leading-relaxed">
                                Today, 1,247 girls like Sari are attending
                                school regularly. They're learning mathematics,
                                science, literature, and critical thinking. But
                                more importantly, they're learning that their
                                gender doesn't determine their destiny.
                            </p>
                        </div>
                    </motion.div> */}

                    {/* Highlight Box - The Ripple Effect */}
                    {/* <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="my-16 md:my-20"
                    >
                        <div
                            className="p-8 md:p-12 text-white relative overflow-hidden"
                            style={{
                                // backgroundColor: categoryColor,
                                borderRadius: "32px 32px 32px 8px",
                            }}
                        >
                            
                            <div
                                className="absolute -right-20 -top-20 w-64 h-64 rounded-full opacity-10"
                                style={{ backgroundColor: "white" }}
                            />

                            <h3 className="text-2xl md:text-3xl font-bold mb-4 relative z-10">
                                The Ripple Effect
                            </h3>
                            <p className="text-base md:text-lg leading-relaxed opacity-95 relative z-10">
                                When one girl stays in school, her entire family
                                benefits. Studies show that educated women earn
                                25% more income, have healthier children, and
                                invest back into their communities. RISE–ACCESS
                                isn't just changing individual lives—it's
                                rewriting the future of entire villages.
                            </p>
                        </div>
                    </motion.div> */}

                    {/* Section: What's Next */}
                    {/* <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-12"
                    >
                        <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-6">
                            What's Next
                        </h2>

                        <div className="space-y-5">
                            <p className="text-lg text-gray-700 leading-relaxed">
                                The success of RISE–ACCESS has inspired
                                expansion plans. By the end of 2026, Rembulan
                                Relief Nusantara aims to reach 3,000 girls
                                across 30 villages. But the real goal is deeper:
                                to create a movement where education for girls
                                becomes not just accepted, but celebrated.
                            </p>

                            <p className="text-lg text-gray-700 leading-relaxed">
                                As for Sari? She's now at the top of her class,
                                dreams of becoming a doctor, and mentors younger
                                girls in her village. Her story isn't unique
                                anymore—it's becoming the norm.
                            </p>

                            <div
                                className="p-6 md:p-8 bg-gradient-to-r from-gray-50 to-white border-l-4 mt-8"
                                style={{
                                    borderRadius: "20px 20px 20px 5px",
                                }}
                            >
                                <p className="text-xl md:text-2xl font-bold text-gray-900 leading-relaxed">
                                    Because every girl deserves a future. And
                                    through RISE–ACCESS, that future is no
                                    longer a dream—it's a guarantee.
                                </p>
                            </div>
                        </div>
                    </motion.div> */}
                </div>
            </div>
        </section>
    );
}
