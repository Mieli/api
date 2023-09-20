import { MongoClient } from "mongodb";
import Category from "../../../../app/domain/category/Category";
import { DatabaseMongo } from "../../../../infra/database/DataBaseMongo";
import ServerApp from "../../../../infra/web/ServerApp";

async function cadastrarCategory(url: string): Promise<Category> {
  const category = new Category("Utilidades");
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(category),
  });
  const newCategory: Category = await response.json();
  return newCategory;
}

describe("UNIT Categoria", () => {
  const PORT = process.env.PORT_TEST || 3000;
  const baseURL: string = `http://localhost:${PORT}/api/v1`;
  const server = new ServerApp();
  let uri: string;

  beforeAll(async () => {
    uri = process.env.DATABASE_URL || "mongodb://localhost:27017";
    await DatabaseMongo.connect(uri);
    server.start(PORT);
  });

  afterAll(async () => {
    // Feche a conexão com o banco de dados após os testes.
    await DatabaseMongo.client.close();
    await server.stop();

    // dropar a collection de produto
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db(process.env.DATABASE_NAME);
    await db.collection("categories").drop();
    await client.close();
  });

  it("Deve retornar uma lista de categorias", async () => {
    await cadastrarCategory(`${baseURL}/categories`);

    // pesquisar se o cadastro da categoria deu certo
    const response = await fetch(`${baseURL}/categories`, { method: "GET" });
    expect(response.status).toBe(200);

    const data: Category[] = await response.json();
    const quantityExpeded: number = 1;
    expect(data).toBeDefined();
    expect(data.length).toBe(quantityExpeded);
  });

  it("Deve cadastrar uma categoria", async () => {
    const category: Category = await cadastrarCategory(`${baseURL}/categories`);

    // pesquisar se a categoria foi cadastrada
    const resp = await fetch(`${baseURL}/categories/${category.id}`, {
      method: "GET",
    });
    expect(resp.status).toBe(200);

    const data: Category = await resp.json();

    expect(data.name).toBe(category.name);
  });

  it("Deve retornar uma categoria informando o id da categoria", async () => {
    const category: Category = await cadastrarCategory(`${baseURL}/categories`);

    // pesquisar pela categoria informando o id
    const response = await fetch(`${baseURL}/categories/${category.id}`, {
      method: "GET",
    });
    const data: Category = await response.json();
    expect(data.name).toBe(category.name);
  });

  it("Deve atualizar uma categoria informando o id da categoria", async () => {
    const category: Category = await cadastrarCategory(`${baseURL}/categories`);

    //atualizar a categoria
    category.name = "Diversos";

    //atualizar a categoria
    const resp = await fetch(`${baseURL}/categories/${category.id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(category),
    });
    expect(resp.status).toBe(200);

    // pesquisar pela categoria informando o id
    const response = await fetch(`${baseURL}/categories/${category.id}`, {
      method: "GET",
    });
    const data: Category = await response.json();
    expect(data.name).toBe(category.name);
  });

  it("Deve remover uma categoria", async () => {
    const category: Category = await cadastrarCategory(`${baseURL}/categories`);

    const response = await fetch(`${baseURL}/categories/${category.id}`, {
      method: "DELETE",
    });

    expect(response.status).toBe(200);
    const ok = await response.json;
    expect(ok).toBeTruthy();
  });
});
