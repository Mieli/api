import ServerApp from "../../../infra/web/ServerApp";

describe("INTEGRATION servidor", () => {
  const PORT = process.env.PORT_TEST || 3000;
  const baseURL: string = `http://localhost:${PORT}`;
  const server = new ServerApp();

  beforeAll(() => {
    server.start(PORT);
  });

  afterAll(async () => {
    await server.stop();
  });

  it('deve responder com mensagem "bem vindo a API" ', async () => {
    const response = await fetch(`${baseURL}/api/v1/`);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.message).toBe("Bem vindo a API");
  });
});
