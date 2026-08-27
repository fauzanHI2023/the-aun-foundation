import { Head, useForm } from "@inertiajs/react";
import { useState } from "react";
import {
    Landmark,
    QrCode,
    CreditCard,
    Wallet,
    ShieldCheck,
} from "lucide-react";

function formatRupiah(value) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    }).format(value || 0);
}

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
            className={`flex flex-col items-center gap-2 rounded-2xl border p-4 text-center transition ${
                isActive || isSelected
                    ? "border-primary bg-amber-800/5"
                    : "border-stone-200 hover:border-primary/50"
            }`}
        >
            <Icon size={22} className="text-primary" />
            <span className="text-sm font-medium text-stone-800">
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
            className={`flex flex-col items-center gap-3 rounded-xl border p-3 text-left transition ${
                isSelected
                    ? "border-amber-700 bg-amber-800/5"
                    : "border-stone-200 hover:border-amber-700/50"
            }`}
        >
            <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden bg-white">
                <img
                    src={provider.logo}
                    alt={provider.name}
                    className="h-full w-full object-contain p-1"
                    onError={(e) => {
                        e.currentTarget.style.display = "none";
                    }}
                />
            </div>
            <span className="text-sm font-medium text-stone-800">
                {provider.name}
            </span>
        </button>
    );
}

