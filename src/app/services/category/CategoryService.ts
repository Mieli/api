import { CategoryRepositoryMongo } from "../../../infra/database/repositories/category/CategoryRepositoryMongo";
import Category from "../../domain/category/Category";

export class CategoryService {
  private repository: CategoryRepositoryMongo;

  constructor(repository: CategoryRepositoryMongo) {
    this.repository = repository;
  }

  async findAll(): Promise<Category[]> {
    return this.repository.findAll();
  }
  async findById(id: string): Promise<Category | null> {
    return this.repository.findById(id);
  }
  async create(category: Category): Promise<Category> {
    return this.repository.create(category);
  }
  async update(
    id: string,
    updatedCategory: Category
  ): Promise<Category | null> {
    return this.repository.update(id, updatedCategory);
  }
  async remove(id: string): Promise<boolean> {
    return this.repository.remove(id);
  }
}
