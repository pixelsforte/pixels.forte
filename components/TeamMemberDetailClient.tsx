"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Sparkles, Linkedin, Twitter, Globe } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Definitive list of team members matching team-1.webp through team-9.webp
const DEFAULT_TEAM_MEMBERS: Record<string, {
  id: string;
  name: string;
  role: string;
  img: string;
  quote: string;
  bio: string;
  stats: { label: string; value: string }[];
  skills: { name: string; percentage: number }[];
  portfolio: { title: string; category: string; description: string; year: string }[];
}> = {
  "1": {
    id: "1",
    name: "Mila Rodriguez",
    role: "Creative Director",
    img: "/team/team-1.webp",
    quote: "We don't just build brands; we create emotional anchors that linger in the mind.",
    bio: "Mila is an award-winning creative visionary with over a decade of experience leading multi-disciplinary design studios. Known for her bold, conceptual thinking and architectural sense of layout, she has guided global startups and Fortune 500 companies alike to discover their unique visual voice. She believes that design is an active dialogue, and every brand tells a story waiting to be refined.",
    stats: [
      { label: "Experience", value: "12 Years" },
      { label: "Projects", value: "120+" },
      { label: "Style Vibe", value: "Modern Bold" }
    ],
    skills: [
      { name: "Creative Direction", percentage: 98 },
      { name: "Brand Strategy", percentage: 90 },
      { name: "Visual Arts", percentage: 85 }
    ],
    portfolio: [
      { title: "Aura Smart Spaces", category: "Brand Identity", description: "Complete visual ecosystem and sensory branding for an IoT real estate leader.", year: "2025" },
      { title: "Metropolis Retail", category: "Creative Campaign", description: "Multi-city interactive physical and digital launch installation.", year: "2024" }
    ]
  },
  "2": {
    id: "2",
    name: "Lucas Bennett",
    role: "Strategy Director",
    img: "/team/team-2.webp",
    quote: "Data informs the path, but a smart narrative is what makes people walk it.",
    bio: "Lucas bridges the gap between consumer analytics and high-impact design. Having previously served as Principal Planner at leading digital agencies, he specializes in identifying niche market opportunities and shaping cohesive brand positions. He is dedicated to ensuring that every visual execution rests on a rock-solid foundation of market strategy and consumer insight.",
    stats: [
      { label: "Experience", value: "10 Years" },
      { label: "Projects", value: "95+" },
      { label: "Client ROI", value: "+240%" }
    ],
    skills: [
      { name: "Market Analysis", percentage: 95 },
      { name: "Consumer Strategy", percentage: 92 },
      { name: "Communication", percentage: 88 }
    ],
    portfolio: [
      { title: "Luntap Fintech", category: "Strategic Positioning", description: "Redefined digital trust paradigms and streamlined user acquisition tactics.", year: "2025" },
      { title: "CreataVail Tech", category: "GTM Campaign", description: "Led full-funnel strategy resulting in a massive increase in organic conversion.", year: "2024" }
    ]
  },
  "3": {
    id: "3",
    name: "Olivia Turner",
    role: "Tech Lead",
    img: "/team/team-3.webp",
    quote: "A beautiful design without seamless engineering is just a poster. We build digital engines.",
    bio: "Olivia is a full-stack engineer and tech architect who treats code as an art form. With an academic background in Human-Computer Interaction and years of experience building high-performance web applications, she oversees Pixelforte's engineering workflows. Olivia is passionate about smooth animations, lightning-fast rendering, and accessible web standards.",
    stats: [
      { label: "Experience", value: "8 Years" },
      { label: "Projects", value: "60+" },
      { label: "Code Quality", value: "Pristine" }
    ],
    skills: [
      { name: "Next.js & React", percentage: 96 },
      { name: "Web Animations", percentage: 92 },
      { name: "Tech Architecture", percentage: 90 }
    ],
    portfolio: [
      { title: "Shopia Commerce Engine", category: "E-Commerce System", description: "Modular, headless commerce infrastructure with sub-second page loads globally.", year: "2025" },
      { title: "PixelForte Core", category: "Custom CMS", description: "Built the agency's modular internal asset distribution and preview platform.", year: "2024" }
    ]
  },
  "4": {
    id: "4",
    name: "Noah Kim",
    role: "Senior Product Designer",
    img: "/team/team-4.webp",
    quote: "Simplicity is the art of removing the noise until only the essential truth remains.",
    bio: "Noah is a product design specialist dedicated to crafting intuitive digital interfaces that feel entirely natural to use. He combines clean typography, generous grid layouts, and microscopic interactions to build digital tools that users love returning to day after day. Noah believes that the best interfaces are invisible, letting the content speak for itself.",
    stats: [
      { label: "Experience", value: "7 Years" },
      { label: "Projects", value: "75+" },
      { label: "Core Focus", value: "UX Simplicity" }
    ],
    skills: [
      { name: "Product UI/UX", percentage: 94 },
      { name: "Design Systems", percentage: 95 },
      { name: "Prototyping", percentage: 90 }
    ],
    portfolio: [
      { title: "Urban Workspace App", category: "SaaS Product", description: "Streamlined co-working booking systems and interactive seat-selection maps.", year: "2025" },
      { title: "Leagone Dashboard", category: "B2B Analytics", description: "Complex analytics platform simplified into a single-pane responsive viewport.", year: "2024" }
    ]
  },
  "5": {
    id: "5",
    name: "Ava Mitchell",
    role: "UI/UX Design Lead",
    img: "/team/team-5.webp",
    quote: "Every pixel must have a purpose, and every micro-interaction should trigger delight.",
    bio: "Ava is a visual craftswoman with a deep passion for digital aesthetics and motion. Her career has centered on crafting highly responsive web and mobile interfaces that feel lively and rich. She translates abstract client visions into tactile, high-fidelity prototypes, setting design directions that bridge sensory beauty and absolute usability.",
    stats: [
      { label: "Experience", value: "6 Years" },
      { label: "Projects", value: "50+" },
      { label: "Visual Style", value: "Fluid Minimal" }
    ],
    skills: [
      { name: "UI Design", percentage: 95 },
      { name: "Interactive Motion", percentage: 90 },
      { name: "UX Research", percentage: 85 }
    ],
    portfolio: [
      { title: "MILK Dairy Portal", category: "Interactive Web", description: "Award-winning interactive showcase website for a premium organic distributor.", year: "2025" },
      { title: "Ac2h Mobility", category: "Mobile App UI", description: "Complete passenger dashboard and navigation system for smart transport.", year: "2024" }
    ]
  },
  "6": {
    id: "6",
    name: "Lily Anderson",
    role: "Content & Storytelling Lead",
    img: "/team/team-6.webp",
    quote: "Design grabs the observer's attention, but it is the story that secures their commitment.",
    bio: "Lily is a copywriter and brand storyteller who specializes in giving brands their verbal identity. Her background in creative writing and digital journalism empowers her to craft crisp, persuasive copy that resonates deeply across channels. From landing pages to global advertising slogans, Lily ensures that every word reflects the core soul of the brand.",
    stats: [
      { label: "Experience", value: "9 Years" },
      { label: "Projects", value: "110+" },
      { label: "Tone Profile", value: "Articulate" }
    ],
    skills: [
      { name: "Copywriting", percentage: 98 },
      { name: "Narrative Design", percentage: 94 },
      { name: "Content Strategy", percentage: 90 }
    ],
    portfolio: [
      { title: "Marque Brand Book", category: "Editorial Design", description: "Crafted full verbal style guide, philosophy book, and tone roadmap.", year: "2025" },
      { title: "Urban Lifestyle", category: "Ad Campaign", description: "Slogans and ad copy for a multi-city physical billboard campaign that went viral.", year: "2024" }
    ]
  },
  "7": {
    id: "7",
    name: "Ethan Wright",
    role: "Brand Strategist",
    img: "/team/team-7.webp",
    quote: "A brand is not a logo. It is the sum of every interaction a customer has with your product.",
    bio: "Ethan Wright helps brands define their core values and map out long-term roadmaps for visual and cultural impact. With analytical precision and a keen eye for cultural trends, he guides Pixelforte's clients through strategic repositioning and visual refreshes, ensuring their market presence remains fresh, modern, and highly defensible.",
    stats: [
      { label: "Experience", value: "8 Years" },
      { label: "Projects", value: "80+" },
      { label: "Focus", value: "Brand Audits" }
    ],
    skills: [
      { name: "Brand Audits", percentage: 92 },
      { name: "Culture Research", percentage: 90 },
      { name: "Market Positioning", percentage: 93 }
    ],
    portfolio: [
      { title: "Marque Rebranding", category: "Market Positioning", description: "Conducted comprehensive competitive research and user persona mapping.", year: "2025" },
      { title: "Zenith Leisure", category: "Strategy Audit", description: "Repositioned a legacy travel company for next-generation modern travelers.", year: "2024" }
    ]
  },
  "8": {
    id: "8",
    name: "Sophia Martinez",
    role: "Brand Designer",
    img: "/team/team-8.webp",
    quote: "Color, typography, and texture are raw emotions waiting to be structured.",
    bio: "Sophia is an expert in typography pairing and custom logo systems. Her designs are recognizable for their modern Swiss aesthetics, bold color contrasts, and geometric elegance. Sophia is highly active in the global design community, always pushing boundaries to incorporate cutting-edge graphic principles into commercial brand systems.",
    stats: [
      { label: "Experience", value: "5 Years" },
      { label: "Projects", value: "45+" },
      { label: "Design School", value: "Swiss/Bold" }
    ],
    skills: [
      { name: "Typography", percentage: 95 },
      { name: "Vector Illustration", percentage: 88 },
      { name: "Package Design", percentage: 85 }
    ],
    portfolio: [
      { title: "Shopia Packaging", category: "Retail Package", description: "Created custom bio-degradable shipping boxes and logo foils.", year: "2025" },
      { title: "Creativevail Identity", category: "Graphic Design", description: "Redesigned corporate logo and assets using bold Swiss motifs.", year: "2024" }
    ]
  },
  "9": {
    id: "9",
    name: "Marcus Vance",
    role: "Art Director",
    img: "/team/team-9.webp",
    quote: "Art direction is about creating a universe where every single element belongs together.",
    bio: "Marcus oversees the visual coherence across complex multi-channel campaigns. With a strong background in photography and fine arts, he collaborates closely with designers, developers, and photographers to execute unified visual directions. Marcus thrives in high-pressure creative challenges, bringing an editorial elegance to Pixelforte's commercial output.",
    stats: [
      { label: "Experience", value: "11 Years" },
      { label: "Projects", value: "100+" },
      { label: "Specialty", value: "Editorial Layout" }
    ],
    skills: [
      { name: "Art Direction", percentage: 96 },
      { name: "Photoshoot Production", percentage: 90 },
      { name: "Set Design", percentage: 85 }
    ],
    portfolio: [
      { title: "Leagone Campaign", category: "Photography Direction", description: "Directed high-fashion studio shoot for luxury sports gear.", year: "2025" },
      { title: "Luntap Office", category: "Spatial Design", description: "Co-designed interior graphics, signage, and environmental theme.", year: "2024" }
    ]
  }
};

