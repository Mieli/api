import cors from "cors";
import express, { Application, Request, Response } from "express";
import apiRoutes from "../routes/apiRoutes";

export default class ServerApp {
  private readonly app: Application;
  private server: any;

  constructor() {
    this.app = express();
    this.#configurarMiddlewares();
    this.#configurarRotas();
  }

  #configurarMiddlewares(): void {
    this.app.use(cors());
    this.app.use(express.json());
  }

  #configurarRotas(): void {
    this.app.use("/api/v1", apiRoutes);
  }

  start(port: string | number): void {
    this.server = this.app.listen(port, () =>
      console.log(`Servidor rodando na porta ${port}`)
    );
  }

  stop(): void {
    if (this.server) {
      this.server.close();
      console.log(`Servidor desligado.`);
    }
  }
}
