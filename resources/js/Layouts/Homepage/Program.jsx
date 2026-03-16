import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function Programs() {
    const programs = [
        {
            id: "rise",
            number: "01",
            acronym: "RISE",
            fullName: "Education for All",
            description: "Akses pendidikan inklusif untuk perempuan dan anak",
            color: "#ef1968",
        },
        {
            id: "thrive",
            number: "02",
            acronym: "THRIVE",
            fullName: "Economic Empowerment",
            description:
                "Pemberdayaan ekonomi melalui keterampilan dan akses modal",
            color: "#f7c498",
        },
    ];

    return (
        <section
            id="programs"
            className="relative py-12 md:py-24 bg-white overflow-hidden"
        >
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-10 md:mb-16 max-w-4xl"
                >
                    <div
                        className="inline-block px-5 py-2 bg-[#ef1968]/10 text-[#ef1968] font-bold text-sm mb-6"
                        style={{ borderRadius: "20px 20px 20px 4px" }}
                    >
                        PROGRAM KAMI
                    </div>
                    <h2 className="text-3xl md:text-6xl font-bold text-gray-900 mb-4 md:mb-6">
                        Lima Pilar Transformasi
                    </h2>
                    <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-4">
                        Kami menghadirkan{" "}
                        <span className="font-bold text-[#ef1968]">
                            5 program pemberdayaan
                        </span>{" "}
                        yang dirancang khusus untuk perempuan dan anak
                        Indonesia. Setiap pilar adalah komitmen nyata untuk
                        menciptakan perubahan berkelanjutan.
                    </p>
                    <p className="text-base text-gray-600">
                        Mari kenali lebih dekat dua program utama kami:
                    </p>
                </motion.div>

                {/* Programs List - Minimalist & Modern */}
                <div className="max-w-6xl mx-auto space-y-4">
                    {programs.map((program, index) => (
                        <motion.div
                            key={program.id}
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.08 }}
                            className="group"
                        >
                            <div className="relative">
                                {/* Default State - Minimal Row */}
                                <div
                                    className="relative bg-white border border-gray-200 overflow-hidden transition-all duration-300 group-hover:border-transparent group-hover:shadow-lg"
                                    style={{
                                        borderRadius: "24px 24px 24px 4px",
                                    }}
                                >
                                    {/* Hover Background */}
                                    <motion.div
                                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                        style={{
                                            background: `linear-gradient(135deg, ${program.color}08 0%, ${program.color}03 100%)`,
                                        }}
                                    />

                                    {/* Content Grid */}
                                    <div className="relative grid grid-cols-12 gap-4 items-center p-6 md:p-8">
                                        {/* Number - Col 1 */}
                                        <div className="col-span-2 md:col-span-1">
                                            <div
                                                className="text-3xl md:text-4xl font-bold opacity-30 group-hover:opacity-100 transition-opacity"
                                                style={{ color: program.color }}
                                            >
                                                {program.number}
                                            </div>
                                        </div>

                                        {/* Acronym - Col 2-4 */}
                                        <div className="col-span-4 md:col-span-3">
                                            <h3
                                                className="text-2xl md:text-3xl font-bold transition-colors"
                                                style={{ color: program.color }}
                                            >
                                                {program.acronym}
                                            </h3>
                                        </div>

                                        {/* Info - Col 5-10 */}
                                        <div className="col-span-6 md:col-span-7">
                                            <p className="text-sm md:text-base font-bold text-gray-900 mb-1">
                                                {program.fullName}
                                            </p>
                                            {index < 2 && (
                                                <p className="text-xs md:text-sm text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 max-h-0 group-hover:max-h-20 overflow-hidden">
                                                    {program.description}
                                                </p>
                                            )}
                                        </div>

                                        {/* CTA - Col 11-12 */}
                                        <div className="col-span-12 md:col-span-1 flex justify-end">
                                            <motion.div
                                                whileHover={{ x: 5 }}
                                                className="w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 relative"
                                                style={{
                                                    borderColor: program.color,
                                                    backgroundColor:
                                                        "transparent",
                                                }}
                                            >
                                                {/* Default Arrow */}
                                                <ArrowRight
                                                    size={20}
                                                    className="group-hover:opacity-0 transition-opacity duration-300"
                                                    style={{
                                                        color: program.color,
                                                    }}
                                                />
                                                {/* Hover Arrow - White for RISE, Same color for THRIVE */}
                                                <div
                                                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center"
                                                    style={{
                                                        backgroundColor:
                                                            program.color,
                                                    }}
                                                >
                                                    <ArrowRight
                                                        size={20}
                                                        className="text-white"
                                                    />
                                                </div>
                                            </motion.div>
                                        </div>
                                    </div>

                                    {/* Bottom Accent Line */}
                                    <motion.div
                                        className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500"
                                        style={{
                                            backgroundColor: program.color,
                                        }}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mt-16"
                >
                    {/* Teaser for 3 more programs */}
                    <div className="max-w-3xl mx-auto text-center mb-8">
                        <p className="text-gray-700 text-lg mb-2">
                            Masih ada{" "}
                            <span className="font-bold text-[#ef1968]">
                                3 program lainnya
                            </span>{" "}
                            yang menanti untuk Anda eksplorasi
                        </p>
                        <p className="text-gray-600">
                            CARE+, SHIELD, dan GREENLIGHT — temukan bagaimana
                            setiap pilar saling menguatkan untuk menciptakan
                            dampak transformatif
                        </p>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-[#ef1968] text-white px-10 py-5 font-bold text-lg flex items-center gap-3 mx-auto group"
                        style={{ borderRadius: "32px 32px 32px 6px" }}
                    >
                        <span>Jelajahi Semua 5 Program</span>
                        <ArrowRight
                            size={24}
                            className="group-hover:translate-x-1 transition-transform"
                        />
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
}
