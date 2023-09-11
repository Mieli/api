import IProductRepository from "../../../../app/domain/product/IProductRepository";
import Product from "../../../../app/domain/product/Product";

// Crie um mock para a classe ProductRepositoryMongo
export class MockProductRepositoryMongo implements IProductRepository {
  collection: string = "products";

  async findAll(): Promise<Product[]> {
    return [];
  }

  async findById(id: string): Promise<Product | null> {
    return null;
  }

  async create(product: Product): Promise<Product> {
    return product;
  }

  async update(id: string, updatedProduct: Product): Promise<Product | null> {
    return updatedProduct;
  }

  async remove(id: string): Promise<boolean> {
    return true;
  }
}
