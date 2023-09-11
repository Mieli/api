import { MongoClient as Mongo, Db } from "mongodb";

export const DatabaseMongo = {
  client: undefined as unknown as Mongo,
  db: undefined as unknown as Db,

  async connect(uri: string): Promise<void> {
    this.client = new Mongo(uri);
    this.db = this.client.db(process.env.DATABASE_NAME);
  },

  async close(): Promise<void> {
    if (this.client) {
      await this.client.close();
    }
  },
};
