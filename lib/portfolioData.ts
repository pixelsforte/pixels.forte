export interface PortfolioProject {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  bannerImage: string;
  galleryImages: string[];
  tags: string[];
  description: {
    heading: string;
    subheading?: string;
    paragraphs: string[];
  };
  deliverables: string[];
  colorPalette?: { name: string; hex: string }[];
}

export const PORTFOLIO_PROJECTS: Record<string, PortfolioProject> = {
  "horizon": {
    id: "horizon",
    title: "Horizon Leisure Group",
    subtitle: "Branding & Website Design",
    category: "HOSPITALITY & LEISURE",
    bannerImage: "/portfolio/Horizon.jpeg",
    galleryImages: [
      "/portfolio/Horizon-1.jpeg",
      "/portfolio/Horizon-2.jpeg",
      "/portfolio/Horizon-3.jpeg",
      "/portfolio/Horizon.jpeg"
    ],
    tags: ["Branding", "Website Design", "Print Collateral"],
    description: {
      heading: "Horizon Leisure Group – Branding & Website Design",
      paragraphs: [
        "I designed a complete brand identity and modern website for Horizon Leisure Group, a company in the hospitality and leisure industry. The project included a responsive website, logo application, brochures, book covers, calendars, and other marketing materials to create a consistent brand experience.",
        "The design uses a clean layout with a green and gold colour palette to reflect trust, growth, and premium quality. Large visuals, clear typography, and simple navigation help users easily explore the company's services while creating a professional and engaging experience across both digital and print materials."
      ]
    },
    deliverables: [
      "Brand Identity",
      "Responsive Website",
      "Logo Application",
      "Brochures",
      "Book Covers",
      "Calendars",
      "Marketing Materials"
    ],
    colorPalette: [
      { name: "Forest Green", hex: "#1b4d3e" },
      { name: "Premium Gold", hex: "#d4af37" }
    ]
  },

  "bucksnbricks": {
    id: "bucksnbricks",
    title: "Bucks and Bricks",
    subtitle: "HR & Payroll Management Platform",
    category: "HUMAN RESOURCES & TECH",
    bannerImage: "/portfolio/bucksnbricks.jpeg",
    galleryImages: [
      "/portfolio/bucksnbricks_1.jpeg",
      "/portfolio/bucksnbricks_2.jpeg",
      "/portfolio/bucksnbricks_3.jpeg",
      "/portfolio/bucksnbricks_4.jpeg"
    ],
    tags: ["HR Platform", "Payroll System", "Brand Identity"],
    description: {
      heading: "Bucks and Bricks – HR & Payroll Management Platform",
      paragraphs: [
        "Bucks and Bricks is a modern HR and payroll management platform designed to help businesses simplify workforce operations. The project focused on creating a professional digital experience that showcases HR services, payroll management, recruitment support, and employee solutions while making it easy for businesses to book demos and connect with the company.",
        "Alongside the website, the project also included a complete brand identity system with stationery and marketing materials to ensure a consistent and trustworthy brand presence across both digital and print platforms."
      ]
    },
    deliverables: [
      "HR Web Platform",
      "Payroll Interface",
      "Stationery System",
      "Brand Guidelines",
      "Marketing Collateral",
      "Demo Booking System"
    ],
    colorPalette: [
      { name: "Corporate Blue", hex: "#1e3a8a" },
      { name: "Warm Amber", hex: "#d97706" }
    ]
  },

  "elegance-living": {
    id: "elegance-living",
    title: "Elegance Living",
    subtitle: "Modern Home Décor & Furniture",
    category: "INTERIOR & LIFESTYLE",
    bannerImage: "/portfolio/Elegance_living.jpeg",
    galleryImages: [],
    tags: ["Home Décor", "E-Commerce", "Furniture"],
    description: {
      heading: "Elegance Living – Project Description",
      paragraphs: [
        "Elegance Living is a modern home décor and furniture eCommerce brand focused on showcasing stylish, contemporary products through a seamless online shopping experience. The project was designed to help customers easily explore curated collections, discover featured products, and shop with confidence from a clean and intuitive digital storefront.",
        "The website combines a minimalist aesthetic with spacious layouts, high-quality lifestyle imagery, and well-organized product sections to highlight the brand's premium offerings. Strategic promotional banners, clear navigation, and user-friendly calls to action create an engaging browsing experience that encourages product discovery and drives online conversions."
      ]
    },
    deliverables: [
      "E-Commerce Storefront",
      "Product Catalog UI",
      "Lifestyle Imagery Direction",
      "Promotional Banners",
      "Minimalist Design System"
    ],
    colorPalette: [
      { name: "Charcoal Black", hex: "#1c1917" },
      { name: "Soft Sand", hex: "#e7e5e4" }
    ]
  },

  // "aspire-global": {
  //   id: "aspire-global",
  //   title: "Aspire Global Solution",
  //   subtitle: "Business Services Platform",
  //   category: "ENTERPRISE SERVICES",
  //   bannerImage: "/portfolio/Aspire_global_solution.jpeg",
  //   galleryImages: [
  //     "/portfolio/Aspire_global_solution_1.jpeg"
  //   ],
  //   tags: ["Business Services", "Corporate Web", "Stationery"],
  //   description: {
  //     heading: "Aspire Global Solution – Business Services Platform",
  //     subheading: "Aspire Global Solution – Project Description",
  //     paragraphs: [
  //       "Aspire Global Solution is a business services company that helps organisations grow through HR solutions, travel services, creative services, financial support, insurance, taxation, and digital marketing. The project focused on building a professional online platform that clearly presents the company's wide range of services, strengthens its global brand presence, and makes it easy for clients to explore solutions and connect with the team.",
  //       "The website features a clean, professional interface with a structured navigation system, engaging service highlights, and strategic call-to-action sections that guide users through the customer journey. Supported by cohesive branding and marketing collateral, the project delivers a trustworthy digital presence that reflects the company's commitment to growth."
  //     ]
  //   },
  //   deliverables: [
  //     "Corporate Web Portal",
  //     "Branded Stationery",
  //     "Service Architecture",
  //     "Marketing Collateral",
  //     "Lead Generation UI"
  //   ],
  //   colorPalette: [
  //     { name: "Deep Navy", hex: "#0f172a" },
  //     { name: "Pure White", hex: "#ffffff" }
  //   ]
  // },

  "ev-charging": {
    id: "ev-charging",
    title: "EV Charging Platform",
    subtitle: "Clean Energy Infrastructure",
    category: "SUSTAINABILITY & TECH",
    bannerImage: "/portfolio/EV.jpeg",
    galleryImages: [],
    tags: ["Clean Energy", "EV Infrastructure", "Tech Platform"],
    description: {
      heading: "EV Charging – Project Description",
      paragraphs: [
        "EV Charging is a clean energy and electric vehicle infrastructure platform focused on providing accessible, reliable, and sustainable charging solutions. The project was designed to educate users about EV charging options, showcase the company's technology, and guide potential customers toward finding the right charging solution for their needs.",
        "The website features a modern, high-impact visual style with immersive imagery, bold typography, and clear calls to action that immediately communicate the brand's innovation and sustainability focus. A streamlined navigation structure and intuitive user flow create an engaging experience that makes complex information easy to understand while reinforcing trust in the brand's forward-thinking approach."
      ]
    },
    deliverables: [
      "Digital Platform",
      "Tech Showcase",
      "User Onboarding Flow",
      "Interactive Solution Finder",
      "Sustainable Brand Identity"
    ],
    colorPalette: [
      { name: "Eco Green", hex: "#16a34a" },
      { name: "Tech Slate", hex: "#334155" }
    ]
  },

  "fashion-ecommerce": {
    id: "fashion-ecommerce",
    title: "Fashion E-Commerce",
    subtitle: "Lifestyle & Apparel Storefront",
    category: "FASHION & RETAIL",
    bannerImage: "/portfolio/Fashion_E-commerce_Website.jpeg",
    galleryImages: [],
    tags: ["Fashion Retail", "E-Commerce", "Card Layout"],
    description: {
      heading: "Fashion E-commerce Website",
      paragraphs: [
        "This project was designed for a fashion and lifestyle brand to showcase new collections, product categories, and special offers in a modern online shopping experience.",
        "The website uses a clean card-based layout, soft pastel colours, and strong lifestyle imagery to make the products feel fresh and relatable. Clear navigation, well-organised sections, and bold headlines help users browse easily and explore the collection with a smooth, stylish experience."
      ]
    },
    deliverables: [
      "Card-Based UI",
      "Pastel Color Palette",
      "Collection Showcase",
      "Mobile Responsive Store",
      "Category Navigation"
    ],
    colorPalette: [
      { name: "Soft Blush", hex: "#fbcfe8" },
      { name: "Muted Lavender", hex: "#e9d5ff" }
    ]
  },

  "wetaste": {
    id: "wetaste",
    title: "WeTaste",
    subtitle: "Food & Culinary Experience Brand",
    category: "GOURMET & HOSPITALITY",
    bannerImage: "/portfolio/we_taste.jpeg",
    galleryImages: [],
    tags: ["Food & Wine", "Culinary Tours", "Gourmet Brand"],
    description: {
      heading: "WeTaste – Food & Craving Experience Brand",
      paragraphs: [
        "WeTaste is a premium food and wine experience brand offering curated culinary tours and gourmet dining experiences. This project focused on creating a refined brand identity that reflects elegance, authenticity, and a passion for exceptional food and wine.",
        "The branding was designed to attract travellers and food enthusiasts while delivering a memorable and consistent experience across promotional materials, packaging, and print assets."
      ]
    },
    deliverables: [
      "Refined Brand Identity",
      "Packaging Design",
      "Promotional Assets",
      "Print Collateral",
      "Culinary Tour Collateral"
    ],
    colorPalette: [
      { name: "Burgundy Wine", hex: "#881337" },
      { name: "Warm Cream", hex: "#fef3c7" }
    ]
  },

  "avyron-and-co": {
    id: "avyron-and-co",
    title: "Avyron & Co",
    subtitle: "Corporate Branding & Procurement",
    category: "BUSINESS SUPPLIES",
    bannerImage: "/portfolio/Avyron_and_Co.jpeg",
    galleryImages: [
      "/portfolio/Avyron_and_Co_2.jpeg"
    ],
    tags: ["Corporate Identity", "Stationery System", "Branded Apparel"],
    description: {
      heading: "Corporate Branding & Identity for Avyron & Co.",
      subheading: "Corporate Branding for Avyron & Co.",
      paragraphs: [
        "Designed a clean and professional brand identity for Avyron & Co., a business supply and procurement company focused on reliability and corporate excellence. The project included a cohesive stationery system featuring business cards, letterheads, envelopes, packaging elements, and branded apparel, creating a consistent visual identity across both print and corporate wear.",
        "The design emphasizes a modern, minimal aesthetic with a bold black-and-white palette accented by red and blue brand colors. Strong typography, clean layouts, and strategic use of whitespace reinforce trust, professionalism, and brand recognition while ensuring a polished and memorable corporate presence across every customer touchpoint."
      ]
    },
    deliverables: [
      "Business Cards",
      "Letterheads & Envelopes",
      "Packaging Elements",
      "Branded Polo Apparel",
      "Minimalist Design System"
    ],
    colorPalette: [
      { name: "Obsidian Black", hex: "#000000" },
      { name: "Accent Red", hex: "#dc2626" },
      { name: "Accent Blue", hex: "#2563eb" }
    ]
  },

  "cyberpunk-newneon": {
    id: "cyberpunk-newneon",
    title: "Project Cyberpunk",
    subtitle: "Futuristic Product Landing Page",
    category: "FUTURE TECH & WEARABLES",
    bannerImage: "/portfolio/Cyberpunk_NewNeon.jpeg",
    galleryImages: [],
    tags: ["Futuristic Tech", "Cyberpunk Design", "Product Showcase"],
    description: {
      heading: "Cyberpunk NewNeon – Futuristic Product Landing Page",
      paragraphs: [
        "A concept website designed for a futuristic eyewear and wearable technology brand, showcasing a premium cyberpunk-inspired product collection. The goal was to create an immersive digital experience that highlights innovative design, cutting-edge technology, and bold visual storytelling while presenting product features in a clear and engaging way.",
        "The interface combines a dark, high-contrast color palette with vibrant neon accents, modern typography, and a structured editorial layout to reinforce the futuristic aesthetic. Large cinematic imagery, clean navigation, and carefully balanced content sections deliver an engaging user experience that feels both premium and highly readable, making the brand stand out in a competitive technology and fashion market."
      ]
    },
    deliverables: [
      "Product Landing Page",
      "Cyberpunk Interface",
      "High-Contrast Theme",
      "Editorial Layout",
      "Tech Storytelling"
    ],
    colorPalette: [
      { name: "Neon Cyan", hex: "#06b6d4" },
      { name: "Cyber Purple", hex: "#a855f7" },
      { name: "Obsidian Dark", hex: "#09090b" }
    ]
  },

  "tecno-multi-industry": {
    id: "tecno-multi-industry",
    title: "Tecno Multi Industry",
    subtitle: "Multi-Industry Corporate Website",
    category: "INDUSTRIAL & AUTOMOTIVE",
    bannerImage: "/portfolio/Tecno_Multi_Industry.jpeg",
    galleryImages: [],
    tags: ["Corporate Web", "Industrial Tech", "Multi-Sector"],
    description: {
      heading: "Tecno – Multi-Industry Corporate Website",
      paragraphs: [
        "A modern corporate website concept designed for a diversified industrial group operating across multiple business sectors, including automotive, electronics, e-bikes, agriculture, and manufacturing. The primary objective was to establish a strong digital presence, communicate the company's scale and expertise, and provide visitors with a clear pathway to explore its various business divisions.",
        "The design features a bold industrial aesthetic with a dark visual theme, striking full-width imagery, and clean typography that reinforces professionalism and trust. A streamlined navigation structure, responsive layout, and intuitive content hierarchy ensure a seamless browsing experience across devices while effectively showcasing the company's capabilities, industry presence, and corporate identity."
      ]
    },
    deliverables: [
      "Corporate Digital Presence",
      "Industrial Aesthetics",
      "Multi-Division Navigation",
      "Responsive Content Hierarchy",
      "Brand Identity System"
    ],
    colorPalette: [
      { name: "Industrial Steel", hex: "#475569" },
      { name: "Dark Carbon", hex: "#18181b" },
      { name: "Electric Accent", hex: "#3b82f6" }
    ]
  }
};

export const PORTFOLIO_ONE_IDS = [
  "horizon",
  "bucksnbricks",
  "elegance-living",
  // "aspire-global",
];
export const PORTFOLIO_TWO_IDS = ["ev-charging", "fashion-ecommerce", "wetaste"];
export const PORTFOLIO_THREE_IDS = ["avyron-and-co", "cyberpunk-newneon", "tecno-multi-industry"];
