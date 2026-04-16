import { motion } from "framer-motion";
import {
    Calendar,
    ArrowRight,
    Clock,
    GraduationCap,
    Heart,
    Shield,
    Leaf,
} from "lucide-react";
// import { newsArticles } from "./newsData";
import { useEffect, useState } from "react";
import axios from "axios";

const categoryConfig = [
    {
        id: "education",
        name: "Education",
        icon: GraduationCap,
        color: "#ef1968",
        tagline: "Knowledge is Liberation",
    },
    {
        id: "health",
        name: "Health & Well-being",
        icon: Heart,
        color: "#f7c498",
        tagline: "Every Body Deserves Care",
    },
    {
        id: "protection",
        name: "Protection & Rights",
        icon: Shield,
        color: "#ef1968",
        tagline: "Safety is a Human Right",
    },
    {
        id: "environment",
        name: "Environmental Action",
        icon: Leaf,
        color: "#f7c498",
        tagline: "Our Planet, Our Future",
    },
];

export function NewsGrid({ activeCategory }) {
    const [newsArticles, setNewsArticles] = useState([]);

    useEffect(() => {
        axios.get("/api/beritas").then((res) => setNewsArticles(res.data));
    }, []);

    const educationArticles = newsArticles.filter(
        (item) => item.category === "education" && item.selected_post === 0
    );

    const healthArticles = newsArticles.filter(
        (item) => item.category === "health" && item.selected_post === 0
    );

    const selectedEducation = newsArticles
        .filter(
            (item) => item.category === "education" && item.selected_post === 1
        )
        .sort((a, b) => b.id - a.id);

    const selectedHealth = newsArticles
        .filter(
            (item) => item.category === "health" && item.selected_post === 1
        )
        .sort((a, b) => b.id - a.id);

    const article2 = selectedEducation[0];
    const article3 = selectedEducation[1];
    const article5 = selectedEducation[2];
    const article4 = selectedHealth[0];
    const article6 = selectedHealth[1];
    const article7 = selectedHealth[2];
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-6 md:px-12">
                {/* Main Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12 md:mb-20 text-center"
                >
                    <div className="inline-block mb-4">
                        <div
                            className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-white"
                            style={{
                                background:
                                    "linear-gradient(135deg, #ef1968 0%, #f7c498 100%)",
                                borderRadius: "12px 12px 12px 3px",
                            }}
                        >
                            Stories of Change
                        </div>
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6">
                        Latest{" "}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ef1968] to-[#f7c498]">
                            Updates
                        </span>
                    </h2>
                    <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
                        Real stories. Real impact. Real transformation happening
                        across Nusantara.
                    </p>
                </motion.div>

                {/* EDUCATION SECTION - Magazine Editorial Style */}
                <div className="mb-20 md:mb-32">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="mb-8 md:mb-12 px-0"
                    >
                        <div className="flex items-end gap-4 md:gap-6 mb-4">
                            <div className="flex-1">
                                <h3 className="text-3xl md:text-5xl font-bold text-gray-900 mb-1 md:mb-2">
                                    Education
                                </h3>
                                <div className="flex items-center gap-4">
                                    <div className="h-0.5 md:h-1 w-16 md:w-24 bg-[#ef1968]" />
                                    <p className="text-sm md:text-lg italic text-[#ef1968] font-medium">
                                        Knowledge is Liberation
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Desktop: Education Layout - Split Hero + Stack */}
                    <div className="hidden md:grid md:grid-cols-2 gap-6">
                        {/* Left - Hero Article (Spans 2 Rows) */}
                        {article2 && (
                            <a
                                href={`/news/${article2.slug}`}
                                className="row-span-2"
                            >
                                <motion.article
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="group cursor-pointer h-full"
                                >
                                    <div
                                        className="relative h-[504px] overflow-hidden"
                                        style={{
                                            borderRadius: "32px 32px 32px 8px",
                                        }}
                                    >
                                        <img
                                            src={`${article2.image}`}
                                            alt={article2.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                                        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                                            <div
                                                className="inline-block px-3 py-1.5 mb-4 text-xs font-bold uppercase tracking-wider bg-[#ef1968]"
                                                style={{
                                                    borderRadius:
                                                        "8px 8px 8px 2px",
                                                }}
                                            >
                                                Featured
                                            </div>
                                            <h3 className="text-4xl font-bold mb-4 leading-tight">
                                                {article2.title}
                                            </h3>
                                            <p className="text-white/90 mb-4 leading-relaxed">
                                                {article2.excerpt}
                                            </p>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3 text-sm text-white/80">
                                                    <span>{article2.date}</span>
                                                    <span>•</span>
                                                    <span>
                                                        {article2.readTime}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2 font-bold text-[#f7c498] group-hover:gap-3 transition-all">
                                                    <span>Read Story</span>
                                                    <ArrowRight size={16} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.article>
                            </a>
                        )}

                        {/* Right - Article 2 (Top) */}
                        {article3 && (
                            <a href={`/news/${article3.slug}`}>
                                <motion.article
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 }}
                                    className="group cursor-pointer h-full"
                                >
                                    <div className="flex gap-4 h-full min-h-[240px]">
                                        <div
                                            className="relative w-1/3 overflow-hidden"
                                            style={{
                                                borderRadius:
                                                    "20px 20px 20px 4px",
                                            }}
                                        >
                                            <img
                                                src={`${article3.image}`}
                                                alt={article3.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-center">
                                            <div className="flex items-center gap-2 mb-3">
                                                <div
                                                    className="w-2 h-2 bg-[#ef1968]"
                                                    style={{
                                                        borderRadius:
                                                            "2px 2px 2px 1px",
                                                    }}
                                                />
                                                <span className="text-xs text-gray-500">
                                                    {article3.date}
                                                </span>
                                            </div>
                                            <h3 className="text-xl font-bold mb-2 leading-tight text-gray-900 group-hover:text-[#ef1968] transition-colors">
                                                {article3.title}
                                            </h3>
                                            <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                                                {article3.excerpt}
                                            </p>
                                            <div className="flex items-center gap-2 text-[#ef1968] font-bold text-sm group-hover:gap-3 transition-all">
                                                <span>Read</span>
                                                <ArrowRight size={14} />
                                            </div>
                                        </div>
                                    </div>
                                </motion.article>
                            </a>
                        )}

                        {/* Right - Article 3 (Bottom) */}
                        {article5 && (
                            <a href={`/news/${article5.slug}`}>
                                <motion.article
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 }}
                                    className="group cursor-pointer h-full"
                                >
                                    <div className="flex gap-4 h-full min-h-[240px]">
                                        <div
                                            className="relative w-1/3 overflow-hidden"
                                            style={{
                                                borderRadius:
                                                    "20px 20px 20px 4px",
                                            }}
                                        >
                                            <img
                                                src={`${article5.image}`}
                                                alt={article5.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-center">
                                            <div className="flex items-center gap-2 mb-3">
                                                <div
                                                    className="w-2 h-2 bg-[#ef1968]"
                                                    style={{
                                                        borderRadius:
                                                            "2px 2px 2px 1px",
                                                    }}
                                                />
                                                <span className="text-xs text-gray-500">
                                                    {article5.date}
                                                </span>
                                            </div>
                                            <h3 className="text-xl font-bold mb-2 leading-tight text-gray-900 group-hover:text-[#ef1968] transition-colors">
                                                {article5.title}
                                            </h3>
                                            <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                                                {article5.excerpt}
                                            </p>
                                            <div className="flex items-center gap-2 text-[#ef1968] font-bold text-sm group-hover:gap-3 transition-all">
                                                <span>Read</span>
                                                <ArrowRight size={14} />
                                            </div>
                                        </div>
                                    </div>
                                </motion.article>
                            </a>
                        )}
                    </div>

                    {/* Desktop: 4 Additional Articles Grid */}
                    {educationArticles.length > 0 && (
                        <div className="hidden md:grid md:grid-cols-4 gap-6 mt-6">
                            {educationArticles?.map((article, index) => (
                                <a
                                    key={article.id}
                                    href={`/news/${article.slug}`}
                                >
                                    <motion.article
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{
                                            delay: (index + 3) * 0.05,
                                        }}
                                        className="group cursor-pointer h-full"
                                    >
                                        <div
                                            className="overflow-hidden h-full flex flex-col"
                                            style={{
                                                borderRadius:
                                                    "10px 10px 20px 5px",
                                            }}
                                        >
                                            <div className="relative h-40 overflow-hidden">
                                                <img
                                                    src={`${article.image}`}
                                                    alt={article.title}
                                                    className="w-full h-full object-cover rounded-[10px] transition-transform duration-700 group-hover:scale-110"
                                                />
                                            </div>
                                            <div className="py-4 px-0 flex flex-col flex-1">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <div
                                                        className="w-1.5 h-1.5"
                                                        style={{
                                                            borderRadius: "1px",
                                                        }}
                                                    />
                                                    <span className="text-[10px] text-gray-500 uppercase tracking-wider">
                                                        {article.date}
                                                    </span>
                                                </div>
                                                <h3 className="text-xs md:text-sm font-semibold mb-2 leading-tight text-gray-900 group-hover transition-colors line-clamp-3 flex-1">
                                                    {article.title}
                                                </h3>
                                                <div className="flex items-center gap-1.5 font-bold text-xs group-hover:gap-2.5 transition-all mt-auto">
                                                    <span>Read</span>
                                                    <ArrowRight size={12} />
                                                </div>
                                            </div>
                                        </div>
                                    </motion.article>
                                </a>
                            ))}
                        </div>
                    )}

                    {/* Mobile: Horizontal Carousel - 2 items visible + peek 3rd */}
                    <div className="md:hidden -mx-6">
                        <div
                            className="flex gap-4 overflow-x-auto snap-x snap-mandatory pl-6 pr-6 pb-4 scrollbar-hide"
                            style={{
                                scrollSnapType: "x mandatory",
                                scrollbarWidth: "none",
                                msOverflowStyle: "none",
                            }}
                        >
                            {educationArticles
                                .slice(0, 3)
                                .map((article, index) => (
                                    <a
                                        key={article.id}
                                        to={`/news/${article.id}`}
                                    >
                                        <motion.article
                                            initial={{ opacity: 0, x: 20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.1 }}
                                            className="group flex-shrink-0 snap-start"
                                            style={{
                                                width:
                                                    index < 2
                                                        ? "calc(50vw - 32px)"
                                                        : "calc(50vw - 48px)",
                                            }}
                                        >
                                            <div
                                                className="relative h-[320px] overflow-hidden"
                                                style={{
                                                    borderRadius:
                                                        "24px 24px 24px 6px",
                                                }}
                                            >
                                                <img
                                                    src={article.image}
                                                    alt={article.title}
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                                                <div className="absolute bottom-0 left-0 right-0 p-5">
                                                    <div
                                                        className="inline-block px-2.5 py-1.5 mb-3 text-[10px] font-bold uppercase tracking-wider bg-[#ef1968] text-white"
                                                        style={{
                                                            borderRadius:
                                                                "6px 6px 6px 2px",
                                                        }}
                                                    >
                                                        {index === 0
                                                            ? "Featured"
                                                            : "Education"}
                                                    </div>
                                                    <h3 className="text-lg font-bold mb-2 leading-tight text-white line-clamp-2">
                                                        {article.title}
                                                    </h3>
                                                    <div className="flex items-center gap-2 text-xs text-white/80">
                                                        <span>
                                                            {article.date}
                                                        </span>
                                                        <span>•</span>
                                                        <span>
                                                            {article.readTime}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.article>
                                    </a>
                                ))}
                        </div>
                    </div>
                </div>

                {/* HEALTH SECTION - Minimal List Style */}
                <div className="mb-20 md:mb-32">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="mb-8 md:mb-12 px-0"
                    >
                        <div className="flex items-end gap-4 md:gap-6 mb-4">
                            <div className="flex-1">
                                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">
                                    Health & Well-being
                                </h3>
                                <div className="flex items-center gap-4">
                                    <div className="h-0.5 md:h-1 w-16 md:w-24 bg-[#f7c498]" />
                                    <p className="text-sm md:text-base italic text-[#f7c498] font-medium">
                                        Every Body Deserves Care
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Desktop: Education Layout - Split Hero + Stack */}
                    <div className="hidden md:grid md:grid-cols-2 gap-6">
                        {/* Left - Hero Article (Spans 2 Rows) */}
                        {article4 && (
                            <a
                                to={`/news/${article4.slug}`}
                                className="row-span-2"
                            >
                                <motion.article
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="group cursor-pointer h-full"
                                >
                                    <div
                                        className="relative h-[504px] overflow-hidden"
                                        style={{
                                            borderRadius: "32px 32px 32px 8px",
                                        }}
                                    >
                                        <img
                                            src={`${article4.image}`}
                                            alt={article4.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                                        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                                            <div
                                                className="inline-block px-3 py-1.5 mb-4 text-xs font-bold uppercase tracking-wider bg-[#ef1968]"
                                                style={{
                                                    borderRadius:
                                                        "8px 8px 8px 2px",
                                                }}
                                            >
                                                Featured
                                            </div>
                                            <h3 className="text-4xl font-bold mb-4 leading-tight">
                                                {article4.title}
                                            </h3>
                                            <p className="text-white/90 mb-4 leading-relaxed">
                                                {article4.excerpt}
                                            </p>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3 text-sm text-white/80">
                                                    <span>{article4.date}</span>
                                                    <span>•</span>
                                                    <span>
                                                        {article4.readTime}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2 font-bold text-[#f7c498] group-hover:gap-3 transition-all">
                                                    <span>Read Story</span>
                                                    <ArrowRight size={16} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.article>
                            </a>
                        )}

                        {/* Right - Article 2 (Top) */}
                        {article6 && (
                            <a href={`/news/${article3.slug}`}>
                                <motion.article
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 }}
                                    className="group cursor-pointer h-full"
                                >
                                    <div className="flex gap-4 h-full min-h-[240px]">
                                        <div
                                            className="relative w-1/3 overflow-hidden"
                                            style={{
                                                borderRadius:
                                                    "20px 20px 20px 4px",
                                            }}
                                        >
                                            <img
                                                src={`${article6.image}`}
                                                alt={article6.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-center">
                                            <div className="flex items-center gap-2 mb-3">
                                                <div
                                                    className="w-2 h-2 bg-[#ef1968]"
                                                    style={{
                                                        borderRadius:
                                                            "2px 2px 2px 1px",
                                                    }}
                                                />
                                                <span className="text-xs text-gray-500">
                                                    {article6.date}
                                                </span>
                                            </div>
                                            <h3 className="text-xl font-bold mb-2 leading-tight text-gray-900 group-hover:text-[#ef1968] transition-colors">
                                                {article6.title}
                                            </h3>
                                            <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                                                {article6.excerpt}
                                            </p>
                                            <div className="flex items-center gap-2 text-[#ef1968] font-bold text-sm group-hover:gap-3 transition-all">
                                                <span>Read</span>
                                                <ArrowRight size={14} />
                                            </div>
                                        </div>
                                    </div>
                                </motion.article>
                            </a>
                        )}

                        {/* Right - Article 3 (Bottom) */}
                        {article7 && (
                            <a href={`/news/${article7.slug}`}>
                                <motion.article
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 }}
                                    className="group cursor-pointer h-full"
                                >
                                    <div className="flex gap-4 h-full min-h-[240px]">
                                        <div
                                            className="relative w-1/3 overflow-hidden"
                                            style={{
                                                borderRadius:
                                                    "20px 20px 20px 4px",
                                            }}
                                        >
                                            <img
                                                src={`${article7.image}`}
                                                alt={article7.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-center">
                                            <div className="flex items-center gap-2 mb-3">
                                                <div
                                                    className="w-2 h-2 bg-[#ef1968]"
                                                    style={{
                                                        borderRadius:
                                                            "2px 2px 2px 1px",
                                                    }}
                                                />
                                                <span className="text-xs text-gray-500">
                                                    {article7.date}
                                                </span>
                                            </div>
                                            <h3 className="text-xl font-bold mb-2 leading-tight text-gray-900 group-hover:text-[#ef1968] transition-colors">
                                                {article7.title}
                                            </h3>
                                            <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                                                {article7.excerpt}
                                            </p>
                                            <div className="flex items-center gap-2 text-[#ef1968] font-bold text-sm group-hover:gap-3 transition-all">
                                                <span>Read</span>
                                                <ArrowRight size={14} />
                                            </div>
                                        </div>
                                    </div>
                                </motion.article>
                            </a>
                        )}
                    </div>

                    {/* Desktop: 4 Additional Articles Grid */}
                    {healthArticles.length > 0 && (
                        <div className="hidden md:grid md:grid-cols-4 gap-6 mt-6">
                            {healthArticles?.map((article, index) => (
                                <a
                                    key={article.id}
                                    href={`/news/${article.slug}`}
                                >
                                    <motion.article
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{
                                            delay: (index + 3) * 0.05,
                                        }}
                                        className="group cursor-pointer h-full"
                                    >
                                        <div
                                            className="overflow-hidden h-full flex flex-col"
                                            style={{
                                                borderRadius:
                                                    "10px 10px 20px 5px",
                                            }}
                                        >
                                            <div className="relative h-40 overflow-hidden">
                                                <img
                                                    src={`${article.image}`}
                                                    alt={article.title}
                                                    className="w-full h-full object-cover rounded-[10px] transition-transform duration-700 group-hover:scale-110"
                                                />
                                            </div>
                                            <div className="py-4 px-0 flex flex-col flex-1">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <div
                                                        className="w-1.5 h-1.5"
                                                        style={{
                                                            borderRadius: "1px",
                                                        }}
                                                    />
                                                    <span className="text-[10px] text-gray-500 uppercase tracking-wider">
                                                        {article.date}
                                                    </span>
                                                </div>
                                                <h3 className="text-xs md:text-sm font-semibold mb-2 leading-tight text-gray-900 group-hover transition-colors line-clamp-3 flex-1">
                                                    {article.title}
                                                </h3>
                                                <div className="flex items-center gap-1.5 font-bold text-xs group-hover:gap-2.5 transition-all mt-auto">
                                                    <span>Read</span>
                                                    <ArrowRight size={12} />
                                                </div>
                                            </div>
                                        </div>
                                    </motion.article>
                                </a>
                            ))}
                        </div>
                    )}

                    {/* Mobile: Horizontal Carousel - 2 items visible + peek 3rd */}
                    <div className="md:hidden -mx-6">
                        <div
                            className="flex gap-4 overflow-x-auto snap-x snap-mandatory pl-6 pr-6 pb-4 scrollbar-hide"
                            style={{
                                scrollSnapType: "x mandatory",
                                scrollbarWidth: "none",
                                msOverflowStyle: "none",
                            }}
                        >
                            {educationArticles
                                .slice(0, 3)
                                .map((article, index) => (
                                    <a
                                        key={article.id}
                                        to={`/news/${article.id}`}
                                    >
                                        <motion.article
                                            initial={{ opacity: 0, x: 20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.1 }}
                                            className="group flex-shrink-0 snap-start"
                                            style={{
                                                width:
                                                    index < 2
                                                        ? "calc(50vw - 32px)"
                                                        : "calc(50vw - 48px)",
                                            }}
                                        >
                                            <div
                                                className="relative h-[320px] overflow-hidden"
                                                style={{
                                                    borderRadius:
                                                        "24px 24px 24px 6px",
                                                }}
                                            >
                                                <img
                                                    src={article.image}
                                                    alt={article.title}
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                                                <div className="absolute bottom-0 left-0 right-0 p-5">
                                                    <div
                                                        className="inline-block px-2.5 py-1.5 mb-3 text-[10px] font-bold uppercase tracking-wider bg-[#ef1968] text-white"
                                                        style={{
                                                            borderRadius:
                                                                "6px 6px 6px 2px",
                                                        }}
                                                    >
                                                        {index === 0
                                                            ? "Featured"
                                                            : "Education"}
                                                    </div>
                                                    <h3 className="text-lg font-bold mb-2 leading-tight text-white line-clamp-2">
                                                        {article.title}
                                                    </h3>
                                                    <div className="flex items-center gap-2 text-xs text-white/80">
                                                        <span>
                                                            {article.date}
                                                        </span>
                                                        <span>•</span>
                                                        <span>
                                                            {article.readTime}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.article>
                                    </a>
                                ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* CSS for hiding scrollbar */}
            <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
        </section>
    );
}
