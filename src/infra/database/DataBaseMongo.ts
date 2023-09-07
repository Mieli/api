import { MongoClient as Mongo, Db } from "mongodb";

export const DatabaseMongo = {
  client: undefined as unknown as Mongo,
  db: undefined as unknown as Db,

  async connect(): Promise<void> {
    const url = process.env.MONGODB_URL || "mongodb://localhost:27017";

    const client = new Mongo(url);
    const db = client.db("api-rest");

    this.client = client;
    this.db = db;
  },
};
