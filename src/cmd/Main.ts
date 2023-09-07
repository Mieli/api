import { config } from "dotenv";
import { DatabaseMongo } from "../infra/database/DataBaseMongo";
import ServerApp from "../infra/web/ServerApp";

const main = async () => {
  config();

  DatabaseMongo.connect()
    .then(() => {
      const PORT = process.env.PORT || 3000;

      const server = new ServerApp();

      server.start(PORT);
    })
    .catch((error) => console.log(error));
};

main();
