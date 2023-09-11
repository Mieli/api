import { ProductRepositoryMongo } from "../../../infra/database/repositories/product/ProductRepositoryMongo";
import Product from "../../domain/product/Product";

export class ProductService {
  private repository: ProductRepositoryMongo;

  constructor(repository: ProductRepositoryMongo) {
    this.repository = repository;
  }

  async findAll(): Promise<Product[]> {
    return this.repository.findAll();
  }
  async findById(id: string): Promise<Product | null> {
    return this.repository.findById(id);
  }
  async create(product: Product): Promise<Product> {
    return this.repository.create(product);
  }
  async update(id: string, updatedProduct: Product): Promise<Product | null> {
    return this.repository.update(id, updatedProduct);
  }
  async remove(id: string): Promise<boolean> {
    return this.repository.remove(id);
  }
}
