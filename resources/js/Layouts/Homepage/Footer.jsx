import { motion } from "framer-motion";
import {
    Heart,
    Mail,
    MapPin,
    Phone,
    Facebook,
    Instagram,
    Twitter,
    Linkedin,
    Youtube,
    MessageCircle,
} from "lucide-react";

export function Footer() {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        main: [
            { name: "About Us", href: "/about" },
            { name: "Program", href: "/programs" },
            { name: "News", href: "/news" },
            { name: "Volunteer", href: "/volunteer" },
        ],
        programs: [
            { name: "RISE", href: "/programs#rise" },
            { name: "THRIVE", href: "/programs#thrive" },
            { name: "CARE+", href: "/programs#care" },
            { name: "SHIELD", href: "/programs#shield" },
            { name: "GREENLIGHT", href: "/programs#greenlight" },
        ],
        legal: [
            { name: "Kebijakan Privasi", href: "#" },
            { name: "Syarat & Ketentuan", href: "#" },
            { name: "Transparansi", href: "#" },
        ],
    };

    const socialMedia = [
        {
            name: "Email",
            icon: Mail,
            href: "mailto:contact@rembulanrelief.org",
            color: "#1877f2",
        },
        { name: "Instagram", icon: Instagram, href: "#", color: "#e4405f" },
        {
            name: "Whatsapp",
            icon: MessageCircle,
            href: "https://wa.me/81539949979",
            color: "#1da1f2",
        },
        { name: "LinkedIn", icon: Linkedin, href: "#", color: "#0a66c2" },
        { name: "YouTube", icon: Youtube, href: "#", color: "#ff0000" },
    ];

    return (
        <footer className="relative bg-gradient-to-b from-gray-900 to-black text-white overflow-hidden">
            {/* Decorative Elements */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.05, 0.1, 0.05],
                }}
                transition={{ duration: 10, repeat: Infinity }}
                className="absolute top-0 right-0 w-96 h-96 bg-[#ef1968] rounded-full blur-3xl"
            />

            <div className="container mx-auto px-6 md:px-12 py-16 relative z-10">
                {/* Top Section */}
                <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-8 mb-12">
                    {/* Brand & About Column - 4 cols */}
                    <div className="lg:col-span-4">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="flex flex-col">
                                <img
                                    src="/images/logo dan nama samping pink PNG.png"
                                    alt="Rembulan Relief"
                                    className="h-16 w-auto"
                                />
                            </div>
                        </div>
                        <p className="text-sm text-gray-300 mb-2 font-semibold">
                            Dignity for a Better Future
                        </p>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            Rembulan Relief Nusantara is dedicated to empowering
                            women and children through education, healthcare,
                            protection, and environmental sustainability. We
                            believe lasting change comes through collective
                            action and human dignity.
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-3">
                            <div className="flex items-start gap-3 text-sm text-gray-400">
                                <MapPin
                                    size={16}
                                    className="text-[#ef1968] mt-0.5 flex-shrink-0"
                                />
                                <span>
                                    Jl. Merdeka Raya No. 123, Jakarta Pusat, DKI
                                    Jakarta 10110, Indonesia
                                </span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-400">
                                <Phone
                                    size={16}
                                    className="text-[#ef1968] flex-shrink-0"
                                />
                                <span>+62 21 1234 5678</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-400">
                                <Mail
                                    size={16}
                                    className="text-[#ef1968] flex-shrink-0"
                                />
                                <span>contact@rembulanrelief.org</span>
                            </div>
                        </div>
                    </div>

                    {/* Main Menu - 2 cols */}
                    <div className="lg:col-span-2">
                        <h4 className="font-bold mb-4 text-white">
                            Menu Utama
                        </h4>
                        <ul className="space-y-2">
                            {footerLinks.main.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="text-gray-400 hover:text-[#ef1968] transition-colors text-sm block"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Programs - 2 cols */}
                    <div className="lg:col-span-2">
                        <h4 className="font-bold mb-4 text-white">
                            Program Kami
                        </h4>
                        <ul className="space-y-2">
                            {footerLinks.programs.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="text-gray-400 hover:text-[#ef1968] transition-colors text-sm"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal & Social - 2 cols */}
                    <div className="lg:col-span-2">
                        <h4 className="font-bold mb-4 text-white">Legal</h4>
                        <ul className="space-y-2 mb-6">
                            {footerLinks.legal.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="text-gray-400 hover:text-[#ef1968] transition-colors text-sm"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social Media - 2 cols */}
                    <div className="lg:col-span-2">
                        <h4 className="font-bold mb-4 text-white">
                            Ikuti Kami
                        </h4>
                        <div className="flex flex-wrap gap-3">
                            {socialMedia.map((social) => {
                                const Icon = social.icon;
                                return (
                                    <a
                                        key={social.name}
                                        href={social.href}
                                        className="w-10 h-10 bg-gray-800 hover:bg-[#ef1968] flex items-center justify-center transition-all duration-300 group"
                                        style={{
                                            borderRadius: "10px 10px 10px 2px",
                                        }}
                                        aria-label={social.name}
                                    >
                                        <Icon
                                            size={18}
                                            className="text-gray-400 group-hover:text-white transition-colors"
                                        />
                                    </a>
                                );
                            })}
                        </div>

                        {/* Newsletter */}
                        {/* <div className="mt-6">
                            <h5 className="font-semibold text-sm mb-2 text-white">
                                Newsletter
                            </h5>
                            <p className="text-xs text-gray-400 mb-3">
                                Dapatkan update terbaru tentang program kami
                            </p>
                            <div className="flex gap-2">
                                <input
                                    type="email"
                                    placeholder="Email Anda"
                                    className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:border-[#ef1968] transition-colors"
                                    style={{ borderRadius: "8px 8px 8px 2px" }}
                                />
                                <button
                                    className="px-4 py-2 bg-[#ef1968] hover:bg-[#d01558] text-white text-xs font-bold transition-colors"
                                    style={{ borderRadius: "8px 8px 8px 2px" }}
                                >
                                    Subscribe
                                </button>
                            </div>
                        </div> */}
                    </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-8" />

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-gray-400 text-sm">
                        © {currentYear} Rembulan Relief Nusantara. All rights
                        reserved.
                    </p>

                    <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="flex items-center gap-2 text-sm text-gray-400"
                    >
                        <span>Made with</span>
                        <Heart
                            className="text-[#ef1968]"
                            size={16}
                            fill="#ef1968"
                        />
                        <span>for a better future</span>
                    </motion.div>
                </div>
            </div>
        </footer>
    );
}
