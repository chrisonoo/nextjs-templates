import { dbConnection } from "@/db/index";
import { sql } from "drizzle-orm";
import { env } from "@/lib/env";

/**
 * Function that removes all data from the database,
 * Uses the SQL procedure to remove all tables in the database.
 *
 * Is independent of the database diagram in the application.
 * Therefore, it cleans the base regardless of whether
 * The base differs from the scheme in the application.
 */

/**
 * Function to reset the entire database using a single SQL procedure
 * This avoids multiple round-trips to the database by leveraging MySQL's capabilities
 */
async function resetDatabase() {
    console.log("🔄 Resetting database...");

    // Get the database connection
    const db = await dbConnection();

    // Get the database name from the environment variables
    const dbName = env.database.name;

    // Create and execute a stored procedure that will:
    // 1. Find all tables in the database
    // 2. Disable foreign key checks
    // 3. Drop all tables
    // 4. Re-enable foreign key checks
    await db.execute(sql`
        DROP PROCEDURE IF EXISTS drop_all_tables;
        
        CREATE PROCEDURE drop_all_tables()
        BEGIN
            DECLARE _done INT DEFAULT FALSE;
            DECLARE _tableName VARCHAR(255);
            DECLARE _cursor CURSOR FOR
                SELECT table_name 
                FROM information_schema.TABLES
                WHERE table_schema = ${dbName};
            DECLARE CONTINUE HANDLER FOR NOT FOUND SET _done = TRUE;
            
            SET FOREIGN_KEY_CHECKS = 0;
            
            OPEN _cursor;
            
            read_loop: LOOP
                FETCH _cursor INTO _tableName;
                IF _done THEN
                    LEAVE read_loop;
                END IF;
                SET @drop_statement = CONCAT('DROP TABLE IF EXISTS \`', _tableName, '\`');
                PREPARE stmt FROM @drop_statement;
                EXECUTE stmt;
                DEALLOCATE PREPARE stmt;
            END LOOP;
            
            CLOSE _cursor;
            
            SET FOREIGN_KEY_CHECKS = 1;
        END;
        
        CALL drop_all_tables();
        
        DROP PROCEDURE IF EXISTS drop_all_tables;
    `);
}

/**
 * Main function to reset the database
 */
async function reset() {
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
reset();
