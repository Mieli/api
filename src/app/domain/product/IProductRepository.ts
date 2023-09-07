import Product from "./Product";

export default interface IProductRepository {
  findAll(): Promise<Product[]>;
  findById(id: string): Promise<Product | null>;
  create(product: Product): Promise<Product>;
  update(id: string, updatedProduct: Product): Promise<Product | null>;
  remove(id: string): Promise<boolean>;
}
