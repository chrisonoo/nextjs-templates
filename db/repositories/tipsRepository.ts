import { eq, desc } from "drizzle-orm";
import { dbPool } from "@/db";
import { tips } from "@/db/schema/tips";
import { AbstractRepository } from "./baseRepository";

// Define tip entity type
export type Tip = typeof tips.$inferSelect;

// Define input types for create and update operations
export type TipCreateInput = Omit<Tip, "id" | "createdAt" | "updatedAt">;
export type TipUpdateInput = Partial<TipCreateInput>;

/**
 * Repository for tip-related database operations
 * Handles all database access for the tips entity
 */
export class TipsRepository extends AbstractRepository<
    Tip,
    TipCreateInput,
    TipUpdateInput
> {
    constructor() {
        super(tips);
    }

    /**
     * Fetch all tips from the database
     */
    async findAll(): Promise<Tip[]> {
        return dbPool.select().from(tips).orderBy(tips.createdAt);
    }

    /**
     * Find a tip by its id
     */
    async findById(id: number): Promise<Tip | undefined> {
        const results = await dbPool.select().from(tips).where(eq(tips.id, id));
        return results[0];
    }

    /**
     * Create a new tip
     */
    async create(data: TipCreateInput): Promise<Tip> {
        // Insert the new tip and get its ID
        const [insertedId] = await dbPool
            .insert(tips)
            .values(data)
            .$returningId();

        // Fetch the created tip using its ID
        const createdTip = await this.findById(insertedId.id);

        if (!createdTip) {
            throw new Error("Failed to create tip");
        }

        return createdTip;
    }

    /**
     * Update an existing tip
     */
    async update(id: number, data: TipUpdateInput): Promise<Tip | undefined> {
        await dbPool
            .update(tips)
            .set({ ...data, updatedAt: new Date() })
            .where(eq(tips.id, id));

        // Fetch the updated tip
        return this.findById(id);
    }

    /**
     * Delete a tip by id
     * @throws {Error} When tip with given id doesn't exist
     */
    async delete(id: number): Promise<boolean> {
        // First check if the tip exists
        const existingTip = await this.findById(id);
        if (!existingTip) {
            return false;
        }

        // If tip exists, proceed with deletion
        await dbPool.delete(tips).where(eq(tips.id, id));
        return true;
    }
}
