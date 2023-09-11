import {
  convertStringToFloat,
  convertStringToInt,
} from "../../../../infra/web/controllers/product/helpers";

describe("Testar as funcionalidades de Helpers", () => {
  it("Deve converter uma string em número", () => {
    const valor: string = "1200";

    const valorFormatado = convertStringToFloat(valor);

    expect(typeof valorFormatado).toBe("number");
  });

  it("Deve retornar zero ao tentar converter uma string vazia em número", () => {
    const valor: string = "";

    const valorFormatado = convertStringToFloat(valor);

    expect(valorFormatado).toBe(0);
  });

  it("Deve converter uma string em número decimal", () => {
    const valor: string = "1200";

    const valorFormatado = convertStringToInt(valor);

    expect(typeof valorFormatado).toBe("number");
  });

  it("Deve retornar zero ao tentar converter uma string vazia em número decimal", () => {
    const valor: string = "";

    const valorFormatado = convertStringToInt(valor);

    expect(valorFormatado).toBe(0);
  });
});
