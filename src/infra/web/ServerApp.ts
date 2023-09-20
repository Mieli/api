import cors from "cors";
import express, { Application } from "express";
import apiRoutes from "../routes/apiRoutes";
import { ApolloServer } from "apollo-server-express";
import schema from "./graphql";

export default class ServerApp {
  private readonly app: Application;
  private server: any;
  private serverApollo: ApolloServer;

  constructor() {
    this.app = express();
    this.#configurarMiddlewares();
    this.#configurarRotas();

    this.serverApollo = new ApolloServer({
      schema,
    });

    this.serverApollo.start().then(() => {
      this.serverApollo.applyMiddleware({ app: this.app, path: "/graphql" });
    });
  }

  #configurarMiddlewares(): void {
    this.app.use(cors());
    this.app.use(express.json());
  }

  #configurarRotas(): void {
    this.app.use("/api/v1", apiRoutes);
    this.app.use("/graphql", express.json());
  }

  start(port: string | number): void {
    this.server = this.app.listen(port, () =>
      console.log(`Servidor rodando na porta ${port}`)
    );
  }

  async stop(): Promise<void> {
    if (this.server) {
      this.server.close();
      await this.serverApollo.stop();
      console.log(`Servidor desligado.`);
    }
  }
}
