const fs = require('fs');
const path = require('path');

const imgPath = '"/newprojects/Aditya Antilia Living Room (1)/0.jpg"';

function patchFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Remove px and pxc from imports
    content = content.replace(/,\s*pxc?\s*/g, ' ');
    content = content.replace(/\{\s*pxc?\s*,/g, '{ ');
    content = content.replace(/\{\s*pxc?\s*\}/g, '{}');

    // Replace px(...) and pxc(...) with imgPath
    content = content.replace(/pxc?\([^\)]+\)/g, imgPath);

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Patched ${filePath}`);
}

patchFile(path.join(__dirname, 'src', 'app', 'about', 'page.tsx'));
patchFile(path.join(__dirname, 'src', 'app', 'contact', 'page.tsx'));
