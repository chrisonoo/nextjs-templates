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
     * Could apply business rules like filtering, sorting, etc.
     */
    async getAll(): Promise<Tip[]> {
        return tipsRepository.findAll();
    }

    /**
     * Get a tip by id with proper error handling
     * @throws Error if tip not found or ID invalid
     */
    async getById(id: number | string): Promise<Tip> {
        // Validate and parse ID
        const parsedId = this.validateAndParseId(id);

        // Get the tip
        const tip = await tipsRepository.findById(parsedId);

        // Handle not found with a business-friendly error
        if (!tip) {
            throw new Error(`Tip with ID ${parsedId} not found`);
        }

        return tip;
    }

    /**
     * Create a new tip with validation
     * @throws Error if validation fails
     */
    async create(data: TipCreateInput): Promise<Tip> {
        // Business validation
        this.validateTipContent(data.content);

        // Business transformation
        const sanitizedContent = data.content.trim();

        // Delegate to repository for storage
        return tipsRepository.insert({ content: sanitizedContent });
    }

    /**
     * Update a tip with validation
     * @throws Error if validation fails or tip not found
     */
    async update(id: number | string, data: TipUpdateInput): Promise<Tip> {
        // Validate and parse ID
        const parsedId = this.validateAndParseId(id);

        // Business validation - check if tip exists
        const existingTip = await tipsRepository.findById(parsedId);
        if (!existingTip) {
            throw new Error(`Tip with ID ${parsedId} not found`);
        }

        // Business validation of input data
        if (data.content !== undefined) {
            this.validateTipContent(data.content);
        }

        // Business transformation
        const updateData: TipUpdateInput = {};
        if (data.content !== undefined) {
            updateData.content = data.content.trim();
        }

        // Delegate to repository for storage
        const updatedTip = await tipsRepository.updateById(
            parsedId,
            updateData
        );

        // This should not happen if the tip exists, but just in case
        if (!updatedTip) {
            throw new Error(`Failed to update tip with ID ${parsedId}`);
        }

        return updatedTip;
    }

    /**
     * Delete a tip with proper error handling
     * @throws Error if tip not found
     */
    async delete(id: number | string): Promise<boolean> {
        // Validate and parse ID
        const parsedId = this.validateAndParseId(id);

        try {
            // Could add business rules here (e.g., check if deletion is allowed)
            return await tipsRepository.removeById(parsedId);
        } catch (error) {
            // Convert repository errors to business-friendly errors
            if (error instanceof Error && error.message.includes("not found")) {
                throw new Error(`Tip with ID ${parsedId} not found`);
            }
            throw error;
        }
    }

    /**
     * Business validation: Validates and parses an ID
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
     * Business validation: Validates tip content
     * @throws Error if content is invalid
     */
    private validateTipContent(content: string | undefined): void {
        if (!content || content.trim() === "") {
            throw new Error("Tip content cannot be empty");
        }
    }
}
