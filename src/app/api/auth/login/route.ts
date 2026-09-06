import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (username === process.env.ADMIN_USER && password === process.env.ADMIN_PASSWORD) {
      const response = NextResponse.json({ success: true });
      
      // Set the session cookie
      response.cookies.set({
        name: 'admin_session',
        value: password, // Simple token matching the middleware check
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 1 week
      });

      return response;
    }

    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
