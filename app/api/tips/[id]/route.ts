import type { NextRequest } from "next/server";
import { tipsService } from "@/services";
import { NotFoundError, ValidationError } from "@/lib/errors";
import { successResponse, errorResponse } from "@/lib/api-response";
import { logger } from "@/lib/logger";

/**
 * GET handler for /api/tips/:id
 * Retrieves a specific tip by ID
 */
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    logger.info(`API request: GET /api/tips/${id}`);

    try {
        // Use the service to get the tip - all validation happens in the service
        const tip = await tipsService.getById(id);
        return successResponse(tip);
    } catch (error) {
        // Handle specific error types without duplicating error logs
        // (errors are already logged in the service layer)
        if (error instanceof NotFoundError) {
            return errorResponse(error.message, "NOT_FOUND", 404);
        } else if (error instanceof ValidationError) {
            return errorResponse(error.message, "VALIDATION_ERROR", 400);
        }

        // Only log unexpected errors here
        logger.error(`Unexpected error handling GET /api/tips/${id}`, error);
        return errorResponse(
            error instanceof Error ? error.message : "Unknown error",
            "INTERNAL_ERROR",
            500
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
    logger.info(`API request: PUT /api/tips/${id}`);

    try {
        const body = await request.json();

        // Use the service to update the tip - all validation happens in the service
        const updatedTip = await tipsService.update(id, {
            content: body.content,
        });

        return successResponse(updatedTip, "Tip updated successfully");
    } catch (error) {
        // Handle specific error types without duplicating error logs
        if (error instanceof NotFoundError) {
            return errorResponse(error.message, "NOT_FOUND", 404);
        } else if (error instanceof ValidationError) {
            return errorResponse(error.message, "VALIDATION_ERROR", 400);
        }

        // Only log unexpected errors here
        logger.error(`Unexpected error handling PUT /api/tips/${id}`, error);
        return errorResponse(
            error instanceof Error ? error.message : "Unknown error",
            "INTERNAL_ERROR",
            500
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
    logger.info(`API request: DELETE /api/tips/${id}`);

    try {
        // Use the service to delete the tip - all validation happens in the service
        await tipsService.delete(id);

        return successResponse(null, "Tip deleted successfully");
    } catch (error) {
        // Handle specific error types without duplicating error logs
        if (error instanceof NotFoundError) {
            return errorResponse(error.message, "NOT_FOUND", 404);
        } else if (error instanceof ValidationError) {
            return errorResponse(error.message, "VALIDATION_ERROR", 400);
        }

        // Only log unexpected errors here
        logger.error(`Unexpected error handling DELETE /api/tips/${id}`, error);
        return errorResponse(
            error instanceof Error ? error.message : "Unknown error",
            "INTERNAL_ERROR",
            500
        );
    }
}
