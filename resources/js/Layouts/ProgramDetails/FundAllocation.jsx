import { HardHat, Users, Armchair, PackageOpen } from "lucide-react";

const items = [
    { icon: HardHat, label: "Construction materials", amount: "Rp 60,000,000" },
    { icon: Users, label: "Labor wages", amount: "Rp 40,000,000" },
    { icon: Armchair, label: "Classroom facilities", amount: "Rp 35,000,000" },
    { icon: PackageOpen, label: "Operational costs", amount: "Rp 15,000,000" },
];

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

export default function FundAllocation() {
    return (
        <div>
            <h3
                className="text-2xl font-medium mb-6 pb-2 border-b"
                style={{
                    borderColor: colors.outlineVariant,
                    color: colors.onSurface,
                }}
            >
                Fund Allocation Details
            </h3>
            <ul className="space-y-4 text-lg">
                {items.map((item) => (
                    <li
                        key={item.label}
                        className="flex justify-between items-center"
                    >
                        <span
                            className="flex items-center"
                            style={{ color: colors.onSurface }}
                        >
                            <item.icon
                                size={20}
                                style={{ color: colors.harvest400 }}
                                className="mr-2"
                            />
                            {item.label}
                        </span>
                        <span
                            className="font-bold"
                            style={{ color: colors.onSurface }}
                        >
                            {item.amount}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
