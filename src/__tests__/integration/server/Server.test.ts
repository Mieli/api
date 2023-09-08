import ServerApp from "../../../infra/web/ServerApp";

describe("Testar o servidor da aplicação", () => {
  let server: ServerApp;
  let baseURL: string;
  let PORT: number;

  beforeAll(() => {
    PORT = 3000;
    server = new ServerApp();
    server.start(PORT);
    baseURL = `http://localhost:${PORT}`;
  });

  afterAll(() => {
    server.stop();
  });

  it('deve responder com mensagem "bem vindo a API" ', async () => {
    const response = await fetch(`${baseURL}/api/v1`);
    expect(response.status).toBe(200);

    const data = await response.json();
    expect(data.message).toBe("Bem vindo a API");
  });

  it("deve responder com status 404 em uma rota desconhecida", async () => {
    const response = await fetch(`${baseURL}/rota-desconhecida`);
    expect(response.status).toBe(404);

    const data = await response.json();
    expect(data.message).toBe("Rota não encontrada");
  });
});
