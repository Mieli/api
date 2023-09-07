import Product from "../../domain/product/Product";
import { ProductService } from "../../services/product/ProductService";

export class ProductUseCase {
  private service: ProductService;

  constructor(service: ProductService) {
    this.service = service;
  }

  async findAll(): Promise<Product[]> {
    return this.service.findAll();
  }

  async findById(id: string): Promise<Product | null> {
    return this.service.findById(id);
  }

  async create(product: Product): Promise<Product> {
    return this.service.create(product);
  }

  async update(id: string, updatedProduct: Product): Promise<Product | null> {
    return this.service.update(id, updatedProduct);
  }

  async remove(id: string): Promise<boolean> {
    return this.service.remove(id);
  }
}
