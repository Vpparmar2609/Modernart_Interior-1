
export type Project = {
  slug: string;
  index: string;
  title: string;
  tagline: string;
  cats: string[];
  location: string;
  year: string;
  area: string;
  duration: string;
  scope: string[];
  hero: string;
  poster: string;
  images: { src: string; cap: string; tall?: boolean }[];
  description: string[];
  mood: { name: string; tone: string }[];
  materials: string[];
  furniture: { piece: string; maker: string; room: string }[];
  video?: string;
};

export type Service = {
  n: string;
  slug: string;
  title: string;
  short: string;
  body: string;
  points: string[];
  src: string;
};

export type Step = {
  n: string; title: string; time: string; body: string;
  deliver: string[]; src: string;
};

export type Post = {
  slug: string; cat: string; title: string; date: string; read: string;
  excerpt: string; src: string; body: string[];
};

export const PROJECTS = [
  {
    slug: "aditya-antilia",
    index: "01",
    title: "Aditya Antilia",
    tagline: "A beautiful exploration of aditya antilia",
    cats: ["Residential", "Interior"],
    location: "Mumbai, India",
    year: "2026",
    area: "Various",
    duration: "Various",
    scope: ["Interior Design", "3D Rendering"],
    hero: "/newprojects/Aditya Antilia Living Room (1)/0.jpg",
    poster: "/newprojects/Aditya Antilia Living Room (1)/0.jpg",
    images: [
      { src: "/newprojects/Aditya Antilia Living Room (1)/0.jpg", cap: "Aditya Antilia - View 1" },
      { src: "/newprojects/Aditya Antilia Living Room (1)/1.jpg", cap: "Aditya Antilia - View 2" },
      { src: "/newprojects/Aditya Antilia Living Room (1)/2.jpg", cap: "Aditya Antilia - View 3" },
      { src: "/newprojects/Aditya Antilia Living Room (1)/3.jpg", cap: "Aditya Antilia - View 4" },
      { src: "/newprojects/Aditya Antilia Semi-Master bedroom (1)/0.jpg", cap: "Aditya Antilia - View 5" },
      { src: "/newprojects/Aditya Antilia Semi-Master bedroom (1)/1.jpg", cap: "Aditya Antilia - View 6" },
      { src: "/newprojects/Aditya Antilia Semi-Master bedroom (1)/2.jpg", cap: "Aditya Antilia - View 7" },
      { src: "/newprojects/Aditya Antilia Semi-Master bedroom (1)/3.jpg", cap: "Aditya Antilia - View 8" },
      { src: "/newprojects/Aditya Antilla final 3D/0.jpg", cap: "Aditya Antilia - View 9" },
      { src: "/newprojects/Aditya Antilla final 3D/1.jpg", cap: "Aditya Antilia - View 10" },
      { src: "/newprojects/Aditya Antilla final 3D/10.jpg", cap: "Aditya Antilia - View 11" },
      { src: "/newprojects/Aditya Antilla final 3D/11.jpg", cap: "Aditya Antilia - View 12" },
      { src: "/newprojects/Aditya Antilla final 3D/12.jpg", cap: "Aditya Antilia - View 13" },
      { src: "/newprojects/Aditya Antilla final 3D/13.jpg", cap: "Aditya Antilia - View 14" },
      { src: "/newprojects/Aditya Antilla final 3D/14.jpg", cap: "Aditya Antilia - View 15" },
      { src: "/newprojects/Aditya Antilla final 3D/15.jpg", cap: "Aditya Antilia - View 16" },
      { src: "/newprojects/Aditya Antilla final 3D/16.jpg", cap: "Aditya Antilia - View 17" },
      { src: "/newprojects/Aditya Antilla final 3D/17.jpg", cap: "Aditya Antilia - View 18" },
      { src: "/newprojects/Aditya Antilla final 3D/18.jpg", cap: "Aditya Antilia - View 19" },
      { src: "/newprojects/Aditya Antilla final 3D/19.jpg", cap: "Aditya Antilia - View 20" },
      { src: "/newprojects/Aditya Antilla final 3D/2.jpg", cap: "Aditya Antilia - View 21" },
      { src: "/newprojects/Aditya Antilla final 3D/20.jpg", cap: "Aditya Antilia - View 22" },
      { src: "/newprojects/Aditya Antilla final 3D/21.jpg", cap: "Aditya Antilia - View 23" },
      { src: "/newprojects/Aditya Antilla final 3D/22.jpg", cap: "Aditya Antilia - View 24" },
      { src: "/newprojects/Aditya Antilla final 3D/23.jpg", cap: "Aditya Antilia - View 25" },
      { src: "/newprojects/Aditya Antilla final 3D/24.jpg", cap: "Aditya Antilia - View 26" },
      { src: "/newprojects/Aditya Antilla final 3D/25.jpg", cap: "Aditya Antilia - View 27" },
      { src: "/newprojects/Aditya Antilla final 3D/3.jpg", cap: "Aditya Antilia - View 28" },
      { src: "/newprojects/Aditya Antilla final 3D/4.jpg", cap: "Aditya Antilia - View 29" },
      { src: "/newprojects/Aditya Antilla final 3D/5.jpg", cap: "Aditya Antilia - View 30" },
      { src: "/newprojects/Aditya Antilla final 3D/6.jpg", cap: "Aditya Antilia - View 31" },
      { src: "/newprojects/Aditya Antilla final 3D/7.jpg", cap: "Aditya Antilia - View 32" },
      { src: "/newprojects/Aditya Antilla final 3D/8.jpg", cap: "Aditya Antilia - View 33" },
      { src: "/newprojects/Aditya Antilla final 3D/9.jpg", cap: "Aditya Antilia - View 34" }
    ],
    description: [
      "This project highlights our dedication to creating stunning aditya antilia environments.",
      "Every detail has been carefully crafted to merge aesthetics with function."
    ],
    mood: [
      { name: "Warm", tone: "#d9cdb4" },
      { name: "Elegant", tone: "#8b6a4b" }
    ],
    materials: ["Wood", "Stone", "Fabric"],
    furniture: [
      { piece: "Custom Furniture", maker: "Atelier", room: "Main" }
    ]
  },
  {
    slug: "ananta-sky",
    index: "02",
    title: "Ananta Sky",
    tagline: "A beautiful exploration of ananta sky",
    cats: ["Residential", "Interior"],
    location: "Mumbai, India",
    year: "2026",
    area: "Various",
    duration: "Various",
    scope: ["Interior Design", "3D Rendering"],
    hero: "/newprojects/ANANTA SKY SEMI MASTER (1)/0.jpg",
    poster: "/newprojects/ANANTA SKY SEMI MASTER (1)/0.jpg",
    images: [
      { src: "/newprojects/ANANTA SKY SEMI MASTER (1)/0.jpg", cap: "Ananta Sky - View 1" }
    ],
    description: [
      "This project highlights our dedication to creating stunning ananta sky environments.",
      "Every detail has been carefully crafted to merge aesthetics with function."
    ],
    mood: [
      { name: "Warm", tone: "#d9cdb4" },
      { name: "Elegant", tone: "#8b6a4b" }
    ],
    materials: ["Wood", "Stone", "Fabric"],
    furniture: [
      { piece: "Custom Furniture", maker: "Atelier", room: "Main" }
    ]
  },
  {
    slug: "balcony-designs",
    index: "03",
    title: "The Imperial Balcony",
    tagline: "A beautiful exploration of balcony designs",
    cats: ["Residential", "Interior"],
    location: "Mumbai, India",
    year: "2026",
    area: "Various",
    duration: "Various",
    scope: ["Interior Design", "3D Rendering"],
    hero: "/newprojects/Balcony Renders (1)/0.jpg",
    poster: "/newprojects/Balcony Renders (1)/0.jpg",
    images: [
      { src: "/newprojects/Balcony Renders (1)/0.jpg", cap: "Balcony Designs - View 1" },
      { src: "/newprojects/Balcony Renders (1)/1.jpg", cap: "Balcony Designs - View 2" }
    ],
    description: [
      "This project highlights our dedication to creating stunning balcony designs environments.",
      "Every detail has been carefully crafted to merge aesthetics with function."
    ],
    mood: [
      { name: "Warm", tone: "#d9cdb4" },
      { name: "Elegant", tone: "#8b6a4b" }
    ],
    materials: ["Wood", "Stone", "Fabric"],
    furniture: [
      { piece: "Custom Furniture", maker: "Atelier", room: "Main" }
    ]
  },
  {
    slug: "master-bedroom",
    index: "04",
    title: "Prestige Residency - Master Bedroom",
    tagline: "A beautiful exploration of master bedroom concepts",
    cats: ["Residential", "Interior"],
    location: "Ahmedabad, India",
    year: "2026",
    area: "Various",
    duration: "Various",
    scope: ["Interior Design", "3D Rendering"],
    hero: "/newprojects/BEDROOM  (1)/0.jpg",
    poster: "/newprojects/BEDROOM  (1)/0.jpg",
    images: [
      { src: "/newprojects/BEDROOM  (1)/0.jpg", cap: "Master Bedroom Concepts - View 1" },
      { src: "/newprojects/BEDROOM  (1)/1.jpg", cap: "Master Bedroom Concepts - View 2" },
      { src: "/newprojects/BEDROOM  (1)/2.jpg", cap: "Master Bedroom Concepts - View 3" },
      { src: "/newprojects/Bedroom (1)/0.jpg", cap: "Master Bedroom Concepts - View 4" },
      { src: "/newprojects/Bedroom (1)/1.jpg", cap: "Master Bedroom Concepts - View 5" },
      { src: "/newprojects/Bedroom (1)/2.jpg", cap: "Master Bedroom Concepts - View 6" }
    ],
    description: [
      "This project highlights our dedication to creating stunning master bedroom concepts environments.",
      "Every detail has been carefully crafted to merge aesthetics with function."
    ],
    mood: [
      { name: "Warm", tone: "#d9cdb4" },
      { name: "Elegant", tone: "#8b6a4b" }
    ],
    materials: ["Wood", "Stone", "Fabric"],
    furniture: [
      { piece: "Custom Furniture", maker: "Atelier", room: "Main" }
    ]
  },
  {
    slug: "daughter-room",
    index: "05",
    title: "Lodha Bellissimo - Daughter's Room",
    tagline: "A beautiful exploration of daughter's bedroom",
    cats: ["Residential", "Interior"],
    location: "Surat, India",
    year: "2026",
    area: "Various",
    duration: "Various",
    scope: ["Interior Design", "3D Rendering"],
    hero: "/newprojects/Daughter Bedroom op 2 (1)/0.jpg",
    poster: "/newprojects/Daughter Bedroom op 2 (1)/0.jpg",
    images: [
      { src: "/newprojects/Daughter Bedroom op 2 (1)/0.jpg", cap: "Daughter's Bedroom - View 1" },
      { src: "/newprojects/Daughter Bedroom op 2 (1)/1.jpg", cap: "Daughter's Bedroom - View 2" },
      { src: "/newprojects/DAUGHTER ROOM (1)/0.png", cap: "Daughter's Bedroom - View 3" },
      { src: "/newprojects/DAUGHTER ROOM (1)/1.png", cap: "Daughter's Bedroom - View 4" },
      { src: "/newprojects/DAUGHTER ROOM (1)/2.png", cap: "Daughter's Bedroom - View 5" },
      { src: "/newprojects/DAUGHTER ROOM (1)/3.png", cap: "Daughter's Bedroom - View 6" }
    ],
    description: [
      "This project highlights our dedication to creating stunning daughter's bedroom environments.",
      "Every detail has been carefully crafted to merge aesthetics with function."
    ],
    mood: [
      { name: "Warm", tone: "#d9cdb4" },
      { name: "Elegant", tone: "#8b6a4b" }
    ],
    materials: ["Wood", "Stone", "Fabric"],
    furniture: [
      { piece: "Custom Furniture", maker: "Atelier", room: "Main" }
    ]
  },
  {
    slug: "entrance",
    index: "06",
    title: "Godrej Woods - Grand Entrance",
    tagline: "A beautiful exploration of grand entrance",
    cats: ["Residential", "Interior"],
    location: "Vadodara, India",
    year: "2026",
    area: "Various",
    duration: "Various",
    scope: ["Interior Design", "3D Rendering"],
    hero: "/newprojects/Entrance/0.jpg",
    poster: "/newprojects/Entrance/0.jpg",
    images: [
      { src: "/newprojects/Entrance/0.jpg", cap: "Grand Entrance - View 1" }
    ],
    description: [
      "This project highlights our dedication to creating stunning grand entrance environments.",
      "Every detail has been carefully crafted to merge aesthetics with function."
    ],
    mood: [
      { name: "Warm", tone: "#d9cdb4" },
      { name: "Elegant", tone: "#8b6a4b" }
    ],
    materials: ["Wood", "Stone", "Fabric"],
    furniture: [
      { piece: "Custom Furniture", maker: "Atelier", room: "Main" }
    ]
  },
  {
    slug: "grand-parents-room",
    index: "07",
    title: "Shapoorji Pallonji - Grand Parents Room",
    tagline: "A beautiful exploration of grand parents room",
    cats: ["Residential", "Interior"],
    location: "Gandhinagar, India",
    year: "2026",
    area: "Various",
    duration: "Various",
    scope: ["Interior Design", "3D Rendering"],
    hero: "/newprojects/F.F GRAND PARENTS ROOM/0.png",
    poster: "/newprojects/F.F GRAND PARENTS ROOM/0.png",
    images: [
      { src: "/newprojects/F.F GRAND PARENTS ROOM/0.png", cap: "Grand Parents Room - View 1" },
      { src: "/newprojects/F.F GRAND PARENTS ROOM/1.png", cap: "Grand Parents Room - View 2" },
      { src: "/newprojects/F.F GRAND PARENTS ROOM/2.png", cap: "Grand Parents Room - View 3" },
      { src: "/newprojects/F.F GRAND PARENTS ROOM/3.png", cap: "Grand Parents Room - View 4" },
      { src: "/newprojects/F.F GRAND PARENTS ROOM OP 3/0.png", cap: "Grand Parents Room - View 5" },
      { src: "/newprojects/F.F GRAND PARENTS ROOM OP 3/1.png", cap: "Grand Parents Room - View 6" },
      { src: "/newprojects/F.F GRAND PARENTS ROOM OP 3/2.png", cap: "Grand Parents Room - View 7" },
      { src: "/newprojects/F.F GRAND PARENTS ROOM OP 3/3.png", cap: "Grand Parents Room - View 8" },
      { src: "/newprojects/F.F GRAND PARENTS ROOM op 2/0.jpg", cap: "Grand Parents Room - View 9" },
      { src: "/newprojects/F.F GRAND PARENTS ROOM op 2/1.jpg", cap: "Grand Parents Room - View 10" },
      { src: "/newprojects/F.F GRAND PARENTS ROOM op 2/2.jpg", cap: "Grand Parents Room - View 11" },
      { src: "/newprojects/F.F GRAND PARENTS ROOM op 2/3.jpg", cap: "Grand Parents Room - View 12" },
      { src: "/newprojects/F.F Grand Parents Latest/0.jpg", cap: "Grand Parents Room - View 13" },
      { src: "/newprojects/F.F Grand Parents Latest/1.jpg", cap: "Grand Parents Room - View 14" },
      { src: "/newprojects/F.F Grand Parents Latest/2.jpg", cap: "Grand Parents Room - View 15" },
      { src: "/newprojects/F.F Grand Parents Latest/3.jpg", cap: "Grand Parents Room - View 16" }
    ],
    description: [
      "This project highlights our dedication to creating stunning grand parents room environments.",
      "Every detail has been carefully crafted to merge aesthetics with function."
    ],
    mood: [
      { name: "Warm", tone: "#d9cdb4" },
      { name: "Elegant", tone: "#8b6a4b" }
    ],
    materials: ["Wood", "Stone", "Fabric"],
    furniture: [
      { piece: "Custom Furniture", maker: "Atelier", room: "Main" }
    ]
  },
  {
    slug: "kitchen",
    index: "08",
    title: "Hiranandani Estate - Kitchen",
    tagline: "A beautiful exploration of kitchen variations",
    cats: ["Residential", "Interior"],
    location: "Mumbai, India",
    year: "2026",
    area: "Various",
    duration: "Various",
    scope: ["Interior Design", "3D Rendering"],
    hero: "/newprojects/F.F KITCHEN LATEST CHANGES/0.jpg",
    poster: "/newprojects/F.F KITCHEN LATEST CHANGES/0.jpg",
    images: [
      { src: "/newprojects/F.F KITCHEN LATEST CHANGES/0.jpg", cap: "Kitchen Variations - View 1" },
      { src: "/newprojects/F.F KITCHEN LATEST CHANGES/1.jpg", cap: "Kitchen Variations - View 2" }
    ],
    description: [
      "This project highlights our dedication to creating stunning kitchen variations environments.",
      "Every detail has been carefully crafted to merge aesthetics with function."
    ],
    mood: [
      { name: "Warm", tone: "#d9cdb4" },
      { name: "Elegant", tone: "#8b6a4b" }
    ],
    materials: ["Wood", "Stone", "Fabric"],
    furniture: [
      { piece: "Custom Furniture", maker: "Atelier", room: "Main" }
    ]
  },
  {
    slug: "living-dining",
    index: "09",
    title: "Rustomjee Elements - Living & Dining",
    tagline: "A beautiful exploration of living and dining spaces",
    cats: ["Residential", "Interior"],
    location: "Ahmedabad, India",
    year: "2026",
    area: "Various",
    duration: "Various",
    scope: ["Interior Design", "3D Rendering"],
    hero: "/newprojects/F.F Living, Dining & Kitchen/0.jpg",
    poster: "/newprojects/F.F Living, Dining & Kitchen/0.jpg",
    images: [
      { src: "/newprojects/F.F Living, Dining & Kitchen/0.jpg", cap: "Living and Dining Spaces - View 1" },
      { src: "/newprojects/F.F Living, Dining & Kitchen/1.jpg", cap: "Living and Dining Spaces - View 2" },
      { src: "/newprojects/F.F Living, Dining & Kitchen/2.jpg", cap: "Living and Dining Spaces - View 3" },
      { src: "/newprojects/F.F Living, Dining & Kitchen/3.jpg", cap: "Living and Dining Spaces - View 4" },
      { src: "/newprojects/F.F Living, Dining & Kitchen/4.jpg", cap: "Living and Dining Spaces - View 5" },
      { src: "/newprojects/F.F Living, Dining & Kitchen/5.jpg", cap: "Living and Dining Spaces - View 6" },
      { src: "/newprojects/F.F Living, Dining & Kitchen/6.jpg", cap: "Living and Dining Spaces - View 7" },
      { src: "/newprojects/F.F Living, Dining & Kitchen 1.1/0.jpg", cap: "Living and Dining Spaces - View 8" },
      { src: "/newprojects/F.F Living, Dining & Kitchen 1.1/1.jpg", cap: "Living and Dining Spaces - View 9" },
      { src: "/newprojects/F.F Living, Dining & Kitchen 1.1/2.jpg", cap: "Living and Dining Spaces - View 10" },
      { src: "/newprojects/F.F Living, Dining & Kitchen 1.1/3.jpg", cap: "Living and Dining Spaces - View 11" },
      { src: "/newprojects/F.F Living, Dining & Kitchen 1.1/4.jpg", cap: "Living and Dining Spaces - View 12" },
      { src: "/newprojects/F.F Living, Dining & Kitchen 1.1/5.jpg", cap: "Living and Dining Spaces - View 13" }
    ],
    description: [
      "This project highlights our dedication to creating stunning living and dining spaces environments.",
      "Every detail has been carefully crafted to merge aesthetics with function."
    ],
    mood: [
      { name: "Warm", tone: "#d9cdb4" },
      { name: "Elegant", tone: "#8b6a4b" }
    ],
    materials: ["Wood", "Stone", "Fabric"],
    furniture: [
      { piece: "Custom Furniture", maker: "Atelier", room: "Main" }
    ]
  }
];

