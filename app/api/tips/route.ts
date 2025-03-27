import { NextRequest, NextResponse } from "next/server";
import { tipsService } from "@/services";

/**
 * GET handler for /api/tips
 * Uses the tips service for business logic
 */
export async function GET() {
    try {
        const allTips = await tipsService.getAll();

        return NextResponse.json({
            success: true,
            data: allTips,
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.error("Error fetching tips:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Failed to fetch tips",
                error: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}

/**
 * POST handler for /api/tips
 * Creates a new tip
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Use the service to create a new tip
        const newTip = await tipsService.create({
            content: body.content,
        });

        return NextResponse.json(
            {
                success: true,
                data: newTip,
                message: "Tip created successfully",
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating tip:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Failed to create tip",
                error: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}
