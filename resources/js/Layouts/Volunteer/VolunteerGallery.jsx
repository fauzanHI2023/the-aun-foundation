import { motion } from "framer-motion";

const galleryImages = [
    "https://images.unsplash.com/photo-1758599669186-9eaf14f6f3ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2b2x1bnRlZXJzJTIwY29tbXVuaXR5JTIwdGVhbXdvcmslMjBoZWxwaW5nJTIwdG9nZXRoZXJ8ZW58MXx8fHwxNzc0MTA1MjQwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1758599668356-c8c919e24dda?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2b2x1bnRlZXIlMjBncm91cCUyMGVudmlyb25tZW50YWwlMjBhY3Rpb24lMjBwbGFudGluZ3xlbnwxfHx8fDE3NzQxMDUyNDF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1555069855-e580a9adbf43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBtZWV0aW5nJTIwZGlzY3Vzc2lvbiUyMHZvbHVudGVlcnMlMjBjaXJjbGV8ZW58MXx8fHwxNzc0MTA1MjQxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1630068846062-3ffe78aa5049?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kcyUyMHRvZ2V0aGVyJTIwdW5pdHklMjB0ZWFtd29yayUyMGRpdmVyc2l0eXxlbnwxfHx8fDE3NzQxMDUyNDR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1764738130382-cc7a8eaf26c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2b2x1bnRlZXIlMjBzZXJ2aWNlJTIwY29tbXVuaXR5JTIwaGVscGluZyUyMGhhbmRzfGVufDF8fHx8MTc3NDEwNTI0NHww&ixlib=rb-4.1.0&q=80&w=1080",
];

export function VolunteerGallery() {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6 md:px-12">
                {/* Bento Grid Layout */}
                <div className="grid grid-cols-12 gap-4 mb-16">
                    {/* Large Image 1 */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="col-span-12 md:col-span-8 h-[400px] overflow-hidden group"
                        style={{ borderRadius: "40px 40px 40px 10px" }}
                    >
                        <img
                            src={galleryImages[0]}
                            alt="Pink Rangers in action"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                    </motion.div>

                    {/* Small Image 1 */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="col-span-12 md:col-span-4 h-[400px] overflow-hidden group"
                        style={{ borderRadius: "32px 32px 32px 8px" }}
                    >
                        <img
                            src={galleryImages[1]}
                            alt="Community volunteers"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                    </motion.div>

                    {/* Small Image 2 */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="col-span-6 md:col-span-3 h-[300px] overflow-hidden group"
                        style={{ borderRadius: "28px 28px 28px 6px" }}
                    >
                        <img
                            src={galleryImages[2]}
                            alt="Teamwork"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                    </motion.div>

                    {/* Medium Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="col-span-6 md:col-span-5 h-[300px] overflow-hidden group"
                        style={{ borderRadius: "32px 32px 32px 8px" }}
                    >
                        <img
                            src={galleryImages[3]}
                            alt="Unity and solidarity"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                    </motion.div>

                    {/* Large Image 2 */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="col-span-12 md:col-span-4 h-[300px] overflow-hidden group"
                        style={{ borderRadius: "32px 32px 32px 8px" }}
                    >
                        <img
                            src={galleryImages[4]}
                            alt="Making an impact"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                    </motion.div>
                </div>

                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-4xl mx-auto"
                >
                    <h2 className="text-4xl md:text-6xl font-bold mb-6">
                        Together, We Move{" "}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ef1968] to-[#f7c498]">
                            Goodness Into Action
                        </span>
                    </h2>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        By becoming a Pink Ranger, you become part of a
                        collective movement to build safer families, more
                        resilient communities, and a healthier planet for future
                        generations.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
