/**
 * Base service interface that defines standard CRUD operations
 * This will be implemented by all services
 */
export interface BaseService<T, CreateInput, UpdateInput> {
    getAll(): Promise<T[]>;
    getById(id: number | string): Promise<T>;
    create(data: CreateInput): Promise<T>;
    update(id: number | string, data: UpdateInput): Promise<T>;
    delete(id: number | string): Promise<boolean>;
}
