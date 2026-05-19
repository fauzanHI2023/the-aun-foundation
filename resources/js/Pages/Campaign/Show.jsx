import { router } from "@inertiajs/react";
import { useState } from "react";

export default function Show({ campaign }) {
    const [amount, setAmount] = useState(10000);

    const addToCart = () => {
        router.post("/cart/add", {
            campaign_id: campaign.id,
            amount: amount,
        });
    };

    return (
        <div>
            <h1>{campaign.title}</h1>

            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />

            <button onClick={addToCart}>Donasi Sekarang</button>
        </div>
    );
}
