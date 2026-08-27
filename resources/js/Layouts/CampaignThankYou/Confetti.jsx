import React, { useEffect, useState } from "react";

const COLORS = ["#ac6c29", "#613d18", "#9c8f7e", "#6b4226"];
const PIECE_COUNT = 24;

/**
 * Short confetti burst, fired once via `trigger` changing (e.g. Date.now()).
 * Respects prefers-reduced-motion and cleans itself up.
 */
export default function Confetti({ trigger }) {
    const [pieces, setPieces] = useState([]);

    useEffect(() => {
        if (!trigger) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
            return;

        const next = Array.from({ length: PIECE_COUNT }).map((_, i) => {
            const size = 5 + Math.random() * 5;
            const duration = 2.6 + Math.random() * 1.8;
            return {
                id: `${Date.now()}-${i}`,
                width: size,
                height: size * (0.4 + Math.random() * 0.6),
                left: Math.random() * 100,
                color: COLORS[Math.floor(Math.random() * COLORS.length)],
                rot: `${Math.random() * 360}deg`,
                duration,
                delay: Math.random() * 0.4,
                opacity: 0.85 + Math.random() * 0.15,
            };
        });
        setPieces(next);

        const cleanupTimer = setTimeout(() => setPieces([]), 4600);
        return () => clearTimeout(cleanupTimer);
    }, [trigger]);

    if (pieces.length === 0) return null;

    return (
        <>
            <style>{`
                @keyframes confetti-fall {
                    0% { transform: translateY(0) rotate(0deg); }
                    100% { transform: translateY(105vh) rotate(var(--rot)); }
                }
            `}</style>
            {pieces.map((p) => (
                <div
                    key={p.id}
                    className="fixed top-[-10px] z-40 rounded-[2px]"
                    style={{
                        width: p.width,
                        height: p.height,
                        left: `${p.left}vw`,
                        background: p.color,
                        opacity: p.opacity,
                        animation: `confetti-fall ${p.duration}s ${p.delay}s ease-in forwards`,
                        "--rot": p.rot,
                    }}
                />
            ))}
        </>
    );
}
