import React from "react";

/**
 * Frosted "glass" card used for the donor + receipt panels.
 */
export default function GlassPanel({ className = "", style, children }) {
    return (
        <div
            style={style}
            className={`border border-white/60 bg-white/70 shadow-[0_20px_45px_-25px_rgba(28,27,27,0.25)] backdrop-blur-xl ${className}`}
        >
            {children}
        </div>
    );
}
