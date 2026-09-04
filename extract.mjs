import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';
import { PNG } from 'pngjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function extractImages() {
  const publicDir = path.join(__dirname, 'public');
  const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.pdf'));

  for (const file of files) {
    console.log(`Processing ${file}...`);
    const data = new Uint8Array(fs.readFileSync(path.join(publicDir, file)));
    const doc = await pdfjsLib.getDocument({ data }).promise;

    for (let pageNum = 1; pageNum <= doc.numPages; pageNum++) {
      const page = await doc.getPage(pageNum);
      const ops = await page.getOperatorList();

      let imgIndex = 0;
      for (let i = 0; i < ops.fnArray.length; i++) {
        if (ops.fnArray[i] === pdfjsLib.OPS.paintImageXObject || ops.fnArray[i] === pdfjsLib.OPS.paintJpegXObject) {
          const imgName = ops.argsArray[i][0];
          try {
            const img = await page.objs.get(imgName);
            if (img && img.data && img.width && img.height) {
              if (img.width < 200 || img.height < 200) continue;

              const baseName = file.replace('.pdf', '').replace(/\s+/g, '-').toLowerCase();
              const imgPath = path.join(publicDir, 'projects', `${baseName}_${pageNum}_${imgIndex}.png`);
              
              const png = new PNG({ width: img.width, height: img.height });
              
              const dataLen = img.data.length;
              const expectedRGB = img.width * img.height * 3;
              const expectedRGBA = img.width * img.height * 4;
              
              if (dataLen === expectedRGB) {
                for (let y = 0; y < img.height; y++) {
                  for (let x = 0; x < img.width; x++) {
                    const idx = (img.width * y + x) * 3;
                    const pngIdx = (img.width * y + x) * 4;
                    png.data[pngIdx] = img.data[idx];
                    png.data[pngIdx + 1] = img.data[idx + 1];
                    png.data[pngIdx + 2] = img.data[idx + 2];
                    png.data[pngIdx + 3] = 255;
                  }
                }
              } else if (dataLen === expectedRGBA) {
                png.data = Buffer.from(img.data);
              } else {
                continue;
              }

              png.pack().pipe(fs.createWriteStream(imgPath));
              console.log(`Saved ${imgPath}`);
              imgIndex++;
            }
          } catch (e) {
            console.log(`Error on ${file} page ${pageNum}: ${e.message}`);
          }
        }
      }
    }
  }
}

extractImages().catch(console.error);
