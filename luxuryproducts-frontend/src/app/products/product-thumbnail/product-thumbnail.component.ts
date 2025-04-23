import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { Variant } from '../../models/variant.model';
import { Router, RouterLink } from '@angular/router';
import {CartService} from "../../services/cart.service";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-product-thumbnail',
  standalone: true,
  imports: [RouterLink, NgIf, NgForOf],
  templateUrl: './product-thumbnail.component.html',
  styleUrls: ['./product-thumbnail.component.scss']
})
export class ProductThumbnailComponent implements OnInit {

  @Input() public product: Product;
  @Output() public addToCart: EventEmitter<{ product: Product, variant: Variant }> = new EventEmitter<{ product: Product, variant: Variant }>();

  public selectedVariant: Variant;
  public notificationVisible: boolean = false;

  constructor(private router: Router, private cartService: CartService) { }

  ngOnInit(): void {
    if (this.product.variants && this.product.variants.length > 0) {
      this.selectedVariant = this.product.variants[0]; // Select the first variant by default
    }
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

  public navigateToCart(): void {
    this.router.navigate(['/cart']);
  }

  public onViewDetails(): void {
    this.navigateToProductPage();
  }

  public navigateToProductPage(): void {
    this.router.navigate(['/product-details', this.product.id]);
  }
}
