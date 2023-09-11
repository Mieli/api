describe("Testar o servidor da aplicação", () => {
  let baseURL: string;

  beforeAll(() => {
    baseURL = `http://localhost:3000`;
  });

  afterAll(() => {});

  it('deve responder com mensagem "bem vindo a API" ', async () => {
    const response = await fetch(`${baseURL}/api/v1`);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.message).toBe("Bem vindo a API");
  });

  it("deve responder com status 404 em uma rota desconhecida", async () => {
    const response = await fetch(`${baseURL}/rota-desconhecida`);
    const data = await response.json();

    expect(response.status).toBe(404);
    expect(data.message).toBe("Rota não encontrada");
  });
});
