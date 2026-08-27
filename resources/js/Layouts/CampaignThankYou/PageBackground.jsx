import React from "react";

/**
 * Ambient gradient canvas that sits behind the whole page.
 * Pass a ref via `meshRef` to nudge the mesh with pointer position
 * (see Return.jsx), or omit it for a static background.
 */
export default function PageBackground({ meshRef }) {
    return (
        <>
            <div
                ref={meshRef}
                className="absolute inset-0 z-0 bg-[#fbf9f6]"
                style={{
                    background:
                        "radial-gradient(55% 48% at 82% 6%, rgba(172,108,41,.28), transparent 62%)," +
                        "radial-gradient(42% 42% at 6% 26%, rgba(175,155,126,.20), transparent 65%)," +
                        "radial-gradient(58% 58% at 40% 108%, rgba(97,61,24,.14), transparent 60%)," +
                        "#fbf9f6",
                }}
            />
            <div
                className="pointer-events-none absolute inset-0 z-[1] opacity-[0.05] mix-blend-multiply"
                style={{
                    backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                }}
            />
        </>
    );
}
