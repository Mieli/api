import { ObjectId } from "mongodb";

import Product from "./../../../../app/domain/product/Product";
import IProductRepository from "../../../../app/domain/product/IProductRepository";
import { DatabaseMongo } from "../../DataBaseMongo";

export class ProductRepositoryMongo implements IProductRepository {
  private collection: string;
  constructor() {
    this.collection = "products";
  }

  async findAll(): Promise<Product[]> {
    return DatabaseMongo.db
      .collection<Product>(this.collection)
      .find({})
      .toArray();
  }
  async findById(id: string): Promise<Product | null> {
    return DatabaseMongo.db
      .collection<Product>(this.collection)
      .findOne({ _id: new ObjectId(id) });
  }
  async create(product: Product): Promise<Product> {
    const result = await DatabaseMongo.db
      .collection<Product>(this.collection)
      .insertOne(product);
    return { ...product, id: result.insertedId.toString() };
  }
  async update(id: string, updatedProduct: Product): Promise<Product | null> {
    const result = await DatabaseMongo.db
      .collection<Product>(this.collection)
      .findOneAndUpdate({ _id: new ObjectId(id) }, { $set: updatedProduct });
    return result;
  }
  async remove(id: string): Promise<boolean> {
    if (!ObjectId.isValid(id)) {
      throw new Error("ID inválido");
    }

    const result = await DatabaseMongo.db
      .collection<Product>(this.collection)
      .deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount === 1;
  }
}
