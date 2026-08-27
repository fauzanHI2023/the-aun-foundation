import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, ChevronRight, Users } from "lucide-react";
import axios from "axios";

export function NewsCommunitySection() {
    const [newsArticles, setNewsArticles] = useState([]);

    useEffect(() => {
        axios.get("/api/beritas").then((res) => setNewsArticles(res.data));
    }, []);

    const communityArticles = newsArticles.filter(
        (item) => item.category === "community" && item.selected_post === 0
    );

    const selectedCommunity = newsArticles
        .filter(
            (item) => item.category === "community" && item.selected_post === 1
        )
        .sort((a, b) => b.id - a.id);

    const communityFeatured = selectedCommunity[0];

    return (
        <section className="lg:py-24 py-8 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-96 h-96 bg-[#ac6c29]/5 rounded-full blur-3xl" />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex items-center justify-between mb-12"
                >
                    <div className="flex items-center gap-4">
                        {/* <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#ac6c29] to-[#8b5723] flex items-center justify-center">
                            <Users className="h-8 w-8 text-white" />
                        </div> */}
                        <div>
                            <h2 className="text-3xl lg:text-5xl font-bold text-black">
                                Community{" "}
                                <span className="text-[#ac6c29]">
                                    Facilities
                                </span>
                            </h2>
                            <p className="text-gray-600 mt-1">
                                Building infrastructure for thriving communities
                            </p>
                        </div>
                    </div>
                    {/* <a
                        href="/news"
                        className="hidden lg:flex items-center text-[#ac6c29] font-medium hover:gap-3 gap-2 transition-all"
                    >
                        View All <ChevronRight className="h-5 w-5" />
                    </a> */}
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Large Feature */}
                    {communityFeatured && (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="lg:col-span-8"
                        >
                            <a
                                href={`/news/${communityFeatured.slug}`}
                                className="group relative block lg:h-[500px] h-[22rem] rounded-3xl overflow-hidden"
                            >
                                <img
                                    src={`${communityFeatured.image}`}
                                    alt={communityFeatured.title}
                                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                                <div className="absolute inset-0 flex flex-col justify-end p-8 lg:p-10">
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium border border-white/30">
                                            Featured
                                        </span>
                                        <span className="text-white/80 text-sm">
                                            {communityFeatured.date}
                                        </span>
                                    </div>
                                    <h3 className="text-3xl lg:text-4xl font-bold text-white mb-3 group-hover:text-[#ac6c29] transition-colors">
                                        {communityFeatured.title}
                                    </h3>
                                    <p className="text-white/90 text-lg mb-4 max-w-2xl">
                                        {communityFeatured.excerpt}
                                    </p>
                                    <div className="flex items-center text-white/80">
                                        <Clock className="h-4 w-4 mr-1.5" />
                                        {communityFeatured.readTime}
                                    </div>
                                </div>
                            </a>
                        </motion.div>
                    )}

                    {/* Stacked Cards */}
                    {communityArticles.length > 0 && (
                        <div className="lg:col-span-4 space-y-6">
                            {communityArticles?.map((article, index) => (
                                <motion.div
                                    key={article.title}
                                    initial={{ opacity: 0, x: 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="group relative h-56 rounded-2xl overflow-hidden cursor-pointer"
                                >
                                    <img
                                        src={`${article.image}`}
                                        alt={article.title}
                                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                                    <div className="absolute inset-0 flex flex-col justify-end p-6">
                                        <h4 className="text-lg font-bold text-white mb-2 group-hover:text-[#ac6c29] transition-colors line-clamp-2">
                                            {article.title}
                                        </h4>
                                        <div className="flex items-center justify-between text-white/80 text-sm">
                                            <span>{article.date}</span>
                                            <span>{article.readTime}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
