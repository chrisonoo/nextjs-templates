import { AbstractService } from "./baseService";
import {
    Tip,
    TipCreateInput,
    TipUpdateInput,
    tipsRepository,
} from "@/db/repositories";

/**
 * Service for handling business logic related to tips
 * Uses the tips repository for data access
 */
export class TipsService extends AbstractService<
    Tip,
    TipCreateInput,
    TipUpdateInput
> {
    /**
     * Get all tips
     */
    async getAll(): Promise<Tip[]> {
        return tipsRepository.findAll();
    }

    /**
     * Get a tip by id
     */
    async getById(id: number): Promise<Tip | undefined> {
        return tipsRepository.findById(id);
    }

    /**
     * Create a new tip
     * Here we could add additional business logic, validation, etc.
     */
    async create(data: TipCreateInput): Promise<Tip> {
        // We could add validation logic here
        if (!data.content || data.content.trim() === "") {
            throw new Error("Tip content cannot be empty");
        }

        // We could transform data here if needed
        const sanitizedContent = data.content.trim();

        // Delegate to repository for database operation
        return tipsRepository.create({ content: sanitizedContent });
    }

    /**
     * Update an existing tip
     */
    async update(id: number, data: TipUpdateInput): Promise<Tip | undefined> {
        // Check if tip exists
        const existingTip = await this.getById(id);
        if (!existingTip) {
            return undefined;
        }

        // We could add validation logic here
        if (data.content && data.content.trim() === "") {
            throw new Error("Tip content cannot be empty");
        }

        // We could transform data here if needed
        const updateData: TipUpdateInput = {};
        if (data.content) {
            updateData.content = data.content.trim();
        }

        // Delegate to repository for database operation
        return tipsRepository.update(id, updateData);
    }

    /**
     * Delete a tip
     */
    async delete(id: number): Promise<boolean> {
        return tipsRepository.delete(id);
    }
}
