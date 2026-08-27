import React from "react";
import {
    Heart,
    Target,
    Award,
    Users,
    Handshake,
    ShieldCheck,
} from "lucide-react";

export function OurValues() {
    return (
        <section className="py-24 relative overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-[#8B6835]/10 to-transparent rounded-full blur-3xl animate-pulse-slow" />
                <div
                    className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-tl from-[#D4A574]/10 to-transparent rounded-full blur-3xl animate-pulse-slow"
                    style={{ animationDelay: "1s" }}
                />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-2">
                    <h2 className="text-4xl md:text-5xl mb-4 text-foreground">
                        Our <span className="text-[#874e0a]">Values</span>
                    </h2>
                    <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
                        The core principles that guide our work and define who
                        we are
                    </p>
                </div>

                {/* Values - Staggered Grid with Hover Animation */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        {
                            icon: Handshake,
                            title: "Ta'awun",
                            subtitle: "Mutual Support",
                            desc: "Encouraging cooperation and collective action in helping others",
                            gradient: "from-[#8B6835]/10 to-[#D4A574]/10",
                            position: "top",
                        },
                        {
                            icon: ShieldCheck,
                            title: "Amanah",
                            subtitle: "Integrity & Trust",
                            desc: "Ensuring all programs are implemented with transparency and accountability",
                            gradient: "from-[#D4A574]/10 to-[#8B6835]/10",
                            position: "middle",
                        },
                        {
                            icon: Heart,
                            title: "Rahmah",
                            subtitle: "Compassion",
                            desc: "Providing assistance with empathy and humanitarian approach",
                            gradient: "from-[#8B6835]/10 to-[#D4A574]/10",
                            position: "top",
                        },
                        {
                            icon: Target,
                            title: "Impact",
                            subtitle: "Meaningful Results",
                            desc: "Creating meaningful and sustainable benefits for communities",
                            gradient: "from-[#D4A574]/10 to-[#8B6835]/10",
                            position: "middle",
                        },
                        {
                            icon: Users,
                            title: "Collaboration",
                            subtitle: "Together Strong",
                            desc: "Working with stakeholders to achieve greater social change",
                            gradient: "from-[#8B6835]/10 to-[#D4A574]/10",
                            position: "top",
                        },
                    ].map((value, index) => (
                        <div
                            key={index}
                            className={`group relative ${
                                value.position === "middle" ? "lg:mt-12" : ""
                            } ${
                                index === 4
                                    ? "md:col-span-2 lg:col-span-1 md:mx-auto md:max-w-md lg:max-w-none"
                                    : ""
                            }`}
                        >
                            {/* Glowing effect on hover */}
                            <div
                                className={`absolute -inset-4 bg-gradient-to-br ${value.gradient} rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500`}
                            />

                            {/* Card */}
                            <div className="relative bg-background rounded-3xl p-8 border-2 border-transparent group-hover:border-[#8B6835]/20 transition-all duration-500 overflow-hidden">
                                {/* Animated background pattern */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#8B6835]/5 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />

                                {/* Icon with rotation animation */}
                                <div className="relative mb-6">
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#8B6835]/10 to-[#D4A574]/10 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                                        <value.icon className="w-8 h-8 text-[#8B6835] group-hover:scale-110 transition-transform duration-500" />
                                    </div>
                                </div>

                                {/* Content */}
                                <h4 className="text-2xl mb-2 text-foreground group-hover:text-[#8B6835] transition-colors duration-300">
                                    {value.title}
                                </h4>
                                <p className="text-sm text-[#8B6835] mb-4 font-medium">
                                    {value.subtitle}
                                </p>

                                {/* Animated divider */}
                                <div className="relative h-px mb-4 bg-border overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#8B6835] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                                </div>

                                <p className="text-foreground/70 leading-relaxed">
                                    {value.desc}
                                </p>

                                {/* Bottom [#D4A574] */}
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#8B6835] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Connecting Lines Decoration */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none hidden lg:block">
                    <svg
                        className="w-full h-full opacity-5"
                        viewBox="0 0 1000 600"
                    >
                        <path
                            d="M 100 100 Q 500 300 900 100"
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="none"
                            className="text-[#8B6835]"
                        />
                        <path
                            d="M 100 500 Q 500 300 900 500"
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="none"
                            className="text-[#D4A574]"
                        />
                    </svg>
                </div>
            </div>
        </section>
    );
}
