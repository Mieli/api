import cors from "cors";
import express, { Express, Request, Response } from "express";
import apiRoutes from "../routes/apiRoutes";

export default class ServerApp {
  private readonly app: Express;

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

    this.app.use("/", (req: Request, res: Response) => {
      res.status(200).json({ message: "bem vindo a API" });
    });
  }

  start(port: string | number): void {
    this.app.listen(port, () =>
      console.log(`Servidor rodando na porta ${port}`)
    );
  }
}
