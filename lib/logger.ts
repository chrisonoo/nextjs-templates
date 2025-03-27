/**
 * Simple logger for application-wide logging
 * In production, this would be replaced with a more robust solution
 */
export const logger = {
    /**
     * Log informational message
     */
    info: (message: string, meta?: Record<string, any>) => {
        console.log(`[INFO] ${message}`, meta ? meta : "");
    },

    /**
     * Log warning message
     */
    warn: (message: string, meta?: Record<string, any>) => {
        console.warn(`[WARN] ${message}`, meta ? meta : "");
    },

    /**
     * Log error message
     */
    error: (message: string, error?: unknown, meta?: Record<string, any>) => {
        console.error(`[ERROR] ${message}`, error || "", meta ? meta : "");
    },

    /**
     * Log debug message (only in development)
     */
    debug: (message: string, meta?: Record<string, any>) => {
        if (process.env.NODE_ENV === "development") {
            console.debug(`[DEBUG] ${message}`, meta ? meta : "");
        }
    },
};
