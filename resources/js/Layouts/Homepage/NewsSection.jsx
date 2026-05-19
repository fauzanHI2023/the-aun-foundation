import { Calendar, ArrowRight, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export function NewsSection() {
    const news = [
        {
            title: "New Community Center Opens in Rural Area",
            excerpt:
                "AUN inaugurates a new community center providing essential services and support to rural communities.",
            date: "April 15, 2026",
            image: "https://images.unsplash.com/photo-1703728125222-2df2e76acb26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBmYWNpbGl0eSUyMGJ1aWxkaW5nfGVufDF8fHx8MTc3NjY3MDYwMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
            category: "Community",
            featured: true,
        },
        {
            title: "Education Program Reaches 1000 Students",
            excerpt:
                "Our education initiative has successfully provided learning support to over 1000 students across the region.",
            date: "April 10, 2026",
            image: "https://images.unsplash.com/photo-1759678444893-9c1762e022fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZHVjYXRpb24lMjBjaGlsZHJlbiUyMGxlYXJuaW5nfGVufDF8fHx8MTc3NjY3MDYwMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
            category: "Education",
            featured: false,
        },
        {
            title: "Economic Empowerment Workshop Success",
            excerpt:
                "Small business owners gain valuable skills through our latest entrepreneurship training program.",
            date: "April 5, 2026",
            image: "https://images.unsplash.com/photo-1609994263276-9311ca68f301?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29ub21pYyUyMGVtcG93ZXJtZW50JTIwc21hbGwlMjBidXNpbmVzc3xlbnwxfHx8fDE3NzY2NzA2MDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
            category: "Economic",
            featured: false,
        },
    ];

    return (
        <section
            id="news"
            className="relative py-20 md:py-32 bg-gradient-to-b from-white to-[#fffdf7] overflow-hidden"
        >
            {/* Background decoration */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#754c24] rounded-full mix-blend-multiply filter blur-3xl opacity-5"></div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="inline-block mb-6 px-4 py-1.5 bg-[#754c24] text-white text-xs tracking-wider">
                                STORIES & UPDATES
                            </div>
                            <h2 className="text-5xl lg:text-6xl font-bold text-black mb-4 leading-tight tracking-tight">
                                Latest News Stay Updated
                            </h2>
                        </div>
                        <button className="hidden lg:flex items-center gap-2 px-6 py-3 border border-black hover:bg-black hover:text-white transition-colors">
                            <span className="text-sm">View All</span>
                            <ArrowUpRight className="w-4 h-4" />
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
                                    src={news[0].image}
                                    alt={news[0].title}
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
                                        {news[0].category}
                                    </span>
                                    <span className="text-gray-300">•</span>
                                    <div className="flex items-center gap-2 text-gray-500 text-xs">
                                        <Calendar className="w-3 h-3" />
                                        <span>{news[0].date}</span>
                                    </div>
                                </div>

                                <h3 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                                    {news[0].title}
                                </h3>

                                <p className="text-gray-600 text-lg leading-relaxed">
                                    {news[0].excerpt}
                                </p>

                                <button className="inline-flex items-center gap-2 text-[#754c24] font-medium hover:gap-3 transition-all">
                                    Read Full Story
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </article>

                    {/* Other Stories - Horizontal Cards */}
                    <div className="grid md:grid-cols-2 gap-8">
                        {news.slice(1).map((item, index) => (
                            <article
                                key={index}
                                className="group relative border-t-2 border-gray-200 pt-8 hover:border-[#754c24] transition-all duration-300"
                            >
                                {/* Image */}
                                <div className="relative h-[240px] overflow-hidden rounded-2xl mb-6">
                                    <img
                                        src={item.image}
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
                                        <span className="text-gray-300">•</span>
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

                                    <button className="inline-flex items-center gap-2 text-[#754c24] font-medium text-sm group-hover:gap-3 transition-all">
                                        Read More
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
