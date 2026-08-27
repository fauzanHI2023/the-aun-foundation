export default function SubProgramCard({
    imageLabel,
    title,
    description,
    dark = false,
    layout = "vertical", // "vertical" | "horizontal"
    className = "",
}) {
    const imgBg = dark ? "bg-white/[0.06]" : "bg-bg-subtle";
    const imgLabelColor = dark ? "text-white/40" : "text-text-muted";
    const titleColor = dark ? "text-white" : "text-text-dark";
    const descColor = dark ? "text-white/55" : "text-text-muted";

    if (layout === "horizontal") {
        return (
            <div
                className={`sub-card flex flex-col w-full sm:col-span-2 ${className}`}
            >
                <div
                    className={`sub-img aspect-[18/6] flex items-center justify-center rounded-[20px] overflow-hidden transition-all duration-300 ${imgBg}`}
                >
                    <img
                        src={imageLabel}
                        alt=""
                        className="object-cover w-full h-full"
                    />
                </div>
                <div className="pt-4 flex-1 flex flex-col justify-center">
                    <h3 className={`text-[17px] font-semibold ${titleColor}`}>
                        {title}
                    </h3>
                    <p
                        className={`mt-1.5 text-[13.5px] leading-relaxed ${descColor}`}
                    >
                        {description}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className={`sub-card flex flex-col ${className}`}>
            <div
                className={`sub-img aspect-[4/3] flex items-center justify-center rounded-[20px] overflow-hidden transition-all duration-300 ${imgBg}`}
            >
                <img
                    src={imageLabel}
                    alt=""
                    className="object-cover w-full h-full"
                />
            </div>
            <div className="pt-4">
                <h3 className={`text-[17px] font-semibold ${titleColor}`}>
                    {title}
                </h3>
                <p
                    className={`mt-1.5 text-[13.5px] leading-relaxed ${descColor}`}
                >
                    {description}
                </p>
            </div>
        </div>
    );
}
