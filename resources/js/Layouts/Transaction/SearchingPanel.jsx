export function SearchingPanel() {
    return (
        <div className="glass-panel mb-5 animate-fadeIn rounded-card px-8 py-11 text-center">
            <div className="relative mx-auto mb-[22px] h-16 w-16">
                <span className="absolute inset-0 animate-radar rounded-full border-[1.5px] border-warm-bark opacity-0" />
                <span className="absolute inset-0 animate-radar rounded-full border-[1.5px] border-warm-bark opacity-0 [animation-delay:0.5s]" />
                <span className="absolute inset-0 animate-radar rounded-full border-[1.5px] border-warm-bark opacity-0 [animation-delay:1s]" />
                <div className="absolute inset-[18px] rounded-full bg-gradient-to-br from-amber-light to-amber-dark shadow-[0_8px_20px_-6px_rgba(107,66,38,0.5)]" />
            </div>
            <p className="m-0 text-[14.5px] font-semibold text-carbon-black opacity-75">
                <span>Mencari data donasi</span>
                <span className="dots-loading" />
            </p>
        </div>
    );
}

export default SearchingPanel;
