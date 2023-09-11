import supertest from "supertest";
import express, { Request, Response } from "express";
import { ProductController } from "../../../infra/web/controllers/product/ProductController";
import { ProductUseCase } from "../../../app/usecases/product/ProductUseCase";
import { ProductService } from "../../../app/services/product/ProductService";
import { ProductRepositoryMongo } from "../../../infra/database/repositories/product/ProductRepositoryMongo";

function createDependencies() {
  const product1 = { id: "1", name: "Product 1", price: 10.0, stock: 100 };
  const product2 = { id: "2", name: "Product 2", price: 20.0, stock: 50 };

  return { product1, product2 };
}

describe("Testar a API de produtos", () => {
  let productController: ProductController;
  let app: express.Express;
  let request: supertest.SuperTest<supertest.Test>;

  beforeAll(() => {
    const repository = new ProductRepositoryMongo();
    const service = new ProductService(repository);
    const usecase = new ProductUseCase(service);
    productController = new ProductController(usecase);

    app = express();
    app.use(express.json());
    app.get("/products", (req: Request, res: Response) =>
      productController.getAllProducts(req, res)
    );
    app.get("/products/:id", (req: Request, res: Response) =>
      productController.getProductById(req, res)
    );
    app.post("/products", (req: Request, res: Response) =>
      productController.createProduct(req, res)
    );
    app.put("/products/:id", (req: Request, res: Response) =>
      productController.updateProduct(req, res)
    );
    app.delete("/products/:id", (req: Request, res: Response) =>
      productController.deleteProduct(req, res)
    );
    request = supertest(app);
  });

  it("Deve exibir a lista de todos produtos", async () => {
    const { product1, product2 } = createDependencies();
    jest
      .spyOn(productController["useCase"], "findAll")
      .mockResolvedValue([product1, product2]);

    const response = await request.get("/products");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([product1, product2]);
  });

  it("Deve exibir o produto com o id informado", async () => {
    const productId = "1";
    const { product1 } = createDependencies();
    jest
      .spyOn(productController["useCase"], "findById")
      .mockResolvedValue(product1);

    const response = await request.get(`/products/${productId}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(product1);
  });

  it("Deve exibir uma mensagem de erro ao tentar buscar um produto informando o id do produto inexistente", async () => {
    const productId = "100";
    jest
      .spyOn(productController["useCase"], "findById")
      .mockResolvedValue(null);

    const response = await request.get(`/products/${productId}`);
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: "Not found." });
  });

  it("should create a product", async () => {
    const newProduct = { name: "New Product", price: 15.0, stock: 75 };
    // Mock the ProductUseCase create method to return the created product
    jest
      .spyOn(productController["useCase"], "create")
      .mockResolvedValue({ id: "3", ...newProduct });

    const response = await request.post("/products").send(newProduct);

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ id: "3", ...newProduct });
  });

  it("should update a product", async () => {
    const productId = "1";
    const updatedProduct = { name: "Updated Product", price: 12.0, stock: 90 };
    // Mock the ProductUseCase update method to return the updated product
    jest
      .spyOn(productController["useCase"], "update")
      .mockResolvedValue({ id: productId, ...updatedProduct });

    const response = await request
      .put(`/products/${productId}`)
      .send(updatedProduct);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ id: productId, ...updatedProduct });
  });

  it("deve devolver uma mensagem de erro ao tentar atualizar um produto com id errado", async () => {
    const productId = "1500";

    // Mock the ProductUseCase update method to return the updated product
    jest.spyOn(productController["useCase"], "update").mockResolvedValue(null);

    const response = await request.put(`/products/${productId}`).send({});

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: "Not found." });
  });

  it("deve deletar um product", async () => {
    const productId = "1";
    // Mock the ProductUseCase remove method to return true indicating success
    jest.spyOn(productController["useCase"], "remove").mockResolvedValue(true);

    const response = await request.delete(`/products/${productId}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "record removed successfully" });
  });

  it("deve devolver uma mesagem de erro ao tentar deletar um produto com o id errado", async () => {
    const productId = "600";
    // Mock the ProductUseCase remove method to return true indicating success
    jest.spyOn(productController["useCase"], "remove").mockResolvedValue(false);

    const response = await request.delete(`/products/${productId}`);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: "Not found." });
  });
});
