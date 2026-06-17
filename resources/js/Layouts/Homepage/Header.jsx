import { motion, AnimatePresence } from "framer-motion";
import {
    Menu,
    X,
    ChevronRight,
    Search,
    TrendingUp,
    Calendar,
    Clock,
} from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import { usePage } from "@inertiajs/react";

export function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [newsData, setNewsData] = useState([]);
    const [programsData, setProgramsData] = useState([]);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const { url } = usePage();

    const [searchResults, setSearchResults] = useState({
        news: [],
        programs: [],
    });

    const navItems = [
        { name: "About Us", href: "/aboutus" },
        { name: "Program", href: "/programs" },
        { name: "Ways To Help", href: "/campaigns" },
        { name: "News", href: "/news" },
        { name: "Contact Us", href: "/contact" },
        {
            name: "Program Qurban",
            href: "https://qurban.theaunfoundation.org/",
        },
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(
                    "http://127.0.0.1:8000/search-data"
                );

                setNewsData(res.data.news);
                setProgramsData(res.data.programs);
            } catch (err) {
                console.error("Error fetch:", err);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (searchQuery.trim().length > 0) {
            const query = searchQuery.toLowerCase();

            const filteredNews = newsData.filter(
                (article) =>
                    article.judul?.toLowerCase().includes(query) ||
                    article.konten?.toLowerCase().includes(query) ||
                    article.category?.toLowerCase().includes(query) ||
                    article.thumbnail?.toLowerCase().includes(query)
            );

            const filteredPrograms = programsData.filter(
                (program) =>
                    program.title_program?.toLowerCase().includes(query) ||
                    program.focus?.toLowerCase().includes(query) ||
                    program.description?.toLowerCase().includes(query)
            );

            setSearchResults({
                news: filteredNews,
                programs: filteredPrograms,
            });
        } else {
            setSearchResults({ news: [], programs: [] });
        }
    }, [searchQuery, newsData, programsData]);

    const totalResults =
        searchResults.news.length + searchResults.programs.length;

    return (
        <>
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100"
            >
                <div className="container mx-auto px-4 md:px-6 py-4">
                    <div className="flex items-center justify-between">
                        <a href="/">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="flex items-center"
                            >
                                <img
                                    src="/images/logo header aun.png"
                                    alt="Rembulan Relief"
                                    className="h-16 w-auto"
                                />
                            </motion.div>
                        </a>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center gap-8">
                            {navItems.map((item, index) => {
                                const isActive = url === item.href;
                                return (
                                    <motion.a
                                        key={item.name}
                                        href={item.href}
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 * index }}
                                        className={`relative transition-colors ${
                                            isActive
                                                ? "text-[#7b542d] font-bold"
                                                : "text-gray-700 hover:text-[#7b542d] font-medium"
                                        }`}
                                    >
                                        {item.name}
                                        {isActive && (
                                            <span className="absolute left-0 -bottom-1 h-[2px] w-full bg-[#7b542d] rounded-full" />
                                        )}
                                    </motion.a>
                                );
                            })}

                            <motion.button
                                onClick={() => setIsSearchOpen(true)}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.5 }}
                                className="w-10 h-10 flex items-center justify-center text-gray-700 hover:text-[#7b542d] transition-colors"
                                style={{ borderRadius: "10px 10px 10px 2px" }}
                            >
                                <Search size={20} />
                            </motion.button>
                            <motion.button
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.5 }}
                                className="bg-[#754c24] text-white px-6 py-2 hover:bg-[#7b542d] transition-colors rounded-sm"
                            >
                                Donasi
                            </motion.button>
                        </nav>

                        {/* Mobile Actions */}
                        <div className="md:hidden flex items-center gap-2">
                            <motion.button
                                onClick={() => setIsSearchOpen(true)}
                                className="w-10 h-10 flex items-center justify-center text-gray-700 hover:text-[#ef1968] transition-colors"
                                whileTap={{ scale: 0.9 }}
                            >
                                <Search size={22} />
                            </motion.button>
                            <motion.button
                                onClick={() => setIsOpen(!isOpen)}
                                className="relative z-[100] w-10 h-10 flex items-center justify-center"
                                whileTap={{ scale: 0.9 }}
                            >
                                {isOpen ? (
                                    <X size={28} className="text-white" />
                                ) : (
                                    <Menu size={28} className="text-gray-900" />
                                )}
                            </motion.button>
                        </div>
                    </div>
                </div>
            </motion.header>

            {/* Mobile Navigation - Full Screen Overlay - OUTSIDE header */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{
                            type: "spring",
                            damping: 30,
                            stiffness: 300,
                        }}
                        className="fixed top-0 left-0 right-0 bottom-0 z-[90] md:hidden overflow-y-auto"
                        style={{
                            backgroundColor: "#754c24",
                            background:
                                "linear-gradient(135deg, #754c24 0%, #2a1f15 100%)",
                        }}
                    >
                        {/* Close Button - Inside Overlay */}
                        <motion.button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-8 right-6 z-[100] w-10 h-10 flex items-center justify-center"
                            whileTap={{ scale: 0.9 }}
                            initial={{ opacity: 0, rotate: -90 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <X size={28} className="text-white" />
                        </motion.button>

                        {/* Decorative Elements */}
                        <div className="absolute top-20 right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl pointer-events-none" />
                        <div className="absolute bottom-20 left-10 w-32 h-32 bg-[#f7c498]/20 rounded-full blur-2xl pointer-events-none" />

                        {/* Content Container */}
                        <div className="relative h-full min-h-screen flex flex-col p-6 pt-28 pb-8">
                            {/* Navigation Items - Centered */}
                            <nav className="flex-1 flex flex-col justify-center space-y-1 -mt-12">
                                {navItems.map((item, index) => (
                                    <motion.a
                                        key={item.name}
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        initial={{ opacity: 0, x: -30 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{
                                            delay: 0.1 + index * 0.08,
                                        }}
                                        className="group flex items-center justify-between px-6 py-4 rounded-2xl hover:bg-white/10 transition-all"
                                    >
                                        <div className="flex items-center gap-4">
                                            <span className="text-white font-bold text-2xl">
                                                {item.name}
                                            </span>
                                        </div>
                                        <ChevronRight
                                            className="text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all"
                                            size={20}
                                        />
                                    </motion.a>
                                ))}
                            </nav>

                            {/* Bottom Section */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="space-y-4 mt-6"
                            >
                                {/* Donation Button */}
                                <button className="w-full rounded-xl bg-white text-[#2a1f15] px-8 py-4 font-bold text-base hover:bg-[#825830] hover:text-white transition-all">
                                    Donasi Sekarang
                                </button>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Search Modal */}
            <AnimatePresence>
                {isSearchOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-gradient-to-br from-black/40 via-black/30 to-black/40 backdrop-blur-md"
                        onClick={() => setIsSearchOpen(false)}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -50 }}
                            transition={{
                                type: "spring",
                                damping: 25,
                                stiffness: 300,
                            }}
                            onClick={(e) => e.stopPropagation()}
                            className="container mx-auto px-4 md:px-6 pt-20 md:pt-28 max-w-5xl"
                        >
                            {/* Search Box */}
                            <div
                                className="bg-[#1e1206] backdrop-blur-xl shadow-2xl overflow-hidden"
                                style={{ borderRadius: "32px 32px 32px 8px" }}
                            >
                                {/* Search Input with Gradient Border */}
                                <div className="relative">
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#ef1968]/20 via-[#f7c498]/20 to-[#ef1968]/20 blur-xl opacity-50" />
                                    <div className="relative bg-[#ffffff] lg:p-6 p-4 md:p-8">
                                        <div className="flex items-center lg:gap-4 gap-2">
                                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#6a4d30] to-[#976e45] flex items-center justify-center flex-shrink-0">
                                                <Search
                                                    className="text-white"
                                                    size={22}
                                                />
                                            </div>
                                            <input
                                                type="text"
                                                placeholder="What are you looking for?"
                                                value={searchQuery}
                                                onChange={(e) =>
                                                    setSearchQuery(
                                                        e.target.value
                                                    )
                                                }
                                                autoFocus
                                                className="bg-white border-none flex-1 lg:w-auto w-[50%] text-xl outline-none text-gray-900 placeholder:text-gray-400"
                                            />
                                            <button
                                                onClick={() =>
                                                    setIsSearchOpen(false)
                                                }
                                                className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all"
                                            >
                                                <X size={22} />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Search Results */}
                                <div className="max-h-[65vh] overflow-y-auto">
                                    {searchQuery.trim().length === 0 ? (
                                        <div className="p-16 text-center">
                                            <div className="flex justify-center mb-6">
                                                <motion.div
                                                    initial={{
                                                        scale: 0.9,
                                                        opacity: 0,
                                                    }}
                                                    animate={{
                                                        scale: 1,
                                                        opacity: 1,
                                                    }}
                                                    transition={{ delay: 0.1 }}
                                                    className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#ef1968]/10 to-[#f7c498]/10 flex items-center justify-center"
                                                >
                                                    <Search
                                                        className="text-white"
                                                        size={36}
                                                    />
                                                </motion.div>
                                            </div>
                                            <h3 className="text-xl font-bold text-white mb-2">
                                                Discover Our Content
                                            </h3>
                                            <p className="text-white">
                                                Search for inspiring news
                                                articles and impactful programs
                                            </p>
                                        </div>
                                    ) : totalResults === 0 ? (
                                        <div className="p-16 text-center">
                                            <div className="flex justify-center mb-6">
                                                <motion.div
                                                    initial={{
                                                        scale: 0.9,
                                                        opacity: 0,
                                                    }}
                                                    animate={{
                                                        scale: 1,
                                                        opacity: 1,
                                                    }}
                                                    className="w-20 h-20 rounded-3xl bg-[#231507] flex items-center justify-center"
                                                >
                                                    <Search
                                                        className="text-white"
                                                        size={36}
                                                    />
                                                </motion.div>
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                                No Results Found
                                            </h3>
                                            <p className="text-gray-500">
                                                Try different keywords or check
                                                your spelling
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="p-6 md:p-8 space-y-8">
                                            {/* Results Header */}
                                            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                                                <p className="text-sm text-white">
                                                    Found{" "}
                                                    <span className="font-bold text-[#624120]">
                                                        {totalResults}
                                                    </span>{" "}
                                                    {totalResults === 1
                                                        ? "result"
                                                        : "results"}
                                                </p>
                                            </div>

                                            {/* News Results */}
                                            {searchResults.news.length > 0 && (
                                                <motion.div
                                                    initial={{
                                                        opacity: 0,
                                                        y: 20,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        y: 0,
                                                    }}
                                                    transition={{ delay: 0.1 }}
                                                >
                                                    <div className="flex items-center gap-3 mb-6">
                                                        <div className="w-10 h-10 rounded-xl bg-[#63401e] flex items-center justify-center">
                                                            <Calendar
                                                                className="text-[#ab7137]"
                                                                size={18}
                                                            />
                                                        </div>
                                                        <div>
                                                            <h3 className="font-bold text-[#d2985e]">
                                                                News Articles
                                                            </h3>
                                                            <p className="text-xs text-[#885d32]">
                                                                {
                                                                    searchResults
                                                                        .news
                                                                        .length
                                                                }{" "}
                                                                {searchResults
                                                                    .news
                                                                    .length ===
                                                                1
                                                                    ? "article"
                                                                    : "articles"}{" "}
                                                                found
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="grid gap-4">
                                                        {searchResults.news
                                                            .slice(0, 5)
                                                            .map(
                                                                (
                                                                    article,
                                                                    index
                                                                ) => (
                                                                    <motion.a
                                                                        key={
                                                                            article.id
                                                                        }
                                                                        href={`/news/${article.slug}`}
                                                                        onClick={() =>
                                                                            setIsSearchOpen(
                                                                                false
                                                                            )
                                                                        }
                                                                        initial={{
                                                                            opacity: 0,
                                                                            x: -20,
                                                                        }}
                                                                        animate={{
                                                                            opacity: 1,
                                                                            x: 0,
                                                                        }}
                                                                        transition={{
                                                                            delay:
                                                                                0.1 +
                                                                                index *
                                                                                    0.05,
                                                                        }}
                                                                        className="group block"
                                                                    >
                                                                        <div
                                                                            className="lg:p-5 p-3 bg-[#63411f] hover:bg-gradient-to-br hover:from-[#614426] hover:to-[#855b30] transition-all hover:shadow-lg"
                                                                            style={{
                                                                                borderRadius:
                                                                                    "20px 20px 20px 5px",
                                                                            }}
                                                                        >
                                                                            <div className="flex lg:gap-5 gap-2">
                                                                                <div
                                                                                    className="flex-shrink-0 lg:w-24 lg:h-24 w-20 h-20 md:w-28 md:h-28 overflow-hidden"
                                                                                    style={{
                                                                                        borderRadius:
                                                                                            "16px 16px 16px 4px",
                                                                                    }}
                                                                                >
                                                                                    <img
                                                                                        src={`${article?.thumbnail}`}
                                                                                        alt={
                                                                                            article.judul
                                                                                        }
                                                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                                                    />
                                                                                </div>
                                                                                <div className="flex-1 min-w-0">
                                                                                    <div className="flex items-center gap-2 mb-3">
                                                                                        <span
                                                                                            className="lg:px-3 px-0 py-1 text-xs font-bold text-white"
                                                                                            style={{
                                                                                                backgroundColor:
                                                                                                    article.categoryColor,
                                                                                                borderRadius:
                                                                                                    "8px 8px 8px 2px",
                                                                                            }}
                                                                                        >
                                                                                            {
                                                                                                article.category
                                                                                            }
                                                                                        </span>
                                                                                    </div>
                                                                                    <h4 className="font-bold text-white mb-2 line-clamp-2 group-hover:text-[#d1975d] transition-colors leading-snug">
                                                                                        {
                                                                                            article.judul
                                                                                        }
                                                                                    </h4>
                                                                                    <p className="lg:block hidden text-sm text-white line-clamp-2 mb-3 leading-relaxed">
                                                                                        {
                                                                                            article.konten
                                                                                        }
                                                                                    </p>
                                                                                    <div className="flex items-center gap-4 text-xs text-white">
                                                                                        <span className="flex items-center gap-1.5">
                                                                                            <Calendar
                                                                                                size={
                                                                                                    13
                                                                                                }
                                                                                            />
                                                                                            {
                                                                                                article.date
                                                                                            }
                                                                                        </span>
                                                                                        <span className="flex items-center gap-1.5">
                                                                                            <Clock
                                                                                                size={
                                                                                                    13
                                                                                                }
                                                                                            />
                                                                                            {
                                                                                                article.readTime
                                                                                            }
                                                                                        </span>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </motion.a>
                                                                )
                                                            )}
                                                    </div>
                                                </motion.div>
                                            )}

                                            {/* Programs Results */}
                                            {searchResults.programs.length >
                                                0 && (
                                                <motion.div
                                                    initial={{
                                                        opacity: 0,
                                                        y: 20,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        y: 0,
                                                    }}
                                                    transition={{
                                                        delay:
                                                            searchResults.news
                                                                .length > 0
                                                                ? 0.2
                                                                : 0.1,
                                                    }}
                                                >
                                                    <div className="flex items-center gap-3 mb-6">
                                                        <div className="w-10 h-10 rounded-xl bg-[#f7c498]/10 flex items-center justify-center">
                                                            <TrendingUp
                                                                className="text-[#f7c498]"
                                                                size={18}
                                                            />
                                                        </div>
                                                        <div>
                                                            <h3 className="font-bold text-gray-900">
                                                                Programs
                                                            </h3>
                                                            <p className="text-xs text-gray-500">
                                                                {
                                                                    searchResults
                                                                        .programs
                                                                        .length
                                                                }{" "}
                                                                {searchResults
                                                                    .programs
                                                                    .length ===
                                                                1
                                                                    ? "program"
                                                                    : "programs"}{" "}
                                                                found
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="grid md:grid-cols-2 gap-4">
                                                        {searchResults.programs
                                                            .slice(0, 6)
                                                            .map(
                                                                (
                                                                    program,
                                                                    index
                                                                ) => (
                                                                    <motion.a
                                                                        key={
                                                                            program.id
                                                                        }
                                                                        href="/programs"
                                                                        onClick={() =>
                                                                            setIsSearchOpen(
                                                                                false
                                                                            )
                                                                        }
                                                                        initial={{
                                                                            opacity: 0,
                                                                            scale: 0.95,
                                                                        }}
                                                                        animate={{
                                                                            opacity: 1,
                                                                            scale: 1,
                                                                        }}
                                                                        transition={{
                                                                            delay:
                                                                                0.1 +
                                                                                index *
                                                                                    0.05,
                                                                        }}
                                                                        className="group block"
                                                                    >
                                                                        <div
                                                                            className="h-full p-5 bg-white hover:bg-gradient-to-br hover:from-gray-50 hover:to-white border border-gray-100 hover:border-gray-200 transition-all hover:shadow-lg"
                                                                            style={{
                                                                                borderRadius:
                                                                                    "20px 20px 20px 5px",
                                                                            }}
                                                                        >
                                                                            <div className="flex items-start gap-4">
                                                                                <div
                                                                                    className="w-14 h-14 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
                                                                                    style={{
                                                                                        background: `linear-gradient(135deg, ${program.color}15, ${program.color}25)`,
                                                                                        borderRadius:
                                                                                            "14px 14px 14px 3px",
                                                                                    }}
                                                                                >
                                                                                    <TrendingUp
                                                                                        size={
                                                                                            24
                                                                                        }
                                                                                        style={{
                                                                                            color: program.color,
                                                                                        }}
                                                                                    />
                                                                                </div>
                                                                                <div className="flex-1 min-w-0">
                                                                                    <h4 className="font-bold text-gray-900 mb-1 group-hover:text-[#ef1968] transition-colors">
                                                                                        {
                                                                                            program.name
                                                                                        }
                                                                                    </h4>
                                                                                    <p className="text-sm text-gray-600 mb-2 line-clamp-1">
                                                                                        {
                                                                                            program.fullName
                                                                                        }
                                                                                    </p>
                                                                                    <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                                                                                        {
                                                                                            program.description
                                                                                        }
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </motion.a>
                                                                )
                                                            )}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Quick Tips */}
                            {searchQuery.trim().length === 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="mt-6 text-center"
                                >
                                    <p className="text-sm text-white/70">
                                        <span className="font-semibold">
                                            Tips:
                                        </span>{" "}
                                        Try searching for "community",
                                        "education", "economic", or "seasonal"
                                    </p>
                                </motion.div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