export default function Checkout({ campaign, amount, paymentMethods }) {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        email: "",
        phone: "",
        amount: amount,
        notes: "",
        payment_type: "",
        payment_channel: "",
    });

    const [activeCategoryId, setActiveCategoryId] = useState(null);

    function chooseProvider(categoryId, category, provider) {
        setData((prev) => ({
            ...prev,
            payment_type: category.type,
            payment_channel: provider?.channel ?? "",
        }));
        if (category.providers.length === 0) {
            setActiveCategoryId(null);
        }
    }

    function submit(e) {
        e.preventDefault();
        post(route("campaign-donations.store", campaign.slug));
    }

    const selectedLabel = (() => {
        if (!data.payment_type) return null;

        const entry = Object.entries(paymentMethods).find(
            ([, cat]) => cat.type === data.payment_type
        );
        if (!entry) return null;

        const [, category] = entry;
        const provider = category.providers.find(
            (p) => p.channel === data.payment_channel
        );

        return provider
            ? `${category.label} · ${provider.name}`
            : category.label;
    })();

    return (
        <>
            <Head title={`Checkout · ${campaign.title}`} />
            <div className="min-h-screen bg-stone-50 py-10 sm:py-16">
                <div className="mx-auto grid max-w-[1200px] gap-8 px-6 sm:grid-cols-5 sm:gap-10 sm:items-start">
                    {/* ================= Kolom kanan: Donation Summary (sticky) + tombol ================= */}
                    <div className="sm:order-2 sm:col-span-2">
                        <div className="sm:sticky sm:top-8 space-y-6">
                            <div className="rounded-[24px] donation-card-shadow bg-white p-8">
                                <h3 className="mb-6 text-2xl font-semibold text-stone-900">
                                    Donation Summary
                                </h3>

                                <div className="mt-3 flex gap-3">
                                    <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-stone-100">
                                        {campaign.thumbnail && (
                                            <img
                                                src={`/images/${campaign.thumbnail}`}
                                                alt={campaign.title}
                                                className="h-full w-full object-cover"
                                            />
                                        )}
                                    </div>
                                    <p className="text-sm font-medium leading-snug text-stone-900">
                                        {campaign.title}
                                    </p>
                                </div>

                                <dl className="mt-6 space-y-3 border-t border-stone-100 pt-6 text-sm">
                                    <div className="flex justify-between">
                                        <dt className="text-stone-500">
                                            Nominal donasi
                                        </dt>
                                        <dd className="text-stone-900">
                                            {formatRupiah(data.amount)}
                                        </dd>
                                    </div>
                                    <div className="flex justify-between">
                                        <dt className="text-stone-500">
                                            Biaya admin
                                        </dt>
                                        <dd className="text-stone-900">Rp0</dd>
                                    </div>
                                    {selectedLabel && (
                                        <div className="flex justify-between">
                                            <dt className="text-stone-500">
                                                Metode
                                            </dt>
                                            <dd className="font-medium text-primary">
                                                {selectedLabel}
                                            </dd>
                                        </div>
                                    )}
                                </dl>

                                <div className="mt-4 flex items-baseline justify-between border-t border-stone-100 pt-4">
                                    <span className="font-medium text-stone-900">
                                        Total
                                    </span>
                                    <span className="text-xl font-semibold text-primary">
                                        {formatRupiah(data.amount)}
                                    </span>
                                </div>

                                {errors.payment && (
                                    <p className="mt-4 rounded-lg bg-red-50 px-3.5 py-2.5 text-sm text-red-600">
                                        {errors.payment}
                                    </p>
                                )}

                                {/* Tombol ini terhubung ke <form id="checkout-form">
                                    di kolom kiri lewat atribut form="checkout-form",
                                    meski secara DOM letaknya di luar tag <form>. */}
                                <button
                                    type="submit"
                                    form="checkout-form"
                                    disabled={processing}
                                    className="mt-6 flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-primary text-lg font-semibold text-white shadow-lg transition hover:shadow-xl disabled:opacity-60"
                                >
                                    {processing
                                        ? "Processing..."
                                        : "Donate Now"}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* ================= Kolom kiri: form data diri + payment method ================= */}
                    <div className="sm:order-1 sm:col-span-3">
                        <div className="rounded-[24px] donation-card-shadow bg-white p-8 md:p-12">
                            <h1 className="pb-1 text-2xl font-semibold text-stone-900 md:pb-2">
                                Your Information
                            </h1>
                            <p className="pb-2 text-sm text-stone-500 md:pb-8">
                                Used to send proof and updates on the program's
                                progress.
                            </p>

                            <form
                                id="checkout-form"
                                onSubmit={submit}
                                className="grid grid-cols-1 gap-6 md:grid-cols-2"
                            >
                                <div className="space-y-2">
                                    <label className="px-1 text-sm font-medium text-stone-700">
                                        Full Name
                                    </label>
                                    <input
                                        className="h-[56px] w-full rounded-xl border border-stone-200 bg-stone-50 px-4 text-sm"
                                        placeholder="Syahrul Gunawan"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                    />
                                    {errors.name && (
                                        <p className="text-xs text-red-500">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label className="px-1 text-sm font-medium text-stone-700">
                                        Email Address
                                    </label>
                                    <input
                                        className="h-[56px] w-full rounded-xl border border-stone-200 bg-stone-50 px-4 text-sm"
                                        placeholder="syahrulgun@example.com"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                    />
                                    {errors.email && (
                                        <p className="text-xs text-red-500">
                                            {errors.email}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <label className="px-1 text-sm font-medium text-stone-700">
                                        Phone Number
                                    </label>
                                    <input
                                        className="h-[56px] w-full rounded-xl border border-stone-200 bg-stone-50 px-4 text-sm"
                                        placeholder="+62 812 3456 7890"
                                        type="tel"
                                        value={data.phone}
                                        onChange={(e) =>
                                            setData("phone", e.target.value)
                                        }
                                    />
                                    {errors.phone && (
                                        <p className="text-xs text-red-500">
                                            {errors.phone}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <label className="px-1 text-sm font-medium text-stone-700">
                                        Notes{" "}
                                        <span className="font-normal text-stone-400">
                                            (optional)
                                        </span>
                                    </label>
                                    <textarea
                                        className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm"
                                        placeholder="Your prayers and hopes"
                                        value={data.notes}
                                        onChange={(e) =>
                                            setData("notes", e.target.value)
                                        }
                                        rows={4}
                                    />
                                    {errors.notes && (
                                        <p className="text-xs text-red-500">
                                            {errors.notes}
                                        </p>
                                    )}
                                </div>
                            </form>
                        </div>

                        {/* Payment method selector */}
                        <div className="mt-6 space-y-6 rounded-[24px] donation-card-shadow bg-white p-8">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                                    <Wallet size={20} />
                                </div>
                                <h2 className="text-lg font-bold text-stone-900">
                                    Payment Method
                                </h2>
                            </div>

                            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                                {Object.entries(paymentMethods).map(
                                    ([id, category]) => (
                                        <CategoryButton
                                            key={id}
                                            id={id}
                                            category={category}
                                            isActive={activeCategoryId === id}
                                            isSelected={
                                                data.payment_type ===
                                                category.type
                                            }
                                            onClick={() => {
                                                if (
                                                    category.providers
                                                        .length === 0
                                                ) {
                                                    chooseProvider(
                                                        id,
                                                        category,
                                                        null
                                                    );
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
                                paymentMethods[activeCategoryId]?.providers
                                    .length > 0 && (
                                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
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
                                                        activeCategoryId,
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

                            <div className="flex items-center gap-2 border-t border-stone-100 pt-4 text-xs text-stone-400">
                                <ShieldCheck size={16} />
                                Transactions will be processed through Doitpay.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
