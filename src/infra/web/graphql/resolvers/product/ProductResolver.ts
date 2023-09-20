import Product from "../../../../../app/domain/product/Product";
import { ProductService } from "../../../../../app/services/product/ProductService";
import { ProductUseCase } from "../../../../../app/usecases/product/ProductUseCase";
import { ProductRepositoryMongo } from "../../../../database/repositories/product/ProductRepositoryMongo";

const repository = new ProductRepositoryMongo();
const service: ProductService = new ProductService(repository);
const productUseCase: ProductUseCase = new ProductUseCase(service);

const productResolver = {
  Query: {
    getProduct: (_: any, { id }: any) => {
      return productUseCase.findById(id);
    },
    getAllProducts: async () => {
      return productUseCase.findAll();
    },
  },
  Mutation: {
    createProduct: (_: any, args: any) => {
      const { name, price, stock } = args;
      const createProduct: Product = new Product(name, price, stock);
      return productUseCase.create(createProduct);
    },
    updateProduct: async (_: any, args: any) => {
      const { id, name, price, stock } = args;
      const product: Product = new Product(name, price, stock);
      const updatedProduct = await productUseCase.update(id, product);
      return { ...updatedProduct, ...product };
    },
    deleteProduct: (_: any, { id }: any) => {
      return productUseCase.remove(id);
    },
  },
};

export default productResolver;
