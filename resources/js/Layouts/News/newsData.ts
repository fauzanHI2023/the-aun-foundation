export interface NewsArticle {
    id: number;
    category: string;
    categoryId: string;
    categoryColor: string;
    title: string;
    excerpt: string;
    image: string;
    date: string;
    readTime: string;
}

export const newsArticles: NewsArticle[] = [
    // EDUCATION
    {
        id: 1,
        category: "Education",
        categoryId: "education",
        categoryColor: "#ef1968",
        title: "1,247 Girls Now Have a Future: RISE–ACCESS Changes Lives",
        excerpt:
            "In remote villages across Nusantara, daughters are no longer forced to choose between survival and school. Meet Sari, 14, whose scholarship turned impossible dreams into tomorrow's reality.",
        image: "https://images.unsplash.com/photo-1765994898026-4fa84ade4a61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMGxlYXJuaW5nJTIwc2Nob29sJTIwYXNpYXxlbnwxfHx8fDE3NzM1ODc0NDh8MA&ixlib=rb-4.1.0&q=80&w=1080",
        date: "March 18, 2026",
        readTime: "5 min",
    },
    {
        id: 7,
        category: "Education",
        categoryId: "education",
        categoryColor: "#ef1968",
        title: "Digital Literacy for All: RISE–DIGITAL Bridges the Technology Gap",
        excerpt:
            "In an age of information, access to technology equals access to opportunity. 850 women and children now coding, creating, and connecting to the world.",
        image: "https://images.unsplash.com/photo-1588072432836-e10032774350?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMGNvbXB1dGVyJTIwbGVhcm5pbmclMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc3MzU4NzQ1MXww&ixlib=rb-4.1.0&q=80&w=1080",
        date: "February 28, 2026",
        readTime: "4 min",
    },
    {
        id: 9,
        category: "Education",
        categoryId: "education",
        categoryColor: "#ef1968",
        title: "Breaking Barriers: Inclusive Education Reaches Children with Disabilities",
        excerpt:
            "Every child deserves to learn. Through RISE–INCLUSIVE, 340 children with disabilities now attend mainstream schools with proper support and dignity.",
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMGVkdWNhdGlvbiUyMGluY2x1c2l2ZSUyMGxlYXJuaW5nfGVufDF8fHx8MTc3MzU4NzQ1MXww&ixlib=rb-4.1.0&q=80&w=1080",
        date: "February 20, 2026",
        readTime: "6 min",
    },

    // HEALTH
    {
        id: 3,
        category: "Health",
        categoryId: "health",
        categoryColor: "#f7c498",
        title: "Zero Maternal Deaths: CARE+ Reaches Historic Milestone in 5 Districts",
        excerpt:
            "Through midwife training, mobile clinics, and community education, 2,341 mothers gave birth safely this year. Every life matters. Every mother counts.",
        image: "https://images.unsplash.com/photo-1769646762516-e3e66d8266bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwbWVkaWNhbCUyMHNlcnZpY2UlMjBhc2lhfGVufDF8fHx8MTc3MzU4NzQ0OXww&ixlib=rb-4.1.0&q=80&w=1080",
        date: "March 12, 2026",
        readTime: "6 min",
    },
    {
        id: 8,
        category: "Health",
        categoryId: "health",
        categoryColor: "#f7c498",
        title: "Mental Health Matters: Breaking Stigma in Rural Communities",
        excerpt:
            "Depression isn't a weakness. Trauma deserves healing. CARE+ brings counseling, peer support, and hope to places where mental health was once a taboo.",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21lbiUyMHN1cHBvcnQlMjBncm91cCUyMGhlYWxpbmd8ZW58MXx8fHwxNzczNTg3NDUxfDA&ixlib=rb-4.1.0&q=80&w=1080",
        date: "February 25, 2026",
        readTime: "7 min",
    },
    {
        id: 10,
        category: "Health",
        categoryId: "health",
        categoryColor: "#f7c498",
        title: "Nutrition Revolution: 1,500 Children Escape Malnutrition Through CARE+",
        excerpt:
            "Stunting isn't destiny. With proper nutrition education and food assistance, communities are raising healthier, stronger children ready to thrive.",
        image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMGhlYWx0aCUyMG51dHJpdGlvbiUyMGZvb2R8ZW58MXx8fHwxNzczNTg3NDUyfDA&ixlib=rb-4.1.0&q=80&w=1080",
        date: "February 18, 2026",
        readTime: "5 min",
    },

    // PROTECTION
    {
        id: 4,
        category: "Protection",
        categoryId: "protection",
        categoryColor: "#ef1968",
        title: "Breaking the Silence: SHIELD Creates First Safe Spaces in 18 Villages",
        excerpt:
            "When tradition becomes harm, courage speaks up. Community leaders, police, and survivors unite to end violence and restore dignity for women and children.",
        image: "https://images.unsplash.com/photo-1763705135060-4850b45494b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBtZWV0aW5nJTIwZGlzY3Vzc2lvbiUyMGdyb3VwfGVufDF8fHx8MTc3MzU4NzQ0OXww&ixlib=rb-4.1.0&q=80&w=1080",
        date: "March 8, 2026",
        readTime: "8 min",
    },
    {
        id: 11,
        category: "Protection",
        categoryId: "protection",
        categoryColor: "#ef1968",
        title: "Child Marriage Drops 67%: Communities Choose Education Over Tradition",
        excerpt:
            "When girls marry at 14, futures are stolen. Through SHIELD advocacy and economic support, 423 families chose school over early marriage this year.",
        image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMGdpcmwlMjBzdHVkZW50JTIwZWR1Y2F0aW9uJTIweW91bmd8ZW58MXx8fHwxNzczNTg3NDUyfDA&ixlib=rb-4.1.0&q=80&w=1080",
        date: "February 14, 2026",
        readTime: "6 min",
    },
    {
        id: 12,
        category: "Protection",
        categoryId: "protection",
        categoryColor: "#ef1968",
        title: "Legal Aid for the Voiceless: 280 Women Access Justice Through SHIELD",
        excerpt:
            "Justice shouldn't be a privilege. Free legal counseling, court support, and advocacy help survivors of violence reclaim their rights and rebuild lives.",
        image: "https://images.unsplash.com/photo-1589391886645-d51941baf7fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMHdvbWVuJTIwZW1wb3dlcm1lbnQlMjBjb25maWRlbnR8ZW58MXx8fHwxNzczNTg3NDUzfDA&ixlib=rb-4.1.0&q=80&w=1080",
        date: "February 10, 2026",
        readTime: "7 min",
    },

    // ENVIRONMENT
    {
        id: 5,
        category: "Environment",
        categoryId: "environment",
        categoryColor: "#f7c498",
        title: "Young Guardians Rising: 500 Youth Lead Climate Action Through GREENLIGHT",
        excerpt:
            "The next generation refuses to inherit a broken planet. From mangrove restoration to zero-waste campaigns, these young leaders are rewriting the future.",
        image: "https://images.unsplash.com/photo-1641941672934-9e33a79ec482?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbnZpcm9ubWVudGFsJTIwc3VzdGFpbmFiaWxpdHklMjBncmVlbnxlbnwxfHx8fDE3NzM1ODc0NDl8MA&ixlib=rb-4.1.0&q=80&w=1080",
        date: "March 5, 2026",
        readTime: "5 min",
    },
    {
        id: 13,
        category: "Environment",
        categoryId: "environment",
        categoryColor: "#f7c498",
        title: "10,000 Trees Planted: Women Lead Reforestation in Deforested Areas",
        excerpt:
            "Environmental destruction isn't inevitable. Women farmers become forest guardians, planting hope and securing futures through GREENLIGHT initiatives.",
        image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGFudGluZyUyMHRyZWVzJTIwcmVmb3Jlc3RhdGlvbiUyMGVudmlyb25tZW50fGVufDF8fHx8MTc3MzU4NzQ1M3ww&ixlib=rb-4.1.0&q=80&w=1080",
        date: "February 22, 2026",
        readTime: "5 min",
    },
    {
        id: 14,
        category: "Environment",
        categoryId: "environment",
        categoryColor: "#f7c498",
        title: "Zero Waste Villages: How 8 Communities Transformed Trash Into Treasure",
        excerpt:
            "Waste management isn't just about cleanliness—it's about health, economy, and dignity. Meet the communities turning garbage into green businesses.",
        image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWN5Y2xpbmclMjB3YXN0ZSUyMGVudmlyb25tZW50JTIwY29tbXVuaXR5fGVufDF8fHx8MTc3MzU4NzQ1M3ww&ixlib=rb-4.1.0&q=80&w=1080",
        date: "February 15, 2026",
        readTime: "6 min",
    },
];
