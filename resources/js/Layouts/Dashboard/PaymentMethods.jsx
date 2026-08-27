const iconMap = {
    "Virtual Account": "🏦",
    QRIS: "📱",
    "E-Wallet": "👛",
    "Kartu Kredit": "💳",
};

const gradients = [
    "linear-gradient(90deg,#c9832b,#ffb875)",
    "linear-gradient(90deg,#c6c6c7,#8f9192)",
    "linear-gradient(90deg,#ffdcc0,#ffb875)",
    "linear-gradient(90deg,#8a9970,#b7c793)",
];

export default function PaymentMethods({ paymentMethods = [] }) {
    return (
        <div className="glass card rounded-xl p-[26px]">
            <div className="font-display text-white text-xl font-bold tracking-[-.01em]">
                Favorite Payment Methods
            </div>
            <div className="text-[13px] text-[#b9ab99] mt-[3px]">
                Based on frequency of use
            </div>

            {paymentMethods.length === 0 ? (
                <div className="text-[#b9ab99] text-sm mt-4">
                    No transactions yet.
                </div>
            ) : (
                <div className="mt-4 flex flex-col gap-[15px]">
                    {paymentMethods.map((m, i) => (
                        <div key={m.method} className="flex items-center gap-3">
                            <div className="w-[34px] h-[34px] rounded-[11px] bg-surface-low flex items-center justify-center text-sm shrink-0 text-[#b9ab99]">
                                {iconMap[m.method] ?? "💰"}
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between font-label text-xs font-semibold mb-1.5">
                                    <span className="text-[#b9ab99]">
                                        {m.method}
                                    </span>
                                    <span className="text-[#b9ab99] font-medium">
                                        {m.percent}%
                                    </span>
                                </div>
                                <div className="bar-track">
                                    <div
                                        className="bar-fill"
                                        style={{
                                            width: `${m.percent}%`,
                                            background:
                                                gradients[i % gradients.length],
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
