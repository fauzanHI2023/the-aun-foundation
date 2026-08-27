import { motion } from "framer-motion";
import {
    Building2,
    GraduationCap,
    TrendingUp,
    HeartHandshake,
    ArrowUpRight,
} from "lucide-react";
import { useState } from "react";
import { Link } from "@inertiajs/react";

const programs = [
    {
        id: 1, // <-- WAJIB sama dengan id di tabel `programs`
        icon: Building2,
        title: "Community Facilities",
        description:
            "Building and improving essential infrastructure to strengthen communities and enhance quality of life.",
        image: "/images/IMG_9777.webp",
        stat: "100+",
        statLabel: "Facilities Built",
    },
    {
        id: 2, // <-- sesuaikan
        icon: GraduationCap,
        title: "Education & Knowledge",
        description:
            "Empowering individuals through education, training, and access to learning opportunities.",
        image: "/images/IMG_9848.webp",
        stat: "5,000+",
        statLabel: "Students Supported",
    },
    {
        id: 3, // <-- sesuaikan
        icon: TrendingUp,
        title: "Economic Empowerment",
        description:
            "Supporting sustainable livelihoods and economic independence for vulnerable communities.",
        image: "/images/Copy of 2025_03_15_16_33_IMG_3374.webp",
        stat: "2,500+",
        statLabel: "Families Empowered",
    },
    // {
    //     id: 4, // <-- TODO: ganti sesuai id program ke-4 di database
    //     icon: HeartHandshake,
    //     title: "Health & Wellbeing", // <-- TODO: ganti judul sesuai program ke-4
    //     description:
    //         "Improving access to healthcare and promoting healthier, more resilient communities.", // <-- TODO: ganti deskripsi
    //     image: "/images/IMG_9777.webp", // <-- TODO: ganti gambar program ke-4
    //     stat: "1,000+", // <-- TODO: ganti angka
    //     statLabel: "People Reached", // <-- TODO: ganti label
    // },
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
                    className="md:mb-16 mb-8"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-4xl md:text-5xl mb-4 text-primary-black font-bold">
                                Explore{" "}
                                <span className="text-secondary">Programs</span>
                            </h2>
                            <p className="text-third max-w-2xl mx-auto">
                                Creating Sustainable Impact
                            </p>
                        </div>
                        <Link
                            href="/programs"
                            className="hidden lg:flex items-center rounded-lg gap-2 px-6 border border-[#8B6835] text-[#8B6835] py-3 hover:bg-[#8B6835] hover:text-white transition-colors"
                        >
                            <span className="text-sm">View All</span>
                            <ArrowUpRight className="w-4 h-4" />
                        </Link>
                    </div>
                </motion.div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {programs.map((program, index) => {
                        const Icon = program.icon;
                        const isHovered = hoveredIndex === index;

                        return (
                            <motion.div
                                key={program.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.1,
                                }}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            >
                                <Link
                                    href={route("programs.show", program.id)}
                                    className="group relative block h-[420px] overflow-hidden rounded-2xl"
                                >
                                    {/* Image */}
                                    <img
                                        src={program.image}
                                        alt={program.title}
                                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                    />

                                    {/* Gradient overlay - always present, darkens on hover */}
                                    <div
                                        className="absolute inset-0 transition-all duration-500"
                                        style={{
                                            background:
                                                "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.45) 35%, rgba(0,0,0,0.05) 65%, transparent 100%)",
                                            opacity: isHovered ? 1 : 0.85,
                                        }}
                                    />

                                    {/* Icon badge */}
                                    <div className="absolute top-5 left-5 flex h-11 w-11 items-center justify-center rounded-md bg-white/15 backdrop-blur-sm transition-colors duration-300 group-hover:bg-white">
                                        <Icon className="h-5 w-5 text-white transition-colors duration-300 group-hover:text-[#8B6835]" />
                                    </div>

                                    {/* Bottom content */}
                                    <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                                        <h3 className="text-lg font-semibold leading-snug mb-2">
                                            {program.title}
                                        </h3>

                                        {/* Description - fades/slides in on hover */}
                                        <p
                                            className="text-sm text-white/85 leading-relaxed transition-all duration-300"
                                            style={{
                                                maxHeight: isHovered
                                                    ? "120px"
                                                    : "0px",
                                                opacity: isHovered ? 1 : 0,
                                                marginBottom: isHovered
                                                    ? "0.75rem"
                                                    : "0rem",
                                                overflow: "hidden",
                                            }}
                                        >
                                            {program.description}
                                        </p>

                                        {/* View Detail - fades/slides in on hover */}
                                        <div
                                            className="flex items-center gap-2 transition-all duration-300"
                                            style={{
                                                opacity: isHovered ? 1 : 0,
                                                transform: isHovered
                                                    ? "translateY(0)"
                                                    : "translateY(8px)",
                                            }}
                                        >
                                            <span className="text-sm font-medium tracking-wide text-[#D9B78A]">
                                                View Detail
                                            </span>
                                            <ArrowUpRight className="h-4 w-4 text-[#D9B78A]" />
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
