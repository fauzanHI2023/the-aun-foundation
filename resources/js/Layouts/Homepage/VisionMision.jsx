import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export function VisionMission() {
    const missions = [
        {
            number: "01",
            title: "Education Access",
            tag: "Access to Education",
            color: "#ef1968",
        },
        {
            number: "02",
            title: "Economic Empowerment",
            tag: "Economic Self-Reliance",
            color: "#f7c498",
        },
        {
            number: "03",
            title: "Health Enhancement",
            tag: "Holistic Health",
            color: "#ef1968",
        },
        {
            number: "04",
            title: "Social Protection",
            tag: "Social Protection",
            color: "#f7c498",
        },
        {
            number: "05",
            title: "Environmental Advancement",
            tag: "Environmental Sustainability",
            color: "#ef1968",
        },
        {
            number: "06",
            title: "Humanitarian Implementation",
            tag: "Humanitarian Programs",
            color: "#f7c498",
        },
    ];

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
        swipe: true,
        swipeToSlide: true,
        touchMove: true,
        pauseOnHover: true,
    };

    return (
        <section
            id="vision"
            className="relative py-16 md:py-32 bg-gradient-to-b from-gray-50 to-white overflow-hidden"
        >
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                {/* Vision Section - Split Layout */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-16 md:mb-32"
                >
                    <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
                        {/* Left - Big Statement */}
                        <div className="space-y-8">
                            <div>
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    className="inline-block px-5 py-2 bg-[#ef1968]/10 text-[#ef1968] font-bold text-sm mb-6"
                                    style={{
                                        borderRadius: "20px 20px 20px 4px",
                                    }}
                                >
                                    OUR VISION
                                </motion.div>

                                <h2 className="text-5xl md:text-7xl font-bold leading-[1.1] mb-6">
                                    <span className="text-gray-900">
                                        Dignity
                                    </span>
                                    <br />
                                    <span className="text-gray-900">For A</span>
                                    <br />
                                    <span className="bg-gradient-to-r from-[#ef1968] to-[#f7c498] bg-clip-text text-transparent">
                                        Better Future
                                    </span>
                                </h2>
                            </div>

                            <p className="text-xl text-gray-600 leading-relaxed">
                                Dignity is the foundation of sustainable
                                development. By upholding dignity through access
                                to education, healthcare, safety, and a healthy
                                environment, we are building a future that is
                                more just and humane.
                            </p>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-[#ef1968] text-white px-8 py-4 font-bold flex items-center gap-3 group"
                                style={{ borderRadius: "24px 24px 24px 4px" }}
                            >
                                <span>Learn More</span>
                                <ArrowRight
                                    size={20}
                                    className="group-hover:translate-x-1 transition-transform"
                                />
                            </motion.button>
                        </div>

                        {/* Right - Visual Accent */}
                        <div className="relative">
                            {/* Large Number Background */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1 }}
                                className="relative"
                            >
                                <div className="text-[280px] font-bold text-[#ef1968]/5 leading-none select-none">
                                    01
                                </div>

                                {/* Floating Stats */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3 }}
                                    className="absolute top-1/4 -left-12 bg-white p-6 border-2 border-[#ef1968]"
                                    style={{
                                        borderRadius: "24px 24px 24px 4px",
                                    }}
                                >
                                    <div className="text-4xl font-bold text-[#ef1968] mb-1">
                                        100%
                                    </div>
                                    <div className="text-sm text-gray-600 font-medium">
                                        Commitment
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.5 }}
                                    className="absolute bottom-1/4 right-0 bg-[#f7c498] text-white p-6"
                                    style={{
                                        borderRadius: "4px 24px 24px 24px",
                                    }}
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <Sparkles size={24} />
                                        <div className="text-3xl font-bold">
                                            ∞
                                        </div>
                                    </div>
                                    <div className="text-sm font-medium">
                                        New Hope
                                    </div>
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

                {/* Mission Section - Compact Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Header */}
                    <div className="text-center mb-12 max-w-3xl mx-auto">
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-bold text-gray-900 mb-3"
                        >
                            6 Core Missions
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-base text-gray-600"
                        >
                            The Foundation of Sustainable Dignity
                        </motion.p>
                    </div>

                    {/* Compact 3x2 Grid */}
                    {/* Desktop Grid - Hidden on Mobile */}
                    <div className="hidden md:grid md:grid-cols-3 gap-4 max-w-5xl mx-auto">
                        {missions.map((mission, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.08,
                                }}
                                whileHover={{ y: -5 }}
                                className="group relative bg-white border border-gray-200 p-6 overflow-hidden cursor-pointer"
                                style={{ borderRadius: "24px 24px 24px 4px" }}
                            >
                                {/* Hover Background */}
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    style={{
                                        backgroundColor: `${mission.color}05`,
                                    }}
                                />

                                {/* Content */}
                                <div className="relative z-10">
                                    <div
                                        className="text-5xl font-bold mb-3 opacity-30 group-hover:opacity-100 transition-opacity"
                                        style={{ color: mission.color }}
                                    >
                                        {mission.number}
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-[#ef1968] transition-colors">
                                        {mission.title}
                                    </h3>
                                    <p className="text-xs text-gray-500 font-medium">
                                        {mission.tag}
                                    </p>
                                </div>

                                {/* Corner Accent */}
                                <div
                                    className="absolute bottom-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-10 transition-opacity"
                                    style={{
                                        backgroundColor: mission.color,
                                        borderRadius: "100% 0 0 0",
                                    }}
                                />
                            </motion.div>
                        ))}
                    </div>

                    {/* Mobile Slider - Hidden on Desktop */}
                    <div className="md:hidden max-w-5xl mx-auto">
                        <Slider {...sliderSettings}>
                            {missions.map((mission, index) => (
                                <div key={index} className="px-2">
                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{
                                            duration: 0.5,
                                            delay: index * 0.08,
                                        }}
                                        className="group relative bg-white border border-gray-200 p-6 overflow-hidden cursor-pointer"
                                        style={{
                                            borderRadius: "24px 24px 24px 4px",
                                        }}
                                    >
                                        {/* Hover Background */}
                                        <div
                                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                            style={{
                                                backgroundColor: `${mission.color}05`,
                                            }}
                                        />

                                        {/* Content */}
                                        <div className="relative z-10">
                                            <div
                                                className="text-5xl font-bold mb-3 opacity-30 group-hover:opacity-100 transition-opacity"
                                                style={{ color: mission.color }}
                                            >
                                                {mission.number}
                                            </div>
                                            <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-[#ef1968] transition-colors">
                                                {mission.title}
                                            </h3>
                                            <p className="text-xs text-gray-500 font-medium">
                                                {mission.tag}
                                            </p>
                                        </div>

                                        {/* Corner Accent */}
                                        <div
                                            className="absolute bottom-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-10 transition-opacity"
                                            style={{
                                                backgroundColor: mission.color,
                                                borderRadius: "100% 0 0 0",
                                            }}
                                        />
                                    </motion.div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
