import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';
import { createCanvas } from '@napi-rs/canvas';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Polyfill NodeCanvasFactory for pdfjs
class NodeCanvasFactory {
  create(width, height) {
    const canvas = createCanvas(width, height);
    const context = canvas.getContext('2d');
    return { canvas, context };
  }
  reset(canvasAndContext, width, height) {
    canvasAndContext.canvas.width = width;
    canvasAndContext.canvas.height = height;
  }
  destroy(canvasAndContext) {
    canvasAndContext.canvas.width = 0;
    canvasAndContext.canvas.height = 0;
    canvasAndContext.canvas = null;
    canvasAndContext.context = null;
  }
}

async function renderPdfs() {
  const publicDir = path.join(__dirname, 'public');
  const outDir = path.join(publicDir, 'projects');
  
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.pdf'));

  for (const file of files) {
    console.log(`Rendering ${file}...`);
    try {
      const data = new Uint8Array(fs.readFileSync(path.join(publicDir, file)));
      const doc = await pdfjsLib.getDocument({ data }).promise;

      // Render only the first page to save time
      const pagesToRender = 1;

      for (let pageNum = 1; pageNum <= pagesToRender; pageNum++) {
        const page = await doc.getPage(pageNum);
        const viewport = page.getViewport({ scale: 1.5 }); // Medium-high res

        const canvasFactory = new NodeCanvasFactory();
        const canvasAndContext = canvasFactory.create(viewport.width, viewport.height);

        const renderContext = {
          canvasContext: canvasAndContext.context,
          viewport: viewport,
          canvasFactory: canvasFactory,
        };

        await page.render(renderContext).promise;

        const baseName = file.replace('.pdf', '').replace(/\s+/g, '-').toLowerCase();
        const imgPath = path.join(outDir, `${baseName}_p${pageNum}.png`);
        
        const buffer = canvasAndContext.canvas.toBuffer('image/png');
        fs.writeFileSync(imgPath, buffer);
        console.log(`Saved rendered image ${imgPath}`);
        
        canvasFactory.destroy(canvasAndContext);
      }
    } catch (e) {
      console.log(`Failed to render ${file}:`, e);
    }
  }
}

renderPdfs().catch(console.error);
