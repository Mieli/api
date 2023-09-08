import { configParams } from "../../../../infra/routes/product/configParams";

describe("Testar a inicialização dos parametros necessários para criar o controller usado na rota de produto", () => {
  it("verificar se o controlle foi criado com sucesso.", () => {
    const controller = configParams();
    expect(controller).toBeDefined();
  });
});
