import { motion } from "framer-motion";

export function OurVision() {
    return (
        <section className="py-32 bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-20"
                >
                    <div className="inline-block mb-6 px-4 py-1.5 bg-[#754c24] text-white text-xs tracking-wider">
                        VISION
                    </div>
                    <h2 className="text-5xl md:text-7xl font-bold text-black mb-8 leading-tight tracking-tight max-w-5xl">
                        To build an empowered and compassionate society
                    </h2>
                    <p className="text-2xl text-black/60 max-w-3xl">
                        Where people support one another to create a dignified
                        and sustainable future.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-6">
                    {[
                        {
                            img: "https://images.unsplash.com/photo-1681745206981-c027f0dc2575?w=800&q=80",
                            height: "h-96",
                        },
                        {
                            img: "https://images.unsplash.com/photo-1638688059056-7b18056b103b?w=800&q=80",
                            height: "h-64",
                        },
                        {
                            img: "https://images.unsplash.com/photo-1758275557129-07b7af2041cd?w=800&q=80",
                            height: "h-96",
                        },
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className={`relative overflow-hidden ${
                                item.height
                            } ${i === 1 ? "mt-12" : ""}`}
                            style={{ borderRadius: "4px" }}
                        >
                            <img
                                src={item.img}
                                alt=""
                                className="w-full h-full object-cover"
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
