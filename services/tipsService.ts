import {
    type Tip,
    type TipCreateInput,
    type TipUpdateInput,
    tipsRepository,
} from "@/db/repositories";
import type { BaseService } from "./baseService";
import { NotFoundError, ValidationError } from "@/lib/errors";
import { logger } from "@/lib/logger";

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
        logger.debug("Getting all tips");
        return tipsRepository.findAll();
    }

    /**
     * Get a tip by id with proper error handling
     * @throws NotFoundError if tip not found
     * @throws ValidationError if ID invalid
     */
    async getById(id: number | string): Promise<Tip> {
        // Validate and parse ID
        const parsedId = this.validateAndParseId(id);

        logger.debug(`Getting tip by ID: ${parsedId}`);

        // Get the tip
        const tip = await tipsRepository.findById(parsedId);

        // Handle not found with a business-friendly error
        if (!tip) {
            logger.warn(`Tip with ID ${parsedId} not found`);
            throw new NotFoundError(`Tip with ID ${parsedId} not found`);
        }

        return tip;
    }

    /**
     * Create a new tip with validation
     * @throws ValidationError if validation fails
     */
    async create(data: TipCreateInput): Promise<Tip> {
        // Business validation
        this.validateTipContent(data.content);

        // Business transformation
        const sanitizedContent = data.content.trim();

        logger.debug("Creating new tip", { content: sanitizedContent });

        // Delegate to repository for storage
        return tipsRepository.insert({ content: sanitizedContent });
    }

    /**
     * Update a tip with validation
     * @throws NotFoundError if tip not found
     * @throws ValidationError if validation fails
     */
    async update(id: number | string, data: TipUpdateInput): Promise<Tip> {
        // Validate and parse ID
        const parsedId = this.validateAndParseId(id);

        logger.debug(`Updating tip with ID: ${parsedId}`, { data });

        // Business validation - check if tip exists
        const existingTip = await tipsRepository.findById(parsedId);
        if (!existingTip) {
            logger.warn(`Tip with ID ${parsedId} not found during update`);
            throw new NotFoundError(`Tip with ID ${parsedId} not found`);
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
            logger.error(`Failed to update tip with ID ${parsedId}`);
            throw new Error(`Failed to update tip with ID ${parsedId}`);
        }

        return updatedTip;
    }

    /**
     * Delete a tip with proper error handling
     * @throws NotFoundError if tip not found
     * @throws ValidationError if ID invalid
     */
    async delete(id: number | string): Promise<boolean> {
        // Validate and parse ID
        const parsedId = this.validateAndParseId(id);

        logger.debug(`Deleting tip with ID: ${parsedId}`);

        try {
            // Could add business rules here (e.g., check if deletion is allowed)
            return await tipsRepository.removeById(parsedId);
        } catch (error) {
            // Convert repository errors to business-friendly errors
            if (error instanceof Error && error.message.includes("not found")) {
                logger.warn(
                    `Tip with ID ${parsedId} not found during deletion`
                );
                throw new NotFoundError(`Tip with ID ${parsedId} not found`);
            }

            logger.error(`Error deleting tip with ID ${parsedId}`, error);
            throw error;
        }
    }

    /**
     * Business validation: Validates and parses an ID
     * @throws ValidationError if ID is invalid
     */
    private validateAndParseId(id: number | string): number {
        const parsedId = typeof id === "string" ? Number.parseInt(id) : id;

        if (isNaN(parsedId)) {
            logger.warn(`Invalid ID format: ${id}`);
            throw new ValidationError(`Invalid ID format: ${id}`);
        }

        return parsedId;
    }

    /**
     * Business validation: Validates tip content
     * @throws ValidationError if content is invalid
     */
    private validateTipContent(content: string | undefined): void {
        if (!content || content.trim() === "") {
            logger.warn("Attempted to create/update tip with empty content");
            throw new ValidationError("Tip content cannot be empty");
        }
    }
}
