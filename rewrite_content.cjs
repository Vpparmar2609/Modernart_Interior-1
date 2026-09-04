const fs = require('fs');
const path = require('path');

// Read the new projects directory
const newProjectsDir = path.join(__dirname, 'public', 'newprojects');
const projectFolders = fs.readdirSync(newProjectsDir);

let imagesByProject = {};
projectFolders.forEach(folder => {
  const folderPath = path.join(newProjectsDir, folder);
  if (fs.statSync(folderPath).isDirectory()) {
    const files = fs.readdirSync(folderPath).filter(f => f.match(/\.(jpg|jpeg|png)$/i));
    imagesByProject[folder] = files.map(f => `/newprojects/${folder}/${f}`);
  }
});

// Group related folders
const groupedProjects = {
  "Aditya Antilia": {
    slug: "aditya-antilia",
    title: "Aditya Antilia",
    location: "Mumbai, India",
    images: [
      ...(imagesByProject["Aditya Antilia Living Room (1)"] || []),
      ...(imagesByProject["Aditya Antilia Semi-Master bedroom (1)"] || []),
      ...(imagesByProject["Aditya Antilla final 3D"] || [])
    ]
  },
  "Ananta Sky": {
    slug: "ananta-sky",
    title: "Ananta Sky",
    location: "Mumbai, India",
    images: imagesByProject["ANANTA SKY SEMI MASTER (1)"] || []
  },
  "Balcony Designs": {
    slug: "balcony-designs",
    title: "Balcony Designs",
    location: "Various",
    images: imagesByProject["Balcony Renders (1)"] || []
  },
  "Master Bedroom": {
    slug: "master-bedroom",
    title: "Master Bedroom Concepts",
    location: "Various",
    images: [
      ...(imagesByProject["BEDROOM  (1)"] || []),
      ...(imagesByProject["Bedroom (1)"] || [])
    ]
  },
  "Daughter Room": {
    slug: "daughter-room",
    title: "Daughter's Bedroom",
    location: "Various",
    images: [
      ...(imagesByProject["Daughter Bedroom op 2 (1)"] || []),
      ...(imagesByProject["DAUGHTER ROOM (1)"] || [])
    ]
  },
  "Entrance": {
    slug: "entrance",
    title: "Grand Entrance",
    location: "Various",
    images: imagesByProject["Entrance"] || []
  },
  "Grand Parents Room": {
    slug: "grand-parents-room",
    title: "Grand Parents Room",
    location: "Various",
    images: [
      ...(imagesByProject["F.F GRAND PARENTS ROOM"] || []),
      ...(imagesByProject["F.F GRAND PARENTS ROOM OP 3"] || []),
      ...(imagesByProject["F.F GRAND PARENTS ROOM op 2"] || []),
      ...(imagesByProject["F.F Grand Parents Latest"] || [])
    ]
  },
  "Kitchen": {
    slug: "kitchen",
    title: "Kitchen Variations",
    location: "Various",
    images: imagesByProject["F.F KITCHEN LATEST CHANGES"] || []
  },
  "Living & Dining": {
    slug: "living-dining",
    title: "Living and Dining Spaces",
    location: "Various",
    images: [
      ...(imagesByProject["F.F Living, Dining & Kitchen"] || []),
      ...(imagesByProject["F.F Living, Dining & Kitchen 1.1"] || [])
    ]
  }
};

let projectItems = [];
let index = 1;
for (const [key, p] of Object.entries(groupedProjects)) {
  if (p.images.length === 0) continue;
  const iStr = index.toString().padStart(2, '0');
  
  const heroImg = p.images[0];
  const imagesArray = p.images.map((img, i) => `{ src: "${img}", cap: "${p.title} - View ${i+1}" }`).join(',\n      ');
  
  projectItems.push(`  {
    slug: "${p.slug}",
    index: "${iStr}",
    title: "${p.title}",
    tagline: "A beautiful exploration of ${p.title.toLowerCase()}",
    cats: ["Residential", "Interior"],
    location: "${p.location}",
    year: "2026",
    area: "Various",
    duration: "Various",
    scope: ["Interior Design", "3D Rendering"],
    hero: "${heroImg}",
    poster: "${heroImg}",
    images: [
      ${imagesArray}
    ],
    description: [
      "This project highlights our dedication to creating stunning ${p.title.toLowerCase()} environments.",
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
  }`);
  index++;
}

