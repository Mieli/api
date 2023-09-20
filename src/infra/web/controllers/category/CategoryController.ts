import { Request, Response } from "express";
import { CategoryUseCase } from "../../../../app/usecases/category/CategoryUseCase";
import Category from "../../../../app/domain/category/Category";

export class CategoryController {
  private useCase: CategoryUseCase;

  constructor(useCase: CategoryUseCase) {
    this.useCase = useCase;
  }

  async getAllCategories(req: Request, res: Response): Promise<void> {
    const data: Category[] = await this.useCase.findAll();

    res.status(200).json(data);
  }

  async getCategoryById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const data: Category | null = await this.useCase.findById(id);
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ message: "Not found." });
    }
  }

  async createCategory(req: Request, res: Response): Promise<void> {
    const { name } = req.body;

    const newCategory: Category = await this.useCase.create({
      name,
    });

    res.status(201).json(newCategory);
  }

  async updateCategory(req: Request, res: Response): Promise<void> {
    const { idParams } = req.params;
    const { name } = req.body;
    const data: Category | null = await this.useCase.update(idParams, {
      name,
    });
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ message: "Not found." });
    }
  }

  async deleteCategory(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const result: boolean = await this.useCase.remove(id);
    if (result) {
      res.status(200).json({ message: "record removed successfully" });
    } else {
      res.status(404).json({ message: "Not found." });
    }
  }
}
