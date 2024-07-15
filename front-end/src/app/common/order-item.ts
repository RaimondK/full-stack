import {Cart} from "./cart";

export class OrderItem {
  imageUrl: string;
  price: number;
  quantity: number;
  productId: number;

  constructor(cart: Cart) {
    this.imageUrl = cart.imageUrl;
    this.quantity = cart.quantity;
    this.price = cart.price;
    this.productId = cart.id;
  }
}
