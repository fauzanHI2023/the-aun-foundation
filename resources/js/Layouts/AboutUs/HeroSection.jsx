import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function HeroSection() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    return (
        <section
            ref={containerRef}
            className="relative lg:h-[600px] h-[450px] flex items-center justify-center overflow-hidden"
        >
            <motion.div style={{ y }} className="absolute inset-0">
                <img
                    src="/images/IMG_3728 (1).jpg"
                    alt="Hope for the future"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/70"></div>
            </motion.div>

            <motion.div
                style={{ opacity }}
                className="relative z-10 text-center text-white px-6 max-w-5xl mx-auto"
            >
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mb-8"
                >
                    <div className="text-lg md:text-xl font-arabic leading-relaxed mb-4 text-[#ffdcc0]">
                        وَتَعَاوَنُوا عَلَى الْبِرِّ وَالتَّقْوَىٰ ۖ وَلَا
                        تَعَاوَنُوا عَلَى الْإِثْمِ وَالْعُدْوَانِ
                    </div>
                    <p className="text-md md:text-lg italic text-[#ffdcc0]/90">
                        “And cooperate in righteousness and piety, but do not
                        cooperate in sin and aggression.” (QS. Al Ma’idah:2)
                    </p>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-5xl md:text-8xl font-semibold mb-6 leading-none tracking-tighter"
                >
                    Asa Untuk Negeri
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto"
                >
                    Building hope and creating meaningful impact for communities
                    in need
                </motion.p>
            </motion.div>
        </section>
    );
}
