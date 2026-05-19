import { motion } from "framer-motion";
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

export function ProgramsBanner() {
    return (
        <section className="py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20">
                    <h2 className="text-4xl font-bold md:text-5xl mb-4 text-foreground">
                        Core{" "}
                        <span className="text-[#8b5723]">Program Pillars</span>
                    </h2>
                </div>

                {/* Community Facilities */}
                <div className="mb-32">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start mb-12">
                        <div className="lg:col-span-1 lg:sticky lg:top-24">
                            <div className="inline-flex items-center gap-4 mb-6 bg-[#8b5723]/5 px-6 py-3 rounded-full">
                                <Building2 className="w-6 h-6 text-[#8b5723]" />
                                <span className="text-sm text-[#8b5723] tracking-wide">
                                    PILLAR 01
                                </span>
                            </div>
                            <h3 className="text-4xl md:text-5xl mb-6 text-foreground">
                                Community
                                <br />
                                Facilities
                            </h3>
                            <p className="text-lg text-foreground/70 leading-relaxed mb-8">
                                This pillar focuses on developing and
                                strengthening public facilities that support
                                social, spiritual, and community well-being.
                            </p>
                            <div className="h-px w-full bg-gradient-to-r from-primary/30 to-transparent" />
                        </div>

                        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="group relative overflow-hidden rounded-3xl">
                                <img
                                    src="https://images.unsplash.com/photo-1554110838-816383ce7956?w=600"
                                    alt="Mosque"
                                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1410]/90 via-[#1A1410]/40 to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 p-6 text-[#FEFDFB]">
                                    <Building2 className="w-8 h-8 mb-3" />
                                    <h4 className="text-xl mb-2">
                                        Mosque Development
                                    </h4>
                                    <p className="text-sm text-background/80">
                                        Construction and renovation of mosques
                                        as centers for worship and community
                                    </p>
                                </div>
                            </div>

                            <div className="group relative overflow-hidden rounded-3xl">
                                <img
                                    src="https://images.unsplash.com/photo-1601662582217-dcfe2ef086ea?w=600"
                                    alt="Water"
                                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1410]/90 via-[#1A1410]/40 to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 p-6 text-[#FEFDFB]">
                                    <Droplets className="w-8 h-8 mb-3" />
                                    <h4 className="text-xl mb-2">
                                        Water for Life
                                    </h4>
                                    <p className="text-sm text-background/80">
                                        Providing access to clean water through
                                        sustainable management systems
                                    </p>
                                </div>
                            </div>

                            <div className="md:col-span-2 group relative overflow-hidden rounded-3xl">
                                <img
                                    src="https://images.unsplash.com/photo-1581141444721-0e6f8fa8397e?w=1200"
                                    alt="Infrastructure"
                                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1410]/90 via-[#1A1410]/40 to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 p-6 text-[#FEFDFB]">
                                    <div className="p-8 text-background max-w-lg">
                                        <Users className="w-8 h-8 mb-3" />
                                        <h4 className="text-2xl mb-2">
                                            Community Infrastructure
                                        </h4>
                                        <p className="text-background/80">
                                            Development of public facilities
                                            including bridges, classes, clinics,
                                            and more
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Education & Knowledge */}
                <div className="mb-32">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start mb-12">
                        <div className="lg:col-span-1 lg:order-2 lg:sticky lg:top-24">
                            <div className="inline-flex items-center gap-4 mb-6 bg-[#8b5723]/10 px-6 py-3 rounded-full">
                                <BookOpen className="w-6 h-6 text-[#8b5723]" />
                                <span className="text-sm text-[#8b5723] tracking-wide">
                                    PILLAR 02
                                </span>
                            </div>
                            <h3 className="text-4xl md:text-5xl mb-6 text-foreground">
                                Education &<br />
                                Knowledge
                            </h3>
                            <p className="text-lg text-foreground/70 leading-relaxed mb-8">
                                This pillar aims to expand access to education
                                and knowledge, particularly for young people.
                            </p>
                            <div className="h-px w-full bg-gradient-to-r from-[#8b5723]/30 to-transparent" />
                        </div>

                        <div className="lg:col-span-2 lg:order-1">
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-[#F5E6D3]/10 p-8 rounded-3xl border-l-4 border-[#8B6835] hover:bg-[#ffffff]/20 transition-colors">
                                        <GraduationCap className="w-10 h-10 text-[#8B6835] mb-4" />
                                        <h4 className="text-xl mb-2 text-[#1A1410]">
                                            Children's Education
                                        </h4>
                                        <p className="text-[#1A1410]/70">
                                            Comprehensive education support for
                                            children in need
                                        </p>
                                    </div>
                                    <div className="bg-[#F5E6D3]/10 p-8 rounded-3xl border-l-4 border-[#D4A574] hover:bg-[#ffffff]/20 transition-colors">
                                        <BookOpen className="w-10 h-10 text-[#8B6835] mb-4" />
                                        <h4 className="text-xl mb-2 text-[#1A1410]">
                                            Qur'an Learning
                                        </h4>
                                        <p className="text-[#1A1410]/70">
                                            Spiritual education programs for all
                                            ages
                                        </p>
                                    </div>
                                    <div className="bg-[#F5E6D3]/10 p-8 rounded-3xl border-l-4 border-[#8B6835] hover:bg-[#ffffff]/20 transition-colors">
                                        <GraduationCap className="w-10 h-10 text-[#8B6835] mb-4" />
                                        <h4 className="text-xl mb-2 text-[#1A1410]">
                                            Support for educational facilities
                                        </h4>
                                        <p className="text-[#1A1410]/70">
                                            Comprehensive education support for
                                            children in need
                                        </p>
                                    </div>
                                    <div className="bg-[#F5E6D3]/10 p-8 rounded-3xl border-l-4 border-[#D4A574] hover:bg-[#ffffff]/20 transition-colors">
                                        <BookOpenText className="w-10 h-10 text-[#8B6835] mb-4" />
                                        <h4 className="text-xl mb-2 text-[#1A1410]">
                                            Youth capacity development
                                        </h4>
                                        <p className="text-[#1A1410]/70">
                                            Spiritual education programs for all
                                            ages
                                        </p>
                                    </div>
                                </div>
                                <div className="relative h-96 rounded-3xl overflow-hidden">
                                    <img
                                        src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200"
                                        alt="Children learning"
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A1410]/80 to-transparent flex items-end">
                                        <div className="p-8 text-[#ffffff]">
                                            <p className="text-2xl mb-2">
                                                Children
                                            </p>
                                            <p className="text-[#ffffff]/80">
                                                Receiving quality education
                                                support
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Economic Empowerment */}
                <div className="mb-32">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                        <div className="lg:col-span-1 lg:sticky lg:top-24">
                            <div className="inline-flex items-center gap-4 mb-6 bg-[#8b5723]/5 px-6 py-3 rounded-full">
                                <TrendingUp className="w-6 h-6 text-[#8b5723]" />
                                <span className="text-sm text-[#8b5723] tracking-wide">
                                    PILLAR 03
                                </span>
                            </div>
                            <h3 className="text-4xl md:text-5xl mb-6 text-foreground">
                                Economic
                                <br />
                                Empowerment
                            </h3>
                            <p className="text-lg text-foreground/70 leading-relaxed mb-8">
                                This pillar focuses on strengthening community
                                economic independence through various
                                empowerment initiatives.
                            </p>
                            <div className="h-px w-full bg-gradient-to-r from-[#8b5723]/30 to-transparent" />
                        </div>

                        <div className="lg:col-span-2">
                            <div className="grid grid-cols-2 gap-6 mb-6">
                                <img
                                    src="https://images.unsplash.com/photo-1617817546276-80b86dd60151?w=400"
                                    alt="Skills training"
                                    className="rounded-3xl w-full h-56 object-cover"
                                />
                                <img
                                    src="https://images.unsplash.com/photo-1644726270363-e746b37b482b?w=400"
                                    alt="Community work"
                                    className="rounded-3xl w-full h-56 object-cover"
                                />
                            </div>
                            <div className="bg-gradient-to-br from-primary/10 to-accent/10 p-10 rounded-3xl">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div>
                                        <div className="text-4xl text-primary mb-2">
                                            50+
                                        </div>
                                        <p className="text-foreground/70">
                                            Entrepreneurs trained
                                        </p>
                                    </div>
                                    <div>
                                        <div className="text-4xl text-primary mb-2">
                                            80
                                        </div>
                                        <p className="text-foreground/70">
                                            Families mentored
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
