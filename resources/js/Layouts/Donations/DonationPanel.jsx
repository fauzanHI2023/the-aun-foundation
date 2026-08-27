const PRESET_AMOUNTS = [25000, 50000, 100000, 250000];
const ADMIN_FEE = 2500;

function formatRupiah(amount) {
    const numeric = Number(amount) || 0;
    return numeric > 0 ? `Rp ${numeric.toLocaleString("id-ID")}` : "Rp -";
}

export default function DonationPanel({ data, setData, errors }) {
    const activeAmount = Number(data.amount) || 0;
    const total = activeAmount;

    return (
        <section className="w-full md:w-[48%] bg-on-surface-dark text-white p-8 md:p-12 flex flex-col justify-between overflow-y-auto h-full">
            <div className="space-y-6">
                {/* Hero Image */}
                <div className="rounded-2xl overflow-hidden shadow-2xl relative">
                    <img
                        className="w-full h-auto object-cover"
                        src="/images/AUN_Foundation_Banner_v3 (1).png"
                        alt="Children learning"
                    />
                    {/* <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                        <h1 className="text-white font-display md:text-5xl text-xl font-bold">
                            Donation Bebas
                        </h1>
                    </div> */}
                </div>

                {/* Donation Selection */}
                <div className="space-y-6">
                    <label
                        htmlFor="amount"
                        className="block text-xs font-bold tracking-[0.2em] text-white/60 uppercase font-body"
                    >
                        Select Donation Amount
                    </label>

                    {/* Amount Presets */}
                    <div className="grid grid-cols-4 gap-3">
                        {PRESET_AMOUNTS.map((preset) => {
                            const isChecked =
                                String(data.amount) === String(preset);
                            return (
                                <button
                                    type="button"
                                    key={preset}
                                    onClick={() =>
                                        setData("amount", String(preset))
                                    }
                                    className={`flex items-center justify-center py-4 border rounded-lg cursor-pointer transition-all font-display text-lg font-medium ${
                                        isChecked
                                            ? "border-primary bg-primary/10"
                                            : "border-white/20"
                                    }`}
                                >
                                    Rp {preset.toLocaleString("id-ID")}
                                </button>
                            );
                        })}
                    </div>

                    {/* Custom / Manual Amount Input */}
                    <div className="mt-4 space-y-2">
                        <span className="block text-xs font-bold tracking-[0.2em] text-white/60 uppercase font-body">
                            Enter a Different Amount
                        </span>
                        <div className="flex h-12">
                            <span className="inline-flex items-center px-4 rounded-l-lg border border-r-0 border-white/20 bg-white/5 font-body text-white/70 text-sm">
                                Rp
                            </span>
                            <input
                                id="amount"
                                type="number"
                                min="10000"
                                step="1"
                                value={data.amount}
                                onChange={(e) =>
                                    setData("amount", e.target.value)
                                }
                                className="flex-1 px-4 rounded-r-lg border border-white/20 bg-transparent focus:border-primary focus:ring-0 transition-colors font-body text-white placeholder:text-white/30"
                                placeholder="Minimal Rp10.000"
                            />
                        </div>
                        {errors.amount && (
                            <p className="mt-1 text-xs text-red-400">
                                {errors.amount}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Donation Summary */}
            <div className="pt-10 space-y-3 font-body">
                <div className="flex justify-between text-white/70 text-sm">
                    <span>Amount Donation</span>
                    <span>{formatRupiah(activeAmount)}</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-white/10">
                    <span className="text-white/80">Total</span>
                    <span className="text-2xl font-bold font-display">
                        {formatRupiah(total)}
                    </span>
                </div>
            </div>
        </section>
    );
}
