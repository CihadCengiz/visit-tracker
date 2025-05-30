import { NextRequest, NextResponse } from 'next/server';

// POST: Update country stats
export async function POST(request: NextRequest) {
    const { code } = await request.json();
    return NextResponse.json({ status: 'ok', received: code });
}

// GET: Retrieve country stats
export async function GET() {
    return NextResponse.json({ us: 123, tr: 456 });
}
