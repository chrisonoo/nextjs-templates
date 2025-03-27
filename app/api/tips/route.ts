import type { NextRequest } from "next/server";
import { tipsService } from "@/services";
import { ValidationError } from "@/lib/errors";
import { successResponse, errorResponse } from "@/lib/api-response";
import { logger } from "@/lib/logger";

/**
 * GET handler for /api/tips
 * Uses the tips service for business logic
 */
export async function GET() {
    logger.info("API request: GET /api/tips");

    try {
        const allTips = await tipsService.getAll();
        return successResponse(allTips);
    } catch (error) {
        // Unexpected error - log it here
        logger.error("Unexpected error fetching all tips", error);
        return errorResponse(
            error instanceof Error ? error.message : "Unknown error",
            "INTERNAL_ERROR",
            500
        );
    }
}

/**
 * POST handler for /api/tips
 * Creates a new tip
 */
export async function POST(request: NextRequest) {
    logger.info("API request: POST /api/tips");

    try {
        const body = await request.json();

        // Use the service to create a new tip
        const newTip = await tipsService.create({
            content: body.content,
        });

        return successResponse(
            newTip,
            "Tip created successfully",
            undefined,
            201
        );
    } catch (error) {
        // Handle validation errors
        if (error instanceof ValidationError) {
            return errorResponse(error.message, "VALIDATION_ERROR", 400);
        }

        // Unexpected error - log it here
        logger.error("Unexpected error creating tip", error);
        return errorResponse(
            error instanceof Error ? error.message : "Unknown error",
            "INTERNAL_ERROR",
            500
        );
    }
}
