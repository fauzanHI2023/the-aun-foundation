import { motion } from "framer-motion";

const volunteerRoles = [
    {
        title: "Expert Volunteers",
        description:
            "Professionals and practitioners who share their expertise in areas such as education, health, social protection, environmental sustainability, communication, research, monitoring and evaluation, and community development.",
        color: "#ef1968",
        image: "/images/6.jpg",
    },
    {
        title: "Knowledge & Awareness Advocates",
        description:
            "Individuals who help disseminate accurate, ethical, and responsible information to raise public awareness on humanitarian issues, gender equality, child protection, climate action, and inclusive development.",
        color: "#f7c498",
        image: "https://images.unsplash.com/photo-1646369505567-3a9cbb052342?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwdWJsaWMlMjBzcGVha2luZyUyMGF3YXJlbmVzcyUyMGFkdm9jYXRlJTIwZWR1Y2F0aW9ufGVufDF8fHx8MTc3NDEwNTYxOXww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
        title: "Community & Environmental Rangers",
        description:
            "Volunteers who actively participate in community-based initiatives, environmental education, behavior change campaigns, and family- and child-centered environmental action.",
        color: "#ef1968",
        image: "https://images.unsplash.com/photo-1764173039235-fd1b8e9ad67f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBlbnZpcm9ubWVudGFsJTIwY29uc2VydmF0aW9uJTIwdm9sdW50ZWVycyUyMG5hdHVyZXxlbnwxfHx8fDE3NzQxMDU2MTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
        title: "Fundraising & Solidarity Partners",
        description:
            "Individuals or groups who support sustainability through fundraising initiatives, solidarity campaigns, and resource mobilization to ensure long-term impact and program continuity.",
        color: "#f7c498",
        image: "https://images.unsplash.com/photo-1591522810850-58128c5fb089?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdW5kcmFpc2luZyUyMGNoYXJpdHklMjBkb25hdGlvbiUyMHNvbGlkYXJpdHklMjBzdXBwb3J0fGVufDF8fHx8MTc3NDEwNTYyMHww&ixlib=rb-4.1.0&q=80&w=1080",
    },
];

export function WhoArePinkRangers() {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6 md:px-12">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <div className="inline-block mb-6">
                        <div
                            className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-white"
                            style={{
                                background:
                                    "linear-gradient(135deg, #ef1968 0%, #f7c498 100%)",
                                borderRadius: "12px 12px 12px 3px",
                            }}
                        >
                            Our Volunteers
                        </div>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-bold mb-6">
                        Who Are{" "}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ef1968] to-[#f7c498]">
                            Pink Rangers?
                        </span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                        Pink Rangers are volunteers and allies who contribute
                        their time, expertise, networks, and compassion to
                        support the mission and programs of Rembulan Relief
                        Nusantara. Pink Rangers may engage in the following
                        roles:
                    </p>
                </motion.div>

                {/* Roles Grid - Zigzag Layout */}
                <div className="space-y-16">
                    {volunteerRoles.map((role, index) => {
                        const isEven = index % 2 === 0;

                        return (
                            <motion.div
                                key={role.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className={`grid md:grid-cols-12 gap-8 items-center ${
                                    !isEven ? "md:direction-rtl" : ""
                                }`}
                            >
                                {/* Image Side */}
                                <div
                                    className={`md:col-span-5 ${
                                        !isEven ? "md:order-2" : ""
                                    }`}
                                >
                                    <div
                                        className="relative overflow-hidden group"
                                        style={{
                                            borderRadius: "32px 32px 32px 8px",
                                        }}
                                    >
                                        <img
                                            src={role.image}
                                            alt={role.title}
                                            className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                        {/* Gradient Overlay */}
                                        <div
                                            className="absolute inset-0 opacity-20"
                                            style={{
                                                background: `linear-gradient(135deg, ${role.color} 0%, transparent 100%)`,
                                            }}
                                        />
                                        {/* Color Accent Bar */}
                                        <div
                                            className="absolute bottom-0 left-0 right-0 h-2"
                                            style={{
                                                backgroundColor: role.color,
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Content Side */}
                                <div
                                    className={`md:col-span-7 ${
                                        !isEven
                                            ? "md:order-1 md:text-right"
                                            : ""
                                    }`}
                                >
                                    <h3 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                                        {role.title}
                                    </h3>
                                    <p className="text-lg text-gray-600 leading-relaxed">
                                        {role.description}
                                    </p>
                                    <div
                                        className={`mt-6 inline-block h-1 w-32`}
                                        style={{ backgroundColor: role.color }}
                                    />
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
