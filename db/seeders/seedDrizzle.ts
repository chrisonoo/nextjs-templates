import { seed } from "drizzle-seed";
import * as schema from "@/db/schema";
import { dbConnection } from "@/db/index";

/**
 * An example of using Seeder from Drizzle-Seed.
 * https://orm.drizzle.team/docs/seed-overview
 *
 * Little flexibility when it comes to generating texts.
 * The preferred solution is a faker, an example of using seeding with faker
 * in the tips-seeder.ts and tips-factory.ts files.
 */

async function main() {
    const db = await dbConnection();

    // Generate and insert additional random tips
    await seed(db, { tips: schema.tips }).refine((f) => ({
        tips: {
            columns: {
                content: f.loremIpsum({ sentencesCount: 1 }),
            },
            count: 4,
        },
    }));
}

main();
