import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";

export function ContactSection() {
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
        <section
            id="contact"
            className="relative py-20 md:py-32 overflow-hidden"
        >
            {/* Background patterns
            <div className="absolute inset-0 opacity-30">
                <div className="absolute top-0 left-0 w-96 h-96 bg-[#754c24] rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
            </div> */}

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <p className="text-sm uppercase tracking-widest text-[#754c24] mb-6 font-medium">
                        Let's Connect
                    </p>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#7c562c] via-[#d4a574] to-[#ac6c29] mb-6">
                        Get In Touch
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Have questions or want to get involved? We'd love to
                        hear from you
                    </p>
                </div>

                <div className="grid lg:grid-cols-12 gap-12">
                    {/* Contact Information */}
                    <div className="lg:col-span-5 space-y-6">
                        <div className="bg-white p-8 rounded-[2.5rem]">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                Contact Information
                            </h3>
                            <p className="text-gray-700 mb-8 leading-relaxed">
                                Reach out through any of these channels. We're
                                here to answer questions and explore
                                collaboration.
                            </p>

                            <div className="space-y-5">
                                <div className="group flex items-start gap-4 p-4 bg-[#432b12]/10 backdrop-blur-sm border border-[#432b12]/10 hover:bg-[#7b562e]/10 rounded-2xl hover:shadow-lg transition-all">
                                    <div className="p-3 bg-[#846442] rounded-xl">
                                        <Mail className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-900 mb-1">
                                            Email
                                        </h4>
                                        <p className="text-gray-600 text-sm">
                                            contact@theaunfoundation.org
                                        </p>
                                    </div>
                                </div>

                                <div className="group flex items-start gap-4 p-4 bg-[#432b12]/10 backdrop-blur-sm border border-[#432b12]/10 hover:bg-[#7b562e]/10 rounded-2xl hover:shadow-lg transition-all">
                                    <div className="p-3 bg-[#846442] rounded-xl">
                                        <Phone className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-900 mb-1">
                                            Phone
                                        </h4>
                                        <p className="text-gray-600 text-sm">
                                            +62 XXX XXXX XXXX
                                        </p>
                                    </div>
                                </div>

                                <div className="group flex items-start gap-4 p-4 bg-[#432b12]/10 backdrop-blur-sm border border-[#432b12]/10 hover:bg-[#7b562e]/10 rounded-2xl hover:shadow-lg transition-all">
                                    <div className="p-3 bg-[#846442] rounded-xl">
                                        <MapPin className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-900 mb-1">
                                            Address
                                        </h4>
                                        <p className="text-gray-600 text-sm">
                                            Jakarta, Indonesia
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative overflow-hidden bg-[#432b12] p-8 rounded-xl text-white shadow-2xl">
                            <div className="relative">
                                <p className="text-xs uppercase tracking-widest text-white/60 mb-4 font-medium">
                                    Join Us
                                </p>
                                <h4 className="text-2xl font-bold mb-3">
                                    Make an Impact
                                </h4>
                                <p className="text-gray-100 mb-6 leading-relaxed">
                                    Become a volunteer or partner with us to
                                    create meaningful change in communities
                                    across the region.
                                </p>
                                <button className="bg-white text-[#754c24] px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-all">
                                    Learn How to Help
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-7 p-8 md:p-10 rounded-md bg-gradient-to-br from-[#32271f] via-[#1a1410] to-[#2a1f15]">
                        <div className="mb-8">
                            <h3 className="text-3xl font-bold text-white mb-3">
                                Send Us a Message
                            </h3>
                            <p className="text-gray-100">
                                Fill out the form below and we'll get back to
                                you as soon as possible
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label
                                        htmlFor="nama"
                                        className="block text-sm font-medium text-gray-900 mb-3"
                                    >
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="nama"
                                        name="nama"
                                        value={formData.nama}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                nama: e.target.value,
                                            })
                                        }
                                        required
                                        className="w-full px-5 py-4 rounded-2xl border-1 border-gray-600 focus:border-[#754c24] focus:outline-none transition-colors bg-gray-700 focus:bg-white"
                                        placeholder="John Doe"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-gray-900 mb-3"
                                    >
                                        Email Address *
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
                                        className="w-full px-5 py-4 rounded-2xl border-1 border-gray-600 focus:border-[#754c24] focus:outline-none transition-colors bg-gray-700 focus:bg-white"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="subjek"
                                    className="block text-sm font-medium text-gray-900 mb-3"
                                >
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
                                    className="w-full px-5 py-4 rounded-2xl border-1 border-gray-600 focus:border-[#754c24] focus:outline-none transition-colors bg-gray-700 focus:bg-white"
                                    placeholder="+62 XXX XXXX XXXX"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="pesan"
                                    className="block text-sm font-medium text-gray-900 mb-3"
                                >
                                    Your Message *
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
                                    className="w-full px-5 py-4 rounded-2xl border-1 border-gray-600 focus:border-[#754c24] focus:outline-none transition-colors resize-none bg-gray-700 focus:bg-white"
                                    placeholder="Tell us how we can help you..."
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
                    </div>
                </div>
            </div>
        </section>
    );
}
