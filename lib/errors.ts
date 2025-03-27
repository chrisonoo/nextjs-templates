/**
 * Base application error class
 * All custom errors should extend this class
 */
export class AppError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "AppError";
    }
}

/**
 * Error thrown when a requested resource is not found
 */
export class NotFoundError extends AppError {
    constructor(message: string) {
        super(message);
        this.name = "NotFoundError";
    }
}

/**
 * Error thrown when input validation fails
 */
export class ValidationError extends AppError {
    constructor(message: string) {
        super(message);
        this.name = "ValidationError";
    }
}

/**
 * Error thrown when a database operation fails
 */
export class DatabaseError extends AppError {
    constructor(message: string) {
        super(message);
        this.name = "DatabaseError";
    }
}

/**
 * Error thrown when an unauthorized operation is attempted
 */
export class UnauthorizedError extends AppError {
    constructor(message = "Unauthorized access") {
        super(message);
        this.name = "UnauthorizedError";
    }
}
