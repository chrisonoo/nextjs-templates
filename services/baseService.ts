/**
 * Base service interface that defines business operations
 * Services are responsible for business logic, validation, and error handling
 */
export interface BaseService<T, CreateInput, UpdateInput> {
    /**
     * Get all entities with business logic applied
     */
    getAll(): Promise<T[]>;

    /**
     * Get an entity by ID with proper error handling
     * @throws Error if entity not found or ID invalid
     */
    getById(id: number | string): Promise<T>;

    /**
     * Create a new entity with validation and business rules
     * @throws Error if validation fails
     */
    create(data: CreateInput): Promise<T>;

    /**
     * Update an entity with validation and business rules
     * @throws Error if validation fails or entity not found
     */
    update(id: number | string, data: UpdateInput): Promise<T>;

    /**
     * Delete an entity with proper error handling
     * @throws Error if entity not found or deletion not allowed
     */
    delete(id: number | string): Promise<boolean>;
}
