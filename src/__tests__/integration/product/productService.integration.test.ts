import Product from "../../../app/domain/product/Product";
import { ProductService } from "../../../app/services/product/ProductService";
import { ProductRepositoryMongo } from "../../../infra/database/repositories/product/ProductRepositoryMongo";

describe("ProductService", () => {
  let productRepositoryMock: ProductRepositoryMongo;
  let productServiceMock: ProductService;
  beforeEach(() => {
    // Crie um mock do ProductRepository
    productRepositoryMock = {
      findAll: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    } as unknown as ProductRepositoryMongo;

    // Crie uma instância do productService usando o mock do ProductService
    productServiceMock = new ProductService(productRepositoryMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("deve verificar se o método de pesquisar todos os produto do caso de uso foi chamada", async () => {
    await productServiceMock.findAll();
    expect(productRepositoryMock.findAll).toHaveBeenCalled();
  });

  it("deve verificar se o método de pesquisar produto por id  do caso de uso foi chamada", async () => {
    const productId = "1";
    await productServiceMock.findById(productId);
    expect(productRepositoryMock.findById).toHaveBeenCalledWith(productId);
  });

  it("deve verificar se o método de criar o produto do caso de uso foi chamada", async () => {
    const productData: Product = {
      name: "Product Name",
      price: 10.99,
      stock: 100,
    };
    await productServiceMock.create(productData);
    expect(productRepositoryMock.create).toHaveBeenCalledWith(productData);
  });

  it("deve verificar se o método de alterar o produto do caso de uso foi chamada", async () => {
    const productData: Product = {
      name: "Product Name",
      price: 10.99,
      stock: 100,
    };
    await productServiceMock.create(productData);
    expect(productRepositoryMock.create).toHaveBeenCalledWith(productData);

    const updatedProductData: Product = {
      name: "Updated Product Name",
      price: 19.99,
      stock: 300,
    };

    await productServiceMock.update("1", updatedProductData);
    expect(productRepositoryMock.update).toHaveBeenCalledWith(
      "1",
      updatedProductData
    );
  });

  it("deve verificar se o método de remover o produto do caso de uso foi chamada", async () => {
    const productId = "1";
    await productServiceMock.remove(productId);
    expect(productRepositoryMock.remove).toHaveBeenCalledWith(productId);
  });
});
