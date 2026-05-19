import React from "react";
import { motion } from "framer-motion";
import { Clock, ChevronRight, Users, GraduationCap } from "lucide-react";

export function NewsEducationSection() {
    const educationNews = [
        {
            title: "Youth Leadership Program Graduates 100 Leaders",
            excerpt:
                "First cohort completes comprehensive leadership development training.",
            image: "https://images.unsplash.com/photo-1478476868527-002ae3f3e159?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
            date: "April 20, 2026",
            readTime: "6 min read",
        },
        {
            title: "Digital Literacy Program Reaches 500 Students",
            excerpt:
                "New computer labs and internet access transform learning opportunities.",
            image: "https://images.unsplash.com/photo-1630510590497-e69fac21bfbd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
            date: "March 28, 2026",
            readTime: "5 min read",
        },
        {
            title: "Scholarship Program Supports 200 Children",
            excerpt:
                "Educational support enables students to continue their studies.",
            image: "https://images.unsplash.com/photo-1556484687-30636164638b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
            date: "March 10, 2026",
            readTime: "4 min read",
        },
    ];
    return (
        <section className="py-24 bg-gradient-to-br from-black via-[#1a1410] to-black text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#ac6c29_1px,_transparent_1px)] bg-[length:50px_50px]" />
            </div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex items-center justify-between mb-12"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#ac6c29] to-[#8b5723] flex items-center justify-center">
                            <GraduationCap className="h-8 w-8 text-white" />
                        </div>
                        <div>
                            <h2 className="text-4xl lg:text-5xl font-bold">
                                Education &{" "}
                                <span className="text-[#ac6c29]">
                                    Knowledge
                                </span>
                            </h2>
                            <p className="text-gray-400 mt-1">
                                Empowering communities through learning
                            </p>
                        </div>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {educationNews.map((news, index) => (
                        <motion.article
                            key={news.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`group relative rounded-3xl overflow-hidden cursor-pointer ${
                                index === 0
                                    ? "md:col-span-2 lg:col-span-2 lg:row-span-2"
                                    : ""
                            }`}
                        >
                            <div
                                className={`relative ${
                                    index === 0 ? "h-[600px]" : "h-80"
                                } overflow-hidden`}
                            >
                                <img
                                    src={news.image}
                                    alt={news.title}
                                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                                <div className="absolute inset-0 flex flex-col justify-end p-8">
                                    <span className="text-[#ac6c29] text-sm font-medium mb-3">
                                        {news.date}
                                    </span>
                                    <h3
                                        className={`font-bold text-white mb-3 group-hover:text-[#ac6c29] transition-colors ${
                                            index === 0
                                                ? "text-3xl lg:text-4xl"
                                                : "text-xl"
                                        }`}
                                    >
                                        {news.title}
                                    </h3>
                                    <p
                                        className={`text-white/90 mb-4 ${
                                            index === 0
                                                ? "text-lg line-clamp-2"
                                                : "text-sm line-clamp-2"
                                        }`}
                                    >
                                        {news.excerpt}
                                    </p>
                                    <div className="flex items-center text-white/80 text-sm">
                                        <Clock className="h-4 w-4 mr-1.5" />
                                        {news.readTime}
                                    </div>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}
