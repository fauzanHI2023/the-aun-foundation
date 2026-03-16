import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Heart, Users } from "lucide-react";
import { Link } from "@inertiajs/react";

export function HeroSection() {
    const MotionLink = motion(Link);
    return (
        <section
            id="home"
            className="relative min-h-screen flex items-center overflow-hidden bg-white pt-20 lg:pt-20"
        >
            <div className="container mx-auto px-4 md:px-6 py-6 lg:py-12 relative z-10">
                {/* Main Hero Layout */}
                <div className="grid lg:grid-cols-12 gap-6 lg:gap-12 items-start">
                    {/* Left Content - 7 columns */}
                    <div className="lg:col-span-7 space-y-4 lg:space-y-8 lg:pt-8">
                        {/* Main Headline */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                        >
                            <h1 className="text-4xl md:text-7xl lg:text-8xl font-bold leading-[1.1] mb-3 lg:mb-6">
                                <span className="text-gray-900">
                                    Dignity For
                                </span>
                                <br />
                                <span className="bg-gradient-to-r from-[#ef1968] to-[#f7c498] bg-clip-text text-transparent">
                                    A Better Future
                                </span>
                            </h1>

                            <p className="text-base md:text-2xl text-gray-600 leading-relaxed max-w-2xl">
                                Memberdayakan perempuan dan anak Indonesia
                                melalui pendidikan, kesehatan, ekonomi, dan
                                perlindungan sosial yang berkelanjutan.
                            </p>
                        </motion.div>

                        {/* Key Stats - Horizontal */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="flex flex-wrap gap-4 lg:gap-8"
                        >
                            <div>
                                <div className="text-3xl lg:text-4xl font-bold text-[#ef1968] mb-1">
                                    5
                                </div>
                                <div className="text-xs lg:text-sm text-gray-600 uppercase tracking-wide">
                                    Program Inti
                                </div>
                            </div>
                            <div className="w-px bg-gray-200" />
                            <div>
                                <div className="text-3xl lg:text-4xl font-bold text-[#f7c498] mb-1">
                                    6
                                </div>
                                <div className="text-xs lg:text-sm text-gray-600 uppercase tracking-wide">
                                    Misi Utama
                                </div>
                            </div>
                            <div className="w-px bg-gray-200" />
                            <div>
                                <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-1">
                                    ∞
                                </div>
                                <div className="text-xs lg:text-sm text-gray-600 uppercase tracking-wide">
                                    Harapan Baru
                                </div>
                            </div>
                        </motion.div>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="flex flex-wrap gap-3 lg:gap-4"
                        >
                            <MotionLink
                                href="#contact"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-[#ef1968] text-white px-6 lg:px-10 py-3 lg:py-5 font-bold text-sm lg:text-lg flex items-center gap-2 lg:gap-3 group"
                                style={{ borderRadius: "24px 24px 24px 4px" }}
                            >
                                <span>Mulai Berkolaborasi</span>
                                <ArrowRight
                                    size={18}
                                    className="lg:size-[22px] group-hover:translate-x-1 transition-transform"
                                />
                            </MotionLink>

                            <MotionLink
                                href="#programs"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-white text-gray-900 px-6 lg:px-10 py-3 lg:py-5 border-2 border-gray-900 font-bold text-sm lg:text-lg hover:bg-gray-900 hover:text-white transition-all"
                                style={{ borderRadius: "4px 24px 24px 24px" }}
                            >
                                Pelajari Program
                            </MotionLink>
                        </motion.div>
                    </div>

                    {/* Right Content - 5 columns - Image Showcase */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="lg:col-span-5 relative"
                    >
                        {/* Main Large Image */}
                        <div className="relative">
                            {/* Primary Image - Large */}
                            <div
                                className="relative rounded-2xl lg:rounded-3xl overflow-hidden border-4 lg:border-8 border-white"
                                style={{ aspectRatio: "3/4" }}
                            >
                                <img
                                    src="/images/DSC09927.jpg"
                                    alt="Women education empowerment"
                                    className="w-full h-full object-cover"
                                />

                                {/* Gradient Overlay - Bottom */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#ef1968]/20 to-transparent" />

                                {/* Floating Info Card */}
                                <div className="absolute bottom-4 left-4 right-4 lg:bottom-6 lg:left-6 lg:right-6 bg-white/95 backdrop-blur-sm rounded-xl lg:rounded-2xl p-3 lg:p-5 border-2 border-[#ef1968]/10">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="text-xs lg:text-sm text-gray-600 mb-1">
                                                Program Unggulan
                                            </div>
                                            <div className="text-lg lg:text-xl font-bold text-[#ef1968]">
                                                RISE
                                            </div>
                                        </div>
                                        <div className="w-10 h-10 lg:w-12 lg:h-12 bg-[#ef1968] rounded-full flex items-center justify-center">
                                            <Heart
                                                className="text-white"
                                                size={20}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Secondary Small Image - Top Right */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: 0.5 }}
                                className="absolute -top-4 -right-4 lg:-top-8 lg:-right-8 w-24 h-24 lg:w-40 lg:h-40 rounded-full overflow-hidden border-4 lg:border-6 border-white"
                            >
                                <img
                                    src="/images/DSC04722.JPG"
                                    alt="Happy children"
                                    className="w-full h-full object-cover"
                                />
                            </motion.div>

                            {/* Accent Badge - THRIVE */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                                className="absolute -left-6 lg:-left-8 top-1/4 bg-[#f7c498] text-white px-3 py-2 lg:px-5 lg:py-3 rounded-full font-bold text-xs lg:text-sm rotate-[-90deg] origin-center"
                            >
                                THRIVE
                            </motion.div>

                            {/* Accent Badge - Others */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: 0.7 }}
                                className="absolute -right-8 lg:-right-10 bottom-1/3 bg-[#ef1968] text-white px-3 py-2 lg:px-5 lg:py-3 rounded-full font-bold text-[10px] lg:text-xs rotate-[90deg] origin-center"
                            >
                                CARE+ • SHIELD • GREENLIGHT
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="hidden lg:block absolute bottom-8 left-1/2 transform -translate-x-1/2"
            >
                <div className="w-6 h-10 border-2 border-[#ef1968] rounded-full flex items-start justify-center p-2">
                    <motion.div
                        animate={{ y: [0, 12, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-1.5 h-1.5 bg-[#ef1968] rounded-full"
                    />
                </div>
            </motion.div>
        </section>
    );
}
