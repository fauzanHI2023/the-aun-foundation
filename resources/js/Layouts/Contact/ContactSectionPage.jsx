import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    Mail,
    Phone,
    MapPin,
    Send,
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    Clock,
    MessageCircle,
} from "lucide-react";
import { toast } from "sonner";

export function ContactSectionPage() {
    const contactInfo = [
        {
            icon: Mail,
            title: "Email Us",
            details: [
                "contact@theaunfoundation.org",
                "taf.asauntuknegeri@gmail.com",
            ],
            color: "from-[#ac6c29] to-[#8b5723]",
        },
        {
            icon: Phone,
            title: "Call Us",
            details: ["+62 815-4694-0974"],
            color: "from-[#8b5723] to-[#6d4520]",
        },
        {
            icon: MapPin,
            title: "Visit Us",
            details: [
                "Mayapada Tower 1, 11st Floor, Kuningan South Jakarta",
                "Open Mon-Fri, 9AM-5PM",
            ],
            color: "from-[#d4a574] to-[#ac6c29]",
        },
    ];

    const socialMedia = [
        { name: "Facebook", icon: Facebook, link: "#", color: "#1877F2" },
        { name: "Twitter", icon: Twitter, link: "#", color: "#1DA1F2" },
        { name: "Instagram", icon: Instagram, link: "#", color: "#E4405F" },
        { name: "LinkedIn", icon: Linkedin, link: "#", color: "#0A66C2" },
    ];

    const offices = [
        {
            city: "Registered Office",
            address: "Mayapada Tower 1, 11st Floor, Kuningan South Jakarta",
            phone: "+62 21 XXXX XXXX",
            image: "https://images.unsplash.com/photo-1636987050384-9b079c700f63?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
        },
        {
            city: "Operational Office",
            address: "GKM Green Tower, 20th Floor, TB Simatupang South Jakarta",
            phone: "+62 31 XXXX XXXX",
            image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
        },
    ];

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
            toast.error("Failed to send message");
        }
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section - Split Design */}
            <section className="relative lg:h-[900px] h-full overflow-hidden bg-gradient-to-br from-black via-[#3e2f25] to-[#5f4730]">
                {/* Left Side - Dark */}
                <div className="lg:absolute relative inset-0 lg:w-1/2">
                    <div className="h-full flex items-center justify-center p-8 lg:p-16">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="max-w-xl"
                        >
                            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                                <span className="text-white">Get in</span>
                                <span className="text-transparent bg-clip-text bg-[#ac6c29]">
                                    Touch
                                </span>
                            </h1>
                            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                                Have questions about our programs? Want to get
                                involved? We'd love to hear from you.
                            </p>

                            {/* Contact Info Cards */}
                            <div className="space-y-4">
                                {contactInfo.map((info, index) => {
                                    const Icon = info.icon;
                                    return (
                                        <motion.div
                                            key={info.title}
                                            initial={{ opacity: 0, x: -30 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{
                                                delay: 0.2 + index * 0.1,
                                            }}
                                            className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all"
                                        >
                                            <div
                                                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${info.color} flex items-center justify-center flex-shrink-0`}
                                            >
                                                <Icon className="h-6 w-6 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-white mb-1">
                                                    {info.title}
                                                </h3>
                                                {info.details.map(
                                                    (detail, i) => (
                                                        <p
                                                            key={i}
                                                            className="text-gray-400 text-sm"
                                                        >
                                                            {detail}
                                                        </p>
                                                    )
                                                )}
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>

                            {/* Social Media */}
                            <div className="mt-8 pt-8 border-t border-white/10">
                                <p className="text-gray-400 mb-4">
                                    Follow us on social media
                                </p>
                                <div className="flex gap-3">
                                    {socialMedia.map((social) => {
                                        const Icon = social.icon;
                                        return (
                                            <a
                                                key={social.name}
                                                href={social.link}
                                                className="w-12 h-12 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all hover:scale-110"
                                                style={{
                                                    backgroundColor: `${social.color}20`,
                                                }}
                                            >
                                                <Icon className="h-5 w-5" />
                                            </a>
                                        );
                                    })}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className="lg:absolute relative inset-0 lg:left-1/2 lg:h-[900px] h-full">
                    <div className="h-full flex items-center justify-center p-8 lg:p-16">
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="w-full max-w-xl"
                        >
                            <div className="mb-8">
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ac6c29]/10 border border-[#ac6c29]/30 text-[#ac6c29] text-sm font-medium mb-4">
                                    <MessageCircle className="h-4 w-4" />
                                    Send us a message
                                </div>
                                <h2 className="text-3xl font-bold text-black mb-2">
                                    How can we help you?
                                </h2>
                                <p className="text-gray-600">
                                    Fill out the form and our team will get back
                                    to you within 24 hours
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            id="nama"
                                            name="nama"
                                            placeholder="John"
                                            value={formData.nama}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    nama: e.target.value,
                                                })
                                            }
                                            required
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#ac6c29] focus:ring-2 focus:ring-[#ac6c29]/20 outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                email: e.target.value,
                                            })
                                        }
                                        required
                                        placeholder="john.doe@example.com"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#ac6c29] focus:ring-2 focus:ring-[#ac6c29]/20 outline-none transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        id="subjek"
                                        name="subjek"
                                        value={formData.subjek}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                subjek: e.target.value,
                                            })
                                        }
                                        required
                                        placeholder="Collaborate My Business"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#ac6c29] focus:ring-2 focus:ring-[#ac6c29]/20 outline-none transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        id="pesan"
                                        name="pesan"
                                        value={formData.pesan}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                pesan: e.target.value,
                                            })
                                        }
                                        required
                                        rows={6}
                                        placeholder="Tell us how we can help you..."
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#ac6c29] focus:ring-2 focus:ring-[#ac6c29]/20 outline-none transition-all resize-none"
                                    />
                                </div>

                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="group relative w-full text-white py-4 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#785532] to-[#513417]" />
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
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Office Locations */}
            <section className="lg:py-24 py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl lg:text-5xl font-bold text-black mb-4">
                            Our <span className="text-[#ac6c29]">Offices</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Visit us at any of our locations across Indonesia
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {offices.map((office, index) => (
                            <motion.div
                                key={office.city}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group relative"
                            >
                                <div className="relative h-64 rounded-3xl overflow-hidden mb-6">
                                    <img
                                        src={office.image}
                                        alt={office.city}
                                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                                    <div className="absolute bottom-6 left-6">
                                        <h3 className="text-2xl font-bold text-white">
                                            {office.city}
                                        </h3>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-start gap-3">
                                        <MapPin className="h-5 w-5 text-[#ac6c29] flex-shrink-0 mt-1" />
                                        <p className="text-gray-600">
                                            {office.address}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Phone className="h-5 w-5 text-[#ac6c29] flex-shrink-0" />
                                        <p className="text-gray-600">
                                            {office.phone}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Clock className="h-5 w-5 text-[#ac6c29] flex-shrink-0" />
                                        <p className="text-gray-600">
                                            Mon-Fri, 9:00 AM - 5:00 PM
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className="lg:py-24 py-8 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="rounded-3xl overflow-hidden shadow-2xl">
                        <div className="relative h-[500px] bg-gray-200">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center">
                                    {/* <MapPin className="h-16 w-16 text-[#ac6c29] mx-auto mb-4" />
                                    <p className="text-gray-600 text-lg">
                                        Interactive map would be integrated here
                                    </p>
                                    <p className="text-gray-500 text-sm mt-2">
                                        Using Google Maps or similar service
                                    </p> */}
                                    <div className="mapouter w-[1200px] h-[500px]">
                                        <div className="gmap_canvas w-full h-full">
                                            <iframe
                                                class="gmap_iframe"
                                                width={1200}
                                                height={500}
                                                frameborder="0"
                                                scrolling="no"
                                                marginheight="0"
                                                marginwidth="0"
                                                src="https://maps.google.com/maps?width=1048&amp;height=599&amp;hl=en&amp;q=Mayapada Tower 1, 11st Floor, Kuningan South Jakarta&amp;t=p&amp;z=17&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                                            ></iframe>
                                            <a href="https://embed-googlemap.com">
                                                embed-googlemap.com
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="lg:py-24 py-8 bg-gradient-to-b from-gray-50 to-white">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl lg:text-5xl font-bold text-black mb-4">
                            Frequently Asked{" "}
                            <span className="text-[#ac6c29]">Questions</span>
                        </h2>
                        <p className="text-xl text-gray-600">
                            Quick answers to common questions
                        </p>
                    </motion.div>

                    <div className="space-y-4">
                        {[
                            {
                                q: "How can I volunteer with AUN?",
                                a: "Visit our Programs page to learn about current volunteer opportunities, or contact us directly to discuss how your skills can contribute to our mission.",
                            },
                            {
                                q: "Where does my donation go?",
                                a: "All donations directly support our five core program pillars: Community Facilities, Food Security, Orphans & Children Support, Education & Knowledge, and Economic Empowerment.",
                            },
                            {
                                q: "Can organizations partner with AUN?",
                                a: "Yes! We welcome partnerships with organizations that share our vision. Please reach out through our contact form to discuss collaboration opportunities.",
                            },
                            {
                                q: "How can I stay updated on AUN activities?",
                                a: "Subscribe to our newsletter, follow us on social media, or visit our News page regularly for the latest updates on our programs and impact.",
                            },
                        ].map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all border border-gray-100"
                            >
                                <h3 className="text-lg font-bold text-black mb-2 group-hover:text-[#ac6c29] transition-colors">
                                    {faq.q}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {faq.a}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