// Shuffling pools for dynamic identity generation
const SHUFFLE_NAMES = [
  "Clara Sterling", "Sebastian Cole", "Elena Rostova", "Julian Cruz", 
  "Zara Al-Jamil", "Ryan Vance", "Chloe Dubois", "Gabriel Silva", 
  "Natalie Sterling", "Liam Cooper", "Maya Patel", "Freya Lindstrom"
];

const SHUFFLE_ROLES = [
  "AI Experience Designer", "Virtual Reality Architect", "Sound Identity Specialist", 
  "Spatial Experience Designer", "Interactive Technologist", "Editorial Art Lead",
  "Cyber-Identity Architect", "Experiential Content Strategist", "Fluid-Motion Designer"
];

const SHUFFLE_QUOTES = [
  "The screen is a canvas, and motion is its breathing cycle.",
  "We don't build standard features, we create memories of digital presence.",
  "Design is intelligence made visible, but storytelling is what makes it felt.",
  "If it doesn't challenge the observer, it is just white noise.",
  "Harmony resides in the precise tension between form, color, and grid.",
  "Sustained curiosity is the only real weapon a designer possesses.",
  "Great digital products should feel as organic as a physical tactile surface."
];

const SHUFFLE_BIOS = [
  "A conceptual designer whose work lies at the intersection of traditional print aesthetics and futuristic multi-dimensional interfaces. After starting in high-fashion editorial, they pivoted to immersive digital design to merge tactile textures with interactive layouts.",
  "A visual craftsperson and developer who believes in high-performance digital artistry. They spend their days sketching out fluid animations and translating complex data landscapes into gorgeous, easy-to-digest dashboards.",
  "A cultural strategist and creative thinker who focuses on bridging the gap between brand voice and human experience. They specialize in defining unique visual tones, typography ecosystems, and cultural roadmaps for cutting-edge startups.",
  "An expert developer and visual engineer who crafts websites that are as performant as they are aesthetically groundbreaking. Constantly exploring the absolute frontiers of CSS, WebGL, and interactive layout systems."
];

