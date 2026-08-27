export function ResultActions({ onCheckAnother, onShare }) {
    return (
        <div className="flex flex-wrap gap-3 px-1">
            <button
                onClick={onCheckAnother}
                className="rounded-full border-none bg-[#7A7672]/10 px-[18px] py-[11px] text-[13.5px] font-bold text-deep-walnut transition-colors duration-200 hover:bg-grey/[.18]"
            >
                Cek donasi lain
            </button>
            <button
                onClick={onShare}
                className="rounded-full border-none bg-[#7A7672]/10 px-[18px] py-[11px] text-[13.5px] font-bold text-deep-walnut transition-colors duration-200 hover:bg-grey/[.18]"
            >
                Bagikan status ini
            </button>
        </div>
    );
}

export default ResultActions;
