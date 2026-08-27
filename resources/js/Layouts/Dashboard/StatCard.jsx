import { useRef } from "react";
import { useCountUp } from "./useCountUp";
import Sparkline from "./Sparkline";

const iconBg = {
    primary: "bg-[#ffb875]/[0.14] text-[#ffb875]",
    success: "bg-[#333a25] text-[#b7c793]",
    secondary: "bg-[#3a3c3c] text-[#c6c6c7]",
    tertiary: "bg-[#c8c6c2]/[0.14] text-[#c8c6c2]",
};

const trendUp = (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        className="w-2.5 h-2.5"
    >
        <path d="M6 15l6-6 6 6" />
    </svg>
);

export default function StatCard({
    icon,
    iconVariant,
    trend,
    isRupiah,
    target,
    label,
    sparkline,
    sparkColor,
    hero,
}) {
    const value = useCountUp(target);
    const ref = useRef(null);

    function handleMouseMove(e) {
        if (!hero || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        ref.current.style.setProperty(
            "--mx",
            ((e.clientX - r.left) / r.width) * 100 + "%"
        );
        ref.current.style.setProperty(
            "--my",
            ((e.clientY - r.top) / r.height) * 100 + "%"
        );
    }

    return (
        <div
            ref={ref}
            className={`glass rounded-xl p-6 pb-[22px] relative overflow-hidden bg-white/[0.045] ${
                hero ? "bg-white/[0.5]" : ""
            }`}
        >
            <div className="flex items-start justify-between">
                <div
                    className={`w-9 h-9 rounded-[10px] flex items-center justify-center ${iconBg[iconVariant]}`}
                >
                    <span className="w-4 h-4 [&>svg]:w-4 [&>svg]:h-4">
                        {icon}
                    </span>
                </div>
                {trend?.direction && (
                    <div
                        className={`flex items-center gap-1 font-label text-[11px] font-semibold py-1 px-[9px] rounded-full text-white ${
                            trend.direction === "up"
                                ? "text-success bg-success-container"
                                : "text-error bg-error-container"
                        }`}
                    >
                        <span
                            className={
                                trend.direction === "down" ? "rotate-180" : ""
                            }
                        >
                            {trendUp}
                        </span>
                        {trend.value}
                        {trend.suffix ?? "%"}
                    </div>
                )}
            </div>

            <div className="num font-display text-[32px] font-bold mt-4 tracking-[-.01em] text-white">
                {isRupiah
                    ? "Rp" + value.toLocaleString("id-ID")
                    : value.toLocaleString("id-ID")}
            </div>
            <div className="text-[12.5px] text-[#b9ab99] mt-[5px] font-medium">
                {label}
            </div>

            <Sparkline
                data={sparkline.length ? sparkline : [0, 0, 0, 0, 0, 0, 0]}
                color={sparkColor}
            />
        </div>
    );
}