const SHUFFLE_ST_LABELS = ["Design Vibe", "Client Trust", "Growth", "Focus", "Creative Output", "Execution"];
const SHUFFLE_ST_VALUES = ["Brutalist", "100%", "+180%", "Micro-Details", "Unorthodox", "Ultra-Clean", "Radical"];

const SHUFFLE_SKILLS_POOL = [
  "Generative Motion", "WebGL & Three.js", "Design Systems", "Usability Testing", 
  "Typography Craft", "Art Direction", "Storyboarding", "Data Visualizations", 
  "Creative Coding", "Copywriting", "Interactive Prototyping", "Consumer Auditing"
];

const SHUFFLE_PORTFOLIOS = [
  { title: "Nebula Branding", category: "Cosmic Identity", description: "Visual guidelines and interactive landing system for a cosmic aerospace agency.", year: "2025" },
  { title: "Vortex Mobile App", category: "Fluid UI/UX", description: "Design and transition dynamics for a revolutionary zero-gravity navigation utility.", year: "2024" },
  { title: "Elysium Platform", category: "SaaS Design System", description: "A high-performance typography and spacing framework supporting 40+ products.", year: "2025" },
  { title: "Prism Physical Install", category: "Experiential Design", description: "Designed full light-projection graphics and signage for an independent museum.", year: "2024" }
];