export const CATEGORIES = [
  "All",
  "Residential",
  "Commercial",
  "Villa",
  "Apartment",
  "Kitchen",
  "Office",
];

export const SERVICES = [
  {
    n: "01", slug: "residential", title: "Residential Interiors",
    short: "Homes composed around your rituals",
    body: "Full-scope interior architecture for apartments, penthouses and family homes.",
    points: ["Space planning & flow", "Lighting design", "Custom joinery", "Furniture & art curation"],
    src: "/newprojects/Aditya Antilia Living Room (1)/0.jpg",
  },
  {
    n: "02", slug: "commercial", title: "Commercial & Retail",
    short: "Spaces that behave like the brand",
    body: "Flagships, galleries, restaurants and lobbies where the interior is the brand's quietest, strongest voice.",
    points: ["Concept & narrative", "Circulation choreography", "Durable materiality", "Brand integration"],
    src: "/newprojects/Aditya Antilia Living Room (1)/1.jpg",
  },
  {
    n: "03", slug: "villas", title: "Luxury Villas",
    short: "Houses in dialogue with their land",
    body: "From hillside to shoreline, villa commissions begin with orientation, wind and view.",
    points: ["Site & orientation study", "Indoor–outdoor rooms", "Landscape interface", "Turnkey delivery"],
    src: "/newprojects/Aditya Antilia Living Room (1)/2.jpg",
  },
  {
    n: "04", slug: "turnkey", title: "Turnkey Projects",
    short: "One contract, one calm delivery",
    body: "A single accountable line from survey to styling day.",
    points: ["Budget governance", "Trade management", "Procurement & logistics", "Installation week"],
    src: "/newprojects/Aditya Antilia Living Room (1)/3.jpg",
  },
  {
    n: "05", slug: "apartments", title: "Apartment Renovation",
    short: "More metres than you own",
    body: "Renovation as a subtractive art: remove partitions, return joinery, double the light.",
    points: ["Heritage sensitivity", "Structural editing", "Services renewal", "Acoustic upgrades"],
    src: "/newprojects/Aditya Antilia Semi-Master bedroom (1)/0.jpg",
  },
  {
    n: "06", slug: "kitchen-bath", title: "Kitchen & Bath",
    short: "The working rooms, perfected",
    body: "The two hardest-working rooms in any house, detailed to the millimetre.",
    points: ["Ergonomic planning", "Stone selection", "Custom cabinetry", "Water & steam rooms"],
    src: "/newprojects/Aditya Antilia Semi-Master bedroom (1)/1.jpg",
  },
  {
    n: "07", slug: "furniture", title: "Furniture & Styling",
    short: "The last five percent, which is everything",
    body: "Furniture curation, custom pieces from our atelier, art placement and the final styling pass.",
    points: ["FF&E specification", "Custom pieces", "Art consultancy", "Final styling"],
    src: "/newprojects/Aditya Antilia Semi-Master bedroom (1)/2.jpg",
  },
  {
    n: "08", slug: "planning", title: "Space Planning",
    short: "Geometry before decoration",
    body: "Standalone planning studies for clients and architects.",
    points: ["Flow analysis", "Furniture footprints", "Storage audits", "Test fits"],
    src: "/newprojects/Aditya Antilia Semi-Master bedroom (1)/3.jpg",
  },
];

