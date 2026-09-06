const fs = require('fs');
const path = require('path');

function walk(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const stat = fs.statSync(path.join(dir, file));
    if (stat.isDirectory()) {
      walk(path.join(dir, file), fileList);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      fileList.push(path.join(dir, file));
    }
  }
  return fileList;
}

const files = walk(path.join(__dirname, 'src'));

const replacements = [
  // Typography
  { from: /text-\[10px\]/g, to: 'text-xs' },
  { from: /text-\[11px\]/g, to: 'text-sm' },
  { from: /\btext-xs\b/g, to: 'text-sm' }, // wait, text-xs might get double replaced!
  // I should do this carefully.
];

const carefulReplacements = {
  'text-[10px]': 'text-sm',
  'text-[11px]': 'text-base',
  'text-xs': 'text-base',
  'text-sm': 'text-lg',
  'text-[15.5px]': 'text-xl',
  'text-[clamp(2.8rem,8.5vw,8.5rem)]': 'text-[clamp(3.5rem,10vw,10rem)]',
  'text-[clamp(3rem,9vw,9rem)]': 'text-[clamp(4rem,11vw,11rem)]',
  'text-[clamp(3rem,11vw,11rem)]': 'text-[clamp(4rem,13vw,13rem)]',
  
  // Spacing (reduce)
  'py-32': 'py-16',
  'py-28': 'py-16',
  'py-24': 'py-12',
  'py-20': 'py-10',
  'mt-32': 'mt-16',
  'mt-28': 'mt-16',
  'mt-24': 'mt-12',
  'mt-20': 'mt-10',
  'gap-16': 'gap-8',
  'gap-14': 'gap-8',
  'gap-10': 'gap-6',
  'gap-8': 'gap-4',
  'px-[5vw]': 'px-[3vw]', // Less empty space on sides
};

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  
  // Create a regex that matches exactly these words (with \b except for classes with brackets)
  for (const [from, to] of Object.entries(carefulReplacements)) {
    // Escape brackets
    const escapedFrom = from.replace(/\[/g, '\\[').replace(/\]/g, '\\]').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
    // If it ends with a letter/number, use word boundary
    const boundary = from.match(/[a-zA-Z0-9]$/) ? '\\b' : '';
    const regex = new RegExp(escapedFrom + boundary, 'g');
    
    // We only replace if we haven't already replaced it to avoid cascading e.g. text-xs -> text-sm -> text-lg
    // Wait, since we are doing it sequentially, we WILL cascade!
    // Let's use a single pass replace!
  }
}

// Single pass replace implementation
for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  
  // Build a regex that matches any of the keys
  const keys = Object.keys(carefulReplacements).map(k => {
    return k.replace(/\[/g, '\\[').replace(/\]/g, '\\]').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
  });
  
  // Sort by length descending to match longest first (e.g. text-[clamp...])
  keys.sort((a, b) => b.length - a.length);
  
  const regex = new RegExp('(' + keys.join('|') + ')\\b', 'g');
  
  // Note: \b doesn't work well after ']' because ']' is not a word character.
  // Better regex: match the exact class string but ensure it is surrounded by whitespace, quotes, or backticks.
  const betterRegex = new RegExp(`(?<=['"\\s\`])(${keys.join('|')})(?=['"\\s\`]|$)`, 'g');
  
  const newContent = content.replace(betterRegex, (match) => {
    return carefulReplacements[match];
  });
  
  if (newContent !== content) {
    fs.writeFileSync(file, newContent);
    console.log(`Updated ${path.basename(file)}`);
  }
}
