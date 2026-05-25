import React from "react";
import { motion } from "framer-motion";
import {
    Calendar,
    Clock,
    ArrowLeft,
    Facebook,
    Twitter,
    Linkedin,
    Link as LinkIcon,
} from "lucide-react";

export function NewsContentDetailSection() {
    const relatedArticles = [
        {
            title: "Clean Water Access Expanded to 10 Villages",
            image: "https://images.unsplash.com/photo-1556484687-30636164638b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
            category: "Community Facilities",
            date: "April 10, 2026",
        },
        {
            title: "New Educational Initiative Empowers 300 Youth",
            image: "https://images.unsplash.com/photo-1478476868527-002ae3f3e159?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
            category: "Education",
            date: "April 20, 2026",
        },
        {
            title: "Economic Empowerment: 50 Micro-Enterprises Launched",
            image: "https://images.unsplash.com/photo-1655720359248-eeace8c709c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
            category: "Economic Empowerment",
            date: "March 15, 2026",
        },
    ];
    return (
        <section className="py-16 bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-8">
                        <article className="prose prose-lg max-w-none">
                            {/* Introduction */}
                            <div className="text-xl text-gray-700 leading-relaxed mb-12">
                                <p className="mb-6">
                                    The newly inaugurated community center
                                    represents a transformative milestone for
                                    the village of Desa Harapan, where over
                                    2,000 residents now have access to a modern
                                    facility designed to serve multiple
                                    purposes—from education and healthcare to
                                    community gatherings and skill development
                                    programs.
                                </p>
                                <p>
                                    This achievement is the result of 18 months
                                    of collaborative effort between AUN, local
                                    government, community leaders, and hundreds
                                    of volunteers who believed in the vision of
                                    creating a sustainable hub for community
                                    development.
                                </p>
                            </div>

                            {/* Pull Quote */}
                            <div className="relative my-16 py-12 px-8 lg:px-16 bg-gradient-to-br from-[#ac6c29]/5 to-[#d4a574]/5 rounded-3xl border-l-8 border-[#ac6c29]">
                                <Quote className="absolute top-6 left-6 h-12 w-12 text-[#ac6c29]/20" />
                                <blockquote className="relative text-2xl lg:text-3xl font-medium text-gray-900 italic leading-relaxed">
                                    "This center is not just a building—it's a
                                    symbol of hope and opportunity for every
                                    family in our community."
                                </blockquote>
                                <cite className="block mt-6 text-lg text-gray-600 not-italic">
                                    — Village Chief, Desa Harapan
                                </cite>
                            </div>

                            {/* Content Section */}
                            <div className="space-y-8 text-gray-700 leading-relaxed">
                                <div>
                                    <h2 className="text-3xl font-bold text-black mb-6 mt-12">
                                        Building Together: A Community-Led
                                        Initiative
                                    </h2>
                                    <p className="mb-4">
                                        From the very beginning, this project
                                        was designed with community
                                        participation at its core. Local
                                        residents weren't just
                                        beneficiaries—they were active partners
                                        in every phase, from initial planning
                                        sessions to the final construction
                                        stages.
                                    </p>
                                    <p className="mb-4">
                                        More than 150 community members
                                        contributed their time and skills,
                                        working alongside professional
                                        contractors. This collaborative approach
                                        not only reduced costs but also ensured
                                        that the center truly reflected the
                                        needs and aspirations of those who would
                                        use it most.
                                    </p>
                                </div>

                                {/* Image Grid */}
                                <div className="my-16 grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="relative h-80 rounded-2xl overflow-hidden shadow-xl">
                                        <img
                                            src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
                                            alt="Community working together"
                                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="relative h-80 rounded-2xl overflow-hidden shadow-xl">
                                        <img
                                            src="https://images.unsplash.com/photo-1556484687-30636164638b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
                                            alt="Community celebration"
                                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <h2 className="text-3xl font-bold text-black mb-6 mt-12">
                                        Facilities and Services
                                    </h2>
                                    <p className="mb-6">
                                        The 800-square-meter facility houses
                                        multiple functional spaces designed to
                                        address the community's most pressing
                                        needs:
                                    </p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                                        <div className="relative p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:shadow-lg transition-all">
                                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ac6c29] to-[#8b5723] flex items-center justify-center mb-4">
                                                <span className="text-2xl">
                                                    📚
                                                </span>
                                            </div>
                                            <h3 className="text-xl font-bold text-black mb-2">
                                                Learning Center
                                            </h3>
                                            <p className="text-gray-600">
                                                Multi-purpose classrooms for
                                                education programs, adult
                                                literacy classes, and vocational
                                                training
                                            </p>
                                        </div>

                                        <div className="relative p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:shadow-lg transition-all">
                                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ac6c29] to-[#8b5723] flex items-center justify-center mb-4">
                                                <span className="text-2xl">
                                                    🏥
                                                </span>
                                            </div>
                                            <h3 className="text-xl font-bold text-black mb-2">
                                                Health Clinic
                                            </h3>
                                            <p className="text-gray-600">
                                                Basic healthcare services,
                                                maternal health programs, and
                                                regular health screenings
                                            </p>
                                        </div>

                                        <div className="relative p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:shadow-lg transition-all">
                                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ac6c29] to-[#8b5723] flex items-center justify-center mb-4">
                                                <span className="text-2xl">
                                                    🤝
                                                </span>
                                            </div>
                                            <h3 className="text-xl font-bold text-black mb-2">
                                                Community Hall
                                            </h3>
                                            <p className="text-gray-600">
                                                Large gathering space for
                                                meetings, cultural events, and
                                                celebrations
                                            </p>
                                        </div>

                                        <div className="relative p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:shadow-lg transition-all">
                                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ac6c29] to-[#8b5723] flex items-center justify-center mb-4">
                                                <span className="text-2xl">
                                                    💻
                                                </span>
                                            </div>
                                            <h3 className="text-xl font-bold text-black mb-2">
                                                Digital Hub
                                            </h3>
                                            <p className="text-gray-600">
                                                Computer lab with internet
                                                access for digital literacy and
                                                online learning
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h2 className="text-3xl font-bold text-black mb-6 mt-12">
                                        Looking Forward: Sustainable Impact
                                    </h2>
                                    <p className="mb-4">
                                        The center's inauguration marks the
                                        beginning, not the end, of this journey.
                                        AUN has established a local management
                                        committee comprising community members
                                        who will oversee daily operations and
                                        ensure the facility serves its intended
                                        purpose for years to come.
                                    </p>
                                    <p className="mb-4">
                                        Regular programs are already scheduled,
                                        including weekly skill development
                                        workshops, monthly health clinics, and
                                        daily educational activities for
                                        children and adults alike.
                                    </p>
                                    <p>
                                        This project demonstrates what's
                                        possible when communities come together
                                        with shared purpose and support from
                                        dedicated organizations. It serves as a
                                        model for future initiatives across the
                                        region.
                                    </p>
                                </div>
                            </div>

                            {/* Stats Section */}
                            <div className="my-16 grid grid-cols-2 md:grid-cols-4 gap-6">
                                <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-[#ac6c29]/10 to-[#d4a574]/10">
                                    <div className="text-4xl font-bold text-[#ac6c29] mb-2">
                                        2,000+
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        Residents Served
                                    </div>
                                </div>
                                <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-[#ac6c29]/10 to-[#d4a574]/10">
                                    <div className="text-4xl font-bold text-[#ac6c29] mb-2">
                                        150+
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        Community Volunteers
                                    </div>
                                </div>
                                <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-[#ac6c29]/10 to-[#d4a574]/10">
                                    <div className="text-4xl font-bold text-[#ac6c29] mb-2">
                                        800m²
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        Facility Size
                                    </div>
                                </div>
                                <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-[#ac6c29]/10 to-[#d4a574]/10">
                                    <div className="text-4xl font-bold text-[#ac6c29] mb-2">
                                        18
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        Months to Complete
                                    </div>
                                </div>
                            </div>

                            {/* Share Section */}
                            <div className="my-16 p-8 rounded-3xl bg-gradient-to-br from-gray-50 to-white border border-gray-200">
                                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                                    <div>
                                        <h3 className="text-xl font-bold text-black mb-2">
                                            Share this story
                                        </h3>
                                        <p className="text-gray-600">
                                            Help spread the word about our
                                            community impact
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button className="w-12 h-12 rounded-full bg-[#1877F2] flex items-center justify-center text-white hover:scale-110 transition-transform">
                                            <Facebook className="h-5 w-5" />
                                        </button>
                                        <button className="w-12 h-12 rounded-full bg-[#1DA1F2] flex items-center justify-center text-white hover:scale-110 transition-transform">
                                            <Twitter className="h-5 w-5" />
                                        </button>
                                        <button className="w-12 h-12 rounded-full bg-[#0A66C2] flex items-center justify-center text-white hover:scale-110 transition-transform">
                                            <Linkedin className="h-5 w-5" />
                                        </button>
                                        <button className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-white hover:scale-110 transition-transform">
                                            <Share2 className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </div>

                    {/* Sidebar */}
                    <aside className="lg:col-span-4">
                        <div className="sticky top-32 space-y-8">
                            {/* Quick Share */}
                            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#ac6c29] to-[#8b5723] text-white">
                                <h3 className="text-lg font-bold mb-4">
                                    Support Our Work
                                </h3>
                                <p className="text-white/90 mb-6 text-sm leading-relaxed">
                                    Your donation helps us create more community
                                    centers and sustainable programs
                                </p>
                                <button className="w-full px-6 py-3 rounded-full bg-white text-[#ac6c29] font-medium hover:bg-gray-100 transition-all">
                                    Donate Now
                                </button>
                            </div>

                            {/* Related Articles */}
                            <div>
                                <h3 className="text-2xl font-bold text-black mb-6">
                                    Related Stories
                                </h3>
                                <div className="space-y-4">
                                    {relatedArticles.map((related) => (
                                        <Link
                                            key={related.title}
                                            to="/news/detail"
                                            className="group block bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all"
                                        >
                                            <div className="relative h-40 overflow-hidden">
                                                <img
                                                    src={related.image}
                                                    alt={related.title}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 text-[#ac6c29] text-xs font-medium">
                                                    {related.category}
                                                </span>
                                            </div>
                                            <div className="p-4">
                                                <h4 className="font-bold text-black mb-2 line-clamp-2 group-hover:text-[#ac6c29] transition-colors">
                                                    {related.title}
                                                </h4>
                                                <div className="flex items-center text-xs text-gray-500">
                                                    <Calendar className="h-3.5 w-3.5 mr-1" />
                                                    {related.date}
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Newsletter */}
                            <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-900 to-black text-white">
                                <h3 className="text-lg font-bold mb-3">
                                    Stay Updated
                                </h3>
                                <p className="text-white/80 mb-4 text-sm">
                                    Get the latest stories delivered to your
                                    inbox
                                </p>
                                <input
                                    type="email"
                                    placeholder="Your email"
                                    className="w-full px-4 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/50 mb-3 focus:outline-none focus:ring-2 focus:ring-[#ac6c29]"
                                />
                                <button className="w-full px-6 py-3 rounded-full bg-[#ac6c29] text-white font-medium hover:bg-[#8b5723] transition-all">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </section>
    );
}
