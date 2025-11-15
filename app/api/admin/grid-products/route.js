import { NextResponse } from 'next/server';

let gridProducts = null;

export async function POST(request) {
  const body = await request.json();
  gridProducts = body.sections;
  return NextResponse.json({ success: true });
}

export async function GET() {
  return NextResponse.json({ sections: gridProducts || [] });
}
