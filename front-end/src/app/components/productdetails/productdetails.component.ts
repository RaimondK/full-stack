import {Component, OnInit} from '@angular/core';
import {Product} from "../../common/product";
import {ProductService} from "../../services/product.service";
import {ActivatedRoute} from "@angular/router";
import {CartService} from "../../services/cart.service";
import {Cart} from "../../common/cart";

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrl: './productdetails.component.css'
})
export class ProductdetailsComponent implements OnInit {

  product!: Product;

  constructor(private productService: ProductService,
              private cartService: CartService,
              private route: ActivatedRoute) {  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    })
  }

  private handleProductDetails() {
    // @ts-ignore
    const productId: number = +this.route.snapshot.paramMap.get('id');

    this.productService.getProduct(productId).subscribe(
      data => {
        this.product = data;
      }
    )
  }


  addToCart(product: Product) {
    console.log(`Adding to cart: ${this.product.name}, ${this.product.price}`)
    const cartItem = new Cart(this.product);
    this.cartService.addToCart(cartItem);
  }
}