export const STEPS = [
  {
    n: "01", title: "Consultation", time: "Week 0–1",
    body: "A long conversation before any drawing.",
    deliver: ["Site visit & survey", "Lifestyle questionnaire", "Feasibility note", "Fee proposal"],
    src: "/newprojects/Aditya Antilla final 3D/0.jpg",
  },
  {
    n: "02", title: "Concept", time: "Week 2–5",
    body: "Narrative first, floor plan second.",
    deliver: ["Narrative boards", "Reference films", "Palette & mood", "First spatial sketch"],
    src: "/newprojects/Aditya Antilla final 3D/1.jpg",
  },
  {
    n: "03", title: "Planning", time: "Week 6–10",
    body: "The concept becomes geometry.",
    deliver: ["Layout options", "3D visualisation", "Lighting scheme", "Budget framework"],
    src: "/newprojects/Aditya Antilla final 3D/10.jpg",
  },
  {
    n: "04", title: "Material Selection", time: "Week 10–12",
    body: "Stones are chosen at the quarry yard, woods at the veneer house, linens by hand.",
    deliver: ["Material library", "Sample boards", "Costed FF&E schedule", "Supplier shortlist"],
    src: "/newprojects/Aditya Antilla final 3D/11.jpg",
  },
  {
    n: "05", title: "Execution", time: "Month 3–8",
    body: "Site supervision with a weekly photographic record.",
    deliver: ["Weekly site reports", "Shop drawings", "Quality control", "Trade coordination"],
    src: "/newprojects/Aditya Antilla final 3D/12.jpg",
  },
  {
    n: "06", title: "Styling", time: "Month 9",
    body: "Installation week is choreography: freight, furniture, art, flowers, scent.",
    deliver: ["Furniture installation", "Art hanging", "Textiles & objects", "Reveal day"],
    src: "/newprojects/Aditya Antilla final 3D/13.jpg",
  },
  {
    n: "07", title: "Delivery", time: "Beyond",
    body: "A bound house manual, a care ritual for every material, and our number for life.",
    deliver: ["House manual", "Material care guide", "Snagging programme", "Anniversary visit"],
    src: "/newprojects/Aditya Antilla final 3D/14.jpg",
  },
];

