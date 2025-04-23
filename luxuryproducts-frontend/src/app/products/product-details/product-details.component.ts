import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import {Variant} from "../../models/variant.model";

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
  public product: Product;
  public selectedVariant: Variant;
  public notificationVisible: boolean = false;

  constructor(
      private route: ActivatedRoute,
      private productsService: ProductsService,
      private cartService: CartService
  ) { }

  ngOnInit(): void {
    const productId = +this.route.snapshot.paramMap.get('id');
    this.productsService.getProductById(productId).subscribe(product => {
      this.product = product;
      if (this.product.variants && this.product.variants.length > 0) {
        this.selectedVariant = this.product.variants[0]; // Select the first variant by default
      }
    });
  }

  public onVariantChange(event: any): void {
    const variantId = +event.target.value;
    this.selectedVariant = this.product.variants.find(variant => +variant.id === variantId);
  }


  public onBuyProduct(): void {
    if (!this.selectedVariant) {
      alert('Please select a variant.');
      return;
    }
    this.cartService.addProductToCart(this.product, this.selectedVariant);
    this.notificationVisible = true;
    setTimeout(() => this.notificationVisible = false, 3000);
  }


  navigateToCart() {

  }
}