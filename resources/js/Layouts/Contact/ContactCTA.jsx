import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

export function ContactCTA() {
    const contactMethods = [
        {
            icon: Mail,
            title: "Email Us",
            value: "contact@rembulanrelief.org",
            description: "We'll respond within 24 hours",
            color: "#ef1968",
        },
        {
            icon: Phone,
            title: "Call Us",
            value: "+62 21 1234 5678",
            description: "Mon-Fri, 9AM-5PM WIB",
            color: "#f7c498",
        },
        {
            icon: MapPin,
            title: "Visit Us",
            value: "Jakarta, Indonesia",
            description: "Schedule an appointment",
            color: "#ef1968",
        },
    ];

    return (
        <section className="relative py-12 md:py-16 bg-white overflow-hidden">
            {/* Subtle Background with NGO Images */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Diverse People Fist Bump - Background Pattern */}
                <motion.div
                    animate={{
                        scale: [1, 1.05, 1],
                        opacity: [0.03, 0.05, 0.03],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute top-0 left-0 w-full h-full opacity-[0.04]"
                >
                    <img
                        src="https://images.unsplash.com/photo-1745962979027-c5e51183cf40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxkaXZlcnNlJTIwcGVvcGxlJTIwY29ubmVjdGlvbiUyMHVuaXR5JTIwc3VwcG9ydHxlbnwxfHx8fDE3NzYwMDE5MDN8MA&ixlib=rb-4.1.0&q=80&w=1080"
                        alt="Unity and collaboration"
                        className="w-full h-full object-cover grayscale"
                    />
                </motion.div>

                {/* Community Group - Floating Accent */}
                <motion.div
                    animate={{
                        y: [0, -15, 0],
                        x: [0, 10, 0],
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute top-10 right-20 w-72 h-72 opacity-8 blur-xl pointer-events-none rounded-full overflow-hidden"
                >
                    <img
                        src="https://images.unsplash.com/photo-1517174228281-88bc12c11758?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21lbiUyMGVtcG93ZXJtZW50JTIwY29tbXVuaXR5JTIwaGVscGluZyUyMHRvZ2V0aGVyfGVufDF8fHx8MTc3NjAwMTkwMnww&ixlib=rb-4.1.0&q=80&w=1080"
                        alt="Community together"
                        className="w-full h-full object-cover grayscale opacity-50"
                    />
                </motion.div>
            </div>

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {contactMethods.map((method, index) => {
                        const Icon = method.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <a
                                    href={
                                        method.icon === Mail
                                            ? `mailto:${method.value}`
                                            : method.icon === Phone
                                            ? `tel:${method.value}`
                                            : "#"
                                    }
                                    className="block group"
                                >
                                    <div
                                        className="p-6 bg-white border-2 border-gray-100 hover:border-gray-200 transition-all h-full"
                                        style={{
                                            borderRadius: "24px 24px 24px 6px",
                                        }}
                                    >
                                        <div
                                            className="w-12 h-12 flex items-center justify-center mb-4"
                                            style={{
                                                backgroundColor: `${method.color}15`,
                                                borderRadius:
                                                    "12px 12px 12px 3px",
                                            }}
                                        >
                                            <Icon
                                                size={24}
                                                style={{ color: method.color }}
                                            />
                                        </div>
                                        <h3 className="font-bold text-gray-900 mb-2">
                                            {method.title}
                                        </h3>
                                        <p className="text-sm font-medium text-gray-900 mb-1">
                                            {method.value}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {method.description}
                                        </p>
                                    </div>
                                </a>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
