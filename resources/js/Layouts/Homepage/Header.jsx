import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Header() {
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { name: "Tentang Kami", href: "/aboutus" },
        { name: "Program", href: "#vision" },
        { name: "Berita", href: "#programs" },
        { name: "Kontak", href: "#news" },
        { name: "Volunteer", href: "#contact" },
    ];

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100"
        >
            <div className="container mx-auto px-4 md:px-6 py-4">
                <div className="flex items-center justify-between">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="flex items-center"
                    >
                        <img
                            src="/images/logo dan nama samping pink PNG.png"
                            alt="Rembulan Relief"
                            className="h-16 w-auto"
                        />
                    </motion.div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navItems.map((item, index) => (
                            <motion.a
                                key={item.name}
                                href={item.href}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * index }}
                                className="text-gray-700 hover:text-[#ef1968] transition-colors font-medium"
                            >
                                {item.name}
                            </motion.a>
                        ))}
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 }}
                            className="bg-[#ef1968] text-white px-6 py-2 rounded-full hover:bg-[#d01558] transition-colors"
                        >
                            Donasi
                        </motion.button>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden text-gray-900"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isOpen && (
                    <motion.nav
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden mt-4 pb-4 space-y-4"
                    >
                        {navItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className="block text-gray-700 hover:text-[#ef1968] transition-colors font-medium"
                            >
                                {item.name}
                            </a>
                        ))}
                        <button className="w-full bg-[#ef1968] text-white px-6 py-2 rounded-full hover:bg-[#d01558] transition-colors">
                            Donasi
                        </button>
                    </motion.nav>
                )}
            </div>
        </motion.header>
    );
}
