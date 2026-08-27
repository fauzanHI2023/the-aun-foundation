import VerseBlock from "./VerseBlock";
import SubProgramCard from "./SubProgramCard";

export function ProgramsEducation() {
    return (
        <section id="pillar-02" className="py-24 lg:py-32 bg-bg-alt">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="flex flex-col lg:flex-row-reverse gap-14 items-start">
                    <div className="lg:w-[38%] lg:sticky lg:top-10">
                        <div className="pillar-label-row flex items-center gap-3 mb-4">
                            <span className="huge-num font-display font-extrabold leading-none text-[42px] text-light-accent/50">
                                02
                            </span>
                            <span className="eyebrow text-warm-accent">
                                Program Pillar
                            </span>
                        </div>
                        <h2
                            className="font-display font-bold text-text-dark leading-[1.1]"
                            style={{ fontSize: "clamp(30px,3vw,44px)" }}
                        >
                            Education &<br />
                            Knowledge
                        </h2>
                        <p className="mt-5 text-base text-text-muted leading-[1.7]">
                            Expanding access to education and knowledge,
                            particularly for young people — a key building block
                            of empowered, sustainable communities.
                        </p>

                        <VerseBlock
                            arabic="وَيَسْأَلُونَكَ عَنِ الْيَتَامَىٰ ۖ قُلْ إِصْلَاحٌ لَّهُمْ خَيْرٌ"
                            translation="...And they ask you about orphans. Say, 'Improvement for them is best.'"
                            source="Al-Baqarah, 220"
                        />
                    </div>

                    <div className="lg:w-[62%] grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
                        <SubProgramCard
                            imageLabel="/images/DSC03117.jpg"
                            title="Children's Education"
                            description="Comprehensive education support for children in need."
                        />
                        <SubProgramCard
                            imageLabel="/images/20251203_034218432_iOS.jpg"
                            title="Qur'an Learning"
                            description="Spiritual education classes for all ages."
                        />
                        <SubProgramCard
                            imageLabel="/images/IMG_5133.jpeg"
                            title="Educational Facilities"
                            description="Support for schools and learning infrastructure."
                        />
                        <SubProgramCard
                            imageLabel="/images/IMG_7322.jpg"
                            title="Youth Development"
                            description="Capacity-building programs for young people."
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
