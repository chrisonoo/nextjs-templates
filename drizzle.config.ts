import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config();

export default defineConfig({
    dialect: "mysql",
    schema: "./db/schema/*",
    out: "./db/migrations",
    dbCredentials: {
        host: process.env.DATABASE_SERVER || "",
        database: process.env.DATABASE_NAME || "",
        user: process.env.DATABASE_USER || "",
        password: process.env.DATABASE_PASSWORD || "",
    },
});
