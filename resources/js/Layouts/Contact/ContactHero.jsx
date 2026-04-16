import { motion } from "framer-motion";

export function ContactHero() {
    return (
        <section className="relative py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
            {/* Animated Background Graphics with NGO Images */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Women Empowerment Group - Top Right */}
                <motion.div
                    animate={{
                        y: [0, -30, 0],
                        scale: [1, 1.05, 1],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute -top-20 -right-20 w-[500px] h-[500px] opacity-10 rounded-full overflow-hidden"
                >
                    <img
                        src="https://images.unsplash.com/photo-1774504798113-a03e2aa24789?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHx3b21lbiUyMGVtcG93ZXJtZW50JTIwY29tbXVuaXR5JTIwaGVscGluZyUyMHRvZ2V0aGVyfGVufDF8fHx8MTc3NjAwMTkwMnww&ixlib=rb-4.1.0&q=80&w=1080"
                        alt="Women empowerment"
                        className="w-full h-full object-cover grayscale opacity-50"
                    />
                </motion.div>

                {/* Hands Together Unity - Top Left */}
                <motion.div
                    animate={{
                        y: [0, 40, 0],
                        rotate: [0, -5, 0],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute top-10 left-10 w-80 h-80 opacity-8 rounded-3xl overflow-hidden blur-sm"
                >
                    <img
                        src="https://images.unsplash.com/photo-1671581084275-82416d389bf0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kcyUyMHRvZ2V0aGVyJTIwdGVhbXdvcmslMjBjb2xsYWJvcmF0aW9uJTIwY29tbXVuaXR5fGVufDF8fHx8MTc3NjAwMTkwMnww&ixlib=rb-4.1.0&q=80&w=1080"
                        alt="Hands together teamwork"
                        className="w-full h-full object-cover grayscale opacity-40"
                    />
                </motion.div>

                {/* Children Learning - Bottom */}
                <motion.div
                    animate={{
                        x: [0, 20, 0],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        duration: 18,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute -bottom-32 left-1/3 w-96 h-96 opacity-10 rounded-full overflow-hidden blur-md"
                >
                    <img
                        src="https://images.unsplash.com/photo-1598012341530-36f4b00dd2ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxjaGlsZHJlbiUyMGVkdWNhdGlvbiUyMGxlYXJuaW5nJTIwdm9sdW50ZWVyfGVufDF8fHx8MTc3NjAwMTkwMnww&ixlib=rb-4.1.0&q=80&w=1080"
                        alt="Children learning"
                        className="w-full h-full object-cover grayscale opacity-60"
                    />
                </motion.div>
            </div>

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-3xl mx-auto text-center"
                >
                    <div className="inline-block mb-6">
                        <div
                            className="px-4 py-2 bg-gradient-to-r from-[#ef1968] to-[#f7c498] text-white text-xs font-bold uppercase tracking-wider"
                            style={{ borderRadius: "12px 12px 12px 3px" }}
                        >
                            Let's Connect
                        </div>
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                        Let's Create Impact{" "}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ef1968] to-[#f7c498]">
                            Together
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                        Whether you're looking to partner, donate, volunteer, or
                        simply learn more about our work — we'd love to hear
                        from you.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
