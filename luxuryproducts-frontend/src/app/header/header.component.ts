import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Product } from '../models/product.model';
import { CartService } from '../services/cart.service';
import { TokenService } from '../auth/token.service';
import { UserService } from '../services/user.service';
import { CustomUser } from '../models/customuser.model';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { OrderItemComponent } from '../cart/order-item/order-item.component';
import { CartItem } from '../models/cartitem.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  productsInCart: CartItem[];
  totalOrderValue: number;
  user: CustomUser;
  isLoggedIn$: Observable<boolean>; // Observable to track login status
  navbarCollapsed = true; // Property to manage the navbar collapse state

  
  constructor(private cartService: CartService, private tokenService: TokenService, private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.productsInCart = this.cartService.getAllProductsFromCart();
    this.totalOrderValue = this.cartService.calculateTotalOrderValue();
    this.cartService.cartUpdated.subscribe(() => {
      this.productsInCart = this.cartService.getAllProductsFromCart();
      this.totalOrderValue = this.cartService.calculateTotalOrderValue();
    });

    this.isLoggedIn$ = this.tokenService.getIsAuthenticated(); // Assume this method returns an Observable<boolean>
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

  totalItems(): number {
    // Assuming you have a service to get cart items which returns CartItem[]
    let cartItems = this.cartService.getAllProductsFromCart();
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }
  

  dropToken() {
    this.tokenService.dropToken();
    // Possibly update login state here
  }


  toggleNavbar() {
    this.navbarCollapsed = !this.navbarCollapsed;
    console.log("yeet");
  }

  isActiveRoute(route: string): boolean {
    // Check if the current route matches the provided route
    return this.router.url.startsWith('/' + route);
  }
  
}
