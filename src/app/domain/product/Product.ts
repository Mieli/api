export default class Product {
  id?: string;
  name: string;
  price: number;
  stock: number;

  constructor(id: string, name: string, price: number, stock: number) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.stock = stock;
  }
}
