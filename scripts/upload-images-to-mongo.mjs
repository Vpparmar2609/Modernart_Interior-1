import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { MongoClient, GridFSBucket } from "mongodb";

dotenv.config({ path: ".env.local" });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT = path.resolve(__dirname, "..");
const IMAGE_ROOT = path.join(ROOT, "public", "newprojects");

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI is missing from .env.local");
  process.exit(1);
}

const IMAGE_EXTENSIONS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".gif",
  ".avif",
]);

function getContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();

  const types = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".webp": "image/webp",
    ".gif": "image/gif",
    ".avif": "image/avif",
  };

  return types[ext] || "application/octet-stream";
}

function getAllImages(directory) {
  const files = [];

  if (!fs.existsSync(directory)) {
    throw new Error(`Folder not found: ${directory}`);
  }

  for (const entry of fs.readdirSync(directory, {
    withFileTypes: true,
  })) {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...getAllImages(fullPath));
      continue;
    }

    const extension = path.extname(entry.name).toLowerCase();

    if (IMAGE_EXTENSIONS.has(extension)) {
      files.push(fullPath);
    }
  }

  return files;
}

function getWebPath(filePath) {
  const relative = path.relative(
    path.join(ROOT, "public"),
    filePath
  );

  return "/" + relative.split(path.sep).join("/");
}

async function findExistingFile(bucket, webPath) {
  return bucket
    .find({
      "metadata.originalPath": webPath,
    })
    .limit(1)
    .toArray();
}

async function uploadImage(bucket, filePath) {
  const webPath = getWebPath(filePath);
  const filename = path.basename(filePath);
  const contentType = getContentType(filePath);

  const existing = await findExistingFile(bucket, webPath);

  if (existing.length > 0) {
    console.log(`⏭️ Already exists: ${webPath}`);
    return;
  }

  const stats = fs.statSync(filePath);

  console.log(
    `⬆️ Uploading: ${webPath} (${(stats.size / 1024 / 1024).toFixed(2)} MB)`
  );

  const uploadStream = bucket.openUploadStream(filename, {
    contentType,
    metadata: {
      originalPath: webPath,
      source: "modernart-interior",
      uploadedAt: new Date(),
    },
  });

  await new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(uploadStream)
      .on("error", reject)
      .on("finish", resolve);
  });

  console.log(`✅ Uploaded: ${webPath}`);
}

async function main() {
  const dryRun = process.argv.includes("--dry-run");

  console.log("");
  console.log("======================================");
  console.log(" ModernArt Interior Image Migration");
  console.log("======================================");
  console.log("");

  console.log(`Source: ${IMAGE_ROOT}`);
  console.log(`Mode: ${dryRun ? "DRY RUN" : "REAL UPLOAD"}`);
  console.log("");

  const images = getAllImages(IMAGE_ROOT);

  console.log(`Found ${images.length} image files.`);
  console.log("");

  if (images.length === 0) {
    console.log("❌ No images found.");
    return;
  }

  if (dryRun) {
    for (const image of images) {
      const webPath = getWebPath(image);
      const size = fs.statSync(image).size;

      console.log(
        `🔍 Would upload: ${webPath} (${(size / 1024 / 1024).toFixed(2)} MB)`
      );
    }

    console.log("");
    console.log("✅ Dry run completed.");
    console.log("Nothing was uploaded.");
    return;
  }

  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();

    console.log("✅ Connected to MongoDB");

    const db = client.db();

    const bucket = new GridFSBucket(db, {
      bucketName: "uploads",
    });

    for (const image of images) {
      await uploadImage(bucket, image);
    }

    console.log("");
    console.log("======================================");
    console.log("✅ ALL IMAGES UPLOADED");
    console.log("======================================");
  } finally {
    await client.close();
  }
}

main().catch((error) => {
  console.error("");
  console.error("❌ Migration failed:");
  console.error(error);
  process.exit(1);
});