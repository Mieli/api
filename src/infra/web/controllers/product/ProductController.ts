import { Request, Response } from "express";
import { ProductUseCase } from "../../../../app/usecases/product/ProductUseCase";

export class ProductController {
  private useCase: ProductUseCase;

  constructor(useCase: ProductUseCase) {
    this.useCase = useCase;
  }

  async getAllProducts(req: Request, res: Response): Promise<void> {
    const data = await this.useCase.findAll();
    if (data) {
      res.status(200).json(data);
    }
    res.status(404).json({ message: "Not found." });
  }

  async getProductById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const data = await this.useCase.findById(id);
    if (data) {
      res.status(200).json(data);
    }
    res.status(404).json({ message: "Not found." });
  }

  async createProduct(req: Request, res: Response): Promise<void> {
    const { name, price, stock } = req.body;
    const priceFormated = parseFloat(price);
    const stockFormated = parseInt(stock);
    const data = await this.useCase.create({
      name,
      price: priceFormated,
      stock: stockFormated,
    });
    res.status(201).json(data);
  }

  async updateProduct(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { name, price, stock } = req.body;
    const priceFormated = parseFloat(price);
    const stockFormated = parseInt(stock);
    const data = await this.useCase.update(id, {
      name,
      price: priceFormated,
      stock: stockFormated,
    });
    if (data) {
      res.status(200).json(data);
    }
    res.status(404).json({ message: "Not found." });
  }

  async deleteProduct(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const result = await this.useCase.remove(id);
    if (result) {
      res.status(200).json({ message: "record removed successfully" });
    }
    res.status(404).json({ message: "Not found." });
  }
}
