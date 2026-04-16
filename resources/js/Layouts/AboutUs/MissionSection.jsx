import { motion } from "framer-motion";
import {
    ArrowRight,
    Sparkles,
    Users,
    Target,
    Lightbulb,
    Shield,
} from "lucide-react";

const missions = [
    {
        number: "01",
        title: "Education Access",
        description:
            "Improve access to and quality of education for women and children from vulnerable communities, engaging families as partners in learning.",
        icon: Lightbulb,
        color: "#ef1968",
    },
    {
        number: "02",
        title: "Economic Independence",
        description:
            "Strengthen women's economic independence through skills development, entrepreneurship, and equitable access to productive resources.",
        icon: Target,
        color: "#f7c498",
    },
    {
        number: "03",
        title: "Health & Well-being",
        description:
            "Enhance health and well-being through education, prevention, and access to basic health services with shared family responsibility.",
        icon: Shield,
        color: "#ef1968",
    },
    {
        number: "04",
        title: "Social Protection",
        description:
            "Reinforce social protection systems and advocate for rights through community-based, inclusive, policy-oriented approaches.",
        icon: Users,
        color: "#f7c498",
    },
    {
        number: "05",
        title: "Environmental Sustainability",
        description:
            "Advance environmental sustainability through inclusive education, strengthening leadership, and engaging the next generation.",
        icon: Sparkles,
        color: "#ef1968",
    },
    {
        number: "06",
        title: "Measurable Impact",
        description:
            "Implement programs that are measurable, accountable, research-based, and responsive to local contexts.",
        icon: Target,
        color: "#f7c498",
    },
];

export function MissionsSection() {
    return (
        <section className="py-12 md:py-16 lg:py-20 bg-black text-white overflow-hidden">
            <div className="container mx-auto px-6 md:px-12">
                <div className="mb-8 md:mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <p className="text-[#f7c498] text-xs md:text-sm uppercase tracking-widest mb-3 md:mb-4">
                            Vision & Mission
                        </p>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold max-w-3xl">
                            6 Main Missions to Realize Our Vision
                        </h2>
                    </motion.div>
                </div>

                {/* Grid Layout for Missions */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {missions.map((mission, index) => {
                        const Icon = mission.icon;
                        return (
                            <motion.div
                                key={mission.number}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.1,
                                }}
                                className="group relative"
                            >
                                <div
                                    className="bg-white/5 backdrop-blur-sm px-8 py-12 h-full hover:bg-white/10 transition-all duration-500"
                                    style={{
                                        borderRadius: "24px 24px 24px 6px",
                                    }}
                                >
                                    {/* Number Badge */}
                                    <div
                                        className="absolute -top-4 -right-4 w-16 h-16 flex items-center justify-center text-white font-bold text-xl"
                                        style={{
                                            backgroundColor: mission.color,
                                            borderRadius: "16px 16px 16px 4px",
                                        }}
                                    >
                                        {mission.number}
                                    </div>

                                    <div className="space-y-4">
                                        {/* <div
                                            className="w-14 h-14 flex items-center justify-center"
                                            style={{
                                                backgroundColor: mission.color,
                                                borderRadius:
                                                    "14px 14px 14px 3px",
                                            }}
                                        >
                                            <Icon
                                                size={28}
                                                className="text-white"
                                            />
                                        </div> */}

                                        <h3 className="text-xl md:text-2xl font-bold">
                                            {mission.title}
                                        </h3>

                                        <p className="text-white/70 leading-relaxed text-sm">
                                            {mission.description}
                                        </p>

                                        {/* <div className="pt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <ArrowRight
                                                size={20}
                                                style={{ color: mission.color }}
                                            />
                                        </div> */}
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
