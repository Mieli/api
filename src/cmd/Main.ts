import { config } from "dotenv";
import { DatabaseMongo } from "../infra/database/DataBaseMongo";
import ServerApp from "../infra/web/ServerApp";

const main = async () => {
  const envPath = process.env.NODE_ENV === "test" ? ".env.test" : ".env";
  config({ path: envPath });

  const uri = process.env.DATABASE_URL || "mongodb://localhost:27017";
  DatabaseMongo.connect(uri)
    .then(() => {
      const PORT = process.env.PORT || 3000;

      const server = new ServerApp();

      server.start(PORT);
    })
    .catch((error) => console.log(error));
};

main();