export const TESTIMONIALS = [
  {
    quote: "They removed half the walls and somehow doubled the light.",
    name: "Ramesh Patel",
    role: "Penthouse, Ahmedabad",
    src: "/newprojects/Aditya Antilla final 3D/15.jpg",
  },
  {
    quote: "Working across three time zones, I expected friction. There was none.",
    name: "Priya Sharma",
    role: "Villa, Vadodara",
    src: "/newprojects/Aditya Antilla final 3D/16.jpg",
  },
  {
    quote: "Our flagship doubled its dwell time in the first quarter.",
    name: "Vikram Desai",
    role: "Commercial Space, Surat",
    src: "/newprojects/Aditya Antilla final 3D/17.jpg",
  },
];

export const POSTS = [
  {
    slug: "case-for-silence", cat: "Essay", title: "The Case for Silence in Design",
    date: "Jan 2026", read: "6 min",
    excerpt: "The most expensive thing a room can hold is nothing.",
    src: "/newprojects/Aditya Antilla final 3D/18.jpg",
    body: ["Silence in design is not emptiness."],
  },
  {
    slug: "materials-that-age", cat: "Materials", title: "Materials That Age Gracefully",
    date: "Dec 2025", read: "8 min",
    excerpt: "A guide to surfaces that improve with use.",
    src: "/newprojects/Aditya Antilla final 3D/19.jpg",
    body: ["Every specification begins with a question."],
  },
  {
    slug: "lighting-without-downlights", cat: "Guide", title: "How We Light a Room",
    date: "Nov 2025", read: "7 min",
    excerpt: "Walls wash, lamps pool, ceilings glow.",
    src: "/newprojects/Aditya Antilla final 3D/2.jpg",
    body: ["The ceiling grid of downlights is the fastest way to make a room look like an airport lounge."],
  },
];

