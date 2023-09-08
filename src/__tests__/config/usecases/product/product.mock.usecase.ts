import IProductRepository from "../../../../app/domain/product/IProductRepository";
import Product from "../../../../app/domain/product/Product";

export class ProductMockUseCase implements IProductRepository {
  private products: Product[] = [];

  findAll(): Promise<Product[]> {
    return Promise.resolve(this.products);
  }
  findById(id: string): Promise<Product | null> {
    const product = this.products.find((product) => product.id === id);
    if (product) {
      return Promise.resolve(product);
    } else {
      return Promise.reject(null);
    }
  }
  create(product: Product): Promise<Product> {
    this.products.push(product);
    return Promise.resolve(product);
  }
  update(id: string, updatedProduct: Product): Promise<Product | null> {
    this.products.map((product) => {
      if (product.id != id) {
        product.id = updatedProduct.id;
        product.name = updatedProduct.name;
        product.price = updatedProduct.price;
        product.stock = updatedProduct.stock;
        return product;
      }
    });
    return Promise.resolve(updatedProduct);
  }

  remove(id: string): Promise<boolean> {
    this.products.map((product) => product.id != id);
    return Promise.resolve(true);
  }
}
