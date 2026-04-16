import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowLeft,
    Calendar,
    Clock,
    Share2,
    Bookmark,
    Facebook,
    Twitter,
    Linkedin,
    Link2,
    X,
    Check,
} from "lucide-react";

export function NewsDetailHero({ article }) {
    const [isOpen, setIsOpen] = useState(false);
    const [copied, setCopied] = useState(false);

    const currentUrl = window.location.href;
    const shareText = encodeURIComponent(article.title);
    const shareUrl = encodeURIComponent(currentUrl);

    const socialMediaLinks = [
        {
            name: "Facebook",
            icon: Facebook,
            url: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
            color: "#1877F2",
            bgColor: "#1877F215",
        },
        {
            name: "Twitter",
            icon: Twitter,
            url: `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`,
            color: "#1DA1F2",
            bgColor: "#1DA1F215",
        },
        {
            name: "LinkedIn",
            icon: Linkedin,
            url: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
            color: "#0A66C2",
            bgColor: "#0A66C215",
        },
        {
            name: "WhatsApp",
            icon: Share2,
            url: `https://wa.me/?text=${shareText}%20${shareUrl}`,
            color: "#25D366",
            bgColor: "#25D36615",
        },
    ];

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(currentUrl);
            setCopied(true);
            toast.success("Link copied to clipboard! 📋", {
                duration: 3000,
            });
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            toast.error("Failed to copy link", {
                duration: 3000,
            });
        }
    };

    const handleSocialShare = (url) => {
        window.open(url, "_blank", "width=600,height=400");
    };
    if (!article) return null;
    return (
        <section className="relative bg-white pt-8 md:pt-12">
            <div className="container mx-auto px-6 md:px-12">
                {/* Back Button */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-6 md:mb-8"
                >
                    <a
                        href="/news"
                        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors group"
                    >
                        <div
                            className="w-8 h-8 flex items-center justify-center group-hover:bg-gray-100 transition-colors"
                            style={{ borderRadius: "8px 8px 8px 2px" }}
                        >
                            <ArrowLeft
                                size={18}
                                className="group-hover:-translate-x-0.5 transition-transform"
                            />
                        </div>
                        <span className="font-bold text-sm">Back to News</span>
                    </a>
                </motion.div>

                {/* Content Container */}
                <div className="max-w-5xl mx-auto">
                    {/* Category Badge & Meta */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-wrap items-center gap-4 mb-6"
                    >
                        <div
                            className="text-[#ef1968] px-4 py-1.5 text-xs font-bold uppercase tracking-wider"
                            style={{
                                // backgroundColor: categoryColor,
                                borderRadius: "10px 10px 10px 2px",
                            }}
                        >
                            {article.category}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1.5">
                                <Calendar size={14} />
                                <span>{article.date}</span>
                            </div>
                            <div className="w-1 h-1 rounded-full bg-gray-300" />
                            <div className="flex items-center gap-1.5">
                                <Clock size={14} />
                                <span>{article.date} read</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-8"
                    >
                        {article.title}
                    </motion.h1>

                    {/* Action Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex gap-3 mb-10 md:mb-12"
                    >
                        <button
                            onClick={() => setIsOpen(true)}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-gray-700 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 transition-colors"
                            style={{
                                borderRadius: "12px 12px 12px 3px",
                            }}
                        >
                            <Share2 size={16} />
                            <span className="hidden sm:inline">Share</span>
                        </button>
                        <button
                            className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-gray-700 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 transition-colors"
                            style={{ borderRadius: "12px 12px 12px 3px" }}
                        >
                            <Bookmark size={16} />
                            <span className="hidden sm:inline">Save</span>
                        </button>
                    </motion.div>
                </div>
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[100] bg-gradient-to-br from-black/40 via-black/30 to-black/40 backdrop-blur-md flex items-center justify-center p-4"
                            onClick={() => setIsOpen(false)}
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                transition={{
                                    type: "spring",
                                    damping: 25,
                                    stiffness: 300,
                                }}
                                onClick={(e) => e.stopPropagation()}
                                className="bg-white/95 backdrop-blur-xl shadow-2xl w-full max-w-md"
                                style={{ borderRadius: "32px 32px 32px 8px" }}
                            >
                                {/* Header */}
                                <div className="relative p-6 md:p-8 border-b border-gray-100">
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#ef1968]/5 via-transparent to-[#f7c498]/5" />
                                    <div className="relative flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#ef1968] to-[#f7c498] flex items-center justify-center">
                                                <Share2
                                                    className="text-white"
                                                    size={20}
                                                />
                                            </div>
                                            <div>
                                                <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                                                    Share Article
                                                </h3>
                                                <p className="text-sm text-gray-500">
                                                    Spread the word!
                                                </p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setIsOpen(false)}
                                            className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all"
                                        >
                                            <X size={20} />
                                        </button>
                                    </div>
                                </div>

                                {/* Social Media Grid */}
                                <div className="p-6 md:p-8">
                                    <div className="grid grid-cols-2 gap-4">
                                        {socialMediaLinks.map(
                                            (social, index) => {
                                                const Icon = social.icon;
                                                return (
                                                    <motion.button
                                                        key={social.name}
                                                        initial={{
                                                            opacity: 0,
                                                            scale: 0.8,
                                                        }}
                                                        animate={{
                                                            opacity: 1,
                                                            scale: 1,
                                                        }}
                                                        transition={{
                                                            delay:
                                                                0.1 +
                                                                index * 0.05,
                                                        }}
                                                        onClick={() => {
                                                            handleSocialShare(
                                                                social.url
                                                            );
                                                            setIsOpen(false);
                                                        }}
                                                        className="group relative flex flex-col items-center justify-center gap-3 p-6 hover:scale-105 transition-all"
                                                        style={{
                                                            background: `linear-gradient(135deg, ${social.bgColor}, ${social.color}10)`,
                                                            borderRadius:
                                                                "20px 20px 20px 5px",
                                                        }}
                                                    >
                                                        <div
                                                            className="w-14 h-14 flex items-center justify-center group-hover:scale-110 transition-transform"
                                                            style={{
                                                                backgroundColor:
                                                                    social.color +
                                                                    "20",
                                                                borderRadius:
                                                                    "14px 14px 14px 3px",
                                                            }}
                                                        >
                                                            <Icon
                                                                size={26}
                                                                style={{
                                                                    color: social.color,
                                                                }}
                                                            />
                                                        </div>
                                                        <span className="text-sm font-bold text-gray-900">
                                                            {social.name}
                                                        </span>
                                                    </motion.button>
                                                );
                                            }
                                        )}
                                    </div>

                                    {/* Copy Link Section */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                        className="mt-8 pt-6 border-t border-gray-100"
                                    >
                                        <label className="block text-sm font-bold text-gray-700 mb-3">
                                            Or copy link
                                        </label>
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={currentUrl}
                                                readOnly
                                                className="flex-1 px-4 py-3 text-sm bg-gray-50 border border-gray-200 text-gray-600 outline-none focus:border-gray-300 transition-colors"
                                                style={{
                                                    borderRadius:
                                                        "14px 14px 14px 3px",
                                                }}
                                            />
                                            <motion.button
                                                onClick={handleCopyLink}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="flex items-center gap-2 px-5 py-3 font-bold text-sm transition-all shadow-lg"
                                                style={{
                                                    backgroundColor: copied
                                                        ? "#10B981"
                                                        : "#ef1968",
                                                    color: "white",
                                                    borderRadius:
                                                        "14px 14px 14px 3px",
                                                }}
                                            >
                                                {copied ? (
                                                    <>
                                                        <Check size={18} />
                                                        <span className="hidden sm:inline">
                                                            Copied!
                                                        </span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Link2 size={18} />
                                                        <span className="hidden sm:inline">
                                                            Copy
                                                        </span>
                                                    </>
                                                )}
                                            </motion.button>
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Hero Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="max-w-6xl mx-auto mb-16 md:mb-20"
                >
                    <div
                        className="relative overflow-hidden h-[300px] md:h-[500px] lg:h-[600px]"
                        style={{ borderRadius: "32px 32px 32px 8px" }}
                    >
                        <img
                            src={article.image}
                            alt={article.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
