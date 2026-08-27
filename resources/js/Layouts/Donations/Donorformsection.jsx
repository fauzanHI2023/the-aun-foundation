import { ArrowRight, Landmark, QrCode, CreditCard, Wallet } from "lucide-react";
import { useState } from "react";

const CATEGORY_ICON = {
    bank: Landmark,
    wallet: Wallet,
    qris: QrCode,
    card: CreditCard,
};

function CategoryButton({ id, category, isActive, isSelected, onClick }) {
    const Icon = CATEGORY_ICON[id] ?? Wallet;

    return (
        <button
            type="button"
            onClick={onClick}
            className={`flex flex-col items-center gap-2 rounded-xl border p-4 text-center transition ${
                isActive || isSelected
                    ? "border-primary bg-primary/5"
                    : "border-gray-200 hover:border-primary/50"
            }`}
        >
            <Icon size={20} className="text-primary" />
            <span className="font-body text-sm font-medium text-gray-700">
                {category.label}
            </span>
        </button>
    );
}

function ProviderOption({ provider, isSelected, onSelect }) {
    return (
        <button
            type="button"
            onClick={onSelect}
            className={`flex items-center gap-3 rounded-xl border p-3 text-left transition ${
                isSelected
                    ? "border-primary bg-primary/5"
                    : "border-gray-200 hover:border-primary/50"
            }`}
        >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white ring-1 ring-gray-200">
                <img
                    src={provider.logo}
                    alt={provider.name}
                    className="h-full w-full object-contain p-1"
                    onError={(e) => {
                        e.currentTarget.style.display = "none";
                    }}
                />
            </div>
            <span className="font-body text-sm font-medium text-gray-700">
                {provider.name}
            </span>
        </button>
    );
}

export default function DonorFormSection({
    data,
    setData,
    errors,
    processing,
    paymentMethods = {},
}) {
    const [activeCategoryId, setActiveCategoryId] = useState(null);

    function chooseProvider(category, provider) {
        setData((prev) => ({
            ...prev,
            payment_type: category.type,
            payment_channel: provider?.channel ?? "",
        }));
        if (category.providers.length === 0) {
            setActiveCategoryId(null);
        }
    }

    return (
        <section className="w-full md:w-[52%] bg-surfacedark text-on-surface p-8 md:px-16 md:py-10 flex flex-col h-full overflow-y-auto">
            <div className="max-w-xl">
                <header className="mb-10">
                    <h2 className="text-3xl font-display font-medium mb-2">
                        Your Information
                    </h2>
                    <p className="text-on-surface-variant font-body">
                        Complete your personal details to proceed with the
                        donation process.
                    </p>
                </header>

                {errors.payment && (
                    <div className="mb-6 rounded-lg border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-500">
                        {errors.payment}
                    </div>
                )}

                <div className="space-y-6">
                    {/* Donor Info Form */}
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label
                                htmlFor="name"
                                className="block text-sm font-semibold font-body"
                            >
                                Fullname
                            </label>
                            <input
                                id="name"
                                type="text"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                className="w-full h-14 px-4 rounded-xl border-gray-200 focus:border-primary focus:ring-0 transition-colors font-body text-gray-600"
                                placeholder="Example Syahrul Gunawan"
                            />
                            {errors.name && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-semibold font-body"
                                >
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    className="w-full h-14 px-4 rounded-xl border-gray-200 focus:border-primary focus:ring-0 transition-colors font-body text-gray-600"
                                    placeholder="example@email.com"
                                />
                                {errors.email && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.email}
                                    </p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <label
                                    htmlFor="phone"
                                    className="block text-sm font-semibold font-body"
                                >
                                    Phone Number{" "}
                                    <span className="text-on-surface-variant">
                                        (opsional)
                                    </span>
                                </label>
                                <div className="flex h-14">
                                    <span className="inline-flex items-center px-4 rounded-l-xl border border-r-0 border-gray-200 bg-gray-50 font-body text-gray-500 text-sm">
                                        +62
                                    </span>
                                    <input
                                        id="phone"
                                        type="tel"
                                        value={data.phone}
                                        onChange={(e) =>
                                            setData("phone", e.target.value)
                                        }
                                        className="flex-1 px-4 rounded-r-xl border border-gray-200 focus:border-primary focus:ring-0 transition-colors font-body text-gray-600"
                                        placeholder="123 4567 8901"
                                    />
                                </div>
                                {errors.phone && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.phone}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="notes"
                                className="block text-sm font-semibold font-body"
                            >
                                Messages
                            </label>
                            <textarea
                                id="notes"
                                rows={3}
                                value={data.notes}
                                onChange={(e) =>
                                    setData("notes", e.target.value)
                                }
                                className="w-full px-4 py-3 rounded-xl border-gray-200 focus:border-primary focus:ring-0 transition-colors font-body text-gray-600"
                                placeholder="Write a message or a prayer..."
                            />
                            {errors.notes && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.notes}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Pembatas */}
                    <div className="border-t border-gray-200 pt-8">
                        <h3 className="text-xl font-display font-medium mb-1">
                            Payment Method
                        </h3>
                        <p className="text-on-surface-variant font-body text-sm mb-6">
                            Choose how you'd like to complete your donation.
                        </p>

                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                            {Object.entries(paymentMethods).map(
                                ([id, category]) => (
                                    <CategoryButton
                                        key={id}
                                        id={id}
                                        category={category}
                                        isActive={activeCategoryId === id}
                                        isSelected={
                                            data.payment_type === category.type
                                        }
                                        onClick={() => {
                                            if (
                                                category.providers.length === 0
                                            ) {
                                                chooseProvider(category, null);
                                                return;
                                            }
                                            setActiveCategoryId(
                                                activeCategoryId === id
                                                    ? null
                                                    : id
                                            );
                                        }}
                                    />
                                )
                            )}
                        </div>

                        {activeCategoryId &&
                            paymentMethods[activeCategoryId]?.providers.length >
                                0 && (
                                <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
                                    {paymentMethods[
                                        activeCategoryId
                                    ].providers.map((provider) => (
                                        <ProviderOption
                                            key={provider.channel}
                                            provider={provider}
                                            isSelected={
                                                data.payment_channel ===
                                                provider.channel
                                            }
                                            onSelect={() =>
                                                chooseProvider(
                                                    paymentMethods[
                                                        activeCategoryId
                                                    ],
                                                    provider
                                                )
                                            }
                                        />
                                    ))}
                                </div>
                            )}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-8">
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-primary text-white h-16 rounded-xl font-body font-bold text-lg shadow-lg hover:brightness-110 transition-all active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            <span>
                                {processing ? "Processing..." : "Donate Now"}
                            </span>
                            {!processing && (
                                <ArrowRight className="text-surfacedark" />
                            )}
                        </button>
                        <p className="text-center mt-6 text-xs text-on-surface-variant font-body">
                            Payments are processed securely.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
