import express, { Request, Response } from "express";
import { CategoryController } from "../../../infra/web/controllers/category/CategoryController";
import supertest from "supertest";
import { CategoryRepositoryMongo } from "../../../infra/database/repositories/category/CategoryRepositoryMongo";
import { CategoryService } from "../../../app/services/category/CategoryService";
import { CategoryUseCase } from "../../../app/usecases/category/CategoryUseCase";

function createMockDependencies() {
  const category1 = { id: "1", name: "Utilidades" };
  const category2 = { id: "2", name: "Diversos" };

  return { category1, category2 };
}

describe("INTEGRATION controller => categorias", () => {
  let categoryController: CategoryController;
  let app: express.Express;
  let request: supertest.SuperTest<supertest.Test>;

  beforeAll(() => {
    const repository: CategoryRepositoryMongo = new CategoryRepositoryMongo();
    const service: CategoryService = new CategoryService(repository);
    const usecase: CategoryUseCase = new CategoryUseCase(service);
    categoryController = new CategoryController(usecase);

    app = express();
    app.use(express.json());
    app.get("/categories", (req: Request, res: Response) =>
      categoryController.getAllCategories(req, res)
    );
    app.get("/categories/:id", (req: Request, res: Response) =>
      categoryController.getCategoryById(req, res)
    );
    app.post("/categories", (req: Request, res: Response) =>
      categoryController.createCategory(req, res)
    );
    app.put("/categories/:id", (req: Request, res: Response) =>
      categoryController.updateCategory(req, res)
    );
    app.delete("/categories/:id", (req: Request, res: Response) =>
      categoryController.deleteCategory(req, res)
    );

    request = supertest(app);
  });

  it("Deve exibir uma lista de categorias ", async () => {
    const { category1, category2 } = createMockDependencies();
    jest
      .spyOn(categoryController["useCase"], "findAll")
      .mockResolvedValue([category1, category2]);

    const response = await request.get("/categories");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([category1, category2]);
  });

  it("Deve exibir a categoria informando o id", async () => {
    const categoryId = "1";
    const { category1 } = createMockDependencies();

    jest
      .spyOn(categoryController["useCase"], "findById")
      .mockResolvedValue(category1);

    const response = await request.get(`/categories/${categoryId}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(category1);
  });

  it("Deve exibir uma mensagem de erro ao tentar buscar uma categoria informando o id inexistente", async () => {
    const categoryId = "100";
    jest
      .spyOn(categoryController["useCase"], "findById")
      .mockResolvedValue(null);

    const response = await request.get(`/categories/${categoryId}`);
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: "Not found." });
  });

  it("deve criar uma categoria", async () => {
    const newCategory = { name: "Informática" };

    jest
      .spyOn(categoryController["useCase"], "create")
      .mockResolvedValue({ id: "3", ...newCategory });

    const response = await request.post("/categories").send(newCategory);

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ id: "3", ...newCategory });
  });

  it("deve atualizar uma categoria informando o id", async () => {
    const categoryId = "1";
    const updatedCategory = {
      name: "Categoria Atualizada",
      price: 12.0,
      stock: 90,
    };
    jest
      .spyOn(categoryController["useCase"], "update")
      .mockResolvedValue({ id: categoryId, ...updatedCategory });

    const response = await request
      .put(`/categories/${categoryId}`)
      .send(updatedCategory);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ id: categoryId, ...updatedCategory });
  });

  it("deve devolver uma mensagem de erro ao tentar atualizar uma categoria com id errado", async () => {
    const categoryId = "1500";

    jest.spyOn(categoryController["useCase"], "update").mockResolvedValue(null);

    const response = await request.put(`/categories/${categoryId}`).send({});

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: "Not found." });
  });

  it("deve deletar uma categoria", async () => {
    const categoryId = "1";
    // Mock the ProductUseCase remove method to return true indicating success
    jest.spyOn(categoryController["useCase"], "remove").mockResolvedValue(true);

    const response = await request.delete(`/categories/${categoryId}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "record removed successfully" });
  });

  it("deve devolver uma mesagem de erro ao tentar deletar uma categoria com o id errado", async () => {
    const categoryId = "600";
    // Mock the ProductUseCase remove method to return true indicating success
    jest
      .spyOn(categoryController["useCase"], "remove")
      .mockResolvedValue(false);

    const response = await request.delete(`/categories/${categoryId}`);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: "Not found." });
  });
});
