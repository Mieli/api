import Product from "../../../app/domain/product/Product";
import { ProductService } from "../../../app/services/product/ProductService";
import { ProductUseCase } from "../../../app/usecases/product/ProductUseCase";

describe("INTEGRATION  usecase => produtos", () => {
  let productServiceMock: ProductService;
  let productUseCase: ProductUseCase;

  beforeEach(() => {
    // Crie um mock do ProductService
    productServiceMock = {
      findAll: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    } as unknown as ProductService;

    productUseCase = new ProductUseCase(productServiceMock);
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  it("deve verificar se o método de pesquisar todos os produto do caso de uso foi chamado", async () => {
    await productUseCase.findAll();
    expect(productServiceMock.findAll).toHaveBeenCalled();
  });

  it("deve verificar se o método de pesquisar produto por id  do caso de uso foi chamada", async () => {
    const productId = "some-id";
    await productUseCase.findById(productId);
    expect(productServiceMock.findById).toHaveBeenCalledWith(productId);
  });

  it("deve verificar se o método de criar o produto do caso de uso foi chamada", async () => {
    const productData: Product = {
      name: "Product Name",
      price: 10.99,
      stock: 100,
    };
    await productUseCase.create(productData);
    expect(productServiceMock.create).toHaveBeenCalledWith(productData);
  });

  it("deve verificar se o método de alterar o produto do caso de uso foi chamada", async () => {
    const productId = "1";
    const updatedProductData: Product = {
      name: "Updated Product Name",
      price: 19.99,
      stock: 300,
    };
    await productUseCase.update(productId, updatedProductData);
    expect(productServiceMock.update).toHaveBeenCalledWith(
      productId,
      updatedProductData
    );
  });

  it("deve verificar se o método de remover o produto do caso de uso foi chamada", async () => {
    const productId = "1";
    await productUseCase.remove(productId);
    expect(productServiceMock.remove).toHaveBeenCalledWith(productId);
  });
});
