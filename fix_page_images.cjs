const fs = require('fs');
const path = require('path');

const contentFile = path.join(__dirname, 'src', 'data', 'content.ts');
let content = fs.readFileSync(contentFile, 'utf8');

// The directories in public/projects/ are:
// 19.19
// ANANTA SKY SEMI MASTER
// Aditya Antilia Living Room
// Aditya Antilia Semi-Master bedroom
// Aditya Antilla final 3D
// BEDROOM (2)
// Balcony Renders
// Bedroom
// DAUGHTER ROOM
// Daughter Bedroom op 2

// Mapping slugs to folders:
const slugToFolders = {
  "aditya-antilia": ["Aditya Antilia Living Room", "Aditya Antilla final 3D"],
  "ananta-sky": ["ANANTA SKY SEMI MASTER"],
  "19.19": ["19.19"],
  "daughter-room": ["DAUGHTER ROOM"],
  "balcony": ["Balcony Renders"],
  "bedroom": ["Bedroom", "BEDROOM (2)"],
  "semi-master": ["Aditya Antilia Semi-Master bedroom"],
  "daughter-op-2": ["Daughter Bedroom op 2"]
};

// We will parse the content.ts by replacing the `images: [...]` arrays for each project.
// We'll use a regex to match each object in PROJECTS and replace it.

const projectsDir = path.join(__dirname, 'public', 'projects');

// Read all jpgs
function getImagesForFolders(folders) {
  let images = [];
  for (const folder of folders) {
    const dir = path.join(projectsDir, folder);
    if (fs.existsSync(dir)) {
      const files = fs.readdirSync(dir).filter(f => f.endsWith('.jpg') || f.endsWith('.png'));
      images.push(...files.map(f => `/projects/${folder.replace(/ /g, '%20')}/${f}`));
    }
  }
  return images;
}

let modified = false;

// We can replace the block by matching the slug
for (const [slug, folders] of Object.entries(slugToFolders)) {
  const images = getImagesForFolders(folders);
  if (images.length === 0) continue;

  console.log(`Processing slug: ${slug} with ${images.length} images`);

  // Regex to find the project block
  const slugRegex = new RegExp(`slug: "${slug}",([\\s\\S]*?)images: \\[([\\s\\S]*?)\\],`, 'g');
  
  content = content.replace(slugRegex, (match, prefix, oldImages) => {
    modified = true;
    
    // Construct new images array
    const newImages = images.map((src, i) => `{ src: "${src}", cap: "Gallery View ${i + 1}" }`).join(',\n      ');
    
    // We should also replace the hero and poster if they exist!
    let newPrefix = prefix;
    newPrefix = newPrefix.replace(/hero: ".*"/, `hero: "${images[0]}"`);
    newPrefix = newPrefix.replace(/poster: ".*"/, `poster: "${images[0]}"`);
    
    return `slug: "${slug}",${newPrefix}images: [\n      ${newImages}\n    ],`;
  });
}

if (modified) {
  fs.writeFileSync(contentFile, content, 'utf8');
  console.log('Updated content.ts with new images!');
} else {
  console.log('No modifications made to content.ts');
}
