const fs = require('fs');
const path = require('path');

const pageFile = path.join(__dirname, 'src', 'app', 'page.tsx');
let content = fs.readFileSync(pageFile, 'utf8');

// 1. Remove px from imports
content = content.replace(/, px /, ' ');

// 2. Replace px(...) with PROJECTS[0].poster
content = content.replace(/px\(\d+,\s*\d+\)/g, 'PROJECTS[0].poster');

// 3. Replace video with img in Hero component
content = content.replace(/<video([\s\S]*?)src=\{FILM\.hero\}([\s\S]*?)\/>/g, (match, before, after) => {
    // Keep className
    const classNameMatch = before.match(/className="([^"]+)"/);
    const className = classNameMatch ? classNameMatch[1] : 'hero-video absolute inset-0 h-full w-full object-cover';
    return `<img className="${className}" src={FILM.hero} alt="Hero Image" />`;
});

// Also remove poster={FILM.heroPoster}, autoPlay, muted, loop, playsInline since it's an img now
// The regex above replaced the whole <video ... /> tag.

fs.writeFileSync(pageFile, content, 'utf8');
console.log('page.tsx patched successfully');
