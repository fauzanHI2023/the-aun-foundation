import VerseBlock from "./VerseBlock";
import SubProgramCard from "./SubProgramCard";

export function ProgramsQurban() {
    return (
        <section id="pillar-05" className="py-24 lg:py-32 bg-bg-alt">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="flex flex-col lg:flex-row gap-14 items-start">
                    <div className="lg:w-[38%] lg:sticky lg:top-10">
                        <div className="pillar-label-row flex items-center gap-3 mb-4">
                            <span className="huge-num font-display font-extrabold leading-none text-[42px] text-light-accent/50">
                                05
                            </span>
                            <span className="eyebrow text-warm-accent">
                                Seasonal Initiative
                            </span>
                        </div>
                        <h2
                            className="font-display font-bold text-text-dark leading-[1.1]"
                            style={{ fontSize: "clamp(30px,3vw,44px)" }}
                        >
                            Qurban
                            <br />
                            Programs
                        </h2>
                        <p className="mt-5 text-base text-text-muted leading-[1.7]">
                            Ensuring sacrificial meat reaches communities that
                            rarely receive such support, particularly in
                            underserved areas.
                        </p>

                        <VerseBlock
                            arabic="لَن يَنَالَ اللَّهَ لُحُومُهَا وَلَا دِمَاؤُهَا وَلَٰكِن يَنَالُهُ التَّقْوَىٰ مِنكُمْ"
                            translation="Neither their meat nor blood reaches Allah. Rather, it is your piety that reaches Him."
                            source="Al-Hajj, 37"
                        />
                    </div>

                    <div className="lg:w-[62%] grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-10">
                        <SubProgramCard
                            imageLabel="Meat distribution"
                            title="Qurban Distribution"
                            description="Direct distribution of qurban meat to families in need."
                        />
                        <SubProgramCard
                            imageLabel="Local community"
                            title="Community-Based Qurban"
                            description="Locally organized qurban that strengthens community ties."
                        />
                        <SubProgramCard
                            imageLabel="Remote village"
                            title="Qurban for Remote Communities"
                            description="Reaching underserved, hard-to-access areas each year."
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
