import { motion } from "framer-motion";

export function HeroSection() {
    return (
        <section className="min-h-[80vh] md:h-full flex items-center relative overflow-hidden">
            {/* Background Gradient Blob */}
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.2 }}
                className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-[#ef1968]/10 to-[#f7c498]/10 rounded-full blur-3xl"
            />

            <div className="container mx-auto px-6 md:px-12 py-12 md:py-12 relative">
                <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
                    {/* Left - Text */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="space-y-4 md:space-y-6 lg:space-y-8"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-1 bg-[#ef1968]" />
                            <span className="text-sm uppercase tracking-widest text-gray-500">
                                About Us
                            </span>
                        </div>

                        <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.9]">
                            We Are
                            <br />
                            <span className="inline-block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-[#ef1968] to-[#f7c498]">
                                Rembulan
                            </span>
                            <br />
                            <span className="text-gray-900">Relief</span>
                        </h1>

                        <p className="text-lg md:text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-xl">
                            A humanitarian organization dedicated to advancing
                            dignity, equity, and well-being in Indonesia.
                        </p>

                        {/* <div className="flex gap-4 pt-4">
                            <div className="flex -space-x-3">
                                <div className="w-12 h-12 rounded-full bg-[#ef1968] border-4 border-white" />
                                <div className="w-12 h-12 rounded-full bg-[#f7c498] border-4 border-white" />
                                <div className="w-12 h-12 rounded-full bg-gray-200 border-4 border-white flex items-center justify-center text-xs font-bold">
                                    +10k
                                </div>
                            </div>
                            <div className="text-sm text-gray-500 leading-tight pt-2">
                                <p className="font-bold text-gray-900">
                                    Empowering Communities
                                </p>
                                <p>Women, children & families</p>
                            </div>
                        </div> */}
                    </motion.div>

                    {/* Right - Collage Images */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="relative h-[450px] md:h-[500px] lg:h-[600px]"
                    >
                        {/* Main Large Image */}
                        <div className="absolute top-0 right-0 w-[70%] h-[65%] z-10">
                            <img
                                src="/images/aboutus/DSC04066-Edit.jpg"
                                alt="Women empowerment"
                                className="w-full h-full object-cover"
                                style={{ borderRadius: "40px 40px 40px 8px" }}
                            />
                        </div>

                        {/* Circular Image Bottom Left */}
                        <div className="absolute bottom-12 left-0 w-44 h-44 md:w-56 md:h-56 z-20">
                            <img
                                src="/images/aboutus/DSC07922.JPG"
                                alt="Mother and child"
                                className="w-full h-full object-cover rounded-full border-4 md:border-8 border-white"
                            />
                        </div>

                        {/* Pink Accent Card */}
                        <div
                            className="absolute top-24 md:left-8 left-0 w-32 h-32 md:w-40 md:h-40 bg-[#ef1968] flex flex-col items-center justify-center text-white z-0"
                            style={{ borderRadius: "24px 24px 24px 6px" }}
                        >
                            <p className="text-5xl font-bold">15+</p>
                            <p className="text-sm mt-2 text-center px-4">
                                Years of Impact
                            </p>
                        </div>

                        {/* Floating Badge */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="absolute bottom-0 right-12 bg-white px-6 py-4 z-30"
                            style={{
                                borderRadius: "20px 20px 20px 4px",
                                boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                            }}
                        >
                            <p className="text-xs text-gray-500 uppercase tracking-wider">
                                Our Focus
                            </p>
                            <p className="text-lg font-bold text-gray-900">
                                Women & Children
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
