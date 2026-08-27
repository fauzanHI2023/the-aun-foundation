import VerseBlock from "./VerseBlock";
import SubProgramCard from "./SubProgramCard";

export function ProgramsEconomic() {
    return (
        <section id="pillar-03" className="py-24 lg:py-32">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="flex flex-col lg:flex-row gap-14 items-start">
                    <div className="lg:w-[38%] lg:sticky lg:top-10">
                        <div className="pillar-label-row flex items-center gap-3 mb-4">
                            <span className="huge-num font-display font-extrabold leading-none text-[42px] text-light-accent/50">
                                03
                            </span>
                            <span className="eyebrow text-warm-accent">
                                Program Pillar
                            </span>
                        </div>
                        <h2
                            className="font-display font-bold text-text-dark leading-[1.1]"
                            style={{ fontSize: "clamp(30px,3vw,44px)" }}
                        >
                            Economic
                            <br />
                            Empowerment
                        </h2>
                        <p className="mt-5 text-base text-text-muted leading-[1.7]">
                            Strengthening community economic independence
                            through skills training, mentorship, and
                            capacity-building initiatives.
                        </p>

                        <VerseBlock
                            arabic="مَا أَكَلَ أَحَدٌ طَعَامًا قَطُّ خَيْرًا مِنْ أَنْ يَأْكُلَ مِنْ عَمَلِ يَدِهِ"
                            translation="No one has ever eaten a better meal than what he eats from the work of his own hands."
                            source="Hadith Bukhari, No. 2072"
                        />
                    </div>

                    <div className="lg:w-[62%] grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
                        <SubProgramCard
                            imageLabel="/images/20251203_034218432_iOS.jpg"
                            title="Skills Training"
                            description="Practical training programs that build employable, income-generating skills."
                        />
                        <SubProgramCard
                            imageLabel="/images/20251202_063226293_iOS.jpg"
                            title="Micro-Enterprise Support"
                            description="Entrepreneurship support to help small businesses take root and grow."
                        />
                        <SubProgramCard
                            imageLabel="/images/20251202_063226293_iOS.jpg"
                            title="Family Economic Mentoring"
                            description="One-on-one guidance helping families build lasting financial stability."
                        />
                        <SubProgramCard
                            imageLabel="/images/IMG_0839-Edit.jpg"
                            title="Community-Based Empowerment"
                            description="Group-based programs that build collective, self-sustaining economic resilience."
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
