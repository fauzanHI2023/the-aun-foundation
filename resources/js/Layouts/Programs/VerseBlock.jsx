export default function VerseBlock({
    arabic,
    translation,
    source,
    dark = false,
}) {
    const borderColor = "border-light-accent";
    const arabicColor = dark ? "text-white" : "text-text-dark";
    const translationColor = dark ? "text-white/60" : "text-text-muted";

    return (
        <div className={`pl-4 mt-8 border-l-[3px] ${borderColor}`}>
            <p
                dir="rtl"
                className={`font-arabic mb-2 text-[22px] leading-[1.9] ${arabicColor}`}
            >
                {arabic}
            </p>
            <p className={`italic text-sm leading-relaxed ${translationColor}`}>
                "{translation}"
            </p>
            <footer className="text-xs text-light-accent">— {source}</footer>
        </div>
    );
}
