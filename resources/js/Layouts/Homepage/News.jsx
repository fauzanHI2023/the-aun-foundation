import { motion } from "framer-motion";
import { Calendar, ArrowRight, TrendingUp } from "lucide-react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export function News() {
    const featuredNews = {
        title: "Peluncuran Program RISE: Membawa Pendidikan Inklusif ke 50 Desa",
        excerpt:
            "Rembulan Relief Nusantara meluncurkan program RISE yang akan menjangkau 50 desa di seluruh Indonesia dengan fokus pendidikan inklusif untuk perempuan dan anak.",
        date: "15 Februari 2026",
        category: "Program Launch",
        image: "/images/DSC09927.jpg",
    };

    const recentNews = [
        {
            title: "Workshop Pemberdayaan Ekonomi Perempuan di Jawa Timur",
            date: "10 Februari 2026",
            category: "Workshop",
            image: "/images/DSC00136.jpg",
            color: "#f7c498",
        },
        {
            title: "Kemitraan Baru dengan NGO Internasional untuk Kesehatan Ibu",
            date: "5 Februari 2026",
            category: "Partnership",
            image: "https://images.unsplash.com/photo-1584792323914-329ce9bf59db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRvbmVzaWFuJTIwd29tZW4lMjBjaGlsZHJlbiUyMGNvbW11bml0eSUyMGVtcG93ZXJtZW50fGVufDF8fHx8MTc3MjEwMTcwNHww&ixlib=rb-4.1.0&q=80&w=1080",
            color: "#ef1968",
        },
        {
            title: "Inisiatif GREENLIGHT: Pelatihan Kepemimpinan Lingkungan",
            date: "1 Februari 2026",
            category: "Training",
            image: "https://images.unsplash.com/photo-1708596082640-6395c6906752?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbnZpcm9ubWVudGFsJTIwY29uc2VydmF0aW9uJTIwZ3JlZW58ZW58MXx8fHwxNzcyMDM1NDM2fDA&ixlib=rb-4.1.0&q=80&w=1080",
            color: "#ef1968",
        },
        {
            title: "Dampak Program SHIELD: 1000+ Perempuan Terbantu",
            date: "28 Januari 2026",
            category: "Impact Report",
            image: "https://images.unsplash.com/photo-1764620908053-51799256abf1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NpYWwlMjBwcm90ZWN0aW9uJTIwaHVtYW4lMjByaWdodHN8ZW58MXx8fHwxNzcyMTAxNzA5fDA&ixlib=rb-4.1.0&q=80&w=1080",
            color: "#f7c498",
        },
    ];

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        arrows: true,
        swipe: true,
        swipeToSlide: true,
        touchMove: true,
        pauseOnHover: true,
    };

    return (
        <section
            id="news"
            className="relative py-12 md:py-24 bg-white overflow-hidden"
        >
            <div className="container mx-auto px-4 md:px-6">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-10 md:mb-20"
                >
                    <h2 className="text-3xl md:text-6xl font-bold text-gray-900 mb-3 md:mb-6">
                        Cerita Dampak Kami
                    </h2>
                    <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                        Ikuti perkembangan program dan pencapaian terbaru kami
                    </p>
                </motion.div>

                {/* Featured News - Hero Style */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-8 md:mb-12"
                >
                    <div className="relative rounded-2xl md:rounded-3xl overflow-hidden group cursor-pointer bg-gray-900">
                        {/* Mobile: Vertical Stack / Desktop: Side by Side */}
                        <div className="flex flex-col md:grid md:grid-cols-2">
                            {/* Image */}
                            <div className="relative h-[250px] md:h-[500px] overflow-hidden">
                                <img
                                    src={featuredNews.image}
                                    alt={featuredNews.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                {/* Mobile Gradient Overlay */}
                                <div className="md:hidden absolute inset-0 bg-gradient-to-t from-gray-900/90 to-transparent" />
                            </div>

                            {/* Content */}
                            <div className="p-6 md:p-16 flex flex-col justify-center bg-gray-900 text-white">
                                <div className="inline-block mb-3 md:mb-4">
                                    <span className="text-[#f7c498] text-xs md:text-sm font-bold uppercase tracking-wider">
                                        {featuredNews.category}
                                    </span>
                                </div>

                                <h3 className="text-xl md:text-4xl font-bold mb-3 md:mb-4 leading-tight">
                                    {featuredNews.title}
                                </h3>

                                <p className="text-sm md:text-lg text-gray-300 mb-4 md:mb-6 leading-relaxed line-clamp-3 md:line-clamp-none">
                                    {featuredNews.excerpt}
                                </p>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-gray-400 text-xs md:text-sm">
                                        <Calendar
                                            size={14}
                                            className="md:size-[16px]"
                                        />
                                        <span>{featuredNews.date}</span>
                                    </div>

                                    <div className="hidden md:flex items-center gap-2 text-white font-medium group-hover:gap-4 transition-all">
                                        <span>Baca Selengkapnya</span>
                                        <ArrowRight size={20} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* News Grid - Clean Bento Layout */}
                {/* Desktop Grid - Hidden on Mobile */}
                <div className="hidden md:grid md:grid-cols-4 gap-4">
                    {/* News 1 - Large */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="md:col-span-2 md:row-span-2 group cursor-pointer"
                    >
                        <div className="relative h-full min-h-[500px] rounded-3xl overflow-hidden bg-white border-2 border-gray-100">
                            <img
                                src={recentNews[0].image}
                                alt={recentNews[0].title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                            <div className="absolute bottom-0 left-0 right-0 p-8">
                                <div className="inline-block mb-3">
                                    <span
                                        className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full"
                                        style={{
                                            backgroundColor:
                                                "rgba(255,255,255,0.2)",
                                            color: "white",
                                        }}
                                    >
                                        {recentNews[0].category}
                                    </span>
                                </div>

                                <h4 className="text-2xl font-bold text-white mb-3 leading-tight">
                                    {recentNews[0].title}
                                </h4>

                                <div className="flex items-center gap-2 text-white/80 text-sm">
                                    <Calendar size={14} />
                                    <span>{recentNews[0].date}</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* News 2 - Medium */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="md:col-span-2 group cursor-pointer"
                    >
                        <div className="relative h-full min-h-[240px] rounded-3xl overflow-hidden bg-[#fef5f8] border-2 border-gray-100">
                            <div className="grid md:grid-cols-2 h-full">
                                <div className="relative h-full min-h-[200px] overflow-hidden">
                                    <img
                                        src={recentNews[1].image}
                                        alt={recentNews[1].title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                </div>

                                <div className="p-6 flex flex-col justify-center">
                                    <div className="inline-block mb-3">
                                        <span
                                            className="text-xs font-bold uppercase tracking-wider"
                                            style={{
                                                color: recentNews[1].color,
                                            }}
                                        >
                                            {recentNews[1].category}
                                        </span>
                                    </div>

                                    <h4 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                                        {recentNews[1].title}
                                    </h4>

                                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                                        <Calendar size={14} />
                                        <span>{recentNews[1].date}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* News 3 - Small */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="md:col-span-1 group cursor-pointer"
                    >
                        <div className="relative h-full min-h-[240px] rounded-3xl overflow-hidden bg-white border-2 border-gray-100 p-6 flex flex-col">
                            <div
                                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
                                style={{
                                    backgroundColor: `${recentNews[2].color}15`,
                                }}
                            >
                                <Calendar
                                    size={24}
                                    style={{ color: recentNews[2].color }}
                                />
                            </div>

                            <div className="inline-block mb-3">
                                <span
                                    className="text-xs font-bold uppercase tracking-wider"
                                    style={{ color: recentNews[2].color }}
                                >
                                    {recentNews[2].category}
                                </span>
                            </div>

                            <h4
                                className="text-lg font-bold mb-3 leading-tight flex-grow"
                                style={{ color: recentNews[2].color }}
                            >
                                {recentNews[2].title}
                            </h4>

                            <div className="flex items-center gap-2 text-gray-500 text-sm mt-auto">
                                <Calendar size={14} />
                                <span>{recentNews[2].date}</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* News 4 - Small */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="md:col-span-1 group cursor-pointer"
                    >
                        <div className="relative h-full min-h-[240px] rounded-3xl overflow-hidden bg-gradient-to-br from-[#ef1968] to-[#f56b96] p-6 flex flex-col text-white">
                            <div className="inline-block mb-3">
                                <span className="text-xs font-bold uppercase tracking-wider opacity-90">
                                    {recentNews[3].category}
                                </span>
                            </div>

                            <h4 className="text-lg font-bold mb-3 leading-tight flex-grow">
                                {recentNews[3].title}
                            </h4>

                            <div className="flex items-center justify-between mt-auto">
                                <div className="flex items-center gap-2 text-sm opacity-90">
                                    <Calendar size={14} />
                                    <span>{recentNews[3].date}</span>
                                </div>

                                <ArrowRight
                                    size={20}
                                    className="group-hover:translate-x-1 transition-transform"
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Mobile Slider - Hidden on Desktop */}
                <div className="md:hidden">
                    <Slider {...sliderSettings}>
                        {recentNews.map((news, index) => (
                            <div key={index} className="px-2">
                                <div className="relative min-h-[400px] rounded-3xl overflow-hidden bg-white border-2 border-gray-100">
                                    <img
                                        src={news.image}
                                        alt={news.title}
                                        className="w-full h-[250px] object-cover"
                                    />

                                    <div className="p-6">
                                        <div className="inline-block mb-3">
                                            <span
                                                className="text-xs font-bold uppercase tracking-wider"
                                                style={{ color: news.color }}
                                            >
                                                {news.category}
                                            </span>
                                        </div>

                                        <h4 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                                            {news.title}
                                        </h4>

                                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                                            <Calendar size={14} />
                                            <span>{news.date}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>

                {/* View All CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mt-16"
                >
                    <button
                        className="inline-flex items-center gap-3 bg-gray-900 text-white px-10 py-4 font-bold hover:gap-5 transition-all"
                        style={{ borderRadius: "20px 20px 20px 4px" }}
                    >
                        <span>Lihat Semua Berita</span>
                        <ArrowRight size={20} />
                    </button>
                </motion.div>
            </div>
        </section>
    );
}
