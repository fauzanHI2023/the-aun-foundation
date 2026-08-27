import useReveal from "../hooks/useReveal";

const trustBadges = [
    { icon: "lock", label: "SSL Secure" },
    { icon: "visibility", label: "100% Transparent" },
    { icon: "verified_user", label: "Verified Audits" },
    { icon: "public", label: "Global Reach" },
];

export default function CTASection() {
    const revealRef = useReveal();

    return (
        <section className="px-margin-desktop bg-white py-16">
            <div
                ref={revealRef}
                className="max-w-container-max mx-auto bg-gradient-to-b from-primary via-primary to-secondary rounded-xl overflow-hidden p-16 relative shadow-2xl reveal"
            >
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                    <svg
                        height="100%"
                        preserveAspectRatio="none"
                        viewBox="0 0 100 100"
                        width="100%"
                    >
                        <pattern
                            height="10"
                            id="grid"
                            patternUnits="userSpaceOnUse"
                            width="10"
                        >
                            <path
                                d="M 10 0 L 0 0 0 10"
                                fill="none"
                                stroke="white"
                                strokeWidth="0.03"
                            />
                        </pattern>
                        <rect fill="url(#grid)" height="100%" width="100%" />
                    </svg>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                    <div className="text-primary-white">
                        <h2 className="font-display-lg text-headline-lg lg:text-display-lg mb-8 leading-tight">
                            Be The Reason Someone Smiles Today.
                        </h2>
                        <p className="font-body-lg text-body-lg opacity-90 mb-10 max-w-lg">
                            Your small contribution can be the turning point for
                            a family in crisis. Join our giving circle and
                            sustain impact for years to come.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <a
                                href="/donasi"
                                className="bg-primary-black text-primary-white px-6 py-3 text-center rounded-xl font-bold text-lg hover:scale-105 transition-all shadow-xl"
                            >
                                Donate Now
                            </a>
                            <button className="bg-primary text-white border border-white/30 px-6 py-3 rounded-xl font-bold text-lg cursor-pointer hover:bg-white/10 transition-all">
                                Explore Campaigns
                            </button>
                        </div>
                    </div>

                    <div className="relative h-[400px]">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="relative w-[24rem] h-[24rem] bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center overflow-hidden">
                                <div
                                    className="w-full h-full bg-cover bg-center opacity-80"
                                    style={{
                                        backgroundImage:
                                            "url('/images/screen.png')",
                                    }}
                                />
                            </div>
                        </div>

                        <div className="absolute top-10 left-0 glass-card p-4 rounded-xl shadow-2xl float-animation">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-secondary-fixed flex items-center justify-center text-primary">
                                    <span className="material-symbols-outlined text-sm">
                                        favorite
                                    </span>
                                </div>
                                <span className="text-sm font-bold">
                                    Donated Rp 250k
                                </span>
                            </div>
                        </div>

                        <div
                            className="absolute bottom-10 right-0 glass-card p-4 rounded-xl shadow-2xl float-animation"
                            style={{ animationDelay: "2s" }}
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-secondary-fixed flex items-center justify-center text-primary">
                                    <span className="material-symbols-outlined text-sm">
                                        favorite
                                    </span>
                                </div>
                                <span className="text-sm font-bold">
                                    Donated Rp 1M
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 pt-12 border-t border-white/20">
                    {trustBadges.map((b) => (
                        <div
                            key={b.label}
                            className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 text-center"
                        >
                            <span className="material-symbols-outlined text-white mb-2 text-3xl">
                                {b.icon}
                            </span>
                            <p className="text-white font-label-md">
                                {b.label}
                            </p>
                        </div>
                    ))}
                </div> */}
            </div>
        </section>
    );
}
