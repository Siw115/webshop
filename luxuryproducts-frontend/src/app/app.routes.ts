import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { authGuard } from './auth/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrdersComponent } from './dashboard/orders/orders.component';
import { NewAddressComponent } from './new-address/new-address.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { VariantEditComponent } from "./dashboard/variants/variant-edit/variant-edit.component";
import {VariantListComponent} from "./dashboard/variants/variant-list.component";

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'products', component: ProductsComponent},
    {path: 'product-details/:id', component: ProductDetailsComponent},
    {path: 'cart', component: CartComponent},
    {path: 'profile', component: ProfileComponent, canActivate: [authGuard]},
    {path: 'auth/login', component: LoginComponent},
    {path: 'auth/register', component: RegisterComponent},
    {path: 'dashboard', component: DashboardComponent, canActivate: [authGuard]},
    {path: 'dashboard/orders', component: OrdersComponent, canActivate: [authGuard]},
    { path: 'dashboard/variants', component: VariantListComponent },
    { path: 'variants/new', component: VariantEditComponent },
    { path: 'variants/:id/edit', component: VariantEditComponent },
    {path: 'address', component: NewAddressComponent, canActivate: [authGuard]}
    // {path: '**', redirectTo: '/home' }, // Handle other unknown routes by redirecting to homepage
];
