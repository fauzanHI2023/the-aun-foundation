import { useMemo, useState } from "react";
import { Head, router } from "@inertiajs/react";
import CampaignBody from "@/Layouts/ProgramDetails/CampaignBody";
import CampaignIntro from "@/Layouts/ProgramDetails/CampaignIntro";
import ImageGallery from "@/Layouts/ProgramDetails/ImageGallery";
import DonationPanel from "@/Layouts/ProgramDetails/DonationPanel";

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

export default function Show({ program }) {
    const target = Number(program.goals) || 0;
    const collected = Number(program.collected) || 0;
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
        router.get(route("program-donations.checkout", program.id), {
            amount,
        });
    }

    return (
        <>
            <Head title={program.title_program} />
            <main className="max-w-7xl mx-auto px-6 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="md-w-23">
                        <ImageGallery />
                        <CampaignIntro program={program} />
                    </div>
                    <DonationPanel
                        program={program}
                        presetAmounts={PRESET_AMOUNTS}
                        collected={collected}
                        target={target}
                        percent={percent}
                        formatRupiah={formatRupiah}
                        selectedPreset={selectedPreset}
                        customAmount={customAmount}
                        isValid={isValid}
                        onChoosePreset={choosePreset}
                        onCustomChange={onCustomChange}
                        onCheckout={goToCheckout}
                    />
                </div>
            </main>
        </>
    );
}
