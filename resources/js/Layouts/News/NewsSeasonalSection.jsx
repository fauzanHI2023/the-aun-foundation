import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, ArrowRight, Sparkles } from "lucide-react";
import axios from "axios";

export function NewsSeasonalSection() {
    const seasonalNews = [
        {
            title: "Ramadan Food Distribution Reaches 5,000 Families",
            excerpt:
                "Comprehensive Ramadan program brings iftar and food packages to communities.",
            image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
            date: "April 28, 2026",
            readTime: "4 min read",
        },
        {
            title: "Qurban Program Delivers to Remote Areas",
            excerpt:
                "Sacrificial meat distribution serves communities rarely reached by aid.",
            image: "https://images.unsplash.com/photo-1630068846062-3ffe78aa5049?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
            date: "March 25, 2026",
            readTime: "4 min read",
        },
        {
            title: "Eid Celebration Brings Joy to 1,000 Children",
            excerpt:
                "Special gifts and activities create memorable moments for young ones.",
            image: "https://images.unsplash.com/photo-1478476868527-002ae3f3e159?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
            date: "March 20, 2026",
            readTime: "3 min read",
        },
        {
            title: "Eid Celebration Brings Joy to 1,000 Children",
            excerpt:
                "Special gifts and activities create memorable moments for young ones.",
            image: "https://images.unsplash.com/photo-1478476868527-002ae3f3e159?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
            date: "March 20, 2026",
            readTime: "3 min read",
        },
    ];

    const [newsArticles, setNewsArticles] = useState([]);

    useEffect(() => {
        axios.get("/api/beritas").then((res) => setNewsArticles(res.data));
    }, []);

    const seasonalArticles = newsArticles.filter(
        (item) =>
            (item.category === "ramadhan" || item.category === "qurban") &&
            item.selected_post === 0
    );

    return (
        <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#ac6c29]/5 rounded-full blur-3xl" />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex items-center justify-between mb-12"
                >
                    <div className="flex items-center gap-4">
                        {/* <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-[#ac6c29] to-[#8b5723] flex items-center justify-center">
                            <Sparkles className="h-8 w-8 text-white" />
                        </div> */}
                        <div>
                            <h2 className="text-4xl lg:text-5xl font-bold text-black">
                                Seasonal{" "}
                                <span className="text-[#ac6c29]">Programs</span>
                            </h2>
                            <p className="text-gray-600 mt-1">
                                Special initiatives throughout the year
                            </p>
                        </div>
                    </div>
                </motion.div>

                {seasonalArticles.length > 0 && (
                    <div className="flex gap-6 overflow-x-auto pb-6 no-scrollbar snap-x snap-mandatory">
                        {seasonalArticles?.map((article, index) => (
                            <motion.article
                                key={article.title}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group flex-shrink-0 w-96 snap-center"
                            >
                                <div className="relative h-80 rounded-3xl overflow-hidden mb-6">
                                    <img
                                        src={`${article.image}`}
                                        alt={article.title}
                                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                                    <div className="absolute top-6 left-6">
                                        <span className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium border border-white/30">
                                            Seasonal
                                        </span>
                                    </div>
                                    <div className="absolute bottom-6 left-6 right-6">
                                        <span className="text-white/80 text-sm mb-2 block">
                                            {article.date}
                                        </span>
                                        <h3 className="text-2xl font-bold text-white group-hover:text-[#ac6c29] transition-colors">
                                            {article.title}
                                        </h3>
                                    </div>
                                </div>
                                <p className="text-gray-600 mb-4 leading-relaxed">
                                    {article.excerpt}
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="flex items-center text-gray-500 text-sm">
                                        <Clock className="h-4 w-4 mr-1.5" />
                                        {article.readTime}
                                    </span>
                                    <a
                                        href={`/news/${article.slug}`}
                                        className="inline-flex items-center text-[#ac6c29] font-medium hover:gap-2 gap-1 transition-all"
                                    >
                                        Read More{" "}
                                        <ArrowRight className="h-4 w-4" />
                                    </a>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
