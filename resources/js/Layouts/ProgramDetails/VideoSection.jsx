import { Play } from "lucide-react";

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

export default function VideoSection() {
    return (
        <section
            className="relative rounded-3xl overflow-hidden aspect-video mb-20 group cursor-pointer"
            style={{ backgroundColor: colors.cacao900 }}
        >
            <img
                alt="Listen to Bu Aminah's Story"
                className="w-full h-full object-cover opacity-60"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAbiSdxv-iYS433GBf5MC-B2tSe7WBpWqQO_Lhr05yKveD-zGf1rM0X2Mt7aGzde-IRj4f0kUWL871SrLdmAVLwUkKfeDLpXI5WA_NqhLwoA_-jIZ2VwYCCs2_BQXtZQSMhNJ1DUIlUowzTFiA5YBFv7kd4SoiqPoe6fnE43J6RRjH3zubbYapZQOg4_n_g1a3SYcUyvX3ZC2A-CDQ40rQoseFLyezbAMBarc75_SpljaKzTlayLVC3"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <div className="w-20 h-20 rounded-full border-2 border-white flex items-center justify-center bg-white/10 backdrop-blur-md group-hover:scale-110 transition-transform">
                    <Play size={36} />
                </div>
                <p className="mt-6 font-serif italic text-2xl">
                    Listen to Bu Aminah's Story
                </p>
            </div>
        </section>
    );
}
