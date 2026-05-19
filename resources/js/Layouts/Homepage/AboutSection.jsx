import { motion } from "framer-motion";

export function AboutSection() {
    return (
        <section id="about" className="bg-white py-32">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-block mb-6 px-4 py-1.5 bg-[#754c24] text-white text-xs tracking-wider">
                            Story US
                        </div>
                        <h2 className="text-5xl lg:text-6xl font-bold text-black mb-8 leading-tight tracking-tight">
                            Asa Untuk Negeri
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
                                <div className="bg-[#754c24] text-white p-8">
                                    <div className="text-5xl font-bold mb-2">
                                        2020
                                    </div>
                                    <div className="text-sm text-white/80">
                                        Established
                                    </div>
                                </div>
                                <div className="relative overflow-hidden h-72 rounded-lg">
                                    <img
                                        src="https://images.unsplash.com/photo-1631295161934-ec6c829d282a?w=800&q=80"
                                        alt="Community support"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                            <div className="space-y-4 pt-12">
                                <div className="relative overflow-hidden h-48 rounded-lg">
                                    <img
                                        src="https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=800&q=80"
                                        alt="Teamwork"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="bg-black text-white p-8">
                                    <div className="text-5xl font-bold mb-2">
                                        50+
                                    </div>
                                    <div className="text-sm text-white/80">
                                        Partners
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
