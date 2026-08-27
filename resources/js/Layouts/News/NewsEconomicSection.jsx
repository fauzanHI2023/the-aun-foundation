import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, TrendingUp, ArrowRight } from "lucide-react";
import axios from "axios";

export function NewsEconomicSection() {
    const [newsArticles, setNewsArticles] = useState([]);

    useEffect(() => {
        axios.get("/api/beritas").then((res) => setNewsArticles(res.data));
    }, []);

    const economicArticles = newsArticles.filter(
        (item) => item.category === "economic" && item.selected_post === 0
    );

    return (
        <section className="lg:py-24 py-8 bg-white relative overflow-hidden">
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
                            <h2 className="text-3xl lg:text-5xl font-bold text-black">
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

                {economicArticles.length > 0 && (
                    <div className="space-y-8">
                        {economicArticles?.map((article, index) => (
                            <motion.div
                                key={article.title}
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
                                            src={`${article.image}`}
                                            alt={article.title}
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
                                        {article.date}
                                    </span>
                                    <h3 className="text-3xl lg:text-4xl font-bold text-black mb-4 hover:text-[#ac6c29] transition-colors cursor-pointer">
                                        {article.title}
                                    </h3>
                                    <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                                        {article.excerpt}
                                    </p>
                                    <div className="flex items-center gap-6">
                                        <div className="flex items-center text-gray-500">
                                            <Clock className="h-5 w-5 mr-2" />
                                            {article.readTime}
                                        </div>
                                        <a
                                            href={`/news/${article.slug}`}
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
                )}
            </div>
        </section>
    );
}
