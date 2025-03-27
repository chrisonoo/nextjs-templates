import { seedTips } from "./tipsSeeder";

/**
 * Main seed function that runs all individual seeders
 */
async function seed() {
    console.log("🌱 Starting database seeding...");

    // Run all seeders
    await seedTips();

    console.log("\n✅ Database seeding completed successfully");
}

seed()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("❌ Error seeding database:", error);
        process.exit(1);
    });
