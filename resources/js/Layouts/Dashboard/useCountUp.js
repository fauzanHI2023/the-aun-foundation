import { useEffect, useState } from "react";

/**
 * Menganimasikan angka dari 0 menuju `target` dengan easing ease-out-cubic,
 * meniru animated counter pada versi HTML asli.
 */
export function useCountUp(target, duration = 1100) {
    const [value, setValue] = useState(0);
    const safeTarget = Number(target) || 0;

    useEffect(() => {
        let raf;
        const start = performance.now();

        function tick(now) {
            const p = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setValue(Math.round(safeTarget * eased));
            if (p < 1) raf = requestAnimationFrame(tick);
        }
        raf = requestAnimationFrame(tick);

        return () => cancelAnimationFrame(raf);
    }, [safeTarget, duration]);

    return value;
}
