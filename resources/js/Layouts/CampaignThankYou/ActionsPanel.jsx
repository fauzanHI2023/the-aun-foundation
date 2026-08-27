import React from "react";
import { Link } from "@inertiajs/react";
import Button from "@/Layouts/CampaignThankYou/Button.jsx";

export default function ActionsPanel({ onLogin, onShare, showRetry, showPay }) {
    return (
        <div className="pt-[26px]" style={{ gridArea: "actions" }}>
            <div className="mb-3.5 flex flex-wrap gap-3">
                {showRetry && (
                    <Button as="a" href="#" variant="primary">
                        Try making the payment again
                    </Button>
                )}
                {showPay && (
                    <Button as="a" href="#" variant="glow">
                        Continue Payment
                    </Button>
                )}
                <Button
                    as="a"
                    href={route("campaigns.index")}
                    variant={showRetry ? "secondary" : "primary"}
                >
                    Donate again, back to the campaign
                </Button>
                <Button variant="secondary" onClick={onLogin}>
                    Sign In / Create an Account
                </Button>
            </div>
            <button
                onClick={onShare}
                className="inline-flex items-center gap-1.5 border-none bg-transparent p-0 text-[13.5px] font-semibold text-[#1c1b1b] underline decoration-solid underline-offset-[3px] opacity-60 transition-opacity duration-200 hover:opacity-100"
            >
                Share this campaign with your friends →
            </button>
        </div>
    );
}
