export interface IRepository<T> {
  find(page: number, limit: number): Promise<T[]>
  findById(id: number): Promise<T>
  create(entity: T): Promise<T>
  update(id: number, entity: T): Promise<T>
  // delete(id: number): Promise<T> #TODO: add this
}
