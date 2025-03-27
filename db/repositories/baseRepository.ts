import { MySqlTable } from "drizzle-orm/mysql-core";

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

/**
 * Abstract base repository class with common functionality
 * Concrete repositories will extend this class
 */
export abstract class AbstractRepository<T, CreateInput, UpdateInput>
    implements BaseRepository<T, CreateInput, UpdateInput>
{
    constructor(protected table: MySqlTable) {}

    abstract findAll(): Promise<T[]>;
    abstract findById(id: number): Promise<T | undefined>;
    abstract create(data: CreateInput): Promise<T>;
    abstract update(id: number, data: UpdateInput): Promise<T | undefined>;
    abstract delete(id: number): Promise<boolean>;
}
