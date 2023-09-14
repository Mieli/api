import { MongoClient } from "mongodb";
import Product from "../../../../app/domain/product/Product";
import { DatabaseMongo } from "../../../../infra/database/DataBaseMongo";
import ServerApp from "../../../../infra/web/ServerApp";

async function cadastrarProduto(): Promise<Product> {
  const product = new Product("Produto teste 1", 250, 100);
  const responseAdd = await fetch(`http://localhost:3000/api/v1/products`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(product),
  });
  const newProduct: Product = await responseAdd.json();
  return newProduct;
}

describe("Testar as rotas do produto", () => {
  const PORT: number = 3000;
  const baseURL: string = `http://localhost:${PORT}/api/v1`;
  const server = new ServerApp();
  let uri: string;
  beforeEach(async () => {
    uri = process.env.DATABASE_URL || "mongodb://localhost:27017";
    await DatabaseMongo.connect(uri);
    server.start(PORT);
  });

  afterEach(async () => {
    // Feche a conexão com o banco de dados após os testes.
    await DatabaseMongo.client.close();
    server.stop();

    // dropar a collection de produto
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db(process.env.DATABASE_NAME);
    await db.collection("products").drop();
    await client.close();
  });

  // Teste para a rota POST '/'
  it("Deve criar um novo produto", async () => {
    const product = await cadastrarProduto();
    const response = await fetch(`${baseURL}/products`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(product),
    });
    expect(response.status).toBe(201);

    const createdProduct: Product = await response.json();

    expect(createdProduct.name).toBe(product.name);
    expect(createdProduct.price).toBe(product.price);
    expect(createdProduct.stock).toBe(product.stock);
  });

  it("Deve buscar todos os produtos com sucesso", async () => {
    for (let i: number = 0; i < 3; i++) {
      await cadastrarProduto();
    }
    const response = await fetch(`${baseURL}/products`, { method: "GET" });
    expect(response.status).toBe(200);
    const data: Product[] = await response.json();

    expect(data.length).toBe(3);
  });

  // Teste para a rota GET '/:id'
  it("Deve buscar um produto por ID com sucesso", async () => {
    const product = cadastrarProduto();
    const productId = (await product).id;
    const response = await fetch(`${baseURL}/products/${productId}`, {
      method: "GET",
    });
    expect(response.status).toBe(200);
  });

  // Teste para a rota PUT '/:idParams'
  it("Deve atualizar um produto existente com sucesso", async () => {
    let product = await cadastrarProduto();
    product.name = "Produto atualizado";
    product.price = 350;
    product.stock = 900;
    const productId = product.id;

    const response = await fetch(`${baseURL}/products/${productId}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(product),
    });
    expect(response.status).toBe(200);
  });

  // Teste para a rota DELETE '/:id'
  it("Deve excluir um produto existente com sucesso", async () => {
    const product = await cadastrarProduto();
    const productId = product.id;
    const response = await fetch(`${baseURL}/products/${productId}`, {
      method: "DELETE",
    });
    expect(response.status).toBe(200);
  });
});
