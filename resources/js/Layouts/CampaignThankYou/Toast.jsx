import React from "react";

export default function Toast({ message, visible }) {
    return (
        <div
            className={
                "fixed bottom-7 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full bg-[#1c1b1b] px-5 py-3 text-[13.5px] font-semibold text-white transition-all duration-300 ease-out " +
                (visible
                    ? "translate-y-0 opacity-100"
                    : "pointer-events-none translate-y-5 opacity-0")
            }
        >
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                className="h-3.5 w-3.5"
            >
                <path d="M20 6L9 17l-5-5" />
            </svg>
            <span>{message}</span>
        </div>
    );
}
