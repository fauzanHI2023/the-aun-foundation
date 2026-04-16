import { motion } from "framer-motion";

const benefits = [
    "Contribute directly to humanitarian and sustainable development programs",
    "Support women and children as key agents of change",
    "Participate in inclusive and community-driven environmental action",
    "Collaborate within an accountable organization aligned with global standards",
];

export function WhyBecome() {
    return (
        <section className="py-24 bg-gradient-to-br from-[#ef1968]/5 via-white to-[#f7c498]/5">
            <div className="container mx-auto px-6 md:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl md:text-7xl font-bold mb-6">
                        Why Become a{" "}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ef1968] to-[#f7c498]">
                            Pink Ranger?
                        </span>
                    </h2>
                </motion.div>

                {/* Benefits Grid - Card Layout */}
                <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
                    {benefits.map((benefit, index) => {
                        const colors = index % 2 === 0 ? "#ef1968" : "#f7c498";

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group bg-white p-8 hover:bg-gradient-to-br hover:from-white hover:to-gray-50 transition-all duration-300"
                                style={{ borderRadius: "32px 32px 32px 8px" }}
                            >
                                <div className="flex items-start gap-6">
                                    <div
                                        className="flex-shrink-0 w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-transform text-white font-bold text-2xl"
                                        style={{
                                            backgroundColor: colors,
                                            borderRadius: "16px 16px 16px 4px",
                                        }}
                                    >
                                        {String(index + 1).padStart(2, "0")}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xl font-bold text-gray-900 leading-relaxed">
                                            {benefit}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
