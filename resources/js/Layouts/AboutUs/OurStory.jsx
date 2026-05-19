import { motion } from "framer-motion";

export function OurStory() {
    return (
        <section className="bg-white py-20 md:py-32">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:col-span-5"
                    >
                        <div className="sticky top-32">
                            <div className="inline-block mb-6 px-4 py-1.5 bg-[#8B6835] text-white text-xs tracking-wider">
                                OUR STORY
                            </div>
                            <h2 className="text-5xl md:text-6xl font-bold text-black mb-8 leading-tight tracking-tight">
                                The Spirit of Ta'awun
                            </h2>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:col-span-7 space-y-8 text-xl text-black/70 leading-relaxed"
                    >
                        <p className="text-2xl text-black leading-relaxed">
                            <span className="text-[#754c24] font-semibold">
                                AUN (Asa Untuk Negeri)
                            </span>{" "}
                            represents more than just an organization—it's a
                            movement rooted in the profound concept of{" "}
                            <span className="text-black font-medium">
                                ta'awun
                            </span>
                            .
                        </p>
                        <p>
                            Ta'awun means mutual help and cooperation in
                            goodness. This spirit forms the foundation of
                            everything we do, strengthening social solidarity,
                            encouraging public compassion, and promoting
                            collaboration to create sustainable change.
                        </p>
                        <p>
                            We work to address various social challenges through
                            structured and impactful humanitarian programs,
                            focusing on improving community well-being,
                            empowering vulnerable groups, and expanding access
                            to essential services.
                        </p>
                        <p>
                            Through collaboration with communities, volunteers,
                            donors, and various partners, AUN strives to create
                            meaningful impact for those in need while
                            contributing to the development of stronger and more
                            resilient communities.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
