export default function Hero({
    imageUrl,
    tag = "Donasi",
    title,
    description,
    fundedAmount,
    goalAmount,
    percentFunded = 0,
    donors = 1240,
    daysLeft = 14,
}) {
    return (
        <section className="relative h-[500px] min-h-[600px] w-full overflow-hidden">
            <div className="absolute inset-0 z-0">
                <div
                    className="h-full w-full bg-cover bg-center transition-transform duration-1000 hover:scale-105"
                    style={{ backgroundImage: `url('${imageUrl}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
            </div>

            <div className="max-w-container-max px-margin-desktop pb-stack-xl relative z-10 mx-auto flex h-full flex-col justify-end">
                <div className="max-w-2xl text-white">
                    <span className="bg-secondary-container text-on-secondary-container font-label-caps mb-stack-md inline-block rounded-full px-4 py-1">
                        {tag}
                    </span>
                    <h1 className="font-display-lg text-display-lg-mobile md:text-5xl mb-stack-md leading-tight">
                        {title}
                    </h1>
                    {/* <p className="font-body-lg text-body-lg mb-stack-lg text-white/90">
                        {description}
                    </p> */}
                </div>

                {/* Floating Info Card */}
                <div className="glass-card p-stack-lg gap-gutter mt-stack-lg flex max-w-4xl flex-wrap items-center rounded-xl">
                    <div className="min-w-[200px] flex-1">
                        <div className="mb-2 flex items-end justify-between">
                            <span className="font-label-caps text-white">
                                Funded
                            </span>
                            <span className="font-headline-sm text-amber-100">
                                {fundedAmount}
                            </span>
                        </div>
                        <div className="bg-surface-container-highest h-3 w-full overflow-hidden rounded-full">
                            <div
                                className="bg-taupe-500 relative h-full rounded-full"
                                style={{ width: `${percentFunded}%` }}
                            >
                                <div className="bg-secondary-container animate-pulse-amber absolute right-0 top-0 h-full w-4" />
                            </div>
                        </div>
                        <div className="text-white mt-2 flex justify-between text-sm font-medium">
                            <span>Goal: {goalAmount}</span>
                            <span>{percentFunded}% complete</span>
                        </div>
                    </div>

                    <div className="gap-stack-lg border-outline-variant pl-stack-lg flex border-l">
                        <div className="text-center">
                            <p className="font-headline-sm text-amber-100">
                                {donors.toLocaleString()}
                            </p>
                            <p className="font-label-caps text-white">Donors</p>
                        </div>
                        <div className="text-center">
                            <p className="font-headline-sm text-amber-100">
                                {daysLeft}
                            </p>
                            <p className="font-label-caps text-white">
                                Days Left
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
