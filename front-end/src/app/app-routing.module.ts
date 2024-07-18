import {Injector, NgModule} from '@angular/core';
import {Router, RouterModule, Routes} from '@angular/router';
import {ProductListComponent} from "./components/product-list/product-list.component";
import {ProductdetailsComponent} from "./components/productdetails/productdetails.component";
import {CartDetailsComponent} from "./components/cart-details/cart-details.component";
import {CheckoutComponent} from "./components/checkout/checkout.component";
import {OktaAuthModule, OktaCallbackComponent, OKTA_CONFIG, OktaAuthGuard} from '@okta/okta-angular';
import {OktaAuth} from '@okta/okta-auth-js';
import { LoginComponent } from './components/login/login.component';
import { VipDiscountsComponent } from './components/vip-discounts/vip-discounts.component';

const routes: Routes = [
  {path: 'vip', component: VipDiscountsComponent, canActivate: [OktaAuthGuard], data: {onAuthRequired: sendToLoginPage}},
  {path: 'login/callback', component: OktaCallbackComponent},
  {path: 'login', component: LoginComponent},
  {path: 'checkout', component: CheckoutComponent},
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

function sendToLoginPage(oktaAuth: OktaAuth, injector: Injector) {
  const router = injector.get(Router);
  router.navigate(['/login']);
}
