import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { env } from "@/lib/env";

/**
 * Database connection configuration
 * Using a function to create database connections on demand instead of a singleton
 */
export async function dbConnection() {
    const connection = await mysql.createConnection({
        host: env.database.server,
        user: env.database.user,
        password: env.database.password,
        database: env.database.name,
        multipleStatements: true,
    });

    // Export a connection instance for direct queries
    return drizzle(connection);
}

/**
 * Create a connection pool for query purposes
 * This is recommended for most query operations
 */
const pool = mysql.createPool({
    host: env.database.server,
    user: env.database.user,
    password: env.database.password,
    database: env.database.name,
});

// Export pooled db instance for regular queries
export const dbPool = drizzle(pool);

export * from "./schema";
