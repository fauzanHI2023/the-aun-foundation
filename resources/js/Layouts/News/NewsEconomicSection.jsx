import React from "react";
import { motion } from "framer-motion";
import { Clock, TrendingUp, ArrowRight } from "lucide-react";

export function NewsEconomicSection() {
    const economicNews = [
        {
            title: "50 Micro-Enterprises Launched This Quarter",
            excerpt:
                "Small business support program creates sustainable income for families.",
            image: "https://images.unsplash.com/photo-1655720359248-eeace8c709c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
            date: "March 15, 2026",
            readTime: "7 min read",
        },
        {
            title: "Vocational Training Equips 300 With New Skills",
            excerpt:
                "Skills development programs open doors to employment opportunities.",
            image: "https://images.unsplash.com/photo-1630068846062-3ffe78aa5049?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
            date: "February 28, 2026",
            readTime: "5 min read",
        },
    ];
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#ac6c29]/5 to-transparent" />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex items-center justify-between mb-12"
                >
                    <div className="flex items-center gap-4">
                        {/* <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#ac6c29] to-[#8b5723] flex items-center justify-center">
                            <TrendingUp className="h-8 w-8 text-white" />
                        </div> */}
                        <div>
                            <h2 className="text-4xl lg:text-5xl font-bold text-black">
                                Economic{" "}
                                <span className="text-[#ac6c29]">
                                    Empowerment
                                </span>
                            </h2>
                            <p className="text-gray-600 mt-1">
                                Creating sustainable livelihoods
                            </p>
                        </div>
                    </div>
                </motion.div>

                <div className="space-y-8">
                    {economicNews.map((news, index) => (
                        <motion.div
                            key={news.title}
                            initial={{
                                opacity: 0,
                                x: index % 2 === 0 ? -30 : 30,
                            }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${
                                index % 2 === 1 ? "lg:grid-flow-dense" : ""
                            }`}
                        >
                            <div
                                className={`relative ${
                                    index % 2 === 1 ? "lg:col-start-2" : ""
                                }`}
                            >
                                <div className="relative h-96 rounded-3xl overflow-hidden group cursor-pointer">
                                    <img
                                        src={news.image}
                                        alt={news.title}
                                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                </div>
                            </div>

                            <div
                                className={
                                    index % 2 === 1
                                        ? "lg:col-start-1 lg:row-start-1"
                                        : ""
                                }
                            >
                                <span className="inline-block px-4 py-2 rounded-full bg-[#ac6c29]/10 text-[#ac6c29] text-sm font-medium mb-4">
                                    {news.date}
                                </span>
                                <h3 className="text-3xl lg:text-4xl font-bold text-black mb-4 hover:text-[#ac6c29] transition-colors cursor-pointer">
                                    {news.title}
                                </h3>
                                <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                                    {news.excerpt}
                                </p>
                                <div className="flex items-center gap-6">
                                    <div className="flex items-center text-gray-500">
                                        <Clock className="h-5 w-5 mr-2" />
                                        {news.readTime}
                                    </div>
                                    <a
                                        href="/news/1"
                                        className="inline-flex items-center text-[#ac6c29] font-medium hover:gap-3 gap-2 transition-all"
                                    >
                                        Read Story{" "}
                                        <ArrowRight className="h-5 w-5" />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
