import { dbConnection } from "@/db/index";
import { tips } from "@/db/schema";
import { sql } from "drizzle-orm";
import { createRandomTips } from "@/db/factories/tipsFactory";
import { TipData } from "@/db/factories/tipsFactory";

/**
 * Seeds the tips table with fixed and random data
 * Using the connection for data seeding operations
 */
export async function seedTips() {
    console.log("🌱 Seeding tips table...");

    const db = await dbConnection();

    // Reset the tips table
    await db.execute(sql`TRUNCATE TABLE ${tips}`);

    // Fixed tips defined directly in the seeder
    const fixedTips: TipData[] = [
        {
            content: "Get started by editing 'app/page.tsx'.",
        },
        {
            content: "Save and see your changes instantly.",
        },
    ];

    // Get random tips from factory
    const randomTips = createRandomTips(2);

    // Combine all data
    const seedData = [...fixedTips, ...randomTips];

    // Insert the seed data
    await db.insert(tips).values(seedData);

    console.log("\n✅ Tips table seeded successfully:");
    seedData.forEach((tip, index) => {
        console.log(`   ${index + 1}. ${tip.content}`);
    });

    return seedData;
}
