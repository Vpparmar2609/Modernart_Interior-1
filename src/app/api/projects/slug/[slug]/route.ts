import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Project from '@/lib/models/Project';

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    await connectToDatabase();
    const { slug } = await params;
    
    // Find all projects sorted by index or createdAt to determine next/related
    const allProjects = await Project.find({}).sort({ index: 1 }).lean();
    
    const idx = allProjects.findIndex((p: any) => p.slug === slug);
    if (idx === -1) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    
    const project = allProjects[idx];
    const next = allProjects[(idx + 1) % allProjects.length];
    const related = allProjects.filter((x: any) => x.slug !== slug).slice(idx % 3 === 0 ? 2 : 1, (idx % 3 === 0 ? 2 : 1) + 2);

    return NextResponse.json({ project, next, related });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
