import {Component, OnInit} from '@angular/core';
import {Cart} from "../../common/cart";
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrl: './cart-details.component.css'
})
export class CartDetailsComponent implements OnInit {
    cartItems: Cart[] = [];
    price: number = 0;
    quantity: number = 0;

    constructor (private cartService: CartService) {}

    ngOnInit(): void {
        this.listCartDetails();
    }

  listCartDetails() {
    this.cartItems = this.cartService.cartItems;

    this.cartService.totalPrice.subscribe(
      data => this.price = data
    );

    this.cartService.totalQuantity.subscribe(
      data => this.quantity = data
    );

    this.cartService.computeCartTotals();
  }

  incrementQuantity(shoppingCart: Cart) {
    this.cartService.addToCart(shoppingCart);
  }

  decrementQuantity(shoppingCart: Cart) {
    this.cartService.decremenetQuantity(shoppingCart);
  }

  remove(shoppingCart: Cart) {
    this.cartService.remove(shoppingCart);
  }
}
