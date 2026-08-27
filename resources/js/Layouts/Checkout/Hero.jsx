export default function Hero({
    imageUrl,
    title = "Turn Compassion into Action",
    percentRaised = 72,
    goalAmount = "$200,000",
    raisedLabel = "$144,000 raised from 1,240 global contributors",
}) {
    return (
        <section className="relative h-[65vh] w-full overflow-hidden">
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${imageUrl}')` }}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            </div>

            <div className="relative z-10 h-full flex flex-col justify-end items-center text-center md:py-[4rem] py-6 max-w-[1200px] mx-auto text-white">
                <h1 className="font-display-lg text-display-lg mb-base animate-fade-up">
                    {title}
                </h1>

                <div
                    className="w-full max-w-2xl animate-fade-up"
                    style={{ animationDelay: "0.2s" }}
                >
                    <div className="flex justify-between mb-2 font-label-md">
                        <span>{percentRaised}% Raised</span>
                        <span>Goal: {goalAmount}</span>
                    </div>
                    <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
                        <div
                            className="progress-bar-fill h-full bg-primary-fixed-dim"
                            style={{ width: `${percentRaised}%` }}
                        />
                    </div>
                    <p className="mt-4 font-body-lg text-white/90">
                        {raisedLabel}
                    </p>
                </div>
            </div>
        </section>
    );
}
