import { MongoMemoryServer } from "mongodb-memory-server";
import { ProductRepositoryMongo } from "../../../infra/database/repositories/product/ProductRepositoryMongo";
import { DatabaseMongo } from "../../../infra/database/DataBaseMongo";
import Product from "../../../app/domain/product/Product";

// Inicializa o servidor de memória MongoDB
const mongod = MongoMemoryServer.create();

// Variável para armazenar a instância do repositório
let productRepository: ProductRepositoryMongo;

beforeAll(async () => {
  // Obtém a URI de conexão para o banco de dados temporário
  const uri: string = (await mongod).getUri();

  // Inicializa a conexão com o banco de dados temporário
  await DatabaseMongo.connect(uri);

  // Cria uma instância do repositório
  productRepository = new ProductRepositoryMongo();
});

afterAll(async () => {
  // Fecha a conexão com o banco de dados temporário e para o servidor MongoDB em memória
  await DatabaseMongo.close();
  (await mongod).stop();
});

describe("INTEGRATION  repository => produtos", () => {
  it("deve retornar uma lista de produtos", async () => {
    // Cria um novo produto
    for (let i = 1; i <= 3; i++) {
      const newProduct: Product = {
        name: `Test Product-${i}`,
        price: 10.99 * (i * 2),
        stock: 100 * (i * 2),
      };

      // Insere o produto no banco de dados
      const createdProduct: Product =
        await productRepository.create(newProduct);
      // Verifica se o produto foi criado corretamente
      expect(createdProduct.id).toBeDefined();
    }

    const listProducts: Product[] = await productRepository.findAll();

    expect(listProducts.length).toBe(3);
  });

  it("deve retornar um produto informando o id do produto", async () => {
    let idFisrProduct: string | undefined = "";

    // Cria um novo produto
    for (let i = 1; i <= 3; i++) {
      const newProduct: Product = {
        name: `Test Product-${i}`,
        price: 10.99 * (i * 2),
        stock: 100 * (i * 2),
      };

      // Insere o produto no banco de dados
      const createdProduct: Product =
        await productRepository.create(newProduct);

      if (i === 1) {
        idFisrProduct = createdProduct.id;
      }
      // Verifica se o produto foi criado corretamente
      expect(createdProduct.id).toBeDefined();
    }

    if (idFisrProduct) {
      const product: Product | null =
        await productRepository.findById(idFisrProduct);
      expect(product).toBeDefined();
    }
  });

  it("deve criar um novo produto ", async () => {
    // Cria um novo produto
    const newProduct: Product = {
      name: "Test Product",
      price: 10.99,
      stock: 100,
    };

    // Insere o produto no banco de dados
    const createdProduct: Product = await productRepository.create(newProduct);

    // Verifica se o produto foi criado corretamente
    expect(createdProduct.id).toBeDefined();

    // Obtém o produto pelo ID
    const id: string = createdProduct.id || "";
    const retrievedProduct = await productRepository.findById(id);

    // Verifica se o produto foi recuperado corretamente
    expect(retrievedProduct).toEqual({
      _id: createdProduct.id,
      ...newProduct,
    });
  });

  it("deve atualizar um produto informando o id", async () => {
    let idFisrProduct: string | undefined = "";

    // Cria um novo produto
    for (let i = 1; i <= 3; i++) {
      const newProduct: Product = {
        name: `Test Product-${i}`,
        price: 10.99 * (i * 2),
        stock: 100 * (i * 2),
      };

      // Insere o produto no banco de dados
      const createdProduct: Product =
        await productRepository.create(newProduct);

      if (i === 1) {
        idFisrProduct = createdProduct.id;
      }
      // Verifica se o produto foi criado corretamente
      expect(createdProduct.id).toBeDefined();
    }

    if (idFisrProduct) {
      const updateProd: Product = {
        name: `Test Product-1`,
        price: 100,
        stock: 500,
      };
      const updatedProduct = await productRepository.update(
        idFisrProduct,
        updateProd
      );

      if (updatedProduct?.id) {
        // consultar no banco de dados o produto atualizado
        const prodAtualizado = await productRepository.findById(
          updatedProduct?.id
        );
        expect(prodAtualizado).toMatchObject(updateProd);
      }
    }
  });

  it("deve remover um produto informando o id", async () => {
    let idFisrProduct: string | undefined = "";

    // Cria um novo produto
    for (let i = 1; i <= 3; i++) {
      const newProduct: Product = {
        name: `Test Product-${i}`,
        price: 10.99 * (1 * 2),
        stock: 100 * (1 * 2),
      };

      // Insere o produto no banco de dados
      const createdProduct: Product =
        await productRepository.create(newProduct);

      if (i === 1) {
        idFisrProduct = createdProduct.id;
      }
      // Verifica se o produto foi criado corretamente
      expect(createdProduct.id).toBeDefined();
    }

    if (idFisrProduct) {
      expect(await productRepository.remove(idFisrProduct)).toBeTruthy();
    }
  });
});