export const TEAM = [
  { name: "Sofia Amaral", role: "Founder · Creative Director", src: "/newprojects/Aditya Antilla final 3D/20.jpg" },
  { name: "M. Ilves", role: "Design Principal", src: "/newprojects/Aditya Antilla final 3D/21.jpg" },
  { name: "A. Kovač", role: "Material Research", src: "/newprojects/Aditya Antilla final 3D/22.jpg" },
  { name: "D. Rêgo", role: "Technical Director", src: "/newprojects/Aditya Antilla final 3D/23.jpg" },
];

export const TIMELINE = [
  { y: "2008", t: "A two-desk studio", d: "Founded in Lisbon." },
  { y: "2026", t: "Quiet Rooms", d: "Eighteen years of work." },
];

export const AWARDS = [
  { t: "Architizer A+ Award", s: "Residential Interior", y: "2025" },
  { t: "FRAME Awards", s: "House of the Year", y: "2023" },
];

export const PRESS = ["ELLE DECOR", "VOGUE LIVING", "WALLPAPER*"];

export const INSTAGRAM = [
  "/newprojects/Aditya Antilla final 3D/24.jpg", "/newprojects/Aditya Antilla final 3D/25.jpg", "/newprojects/Aditya Antilla final 3D/3.jpg", "/newprojects/Aditya Antilla final 3D/4.jpg",
  "/newprojects/Aditya Antilla final 3D/5.jpg", "/newprojects/Aditya Antilla final 3D/6.jpg", "/newprojects/Aditya Antilla final 3D/7.jpg", "/newprojects/Aditya Antilla final 3D/8.jpg"
];

export const FAQS = [
  { q: "What does a full interior project cost?", a: "Depends on scope." },
];

export const OFFICE = {
  address: "Experience Center, Ozone Solitaire, 209, Science City Rd, opp. Hetarth Party Plot, Sola, Ahmedabad, Gujarat 380060.",
  branches: "Ahmedabad, Vadodara, Surat, Mumbai, Gandhinagar.",
  email: "reachmodernartinterior@gmail.com",
  phone: "+351 210 347 882",
  phoneLink: "+351210347882",
  whatsapp: "https://wa.me/919274516100",
  instagram: "https://www.instagram.com/modernart_interior",
  hours: "Mon–Fri",
  mapEmbed: "https://maps.google.com/maps?q=Lisboa&t=&z=16&ie=UTF8&iwloc=&output=embed",
};

export const FILM = {
  hero: "/newprojects/Aditya Antilia Living Room (1)/0.jpg",
  heroPoster: "/newprojects/Aditya Antilia Living Room (1)/0.jpg"
};
