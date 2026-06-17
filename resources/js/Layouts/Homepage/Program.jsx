import { motion } from "framer-motion";
import {
    Building2,
    GraduationCap,
    TrendingUp,
    ArrowUpRight,
} from "lucide-react";
import { useState } from "react";

const programs = [
    {
        icon: Building2,
        title: "Community Facilities",
        description:
            "Building and improving essential infrastructure to strengthen communities and enhance quality of life.",
        image: "/images/IMG_9777.jpg",
        stat: "100+",
        statLabel: "Facilities Built",
        color: "#754c24",
    },
    {
        icon: GraduationCap,
        title: "Education & Knowledge",
        description:
            "Empowering individuals through education, training, and access to learning opportunities.",
        image: "/images/IMG_9848.jpg",
        stat: "5,000+",
        statLabel: "Students Supported",
        color: "#000000",
    },
    {
        icon: TrendingUp,
        title: "Economic Empowerment",
        description:
            "Supporting sustainable livelihoods and economic independence for vulnerable communities.",
        image: "/images/Copy of 2025_03_15_16_33_IMG_3374.jpg",
        stat: "2,500+",
        statLabel: "Families Empowered",
        color: "#754c24",
    },
];

export function Programs() {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    return (
        <section id="values" className="bg-white md:py-16 py-8">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="md:mb-16 mb:8"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-4xl md:text-5xl mb-4 text-foreground font-semibold">
                                Explore{" "}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B6835] to-[#D4A574]">
                                    Programs
                                </span>
                            </h2>
                            <p className="text-foreground/60 max-w-2xl mx-auto">
                                Creating Sustainable Impact
                            </p>
                        </div>
                        <button className="hidden lg:flex items-center rounded-lg gap-2 px-6 border border-[#8B6835] text-[#8B6835] py-3 hover:bg-[#8B6835] hover:text-white transition-colors">
                            <a
                                href="/programs"
                                className=" flex gap-2 lg:flex items-center hover:bg-[#8B6835]"
                            >
                                <span className="text-sm">View All</span>
                                <ArrowUpRight className="w-4 h-4" />
                            </a>
                        </button>
                    </div>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-6">
                    {programs.map((program, index) => {
                        const Icon = program.icon;
                        const isHovered = hoveredIndex === index;

                        return (
                            <motion.div
                                key={program.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.1,
                                }}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                className="group cursor-pointer relative overflow-hidden bg-white rounded-xl"
                                style={{ borderRadius: "4px" }}
                            >
                                <div className="relative h-80 overflow-hidden rounded-xl">
                                    <img
                                        src={program.image}
                                        alt={program.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div
                                        className="absolute inset-0 transition-opacity duration-500"
                                        style={{
                                            background: `linear-gradient(to top, ${program.color}, transparent)`,
                                            opacity: isHovered ? 0.9 : 0.6,
                                        }}
                                    ></div>

                                    <div className="absolute top-6 left-6">
                                        <div
                                            className="w-12 h-12 flex items-center justify-center transition-colors duration-300"
                                            style={{
                                                backgroundColor: isHovered
                                                    ? "white"
                                                    : "rgba(255,255,255,0.2)",
                                            }}
                                        >
                                            <Icon
                                                className="w-6 h-6 transition-colors duration-300"
                                                style={{
                                                    color: isHovered
                                                        ? program.color
                                                        : "white",
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                        <h3 className="text-2xl font-bold mb-2 tracking-tight">
                                            {program.title}
                                        </h3>
                                        <p
                                            className="text-sm text-white/90 mb-4 transition-all duration-300"
                                            style={{
                                                maxHeight: isHovered
                                                    ? "100px"
                                                    : "0",
                                                opacity: isHovered ? 1 : 0,
                                                overflow: "hidden",
                                            }}
                                        >
                                            {program.description}
                                        </p>
                                    </div>
                                </div>

                                <div className="p-6 bg-white">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="text-3xl font-bold text-black mb-1">
                                                {program.stat}
                                            </div>
                                            <div className="text-xs text-black/60">
                                                {program.statLabel}
                                            </div>
                                        </div>
                                        <div
                                            className="w-10 h-10 flex items-center justify-center border transition-all duration-300"
                                            style={{
                                                borderColor: isHovered
                                                    ? program.color
                                                    : "#e5e5e5",
                                                backgroundColor: isHovered
                                                    ? program.color
                                                    : "transparent",
                                            }}
                                        >
                                            <ArrowUpRight
                                                className="w-5 h-5 transition-all duration-300"
                                                style={{
                                                    color: isHovered
                                                        ? "white"
                                                        : "#000",
                                                    transform: isHovered
                                                        ? "translate(2px, -2px)"
                                                        : "translate(0, 0)",
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            <div className="bg-[#f5f5f5] md:mt-32 mt-12">
                <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-20">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-12">
                        {[
                            { number: "10K+", label: "Lives Impacted" },
                            { number: "100+", label: "Facilities" },
                            { number: "5K+", label: "Students" },
                            { number: "2.5K+", label: "Families" },
                            { number: "50+", label: "Partners" },
                        ].map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="text-center"
                            >
                                <div className="text-3xl font-bold text-black mb-2">
                                    {stat.number}
                                </div>
                                <div className="text-xs text-black/60 tracking-wider">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
