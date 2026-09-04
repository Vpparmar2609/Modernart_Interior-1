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

const replacements = {
  // Explicit hardcoded sizes that were unaffected by global scaling
  'text-[13px]': 'text-lg',
  'text-[14px]': 'text-lg',
  'text-[15px]': 'text-xl',
  'text-[15.5px]': 'text-xl',
  'text-[16px]': 'text-xl',
  'text-xs': 'text-base',
  'text-sm': 'text-lg', // Re-apply in case it was missed inside some strings
};

let changes = 0;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // We will iterate through all keys and do a global replacement carefully
  // Because text-sm might overlap with text-small or whatever, we use regex that respects boundaries or quotes/spaces.
  
  for (const [from, to] of Object.entries(replacements)) {
    // Match the exact class string but ensure it is surrounded by whitespace, quotes, backticks, or end of string.
    // Also we must match exactly `text-sm`, so we can just use `(?<=['"\s`])text-sm(?=['"\s`]|$)`
    const escapedFrom = from.replace(/\[/g, '\\[').replace(/\]/g, '\\]').replace(/\./g, '\\.');
    const regex = new RegExp(`(?<=['"\\s\`:])${escapedFrom}(?=['"\\s\`]|$)`, 'g');
    
    content = content.replace(regex, to);
  }

  if (content !== original) {
    fs.writeFileSync(file, content);
    console.log(`Updated ${path.basename(file)}`);
    changes++;
  }
}

console.log(`Done! Updated ${changes} files.`);
