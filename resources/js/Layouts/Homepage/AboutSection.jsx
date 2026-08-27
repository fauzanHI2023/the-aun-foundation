import { motion } from "framer-motion";

export function AboutSection() {
    return (
        <section id="about" className="bg-white md:py-16 py-8">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl md:text-5xl mb-4 text-primary-black font-bold">
                            Story{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-grey-primary">
                                Us
                            </span>
                        </h2>
                        <div className="space-y-6 text-lg text-black/70 leading-relaxed">
                            <p>
                                <span className="text-black font-medium">
                                    AUN (Asa Untuk Negeri)
                                </span>{" "}
                                is a humanitarian organization committed to
                                bringing hope and practical solutions to
                                communities in need.
                            </p>
                            <p>
                                We work to address various social challenges
                                through structured and impactful humanitarian
                                programs, focusing on improving community
                                well-being, empowering vulnerable groups, and
                                expanding access to essential services.
                            </p>
                            <p>
                                Through collaboration with communities,
                                volunteers, donors, and various partners, AUN
                                strives to create meaningful impact for those in
                                need while contributing to the development of
                                stronger and more resilient communities.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-4">
                                <div className="bg-primary-white text-primary-black p-8 rounded-xl">
                                    <p className="text-4xl font-black mb-2">
                                        2025
                                    </p>
                                    <p className="text-sm text-primary-black/80">
                                        Established
                                    </p>
                                </div>
                                <div className="relative overflow-hidden h-72 rounded-lg">
                                    <img
                                        src="/images/IMG_3644.webp"
                                        alt="Community support"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                            <div className="space-y-4 pt-12">
                                <div className="relative overflow-hidden h-48 rounded-lg">
                                    <img
                                        src="/images/IMG_3666.jpg"
                                        alt="Teamwork"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="bg-primary-white text-primary-black p-8 rounded-xl">
                                    <p className="text-5xl font-bold mb-2">
                                        50+
                                    </p>
                                    <p className="text-sm text-primary-black/80">
                                        Partners
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
