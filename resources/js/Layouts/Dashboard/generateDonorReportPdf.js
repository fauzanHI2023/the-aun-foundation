import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { matchesFilters } from "./transactionFilters";
import { isWithinDateRange } from "./dateRange";

// Palet warna sama persis dengan tailwind config dashboard (Aurelian Glass dark)
const C = {
    canvas: [20, 16, 9], // #141009
    surface: [26, 21, 16], // #1a1510
    surfaceHigh: [45, 37, 28], // #2d251c
    surfaceHighest: [51, 41, 33], // #332921
    onSurface: [243, 240, 239], // #f3f0ef
    onSurfaceVar: [185, 171, 153], // #b9ab99
    outlineVariant: [58, 47, 36], // #3a2f24
    primary: [255, 184, 117], // #ffb875
    primaryDeep: [201, 131, 43], // #c9832b
    success: [183, 199, 147], // #b7c793
    error: [255, 144, 134], // #ff9086
    secondary: [198, 198, 199], // #c6c6c7
};

const LOGO_URL = "/image/logo aun putih.png"; // sesuaikan path kalau logo tidak diletakkan di /public/image

const STATUS_LABEL = {
    success: "Sukses",
    pending: "Pending",
    failed: "Gagal",
    expired: "Kedaluwarsa",
};

const STATUS_COLOR = {
    success: C.success,
    pending: C.primary,
    failed: C.error,
    expired: C.secondary,
};

function fmtRp(n) {
    return "Rp" + Math.round(Number(n) || 0).toLocaleString("id-ID");
}

function filterSummaryLines(filters, periodLabel, search) {
    const parts = [`Periode: ${periodLabel}`];
    parts.push(
        `Status: ${
            filters.status === "all"
                ? "Semua"
                : STATUS_LABEL[filters.status] ?? filters.status
        }`
    );
    parts.push(
        `Campaign: ${filters.campaign === "all" ? "Semua" : filters.campaign}`
    );
    parts.push(
        `Metode: ${filters.method === "all" ? "Semua" : filters.method}`
    );
    if (search && search.trim()) parts.push(`Pencarian: "${search.trim()}"`);
    return parts;
}

/**
 * Memuat gambar dari URL menjadi data URL base64 + dimensi asli,
 * supaya bisa dipakai jsPDF.addImage() dan digambar dengan rasio yang benar.
 */
function loadImageAsDataURL(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            let dataUrl;
            try {
                dataUrl = canvas.toDataURL("image/png");
            } catch (err) {
                reject(err);
                return;
            }
            resolve({
                dataUrl,
                width: img.naturalWidth,
                height: img.naturalHeight,
            });
        };
        img.onerror = () => reject(new Error(`Gagal memuat gambar: ${url}`));
        img.src = url;
    });
}

/**
 * Menggambar bar tipis berulang di bagian atas setiap halaman lanjutan
 * (halaman pertama sudah punya header lengkap sendiri, jadi dilewati).
 */
function drawRepeatingChrome(doc, pageWidth, margin, pageNumber, logo) {
    if (pageNumber === 1) return;

    if (logo) {
        const h = 14;
        const w = h * (logo.width / logo.height);
        doc.addImage(logo.dataUrl, "PNG", margin, margin - 2, w, h);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(10.5);
        doc.setTextColor(...C.onSurface);
        doc.text("Laporan Donasi", margin + w + 10, margin + 9);
    } else {
        doc.setFillColor(...C.primary);
        doc.circle(margin + 6, margin + 6, 5, "F");
        doc.setFont("helvetica", "bold");
        doc.setFontSize(10.5);
        doc.setTextColor(...C.onSurface);
        doc.text("AUN Foundation — Laporan Donasi", margin + 18, margin + 9);
    }

    doc.setDrawColor(...C.outlineVariant);
    doc.setLineWidth(0.75);
    doc.line(margin, margin + 18, pageWidth - margin, margin + 18);
}

/**
 * Membuat & mengunduh laporan PDF donasi, mengikuti filter yang sedang aktif
 * di dashboard (atau kondisi default kalau belum difilter sama sekali).
 */
