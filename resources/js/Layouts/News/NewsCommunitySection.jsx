import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, ChevronRight, Users } from "lucide-react";
import axios from "axios";

export function NewsCommunitySection() {
    const communityFacilitiesNews = [
        {
            title: "New Community Center Opens in Remote Village",
            excerpt:
                "Modern facility now serves over 2,000 residents with education, healthcare, and community spaces.",
            image: "https://images.unsplash.com/photo-1636987050384-9b079c700f63?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
            date: "May 15, 2026",
            readTime: "5 min read",
        },
        {
            title: "Clean Water Access Expanded to 10 Villages",
            excerpt:
                "Water for Life program brings sustainable water solutions to underserved communities.",
            image: "https://images.unsplash.com/photo-1556484687-30636164638b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
            date: "April 10, 2026",
            readTime: "5 min read",
        },
        {
            title: "Mosque Renovation Transforms Community Hub",
            excerpt:
                "Historic renovation creates modern worship and learning center.",
            image: "https://images.unsplash.com/photo-1754278583641-eb643828799e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
            date: "March 5, 2026",
            readTime: "4 min read",
        },
    ];

    const [newsArticles, setNewsArticles] = useState([]);

    useEffect(() => {
        axios.get("/api/beritas").then((res) => setNewsArticles(res.data));
    }, []);

    const communityArticles = newsArticles.filter(
        (item) => item.category === "community" && item.selected_post === 0
    );

    return (
        <section className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
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
                            <h2 className="text-4xl lg:text-5xl font-bold text-black">
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
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-8"
                    >
                        <a
                            href="/news/1"
                            className="group relative block h-[500px] rounded-3xl overflow-hidden"
                        >
                            <img
                                src={communityFacilitiesNews[0].image}
                                alt={communityFacilitiesNews[0].title}
                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                            <div className="absolute inset-0 flex flex-col justify-end p-8 lg:p-10">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium border border-white/30">
                                        Featured
                                    </span>
                                    <span className="text-white/80 text-sm">
                                        {communityFacilitiesNews[0].date}
                                    </span>
                                </div>
                                <h3 className="text-3xl lg:text-4xl font-bold text-white mb-3 group-hover:text-[#ac6c29] transition-colors">
                                    {communityFacilitiesNews[0].title}
                                </h3>
                                <p className="text-white/90 text-lg mb-4 max-w-2xl">
                                    {communityFacilitiesNews[0].excerpt}
                                </p>
                                <div className="flex items-center text-white/80">
                                    <Clock className="h-4 w-4 mr-1.5" />
                                    {communityFacilitiesNews[0].readTime}
                                </div>
                            </div>
                        </a>
                    </motion.div>

                    {/* Stacked Cards */}
                    <div className="lg:col-span-4 space-y-6">
                        {communityFacilitiesNews.slice(1).map((news, index) => (
                            <motion.div
                                key={news.title}
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group relative h-56 rounded-2xl overflow-hidden cursor-pointer"
                            >
                                <img
                                    src={news.image}
                                    alt={news.title}
                                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                                <div className="absolute inset-0 flex flex-col justify-end p-6">
                                    <h4 className="text-lg font-bold text-white mb-2 group-hover:text-[#ac6c29] transition-colors line-clamp-2">
                                        {news.title}
                                    </h4>
                                    <div className="flex items-center justify-between text-white/80 text-sm">
                                        <span>{news.date}</span>
                                        <span>{news.readTime}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
