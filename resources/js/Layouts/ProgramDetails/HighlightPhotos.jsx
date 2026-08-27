import React from "react";

const photos = [
    {
        alt: "Direct Aid Distribution",
        caption: "Direct Aid Distribution",
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBzMnTCDyCge369jKmpGtSK31fg5uA0ZFgjiHvvY2yrfsWoBU7dT9eJTiSrhIgYAm4Qu9ZG2UKsuQjJvzQ_vjj0FDV6V0V946LF_qpz2ymoT63Gi62WeenuEGa257hkRNxz6eWQKbtPjPb65PYMgfx_mkXSpNRTCDBQaCwud272HuZSFyDVDuFcCUoP13v3bz4OZVnnVGUX2P3o-j7QpMId4Qv7os79Nwg2ev8U6DYaIW1lcSUWL_vp",
    },
    {
        alt: "Field Team Supervision",
        caption: "Field Team Supervision",
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCTY4OAbS6gB07zQeNL1flvZJYyFuM4HPLjHzzdOsxr8znYIvW1kP2YF3DmNWeOmEcGGxLW27OiHBOGZ4hBmwNTywUSAzghudlijtqh-lMEQc-QF47lmJVq5tVrjH18JP8x1Zj_teXV6KpvAtx4n6x7uZOlEtnZhQ95IcQ4vpLGElCvL5UHOw3Fq7EgNF4JOvODTdPB5F348hmrgWbu8gxICQjBE-rKktQh9LZsIAyvhrD6t9djqg4D",
    },
];

const colors = {
    cacao900: "#2E1D14",
    onSurface: "#28180f",
    onSurfaceVariant: "#434847",
    harvest400: "#B8863C",
    stone100: "#FAFAF9",
    surface: "#fff8f6",
    surfaceContainer: "#ffeae0",
    surfaceContainerHighest: "#fcdccd",
    outlineVariant: "#c4c7c6",
    verifiedSage: "#5C6B4F",
    white: "#ffffff",
};

export default function HighlightPhotos() {
    return (
        <section className="grid grid-cols-2 gap-4 mb-20">
            {photos.map((p) => (
                <div key={p.caption} className="space-y-2">
                    <div className="aspect-square rounded-2xl overflow-hidden">
                        <img
                            alt={p.alt}
                            className="w-full h-full object-cover"
                            src={p.src}
                        />
                    </div>
                    <p
                        className="text-xs uppercase text-center"
                        style={{ color: colors.onSurfaceVariant }}
                    >
                        {p.caption}
                    </p>
                </div>
            ))}
        </section>
    );
}
