import React, { useState, useEffect } from "react";
import { Calendar, ArrowRight, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";

export function NewsSection() {
    const [newsSelecteds, setNewsSelecteds] = useState([]);

    useEffect(() => {
        axios.get("/api/beritas").then((res) => setNewsSelecteds(res.data));
    }, []);

    const featuredArticles = newsSelecteds.find((item) => item.home_post === 1);

    const postArticles = newsSelecteds.filter(
        (item) => item.home_post === 0 && item.featured_post === 0
    );

    return (
        <section
            id="news"
            className="relative py-8 md:py-16 bg-gradient-to-b from-white to-[#fffdf7] overflow-hidden"
        >
            {/* Background decoration */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#754c24] rounded-full mix-blend-multiply filter blur-3xl opacity-5"></div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                                Stories{" "}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">
                                    Updates
                                </span>
                            </h2>
                            <p className="text-foreground/60 max-w-2xl mx-auto">
                                Latest News Stay Updated
                            </p>
                        </div>
                        <button className="hidden lg:flex items-center rounded-lg gap-2 px-6 border border-[#8B6835] text-[#8B6835] py-3 hover:bg-[#8B6835] hover:text-white transition-colors">
                            <a
                                href="/news"
                                className=" flex gap-2 lg:flex items-center hover:bg-[#8B6835]"
                            >
                                <span className="text-sm">View All</span>
                                <ArrowUpRight className="w-4 h-4" />
                            </a>
                        </button>
                    </div>
                </motion.div>

                {/* Modern Grid Layout */}
                <div className="space-y-16">
                    {/* Featured Story */}
                    <article className="group relative">
                        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                            {/* Image */}
                            <div className="relative h-[400px] lg:h-[500px] overflow-hidden rounded-3xl">
                                <img
                                    src={`${featuredArticles?.image}`}
                                    alt={featuredArticles?.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute top-6 left-6">
                                    <span className="bg-black text-white px-4 py-1.5 text-xs font-medium uppercase tracking-wider">
                                        Featured
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-3 text-sm">
                                    <span className="text-xs font-medium uppercase tracking-wider text-[#754c24]">
                                        {featuredArticles?.category}
                                    </span>
                                    <span className="text-gray-300">•</span>
                                    <div className="flex items-center gap-2 text-gray-500 text-xs">
                                        <Calendar className="w-3 h-3" />
                                        <span>{featuredArticles?.date}</span>
                                    </div>
                                </div>

                                <h3 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight group-hover:text-[#754c24]">
                                    {featuredArticles?.title}
                                </h3>

                                <p className="text-gray-600 text-lg leading-relaxed">
                                    {featuredArticles?.excerpt}
                                </p>

                                <a
                                    href={`/news/${featuredArticles?.slug}`}
                                    className="inline-flex items-center gap-2 text-[#754c24] font-medium hover:gap-3 transition-all"
                                >
                                    Read Full Story
                                    <ArrowRight className="w-5 h-5" />
                                </a>
                            </div>
                        </div>
                    </article>

                    {/* Other Stories - Horizontal Cards */}
                    {postArticles.length > 0 && (
                        <div className="grid md:grid-cols-2 gap-8">
                            {postArticles?.slice(1, 3).map((item, index) => (
                                <article
                                    key={index}
                                    className="group relative border-t-2 border-gray-200 pt-8 hover:border-[#754c24] transition-all duration-300"
                                >
                                    {/* Image */}
                                    <div className="relative h-[240px] overflow-hidden rounded-2xl mb-6">
                                        <img
                                            src={`${item.image}`}
                                            alt={item.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3 text-sm">
                                            <span className="text-xs font-medium uppercase tracking-wider text-[#754c24]">
                                                {item.category}
                                            </span>
                                            <span className="text-gray-300">
                                                •
                                            </span>
                                            <div className="flex items-center gap-2 text-gray-500 text-xs">
                                                <Calendar className="w-3 h-3" />
                                                <span>{item.date}</span>
                                            </div>
                                        </div>

                                        <h3 className="text-2xl font-semibold text-gray-900 group-hover:text-[#754c24] transition-colors leading-tight">
                                            {item.title}
                                        </h3>

                                        <p className="text-gray-600 leading-relaxed line-clamp-2">
                                            {item.excerpt}
                                        </p>

                                        <a
                                            href={`/news/${item?.slug}`}
                                            className="inline-flex items-center gap-2 text-[#754c24] font-medium text-sm group-hover:gap-3 transition-all"
                                        >
                                            Read More
                                            <ArrowRight className="w-4 h-4" />
                                        </a>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
