import React from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";

export function NewsHeroSection() {
    const featuredNews = {
        title: "AUN Launches New Community Center in Remote Village",
        excerpt:
            "In a significant milestone for community development, AUN has successfully completed and launched a new multi-purpose community center serving over 2,000 residents.",
        image: "https://images.unsplash.com/photo-1636987050384-9b079c700f63?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
        date: "May 15, 2026",
        category: "Community Facilities",
        readTime: "5 min read",
    };

    const topStories = [
        {
            title: "Ramadan Food Distribution Reaches 5,000 Families",
            image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
            date: "April 28, 2026",
            category: "Seasonal Programs",
        },
        {
            title: "New Educational Initiative Empowers 300 Youth",
            image: "https://images.unsplash.com/photo-1478476868527-002ae3f3e159?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
            date: "April 20, 2026",
            category: "Education",
        },
    ];
    return (
        <section className="relative h-screen overflow-hidden">
            <div className="absolute inset-0">
                <img
                    src={featuredNews.image}
                    alt={featuredNews.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
            </div>

            <div className="relative h-full flex items-end">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20 w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="lg:col-span-7"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <span className="px-4 py-2 rounded-lg bg-[#ac6c29] text-white text-sm font-medium">
                                    Featured Story
                                </span>
                                <div className="flex items-center text-white/80 text-sm">
                                    <Calendar className="h-4 w-4 mr-1.5" />
                                    {featuredNews.date}
                                </div>
                                <div className="flex items-center text-white/80 text-sm">
                                    <Clock className="h-4 w-4 mr-1.5" />
                                    {featuredNews.readTime}
                                </div>
                            </div>

                            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                                {featuredNews.title}
                            </h1>
                            <p className="text-xl text-white/90 mb-8 max-w-2xl leading-relaxed">
                                {featuredNews.excerpt}
                            </p>
                            <a
                                href="/news/1"
                                className="inline-flex items-center px-8 py-4 rounded-lg bg-white text-black font-medium hover:bg-gray-100 transition-all hover:scale-105 shadow-xl"
                            >
                                Read Full Story
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </a>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="lg:col-span-5 space-y-4"
                        >
                            {topStories.map((story, index) => (
                                <div
                                    key={story.title}
                                    className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 hover:bg-white/20 transition-all cursor-pointer"
                                >
                                    <div className="flex gap-4">
                                        <div className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden">
                                            <img
                                                src={story.image}
                                                alt={story.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <span className="text-xs text-[#d69d60] font-medium px-2 py-1 bg-white/20 rounded-full">
                                                {story.category}
                                            </span>
                                            <h3 className="text-white font-bold mt-2 mb-1 line-clamp-2 group-hover:text-[#ac6c29] transition-colors">
                                                {story.title}
                                            </h3>
                                            <p className="text-white/70 text-sm">
                                                {story.date}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            >
                <div className="flex flex-col items-center text-white/60">
                    <span className="text-sm mb-2">Scroll to explore</span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-6 h-10 rounded-full border-2 border-white/40 flex items-start justify-center p-2"
                    >
                        <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}
