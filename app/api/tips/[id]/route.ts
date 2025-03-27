import { NextRequest, NextResponse } from "next/server";
import { tipsService } from "@/services";

/**
 * GET handler for /api/tips/:id
 * Retrieves a specific tip by ID
 */
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const parsedId = parseInt(id);

    try {
        if (isNaN(parsedId)) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid ID format",
                },
                { status: 400 }
            );
        }

        const tip = await tipsService.getById(parsedId);

        if (!tip) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Tip not found",
                },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: tip,
        });
    } catch (error) {
        console.error(`Error fetching tip with ID ${parsedId}:`, error);
        return NextResponse.json(
            {
                success: false,
                message: "Failed to fetch tip",
                error: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}

/**
 * PUT handler for /api/tips/:id
 * Updates a specific tip
 */
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const parsedId = parseInt(id);

    try {
        if (isNaN(parsedId)) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid ID format",
                },
                { status: 400 }
            );
        }

        const body = await request.json();

        const updatedTip = await tipsService.update(parsedId, {
            content: body.content,
        });

        if (!updatedTip) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Tip not found",
                },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: updatedTip,
            message: "Tip updated successfully",
        });
    } catch (error) {
        console.error(`Error updating tip with ID ${parsedId}:`, error);
        return NextResponse.json(
            {
                success: false,
                message: "Failed to update tip",
                error: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}

/**
 * DELETE handler for /api/tips/:id
 * Deletes a specific tip
 */
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const parsedId = parseInt(id);

    try {
        if (isNaN(parsedId)) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid ID format",
                },
                { status: 400 }
            );
        }

        const success = await tipsService.delete(parsedId);

        if (!success) {
            return NextResponse.json(
                {
                    success: false,
                    message: `Tip with id ${parsedId} not found.`,
                },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: "Tip deleted successfully",
        });
    } catch (error) {
        console.error(`Error deleting tip with ID ${parsedId}:`, error);
        return NextResponse.json(
            {
                success: false,
                message: "Failed to delete tip",
                error: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}
