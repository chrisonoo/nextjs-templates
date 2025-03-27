import { dbConnection } from "@/db/index";
import { sql } from "drizzle-orm";

/**
 * Testing the connection to the database using Drizzle ORM
 * You can use this function in development tools or CLI scripts
 */
const testDatabaseConnection = async (): Promise<boolean> => {
    try {
        // Create a dedicated connection for testing
        const db = await dbConnection();

        // Make a simple test query using drizzle
        const result = await db.execute(sql`SELECT 1 AS test`);

        console.log("✅ The database connection works correctly!");
        console.log("Test query result:", result[0]);

        return true;
    } catch (error) {
        console.error("❌ Failed to connect to the database:", error);
        return false;
    }
};

/**
 * Checks the correctness of the database structure
 * Checks if all the required tables exist
 */
const validateDatabaseSchema = async (): Promise<boolean> => {
    try {
        // Create a dedicated connection for schema validation
        const db = await dbConnection();

        // Make an inquiry to check the presence of tables
        const tables = await db.execute(sql`SHOW TABLES`);

        console.log("📋 Tables in the database:");
        console.log(tables[0]);

        return true;
    } catch (error) {
        console.error("❌ Error during database schema validation:", error);
        return false;
    }
};

async function main() {
    console.log("🔍 Testing connection to the database ...");

    const isConnected = await testDatabaseConnection();

    if (isConnected) {
        console.log("\n🔍 Checking the database structure ...");
        await validateDatabaseSchema();
    }

    console.log("\n✨ Database testing has been completed");

    // Finish the process after tests
    process.exit(isConnected ? 0 : 1);
}

// Run the main function
main().catch((err) => {
    console.error("Unforeseen error:", err);
    process.exit(1);
});
