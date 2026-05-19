import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";

export function ContactSection() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log("Form submitted:", formData);
        alert("Thank you for your message! We will get back to you soon.");
        setFormData({ name: "", email: "", phone: "", message: "" });
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <section
            id="contact"
            className="relative py-20 md:py-32 bg-white overflow-hidden"
        >
            {/* Background patterns */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute top-0 left-0 w-96 h-96 bg-[#754c24] rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <p className="text-sm uppercase tracking-widest text-[#754c24] mb-6 font-medium">
                        Let's Connect
                    </p>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
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
                                <div className="group flex items-start gap-4 p-4 bg-white rounded-2xl hover:shadow-lg transition-all">
                                    <div className="p-3 bg-[#382511] rounded-xl">
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

                                <div className="group flex items-start gap-4 p-4 bg-white rounded-2xl hover:shadow-lg transition-all">
                                    <div className="p-3 bg-[#382511] rounded-xl">
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

                                <div className="group flex items-start gap-4 p-4 bg-white rounded-2xl hover:shadow-lg transition-all">
                                    <div className="p-3 bg-[#382511] rounded-xl">
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
                    <div className="lg:col-span-7 p-8 md:p-10 rounded-md bg-[#000000]">
                        <div className="mb-8">
                            <h3 className="text-3xl font-bold text-amber-200 mb-3">
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
                                        htmlFor="name"
                                        className="block text-sm font-medium text-gray-900 mb-3"
                                    >
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
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
                                        onChange={handleChange}
                                        required
                                        className="w-full px-5 py-4 rounded-2xl border-1 border-gray-600 focus:border-[#754c24] focus:outline-none transition-colors bg-gray-700 focus:bg-white"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="phone"
                                    className="block text-sm font-medium text-gray-900 mb-3"
                                >
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full px-5 py-4 rounded-2xl border-1 border-gray-600 focus:border-[#754c24] focus:outline-none transition-colors bg-gray-700 focus:bg-white"
                                    placeholder="+62 XXX XXXX XXXX"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="message"
                                    className="block text-sm font-medium text-gray-900 mb-3"
                                >
                                    Your Message *
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={6}
                                    className="w-full px-5 py-4 rounded-2xl border-1 border-gray-600 focus:border-[#754c24] focus:outline-none transition-colors resize-none bg-gray-700 focus:bg-white"
                                    placeholder="Tell us how we can help you..."
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-[#754c24] text-white px-8 py-4 rounded-full hover:bg-black transition-all flex items-center justify-center gap-2 font-medium"
                            >
                                Send Message
                                <Send className="w-5 h-5" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
