/**
 * Base repository interface that defines data access operations
 * Repositories are responsible for database interactions only
 */
export interface BaseRepository<T, CreateInput, UpdateInput> {
    /**
     * Retrieve all entities from the database
     */
    findAll(): Promise<T[]>;

    /**
     * Find an entity by its ID
     * @returns The entity or undefined if not found
     */
    findById(id: number): Promise<T | undefined>;

    /**
     * Insert a new entity into the database
     */
    insert(data: CreateInput): Promise<T>;

    /**
     * Update an existing entity in the database
     * @returns The updated entity or undefined if not found
     */
    updateById(id: number, data: UpdateInput): Promise<T | undefined>;

    /**
     * Remove an entity from the database
     * @returns true if deleted, throws error if not found
     */
    removeById(id: number): Promise<boolean>;
}
