import { motion } from "framer-motion";
import { Heart, Target, Award, Users, Handshake } from "lucide-react";

export function OurMission() {
    return (
        <section className="lg:py-24 py-8 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 via-transparent to-secondary/20" />
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#8B6835]/5 rounded-full blur-3xl animate-pulse-slow" />
            <div
                className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#D4A574]/5 rounded-full blur-3xl animate-pulse-slow"
                style={{ animationDelay: "2s" }}
            />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl mb-4 text-foreground font-semibold">
                        Our{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B6835] to-[#D4A574]">
                            Direction
                        </span>
                    </h2>
                    <p className="text-foreground/60 max-w-2xl mx-auto">
                        Guided by a clear vision and driven by purposeful
                        mission
                    </p>
                </div>

                {/* Vision Section - Diagonal Split Design */}
                <div className="mb-32 relative">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        {/* Vision Images - Asymmetric */}
                        <div className="lg:col-span-7 relative lg:h-[600px] h-[300px]">
                            {/* Main Image */}
                            <div className="absolute top-0 left-0 w-[70%] aspect-[2/2] group">
                                <div className="absolute -inset-4 bg-gradient-to-br from-[#8B6835]/30 to-[#D4A574]/20 rounded-[3rem] blur-2xl group-hover:blur-3xl transition-all" />
                                <div className="relative h-full rounded-[3rem] overflow-hidden">
                                    <img
                                        src="/images/IMG_3739.jpg"
                                        alt="Vision Community"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />
                                </div>
                            </div>

                            {/* Secondary Image */}
                            <div className="absolute bottom-0 right-0 w-[55%] aspect-[2/2] group">
                                <div className="absolute -inset-4 bg-gradient-to-tl from-accent/30 to-[#8B6835]/20 rounded-[2.5rem] blur-2xl group-hover:blur-3xl transition-all" />
                                <div className="relative h-full rounded-[2.5rem] overflow-hidden ring-4 ring-white">
                                    <img
                                        src="/images/IMG_9350.jpg"
                                        alt="Vision Support"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                </div>
                            </div>

                            {/* Decorative Element */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border-2 border-[#8B6835]/10 rounded-full" />
                        </div>

                        {/* Vision Content */}
                        <div className="lg:col-span-5 relative">
                            {/* Large V Decoration */}
                            <div className="absolute -left-12 -top-16 text-[180px] font-bold text-[#8B6835]/5 leading-none pointer-events-none hidden lg:block">
                                V
                            </div>

                            <div className="relative z-10">
                                {/* Label with Icon */}
                                <div className="inline-flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#8B6835]/10 to-[#D4A574]/10 flex items-center justify-center">
                                        <Target className="w-6 h-6 text-[#8B6835]" />
                                    </div>
                                    <span className="text-[#8B6835] text-sm tracking-widest uppercase font-semibold">
                                        Our Vision
                                    </span>
                                </div>

                                <h3 className="text-4xl md:text-5xl mb-6 leading-tight">
                                    <span className="text-foreground">
                                        Empowered &
                                    </span>
                                    <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B6835] via-accent to-[#8B6835]">
                                        Compassionate
                                    </span>
                                    <br />
                                    <span className="text-foreground">
                                        Society
                                    </span>
                                </h3>

                                {/* Diagonal Divider */}
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="h-px flex-1 bg-gradient-to-r from-[#8B6835] to-transparent" />
                                    <div className="w-2 h-2 rounded-full bg-[#8B6835]" />
                                    <div className="h-px flex-1 bg-gradient-to-l from-[#8B6835] to-transparent" />
                                </div>

                                <p className="text-xl text-foreground/80 leading-relaxed mb-10">
                                    To build an empowered and compassionate
                                    society where people support one another to
                                    create a dignified and sustainable future.
                                </p>

                                {/* Target Year Badge */}
                                <div className="inline-flex items-center gap-4 px-6 py-4 bg-gradient-to-r from-secondary to-secondary/50 rounded-2xl border-l-4 border-[#8B6835]">
                                    <div className="flex items-center justify-center">
                                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#8B6835] to-[#D4A574] flex items-center justify-center shadow-lg">
                                            <span className="text-white font-bold text-lg">
                                                2030
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-foreground">
                                            Target Achievement
                                        </p>
                                        <p className="text-sm text-foreground/60">
                                            Building the future together
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mission Section - Reverse Diagonal Design */}
                <div className="mb-20 relative">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        {/* Mission Content */}
                        <div className="lg:col-span-5 lg:order-1 relative">
                            {/* Large M Decoration */}
                            <div className="absolute -right-12 -top-16 text-[180px] font-bold text-[#D4A574]/5 leading-none pointer-events-none hidden lg:block">
                                M
                            </div>

                            <div className="relative z-10">
                                {/* Label with Icon */}
                                <div className="inline-flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent/10 to-[#8B6835]/10 flex items-center justify-center">
                                        <Award className="w-6 h-6 text-[#8B6835]" />
                                    </div>
                                    <span className="text-[#8B6835] text-sm tracking-widest uppercase font-semibold">
                                        Our Mission
                                    </span>
                                </div>

                                <h3 className="text-4xl md:text-5xl mb-6 leading-tight">
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B6835] via-[#D4A574] to-[#8B6835]">
                                        Sustainable
                                    </span>
                                    <br />
                                    <span className="text-foreground">
                                        Impact &
                                    </span>
                                    <br />
                                    <span className="text-foreground">
                                        Growth
                                    </span>
                                </h3>

                                {/* Diagonal Divider */}
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="h-px flex-1 bg-gradient-to-r from-[#8B6835] to-transparent" />
                                    <div className="w-2 h-2 rounded-full bg-[#D4A574]" />
                                    <div className="h-px flex-1 bg-gradient-to-l from-[#8B6835] to-transparent" />
                                </div>

                                {/* Mission Points - Modern List */}
                                <div className="space-y-5">
                                    {[
                                        "Mobilize community solidarity in helping vulnerable groups",
                                        "Implement faith-inspired humanitarian programs",
                                        "Empower communities through education & support",
                                        "Expand access to essential needs and facilities",
                                        "Strengthen collaboration with diverse partners",
                                    ].map((item, index) => (
                                        <div
                                            key={index}
                                            className="group/item flex items-start gap-4"
                                        >
                                            {/* Number with gradient line */}
                                            <div className="flex flex-col items-center gap-2">
                                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8B6835] to-[#D4A574] flex items-center justify-center shadow-lg group-hover/item:scale-110 group-hover/item:rotate-6 transition-all">
                                                    <span className="text-white font-bold">
                                                        {index + 1}
                                                    </span>
                                                </div>
                                                {index < 4 && (
                                                    <div className="w-0.5 h-8 bg-gradient-to-b from-[#8B6835]/30 to-transparent" />
                                                )}
                                            </div>
                                            <p className="text-lg text-foreground/80 leading-relaxed pt-1.5 group-hover/item:text-[#8B6835] transition-colors">
                                                {item}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Mission Images - Asymmetric Reverse */}
                        <div className="lg:col-span-7 lg:order-2 relative lg:h-[600px] h-[300px]">
                            {/* Main Image */}
                            <div className="absolute top-0 right-0 w-[70%] aspect-[2/2] group">
                                <div className="absolute -inset-4 bg-gradient-to-bl from-accent/30 to-[#8B6835]/20 rounded-[3rem] blur-2xl group-hover:blur-3xl transition-all" />
                                <div className="relative h-full rounded-[3rem] overflow-hidden">
                                    <img
                                        src="/images/IMG_3769.jpg"
                                        alt="Mission Education"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#8B6835]/40 to-transparent" />
                                </div>
                            </div>

                            {/* Secondary Image */}
                            <div className="absolute bottom-0 left-0 w-[55%] aspect-[2/2] group">
                                <div className="absolute -inset-4 bg-gradient-to-tr from-[#8B6835]/30 to-[#D4A574]/20 rounded-[2.5rem] blur-2xl group-hover:blur-3xl transition-all" />
                                <div className="relative h-full rounded-[2.5rem] overflow-hidden ring-4 ring-white">
                                    <img
                                        src="/images/IMG_9559 (1).jpg"
                                        alt="Mission Empowerment"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                </div>
                            </div>

                            {/* Decorative Element */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border-2 border-[#D4A574]/10 rounded-full rotate-45" />
                        </div>
                    </div>
                </div>

                {/* Supporting Pillars */}
                <div className="relative">
                    <div className="text-center mb-12">
                        <h3 className="text-2xl md:text-3xl text-foreground mb-2">
                            Our{" "}
                            <span className="text-[#8B6835]">Focus Areas</span>
                        </h3>
                        <p className="text-foreground/60">
                            Key areas where we create lasting impact
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                img: "https://images.unsplash.com/photo-1710092784814-4a6f158913b8?w=400",
                                title: "Community First",
                                desc: "Mobilizing solidarity to help vulnerable groups and communities in need",
                                accent: "from-[#8B6835] to-[#D4A574]",
                            },
                            {
                                img: "https://images.unsplash.com/photo-1554721299-e0b8aa7666ce?w=400",
                                title: "Education Focus",
                                desc: "Empowering through education, economic initiatives, and social support",
                                accent: "from-[#8B6835] to-[#8B6835]",
                            },
                            {
                                img: "https://images.unsplash.com/photo-1601662582217-dcfe2ef086ea?w=400",
                                title: "Essential Access",
                                desc: "Expanding access to clean water, food, and community facilities",
                                accent: "from-[#8B6835] to-[#D4A574]",
                            },
                        ].map((item, index) => (
                            <div key={index} className="group relative">
                                <div className="absolute -inset-3 bg-gradient-to-br from-[#8B6835]/10 to-[#D4A574]/10 rounded-3xl blur-xl opacity-50 group-hover:opacity-100 transition-all" />

                                <div className="relative bg-background rounded-3xl overflow-hidden border border-border group-hover:border-[#8B6835]/20 transition-all">
                                    {/* Image */}
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={item.img}
                                            alt={item.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />

                                        {/* Number Badge */}
                                        {/* <div className="absolute top-4 right-4">
                                            <div
                                                className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.accent} flex items-center justify-center shadow-lg`}
                                            >
                                                <span className="text-[#8B6835]-foreground font-bold">
                                                    {index + 1}
                                                </span>
                                            </div>
                                        </div> */}
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        <h4 className="text-xl mb-3 text-foreground group-hover:text-[#8B6835] transition-colors">
                                            {item.title}
                                        </h4>
                                        <p className="text-sm text-foreground/70 leading-relaxed">
                                            {item.desc}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
