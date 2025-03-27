/**
 * Base repository interface that defines standard CRUD operations
 * This will be implemented by all repositories
 */
export interface BaseRepository<T, CreateInput, UpdateInput> {
    findAll(): Promise<T[]>;
    findById(id: number): Promise<T | undefined>;
    create(data: CreateInput): Promise<T>;
    update(id: number, data: UpdateInput): Promise<T | undefined>;
    delete(id: number): Promise<boolean>;
}
