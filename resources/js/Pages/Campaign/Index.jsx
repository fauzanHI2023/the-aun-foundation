import { Link } from "@inertiajs/react";

export default function Index({ campaigns }) {
    return (
        <div className="p-10">
            <h1 className="text-3xl font-bold mb-6">Campaign Donation</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {campaigns.data.map((campaign) => (
                    <div
                        key={campaign.id}
                        className="border rounded-xl overflow-hidden shadow"
                    >
                        {/* THUMBNAIL */}
                        <img
                            src={`/storage/${campaign.thumbnail}`}
                            alt={campaign.title}
                            className="w-full h-52 object-cover"
                        />

                        <div className="p-4">
                            {/* TITLE */}
                            <h2 className="text-xl font-semibold mb-2">
                                {campaign.title}
                            </h2>

                            {/* SHORT DESC */}
                            <p className="text-gray-600 mb-4 line-clamp-2">
                                {campaign.short_description}
                            </p>

                            {/* TARGET */}
                            <div className="mb-2">
                                <span className="font-medium">Target:</span> Rp{" "}
                                {Number(
                                    campaign.target_amount
                                ).toLocaleString()}
                            </div>

                            {/* COLLECTED */}
                            <div className="mb-4">
                                <span className="font-medium">Terkumpul:</span>{" "}
                                Rp{" "}
                                {Number(
                                    campaign.collected_amount
                                ).toLocaleString()}
                            </div>

                            {/* DETAIL BUTTON */}
                            <Link
                                href={`/campaigns/${campaign.slug}`}
                                className="
                                    inline-block
                                    bg-black
                                    text-white
                                    px-4
                                    py-2
                                    rounded-lg
                                "
                            >
                                Detail Campaign
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {/* PAGINATION */}
            <div className="flex gap-2 mt-10">
                {campaigns.links.map((link, index) => (
                    <Link
                        key={index}
                        href={link.url || "#"}
                        dangerouslySetInnerHTML={{
                            __html: link.label,
                        }}
                        className={`
                            px-3 py-2 border rounded

                            ${link.active ? "bg-black text-white" : "bg-white"}

                            ${!link.url ? "opacity-50 pointer-events-none" : ""}
                        `}
                    />
                ))}
            </div>
        </div>
    );
}
