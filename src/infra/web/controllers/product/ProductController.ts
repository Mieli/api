import { Request, Response } from "express";
import { ProductUseCase } from "../../../../app/usecases/product/ProductUseCase";
import { convertStringToFloat, convertStringToInt } from "./helpers";
import Product from "../../../../app/domain/product/Product";

export class ProductController {
  private useCase: ProductUseCase;

  constructor(useCase: ProductUseCase) {
    this.useCase = useCase;
  }

  async getAllProducts(req: Request, res: Response): Promise<void> {
    const data: Product[] = await this.useCase.findAll();

    res.status(200).json(data);
  }

  async getProductById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const data: Product | null = await this.useCase.findById(id);
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ message: "Not found." });
    }
  }

  async createProduct(req: Request, res: Response): Promise<void> {
    const { name, price, stock } = req.body;
    const priceFormated: number = convertStringToFloat(price);
    const stockFormated: number = convertStringToInt(stock);
    const newProduct: Product = await this.useCase.create({
      name,
      price: priceFormated,
      stock: stockFormated,
    });

    res.status(201).json(newProduct);
  }

  async updateProduct(req: Request, res: Response): Promise<void> {
    const { idParams } = req.params;
    const { name, price, stock } = req.body;
    const priceFormated: number = convertStringToFloat(price);
    const stockFormated: number = convertStringToInt(stock);
    const data: Product | null = await this.useCase.update(idParams, {
      name,
      price: priceFormated,
      stock: stockFormated,
    });
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ message: "Not found." });
    }
  }

  async deleteProduct(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const result: boolean = await this.useCase.remove(id);
    if (result) {
      res.status(200).json({ message: "record removed successfully" });
    } else {
      res.status(404).json({ message: "Not found." });
    }
  }
}
