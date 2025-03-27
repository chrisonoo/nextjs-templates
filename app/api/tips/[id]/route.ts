import { type NextRequest, NextResponse } from "next/server";
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

    try {
        // Use the service to get the tip - all validation happens in the service
        const tip = await tipsService.getById(id);

        return NextResponse.json({
            success: true,
            data: tip,
        });
    } catch (error) {
        console.error(`Error fetching tip with ID ${id}:`, error);

        // Handle specific error types
        if (error instanceof Error) {
            if (error.message.includes("Invalid ID format")) {
                return NextResponse.json(
                    {
                        success: false,
                        message: error.message,
                    },
                    { status: 400 }
                );
            } else if (error.message.includes("not found")) {
                return NextResponse.json(
                    {
                        success: false,
                        message: error.message,
                    },
                    { status: 404 }
                );
            }
        }

        // Generic error handling
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

    try {
        const body = await request.json();

        // Use the service to update the tip - all validation happens in the service
        const updatedTip = await tipsService.update(id, {
            content: body.content,
        });

        return NextResponse.json({
            success: true,
            data: updatedTip,
            message: "Tip updated successfully",
        });
    } catch (error) {
        console.error(`Error updating tip with ID ${id}:`, error);

        // Handle specific error types
        if (error instanceof Error) {
            if (error.message.includes("Invalid ID format")) {
                return NextResponse.json(
                    {
                        success: false,
                        message: error.message,
                    },
                    { status: 400 }
                );
            } else if (error.message.includes("not found")) {
                return NextResponse.json(
                    {
                        success: false,
                        message: error.message,
                    },
                    { status: 404 }
                );
            } else if (error.message.includes("cannot be empty")) {
                return NextResponse.json(
                    {
                        success: false,
                        message: error.message,
                    },
                    { status: 400 }
                );
            }
        }

        // Generic error handling
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

    try {
        // Use the service to delete the tip - all validation happens in the service
        await tipsService.delete(id);

        return NextResponse.json({
            success: true,
            message: "Tip deleted successfully",
        });
    } catch (error) {
        console.error(`Error deleting tip with ID ${id}:`, error);

        // Handle specific error types
        if (error instanceof Error) {
            if (error.message.includes("Invalid ID format")) {
                return NextResponse.json(
                    {
                        success: false,
                        message: error.message,
                    },
                    { status: 400 }
                );
            } else if (error.message.includes("not found")) {
                return NextResponse.json(
                    {
                        success: false,
                        message: error.message,
                    },
                    { status: 404 }
                );
            }
        }

        // Generic error handling
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
