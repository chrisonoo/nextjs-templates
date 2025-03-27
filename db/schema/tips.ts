import { mysqlTable, varchar, int, timestamp } from "drizzle-orm/mysql-core";

export const tips = mysqlTable("tips", {
    id: int("id").primaryKey().autoincrement(),
    content: varchar("content", { length: 512 }).notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});
