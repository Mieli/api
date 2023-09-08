import { Request, Response } from "express";
import Product from "../../../app/domain/product/Product";
import { ProductController } from "../../../infra/web/controllers/product/ProductController";
import { ProductMockUseCase } from "../../config/usecases/product/product.mock.usecase";
import { ProductUseCase } from "../../../app/usecases/product/ProductUseCase";

describe("Testar a API de produtos", () => {
  const mockRequest = {} as Request;
  const mockResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as unknown as Response;

  let db: any;

  it("Deve cadastrar um produto", async () => {
    const mockProduct: Product = new Product("Produto Teste", 250, 100);

    const mockProductUseCase: ProductMockUseCase = new ProductMockUseCase();

    const controller: ProductController = new ProductController(
      mockProductUseCase as unknown as ProductUseCase
    );

    mockRequest.body = mockProduct;

    await controller.createProduct(mockRequest, mockResponse);

    const data = mockResponse.json;

    console.log({ data });
  });
});
