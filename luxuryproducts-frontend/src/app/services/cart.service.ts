import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../models/product.model';
import { Variant } from '../models/variant.model';
import { OrderService } from './order.service';
import {CartItem} from "../models/cartitem.model";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItemsInCart: CartItem[] = [];
  cartUpdated = new EventEmitter<void>();

  constructor(private router: Router, private orderService: OrderService) { }

  public addProductToCart(product: Product, variant: Variant): void {
    const existingCartItem = this.cartItemsInCart.find(
        item => item.product.id === product.id && item.variant.id === variant.id
    );

    if (existingCartItem) {
      existingCartItem.quantity += 1;
    } else {
      this.cartItemsInCart.push(new CartItem(product, variant, 1));
    }

    this.cartUpdated.emit();
  }

  public getAllProductsFromCart(): CartItem[] {
    return this.cartItemsInCart.slice();
  }

  public calculateTotalOrderValue(): number {
    let totalOrderValue: number = 0;
    for (let i = 0; i < this.cartItemsInCart.length; i++) {
      totalOrderValue += this.cartItemsInCart[i].variant.additionalPrice * this.cartItemsInCart[i].quantity;
    }
    return totalOrderValue;
  }

  public removeProductFromCart(index: number): void {
    if (index > -1 && index < this.cartItemsInCart.length) {
      this.cartItemsInCart.splice(index, 1);
      this.cartUpdated.emit();
    }
  }

  public clearCart(): void {
    this.cartItemsInCart = [];
    this.cartUpdated.emit();
  }

  navigateToOrder(): void {
    this.router.navigate(['/dashboard/orders']);
  }
}
