import React from "react";
import {
    GraduationCap,
    TrendingUp,
    Heart,
    Shield,
    Leaf,
    Building2,
    BookOpen,
    Calendar,
    Users,
    Droplets,
    HandHeart,
    Sparkles,
    ArrowRight,
    BookOpenText,
} from "lucide-react";

export function SeasonalProgramSection() {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl animate-pulse-slow" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20">
                    <span className="text-[#8b5723] text-sm tracking-widest uppercase">
                        Special Initiatives
                    </span>
                    <h2 className="text-4xl font-normal md:font-bold md:text-5xl mt-4 mb-4 text-foreground">
                        Seasonal{" "}
                        <span className="text-[#8b5723]">Programs</span>
                    </h2>
                    <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
                        Important opportunities to strengthen social solidarity
                        and collective compassion
                    </p>
                </div>

                {/* Ramadan Programs - Diagonal Layout */}
                <div className="mb-20">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        <div className="lg:col-span-5 relative">
                            {/* <div className="absolute -left-8 -top-8 text-[100px] font-bold text-primary/5">
                                01
                            </div> */}

                            <div className="relative z-10">
                                <div className="inline-flex items-center gap-3 mb-6">
                                    <Calendar className="w-8 h-8 text-[#8b5723]" />
                                    <span className="text-sm tracking-widest uppercase text-[#8b5723] font-semibold">
                                        Ramadan
                                    </span>
                                </div>

                                <h3 className="text-3xl md:text-4xl mb-6 text-foreground">
                                    Ramadan
                                    <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8b5723] to-[#ac6c29]">
                                        Programs
                                    </span>
                                </h3>

                                <p className="text-lg text-foreground/80 leading-relaxed mb-8">
                                    Supporting vulnerable communities while
                                    fostering compassion and togetherness during
                                    the holy month
                                </p>

                                <div className="grid grid-cols-2 gap-4">
                                    {[
                                        "Iftar for Community",
                                        "Ramadan Food Packages",
                                        "Eid Gifts for Children",
                                        "Ramadan Spiritual Programs",
                                    ].map((item, i) => (
                                        <div
                                            key={i}
                                            className="flex items-start gap-3 p-4 bg-gradient-to-br from-[#f5f5f5]/50 to-transparent rounded-2xl border-l-2 border-[#8b5723]/30 hover:border-[#8b5723] transition-all group"
                                        >
                                            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#8b5723] to-[#ac6c29] flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                                                <span className="text-white text-xs">
                                                    ✓
                                                </span>
                                            </div>
                                            <span className="text-sm text-foreground/80 leading-relaxed">
                                                {item}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-7 relative h-[500px]">
                            <div className="absolute top-0 right-0 w-[65%] h-[70%] group">
                                <div className="absolute -inset-4 bg-gradient-to-bl from-[#8b5723]/30 to-[#ac6c29]/20 blur-2xl group-hover:blur-3xl transition-all" />
                                <img
                                    src="https://images.unsplash.com/photo-1640222495180-60a907961fa2?w=800"
                                    alt="Ramadan iftar"
                                    className="relative w-full h-full object-cover rounded-[2.5rem] ring-4 ring-[#ffffff] group-hover:scale-105 transition-transform duration-700"
                                />
                            </div>

                            <div className="absolute bottom-0 left-0 w-[50%] h-[45%] group">
                                <div className="absolute -inset-3 bg-gradient-to-tr from-accent/30 to-[#8b5723]/20 blur-2xl group-hover:blur-3xl transition-all" />
                                <img
                                    src="https://images.unsplash.com/photo-1776855828554-dfbeed18ffa2?w=600"
                                    alt="Community sharing"
                                    className="relative w-full h-full object-cover rounded-[2rem] ring-4 ring-[#ffffff] group-hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Qurban Programs - Reverse Layout */}
                <div>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        <div className="lg:col-span-7 lg:order-1 relative h-[500px]">
                            <div className="absolute top-0 left-0 w-[65%] h-[70%] group">
                                <div className="absolute -inset-4 bg-gradient-to-br from-accent/30 to-primary/20 blur-2xl group-hover:blur-3xl transition-all" />
                                <img
                                    src="https://images.unsplash.com/photo-1710092784814-4a6f158913b8?w=800"
                                    alt="Qurban distribution"
                                    className="relative w-full h-full object-cover rounded-[2.5rem] ring-4 ring-[#ffffff] group-hover:scale-105 transition-transform duration-700"
                                />
                            </div>

                            <div className="absolute bottom-0 right-0 w-[50%] h-[45%] group">
                                <div className="absolute -inset-3 bg-gradient-to-tl from-primary/30 to-accent/20 blur-2xl group-hover:blur-3xl transition-all" />
                                <img
                                    src="https://images.unsplash.com/photo-1502781252888-9143ba7f074e?w=600"
                                    alt="Community support"
                                    className="relative w-full h-full object-cover rounded-[2rem] ring-4 ring-[#ffffff] group-hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                        </div>

                        <div className="lg:col-span-5 lg:order-2 relative">
                            {/* <div className="absolute -right-8 -top-8 text-[100px] font-bold text-accent/5">
                                02
                            </div> */}

                            <div className="relative z-10">
                                <div className="inline-flex items-center gap-3 mb-6">
                                    <Heart className="w-8 h-8 text-[#ac6c29]" />
                                    <span className="text-sm tracking-widest uppercase text-[#ac6c29] font-semibold">
                                        Qurban
                                    </span>
                                </div>

                                <h3 className="text-3xl md:text-4xl mb-6 text-foreground">
                                    Qurban
                                    <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-[#ac6c29]">
                                        Programs
                                    </span>
                                </h3>

                                <p className="text-lg text-foreground/80 leading-relaxed mb-8">
                                    Ensuring sacrificial meat reaches
                                    communities that rarely receive such
                                    support, particularly in underserved areas
                                </p>

                                <div className="space-y-4">
                                    {[
                                        "Qurban Distribution",
                                        "Community-Based Qurban",
                                        "Qurban for Remote Communities",
                                    ].map((item, i) => (
                                        <div
                                            key={i}
                                            className="flex items-start gap-4 p-5 bg-gradient-to-br from-[#f5f5f5]/50 to-transparent rounded-2xl border-l-2 border-[#ac6c29]/30 hover:border-[#ac6c29] transition-all group"
                                        >
                                            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#ac6c29] to-[#ac6c29] flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all">
                                                <span className="text-white text-sm font-bold">
                                                    {i + 1}
                                                </span>
                                            </div>
                                            <span className="text-black/80 leading-relaxed pt-1">
                                                {item}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
