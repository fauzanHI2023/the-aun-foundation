// components/CategoryFilters.jsx
import { useState } from "react";
import { School } from "lucide-react";

const CATEGORIES = [
    { label: "All Causes", icon: "School" },
    { label: "Emergency", icon: "School" },
    { label: "Medical", icon: "School" },
    { label: "Education", icon: "School" },
    { label: "Climate", icon: "School" },
    { label: "Water", icon: "School" },
    { label: "Orphan", icon: "School" },
];

export default function CategoryFilters({ onChange }) {
    const [active, setActive] = useState("All Causes");

    const handleSelect = (label) => {
        setActive(label);
        onChange?.(label);
    };

    return (
        <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12">
            <div className="flex items-center gap-4 overflow-x-auto hide-scrollbar py-2">
                {CATEGORIES.map((cat) => {
                    const isActive = active === cat.label;
                    return (
                        <button
                            key={cat.label}
                            onClick={() => handleSelect(cat.label)}
                            className={
                                isActive
                                    ? "bg-primary text-on-primary px-8 py-4 rounded-lg flex items-center gap-3 whitespace-nowrap font-semibold shadow-md"
                                    : "bg-surface-container-high hover:bg-surface-container-highest text-on-surface-variant px-8 py-4 rounded-lg flex items-center gap-3 whitespace-nowrap transition-colors font-medium"
                            }
                        >
                            <School
                                className={isActive ? "" : "text-primary"}
                            />
                            {cat.label}
                        </button>
                    );
                })}
            </div>
        </section>
    );
}
