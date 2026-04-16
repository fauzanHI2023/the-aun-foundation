import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

export function NewsHero() {
    const [newsFeatureds, setNewsFeatureds] = useState([]);

    useEffect(() => {
        axios.get("/api/beritas").then((res) => setNewsFeatureds(res.data));
    }, []);

    const featuredArticles = newsFeatureds.find(
        (item) => item.featured_post === 1
    );
    return (
        <section className="min-h-screen md:min-h-[90vh] flex items-center relative overflow-hidden bg-gradient-to-b from-gray-50 to-white">
            <div className="container mx-auto px-6 md:px-12 py-12">
                <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
                    {/* Left - Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-5 md:space-y-8"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-8 md:w-12 h-1 bg-[#ef1968]" />
                            <span className="text-xs md:text-sm uppercase tracking-widest text-gray-500">
                                Latest News
                            </span>
                        </div>

                        <div>
                            <div
                                className="inline-block bg-[#ef1968] text-white px-3 md:px-4 py-1.5 md:py-2 mb-3 md:mb-4"
                                style={{ borderRadius: "12px 12px 12px 3px" }}
                            >
                                <p className="text-[10px] md:text-xs font-bold uppercase tracking-wider">
                                    Featured Story
                                </p>
                            </div>

                            <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold leading-tight mb-4 md:mb-6">
                                {featuredArticles?.title}
                            </h1>

                            <p className="text-base md:text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-xl">
                                {featuredArticles?.excerpt}
                            </p>
                        </div>

                        <div className="flex items-center gap-3 md:gap-4 text-xs md:text-sm text-gray-500">
                            <div className="flex items-center gap-2">
                                <Calendar
                                    size={14}
                                    className="md:w-4 md:h-4 text-[#ef1968]"
                                />
                                {/* <span>{featuredArticles.readTime}</span> */}
                            </div>
                            <div className="w-1 h-1 rounded-full bg-gray-300" />
                            <span>{featuredArticles?.date}</span>
                        </div>

                        <button
                            className="group flex items-center gap-3 bg-[#ef1968] text-white px-6 md:px-8 py-3 md:py-4 hover:bg-[#d01558] transition-colors"
                            style={{ borderRadius: "24px 24px 24px 4px" }}
                        >
                            <a
                                href={`/news/${featuredArticles?.slug}`}
                                className="flex items-center gap-3"
                            >
                                <span className="font-bold text-sm md:text-base">
                                    Read Full Story
                                </span>
                                <ArrowRight
                                    size={18}
                                    className="md:w-5 md:h-5 group-hover:translate-x-1 transition-transform"
                                />
                            </a>
                        </button>
                    </motion.div>

                    {/* Right - Featured Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        <div
                            className="relative h-[350px] md:h-[500px] lg:h-[600px] overflow-hidden"
                            style={{ borderRadius: "32px 32px 32px 8px" }}
                        >
                            <img
                                src={`${featuredArticles?.image}`}
                                alt="Women empowerment"
                                className="w-full h-full object-cover"
                            />

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                        </div>

                        {/* Floating Stats Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="absolute -bottom-6 md:-bottom-8 -left-4 md:-left-8 bg-white p-4 md:p-6"
                            style={{
                                borderRadius: "20px 20px 20px 5px",
                                boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
                            }}
                        >
                            <div className="flex items-center gap-3 md:gap-4">
                                <div
                                    className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-[#ef1968] to-[#f7c498] flex items-center justify-center"
                                    style={{
                                        borderRadius: "12px 12px 12px 3px",
                                    }}
                                >
                                    <span className="text-lg md:text-2xl font-bold text-white">
                                        500+
                                    </span>
                                </div>
                                <div>
                                    <p className="text-lg md:text-2xl font-bold text-gray-900">
                                        Women
                                    </p>
                                    <p className="text-xs md:text-sm text-gray-500">
                                        Empowered
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
