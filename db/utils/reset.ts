import { dbConnection } from "@/db/index";
import { reset } from "drizzle-seed";
import * as schema from "@/db/schema";

/**
 * Function that resets the database (truncate tables),
 * uses the Reset function from the Drizzle-Seed package.
 *
 * Only the content of the data tables is removed,
 * Migrations are not removed.
 *
 * If the base differs from the diagram in the application,
 * The function will report the error.
 */

/**
 * Function to reset the entire database using a single SQL procedure
 * This avoids multiple round-trips to the database by leveraging MySQL's capabilities
 */
async function resetDatabase() {
    console.log("🔄 Resetting database...");

    // Get the database connection
    const db = await dbConnection();

    // Reset the database
    await reset(db, schema);
}

/**
 * Main function to reset the database
 */
async function main() {
    console.log("🔄 Starting database reset...");

    try {
        // Reset the entire database in a single operation
        await resetDatabase();

        console.log("✅ Database reset completed successfully");
        process.exit(0);
    } catch (error) {
        console.error("❌ Error resetting database:", error);
        process.exit(1);
    }
}

// Execute the reset function
main();
