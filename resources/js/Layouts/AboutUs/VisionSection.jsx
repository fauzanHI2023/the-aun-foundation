import { motion } from "framer-motion";

export function VisionSection() {
    return (
        <section className="py-12 md:py-20 lg:py-32 relative overflow-hidden bg-white">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1762503203730-ca33982518af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGNvbG9yZnVsJTIwZ3JhZGllbnQlMjBtb2Rlcm58ZW58MXx8fHwxNzczMzAxMDAxfDA&ixlib=rb-4.1.0&q=80&w=1080')] bg-cover bg-center opacity-5" />

            <div className="container mx-auto px-6 md:px-12 relative">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-6xl mx-auto text-center space-y-6 md:space-y-8 lg:space-y-12"
                >
                    <p className="text-xs md:text-sm uppercase tracking-widest text-gray-500">
                        Our Vision
                    </p>

                    <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-bold leading-tight">
                        Dignity for a<br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ef1968] to-[#f7c498]">
                            Better Future
                        </span>
                    </h2>

                    <p className="text-lg md:text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                        Human dignity is the cornerstone of sustainable
                        development. By safeguarding dignity today, we
                        contribute to a more just, resilient, and humane future.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
