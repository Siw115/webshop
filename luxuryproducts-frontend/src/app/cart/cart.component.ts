import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';
import { CartItem } from '../models/cartitem.model';
import { OrderService } from '../services/order.service';
import { TokenService } from '../auth/token.service';
import { UserService } from '../services/user.service';
import { CustomUser } from '../models/customuser.model';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {NewAddressComponent} from "../new-address/new-address.component";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-cart',
  standalone: true,
  templateUrl: './cart.component.html',
  imports: [
    NewAddressComponent,
    NgForOf,
    NgIf
  ],
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  isLoggedIn$: Observable<boolean>;
  user: CustomUser;

  public productsInCart: CartItem[] = [];
  public totalOrderValue: number = 0;

  constructor(
      private cartService: CartService,
      private orderService: OrderService,
      private tokenService: TokenService,
      private userService: UserService,
      private router: Router
  ) {
    this.productsInCart = this.cartService.getAllProductsFromCart();
    this.totalOrderValue = this.cartService.calculateTotalOrderValue();
  }

  ngOnInit() {
    this.cartService.cartUpdated.subscribe(() => {
      this.refreshCart();
    });
    this.isLoggedIn$ = this.tokenService.getIsAuthenticated();
    this.isLoggedIn$.subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.userService.getUserInfo().subscribe((user: CustomUser) => {
          this.user = user;
        });
      } else {
        this.user = null;
      }
    });
  }

  refreshCart() {
    this.productsInCart = this.cartService.getAllProductsFromCart();
    this.totalOrderValue = this.cartService.calculateTotalOrderValue();
  }

  removeFromCart(index: number) {
    this.cartService.removeProductFromCart(index);
    this.refreshCart();
  }

  placeOrder(): void {
    if (!this.user || !this.user.id) {
      console.error('User information is not available.');
      alert('User information is not available. Please try logging in again.');
      return;
    }

    this.orderService.placeOrder(this.productsInCart, this.user.id).subscribe({
      next: (response) => {
        console.log('Order placed successfully', response);
        this.orderService.currentOrderId = Number(response);
        this.cartService.clearCart();
        this.cartService.navigateToOrder();
      },
      error: (error) => {
        console.error('Error placing order', error);
        this.handleOrderError(error);
      }
    });
  }

  handleOrderError(error: any): void {
    console.error('There was an error placing the order.', error);
  }

  totalItems(): number {
    return this.productsInCart.reduce((total, cartItem) => total + cartItem.quantity, 0);
  }

  increaseQuantity(index: number) {
    if (this.productsInCart[index]) {
      this.productsInCart[index].quantity += 1;
      this.refreshCart();
    }
  }

  decreaseQuantity(index: number) {
    if (this.productsInCart[index] && this.productsInCart[index].quantity > 1) {
      this.productsInCart[index].quantity -= 1;
      this.refreshCart();
    }
  }

  logIn(): void {
    this.router.navigate(['/auth/login']);
  }
}
