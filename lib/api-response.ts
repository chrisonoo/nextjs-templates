import { NextResponse } from "next/server";

/**
 * Standard API response structure
 */
export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    message?: string;
    error?: {
        code: string;
        message: string;
    };
    meta?: Record<string, any>;
}

/**
 * Creates a successful API response
 */
export function successResponse<T>(
    data: T,
    message?: string,
    meta?: Record<string, any>,
    status = 200
): NextResponse {
    const response: ApiResponse<T> = {
        success: true,
        data,
        meta,
    };

    if (message) {
        response.message = message;
    }

    return NextResponse.json(response, { status });
}

/**
 * Creates an error API response
 */
export function errorResponse(
    message: string,
    code = "INTERNAL_ERROR",
    status = 500,
    meta?: Record<string, any>
): NextResponse {
    const response: ApiResponse = {
        success: false,
        error: {
            code,
            message,
        },
        meta,
    };

    return NextResponse.json(response, { status });
}
