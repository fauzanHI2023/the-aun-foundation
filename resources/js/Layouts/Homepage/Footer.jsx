import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export function Footer() {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        about: [
            { name: "Tentang Kami", href: "#" },
            { name: "Tim Kami", href: "#" },
            { name: "Laporan Tahunan", href: "#" },
            { name: "Karir", href: "#" },
        ],
        programs: [
            { name: "RISE", href: "#" },
            { name: "THRIVE", href: "#" },
            { name: "CARE+", href: "#" },
            { name: "SHIELD", href: "#" },
            { name: "GREENLIGHT", href: "#" },
        ],
        resources: [
            { name: "Blog", href: "#" },
            { name: "Publikasi", href: "#" },
            { name: "Media Kit", href: "#" },
            { name: "FAQ", href: "#" },
        ],
        legal: [
            { name: "Kebijakan Privasi", href: "#" },
            { name: "Syarat & Ketentuan", href: "#" },
            { name: "Transparansi", href: "#" },
        ],
    };

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

            <div className="container mx-auto px-4 md:px-6 py-16 relative z-10">
                {/* Top Section */}
                <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
                    {/* Brand Column */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="flex flex-col">
                                <img
                                    src="/images/logo dan nama samping pink PNG.png"
                                    alt="Rembulan Relief"
                                    className="h-16 w-auto"
                                />
                            </div>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Dignity for a Better Future
                        </p>
                    </div>

                    {/* Links Columns */}
                    <div>
                        <h4 className="font-bold mb-4 text-white">Tentang</h4>
                        <ul className="space-y-2">
                            {footerLinks.about.map((link) => (
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

                    <div>
                        <h4 className="font-bold mb-4 text-white">Program</h4>
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

                    <div>
                        <h4 className="font-bold mb-4 text-white">
                            Sumber Daya
                        </h4>
                        <ul className="space-y-2">
                            {footerLinks.resources.map((link) => (
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

                    <div>
                        <h4 className="font-bold mb-4 text-white">Legal</h4>
                        <ul className="space-y-2">
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
                        <span>Made with AltoStd</span>
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
