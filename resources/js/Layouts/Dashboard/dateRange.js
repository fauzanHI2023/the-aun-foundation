/**
 * Mengecek apakah sebuah tanggal (ISO string "YYYY-MM-DD") termasuk dalam
 * rentang yang dipilih di FilterBar: 'all' | '7d' | '30d' | '3m' | 'ytd'.
 */
export function isWithinDateRange(dateIso, range) {
    if (!dateIso || range === "all") return true;

    const date = new Date(dateIso);
    const now = new Date();

    switch (range) {
        case "7d": {
            const from = new Date(now);
            from.setDate(from.getDate() - 7);
            return date >= from;
        }
        case "30d": {
            const from = new Date(now);
            from.setDate(from.getDate() - 30);
            return date >= from;
        }
        case "3m": {
            const from = new Date(now);
            from.setMonth(from.getMonth() - 3);
            return date >= from;
        }
        case "ytd": {
            const from = new Date(now.getFullYear(), 0, 1);
            return date >= from;
        }
        default:
            return true;
    }
}
