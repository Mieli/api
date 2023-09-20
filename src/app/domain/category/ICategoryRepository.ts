import Category from "./Category";

export default interface ICategoryRepository {
  findAll(): Promise<Category[]>;
  findById(id: string): Promise<Category | null>;
  create(category: Category): Promise<Category>;
  update(id: string, updatedCategory: Category): Promise<Category | null>;
  remove(id: string): Promise<boolean>;
}
