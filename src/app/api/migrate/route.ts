import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Project from '@/lib/models/Project';
import { PROJECTS } from '@/data/content';

export async function POST() {
  try {
    await connectToDatabase();
    
    // Check if projects already exist to avoid duplicates
    const count = await Project.countDocuments();
    if (count > 0) {
      return NextResponse.json({ message: 'Migration already run (projects exist).' }, { status: 400 });
    }

    // Insert all projects from content.ts
    const inserted = await Project.insertMany(PROJECTS);

    return NextResponse.json({ 
      message: 'Migration successful!', 
      insertedCount: inserted.length 
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
