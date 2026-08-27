export function DonationInfo({ rows }) {
    return (
        <div>
            {rows
                .filter((row) => row.v)
                .map((row, i) => (
                    <div
                        key={row.k}
                        className={`relative flex justify-between gap-4 py-[11px] text-[13.5px] ${
                            i > 0
                                ? "before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-[#7A7672]/20 before:to-transparent"
                                : ""
                        }`}
                    >
                        <span className="text-gray-800">{row.k}</span>
                        <p
                            className={`text-right font-bold ${
                                row.mono ? "font" : ""
                            }`}
                        >
                            {row.v}
                        </p>
                    </div>
                ))}
        </div>
    );
}

export default DonationInfo;
