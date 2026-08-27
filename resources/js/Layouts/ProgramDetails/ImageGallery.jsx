import { useState } from "react";
import { ChevronLeft, ChevronRight, Eye } from "lucide-react";

const images = [
    {
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBhXw8m0k8jNgEX5TcV0WLr0UC6VeDYHFq0HAkcBaokUxoUKZs6yIKrkM2H97xor1uNaoMLrgiV1dyAJYEzmrcZtIVQbHn9BymnX4P3cQrNyUh11ZfOyzhghOD87eKo340iBlBsz8sGXzOdygEHoPCYvTko5B8ZyYPYQM87Ur9xy_vu7JUu2BJ8-B-T_DpclZw0ZLuoEuAY-kWsFgfL6zKWyKDMFMLCKKWhyjqBrav2MOzoEVwE-3Vv",
        alt: "School in Cianjur",
    },
    {
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBhXw8m0k8jNgEX5TcV0WLr0UC6VeDYHFq0HAkcBaokUxoUKZs6yIKrkM2H97xor1uNaoMLrgiV1dyAJYEzmrcZtIVQbHn9BymnX4P3cQrNyUh11ZfOyzhghOD87eKo340iBlBsz8sGXzOdygEHoPCYvTko5B8ZyYPYQM87Ur9xy_vu7JUu2BJ8-B-T_DpclZw0ZLuoEuAY-kWsFgfL6zKWyKDMFMLCKKWhyjqBrav2MOzoEVwE-3Vv",
        alt: "Ganti gambar 2",
    },
    {
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBhXw8m0k8jNgEX5TcV0WLr0UC6VeDYHFq0HAkcBaokUxoUKZs6yIKrkM2H97xor1uNaoMLrgiV1dyAJYEzmrcZtIVQbHn9BymnX4P3cQrNyUh11ZfOyzhghOD87eKo340iBlBsz8sGXzOdygEHoPCYvTko5B8ZyYPYQM87Ur9xy_vu7JUu2BJ8-B-T_DpclZw0ZLuoEuAY-kWsFgfL6zKWyKDMFMLCKKWhyjqBrav2MOzoEVwE-3Vv",
        alt: "Ganti gambar 3",
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

export default function ImageGallery() {
    const [current, setCurrent] = useState(0);

    const goPrev = () => {
        setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const goNext = () => {
        setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    return (
        <section className="relative mb-16 h-[500px] rounded-2xl overflow-hidden group">
            {images.map((img, index) => (
                <img
                    key={index}
                    alt={img.alt}
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
                    style={{ opacity: index === current ? 1 : 0 }}
                    src={img.src}
                />
            ))}

            <div
                className="absolute inset-0"
                style={{
                    background:
                        "linear-gradient(to top, rgba(46,29,20,0.4), transparent)",
                }}
            />

            <button
                aria-label="Previous image"
                onClick={goPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                style={{
                    backgroundColor: "rgba(250,249,247,0.55)",
                    backdropFilter: "blur(18px)",
                    border: "1px solid rgba(255,255,255,0.35)",
                    color: colors.cacao900,
                }}
            >
                <ChevronLeft size={20} />
            </button>
            <button
                aria-label="Next image"
                onClick={goNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                style={{
                    backgroundColor: "rgba(250,249,247,0.55)",
                    backdropFilter: "blur(18px)",
                    border: "1px solid rgba(255,255,255,0.35)",
                    color: colors.cacao900,
                }}
            >
                <ChevronRight size={20} />
            </button>

            <div
                className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 p-2 rounded-full"
                style={{
                    backgroundColor: "rgba(250,249,247,0.55)",
                    backdropFilter: "blur(18px)",
                }}
            >
                {images.map((_, index) => (
                    <button
                        key={index}
                        aria-label={`Go to image ${index + 1}`}
                        onClick={() => setCurrent(index)}
                        className="w-2 h-2 rounded-full transition-all"
                        style={{
                            backgroundColor:
                                index === current
                                    ? colors.cacao900
                                    : "rgba(46,29,20,0.3)",
                            width: index === current ? "18px" : "8px",
                        }}
                    />
                ))}
            </div>

            <div
                className="absolute top-4 left-4 px-4 py-2 rounded-full flex items-center space-x-2"
                style={{
                    backgroundColor: "rgba(250,249,247,0.55)",
                    backdropFilter: "blur(18px)",
                    color: colors.cacao900,
                }}
            >
                <Eye size={16} />
                <span className="text-xs font-semibold uppercase">
                    Field Activities
                </span>
            </div>
        </section>
    );
}
