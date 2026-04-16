import { motion } from "framer-motion";
import { Circle } from "lucide-react";

export function RembulanSymbol() {
    return (
        <section className="py-12 md:py-20 lg;py-20 bg-gradient-to-b from-gray-50 to-white">
            <div className="container mx-auto px-6 md:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto text-center space-y-12"
                >
                    {/* Moon Icon */}
                    <div className="flex justify-center">
                        <div className="w-64 h-32 rounded-full flex items-center justify-center">
                            <img
                                src="/images/logo nama samping dan pink kuning PNG.png"
                                alt="Rembulan Relief"
                                className="h-32 w-auto"
                            />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-4xl md:text-5xl font-bold">
                            The Symbol of Rembulan
                        </h2>

                        <p className="text-2xl md:text-3xl italic text-gray-700 leading-relaxed">
                            "The moon symbolizes calmness, resilience, and the
                            life-sustaining role of women"
                        </p>

                        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            As the moon illuminates darkness without
                            overpowering its surroundings, women contribute
                            fundamentally to nurturing families, educating
                            future generations, and sustaining communities.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
