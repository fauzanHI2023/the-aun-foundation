import { motion } from "framer-motion";
import {
    Heart,
    BarChart3,
    Users,
    Leaf,
    CheckCircle,
    TrendingUp,
} from "lucide-react";

export function StrategicApproach() {
    return (
        <section className="py-32 bg-gradient-to-b from-white to-gray-50">
            <div className="container mx-auto px-6 md:px-12">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <div className="inline-flex items-center gap-3 mb-6">
                        <div className="w-12 h-1 bg-gradient-to-r from-[#ef1968] to-[#f7c498]" />
                        <p className="text-sm font-bold uppercase tracking-widest text-gray-500">
                            How We Work
                        </p>
                        <div className="w-12 h-1 bg-gradient-to-r from-[#f7c498] to-[#ef1968]" />
                    </div>
                    <h2 className="text-5xl md:text-7xl font-bold">
                        Strategic
                        <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ef1968] to-[#f7c498]">
                            Approach
                        </span>
                    </h2>
                </motion.div>

                <div className="max-w-7xl mx-auto space-y-8">
                    {/* POINT 1 - Integrated Approach Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="group"
                    >
                        <div className="grid lg:grid-cols-2 gap-8 items-center">
                            {/* Image Side */}
                            <div
                                className="relative h-[400px] lg:h-[450px] overflow-hidden"
                                style={{ borderRadius: "40px 40px 40px 8px" }}
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1771924368443-1d53147edbd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwY29tbXVuaXR5JTIwY29sbGFib3JhdGlvbiUyMGhhbmRzfGVufDF8fHx8MTc3MzU3ODcxOHww&ixlib=rb-4.1.0&q=80&w=1080"
                                    alt="Community collaboration"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                {/* Overlay Badge */}
                                <div
                                    className="absolute top-8 left-8 bg-[#ef1968] text-white px-6 py-3"
                                    style={{
                                        borderRadius: "20px 20px 20px 4px",
                                    }}
                                >
                                    <p className="font-bold text-sm uppercase tracking-wider">
                                        01
                                    </p>
                                </div>

                                {/* Floating Icon Cards */}
                                <motion.div
                                    animate={{ y: [0, -8, 0] }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                    }}
                                    className="absolute bottom-8 right-8 bg-white p-4 flex gap-3"
                                    style={{
                                        borderRadius: "16px 16px 16px 4px",
                                    }}
                                >
                                    <div
                                        className="w-10 h-10 bg-[#ef1968] flex items-center justify-center"
                                        style={{
                                            borderRadius: "10px 10px 10px 2px",
                                        }}
                                    >
                                        <Heart
                                            size={20}
                                            className="text-white"
                                        />
                                    </div>
                                    <div
                                        className="w-10 h-10 bg-[#f7c498] flex items-center justify-center"
                                        style={{
                                            borderRadius: "10px 10px 10px 2px",
                                        }}
                                    >
                                        <Users
                                            size={20}
                                            className="text-white"
                                        />
                                    </div>
                                </motion.div>
                            </div>

                            {/* Content Side */}
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                                        Integrated, Rights-Based &<br />
                                        <span className="text-[#ef1968]">
                                            Community-Centered
                                        </span>
                                    </h3>
                                    <div className="w-20 h-1 bg-gradient-to-r from-[#ef1968] to-[#f7c498]" />
                                </div>

                                <p className="text-xl text-gray-700 leading-relaxed">
                                    Rembulan Relief Nusantara applies an
                                    integrated,{" "}
                                    <span className="font-bold text-gray-900">
                                        rights-based
                                    </span>
                                    , and{" "}
                                    <span className="font-bold text-gray-900">
                                        community-centered approach
                                    </span>{" "}
                                    that moves beyond charity toward long-term
                                    empowerment and systemic change.
                                </p>

                                <div
                                    className="bg-gradient-to-br from-[#ef1968]/5 to-[#f7c498]/5 p-6"
                                    style={{
                                        borderRadius: "24px 24px 24px 6px",
                                    }}
                                >
                                    <p className="text-lg text-gray-700 leading-relaxed">
                                        Programs are designed to be{" "}
                                        <span className="font-bold text-[#ef1968]">
                                            gender-responsive
                                        </span>{" "}
                                        and{" "}
                                        <span className="font-bold text-[#f7c498]">
                                            family-inclusive
                                        </span>
                                        , ensuring that the empowerment of women
                                        and children is reinforced by
                                        constructive engagement of men.
                                    </p>
                                </div>

                                {/* Key Points */}
                                {/* <div className="flex flex-wrap gap-3 pt-4">
                                    <div
                                        className="flex items-center gap-2 bg-white px-4 py-2 border border-gray-200"
                                        style={{
                                            borderRadius: "12px 12px 12px 3px",
                                        }}
                                    >
                                        <CheckCircle
                                            size={18}
                                            className="text-[#ef1968]"
                                        />
                                        <span className="text-sm font-medium">
                                            Long-term Impact
                                        </span>
                                    </div>
                                    <div
                                        className="flex items-center gap-2 bg-white px-4 py-2 border border-gray-200"
                                        style={{
                                            borderRadius: "12px 12px 12px 3px",
                                        }}
                                    >
                                        <CheckCircle
                                            size={18}
                                            className="text-[#f7c498]"
                                        />
                                        <span className="text-sm font-medium">
                                            Systemic Change
                                        </span>
                                    </div>
                                    <div
                                        className="flex items-center gap-2 bg-white px-4 py-2 border border-gray-200"
                                        style={{
                                            borderRadius: "12px 12px 12px 3px",
                                        }}
                                    >
                                        <CheckCircle
                                            size={18}
                                            className="text-[#ef1968]"
                                        />
                                        <span className="text-sm font-medium">
                                            Family-Inclusive
                                        </span>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </motion.div>

                    {/* POINT 2 - Evidence-Based Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="group"
                    >
                        <div className="grid lg:grid-cols-2 gap-8 items-center">
                            {/* Content Side - Order reversed on desktop */}
                            <div className="space-y-6 lg:order-2">
                                <div>
                                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                                        Accountability Through
                                        <br />
                                        <span className="text-[#f7c498]">
                                            Evidence & Learning
                                        </span>
                                    </h3>
                                    <div className="w-20 h-1 bg-gradient-to-r from-[#f7c498] to-[#ef1968]" />
                                </div>

                                <p className="text-xl text-gray-700 leading-relaxed">
                                    The organization prioritizes{" "}
                                    <span className="font-bold text-gray-900">
                                        community ownership
                                    </span>
                                    ,{" "}
                                    <span className="font-bold text-gray-900">
                                        environmental sustainability
                                    </span>
                                    , and{" "}
                                    <span className="font-bold text-gray-900">
                                        evidence-based decision-making
                                    </span>
                                    .
                                </p>

                                <div
                                    className="bg-gradient-to-br from-[#f7c498]/5 to-[#ef1968]/5 p-6"
                                    style={{
                                        borderRadius: "24px 24px 24px 6px",
                                    }}
                                >
                                    <p className="text-lg text-gray-700 leading-relaxed">
                                        Robust{" "}
                                        <span className="font-bold text-[#f7c498]">
                                            monitoring, evaluation, and learning
                                            systems
                                        </span>{" "}
                                        are embedded across programs to ensure{" "}
                                        <span className="font-bold text-[#ef1968]">
                                            accountability, effectiveness, and
                                            continuous improvement
                                        </span>
                                        .
                                    </p>
                                </div>

                                {/* Key Points */}
                                {/* <div className="flex flex-wrap gap-3 pt-4">
                                    <div
                                        className="flex items-center gap-2 bg-white px-4 py-2 border border-gray-200"
                                        style={{
                                            borderRadius: "12px 12px 12px 3px",
                                        }}
                                    >
                                        <TrendingUp
                                            size={18}
                                            className="text-[#f7c498]"
                                        />
                                        <span className="text-sm font-medium">
                                            Community Ownership
                                        </span>
                                    </div>
                                    <div
                                        className="flex items-center gap-2 bg-white px-4 py-2 border border-gray-200"
                                        style={{
                                            borderRadius: "12px 12px 12px 3px",
                                        }}
                                    >
                                        <Leaf
                                            size={18}
                                            className="text-[#ef1968]"
                                        />
                                        <span className="text-sm font-medium">
                                            Sustainability
                                        </span>
                                    </div>
                                    <div
                                        className="flex items-center gap-2 bg-white px-4 py-2 border border-gray-200"
                                        style={{
                                            borderRadius: "12px 12px 12px 3px",
                                        }}
                                    >
                                        <BarChart3
                                            size={18}
                                            className="text-[#f7c498]"
                                        />
                                        <span className="text-sm font-medium">
                                            Evidence-Based
                                        </span>
                                    </div>
                                </div> */}
                            </div>

                            {/* Image Side - Order reversed on desktop */}
                            <div
                                className="relative h-[400px] lg:h-[450px] overflow-hidden lg:order-1"
                                style={{ borderRadius: "40px 40px 40px 8px" }}
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1745847768367-893e989d3a98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwYW5hbHlzaXMlMjBsYXB0b3AlMjBjaGFydHxlbnwxfHx8fDE3NzM1Nzg3MTh8MA&ixlib=rb-4.1.0&q=80&w=1080"
                                    alt="Data analysis and monitoring"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                {/* Overlay Badge */}
                                <div
                                    className="absolute top-8 right-8 bg-[#f7c498] text-white px-6 py-3"
                                    style={{
                                        borderRadius: "20px 20px 20px 4px",
                                    }}
                                >
                                    <p className="font-bold text-sm uppercase tracking-wider">
                                        02
                                    </p>
                                </div>

                                {/* Floating Icon Cards */}
                                <motion.div
                                    animate={{ y: [0, -8, 0] }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        delay: 0.5,
                                    }}
                                    className="absolute bottom-8 left-8 bg-white p-4 flex gap-3"
                                    style={{
                                        borderRadius: "16px 16px 16px 4px",
                                    }}
                                >
                                    <div
                                        className="w-10 h-10 bg-[#f7c498] flex items-center justify-center"
                                        style={{
                                            borderRadius: "10px 10px 10px 2px",
                                        }}
                                    >
                                        <BarChart3
                                            size={20}
                                            className="text-white"
                                        />
                                    </div>
                                    <div
                                        className="w-10 h-10 bg-[#ef1968] flex items-center justify-center"
                                        style={{
                                            borderRadius: "10px 10px 10px 2px",
                                        }}
                                    >
                                        <Leaf
                                            size={20}
                                            className="text-white"
                                        />
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
