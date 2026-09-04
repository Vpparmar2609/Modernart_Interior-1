import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { PROJECTS } from './src/data/content';
import Project from './src/lib/models/Project';

dotenv.config({ path: '.env.local' });

async function migrate() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('No MONGODB_URI found in .env.local');
    process.exit(1);
  }

  await mongoose.connect(uri);
  console.log('Connected to MongoDB');

  const count = await Project.countDocuments();
  if (count > 0) {
    console.log(`Found ${count} projects already in the database. Deleting them to start fresh...`);
    await Project.deleteMany({});
  }

  console.log(`Inserting ${PROJECTS.length} projects...`);
  await Project.insertMany(PROJECTS);
  
  console.log('Successfully migrated projects to MongoDB!');
  process.exit(0);
}

migrate().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
