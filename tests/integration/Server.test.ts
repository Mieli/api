import { describe, it, before, after } from "node:test";

describe("Testar o servidor da aplicação", () => {
  before(() =>
    console.log("executar o metodo before após o início de cada teste")
  );

  after(() =>
    console.log("executar o metodo after após o final de cada teste")
  );
});
