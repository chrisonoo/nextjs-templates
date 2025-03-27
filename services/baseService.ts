/**
 * Base service interface that defines standard operations
 * This abstracts the business logic from repository implementation
 */
export interface BaseService<T, CreateInput, UpdateInput> {
    getAll(): Promise<T[]>;
    getById(id: number): Promise<T | undefined>;
    create(data: CreateInput): Promise<T>;
    update(id: number, data: UpdateInput): Promise<T | undefined>;
    delete(id: number): Promise<boolean>;
}

/**
 * Abstract base service with common functionality
 * Concrete services will extend this class
 */
export abstract class AbstractService<T, CreateInput, UpdateInput>
    implements BaseService<T, CreateInput, UpdateInput>
{
    abstract getAll(): Promise<T[]>;
    abstract getById(id: number): Promise<T | undefined>;
    abstract create(data: CreateInput): Promise<T>;
    abstract update(id: number, data: UpdateInput): Promise<T | undefined>;
    abstract delete(id: number): Promise<boolean>;
}
