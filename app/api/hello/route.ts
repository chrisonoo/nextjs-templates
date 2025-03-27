import { NextResponse } from "next/server";

export async function GET() {
    // In Next.js 15, fetch requests are no longer cached by default
    return NextResponse.json({
        message: "Hello from Next.js 15 API Route!",
        timestamp: new Date().toISOString(),
    });
}
