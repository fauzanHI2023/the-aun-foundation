import { motion } from "framer-motion";
import {
    Mail,
    Phone,
    MapPin,
    Send,
    Facebook,
    Instagram,
    Linkedin,
    Twitter,
    Heart,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function Contact() {
    const [formData, setFormData] = useState({
        nama: "",
        email: "",
        subjek: "",
        pesan: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post("/api/contact", formData);

            toast.success("Pesan berhasil terkirim!", {
                description:
                    "Thanks for reaching out! We'll get back to you within 1-2 business days.",
                duration: 5000,
            });

            setFormData({
                nama: "",
                email: "",
                subjek: "",
                pesan: "",
            });
        } catch (error) {
            console.error(error);
            alert("Failed to send message");
        }
    };

    const contactInfo = [
        {
            icon: Mail,
            title: "Email",
            value: "contact@rembulanrelief.org",
            color: "#ef1968",
        },
        {
            icon: Phone,
            title: "Phone",
            value: "+62-815-3994-9979",
            color: "#f7c498",
        },
        {
            icon: MapPin,
            title: "Address",
            value: "Jl. H. Awi no 39, wibawa mukti II, Jatiasih, Bekasi, Jawa Barat",
            color: "#ef1968",
        },
    ];

    const socialMedia = [
        { icon: Facebook, href: "#", color: "#ef1968" },
        { icon: Instagram, href: "#", color: "#f7c498" },
        { icon: Linkedin, href: "#", color: "#ef1968" },
        { icon: Twitter, href: "#", color: "#f7c498" },
    ];

    return (
        <section
            id="contact"
            className="relative py-12 md:py-24 overflow-hidden bg-gradient-to-b from-white to-[#fef5f8]"
        >
            {/* Animated Background Elements */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 0],
                }}
                transition={{ duration: 20, repeat: Infinity }}
                className="absolute top-0 right-0 w-96 h-96 bg-[#ef1968]/10 rounded-full blur-3xl"
            />
            <motion.div
                animate={{
                    scale: [1, 1.3, 1],
                    rotate: [0, -90, 0],
                }}
                transition={{ duration: 25, repeat: Infinity }}
                className="absolute bottom-0 left-0 w-96 h-96 bg-[#f7c498]/10 rounded-full blur-3xl"
            />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 5, repeat: Infinity }}
                        className="inline-block mb-6"
                    >
                        <Heart
                            className="text-[#ef1968]"
                            size={48}
                            fill="#ef1968"
                        />
                    </motion.div>

                    <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                        Let’s Collaborate
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Together, we can make a bigger impact. Contact us to
                        build a more dignified future.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    {/* Left Side - Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        {/* Contact Cards */}
                        <div className="space-y-6">
                            {contactInfo.map((info, index) => {
                                const Icon = info.icon;
                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -30 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{
                                            duration: 0.6,
                                            delay: index * 0.1,
                                        }}
                                        whileHover={{ x: 10, scale: 1.02 }}
                                        className="group relative cursor-pointer"
                                    >
                                        {/* Soft Glow Background */}
                                        <div
                                            className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl"
                                            style={{
                                                background: `linear-gradient(135deg, ${info.color}20, transparent)`,
                                            }}
                                        />

                                        {/* Card with Glassmorphism */}
                                        <div className="relative bg-white/70 backdrop-blur-md rounded-3xl p-6 border border-gray-100/50 hover:border-gray-200/80 transition-all">
                                            <div className="flex items-center gap-4">
                                                <motion.div
                                                    whileHover={{ rotate: 360 }}
                                                    transition={{
                                                        duration: 0.6,
                                                    }}
                                                    className="relative w-16 h-16 rounded-2xl flex items-center justify-center overflow-hidden"
                                                >
                                                    <div
                                                        className="absolute inset-0 opacity-10"
                                                        style={{
                                                            backgroundColor:
                                                                info.color,
                                                        }}
                                                    />
                                                    <Icon
                                                        size={28}
                                                        style={{
                                                            color: info.color,
                                                        }}
                                                        className="relative z-10"
                                                    />
                                                </motion.div>
                                                <div>
                                                    <div className="text-sm text-gray-500 mb-1">
                                                        {info.title}
                                                    </div>
                                                    <div className="font-bold text-gray-900 text-lg">
                                                        {info.value}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Why Collaborate Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="relative rounded-[2.5rem] p-8 text-white overflow-hidden"
                        >
                            {/* Animated Gradient Background */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#ef1968] to-[#d01558]" />

                            {/* Soft Glow Effects */}
                            <motion.div
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.15, 0.25, 0.15],
                                }}
                                transition={{ duration: 4, repeat: Infinity }}
                                className="absolute -bottom-10 -right-10 w-40 h-40 bg-white rounded-full blur-2xl"
                            />

                            <motion.div
                                animate={{
                                    scale: [1.1, 1, 1.1],
                                    opacity: [0.1, 0.2, 0.1],
                                }}
                                transition={{ duration: 5, repeat: Infinity }}
                                className="absolute -top-10 -left-10 w-32 h-32 bg-white rounded-full blur-2xl"
                            />

                            <h3 className="text-2xl font-bold mb-4 relative z-10">
                                Why Collaborate?
                            </h3>
                            <ul className="space-y-3 relative z-10">
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <div className="w-2 h-2 rounded-full bg-white" />
                                    </div>
                                    <span>
                                        Direct impact on women and children
                                    </span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <div className="w-2 h-2 rounded-full bg-white" />
                                    </div>
                                    <span>
                                        Full transparency and accountability
                                    </span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <div className="w-2 h-2 rounded-full bg-white" />
                                    </div>
                                    <span>
                                        Sustainable and measurable programs
                                    </span>
                                </li>
                            </ul>
                        </motion.div>

                        {/* Social Media */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                        >
                            <h4 className="font-bold text-gray-900 mb-4">
                                Ikuti Kami
                            </h4>
                            <div className="flex gap-4">
                                {socialMedia.map((social, index) => {
                                    const Icon = social.icon;
                                    return (
                                        <motion.a
                                            key={index}
                                            href={social.href}
                                            whileHover={{
                                                scale: 1.2,
                                                rotate: 360,
                                            }}
                                            whileTap={{ scale: 0.9 }}
                                            className="relative w-12 h-12 rounded-full flex items-center justify-center transition-all group"
                                        >
                                            {/* Soft Glow on Hover */}
                                            <div
                                                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity blur-lg"
                                                style={{
                                                    backgroundColor: `${social.color}40`,
                                                }}
                                            />
                                            {/* Background */}
                                            <div
                                                className="absolute inset-0 rounded-full"
                                                style={{
                                                    backgroundColor: `${social.color}15`,
                                                }}
                                            />
                                            <Icon
                                                size={20}
                                                style={{ color: social.color }}
                                                className="relative z-10"
                                            />
                                        </motion.a>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right Side - Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="relative bg-white/80 backdrop-blur-sm rounded-[2.5rem] p-8 md:p-10 border border-gray-100/50">
                            {/* Subtle Gradient Glow */}
                            <div className="absolute -inset-0.5 bg-gradient-to-br from-[#ef1968]/10 via-transparent to-[#f7c498]/10 rounded-[2.5rem] -z-10 blur-xl opacity-50" />

                            <h3 className="text-2xl font-bold text-gray-900 mb-6">
                                Send a Message
                            </h3>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label
                                        htmlFor="nama"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="nama"
                                        required
                                        value={formData.nama}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                nama: e.target.value,
                                            })
                                        }
                                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#ef1968] focus:ring-2 focus:ring-[#ef1968]/20 outline-none transition-all"
                                        placeholder="Enter your name"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                email: e.target.value,
                                            })
                                        }
                                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#ef1968] focus:ring-2 focus:ring-[#ef1968]/20 outline-none transition-all"
                                        placeholder="email@contoh.com"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="subjek"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        id="subjek"
                                        value={formData.subjek}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                subjek: e.target.value,
                                            })
                                        }
                                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#ef1968] focus:ring-2 focus:ring-[#ef1968]/20 outline-none transition-all"
                                        placeholder="How can we collaborate?"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="pesan"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        Message *
                                    </label>
                                    <textarea
                                        id="pesan"
                                        required
                                        value={formData.pesan}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                pesan: e.target.value,
                                            })
                                        }
                                        rows={5}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#ef1968] focus:ring-2 focus:ring-[#ef1968]/20 outline-none transition-all resize-none"
                                        placeholder="Tell us how you’d like to collaborate..."
                                    />
                                </div>

                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="group relative w-full text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#ef1968] to-[#f7c498]" />
                                    <motion.div
                                        animate={{
                                            x: ["-200%", "200%"],
                                        }}
                                        transition={{
                                            duration: 3,
                                            repeat: Infinity,
                                            ease: "linear",
                                        }}
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12"
                                    />
                                    <span className="relative z-10">
                                        Send a Message
                                    </span>
                                    <Send
                                        size={20}
                                        className="relative z-10 group-hover:translate-x-1 transition-transform"
                                    />
                                </motion.button>
                            </form>

                            <p className="text-sm text-gray-500 mt-4 text-center">
                                We will respond within 1–2 business days
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Bottom Quote */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mt-20 text-center"
                >
                    <div className="max-w-3xl mx-auto">
                        <p className="text-2xl md:text-3xl italic text-gray-700 leading-relaxed">
                            "Every collaboration is a step toward a more
                            dignified future"
                        </p>
                        <div className="mt-6 h-1 w-32 bg-gradient-to-r from-[#ef1968] to-[#f7c498] mx-auto rounded-full" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
