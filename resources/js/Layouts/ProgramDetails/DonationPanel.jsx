import { useState } from "react";
import {
    CheckCircle2,
    Users,
    Share2,
    QrCode,
    CreditCard,
    Landmark,
} from "lucide-react";

const colors = {
    cacao900: "#2E1D14",
    onSurface: "#28180f",
    onSurfaceVariant: "#434847",
    harvest400: "#B8863C",
    stone100: "#FAFAF9",
    surface: "#fff8f6",
    surfaceContainer: "#ffeae0",
    surfaceContainerHighest: "#fcdccd",
    outlineVariant: "#c4c7c6",
    verifiedSage: "#5C6B4F",
    white: "#ffffff",
};

function formatRupiah(value) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    }).format(value || 0);
}

export default function DonationPanel({
    program,
    presetAmounts,
    collected,
    target,
    percent,
    formatRupiah,
    selectedPreset,
    customAmount,
    isValid,
    onChoosePreset,
    onCustomChange,
    onCheckout,
}) {
    const [showCustom, setShowCustom] = useState(false);

    function handlePreset(value) {
        setShowCustom(false);
        onChoosePreset(value);
    }

    function handleOther() {
        setShowCustom(true);
        onChoosePreset(null);
    }

    return (
        <div className="md-w-13 md:text-sm relative">
            <div className="sticky top-28 space-y-4">
                <h1
                    className="font-serif text-3xl leading-tight"
                    style={{ color: colors.onSurface }}
                >
                    {program.focus}
                </h1>

                <div className="flex items-center space-x-3 mb-4">
                    <span
                        className="text-xs flex items-center"
                        style={{ color: colors.onSurfaceVariant }}
                    >
                        <Users size={16} className="mr-1" /> 128 Donors
                    </span>
                </div>

                <div
                    className="p-8 rounded-[32px]"
                    style={{
                        backgroundColor: "rgba(250,249,247,0.55)",
                        backdropFilter: "blur(18px)",
                        border: "1px solid rgba(255,255,255,0.5)",
                        boxShadow: "0 20px 30px rgba(46,29,20,0.08)",
                    }}
                >
                    <div className="mb-6">
                        <p
                            className="text-xs uppercase mb-1"
                            style={{ color: "rgba(67,72,71,0.7)" }}
                        >
                            Raised
                        </p>
                        <h4
                            className="text-2xl font-bold"
                            style={{ color: colors.harvest400 }}
                        >
                            {formatRupiah(collected)}
                        </h4>
                        <p
                            className="text-xs"
                            style={{ color: colors.onSurfaceVariant }}
                        >
                            of {formatRupiah(target)}
                        </p>
                    </div>

                    <div
                        className="relative h-4 w-full rounded-full mb-8 overflow-hidden"
                        style={{ backgroundColor: colors.stone100 }}
                    >
                        <div
                            className="absolute left-0 top-0 h-full rounded-full transition-all duration-700"
                            style={{
                                width: `${percent}%`,
                                backgroundColor: colors.harvest400,
                            }}
                        />
                    </div>

                    <div className="space-y-6">
                        <div>
                            <p
                                className="text-xs uppercase mb-3 font-semibold"
                                style={{ color: colors.onSurface }}
                            >
                                Select Amount
                            </p>
                            <div className="grid grid-cols-3 gap-2">
                                {presetAmounts.map((value) => (
                                    <button
                                        key={value}
                                        type="button"
                                        onClick={() => handlePreset(value)}
                                        className="py-2 rounded-xl text-xs font-medium transition-all"
                                        style={
                                            selectedPreset === value
                                                ? {
                                                      backgroundColor:
                                                          colors.cacao900,
                                                      color: colors.white,
                                                  }
                                                : {
                                                      border: `1px solid ${colors.outlineVariant}`,
                                                      color: colors.onSurface,
                                                  }
                                        }
                                    >
                                        {formatRupiah(value)}
                                    </button>
                                ))}
                            </div>

                            <button
                                type="button"
                                onClick={handleOther}
                                className="w-full mt-2 py-2 rounded-xl text-xs font-medium transition-all"
                                style={
                                    showCustom
                                        ? {
                                              backgroundColor: colors.cacao900,
                                              color: colors.white,
                                          }
                                        : {
                                              border: `1px solid ${colors.outlineVariant}`,
                                              color: colors.onSurface,
                                          }
                                }
                            >
                                Other
                            </button>

                            {showCustom && (
                                <div className="mt-2 relative">
                                    <span
                                        className="absolute left-4 top-1/2 -translate-y-1/2 font-bold"
                                        style={{
                                            color: colors.onSurfaceVariant,
                                        }}
                                    >
                                        Rp
                                    </span>
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
                                        placeholder="Enter amount"
                                        className="w-full pl-12 pr-4 py-3 rounded-xl outline-none text-lg"
                                        style={{
                                            border: `1px solid ${colors.outlineVariant}`,
                                            backgroundColor:
                                                "rgba(255,255,255,0.5)",
                                        }}
                                    />
                                    {customAmount !== "" && !isValid && (
                                        <p className="mt-1.5 text-xs text-red-500">
                                            Minimal donasi Rp10.000
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="space-y-3">
                            <button
                                type="button"
                                disabled={!isValid}
                                onClick={onCheckout}
                                className="w-full py-4 rounded-lg text-sm font-medium uppercase tracking-widest hover:opacity-90 transition-all disabled:cursor-not-allowed disabled:opacity-50"
                                style={{
                                    backgroundColor: colors.cacao900,
                                    color: colors.white,
                                }}
                            >
                                Donate Now
                            </button>
                            <button
                                type="button"
                                className="w-full py-4 rounded-full text-sm font-medium uppercase tracking-widest hover:bg-primary hover:text-white transition-all flex items-center justify-center"
                            >
                                <Share2 size={18} className="mr-2" /> Share
                                Program
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
