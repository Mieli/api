import { DatabaseMongo } from "../../../infra/database/DataBaseMongo";

jest.mock("mongodb", () => ({
  MongoClient: jest.fn(() => ({
    db: jest.fn(() => ({
      collection: jest.fn(() => ({
        find: jest.fn(() => ({
          toArray: jest.fn(),
        })),
      })),
    })),
  })),
}));

describe("Testar conexão com o banco de dados", () => {
  it("Testar o metodo de conexao com o banco de dados", async () => {
    await DatabaseMongo.connect();
    expect(DatabaseMongo.client).toBeDefined();
    expect(DatabaseMongo.db).toBeDefined();
  });
});
