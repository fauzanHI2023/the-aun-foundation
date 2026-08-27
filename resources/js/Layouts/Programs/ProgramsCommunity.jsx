import VerseBlock from "./VerseBlock";
import SubProgramCard from "./SubProgramCard";

export function ProgramsCommunity() {
    return (
        <section id="section-01pillar" className="py-24 lg:py-32">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="flex flex-col lg:flex-row gap-14 items-start">
                    {/* number + intro */}
                    <div className="lg:w-[38%] lg:sticky lg:top-10">
                        <div className="pillar-label-row flex items-center gap-3 mb-4">
                            <span className="text-light-accent font-extrabold leading-none text-[42px] text-light-accent/50">
                                01
                            </span>
                            <span className="text-warm-accent font-display">
                                Program Pillar
                            </span>
                        </div>
                        <h2
                            className="font-display font-bold text-text-dark leading-[1.1]"
                            style={{ fontSize: "clamp(30px,3vw,44px)" }}
                        >
                            Community
                            <br />
                            Facilities
                        </h2>
                        <p className="mt-5 text-base text-text-muted leading-[1.7]">
                            Developing and strengthening public facilities that
                            support social, spiritual, and community well-being
                            — improving quality of life and social cohesion.
                        </p>

                        <VerseBlock
                            arabic="أَفْضَلُ الصَّدَقَةِ سَقْيُ الْمَاءِ"
                            translation="The best charity is providing drinking water."
                            source="Hadith, Abu Daud & An Nasa'i"
                        />
                    </div>

                    {/* sub-programs */}
                    <div className="lg:w-[62%] grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
                        <SubProgramCard
                            imageLabel="https://images.unsplash.com/photo-1554110838-816383ce7956?w=600"
                            title="Mosque Development"
                            description="Construction and renovation of mosques as centers for worship, education, and community activities."
                        />
                        <SubProgramCard
                            imageLabel="https://images.unsplash.com/photo-1601662582217-dcfe2ef086ea?w=600"
                            title="Water for Life"
                            description="Providing access to clean water through well construction, installations, and sustainable water management."
                        />
                        <SubProgramCard
                            imageLabel="https://images.unsplash.com/photo-1581141444721-0e6f8fa8397e?w=1200"
                            title="Community Infrastructure"
                            description="Development of public facilities that support community activities, education, and social well-being — including bridges, classrooms, and clinics."
                            layout="horizontal"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
