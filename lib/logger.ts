/**
 * Log levels supported by the logger
 */
type LogLevel = "debug" | "info" | "warn" | "error";

/**
 * Determines the current log level based on environment variables
 * Default is 'info' in production and 'debug' in development
 */
function getLogLevel(): LogLevel {
    const configuredLevel = process.env.LOG_LEVEL?.toLowerCase() as LogLevel;

    if (["debug", "info", "warn", "error"].includes(configuredLevel)) {
        return configuredLevel;
    }

    return process.env.NODE_ENV === "production" ? "info" : "debug";
}

/**
 * Checks if a given log level should be displayed based on the current configuration
 */
function shouldLog(level: LogLevel): boolean {
    const currentLevel = getLogLevel();
    const levels: Record<LogLevel, number> = {
        debug: 0,
        info: 1,
        warn: 2,
        error: 3,
    };

    return levels[level] >= levels[currentLevel];
}

/**
 * Enhanced logger with configurable log levels
 * Configure with environment variables:
 * - LOG_LEVEL: 'debug', 'info', 'warn', 'error' (default: 'info' in production, 'debug' in development)
 * - LOG_ERROR_STACK: 'true' or 'false' (default: 'false')
 */
export const logger = {
    /**
     * Log debug message (only if LOG_LEVEL=debug)
     * For detailed information useful during development
     */
    debug: (message: string, meta?: Record<string, any>) => {
        if (shouldLog("debug")) {
            console.debug(`[DEBUG] ${message}`, meta ? meta : "");
        }
    },

    /**
     * Log informational message
     * For general information about normal application operation
     */
    info: (message: string, meta?: Record<string, any>) => {
        if (shouldLog("info")) {
            console.log(`[INFO] ${message}`, meta ? meta : "");
        }
    },

    /**
     * Log warning message
     * For potential issues that don't cause errors
     */
    warn: (message: string, meta?: Record<string, any>) => {
        if (shouldLog("warn")) {
            console.warn(`[WARN] ${message}`, meta ? meta : "");
        }
    },

    /**
     * Log error message
     * For errors that affect application operation
     */
    error: (message: string, error?: unknown, meta?: Record<string, any>) => {
        if (shouldLog("error")) {
            console.error(`[ERROR] ${message}`, meta ? meta : "");

            // Log error details without stack trace unless configured to show it
            if (error instanceof Error) {
                if (process.env.LOG_ERROR_STACK === "true") {
                    console.error(error);
                } else {
                    console.error(
                        `Error details: ${error.name}: ${error.message}`
                    );
                }
            } else if (error) {
                console.error("Error details:", error);
            }
        }
    },
};
