const fs = require('fs');
const path = require('path');

const types = `
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
`;

const file = path.join(__dirname, 'src', 'data', 'content.ts');
const content = fs.readFileSync(file, 'utf8');

if (!content.includes('export type Project = {')) {
  fs.writeFileSync(file, types + '\\n' + content, 'utf8');
  console.log('Types added to content.ts');
} else {
  console.log('Types already exist in content.ts');
}
