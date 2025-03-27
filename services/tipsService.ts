import {
    type Tip,
    type TipCreateInput,
    type TipUpdateInput,
    tipsRepository,
} from "@/db/repositories";
import type { BaseService } from "./baseService";

/**
 * Service for handling business logic related to tips
 * Uses the tips repository for data access
 */
export class TipsService
    implements BaseService<Tip, TipCreateInput, TipUpdateInput>
{
    /**
     * Get all tips
     */
    async getAll(): Promise<Tip[]> {
        return tipsRepository.findAll();
    }

    /**
     * Get a tip by id
     * Validates the ID format and handles not found errors
     */
    async getById(id: number | string): Promise<Tip> {
        // Validate and parse ID
        const parsedId = this.validateAndParseId(id);

        // Get the tip
        const tip = await tipsRepository.findById(parsedId);

        // Handle not found
        if (!tip) {
            throw new Error(`Tip with ID ${parsedId} not found`);
        }

        return tip;
    }

    /**
     * Create a new tip
     * Validates the input data
     */
    async create(data: TipCreateInput): Promise<Tip> {
        // Validate input data
        this.validateTipContent(data.content);

        // Transform data if needed
        const sanitizedContent = data.content.trim();

        // Delegate to repository for database operation
        return tipsRepository.create({ content: sanitizedContent });
    }

    /**
     * Update an existing tip
     * Validates the ID and input data
     */
    async update(id: number | string, data: TipUpdateInput): Promise<Tip> {
        // Validate and parse ID
        const parsedId = this.validateAndParseId(id);

        // Check if tip exists
        const existingTip = await tipsRepository.findById(parsedId);
        if (!existingTip) {
            throw new Error(`Tip with ID ${parsedId} not found`);
        }

        // Validate input data if content is provided
        if (data.content !== undefined) {
            this.validateTipContent(data.content);
        }

        // Transform data if needed
        const updateData: TipUpdateInput = {};
        if (data.content !== undefined) {
            updateData.content = data.content.trim();
        }

        // Delegate to repository for database operation
        const updatedTip = await tipsRepository.update(parsedId, updateData);

        // This should not happen if the tip exists, but just in case
        if (!updatedTip) {
            throw new Error(`Failed to update tip with ID ${parsedId}`);
        }

        return updatedTip;
    }

    /**
     * Delete a tip
     * Validates the ID and handles not found errors
     */
    async delete(id: number | string): Promise<boolean> {
        // Validate and parse ID
        const parsedId = this.validateAndParseId(id);

        try {
            // The repository will throw an error if the tip doesn't exist
            return await tipsRepository.delete(parsedId);
        } catch (error) {
            // Rethrow repository errors
            throw error;
        }
    }

    /**
     * Validates and parses an ID
     * @throws Error if ID is invalid
     */
    private validateAndParseId(id: number | string): number {
        const parsedId = typeof id === "string" ? Number.parseInt(id) : id;

        if (isNaN(parsedId)) {
            throw new Error(`Invalid ID format: ${id}`);
        }

        return parsedId;
    }

    /**
     * Validates tip content
     * @throws Error if content is invalid
     */
    private validateTipContent(content: string | undefined): void {
        if (!content || content.trim() === "") {
            throw new Error("Tip content cannot be empty");
        }
    }
}
