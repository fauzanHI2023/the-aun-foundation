import { Head, Link } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";

import Hero from "@/Layouts/CampaignThankYou/Hero.jsx";
import DonorDetailCard from "@/Layouts/CampaignThankYou/DonorDetailCard.jsx";
import ReceiptCard from "@/Layouts/CampaignThankYou/ReceiptCard.jsx";
import ActionsPanel from "@/Layouts/CampaignThankYou/ActionsPanel.jsx";
import Toast from "@/Layouts/CampaignThankYou/Toast.jsx";

const STATUS_CONTENT = {
    initiated: {
        eyebrow: "Complete the Payment",
        title: (
            <>
                One step toward{" "}
                <em className="italic text-[#ac6c29]">uluran tanganmu.</em>
            </>
        ),
        description: (name) =>
            `We have recorded your donation, ${name}, and are awaiting payment. Once payment is received, we will verify it and forward it to the fundraiser within 24 hours. We will send you an update via email.`,
    },
    pending: {
        eyebrow: "Complete the Payment",
        title: (
            <>
                One step toward{" "}
                <em className="italic text-[#ac6c29]">uluran tanganmu.</em>
            </>
        ),
        description: (name) =>
            `We have recorded your donation, ${name}, and are awaiting payment. Once payment is received, we will verify it and forward it to the fundraiser within 24 hours. We will send you an update via email.`,
    },
    success: {
        eyebrow: "Donation Successful",
        title: (
            <>
                Thank you for{" "}
                <em className="italic text-[#ac6c29]">your help.</em>
            </>
        ),
        description: (name) =>
            `We have received your donation, ${name}, and are currently verifying it so it can be forwarded to the fundraiser within 24 hours. We will send you an email whenever there is an update.`,
    },
    failed: {
        eyebrow: "Payment period has expired",
        title: (
            <>
                The payment
                <em className="italic text-[#ac6c29]">period has ended.</em>
            </>
        ),
        description: (name) =>
            `Hello ${name}, the payment deadline for your donation has passed, so this transaction has expired. Please make a new donation if you'd still like to support this fundraiser.`,
    },
    expired: {
        eyebrow: "Waktu Pembayaran Habis",
        title: (
            <>
                The payment
                <em className="italic text-[#ac6c29]">period has ended.</em>
            </>
        ),
        description: (name) =>
            `Hello ${name}, the payment deadline for your donation has passed, so this transaction has expired. Please make a new donation if you'd still like to support this fundraiser.`,
    },
};

export default function Return({ donation }) {
    const statusKey = STATUS_CONTENT[donation.transaction_status]
        ? donation.transaction_status
        : "initiated";
    const content = STATUS_CONTENT[statusKey];
    const campaign = donation.campaign;

    const percentage = campaign?.target_amount
        ? Math.min(
              100,
              Math.round(
                  (campaign.collected_amount / campaign.target_amount) * 100
              )
          )
        : null;

    const dateLabel = donation.paid_at
        ? new Date(donation.paid_at).toLocaleDateString("id-ID", {
              day: "2-digit",
              month: "short",
              year: "numeric",
          })
        : "-";

    const [confettiTrigger, setConfettiTrigger] = useState(0);
    const [toast, setToast] = useState({ visible: false, message: "" });
    const meshRef = useRef(null);
    const toastTimer = useRef(null);

    useEffect(() => {
        if (statusKey === "success") {
            setConfettiTrigger(Date.now());
        }

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
            return;

        const handlePointerMove = (e) => {
            const x = (e.clientX / window.innerWidth) * 100;
            const y = (e.clientY / window.innerHeight) * 100;
            if (meshRef.current) {
                meshRef.current.style.background =
                    `radial-gradient(60% 50% at ${78 - (x - 50) * 0.06}% ${
                        8 + (y - 50) * 0.04
                    }%, rgba(172,108,41,.30), transparent 62%),` +
                    `radial-gradient(45% 45% at 8% 30%, rgba(175,155,126,.22), transparent 65%),` +
                    `radial-gradient(60% 60% at 40% 105%, rgba(97,61,24,.14), transparent 60%), #fbf9f6`;
            }
        };
        window.addEventListener("pointermove", handlePointerMove, {
            passive: true,
        });
        return () =>
            window.removeEventListener("pointermove", handlePointerMove);
    }, [statusKey]);

    const showToast = (message) => {
        clearTimeout(toastTimer.current);
        setToast({ visible: true, message });
        toastTimer.current = setTimeout(
            () => setToast((t) => ({ ...t, visible: false })),
            2200
        );
    };

    const handleCopyId = () => {
        navigator.clipboard?.writeText(donation.invoice_number).catch(() => {});
        showToast("ID donasi disalin");
    };

    const handleShare = () => {
        const link = donation.slug ?? window.location.href;
        navigator.clipboard?.writeText(link).catch(() => {});
        showToast("Tautan campaign disalin");
    };

    const handleLogin = () => {
        showToast("Redirect to the login page…");
        setTimeout(() => {
            router.visit("/login");
        }, 1000); // sesuaikan durasi sesuai toast Anda
    };

    return (
        <>
            <Head title="Status Donasi" />
            <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(60%_90%_at_106%_-10%,rgba(200,148,78,.16),transparent_60%),radial-gradient(45%_70%_at_-6%_110%,rgba(175,155,126,.18),transparent_60%),linear-gradient(180deg,#FFFFFF_0%,#F3F3F2_100%)]">
                <div className="relative z-[2] mx-auto max-w-[1180px] px-[18px] py-20 sm:px-8 md:py-28">
                    <Hero
                        status={statusKey}
                        eyebrow={content.eyebrow}
                        title={content.title}
                        description={content.description(donation.name)}
                    />

                    <div className="flex lg:flex-row md:flex-col flex-col gap-6">
                        <div className="flex flex-col md:w-[60%] gap-6">
                            <DonorDetailCard
                                donor={{
                                    name: donation.name,
                                    email: donation.email,
                                    invoice: donation.invoice_number,
                                }}
                                status={statusKey}
                            />
                            <ActionsPanel
                                onLogin={handleLogin}
                                onShare={handleShare}
                                showRetry={
                                    statusKey === "failed" ||
                                    statusKey === "expired"
                                }
                                showPay={
                                    statusKey === "pending" ||
                                    statusKey === "initiated"
                                }
                            />
                        </div>

                        <ReceiptCard
                            total={donation.grand_total}
                            date={dateLabel}
                            invoice={donation.invoice_number}
                            method={donation.payment_method}
                            items={donation.items}
                            campaign={campaign}
                            percentage={percentage}
                            onCopyId={handleCopyId}
                            animateTotal={statusKey === "success"}
                        />
                    </div>
                </div>

                <Toast message={toast.message} visible={toast.visible} />
                {/* <Confetti trigger={confettiTrigger} /> */}
            </div>
        </>
    );
}