export async function generateDonorReportPdf({
    userName,
    periodLabel,
    filters,
    search = "",
    stats,
    campaigns = [],
    transactions = [],
}) {
    // Muat logo lebih dulu. Kalau gagal (mis. path salah), lanjut tanpa logo
    // supaya proses generate PDF tidak gagal total.
    let logo = null;
    try {
        logo = await loadImageAsDataURL(LOGO_URL);
    } catch (err) {
        console.warn(err.message);
    }

    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 40;

    function paintBackground() {
        doc.setFillColor(...C.canvas);
        doc.rect(0, 0, pageWidth, pageHeight, "F");
    }
    paintBackground();
    doc.internal.events.subscribe("addPage", paintBackground);

    // ===== Header halaman pertama =====
    let y = margin;

    if (logo) {
        const h = 26;
        const w = h * (logo.width / logo.height);
        doc.addImage(logo.dataUrl, "PNG", margin, y - 10, w, h);
    } else {
        // Fallback kalau logo gagal dimuat
        doc.setFillColor(...C.primary);
        doc.circle(margin + 7, y + 3, 7, "F");
        doc.setFont("helvetica", "bold");
        doc.setFontSize(13);
        doc.setTextColor(...C.onSurface);
        doc.text("AUN Foundation", margin + 20, y + 7);
    }

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(...C.onSurfaceVar);
    const generatedAt = new Date().toLocaleString("id-ID", {
        dateStyle: "long",
        timeStyle: "short",
    });
    doc.text(`Dibuat ${generatedAt}`, pageWidth - margin, y + 7, {
        align: "right",
    });

    y += 34;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(...C.onSurface);
    doc.text("Laporan Donasi", margin, y);

    y += 20;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(...C.onSurfaceVar);
    doc.text(`Donatur: ${userName}`, margin, y);

    y += 18;
    doc.setFontSize(9);
    doc.setTextColor(...C.primary);
    doc.text(
        filterSummaryLines(filters, periodLabel, search).join("   ·   "),
        margin,
        y,
        {
            maxWidth: pageWidth - margin * 2,
        }
    );

    y += 26;

    // ===== Kartu ringkasan statistik =====
    const cardGap = 12;
    const cardW = (pageWidth - margin * 2 - cardGap * 3) / 4;
    const cardH = 68;

    const cards = [
        {
            label: "Total Kontribusi",
            value: fmtRp(stats.total_donated),
            accent: C.primary,
        },
        {
            label: "Transaksi Sukses",
            value: String(stats.tx_count ?? 0),
            accent: C.success,
        },
        {
            label: "Campaign Didukung",
            value: String(stats.campaigns_count ?? 0),
            accent: C.secondary,
        },
        {
            label: "Rata-rata Donasi",
            value: fmtRp(stats.avg_donation),
            accent: C.primary,
        },
    ];

    cards.forEach((c, i) => {
        const x = margin + i * (cardW + cardGap);
        doc.setFillColor(...C.surfaceHigh);
        doc.roundedRect(x, y, cardW, cardH, 8, 8, "F");
        doc.setFillColor(...c.accent);
        doc.roundedRect(x, y, 4, cardH, 2, 2, "F");

        doc.setFont("helvetica", "bold");
        doc.setFontSize(15);
        doc.setTextColor(...C.onSurface);
        doc.text(c.value, x + 14, y + 30, { maxWidth: cardW - 24 });

        doc.setFont("helvetica", "normal");
        doc.setFontSize(8.5);
        doc.setTextColor(...C.onSurfaceVar);
        doc.text(c.label, x + 14, y + 48, { maxWidth: cardW - 24 });
    });

    y += cardH + 30;

    // ===== Tabel campaign yang didukung =====
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(...C.onSurface);
    doc.text("Campaign yang Didukung", margin, y);
    y += 8;

    const campaignRows = campaigns.map((c) => [
        c.title,
        c.category ?? "-",
        fmtRp(c.collected),
        fmtRp(c.target),
        `${c.percent ?? 0}%`,
        fmtRp(c.your_contribution),
        c.days_left === null || c.days_left === undefined
            ? "-"
            : c.days_left > 0
            ? `${c.days_left} hari lagi`
            : "Berakhir",
    ]);

    autoTable(doc, {
        startY: y + 6,
        margin: { left: margin, right: margin, top: 70, bottom: 55 },
        head: [
            [
                "Campaign",
                "Kategori",
                "Terkumpul",
                "Target",
                "%",
                "Kontribusimu",
                "Status",
            ],
        ],
        body: campaignRows.length
            ? campaignRows
            : [["Tidak ada campaign pada filter ini.", "", "", "", "", "", ""]],
        theme: "plain",
        styles: {
            font: "helvetica",
            fontSize: 8.25,
            textColor: C.onSurface,
            lineColor: C.outlineVariant,
            lineWidth: 0.5,
            cellPadding: 6,
            valign: "middle",
        },
        headStyles: {
            fillColor: C.surfaceHighest,
            textColor: C.primary,
            fontStyle: "bold",
            fontSize: 8,
        },
        alternateRowStyles: { fillColor: C.surface },
        didDrawPage: (data) =>
            drawRepeatingChrome(doc, pageWidth, margin, data.pageNumber, logo),
    });

    y = doc.lastAutoTable.finalY + 30;

    // Kalau ruang tersisa terlalu sempit untuk judul + minimal 1 baris tabel, mulai halaman baru
    if (y > pageHeight - 140) {
        doc.addPage();
        y = margin + 34;
    }

    // ===== Tabel riwayat transaksi =====
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(...C.onSurface);
    doc.text("Riwayat Transaksi", margin, y);
    y += 8;

    const txRows = transactions.map((t) => [
        t.invoice_number,
        t.campaign_title,
        t.date,
        t.method,
        fmtRp(t.amount),
        STATUS_LABEL[t.status] ?? t.status,
    ]);

    autoTable(doc, {
        startY: y + 6,
        margin: { left: margin, right: margin, top: 70, bottom: 55 },
        head: [
            ["Invoice", "Campaign", "Tanggal", "Metode", "Nominal", "Status"],
        ],
        body: txRows.length
            ? txRows
            : [["Tidak ada transaksi pada filter ini.", "", "", "", "", ""]],
        theme: "plain",
        styles: {
            font: "helvetica",
            fontSize: 8.25,
            textColor: C.onSurface,
            lineColor: C.outlineVariant,
            lineWidth: 0.5,
            cellPadding: 6,
            valign: "middle",
        },
        headStyles: {
            fillColor: C.surfaceHighest,
            textColor: C.primary,
            fontStyle: "bold",
            fontSize: 8,
        },
        alternateRowStyles: { fillColor: C.surface },
        didParseCell: (data) => {
            if (data.section === "body" && data.column.index === 5) {
                const raw = transactions[data.row.index]?.status;
                data.cell.styles.textColor =
                    STATUS_COLOR[raw] ?? C.onSurfaceVar;
                data.cell.styles.fontStyle = "bold";
            }
        },
        didDrawPage: (data) =>
            drawRepeatingChrome(doc, pageWidth, margin, data.pageNumber, logo),
    });

    // ===== Nomor halaman (dipasang terakhir supaya total halaman sudah pasti) =====
    const totalPages = doc.internal.getNumberOfPages();
    for (let p = 1; p <= totalPages; p++) {
        doc.setPage(p);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);
        doc.setTextColor(...C.onSurfaceVar);
        doc.text(
            `Halaman ${p} dari ${totalPages}`,
            pageWidth - margin,
            pageHeight - 24,
            {
                align: "right",
            }
        );
        doc.text(
            "Dokumen ini dibuat otomatis oleh dashboard donatur.",
            margin,
            pageHeight - 24
        );
    }

    const fileDate = new Date().toISOString().slice(0, 10);
    doc.save(`laporan-donasi-${fileDate}.pdf`);
}

/**
 * Helper untuk Dashboard.jsx: menyaring transaksi & campaign sesuai filter
 * yang sedang aktif, lalu langsung memicu pembuatan PDF-nya.
 */
export async function downloadFilteredReport({
    userName,
    periodLabel,
    filters,
    search,
    stats,
    campaigns,
    transactions,
}) {
    const filteredTransactions = transactions
        .filter(
            (t) =>
                matchesFilters(t, filters, search) &&
                isWithinDateRange(t.date_iso, filters.dateRange)
        )
        .sort((a, b) => new Date(b.date_iso ?? 0) - new Date(a.date_iso ?? 0));

    const filteredCampaigns =
        filters.campaign === "all"
            ? campaigns
            : campaigns.filter((c) => c.title === filters.campaign);

    await generateDonorReportPdf({
        userName,
        periodLabel,
        filters,
        search,
        stats,
        campaigns: filteredCampaigns,
        transactions: filteredTransactions,
    });
}
