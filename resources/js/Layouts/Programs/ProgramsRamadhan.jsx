import VerseBlock from "./VerseBlock";
import SubProgramCard from "./SubProgramCard";

export function ProgramsRamadhan() {
    return (
        <section
            id="pillar-04"
            className="py-24 lg:py-32 relative overflow-hidden"
            style={{
                background: "linear-gradient(160deg,#3A2A1B 0%,#181410 100%)",
            }}
        >
            <div
                className="absolute -top-24 -left-24 w-96 h-96 rounded-full opacity-10 pointer-events-none"
                style={{
                    background:
                        "radial-gradient(circle,#B9873F 0%,transparent 70%)",
                }}
            />
            <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
                <div className="flex flex-col lg:flex-row-reverse gap-14 items-start">
                    <div className="lg:w-[38%] lg:sticky lg:top-10">
                        <div className="pillar-label-row flex items-center gap-3 mb-4">
                            <span className="huge-num font-display font-extrabold leading-none text-[42px] text-white/35">
                                04
                            </span>
                            <span className="eyebrow text-light-accent">
                                Seasonal Initiative
                            </span>
                        </div>
                        <h2
                            className="text-white font-display font-bold leading-[1.1]"
                            style={{ fontSize: "clamp(30px,3vw,44px)" }}
                        >
                            Ramadan
                            <br />
                            Programs
                        </h2>
                        <p className="mt-5 text-base text-white/65 leading-[1.7]">
                            Supporting vulnerable communities while fostering
                            compassion and togetherness during the holy month.
                        </p>

                        <VerseBlock
                            arabic="مَنْ فَطَّرَ صَائِمًا كَانَ لَهُ مِثْلُ أَجْرِهِ"
                            translation="Whoever provides food for a fasting person to break his fast will have a reward like theirs."
                            source="Hadith At-Tirmidzi"
                            dark
                        />
                    </div>

                    <div className="lg:w-[62%] grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
                        <SubProgramCard
                            imageLabel="Community iftar"
                            title="Iftar for Community"
                            description="Shared breaking-of-fast meals for those in need."
                            dark
                        />
                        <SubProgramCard
                            imageLabel="Food packages"
                            title="Ramadan Food Packages"
                            description="Staple food packages delivered to families in need."
                            dark
                        />
                        <SubProgramCard
                            imageLabel="Eid gifts"
                            title="Eid Gifts for Children"
                            description="Bringing joy to children during Eid celebrations."
                            dark
                        />
                        <SubProgramCard
                            imageLabel="Spiritual gathering"
                            title="Ramadan Spiritual Programs"
                            description="Study circles and spiritual activities through the month."
                            dark
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
