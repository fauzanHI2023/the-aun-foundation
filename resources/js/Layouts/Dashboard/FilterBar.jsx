const chevron = (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="w-3 h-3 text-outline pointer-events-none -ml-4"
    >
        <path d="M6 9l6 6 6-6" />
    </svg>
);

export const DATE_RANGES = [
    { value: "all", label: "All the time" },
    { value: "7d", label: "The last 7 days" },
    { value: "30d", label: "The last 30 days" },
    { value: "3m", label: "the last 3 months" },
    { value: "ytd", label: "This year" },
];

export const STATUS_OPTIONS = [
    { value: "all", label: "All statuses" },
    { value: "success", label: "Success" },
    { value: "pending", label: "Pending" },
    { value: "failed", label: "Failed" },
    { value: "expired", label: "Expired" },
];

export default function FilterBar({
    filters,
    onFilterChange,
    search,
    onSearchChange,
    onReset,
    campaigns = [],
    methods = [],
}) {
    function set(key, value) {
        onFilterChange({ ...filters, [key]: value });
    }

    return (
        <div className="glass mt-6 py-3.5 px-4 rounded-3xl flex items-center gap-2.5 flex-wrap">
            <div className="flex items-center gap-[7px] font-label text-[11px] font-semibold text-[#b9ab99] uppercase tracking-[.05em] pl-1.5 pr-1">
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#b9ab99"
                    strokeWidth="2"
                    className="w-3.5 h-3.5 text-primary"
                >
                    <path d="M4 6h16M7 12h10M10 18h4" />
                </svg>
                Filter
            </div>

            <div className="select-dashboard-donor flex items-center gap-2 py-2 px-3 rounded-full text-xs text-white ">
                <select
                    value={filters.dateRange}
                    onChange={(e) => set("dateRange", e.target.value)}
                >
                    {DATE_RANGES.map((r) => (
                        <option key={r.value} value={r.value}>
                            {r.label}
                        </option>
                    ))}
                </select>
                {chevron}
            </div>

            <div className="select-dashboard-donor flex items-center gap-2 py-2 px-3 rounded-full text-xs text-white ">
                <select
                    value={filters.status}
                    onChange={(e) => set("status", e.target.value)}
                >
                    {STATUS_OPTIONS.map((s) => (
                        <option key={s.value} value={s.value}>
                            {s.label}
                        </option>
                    ))}
                </select>
                {chevron}
            </div>

            <div className="select-dashboard-donor flex items-center gap-2 py-2 px-3 rounded-full text-xs text-white">
                <select
                    value={filters.campaign}
                    onChange={(e) => set("campaign", e.target.value)}
                    className="w-[14rem]"
                >
                    <option value="all">All Campaigns</option>
                    {campaigns.map((c) => (
                        <option key={c.id} value={c.title}>
                            {c.title}
                        </option>
                    ))}
                </select>
                {chevron}
            </div>

            <div className="select-dashboard-donor flex items-center gap-2 py-2 px-3 rounded-full text-xs text-white ">
                <select
                    value={filters.method}
                    onChange={(e) => set("method", e.target.value)}
                >
                    <option value="all">All methods</option>
                    {methods.map((m) => (
                        <option key={m} value={m}>
                            {m}
                        </option>
                    ))}
                </select>
                {chevron}
            </div>

            <div className="select-dashboard-donor flex items-center gap-2 py-2 px-3 rounded-full text-xs text-white w-[19rem]">
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="w-3.5 h-3.5 text-outline shrink-0"
                >
                    <circle cx="11" cy="11" r="7" />
                    <path d="M21 21l-4.3-4.3" />
                </svg>
                <input
                    type="text"
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Search by invoice number or campaign name..."
                    className="bg-transparent border-none outline-none text-onsurface text-[13px] w-full placeholder:text-outline py-0 px-0 text-xs"
                />
            </div>

            <button
                onClick={onReset}
                className="ml-auto font-label text-xs font-semibold  py-2 px-3 rounded-full bg-primary text-white hover:brightness-[1.06] transition-[filter] duration-150 hover:bg-primary/80 cursor-pointer"
            >
                Reset
            </button>
        </div>
    );
}
