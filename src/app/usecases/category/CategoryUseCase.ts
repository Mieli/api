import Category from "../../domain/category/Category";
import { CategoryService } from "../../services/category/CategoryService";

export class CategoryUseCase {
  private service: CategoryService;

  constructor(service: CategoryService) {
    this.service = service;
  }

  async findAll(): Promise<Category[]> {
    return this.service.findAll();
  }

  async findById(id: string): Promise<Category | null> {
    return this.service.findById(id);
  }

  async create(Category: Category): Promise<Category> {
    return this.service.create(Category);
  }

  async update(
    id: string,
    updatedCategory: Category
  ): Promise<Category | null> {
    return this.service.update(id, updatedCategory);
  }

  async remove(id: string): Promise<boolean> {
    return this.service.remove(id);
  }
}
