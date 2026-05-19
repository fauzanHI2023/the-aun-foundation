import { router, Link } from "@inertiajs/react";

export default function CartIndex({ cart, grandTotal }) {
    const removeItem = (id) => {
        router.delete(`/cart/remove/${id}`);
    };

    const clearCart = () => {
        router.delete("/cart/clear");
    };

    return (
        <div className="p-10">
            <div
                className="
                flex
                items-center
                justify-between
                mb-8
            "
            >
                <h1
                    className="
                    text-3xl
                    font-bold
                "
                >
                    Cart Donation
                </h1>

                {cart.length > 0 && (
                    <button
                        onClick={clearCart}
                        className="
                            bg-red-500
                            text-white
                            px-4
                            py-2
                            rounded-lg
                        "
                    >
                        Kosongkan Cart
                    </button>
                )}
            </div>

            {cart.length === 0 ? (
                <div
                    className="
                    border
                    rounded-xl
                    p-10
                    text-center
                "
                >
                    <h2
                        className="
                        text-2xl
                        font-semibold
                        mb-4
                    "
                    >
                        Cart Kosong
                    </h2>

                    <Link
                        href="/campaigns"
                        className="
                            inline-block
                            bg-black
                            text-white
                            px-6
                            py-3
                            rounded-lg
                        "
                    >
                        Lihat Campaign
                    </Link>
                </div>
            ) : (
                <>
                    <div className="space-y-4">
                        {cart.map((item) => (
                            <div
                                key={item.campaign_id}
                                className="
                                    border
                                    rounded-xl
                                    p-4
                                    flex
                                    items-center
                                    justify-between
                                "
                            >
                                <div
                                    className="
                                    flex
                                    items-center
                                    gap-4
                                "
                                >
                                    <img
                                        src={`/storage/${item.thumbnail}`}
                                        alt={item.title}
                                        className="
                                            w-24
                                            h-24
                                            object-cover
                                            rounded-lg
                                        "
                                    />

                                    <div>
                                        <h3
                                            className="
                                            text-xl
                                            font-semibold
                                        "
                                        >
                                            {item.title}
                                        </h3>

                                        <p
                                            className="
                                            text-gray-500
                                        "
                                        >
                                            Rp{" "}
                                            {Number(
                                                item.amount
                                            ).toLocaleString()}
                                        </p>
                                    </div>
                                </div>

                                <button
                                    onClick={() => removeItem(item.campaign_id)}
                                    className="
                                        bg-red-500
                                        text-white
                                        px-4
                                        py-2
                                        rounded-lg
                                    "
                                >
                                    Hapus
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* TOTAL */}
                    <div
                        className="
                        mt-10
                        border-t
                        pt-6
                        flex
                        items-center
                        justify-between
                    "
                    >
                        <div>
                            <h2
                                className="
                                text-2xl
                                font-bold
                            "
                            >
                                Total Donasi
                            </h2>

                            <p
                                className="
                                text-3xl
                                font-extrabold
                                mt-2
                            "
                            >
                                Rp {Number(grandTotal).toLocaleString()}
                            </p>
                        </div>

                        {/* CHECKOUT */}
                        <Link
                            href="/checkout"
                            className="
                                bg-black
                                text-white
                                px-8
                                py-4
                                rounded-xl
                                text-lg
                                font-semibold
                            "
                        >
                            Lanjut Checkout
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
}
