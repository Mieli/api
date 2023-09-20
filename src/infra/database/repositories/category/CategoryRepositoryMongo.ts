import { ObjectId } from "mongodb";

import Category from "./../../../../app/domain/category/Category";
import { DatabaseMongo } from "../../DataBaseMongo";
import ICategoryRepository from "../../../../app/domain/category/ICategoryRepository";

export class CategoryRepositoryMongo implements ICategoryRepository {
  private collection: string;
  constructor() {
    this.collection = "categories";
  }

  async findAll(): Promise<Category[]> {
    return DatabaseMongo.db
      .collection<Category>(this.collection)
      .find({})
      .toArray();
  }
  async findById(id: string): Promise<Category | null> {
    return DatabaseMongo.db
      .collection<Category>(this.collection)
      .findOne({ _id: new ObjectId(id) });
  }
  async create(Category: Category): Promise<Category> {
    const result = await DatabaseMongo.db
      .collection<Category>(this.collection)
      .insertOne(Category);
    return { ...Category, id: result.insertedId.toString() };
  }
  async update(
    id: string,
    updatedCategory: Category
  ): Promise<Category | null> {
    const result = await DatabaseMongo.db
      .collection<Category>(this.collection)
      .findOneAndUpdate({ _id: new ObjectId(id) }, { $set: updatedCategory });
    return result;
  }
  async remove(id: string): Promise<boolean> {
    if (!ObjectId.isValid(id)) {
      throw new Error("ID inválido");
    }

    const result = await DatabaseMongo.db
      .collection<Category>(this.collection)
      .deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount === 1;
  }
}
