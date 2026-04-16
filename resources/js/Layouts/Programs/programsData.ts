export interface SubProgram {
    id: string;
    name: string;
    fullName: string;
    focus: string;
    description: string;
    image: string;
    targetGroup: string[];
    keyComponents: string[];
    outcomes: string[];
}

export interface MainProgram {
    id: string;
    name: string;
    fullName: string;
    tagline: string;
    description: string;
    color: string;
    image: string;
    icon: string;
    subPrograms: SubProgram[];
}

export const programsData: MainProgram[] = [
    {
        id: "rise",
        name: "RISE",
        fullName: "Realizing Inclusive & Sustainable Education",
        tagline: "Empowering through Education",
        description:
            "RISE empowers women and children through accessible, inclusive, and quality education that transforms lives and communities.",
        color: "#ef1968",
        image: "https://images.unsplash.com/photo-1659070953831-dd4fa16222fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZHVjYXRpb24lMjBjbGFzc3Jvb20lMjBsZWFybmluZyUyMGJvb2tzfGVufDF8fHx8MTc3Mzc2MjM2NHww&ixlib=rb-4.1.0&q=80&w=1080",
        icon: "GraduationCap",
        subPrograms: [
            {
                id: "rise-access",
                name: "RISE–ACCESS",
                fullName: "Education Access & Scholarship Initiative",
                focus: "Expanding educational opportunities for children from marginalized communities",
                description:
                    "Provides scholarships, learning materials, and support systems to ensure children from vulnerable backgrounds can access and complete quality education.",
                image: "https://images.unsplash.com/photo-1590237563976-797e6130b3e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMGFzaWFuJTIwZ2lybHMlMjBzdHVkeWluZyUyMHNjaG9vbHxlbnwxfHx8fDE3NzM3NjcwNzN8MA&ixlib=rb-4.1.0&q=80&w=1080",
                targetGroup: [
                    "Children from low-income families",
                    "Girls in rural areas",
                    "Children with disabilities",
                ],
                keyComponents: [
                    "Scholarship programs covering tuition and materials",
                    "School infrastructure support",
                    "Learning materials distribution",
                    "Mentorship and counseling services",
                ],
                outcomes: [
                    "Increased school enrollment rates",
                    "Reduced dropout rates",
                    "Improved learning outcomes",
                    "Enhanced family engagement in education",
                ],
            },
            {
                id: "rise-language",
                name: "RISE–LANGUAGE",
                fullName: "English for Opportunity Program",
                focus: "Building English language proficiency for economic and educational advancement",
                description:
                    "Equips women and youth with practical English skills to access better employment, educational opportunities, and global connections.",
                image: "https://images.unsplash.com/photo-1680265198350-e5a716d043ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2hvbGFyc2hpcCUyMHN0dWRlbnQlMjBoYXBweSUyMGNlbGVicmF0aW5nfGVufDF8fHx8MTc3Mzc2NzA3M3ww&ixlib=rb-4.1.0&q=80&w=1080",
                targetGroup: [
                    "Young women seeking employment",
                    "University students",
                    "Community youth leaders",
                ],
                keyComponents: [
                    "Interactive English classes",
                    "Digital learning platforms",
                    "Conversation clubs",
                    "Professional English certification preparation",
                ],
                outcomes: [
                    "Improved English proficiency levels",
                    "Increased job market competitiveness",
                    "Access to international scholarships",
                    "Enhanced confidence in communication",
                ],
            },
            {
                id: "rise-voice",
                name: "RISE–VOICE",
                fullName: "Public Speaking & Communication Skills",
                focus: "Developing confident and effective communicators and leaders",
                description:
                    "Trains women and youth in public speaking, advocacy, and effective communication to amplify their voices in communities and workplaces.",
                image: "https://images.unsplash.com/photo-1607823477653-e2c3980acb86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMHJlYWRpbmclMjBib29rcyUyMGxpYnJhcnl8ZW58MXx8fHwxNzczNzI4NDg2fDA&ixlib=rb-4.1.0&q=80&w=1080",
                targetGroup: [
                    "Young women",
                    "Student leaders",
                    "Community advocates",
                ],
                keyComponents: [
                    "Public speaking workshops",
                    "Debate and discussion forums",
                    "Presentation skills training",
                    "Media literacy and digital communication",
                ],
                outcomes: [
                    "Increased confidence in public speaking",
                    "Stronger advocacy skills",
                    "Enhanced leadership presence",
                    "Greater participation in community decision-making",
                ],
            },
            {
                id: "rise-character",
                name: "RISE–CHARACTER",
                fullName: "Personality & Values Development Program",
                focus: "Cultivating strong character, values, and life skills",
                description:
                    "Fosters personal development, ethical values, and life skills essential for responsible citizenship and community leadership.",
                image: "https://images.unsplash.com/photo-1607823477653-e2c3980acb86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMHJlYWRpbmclMjBib29rcyUyMGxpYnJhcnl8ZW58MXx8fHwxNzczNzI4NDg2fDA&ixlib=rb-4.1.0&q=80&w=1080",
                targetGroup: ["Adolescents", "Youth", "Young adults"],
                keyComponents: [
                    "Character building workshops",
                    "Ethical decision-making training",
                    "Life skills development",
                    "Peer mentoring programs",
                ],
                outcomes: [
                    "Strong ethical foundation",
                    "Improved decision-making skills",
                    "Enhanced social responsibility",
                    "Positive peer influence",
                ],
            },
            {
                id: "rise-parent",
                name: "RISE–PARENT",
                fullName: "Parenting Education & Family Learning Support",
                focus: "Strengthening family support systems for children's education",
                description:
                    "Empowers parents, especially mothers, with knowledge and skills to support their children's learning and holistic development.",
                image: "https://images.unsplash.com/photo-1607823477653-e2c3980acb86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMHJlYWRpbmclMjBib29rcyUyMGxpYnJhcnl8ZW58MXx8fHwxNzczNzI4NDg2fDA&ixlib=rb-4.1.0&q=80&w=1080",
                targetGroup: ["Parents", "Caregivers", "Family members"],
                keyComponents: [
                    "Parenting skills workshops",
                    "Home learning support strategies",
                    "Family literacy programs",
                    "Parent-teacher collaboration initiatives",
                ],
                outcomes: [
                    "Improved parental engagement in education",
                    "Stronger home learning environments",
                    "Better parent-child communication",
                    "Enhanced family literacy",
                ],
            },
            {
                id: "rise-inclusive",
                name: "RISE–INCLUSIVE",
                fullName: "Inclusive Education & Learning Support",
                focus: "Ensuring quality education for children with diverse learning needs",
                description:
                    "Creates inclusive learning environments and provides specialized support for children with disabilities and special learning needs.",
                image: "https://images.unsplash.com/photo-1607823477653-e2c3980acb86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMHJlYWRpbmclMjBib29rcyUyMGxpYnJhcnl8ZW58MXx8fHwxNzczNzI4NDg2fDA&ixlib=rb-4.1.0&q=80&w=1080",
                targetGroup: [
                    "Children with disabilities",
                    "Children with learning difficulties",
                    "Inclusive schools",
                ],
                keyComponents: [
                    "Inclusive teaching methodology training",
                    "Assistive learning tools and technologies",
                    "Special education support",
                    "Barrier-free infrastructure advocacy",
                ],
                outcomes: [
                    "Increased inclusion of children with disabilities",
                    "Improved learning outcomes for diverse learners",
                    "Reduced stigma and discrimination",
                    "Stronger inclusive education systems",
                ],
            },
        ],
    },
    {
        id: "thrive",
        name: "THRIVE",
        fullName:
            "Transforming Households Through Resilient Income and Value Creation",
        tagline: "Economic Empowerment for Women",
        description:
            "THRIVE strengthens women's economic independence through skills, entrepreneurship, and sustainable livelihoods.",
        color: "#f7c498",
        image: "https://images.unsplash.com/photo-1772442125564-b9669a6df336?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21lbiUyMGVudHJlcHJlbmV1ciUyMGJ1c2luZXNzJTIwd29ya3Nob3B8ZW58MXx8fHwxNzczNzYyMzY1fDA&ixlib=rb-4.1.0&q=80&w=1080",
        icon: "TrendingUp",
        subPrograms: [
            {
                id: "thrive-skill",
                name: "THRIVE–SKILL",
                fullName: "Market-Oriented Skills Development",
                focus: "Building market-relevant skills for sustainable employment and income",
                description:
                    "Provides women with practical, market-driven vocational training that leads to employment or self-employment opportunities.",
                image: "https://images.unsplash.com/photo-1607823477653-e2c3980acb86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMHJlYWRpbmclMjBib29rcyUyMGxpYnJhcnl8ZW58MXx8fHwxNzczNzI4NDg2fDA&ixlib=rb-4.1.0&q=80&w=1080",
                targetGroup: [
                    "Unemployed women",
                    "Women seeking career advancement",
                    "Young women entering workforce",
                ],
                keyComponents: [
                    "Vocational skills training",
                    "Industry partnerships for placement",
                    "Digital and technical skills",
                    "Career counseling and job matching",
                ],
                outcomes: [
                    "Increased employability",
                    "Higher income levels",
                    "Diversified livelihood options",
                    "Improved household economic security",
                ],
            },
            {
                id: "thrive-biz",
                name: "THRIVE–BIZ",
                fullName:
                    "Women's Micro-Enterprise & Entrepreneurship Development",
                focus: "Supporting women to start and grow sustainable businesses",
                description:
                    "Equips women entrepreneurs with business skills, startup capital access, and ongoing mentorship to build successful micro-enterprises.",
                image: "https://images.unsplash.com/photo-1607823477653-e2c3980acb86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMHJlYWRpbmclMjBib29rcyUyMGxpYnJhcnl8ZW58MXx8fHwxNzczNzI4NDg2fDA&ixlib=rb-4.1.0&q=80&w=1080",
                targetGroup: [
                    "Aspiring women entrepreneurs",
                    "Existing micro-business owners",
                    "Women in informal economy",
                ],
                keyComponents: [
                    "Business development training",
                    "Startup capital and microfinance linkages",
                    "Business mentorship and coaching",
                    "Market access support",
                ],
                outcomes: [
                    "Increased women-owned businesses",
                    "Business profitability and growth",
                    "Job creation within communities",
                    "Economic resilience",
                ],
            },
            {
                id: "thrive-fin",
                name: "THRIVE–FIN",
                fullName: "Financial Literacy & Household Economic Management",
                focus: "Enhancing financial knowledge and household economic decision-making",
                description:
                    "Builds women's capacity in financial planning, savings, budgeting, and household economic management for long-term stability.",
                image: "https://images.unsplash.com/photo-1607823477653-e2c3980acb86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMHJlYWRpbmclMjBib29rcyUyMGxpYnJhcnl8ZW58MXx8fHwxNzczNzI4NDg2fDA&ixlib=rb-4.1.0&q=80&w=1080",
                targetGroup: [
                    "Women household decision-makers",
                    "Mothers",
                    "Young women",
                ],
                keyComponents: [
                    "Financial literacy workshops",
                    "Savings and investment training",
                    "Household budgeting tools",
                    "Access to formal financial services",
                ],
                outcomes: [
                    "Improved financial decision-making",
                    "Increased savings behavior",
                    "Reduced household debt",
                    "Greater economic autonomy for women",
                ],
            },
            {
                id: "thrive-access",
                name: "THRIVE–ACCESS",
                fullName: "Ethical Market & Value Chain Access",
                focus: "Connecting women producers to fair and sustainable markets",
                description:
                    "Facilitates women's access to ethical markets, fair trade opportunities, and value chain participation for better income.",
                image: "https://images.unsplash.com/photo-1607823477653-e2c3980acb86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMHJlYWRpbmclMjBib29rcyUyMGxpYnJhcnl8ZW58MXx8fHwxNzczNzI4NDg2fDA&ixlib=rb-4.1.0&q=80&w=1080",
                targetGroup: [
                    "Women producers",
                    "Women farmers",
                    "Artisan groups",
                ],
                keyComponents: [
                    "Market linkage facilitation",
                    "Fair trade certification support",
                    "Value chain integration",
                    "Product quality and branding development",
                ],
                outcomes: [
                    "Increased market access",
                    "Fair pricing and income",
                    "Sustainable business partnerships",
                    "Enhanced product competitiveness",
                ],
            },
            {
                id: "thrive-green",
                name: "THRIVE–GREEN",
                fullName: "Sustainable & Climate-Resilient Livelihoods",
                focus: "Promoting environmentally sustainable and climate-adaptive income generation",
                description:
                    "Integrates climate resilience and environmental sustainability into livelihood programs to ensure long-term viability.",
                image: "https://images.unsplash.com/photo-1607823477653-e2c3980acb86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMHJlYWRpbmclMjBib29rcyUyMGxpYnJhcnl8ZW58MXx8fHwxNzczNzI4NDg2fDA&ixlib=rb-4.1.0&q=80&w=1080",
                targetGroup: [
                    "Women in agriculture",
                    "Women in climate-vulnerable communities",
                    "Rural women",
                ],
                keyComponents: [
                    "Climate-smart agriculture training",
                    "Sustainable livelihood practices",
                    "Renewable energy solutions",
                    "Disaster risk reduction integration",
                ],
                outcomes: [
                    "Climate-resilient livelihoods",
                    "Reduced environmental impact",
                    "Sustainable income sources",
                    "Community climate adaptation",
                ],
            },
            {
                id: "thrive-family",
                name: "THRIVE–FAMILY",
                fullName: "Gender-Transformative Household Engagement",
                focus: "Engaging families in supporting women's economic empowerment",
                description:
                    "Promotes gender equality within households and engages men as allies in supporting women's economic participation.",
                image: "https://images.unsplash.com/photo-1607823477653-e2c3980acb86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMHJlYWRpbmclMjBib29rcyUyMGxpYnJhcnl8ZW58MXx8fHwxNzczNzI4NDg2fDA&ixlib=rb-4.1.0&q=80&w=1080",
                targetGroup: [
                    "Households",
                    "Men and fathers",
                    "Family members",
                ],
                keyComponents: [
                    "Gender equality education",
                    "Men's engagement workshops",
                    "Household dialogue facilitation",
                    "Shared economic decision-making promotion",
                ],
                outcomes: [
                    "Increased male support for women's work",
                    "Equitable household labor division",
                    "Joint economic decision-making",
                    "Reduced gender-based economic barriers",
                ],
            },
        ],
    },
    {
        id: "care",
        name: "CARE+",
        fullName: "Community Access for Resilient and Equitable Health",
        tagline: "Health & Wellbeing for All",
        description:
            "CARE+ ensures women and children have access to quality health services and knowledge for healthy, resilient lives.",
        color: "#ef1968",
        image: "https://images.unsplash.com/photo-1758691463331-2ac00e6f676f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwbW90aGVyJTIwY2hpbGQlMjB3ZWxsbmVzc3xlbnwxfHx8fDE3NzM3NjIzNjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
        icon: "Heart",
        subPrograms: [
            {
                id: "care-mnh",
                name: "CARE+–MNH",
                fullName: "Maternal, Newborn, and Child Health",
                focus: "Ensuring safe pregnancies, births, and healthy early childhood development",
                description:
                    "Provides comprehensive maternal and child health services, education, and support to reduce mortality and improve health outcomes.",
                image: "https://images.unsplash.com/photo-1607823477653-e2c3980acb86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMHJlYWRpbmclMjBib29rcyUyMGxpYnJhcnl8ZW58MXx8fHwxNzczNzI4NDg2fDA&ixlib=rb-4.1.0&q=80&w=1080",
                targetGroup: [
                    "Pregnant women",
                    "New mothers",
                    "Children under 5",
                ],
                keyComponents: [
                    "Antenatal and postnatal care",
                    "Safe delivery support",
                    "Newborn care education",
                    "Child health monitoring and immunization",
                ],
                outcomes: [
                    "Reduced maternal and infant mortality",
                    "Improved birth outcomes",
                    "Healthy child development",
                    "Increased health service utilization",
                ],
            },
            {
                id: "care-nutri",
                name: "CARE+–NUTRI",
                fullName: "Family Nutrition & Food Security for Health",
                focus: "Improving nutrition and food security for women and children",
                description:
                    "Addresses malnutrition through education, support, and community-based nutrition interventions.",
                image: "https://images.unsplash.com/photo-1607823477653-e2c3980acb86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMHJlYWRpbmclMjBib29rcyUyMGxpYnJhcnl8ZW58MXx8fHwxNzczNzI4NDg2fDA&ixlib=rb-4.1.0&q=80&w=1080",
                targetGroup: [
                    "Mothers",
                    "Pregnant and lactating women",
                    "Young children",
                ],
                keyComponents: [
                    "Nutrition education and counseling",
                    "Food security programs",
                    "Breastfeeding support",
                    "Community nutrition gardens",
                ],
                outcomes: [
                    "Reduced malnutrition rates",
                    "Improved dietary practices",
                    "Better child growth outcomes",
                    "Enhanced food security",
                ],
            },
            {
                id: "care-mental",
                name: "CARE+–MENTAL",
                fullName: "Mental Health & Psychosocial Wellbeing",
                focus: "Promoting mental health and psychosocial support for women and families",
                description:
                    "Provides mental health awareness, counseling, and community support to address psychosocial challenges.",
                image: "https://images.unsplash.com/photo-1607823477653-e2c3980acb86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMHJlYWRpbmclMjBib29rcyUyMGxpYnJhcnl8ZW58MXx8fHwxNzczNzI4NDg2fDA&ixlib=rb-4.1.0&q=80&w=1080",
                targetGroup: ["Women", "Adolescents", "Families facing trauma"],
                keyComponents: [
                    "Mental health awareness campaigns",
                    "Counseling and psychosocial support",
                    "Peer support groups",
                    "Stress and trauma management training",
                ],
                outcomes: [
                    "Reduced stigma around mental health",
                    "Improved emotional wellbeing",
                    "Stronger community support systems",
                    "Better coping mechanisms",
                ],
            },
            {
                id: "care-prevent",
                name: "CARE+–PREVENT",
                fullName: "Preventive & Community Health Promotion",
                focus: "Preventing disease and promoting healthy behaviors at community level",
                description:
                    "Builds community capacity for disease prevention, health promotion, and early intervention.",
                image: "https://images.unsplash.com/photo-1607823477653-e2c3980acb86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMHJlYWRpbmclMjBib29rcyUyMGxpYnJhcnl8ZW58MXx8fHwxNzczNzI4NDg2fDA&ixlib=rb-4.1.0&q=80&w=1080",
                targetGroup: [
                    "Community members",
                    "Women health volunteers",
                    "Families",
                ],
                keyComponents: [
                    "Health education campaigns",
                    "Disease prevention programs",
                    "Community health worker training",
                    "Hygiene and sanitation promotion",
                ],
                outcomes: [
                    "Reduced disease incidence",
                    "Healthier community behaviors",
                    "Stronger community health systems",
                    "Empowered health volunteers",
                ],
            },
            {
                id: "care-access",
                name: "CARE+–ACCESS",
                fullName: "Access to Basic Health Services & Referral",
                focus: "Ensuring timely access to essential health services for underserved communities",
                description:
                    "Facilitates access to primary healthcare, referrals, and removes barriers to health service utilization.",
                image: "https://images.unsplash.com/photo-1607823477653-e2c3980acb86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMHJlYWRpbmclMjBib29rcyUyMGxpYnJhcnl8ZW58MXx8fHwxNzczNzI4NDg2fDA&ixlib=rb-4.1.0&q=80&w=1080",
                targetGroup: [
                    "Women in remote areas",
                    "Marginalized communities",
                    "Families with limited access",
                ],
                keyComponents: [
                    "Mobile health clinics",
                    "Health service referral systems",
                    "Transportation support",
                    "Health insurance and subsidy linkages",
                ],
                outcomes: [
                    "Increased health service utilization",
                    "Timely treatment and care",
                    "Reduced health disparities",
                    "Better health outcomes for remote communities",
                ],
            },
        ],
    },
    {
        id: "shield",
        name: "SHIELD",
        fullName: "Safeguarding Human Integrity, Equality, and Legal Dignity",
        tagline: "Protection & Rights for All",
        description:
            "SHIELD protects women and children from violence, exploitation, and abuse while advocating for their rights and dignity.",
        color: "#f7c498",
        image: "https://images.unsplash.com/photo-1772419216460-667b7955f0f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm90ZWN0aW9uJTIwc2FmZXR5JTIwc3VwcG9ydCUyMGhhbmRzfGVufDF8fHx8MTc3Mzc2MjM2NXww&ixlib=rb-4.1.0&q=80&w=1080",
        icon: "Shield",
        subPrograms: [
            {
                id: "shield-safe",
                name: "SHIELD–SAFE",
                fullName: "Prevention of Violence & Exploitation",
                focus: "Preventing gender-based violence and exploitation of women and children",
                description:
                    "Implements prevention strategies, awareness campaigns, and community mobilization to stop violence before it occurs.",
                image: "https://images.unsplash.com/photo-1607823477653-e2c3980acb86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMHJlYWRpbmclMjBib29rcyUyMGxpYnJhcnl8ZW58MXx8fHwxNzczNzI4NDg2fDA&ixlib=rb-4.1.0&q=80&w=1080",
                targetGroup: ["Women at risk", "Children", "Communities"],
                keyComponents: [
                    "Violence prevention education",
                    "Community awareness campaigns",
                    "Risk assessment and early intervention",
                    "Safe spaces and protection mechanisms",
                ],
                outcomes: [
                    "Reduced incidence of violence",
                    "Increased community vigilance",
                    "Stronger prevention systems",
                    "Safer environments for women and children",
                ],
            },
            {
                id: "shield-psy",
                name: "SHIELD–PSY",
                fullName: "Psychosocial Support & Mental Wellbeing",
                focus: "Providing trauma-informed care and psychosocial support for survivors",
                description:
                    "Offers counseling, therapy, and psychosocial support to help survivors of violence and trauma heal and rebuild.",
                image: "https://images.unsplash.com/photo-1607823477653-e2c3980acb86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMHJlYWRpbmclMjBib29rcyUyMGxpYnJhcnl8ZW58MXx8fHwxNzczNzI4NDg2fDA&ixlib=rb-4.1.0&q=80&w=1080",
                targetGroup: [
                    "Survivors of violence",
                    "Trauma-affected individuals",
                    "Families in crisis",
                ],
                keyComponents: [
                    "Trauma counseling services",
                    "Psychosocial support groups",
                    "Mental health referrals",
                    "Healing and resilience programs",
                ],
                outcomes: [
                    "Improved mental health of survivors",
                    "Reduced trauma symptoms",
                    "Enhanced coping and resilience",
                    "Restored sense of safety",
                ],
            },
            {
                id: "shield-rights",
                name: "SHIELD–RIGHTS",
                fullName: "Rights Awareness & Legal Empowerment",
                focus: "Empowering women and children with knowledge of their rights and legal support",
                description:
                    "Educates women and children about their rights and provides legal aid and advocacy for justice.",
                image: "https://images.unsplash.com/photo-1607823477653-e2c3980acb86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMHJlYWRpbmclMjBib29rcyUyMGxpYnJhcnl8ZW58MXx8fHwxNzczNzI4NDg2fDA&ixlib=rb-4.1.0&q=80&w=1080",
                targetGroup: ["Women", "Children", "Marginalized groups"],
                keyComponents: [
                    "Legal literacy programs",
                    "Legal aid and counseling",
                    "Advocacy and case support",
                    "Rights-based awareness campaigns",
                ],
                outcomes: [
                    "Increased rights awareness",
                    "Access to justice",
                    "Reduced legal barriers",
                    "Empowered rights holders",
                ],
            },
            {
                id: "shield-basic",
                name: "SHIELD–BASIC",
                fullName: "Access to Basic Needs & Protection Assistance",
                focus: "Meeting immediate needs of those in crisis or vulnerable situations",
                description:
                    "Provides emergency assistance, shelter, food, and essential support to those facing immediate protection risks.",
                image: "https://images.unsplash.com/photo-1607823477653-e2c3980acb86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMHJlYWRpbmclMjBib29rcyUyMGxpYnJhcnl8ZW58MXx8fHwxNzczNzI4NDg2fDA&ixlib=rb-4.1.0&q=80&w=1080",
                targetGroup: [
                    "Crisis-affected individuals",
                    "Homeless women and children",
                    "Refugees and displaced persons",
                ],
                keyComponents: [
                    "Emergency shelter and housing",
                    "Food and material assistance",
                    "Cash and voucher support",
                    "Essential service referrals",
                ],
                outcomes: [
                    "Met basic needs for survival",
                    "Reduced vulnerability",
                    "Stabilized living conditions",
                    "Pathway to recovery",
                ],
            },
            {
                id: "shield-community",
                name: "SHIELD–COMMUNITY",
                fullName: "Community-Based Protection Systems",
                focus: "Building community-led protection mechanisms and networks",
                description:
                    "Strengthens community capacity to identify, prevent, and respond to protection risks collectively.",
                image: "https://images.unsplash.com/photo-1607823477653-e2c3980acb86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMHJlYWRpbmclMjBib29rcyUyMGxpYnJhcnl8ZW58MXx8fHwxNzczNzI4NDg2fDA&ixlib=rb-4.1.0&q=80&w=1080",
                targetGroup: [
                    "Community leaders",
                    "Local organizations",
                    "Community members",
                ],
                keyComponents: [
                    "Community protection committees",
                    "Early warning systems",
                    "Community-based case management",
                    "Protection network strengthening",
                ],
                outcomes: [
                    "Stronger community protection systems",
                    "Faster response to protection issues",
                    "Increased community ownership",
                    "Sustainable protection mechanisms",
                ],
            },
            {
                id: "shield-men-ally",
                name: "SHIELD–MEN ALLY",
                fullName: "Male Engagement & Positive Social Norm Change",
                focus: "Engaging men and boys as allies in preventing violence and promoting equality",
                description:
                    "Transforms harmful masculinity norms and engages men as champions of gender equality and non-violence.",
                image: "https://images.unsplash.com/photo-1607823477653-e2c3980acb86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMHJlYWRpbmclMjBib29rcyUyMGxpYnJhcnl8ZW58MXx8fHwxNzczNzI4NDg2fDA&ixlib=rb-4.1.0&q=80&w=1080",
                targetGroup: [
                    "Men and boys",
                    "Fathers",
                    "Male community leaders",
                ],
                keyComponents: [
                    "Positive masculinity workshops",
                    "Male champion networks",
                    "Fatherhood and caregiving promotion",
                    "Social norm change campaigns",
                ],
                outcomes: [
                    "Transformed gender norms",
                    "Increased male allyship",
                    "Reduced perpetration of violence",
                    "Positive male role models",
                ],
            },
        ],
    },
    {
        id: "greenlight",
        name: "GREENLIGHT",
        fullName:
            "Gender-Responsive Environmental Education and Leadership Initiative for Transformation",
        tagline: "Environmental Sustainability for Future",
        description:
            "GREENLIGHT empowers women and youth to lead environmental action and build sustainable, climate-resilient communities.",
        color: "#f7c498",
        image: "https://images.unsplash.com/photo-1641941672934-9e33a79ec482?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbnZpcm9ubWVudCUyMG5hdHVyZSUyMGdyZWVuJTIwc3VzdGFpbmFiaWxpdHl8ZW58MXx8fHwxNzczNzYyMzY2fDA&ixlib=rb-4.1.0&q=80&w=1080",
        icon: "Leaf",
        subPrograms: [
            {
                id: "greenlight-edu",
                name: "GREENLIGHT–EDU",
                fullName: "Environmental Literacy & Climate Education",
                focus: "Building environmental awareness and climate change understanding",
                description:
                    "Provides education on environmental issues, climate change, and sustainable practices to empower informed action.",
                image: "https://images.unsplash.com/photo-1607823477653-e2c3980acb86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMHJlYWRpbmclMjBib29rcyUyMGxpYnJhcnl8ZW58MXx8fHwxNzczNzI4NDg2fDA&ixlib=rb-4.1.0&q=80&w=1080",
                targetGroup: ["Students", "Teachers", "Community members"],
                keyComponents: [
                    "Environmental education curriculum",
                    "Climate change awareness programs",
                    "Eco-literacy workshops",
                    "Environmental science learning",
                ],
                outcomes: [
                    "Increased environmental awareness",
                    "Better understanding of climate issues",
                    "Informed environmental behaviors",
                    "Youth environmental advocates",
                ],
            },
            {
                id: "greenlight-youth",
                name: "GREENLIGHT–YOUTH",
                fullName: "Child & Youth Environmental Leadership",
                focus: "Empowering young people as environmental leaders and change agents",
                description:
                    "Cultivates youth-led environmental initiatives, leadership, and activism for sustainable futures.",
                image: "https://images.unsplash.com/photo-1607823477653-e2c3980acb86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMHJlYWRpbmclMjBib29rcyUyMGxpYnJhcnl8ZW58MXx8fHwxNzczNzI4NDg2fDA&ixlib=rb-4.1.0&q=80&w=1080",
                targetGroup: ["Children", "Youth", "Student groups"],
                keyComponents: [
                    "Youth environmental clubs",
                    "Leadership training",
                    "Environmental project implementation",
                    "Youth advocacy platforms",
                ],
                outcomes: [
                    "Youth-led environmental projects",
                    "Strong environmental leadership",
                    "Increased youth activism",
                    "Sustainable behavior change",
                ],
            },
            {
                id: "greenlight-women-lead",
                name: "GREENLIGHT–WOMEN LEAD",
                fullName: "Women-Led Environmental Action",
                focus: "Supporting women as leaders in environmental conservation and climate action",
                description:
                    "Empowers women to lead environmental initiatives, access green livelihoods, and drive community sustainability.",
                image: "https://images.unsplash.com/photo-1607823477653-e2c3980acb86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMHJlYWRpbmclMjBib29rcyUyMGxpYnJhcnl8ZW58MXx8fHwxNzczNzI4NDg2fDA&ixlib=rb-4.1.0&q=80&w=1080",
                targetGroup: [
                    "Women",
                    "Women's groups",
                    "Female community leaders",
                ],
                keyComponents: [
                    "Women's environmental leadership training",
                    "Green livelihood opportunities",
                    "Environmental advocacy support",
                    "Women-led conservation projects",
                ],
                outcomes: [
                    "Women environmental leaders",
                    "Green income opportunities",
                    "Community environmental stewardship",
                    "Gender-responsive climate action",
                ],
            },
            {
                id: "greenlight-household",
                name: "GREENLIGHT–HOUSEHOLD",
                fullName: "Sustainable Household Practices",
                focus: "Promoting eco-friendly practices at household level",
                description:
                    "Introduces sustainable practices in homes for waste reduction, energy efficiency, and environmental responsibility.",
                image: "https://images.unsplash.com/photo-1607823477653-e2c3980acb86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMHJlYWRpbmclMjBib29rcyUyMGxpYnJhcnl8ZW58MXx8fHwxNzczNzI4NDg2fDA&ixlib=rb-4.1.0&q=80&w=1080",
                targetGroup: ["Families", "Households", "Women"],
                keyComponents: [
                    "Waste reduction and recycling",
                    "Energy and water conservation",
                    "Sustainable consumption education",
                    "Home gardening and composting",
                ],
                outcomes: [
                    "Reduced household environmental impact",
                    "Sustainable daily practices",
                    "Lower resource consumption",
                    "Healthier home environments",
                ],
            },
            {
                id: "greenlight-community",
                name: "GREENLIGHT–COMMUNITY",
                fullName: "Community-Based Environmental Solutions",
                focus: "Implementing community-driven environmental and climate solutions",
                description:
                    "Supports communities to design and implement local environmental solutions that address their specific challenges.",
                image: "https://images.unsplash.com/photo-1607823477653-e2c3980acb86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMHJlYWRpbmclMjBib29rcyUyMGxpYnJhcnl8ZW58MXx8fHwxNzczNzI4NDg2fDA&ixlib=rb-4.1.0&q=80&w=1080",
                targetGroup: [
                    "Communities",
                    "Local governments",
                    "Community organizations",
                ],
                keyComponents: [
                    "Community environmental planning",
                    "Local conservation initiatives",
                    "Climate adaptation projects",
                    "Community natural resource management",
                ],
                outcomes: [
                    "Community-led environmental action",
                    "Sustainable resource management",
                    "Climate-resilient communities",
                    "Local environmental governance",
                ],
            },
            {
                id: "greenlight-circular",
                name: "GREENLIGHT–CIRCULAR",
                fullName: "Circular Economy & Sustainable Practices",
                focus: "Promoting circular economy principles and waste-to-value innovations",
                description:
                    "Introduces circular economy models, upcycling, and sustainable production for environmental and economic benefits.",
                image: "https://images.unsplash.com/photo-1607823477653-e2c3980acb86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMHJlYWRpbmclMjBib29rcyUyMGxpYnJhcnl8ZW58MXx8fHwxNzczNzI4NDg2fDA&ixlib=rb-4.1.0&q=80&w=1080",
                targetGroup: ["Entrepreneurs", "Communities", "Women's groups"],
                keyComponents: [
                    "Circular economy education",
                    "Waste-to-value training",
                    "Upcycling and recycling businesses",
                    "Sustainable production methods",
                ],
                outcomes: [
                    "Reduced waste generation",
                    "Green business opportunities",
                    "Circular value chains",
                    "Sustainable economic models",
                ],
            },
        ],
    },
];
