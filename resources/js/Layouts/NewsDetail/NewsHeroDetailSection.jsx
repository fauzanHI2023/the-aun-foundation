import React from "react";
import { motion } from "framer-motion";
import {
    Calendar,
    Clock,
    ArrowLeft,
    Facebook,
    Twitter,
    Linkedin,
    Share2,
    Link as LinkIcon,
} from "lucide-react";

export function NewsHeroDetailSection({ article }) {
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
        <section className="relative h-[70vh] min-h-[600px] overflow-hidden">
            <img
                src={article.image}
                alt={article.title}
                className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />

            {/* Back Button */}
            <div className="absolute top-8 left-4 sm:left-8 z-10">
                <a
                    href="/news"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all"
                >
                    <ArrowLeft className="h-5 w-5" />
                    <span className="hidden sm:inline">Back to News</span>
                </a>
            </div>

            {/* Share Buttons */}
            <div className="absolute top-8 right-4 sm:right-8 z-10">
                <div className="flex items-center gap-2">
                    {socialMediaLinks.map((social) => {
                        const Icon = social.icon;

                        return (
                            <a
                                key={social.name}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-11 h-11 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all hover:scale-110"
                                aria-label={social.name}
                            >
                                <Icon className="h-5 w-5" />
                            </a>
                        );
                    })}
                </div>
            </div>

            {/* Article Header */}
            <div className="absolute inset-x-0 bottom-0 pb-12">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <span className="px-4 py-2 rounded-full bg-[#ac6c29] text-white text-sm font-medium">
                                {article.category}
                            </span>
                            <div className="flex items-center text-white/90">
                                <Calendar className="h-4 w-4 mr-2" />
                                {article.date}
                            </div>
                            <div className="flex items-center text-white/90">
                                <Clock className="h-4 w-4 mr-2" />
                                {article.readTime}
                            </div>
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                            {article.title}
                        </h1>

                        <p className="text-xl text-white/90 mb-8 max-w-3xl leading-relaxed">
                            {article.excerpt}
                        </p>

                        {/* Author Info */}
                        {/* <div className="flex items-center gap-4">
                            <img
                                src={article.author.avatar}
                                alt={article.author.name}
                                className="w-14 h-14 rounded-full border-2 border-white/30"
                            />
                            <div>
                                <div className="font-semibold text-white">
                                    {article.author.name}
                                </div>
                                <div className="text-sm text-white/70">
                                    {article.author.role}
                                </div>
                            </div>
                        </div> */}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
