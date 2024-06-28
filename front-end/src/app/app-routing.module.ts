import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductListComponent} from "./components/product-list/product-list.component";
import {ProductdetailsComponent} from "./components/productdetails/productdetails.component";
import {CartDetailsComponent} from "./components/cart-details/cart-details.component";

const routes: Routes = [
  {path: 'cart-details', component: CartDetailsComponent},
  {path: 'products/:id', component: ProductdetailsComponent},
  {path: 'category/:id/:name', component: ProductListComponent},
  {path: 'search/:keyword', component: ProductListComponent},
  {path: 'category', component: ProductListComponent},
  {path: 'products', component: ProductListComponent},
  {path: '', redirectTo: '/products', pathMatch: 'full'},
  {path: '**', redirectTo: '/products', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
