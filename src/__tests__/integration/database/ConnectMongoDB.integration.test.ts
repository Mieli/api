import { DatabaseMongo } from "../../../infra/database/DataBaseMongo";

describe("Conexão com o banco de dados", () => {
  beforeAll(async () => {
    // Conecte-se ao banco de dados antes de executar os testes.
    const uri = process.env.DATABASE_URL || "mongodb://localhost:27017";
    await DatabaseMongo.connect(uri);
  });

  afterAll(async () => {
    // Feche a conexão com o banco de dados após os testes.
    await DatabaseMongo.client.close();
  });

  it("deve testar se as variáveis de conexao com o banco de dados foram definidas após a conexao", async () => {
    expect(DatabaseMongo.client).toBeDefined();
    expect(DatabaseMongo.db).toBeDefined();
  });

  it("deve selecionar o banco de dados correto", async () => {
    const dbName = process.env.DATABASE_NAME;
    const selectedDbName = DatabaseMongo.db.databaseName;
    expect(selectedDbName).toBe(dbName);
  });
});