export default function TeamMemberDetailClient({ id }: { id: string }) {
  const router = useRouter();
  
  // Resolve default member, fallback to member "1" if id not in dict
  const defaultMember = DEFAULT_TEAM_MEMBERS[id] || DEFAULT_TEAM_MEMBERS["1"];
  
  const [member, setMember] = useState(defaultMember);
  const [activePage, setActivePage] = useState<string>("team");
  const [isShuffling, setIsShuffling] = useState(false);

  // Sync state if parameters change
  useEffect(() => {
    if (DEFAULT_TEAM_MEMBERS[id]) {
      setMember(DEFAULT_TEAM_MEMBERS[id]);
    }
  }, [id]);

  const onContactClick = () => {
    router.push("/contact");
  };

  // Triggers the magical "Shuffle Identity" engine
  const handleShuffle = () => {
    setIsShuffling(true);
    
    setTimeout(() => {
      const randomName = SHUFFLE_NAMES[Math.floor(Math.random() * SHUFFLE_NAMES.length)];
      const randomRole = SHUFFLE_ROLES[Math.floor(Math.random() * SHUFFLE_ROLES.length)];
      const randomQuote = SHUFFLE_QUOTES[Math.floor(Math.random() * SHUFFLE_QUOTES.length)];
      const randomBio = SHUFFLE_BIOS[Math.floor(Math.random() * SHUFFLE_BIOS.length)];
      
      const randomStats = [
        { label: "Experience", value: `${Math.floor(Math.random() * 8) + 4} Years` },
        { label: SHUFFLE_ST_LABELS[Math.floor(Math.random() * SHUFFLE_ST_LABELS.length)], value: SHUFFLE_ST_VALUES[Math.floor(Math.random() * SHUFFLE_ST_VALUES.length)] },
        { label: "Projects Done", value: `${Math.floor(Math.random() * 80) + 30}+` }
      ];

      const shuffledSkillsPool = [...SHUFFLE_SKILLS_POOL].sort(() => 0.5 - Math.random());
      const randomSkills = [
        { name: shuffledSkillsPool[0], percentage: Math.floor(Math.random() * 15) + 84 },
        { name: shuffledSkillsPool[1], percentage: Math.floor(Math.random() * 15) + 80 },
        { name: shuffledSkillsPool[2], percentage: Math.floor(Math.random() * 20) + 75 }
      ];

      const shuffledPortfolios = [...SHUFFLE_PORTFOLIOS].sort(() => 0.5 - Math.random());
      const randomPortfolio = [shuffledPortfolios[0], shuffledPortfolios[1]];

      setMember({
        id: member.id,
        name: randomName,
        role: randomRole,
        img: member.img,
        quote: randomQuote,
        bio: randomBio,
        stats: randomStats,
        skills: randomSkills,
        portfolio: randomPortfolio
      });
      
      setIsShuffling(false);
    }, 450);
  };

  return (
    <>
      <Header
        activePage={activePage}
        setActivePage={(page) => {
          if (page === "home") {
            router.push("/");
          } else {
            router.push(`/${page}`);
          }
        }}
        onContactClick={onContactClick}
      />
      
      <main className="w-full bg-[#f4f1ea] text-black min-h-screen py-16 px-6 md:px-16 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Back Button Link */}
          <button 
            onClick={() => { router.push("/team"); }}
            className="group flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-black hover:text-[#f26b2c] transition-colors mb-12 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1.5" />
            <span>Back to Crew</span>
          </button>

          {/* MAIN GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* LEFT PROFILE CARD COLUMN */}
            <div className="lg:col-span-5 lg:sticky lg:top-24 flex flex-col items-center gap-6">
              <div className="relative w-full aspect-[4/5] rounded-none overflow-hidden bg-neutral-200 shadow-xl border border-black/10">
                <Image
                  src={member.img}
                  alt={member.name}
                  fill
                  className="object-cover"
                  priority
                  referrerPolicy="no-referrer"
                />
                
                <div className="absolute top-4 right-4 bg-black/75 backdrop-blur-md border border-white/15 px-3 py-1.5 text-[9px] font-mono font-bold tracking-widest text-[#f26b2c] uppercase">
                  ACTIVE CREW MEMBER
                </div>
              </div>

              {/* Dynamic Stats Row */}
              <div className="w-full grid grid-cols-3 gap-px bg-black/10 border border-black/10 text-center select-none">
                {member.stats.map((stat) => (
                  <div key={stat.label} className="bg-[#faf8f4] py-4 px-2">
                    <span className="block text-lg font-black text-black">
                      {stat.value}
                    </span>
                    <span className="block text-[9px] text-neutral-400 font-mono tracking-wider uppercase mt-1">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Identity shuffle button */}
              <div className="w-full">
                <button
                  onClick={handleShuffle}
                  disabled={isShuffling}
                  className="w-full group relative flex h-[52px] items-center justify-center overflow-hidden rounded-none bg-black text-[11px] font-bold tracking-widest uppercase text-white hover:text-white transition-all cursor-pointer border border-transparent disabled:opacity-75"
                >
                  <span className="absolute inset-0 h-full w-full translate-y-full bg-[#f26b2c] transition-transform duration-300 ease-out group-hover:translate-y-0" />
                  
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <Sparkles className={`w-4 h-4 text-[#f26b2c] group-hover:text-white transition-colors ${isShuffling ? "animate-spin" : ""}`} />
                    <span>{isShuffling ? "Generating..." : "Shuffle Identity"}</span>
                  </span>
                </button>
                <p className="text-[10px] text-center text-neutral-400 font-mono mt-2 uppercase tracking-wide">
                  Generate entirely random names and credentials for this member!
                </p>
              </div>

              {/* Social Anchors */}
              <div className="flex items-center gap-6 pt-4">
                <a href="#" onClick={(e) => e.preventDefault()} className="text-black/60 hover:text-[#f26b2c] hover:scale-115 transition-all">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" onClick={(e) => e.preventDefault()} className="text-black/60 hover:text-[#f26b2c] hover:scale-115 transition-all">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" onClick={(e) => e.preventDefault()} className="text-black/60 hover:text-[#f26b2c] hover:scale-115 transition-all">
                  <Globe className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* RIGHT PORTFOLIO BIO COLUMN */}
            <div className="lg:col-span-7 text-left space-y-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-10"
                >
                  {/* Identity Header */}
                  <div className="space-y-3">
                    <span className="inline-block bg-[#f26b2c] text-white text-[10px] font-mono font-bold tracking-[0.2em] px-4 py-1.5 uppercase rounded-none">
                      {member.role}
                    </span>
                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-black leading-tight sm:leading-none tracking-tight uppercase">
                      {member.name}
                    </h1>
                  </div>

                  {/* Highlight Quote */}
                  <div className="border-l-[3px] border-[#f26b2c] pl-6 py-1 italic">
                    <p className="text-lg text-neutral-700 font-medium leading-relaxed">
                      "{member.quote}"
                    </p>
                  </div>

                  {/* Deep Biography */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold tracking-[0.25em] text-neutral-400 uppercase font-mono">
                      Background & Approach
                    </h3>
                    <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-medium">
                      {member.bio}
                    </p>
                  </div>

                  {/* Skills Grid */}
                  <div className="space-y-6">
                    <h3 className="text-xs font-bold tracking-[0.25em] text-neutral-400 uppercase font-mono">
                      Core Expertise
                    </h3>
                    
                    <div className="space-y-4">
                      {member.skills.map((skill) => (
                        <div key={skill.name} className="space-y-2">
                          <div className="flex justify-between items-center text-xs font-bold font-mono uppercase text-black">
                            <span>{skill.name}</span>
                            <span>{skill.percentage}%</span>
                          </div>
                          
                          <div className="w-full h-1.5 bg-black/5 rounded-none overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.percentage}%` }}
                              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                              className="h-full bg-black group-hover:bg-[#f26b2c]"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Individual Portfolio Showcases */}
                  <div className="space-y-6">
                    <h3 className="text-xs font-bold tracking-[0.25em] text-neutral-400 uppercase font-mono">
                      Recent Projects Led
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {member.portfolio.map((proj) => (
                        <div 
                          key={proj.title}
                          className="bg-[#faf8f4] border border-black/5 p-6 rounded-none flex flex-col justify-between min-h-[200px] hover:border-black/20 transition-all duration-300"
                        >
                          <div className="space-y-3">
                            <div className="flex justify-between items-center text-[10px] font-mono tracking-wider text-[#f26b2c] uppercase font-bold">
                              <span>{proj.category}</span>
                              <span className="text-neutral-400">{proj.year}</span>
                            </div>
                            <h4 className="text-lg font-black text-black uppercase tracking-tight">
                              {proj.title}
                            </h4>
                            <p className="text-xs text-neutral-500 leading-relaxed font-medium">
                              {proj.description}
                            </p>
                          </div>

                          <div className="flex items-center gap-1.5 pt-4 text-[9px] font-bold tracking-widest uppercase text-black hover:text-[#f26b2c] cursor-pointer transition-colors">
                            <span>Case Study</span>
                            <svg width="8" height="8" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-2.5 h-2.5">
                              <path d="M1 9L9 1M9 1H2M9 1V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
