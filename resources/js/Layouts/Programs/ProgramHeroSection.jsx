import React from "react";
import { motion } from "framer-motion";
import { BookOpenText, Check, Heart } from "lucide-react";

export function ProgramHeroSection() {
    return (
        <section className="relative lg:min-h-[85vh] h-[450px] overflow-hidden">
            {/* Left Side - Content */}
            <div className="absolute inset-0 lg:w-1/2 bg-gradient-to-br from-black via-[#1a1410] to-[#2a1f15] z-10">
                <div className="h-full flex items-center px-6 sm:px-12 lg:px-16">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-xl"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-4 py-2 mb-8"
                        >
                            <div className="w-2 h-2 bg-[#ac6c29] rounded-full animate-pulse" />
                            <span className="text-[#ac6c29] text-sm font-medium">
                                5 Core Pillars
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="lg:hidden text-3xl flex flex-wrap gap-2 lg:text-7xl font-bold mb-6 leading-tight"
                        >
                            <span className="text-white">Building</span>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ac6c29] via-[#d4a574] to-[#ac6c29]">
                                Sustainable
                            </span>
                            <span className="text-white">Communities</span>
                        </motion.h1>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="hidden lg:block text-3xl lg:text-7xl font-bold mb-6 leading-tight"
                        >
                            <span className="text-white">Building</span>
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ac6c29] via-[#d4a574] to-[#ac6c29]">
                                Sustainable
                            </span>
                            <br />
                            <span className="text-white">Communities</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-xl text-gray-300 mb-8 leading-relaxed"
                        >
                            Humanitarian initiatives designed to address basic
                            community needs while promoting sustainable
                            empowerment
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="flex lg:flex-wrap flex-row gap-4"
                        >
                            <button className="lg:px-8 lg:py-4 px-4 py-2 rounded-lg bg-gradient-to-r from-[#ac6c29] to-[#8b5723] text-white font-medium hover:shadow-2xl hover:shadow-[#ac6c29]/40 transition-all hover:scale-105">
                                Support Our Programs
                            </button>
                            <button className="lg:px-8 lg:py-4 px-4 py-2 rounded-lg border-2 border-[#ac6c29] text-white font-medium hover:bg-[#ac6c29]/10 transition-all">
                                Learn More
                            </button>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Right Side - Images Collage */}
            <div className="absolute inset-0 lg:left-1/2 w-full lg:w-1/2">
                <div className="relative h-full">
                    {/* Main Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className="absolute inset-0"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200"
                            alt="Community"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 lg:via-transparent to-transparent" />
                    </motion.div>

                    {/* Floating Cards */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 }}
                        className="absolute bottom-8 right-8 bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl max-w-xs hidden lg:block"
                    >
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ac6c29] to-[#8b5723] flex items-center justify-center flex-shrink-0">
                                <BookOpenText className="h-6 w-6 text-white" />
                            </div>
                            <div className="flex flex-col justify-center items-center h-full">
                                {/* <div className="text-2xl font-bold text-black mb-1">
                                    4 Key
                                </div> */}
                                <div className="text-sm text-gray-600">
                                    Education & Knowledge
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="absolute top-1/3 -left-8 lg:left-8 bg-gradient-to-br from-[#5c442a] via-[#64411c] to-[#48321d] backdrop-blur-sm rounded-2xl p-4 shadow-2xl hidden lg:block"
                    >
                        <div className="flex items-center gap-3">
                            {/* <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#ac6c29] to-[#8b5723] flex items-center justify-center">
                                <Check className="h-5 w-5 text-white" />
                            </div> */}
                            <div className="text-lg font-bold text-white">
                                Community Facilities
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
