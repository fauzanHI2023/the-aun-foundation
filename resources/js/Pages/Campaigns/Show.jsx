import { useMemo, useState } from "react";
import { Head, router } from "@inertiajs/react";
import Hero from "@/Layouts/Campaign/Hero";
import CTASection from "@/Layouts/Campaign/CTASection";
import DOMPurify from "dompurify";

function formatRupiah(value) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    }).format(value || 0);
}

function parseRupiahInput(raw) {
    const digitsOnly = raw.replace(/[^0-9]/g, "");
    return digitsOnly ? Number(digitsOnly) : "";
}

const PRESET_AMOUNTS = [50000, 100000, 250000, 500000, 1000000];
const MIN_AMOUNT = 10000;

export default function Show({ campaign }) {
    const target = Number(campaign.target_amount) || 0;
    const collected = Number(campaign.collected_amount) || 0;
    const percent =
        target > 0 ? Math.min(100, Math.round((collected / target) * 100)) : 0;

    const [selectedPreset, setSelectedPreset] = useState(null);
    const [customAmount, setCustomAmount] = useState("");

    const amount = useMemo(() => {
        if (customAmount !== "") return Number(customAmount);
        return selectedPreset ?? "";
    }, [selectedPreset, customAmount]);

    const isValid = Number(amount) >= MIN_AMOUNT;

    function choosePreset(value) {
        setSelectedPreset(value);
        setCustomAmount("");
    }

    function onCustomChange(e) {
        setSelectedPreset(null);
        setCustomAmount(parseRupiahInput(e.target.value));
    }

    function goToCheckout() {
        if (!isValid) return;
        router.get(route("campaign-donations.checkout", campaign.slug), {
            amount,
        });
    }

    const cleanDescription = useMemo(
        () =>
            DOMPurify.sanitize(campaign.description ?? "", {
                FORBID_ATTR: ["style", "width", "height"],
            }),
        [campaign.description]
    );

    return (
        <>
            <Head title={campaign.title} />
            <div className="min-h-screen bg-stone-50 sm:pb-16">
                <Hero
                    imageUrl={campaign.thumbnail}
                    tag={campaign.category ?? "Donasi"}
                    title={campaign.title}
                    description={campaign.description}
                    fundedAmount={formatRupiah(collected)}
                    goalAmount={formatRupiah(target)}
                    percentFunded={percent}
                    donors={campaign.donors_count ?? 0}
                    daysLeft={campaign.days_left ?? 0}
                />

                <main className="max-w-container-max mx-auto grid gap-8 px-6 md:py-[5rem] py-11 sm:grid-cols-5 sm:gap-10">
                    <div className="sm:col-span-3">
                        <article
                            className="campaign-description prose prose-stone max-w-none ..."
                            dangerouslySetInnerHTML={{
                                __html: cleanDescription,
                            }}
                        />
                    </div>

                    <div className="sm:col-span-2">
                        <div className="sticky top-24 glass-card-detail rounded-lg overflow-hidden p-stack-lg flex flex-col gap-stack-md">
                            <p className="font-headline-sm text-primary mb-stack-sm">
                                Select a donation amount
                            </p>
                            <div className="grid grid-cols-3 gap-2">
                                {PRESET_AMOUNTS.map((value) => (
                                    <button
                                        key={value}
                                        type="button"
                                        onClick={() => choosePreset(value)}
                                        className={`border rounded-lg py-3 text-xs font-medium transition-all ${
                                            selectedPreset === value
                                                ? "bg-[#2E1D14] text-white"
                                                : "border-[#c4c7c6] text-[#28180f] hover:bg-[#2E1D14] hover:border-[#2E1D14] hover:text-white"
                                        }`}
                                    >
                                        {formatRupiah(value)}
                                    </button>
                                ))}
                            </div>

                            <div className="mt-3">
                                <label className="mb-1.5 block text-xs font-medium text-stone-500">
                                    or any other amount
                                </label>
                                <div className="relative mt-2">
                                    <input
                                        type="text"
                                        inputMode="numeric"
                                        value={
                                            customAmount === ""
                                                ? ""
                                                : Number(
                                                      customAmount
                                                  ).toLocaleString("id-ID")
                                        }
                                        onChange={onCustomChange}
                                        placeholder="0"
                                        className="w-full bg-surface-container-low border border-outline-variant/30 rounded-lg py-4 pl-12 focus:ring-2 focus:ring-primary focus:border-transparent text-primary font-bold placeholder:text-outline-variant"
                                    />
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-on-surface-variant">
                                        Rp
                                    </span>
                                </div>
                                {customAmount !== "" &&
                                    Number(customAmount) < MIN_AMOUNT && (
                                        <p className="mt-1.5 text-xs text-red-500">
                                            Minimum donation Rp10.000
                                        </p>
                                    )}
                            </div>

                            <button
                                type="button"
                                disabled={!isValid}
                                onClick={goToCheckout}
                                className="bg-[#2E1D14] cursor-pointer text-white py-4 rounded-lg uppercase font-medium text-sm tracking-widest hover:opacity-90 transition-all flex items-center justify-center gap-2 mt-4 shadow-lg shadow-primary/20"
                            >
                                Donate Now
                            </button>
                        </div>
                    </div>
                </main>

                <div className="fixed inset-x-0 bottom-0 border-t border-stone-200 bg-white p-4 sm:hidden">
                    <button
                        type="button"
                        disabled={!isValid}
                        onClick={goToCheckout}
                        className="w-full rounded-lg bg-amber-500 py-3 text-sm font-semibold text-[#1F4741] transition disabled:cursor-not-allowed disabled:bg-stone-200 disabled:text-stone-400"
                    >
                        {isValid
                            ? `Lanjutkan · ${formatRupiah(amount)}`
                            : "Pilih nominal donasi"}
                    </button>
                </div>

                <CTASection />
            </div>
        </>
    );
}
