import ServerApp from "../../../infra/web/ServerApp";

describe("Testar o servidor da aplicação", () => {
  const PORT: number = 3000;
  const baseURL: string = `http://localhost:${PORT}`;
  const server = new ServerApp();

  beforeAll(() => {
    server.start(PORT);
  });

  afterAll(() => {
    server.stop();
  });

  it('deve responder com mensagem "bem vindo a API" ', async () => {
    const response = await fetch(`${baseURL}/api/v1/`);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.message).toBe("Bem vindo a API");
  });
});
