import { ProductService } from "../../../app/services/product/ProductService";
import { ProductUseCase } from "../../../app/usecases/product/ProductUseCase";
import { ProductRepositoryMongo } from "../../database/repositories/product/ProductRepositoryMongo";
import { ProductController } from "../../web/controllers/product/ProductController";

export function configParams() {
  const repository = new ProductRepositoryMongo();
  const service: ProductService = new ProductService(repository);
  const useCase: ProductUseCase = new ProductUseCase(service);
  const controller = new ProductController(useCase);

  return controller;
}
