import React from "react";

const rows = [
    { label: "Location", value: "Cianjur, West Java" },
    { label: "Duration", value: "3 Months" },
    { label: "Category", value: "Education & Infrastructure" },
    { label: "Organizer", value: "Kendi Peduli Foundation" },
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

export default function ProgramInfo() {
    return (
        <div
            className="rounded-2xl p-6"
            style={{ backgroundColor: colors.surfaceContainer }}
        >
            <h3
                className="text-xs font-semibold uppercase mb-4"
                style={{ color: "#986a22" }}
            >
                Program Info
            </h3>
            <div className="space-y-4">
                {rows.map((row, i) => (
                    <div
                        key={row.label}
                        className={`flex justify-between pb-2 ${
                            i < rows.length - 1 ? "border-b" : ""
                        }`}
                        style={{ borderColor: "rgba(255,255,255,0.5)" }}
                    >
                        <span style={{ color: colors.onSurfaceVariant }}>
                            {row.label}
                        </span>
                        <span
                            className="font-medium"
                            style={{ color: colors.onSurface }}
                        >
                            {row.value}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
