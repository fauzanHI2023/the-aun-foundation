import { Heart } from "lucide-react";

const mosaicItems = [
    {
        slot: "large",
        items: [
            { img: "/images/IMG_3644-prog.jpg", delay: "9s" },
            { img: "/images/IMG_3644-prog.jpg", delay: "10s" },
            { img: "/images/IMG_3644-prog.jpg", delay: "10s" },
        ],
    },
    {
        slot: "small",
        items: [
            { img: "/images/DSC01885.jpg", delay: "12s" },
            { img: "/images/DSC01885.jpg", delay: "12s" },
            { img: "/images/DSC01885.jpg", delay: "12s" },
        ],
    },
    {
        slot: "small",
        items: [
            { img: "/images/DSC01927.jpg", delay: "12s" },
            { img: "/images/DSC01927.jpg", delay: "12s" },
            { img: "/images/DSC01927.jpg", delay: "12s" },
        ],
    },
];

export function ProgramHeroSection() {
    return (
        <section
            className="relative overflow-hidden"
            style={{
                background:
                    "linear-gradient(135deg, rgb(45 30 9) 0%, rgb(107, 66, 38) 100%)",
            }}
        >
            <div
                className="absolute top-0 right-0 w-96 h-96 opacity-10 pointer-events-none"
                style={{
                    background:
                        "radial-gradient(circle at top right,#fff 0%,transparent 70%)",
                }}
            />
            <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-20 lg:py-20">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                    {/* Left: content */}
                    <div className="flex-1 lg:max-w-[52%]">
                        <span className="eyebrow inline-block px-3 py-1 rounded-full mb-6 bg-white/[0.15] border border-white/20 text-white">
                            Asa Untuk Negeri
                        </span>
                        <h1
                            className="text-white mb-6 font-display font-extrabold leading-none"
                            style={{
                                fontSize: "clamp(38px,6vw,56px)",
                                letterSpacing: "-2px",
                            }}
                        >
                            Five ways we
                            <br />
                            <span className="text-white/55">show up</span> for
                            people.
                        </h1>
                        <p className="max-w-lg mb-10 text-[17px] leading-[1.65] text-white/[0.82]">
                            Structured, faith-inspired humanitarian programs
                            built to meet real needs — from clean water to
                            education, dignity, and a fair economic start.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <a
                                href="/donasi"
                                className="btn-cta-primary bg-primary inline-flex items-center gap-2 px-7 py-3.5 rounded-lg font-semibold text-sm text-white"
                            >
                                <Heart className="text-white" />
                                Donate Now
                            </a>
                            <a
                                href="#section-01pillar"
                                className="btn-cta-ghost inline-flex items-center gap-2 px-7 py-3.5 rounded-lg font-semibold text-sm"
                            >
                                Explore Programs
                            </a>
                        </div>
                    </div>

                    {/* Right: auto-cycling image mosaic */}
                    <div className="flex-1 lg:max-w-[48%] w-full">
                        <div className="hero-mosaic grid grid-cols-2 grid-rows-2 gap-3.5 h-[340px] lg:h-[460px]">
                            {mosaicItems.map((slot, i) => (
                                <div
                                    key={i}
                                    className={`mosaic-slot relative rounded-[22px] overflow-hidden ${
                                        slot.slot === "large"
                                            ? "row-span-2"
                                            : ""
                                    }`}
                                >
                                    {slot.items.map((item, j) => (
                                        <div
                                            key={j}
                                            className="flex items-center justify-center absolute inset-0"
                                            style={{
                                                animationDelay: item.delay,
                                            }}
                                        >
                                            <img
                                                src={item.img}
                                                alt=""
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
