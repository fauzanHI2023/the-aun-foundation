import {
    Facebook,
    Instagram,
    Twitter,
    Linkedin,
    Mail,
    Phone,
    MapPin,
    Heart,
} from "lucide-react";

export function Footer() {
    const currentYear = new Date().getFullYear();

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <footer className="relative bg-gradient-to-b from-black via-[#1a1410] to-[#2a1f15] text-white overflow-hidden">
            {/* Decorative background */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-[#754c24] rounded-full mix-blend-overlay filter blur-3xl opacity-10"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-600 rounded-full mix-blend-overlay filter blur-3xl opacity-10"></div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid md:grid-cols-4 gap-12 mb-16">
                    {/* About Column */}
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="relative">
                                <img
                                    src="/images/logo aun putih.png"
                                    alt="The Aun Foundation"
                                    className="w-[200px]"
                                />
                            </div>
                        </div>
                        <p className="text-gray-300 leading-relaxed mb-8">
                            A humanitarian organization committed to bringing
                            hope and practical solutions to communities in need
                            through{" "}
                            <span className="text-[#754c24] font-semibold">
                                ta'awun
                            </span>{" "}
                            and sustainable programs.
                        </p>
                        <div className="flex gap-3">
                            <a
                                href="#"
                                className="p-3 bg-gray-800/50 rounded-xl hover:bg-[#754c24] transition-all"
                                aria-label="Facebook"
                            >
                                <Facebook className="w-6 h-6" />
                            </a>
                            <a
                                href="#"
                                className="p-3 bg-gray-800/50 rounded-xl hover:bg-[#754c24] transition-all"
                                aria-label="Instagram"
                            >
                                <Instagram className="w-6 h-6" />
                            </a>
                            <a
                                href="#"
                                className="p-3 bg-gray-800/50 rounded-xl hover:bg-[#754c24] transition-all"
                                aria-label="Twitter"
                            >
                                <Twitter className="w-6 h-6" />
                            </a>
                            <a
                                href="#"
                                className="p-3 bg-gray-800/50 rounded-xl hover:bg-[#754c24] transition-all"
                                aria-label="LinkedIn"
                            >
                                <Linkedin className="w-6 h-6" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold text-xl mb-6">
                            Main Menu
                        </h4>
                        <ul className="space-y-3">
                            <li>
                                <button
                                    onClick={() => scrollToSection("home")}
                                    className="text-gray-300 hover:text-white transition-colors font-medium"
                                >
                                    Home
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => scrollToSection("about")}
                                    className="text-gray-300 hover:text-white transition-colors font-medium"
                                >
                                    About Us
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => scrollToSection("programs")}
                                    className="text-gray-300 hover:text-white transition-colors font-medium"
                                >
                                    Programs
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => scrollToSection("news")}
                                    className="text-gray-300 hover:text-white transition-colors font-medium"
                                >
                                    News
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => scrollToSection("contact")}
                                    className="text-gray-300 hover:text-white transition-colors font-medium"
                                >
                                    Contact
                                </button>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="font-semibold text-xl mb-6">Reach Us</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 group">
                                <div className="p-2 bg-gray-800/50 rounded-lg group-hover:bg-[#754c24] transition-colors">
                                    <Mail className="w-5 h-5 text-amber-400 group-hover:text-white" />
                                </div>
                                <span className="text-gray-300 text-sm mt-2">
                                    contact@theaunfoundation.org
                                </span>
                            </li>
                            <li className="flex items-start gap-3 group">
                                <div className="p-2 bg-gray-800/50 rounded-lg group-hover:bg-[#754c24] transition-colors">
                                    <Phone className="w-5 h-5 text-amber-400 group-hover:text-white" />
                                </div>
                                <span className="text-gray-300 text-sm mt-2">
                                    +62 XXX XXXX XXXX
                                </span>
                            </li>
                            <li className="flex items-start gap-3 group">
                                <div className="p-2 bg-gray-800/50 rounded-lg group-hover:bg-[#754c24] transition-colors">
                                    <MapPin className="w-5 h-5 text-amber-400 group-hover:text-white" />
                                </div>
                                <span className="text-gray-300 text-sm mt-2">
                                    Jakarta, Indonesia
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 mt-12 border-t border-gray-800/50">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-400 text-sm text-center md:text-left flex items-center gap-2">
                            © {currentYear} AUN Foundation. Made with{" "}
                            <Heart className="w-4 h-4 text-red-500 fill-red-500" />{" "}
                            for communities.
                        </p>
                        <div className="flex gap-6 text-sm">
                            <a
                                href="#"
                                className="text-gray-400 hover:text-white transition-colors font-medium"
                            >
                                Privacy Policy
                            </a>
                            <a
                                href="#"
                                className="text-gray-400 hover:text-white transition-colors font-medium"
                            >
                                Terms of Service
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
