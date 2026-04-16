import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
    GraduationCap,
    TrendingUp,
    Heart,
    Shield,
    Leaf,
    Plus,
    Minus,
    Sparkles,
} from "lucide-react";
import { programsData } from "./programsData";

const iconMap = {
    GraduationCap,
    TrendingUp,
    Heart,
    Shield,
    Leaf,
};

const DEFAULT_IMAGE =
    "https://images.unsplash.com/photo-1618053448748-b7251851d014?w=400";

export function ProgramsCompact() {
    const [activeProgram, setActiveProgram] = useState("rise");
    const [expandedSubProgram, setExpandedSubProgram] = useState(null);

    const currentProgram = programsData.find((p) => p.id === activeProgram);

    return (
        <section
            id="programs-detail"
            className="py-16 md:py-24 bg-white relative overflow-hidden"
        >
            {/* Floating Gradient Orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.03, 0.05, 0.03],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute top-1/4 left-0 w-96 h-96 bg-[#ef1968] rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.03, 0.05, 0.03],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1,
                    }}
                    className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#f7c498] rounded-full blur-3xl"
                />
            </div>

            <div className="container mx-auto px-6 md:px-12 relative">
                <div className="max-w-6xl mx-auto">
                    {/* Program Pills - Floating Style */}
                    <div className="mb-12 md:mb-16">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center mb-8"
                        >
                            <div className="inline-flex items-center gap-2 mb-3">
                                <Sparkles
                                    size={16}
                                    className="text-[#ef1968]"
                                />
                                <span className="text-xs uppercase tracking-widest text-gray-500 font-bold">
                                    Dive Deeper
                                </span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                                Select a Program
                            </h2>
                        </motion.div>

                        <div className="flex flex-wrap gap-3 justify-center">
                            {programsData.map((program, idx) => {
                                const Icon = iconMap[program.icon];
                                const isActive = activeProgram === program.id;

                                return (
                                    <motion.button
                                        key={program.id}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: idx * 0.08 }}
                                        onClick={() => {
                                            setActiveProgram(program.id);
                                            setExpandedSubProgram(null);
                                        }}
                                        whileHover={{ scale: 1.05, y: -3 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`relative px-6 py-3 transition-all duration-300 ${
                                            isActive
                                                ? "text-white"
                                                : "bg-white text-gray-700 border border-gray-200"
                                        }`}
                                        style={{
                                            backgroundColor: isActive
                                                ? program.color
                                                : undefined,
                                            borderRadius: "20px 20px 20px 5px",
                                        }}
                                    >
                                        <div className="flex items-center gap-2">
                                            <Icon
                                                size={20}
                                                className={
                                                    isActive
                                                        ? "text-white"
                                                        : "text-gray-400"
                                                }
                                            />
                                            <span className="font-bold text-sm">
                                                {program.name}
                                            </span>
                                        </div>

                                        {isActive && (
                                            <motion.div
                                                layoutId="activePill"
                                                className="absolute inset-0 -z-10"
                                                style={{
                                                    backgroundColor:
                                                        program.color,
                                                    borderRadius:
                                                        "20px 20px 20px 5px",
                                                }}
                                            />
                                        )}
                                    </motion.button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Program Content */}
                    <AnimatePresence mode="wait">
                        {currentProgram && (
                            <motion.div
                                key={currentProgram.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4 }}
                            >
                                {/* Sub-Programs - Stacked Cards */}
                                <div className="space-y-4">
                                    {currentProgram.subPrograms.map(
                                        (subProgram, index) => {
                                            const isExpanded =
                                                expandedSubProgram ===
                                                subProgram.id;

                                            return (
                                                <motion.div
                                                    key={subProgram.id}
                                                    initial={{
                                                        opacity: 0,
                                                        x: -20,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        x: 0,
                                                    }}
                                                    transition={{
                                                        duration: 0.3,
                                                        delay: index * 0.05,
                                                    }}
                                                    className="group"
                                                >
                                                    <div
                                                        className={`bg-white border transition-all cursor-pointer ${
                                                            isExpanded
                                                                ? "border-current"
                                                                : "border-gray-200 hover:border-gray-300"
                                                        }`}
                                                        style={{
                                                            borderRadius:
                                                                "28px 28px 28px 7px",
                                                            borderColor:
                                                                isExpanded
                                                                    ? currentProgram.color
                                                                    : undefined,
                                                        }}
                                                        onClick={() =>
                                                            setExpandedSubProgram(
                                                                isExpanded
                                                                    ? null
                                                                    : subProgram.id
                                                            )
                                                        }
                                                    >
                                                        {/* Compact Header */}
                                                        <div className="p-5 md:p-6 flex items-center gap-4">
                                                            {/* Number Badge */}
                                                            <motion.div
                                                                className="flex-shrink-0 w-12 h-12 flex items-center justify-center font-bold text-white"
                                                                style={{
                                                                    backgroundColor:
                                                                        currentProgram.color,
                                                                    borderRadius:
                                                                        "12px 12px 12px 3px",
                                                                }}
                                                                whileHover={{
                                                                    rotate: [
                                                                        0, -5,
                                                                        5, 0,
                                                                    ],
                                                                }}
                                                                transition={{
                                                                    duration: 0.5,
                                                                }}
                                                            >
                                                                {String(
                                                                    index + 1
                                                                ).padStart(
                                                                    2,
                                                                    "0"
                                                                )}
                                                            </motion.div>

                                                            {/* Content */}
                                                            <div className="flex-1 min-w-0">
                                                                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-1 group-hover:text-[#ef1968] transition-colors">
                                                                    {
                                                                        subProgram.name
                                                                    }
                                                                </h3>
                                                                <p className="text-sm text-gray-600 line-clamp-1">
                                                                    {
                                                                        subProgram.focus
                                                                    }
                                                                </p>
                                                            </div>

                                                            {/* Expand Button */}
                                                            <motion.div
                                                                animate={{
                                                                    rotate: isExpanded
                                                                        ? 180
                                                                        : 0,
                                                                }}
                                                                transition={{
                                                                    duration: 0.3,
                                                                }}
                                                                className="flex-shrink-0"
                                                            >
                                                                <div
                                                                    className="w-10 h-10 flex items-center justify-center"
                                                                    style={{
                                                                        backgroundColor: `${currentProgram.color}15`,
                                                                        borderRadius:
                                                                            "10px 10px 10px 2px",
                                                                    }}
                                                                >
                                                                    {isExpanded ? (
                                                                        <Minus
                                                                            size={
                                                                                20
                                                                            }
                                                                            style={{
                                                                                color: currentProgram.color,
                                                                            }}
                                                                        />
                                                                    ) : (
                                                                        <Plus
                                                                            size={
                                                                                20
                                                                            }
                                                                            style={{
                                                                                color: currentProgram.color,
                                                                            }}
                                                                        />
                                                                    )}
                                                                </div>
                                                            </motion.div>
                                                        </div>

                                                        {/* Expandable Content */}
                                                        <AnimatePresence>
                                                            {isExpanded && (
                                                                <motion.div
                                                                    initial={{
                                                                        height: 0,
                                                                        opacity: 0,
                                                                    }}
                                                                    animate={{
                                                                        height: "auto",
                                                                        opacity: 1,
                                                                    }}
                                                                    exit={{
                                                                        height: 0,
                                                                        opacity: 0,
                                                                    }}
                                                                    transition={{
                                                                        duration: 0.3,
                                                                    }}
                                                                    className="overflow-hidden"
                                                                >
                                                                    <div className="px-5 md:px-6 pb-6 pt-2 space-y-6 border-t border-gray-100">
                                                                        {/* Image + Description */}
                                                                        <div className="grid md:grid-cols-5 gap-6">
                                                                            {/* Image */}
                                                                            <div className="md:col-span-2">
                                                                                <div
                                                                                    className="relative h-48 md:h-56 overflow-hidden"
                                                                                    style={{
                                                                                        borderRadius:
                                                                                            "20px 20px 20px 5px",
                                                                                    }}
                                                                                >
                                                                                    <img
                                                                                        src={
                                                                                            subProgram.image ||
                                                                                            DEFAULT_IMAGE
                                                                                        }
                                                                                        alt={
                                                                                            subProgram.name
                                                                                        }
                                                                                        className="w-full h-full object-cover"
                                                                                    />
                                                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                                                                                </div>
                                                                            </div>

                                                                            {/* Description */}
                                                                            <div className="md:col-span-3">
                                                                                <p
                                                                                    className="text-xs font-bold uppercase tracking-wider mb-3"
                                                                                    style={{
                                                                                        color: currentProgram.color,
                                                                                    }}
                                                                                >
                                                                                    {
                                                                                        subProgram.fullName
                                                                                    }
                                                                                </p>
                                                                                <p className="text-base md:text-lg font-bold text-gray-800 mb-3">
                                                                                    {
                                                                                        subProgram.focus
                                                                                    }
                                                                                </p>
                                                                                <p className="text-gray-600 leading-relaxed">
                                                                                    {
                                                                                        subProgram.description
                                                                                    }
                                                                                </p>
                                                                            </div>
                                                                        </div>

                                                                        {/* Details Grid */}
                                                                        <div className="grid md:grid-cols-3 gap-6 pt-4">
                                                                            {/* Target Group */}
                                                                            <div>
                                                                                <h4 className="font-bold text-gray-900 mb-3 text-sm flex items-center gap-2">
                                                                                    <div
                                                                                        className="w-6 h-6 flex items-center justify-center text-xs"
                                                                                        style={{
                                                                                            backgroundColor: `${currentProgram.color}20`,
                                                                                            color: currentProgram.color,
                                                                                            borderRadius:
                                                                                                "6px 6px 6px 1px",
                                                                                        }}
                                                                                    >
                                                                                        →
                                                                                    </div>
                                                                                    Target
                                                                                    Group
                                                                                </h4>
                                                                                <div className="space-y-2">
                                                                                    {subProgram.targetGroup.map(
                                                                                        (
                                                                                            group,
                                                                                            idx
                                                                                        ) => (
                                                                                            <div
                                                                                                key={
                                                                                                    idx
                                                                                                }
                                                                                                className="px-3 py-2 text-xs bg-gray-50 text-gray-700 border border-gray-200"
                                                                                                style={{
                                                                                                    borderRadius:
                                                                                                        "10px 10px 10px 2px",
                                                                                                }}
                                                                                            >
                                                                                                {
                                                                                                    group
                                                                                                }
                                                                                            </div>
                                                                                        )
                                                                                    )}
                                                                                </div>
                                                                            </div>

                                                                            {/* Key Components */}
                                                                            <div>
                                                                                <h4 className="font-bold text-gray-900 mb-3 text-sm flex items-center gap-2">
                                                                                    <div
                                                                                        className="w-6 h-6 flex items-center justify-center text-xs"
                                                                                        style={{
                                                                                            backgroundColor: `${currentProgram.color}20`,
                                                                                            color: currentProgram.color,
                                                                                            borderRadius:
                                                                                                "6px 6px 6px 1px",
                                                                                        }}
                                                                                    >
                                                                                        ✓
                                                                                    </div>
                                                                                    Key
                                                                                    Components
                                                                                </h4>
                                                                                <ul className="space-y-2">
                                                                                    {subProgram.keyComponents.map(
                                                                                        (
                                                                                            component,
                                                                                            idx
                                                                                        ) => (
                                                                                            <li
                                                                                                key={
                                                                                                    idx
                                                                                                }
                                                                                                className="text-xs text-gray-700 flex items-start gap-2"
                                                                                            >
                                                                                                <span
                                                                                                    className="mt-1"
                                                                                                    style={{
                                                                                                        color: currentProgram.color,
                                                                                                    }}
                                                                                                >
                                                                                                    •
                                                                                                </span>
                                                                                                <span>
                                                                                                    {
                                                                                                        component
                                                                                                    }
                                                                                                </span>
                                                                                            </li>
                                                                                        )
                                                                                    )}
                                                                                </ul>
                                                                            </div>

                                                                            {/* Expected Outcomes */}
                                                                            <div>
                                                                                <h4 className="font-bold text-gray-900 mb-3 text-sm flex items-center gap-2">
                                                                                    <div
                                                                                        className="w-6 h-6 flex items-center justify-center text-xs"
                                                                                        style={{
                                                                                            backgroundColor: `${currentProgram.color}20`,
                                                                                            color: currentProgram.color,
                                                                                            borderRadius:
                                                                                                "6px 6px 6px 1px",
                                                                                        }}
                                                                                    >
                                                                                        ↑
                                                                                    </div>
                                                                                    Expected
                                                                                    Outcomes
                                                                                </h4>
                                                                                <ul className="space-y-2">
                                                                                    {subProgram.outcomes.map(
                                                                                        (
                                                                                            outcome,
                                                                                            idx
                                                                                        ) => (
                                                                                            <li
                                                                                                key={
                                                                                                    idx
                                                                                                }
                                                                                                className="text-xs text-gray-700 flex items-start gap-2"
                                                                                            >
                                                                                                <span
                                                                                                    className="mt-1"
                                                                                                    style={{
                                                                                                        color: currentProgram.color,
                                                                                                    }}
                                                                                                >
                                                                                                    •
                                                                                                </span>
                                                                                                <span>
                                                                                                    {
                                                                                                        outcome
                                                                                                    }
                                                                                                </span>
                                                                                            </li>
                                                                                        )
                                                                                    )}
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </motion.div>
                                                            )}
                                                        </AnimatePresence>
                                                    </div>
                                                </motion.div>
                                            );
                                        }
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