// Extract some generic images for other sections
const allImages = Object.values(groupedProjects).flatMap(p => p.images);
const getImg = (i) => allImages[i % allImages.length];

const newContent = `
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
${projectItems.join(',\n')}
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
    src: "${getImg(0)}",
  },
  {
    n: "02", slug: "commercial", title: "Commercial & Retail",
    short: "Spaces that behave like the brand",
    body: "Flagships, galleries, restaurants and lobbies where the interior is the brand's quietest, strongest voice.",
    points: ["Concept & narrative", "Circulation choreography", "Durable materiality", "Brand integration"],
    src: "${getImg(1)}",
  },
  {
    n: "03", slug: "villas", title: "Luxury Villas",
    short: "Houses in dialogue with their land",
    body: "From hillside to shoreline, villa commissions begin with orientation, wind and view.",
    points: ["Site & orientation study", "Indoor–outdoor rooms", "Landscape interface", "Turnkey delivery"],
    src: "${getImg(2)}",
  },
  {
    n: "04", slug: "turnkey", title: "Turnkey Projects",
    short: "One contract, one calm delivery",
    body: "A single accountable line from survey to styling day.",
    points: ["Budget governance", "Trade management", "Procurement & logistics", "Installation week"],
    src: "${getImg(3)}",
  },
  {
    n: "05", slug: "apartments", title: "Apartment Renovation",
    short: "More metres than you own",
    body: "Renovation as a subtractive art: remove partitions, return joinery, double the light.",
    points: ["Heritage sensitivity", "Structural editing", "Services renewal", "Acoustic upgrades"],
    src: "${getImg(4)}",
  },
  {
    n: "06", slug: "kitchen-bath", title: "Kitchen & Bath",
    short: "The working rooms, perfected",
    body: "The two hardest-working rooms in any house, detailed to the millimetre.",
    points: ["Ergonomic planning", "Stone selection", "Custom cabinetry", "Water & steam rooms"],
    src: "${getImg(5)}",
  },
  {
    n: "07", slug: "furniture", title: "Furniture & Styling",
    short: "The last five percent, which is everything",
    body: "Furniture curation, custom pieces from our atelier, art placement and the final styling pass.",
    points: ["FF&E specification", "Custom pieces", "Art consultancy", "Final styling"],
    src: "${getImg(6)}",
  },
  {
    n: "08", slug: "planning", title: "Space Planning",
    short: "Geometry before decoration",
    body: "Standalone planning studies for clients and architects.",
    points: ["Flow analysis", "Furniture footprints", "Storage audits", "Test fits"],
    src: "${getImg(7)}",
  },
];

export const STEPS = [
  {
    n: "01", title: "Consultation", time: "Week 0–1",
    body: "A long conversation before any drawing.",
    deliver: ["Site visit & survey", "Lifestyle questionnaire", "Feasibility note", "Fee proposal"],
    src: "${getImg(8)}",
  },
  {
    n: "02", title: "Concept", time: "Week 2–5",
    body: "Narrative first, floor plan second.",
    deliver: ["Narrative boards", "Reference films", "Palette & mood", "First spatial sketch"],
    src: "${getImg(9)}",
  },
  {
    n: "03", title: "Planning", time: "Week 6–10",
    body: "The concept becomes geometry.",
    deliver: ["Layout options", "3D visualisation", "Lighting scheme", "Budget framework"],
    src: "${getImg(10)}",
  },
  {
    n: "04", title: "Material Selection", time: "Week 10–12",
    body: "Stones are chosen at the quarry yard, woods at the veneer house, linens by hand.",
    deliver: ["Material library", "Sample boards", "Costed FF&E schedule", "Supplier shortlist"],
    src: "${getImg(11)}",
  },
  {
    n: "05", title: "Execution", time: "Month 3–8",
    body: "Site supervision with a weekly photographic record.",
    deliver: ["Weekly site reports", "Shop drawings", "Quality control", "Trade coordination"],
    src: "${getImg(12)}",
  },
  {
    n: "06", title: "Styling", time: "Month 9",
    body: "Installation week is choreography: freight, furniture, art, flowers, scent.",
    deliver: ["Furniture installation", "Art hanging", "Textiles & objects", "Reveal day"],
    src: "${getImg(13)}",
  },
  {
    n: "07", title: "Delivery", time: "Beyond",
    body: "A bound house manual, a care ritual for every material, and our number for life.",
    deliver: ["House manual", "Material care guide", "Snagging programme", "Anniversary visit"],
    src: "${getImg(14)}",
  },
];

export const TESTIMONIALS = [
  {
    quote: "They removed half the walls and somehow doubled the light.",
    name: "Isabel & Rui Fonseca",
    role: "Penthouse, Chiado",
    src: "${getImg(15)}",
  },
  {
    quote: "Working across three time zones, I expected friction. There was none.",
    name: "Adaeze Okonkwo",
    role: "Villa, Comporta",
    src: "${getImg(16)}",
  },
  {
    quote: "Our Milan flagship doubled its dwell time in the first quarter.",
    name: "Elena Marchetti",
    role: "Creative Director, Bruma",
    src: "${getImg(17)}",
  },
];

export const POSTS = [
  {
    slug: "case-for-silence", cat: "Essay", title: "The Case for Silence in Design",
    date: "Jan 2026", read: "6 min",
    excerpt: "The most expensive thing a room can hold is nothing.",
    src: "${getImg(18)}",
    body: ["Silence in design is not emptiness."],
  },
  {
    slug: "materials-that-age", cat: "Materials", title: "Materials That Age Gracefully",
    date: "Dec 2025", read: "8 min",
    excerpt: "A guide to surfaces that improve with use.",
    src: "${getImg(19)}",
    body: ["Every specification begins with a question."],
  },
  {
    slug: "lighting-without-downlights", cat: "Guide", title: "How We Light a Room",
    date: "Nov 2025", read: "7 min",
    excerpt: "Walls wash, lamps pool, ceilings glow.",
    src: "${getImg(20)}",
    body: ["The ceiling grid of downlights is the fastest way to make a room look like an airport lounge."],
  },
];

export const TEAM = [
  { name: "Sofia Amaral", role: "Founder · Creative Director", src: "${getImg(21)}" },
  { name: "M. Ilves", role: "Design Principal", src: "${getImg(22)}" },
  { name: "A. Kovač", role: "Material Research", src: "${getImg(23)}" },
  { name: "D. Rêgo", role: "Technical Director", src: "${getImg(24)}" },
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
  "${getImg(25)}", "${getImg(26)}", "${getImg(27)}", "${getImg(28)}",
  "${getImg(29)}", "${getImg(30)}", "${getImg(31)}", "${getImg(32)}"
];

export const FAQS = [
  { q: "What does a full interior project cost?", a: "Depends on scope." },
];

export const OFFICE = {
  address: "Rua das Flores 122 · Lisboa, Portugal",
  email: "reachmodernartinterior@gmail.com",
  phone: "+351 210 347 882",
  phoneLink: "+351210347882",
  whatsapp: "https://wa.me/919274516100",
  instagram: "https://instagram.com/modernart.interior",
  hours: "Mon–Fri",
  mapEmbed: "https://maps.google.com/maps?q=Lisboa&t=&z=16&ie=UTF8&iwloc=&output=embed",
};

export const FILM = {
  hero: "${getImg(0)}",
  heroPoster: "${getImg(0)}"
};
`;

fs.writeFileSync(path.join(__dirname, 'src', 'data', 'content.ts'), newContent);
console.log('content.ts updated with new projects!');
