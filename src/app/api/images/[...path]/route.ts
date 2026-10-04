import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path } = await params;

    const originalPath = '/newprojects/' + path.join('/');

    const { bucket } = await connectToDatabase();

    const files = await bucket
      .find({
        'metadata.originalPath': originalPath,
      })
      .toArray();

    if (files.length === 0) {
      return NextResponse.json(
        {
          error: 'Image not found',
          path: originalPath,
        },
        { status: 404 }
      );
    }

    const file = files[0];

    const downloadStream = bucket.openDownloadStream(file._id);

    const readableStream = new ReadableStream({
      start(controller) {
        downloadStream.on('data', (chunk) => {
          controller.enqueue(chunk);
        });

        downloadStream.on('end', () => {
          controller.close();
        });

        downloadStream.on('error', (err) => {
          controller.error(err);
        });
      },
    });

    return new Response(readableStream, {
      headers: {
        'Content-Type':
          (file as any).contentType ||
          (file.metadata as any)?.contentType ||
          'application/octet-stream',

        'Cache-Control':
          'public, max-age=31536000, immutable',
      },
    });
  } catch (error: any) {
    console.error('Image path error:', error);

    return NextResponse.json(
      {
        error: error.message || 'Failed to load image',
      },
      { status: 500 }
    );
  }
}