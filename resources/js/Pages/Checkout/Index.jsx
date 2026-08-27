import { useForm } from "@inertiajs/react";
import axios from "axios";

export default function Index({ cart, grandTotal }) {
    const { data, setData } = useForm({
        name: "",
        email: "",
        phone: "",
    });

    const checkout = async () => {
        try {
            console.log(data);

            const response = await axios.post("/checkout", data);

            window.location.href = response.data.payment_url;
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="p-10">
            <h1
                className="
                text-3xl
                font-bold
                mb-6
            "
            >
                Checkout
            </h1>

            <div
                className="
                space-y-4
                mb-8
            "
            >
                <input
                    type="text"
                    placeholder="Nama"
                    className="
                        border
                        p-2
                        w-full
                    "
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                />

                <input
                    type="email"
                    placeholder="Email"
                    className="
                        border
                        p-2
                        w-full
                    "
                    value={data.email}
                    onChange={(e) => setData("email", e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Phone"
                    className="
                        border
                        p-2
                        w-full
                    "
                    value={data.phone}
                    onChange={(e) => setData("phone", e.target.value)}
                />
            </div>

            {cart.map((item) => (
                <div
                    key={item.campaign_id}
                    className="
                        mb-4
                        border
                        p-4
                    "
                >
                    <h2>{item.title}</h2>

                    <p>Rp {Number(item.amount).toLocaleString()}</p>
                </div>
            ))}

            <h2
                className="
                text-2xl
                font-bold
                mt-6
            "
            >
                Total: Rp {Number(grandTotal).toLocaleString()}
            </h2>

            <button
                type="button"
                onClick={checkout}
                className="
                    mt-6
                    bg-black
                    text-white
                    px-6
                    py-3
                    rounded-lg
                "
            >
                Bayar Sekarang
            </button>
        </div>
    );
}
