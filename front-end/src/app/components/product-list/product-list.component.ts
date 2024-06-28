import {Component, OnInit} from '@angular/core';
import {Product} from "../../common/product";
import {ProductService} from "../../services/product.service";
import {ActivatedRoute} from "@angular/router";
import {Cart} from "../../common/cart";
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  currentCategoryName: string = "";
  searchMode: boolean = false;
  pageNumber: number = 1;
  pageSize: number = 5;
  totalElements: number = 0;
  previousKeyword: string = "";


  constructor(private productService: ProductService,
              private cartService: CartService,
              private route: ActivatedRoute,) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {

    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }

  }

  handleListProducts() {
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    } else {
      this.currentCategoryId = 1;
    }

    if (this.previousCategoryId != this.currentCategoryId) {
      this.pageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;
    console.log(`categoryId=${this.currentCategoryId}, pageNumber=${this.pageNumber}`)

    this.productService.getPagination(this.pageNumber - 1, this.pageSize, this.currentCategoryId).subscribe(this.processResult());
    console.log(`Received page: ${this.pageNumber}, size: ${this.pageSize}, total elements: ${this.totalElements}`);
  }

  private handleSearchProducts() {
    const keyword = this.route.snapshot.paramMap.get('keyword')!;

    if (this.previousKeyword != keyword) {
      this.pageNumber = 1;
    }

    this.previousKeyword = keyword;

    console.log(`keyword=${keyword}, pageNumber=${this.pageNumber}`);

    this.productService.getSearchPagination(this.pageNumber - 1, this.pageSize, keyword).subscribe(this.processResult());
    console.log(`Received page: ${this.pageNumber}, size: ${this.pageSize}, total elements: ${this.totalElements}`);
  }

  updatePageSize(pageSize: string) {
    this.pageSize = +pageSize;
    this.pageNumber = 1;
    console.log(`Updating page size to: ${this.pageSize}`);
    this.listProducts();
  }

  processResult() {
    return (data: any) => {
      this.products = data._embedded.products;
      this.pageNumber = data.page.number + 1;
      this.pageSize = data.page.size;
      this.totalElements = data.page.totalElements;
    };
  }

  addToCart(product: Product) {
    console.log(`Adding product to cart: ${product.name}, ${product.price}`);
    const cartItem = new Cart(product);

    this.cartService.addToCart(cartItem);
  }
}
