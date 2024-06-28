import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import { Cart } from '../common/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: Cart[] = [];

  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() { }

  addToCart(cartItem: Cart) {
    let existingCartItem = this.cartItems.find(tempCartItem => tempCartItem.id === cartItem.id);

    // if (this.cartItem.length > 0 {
    if (existingCartItem) {
      existingCartItem.quantity++;
    } else {
      this.cartItems.push(cartItem);
    }

    this.computeCartTotals();
  }

  computeCartTotals() {
    let priceValue: number = 0;
    let quantityValue: number = 0;

      for (let cartItem of this.cartItems) {
        priceValue += cartItem.quantity * cartItem.price;
        quantityValue += cartItem.quantity;
      }

      this.totalPrice.next(priceValue);
      this.totalQuantity.next(quantityValue);

      this.logCartData(priceValue, quantityValue);
  }

  logCartData(totalPrice: number, totalQuantity: number) {
    console.log('Logging the contents of the cart');
    for (let cartItem of this.cartItems) {
      const subTotal = cartItem.quantity * cartItem.price;
      console.log(`name: ${cartItem.name}, quantity: ${cartItem.quantity}, price: ${cartItem.price}, subTotal: ${subTotal}`);
    }
    console.log(`Total price: ${totalPrice.toFixed(2)}, Total Quantity: ${totalQuantity}`);
    console.log(`--------------------------------------------`);
  }
}
