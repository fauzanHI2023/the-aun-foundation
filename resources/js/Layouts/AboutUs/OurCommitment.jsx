import React from "react";

export function OurCommitment() {
    return (
        <section className="relative py-32 overflow-hidden">
            <div className="absolute inset-0">
                <img
                    src="https://images.unsplash.com/photo-1593113598332-cd288d649433?w=1920"
                    alt="Community"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#1A1410]/95 via-[#1A1410]/90 to-[#1A1410]/70" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-background">
                <div className="mb-8">
                    <span className="text-[#D4A574] text-sm tracking-widest uppercase">
                        Our Commitment
                    </span>
                </div>
                <h2 className="text-4xl md:text-5xl mb-8 leading-tight text-white">
                    AUN Asa Untuk Negeri
                </h2>
                <div className="space-y-6 text-lg text-white/90 leading-relaxed">
                    <p>
                        AUN exists to strengthen humanitarian solidarity and
                        bring hope to communities facing various challenges and
                        limitations. The organization is committed to
                        contributing to improved quality of life through
                        inclusive, collaborative, and sustainable humanitarian
                        initiatives.
                    </p>
                    <p>
                        Through its five core program pillars—Community
                        Facilities, Food Security, Orphans & Children Support,
                        Education & Knowledge, and Economic Empowerment—AUN
                        works to expand access to essential services, improve
                        community well-being, and strengthen the capacity of
                        individuals and families to thrive independently.
                    </p>
                    <p>
                        AUN aims to foster resilient and empowered communities
                        where every individual has fair opportunities to live
                        with dignity, access education, and participate in the
                        social and economic development of their communities.
                    </p>
                </div>
            </div>
        </section>
    );
}
