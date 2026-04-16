import { motion } from "framer-motion";
import {
    GraduationCap,
    TrendingUp,
    Heart,
    Shield,
    Leaf,
    ArrowRight,
} from "lucide-react";

const programs = [
    {
        id: "rise",
        name: "RISE",
        title: "Education Access",
        color: "#ef1968",
        icon: GraduationCap,
        count: "6",
    },
    {
        id: "thrive",
        name: "THRIVE",
        title: "Economic Empowerment",
        color: "#f7c498",
        icon: TrendingUp,
        count: "6",
    },
    {
        id: "care",
        name: "CARE+",
        title: "Health & Wellbeing",
        color: "#ef1968",
        icon: Heart,
        count: "5",
    },
    {
        id: "shield",
        name: "SHIELD",
        title: "Protection & Rights",
        color: "#f7c498",
        icon: Shield,
        count: "6",
    },
    {
        id: "greenlight",
        name: "GREENLIGHT",
        title: "Environmental Action",
        color: "#ef1968",
        icon: Leaf,
        count: "6",
    },
];

export function ProgramsBanner() {
    return (
        <section className="relative py-8 md:py-12 lg:py-20 overflow-hidden bg-white">
            <div className="container mx-auto px-6 md:px-12">
                <div className="max-w-7xl mx-auto">
                    {/* Hero Banner - Asymmetric & Fresh */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 mb-10 md:mb-16">
                        {/* Left Content */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="md:col-span-5 flex flex-col justify-center"
                        >
                            <div className="inline-block mb-6">
                                <div
                                    className="pr-5 py-2 text-[#ef1968] text-xs font-bold uppercase tracking-widest"
                                    style={{
                                        borderRadius: "16px 16px 16px 4px",
                                    }}
                                >
                                    Our Programs
                                </div>
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 md:mb-6 leading-tight">
                                <span className="text-gray-900">
                                    5 Ways We Create{" "}
                                </span>
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ef1968] to-[#f7c498]">
                                    Impact
                                </span>
                            </h1>

                            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-md">
                                Integrated initiatives for lasting change in
                                women, children, and communities
                            </p>

                            <div className="flex items-center gap-6">
                                <div>
                                    <p className="text-4xl font-bold text-[#ef1968]">
                                        29
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Sub-Programs
                                    </p>
                                </div>
                                <div className="w-px h-12 bg-gray-200" />
                                <div>
                                    <p className="text-4xl font-bold text-[#f7c498]">
                                        5
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Core Areas
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right Images - Bold Mosaic Layout */}
                        <div className="md:col-span-7 relative h-[400px] md:h-[550px]">
                            {/* Large Main Image - Top Right */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="absolute top-0 right-0 w-[70%] h-[60%] overflow-hidden"
                                style={{ borderRadius: "56px 56px 56px 12px" }}
                            >
                                <img
                                    src="/images/DSC00150.jpg"
                                    alt="Program Impact"
                                    className="w-full h-full object-cover"
                                />
                                {/* Strong color accent on corner */}
                                <div
                                    className="absolute bottom-0 right-0 w-32 h-32 bg-[#ef1968]"
                                    style={{ borderRadius: "0 0 56px 0" }}
                                />
                            </motion.div>

                            {/* Medium Image - Bottom Left */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="absolute bottom-0 left-0 w-[60%] h-[52%] overflow-hidden"
                                style={{ borderRadius: "48px 48px 48px 10px" }}
                            >
                                <img
                                    src="/images/DSC02810-2.jpg"
                                    alt="Community Empowerment"
                                    className="w-full h-full object-cover"
                                />
                                {/* Strong color accent on corner */}
                                <div
                                    className="absolute top-0 left-0 w-24 h-24 bg-[#f7c498]"
                                    style={{ borderRadius: "48px 0 0 0" }}
                                />
                            </motion.div>

                            {/* Small Accent Image - Middle Right */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                                className="absolute top-[45%] right-[8%] w-[35%] h-[30%] overflow-hidden"
                                style={{ borderRadius: "40px 40px 40px 8px" }}
                            >
                                <img
                                    src="/images/DSC09927.jpg"
                                    alt="Healthcare Support"
                                    className="w-full h-full object-cover"
                                />
                            </motion.div>

                            {/* Bold Floating Shapes */}
                            <motion.div
                                initial={{ opacity: 0, rotate: -10 }}
                                animate={{ opacity: 1, rotate: 0 }}
                                transition={{ duration: 1, delay: 0.8 }}
                                className="absolute top-[15%] left-[5%] w-20 h-20 bg-gradient-to-br from-[#ef1968] to-[#f7c498]"
                                style={{ borderRadius: "24px 24px 24px 6px" }}
                            />

                            <motion.div
                                initial={{ opacity: 0, rotate: 10 }}
                                animate={{ opacity: 1, rotate: 0 }}
                                transition={{ duration: 1, delay: 1 }}
                                className="absolute bottom-[15%] right-[25%] w-16 h-16 bg-[#f7c498]"
                                style={{ borderRadius: "20px 20px 20px 5px" }}
                            />
                        </div>
                    </div>

                    {/* Compact Programs List */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="grid grid-cols-1 md:grid-cols-5 gap-3 md:gap-4"
                    >
                        {programs.map((program, index) => {
                            const Icon = program.icon;
                            return (
                                <motion.div
                                    key={program.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.4,
                                        delay: 0.9 + index * 0.1,
                                    }}
                                    className="group cursor-pointer"
                                >
                                    <div
                                        className="relative p-5 md:p-6 bg-white border hover:border-current transition-all duration-300"
                                        style={{
                                            borderRadius: "24px 24px 24px 6px",
                                            borderColor:
                                                index % 2 === 0
                                                    ? "#ef1968"
                                                    : "#f7c498",
                                        }}
                                    >
                                        <div className="flex md:flex-col items-center md:items-start gap-4 md:gap-3">
                                            <div
                                                className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300"
                                                style={{
                                                    backgroundColor:
                                                        program.color,
                                                    borderRadius:
                                                        "14px 14px 14px 3px",
                                                }}
                                            >
                                                <Icon size={24} />
                                            </div>

                                            <div className="flex-1 md:flex-none">
                                                <h3
                                                    className="text-xl md:text-2xl font-bold mb-1"
                                                    style={{
                                                        color: program.color,
                                                    }}
                                                >
                                                    {program.name}
                                                </h3>
                                                <p className="text-sm text-gray-600 mb-2">
                                                    {program.title}
                                                </p>
                                                <p className="text-xs text-gray-500 font-medium">
                                                    {program.count} Programs
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>

                    {/* Bottom CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.4 }}
                        className="mt-8 md:mt-12 text-center"
                    >
                        <button
                            onClick={() => {
                                const section =
                                    document.getElementById("programs-detail");
                                section?.scrollIntoView({
                                    behavior: "smooth",
                                    block: "start",
                                });
                            }}
                            className="inline-flex items-center gap-2 md:gap-3 px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-[#ef1968] to-[#f7c498] text-white text-sm md:text-base font-bold hover:shadow-lg hover:scale-105 transition-all duration-300"
                            style={{ borderRadius: "28px 28px 28px 6px" }}
                        >
                            Explore All Programs
                            <ArrowRight size={18} className="md:w-5 md:h-5" />
                        </button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
