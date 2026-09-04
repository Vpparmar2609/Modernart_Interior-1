import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import { Readable } from 'stream';

export async function POST(req: Request) {
  try {
    const { bucket } = await connectToDatabase();
    
    const formData = await req.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const stream = Readable.from(buffer);

    const uploadStream = bucket.openUploadStream(file.name, {
      metadata: { contentType: file.type },
    });

    return new Promise<NextResponse>((resolve, reject) => {
      stream.pipe(uploadStream)
        .on('error', (error) => {
          reject(NextResponse.json({ error: error.message }, { status: 500 }));
        })
        .on('finish', () => {
          resolve(NextResponse.json({ 
            message: 'File uploaded successfully',
            fileId: uploadStream.id,
            url: `/api/images/${uploadStream.id}`
          }, { status: 201 }));
        });
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
