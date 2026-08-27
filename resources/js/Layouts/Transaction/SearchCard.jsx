export function SearchCard({
    value,
    onChange,
    onSubmit,
    onFillSample,
    hasError,
    isLoading,
    inputRef,
}) {
    function handleKeyDown(e) {
        if (e.key === "Enter") {
            e.preventDefault();
            onSubmit();
        }
    }

    return (
        <div className="glass-panel mb-5 rounded-xl p-8">
            <label
                htmlFor="invoiceInput"
                className="mb-2.5 block text-[12.5px] font-bold uppercase tracking-[0.08em] text-grey"
            >
                Invoice number
            </label>

            <div className="flex items-stretch gap-2.5">
                <div
                    className={`flex flex-1 items-center rounded-2xl bg-white/65 shadow-[inset_0_0_0_1.5px_rgba(122,118,114,0.18)] transition-shadow duration-200 focus-within:shadow-[inset_0_0_0_1.5px_#8B5E34] ${
                        hasError
                            ? "animate-shake shadow-[inset_0_0_0_1.5px_#C15C46]"
                            : ""
                    }`}
                >
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        className="ml-4 h-[18px] w-[18px] flex-none text-grey"
                    >
                        <rect x="3" y="5" width="18" height="14" rx="2" />
                        <path d="M3 7l9 6 9-6" />
                    </svg>
                    <input
                        ref={inputRef}
                        type="text"
                        id="invoiceInput"
                        placeholder="mis. 2026-000123"
                        autoComplete="off"
                        spellCheck="false"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="flex-1 border-none bg-transparent px-3.5 py-4 font-mono text-[15px] font-medium uppercase tracking-[0.02em] text-pitch-black outline-none placeholder:font-sans placeholder:normal-case placeholder:text-grey placeholder:opacity-60"
                    />
                </div>

                <button
                    type="button"
                    onClick={onSubmit}
                    disabled={isLoading || !value.trim()}
                    className="flex min-w-[130px] items-center justify-center gap-2.5 rounded-2xl border-none bg-primary-black px-6 text-[14.5px] font-bold text-white transition-all duration-[250ms] ease-in-out hover:enabled:bg-deep-walnut disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.4"
                        className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
                    >
                        <circle cx="11" cy="11" r="7" />
                        <path d="M21 21l-4.3-4.3" />
                    </svg>
                    <span>{isLoading ? "Searching…" : "Check donation"}</span>
                </button>
            </div>

            {hasError && (
                <p className="mt-2.5 text-[12.5px] font-semibold text-err-text">
                    Please enter a invoice number first.
                </p>
            )}

            {onFillSample && (
                <p className="mt-3 text-[12.5px] text-grey">
                    Your donation number is in the confirmation email. Try the
                    example:{" "}
                    <b
                        onClick={onFillSample}
                        className="cursor-pointer font-bold text-primary"
                    >
                        AUN0040926W
                    </b>
                </p>
            )}
        </div>
    );
}

export default SearchCard;
