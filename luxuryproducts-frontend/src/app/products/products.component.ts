import { Component, OnInit } from '@angular/core';
import { ProductThumbnailComponent } from './product-thumbnail/product-thumbnail.component';
import { ProductsService } from '../services/products.service';
import { Product } from '../models/product.model';
import { Variant } from '../models/variant.model';
import { Observable } from 'rxjs';
import { CartService } from '../services/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductThumbnailComponent, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  public productsList: Product[];
  public productsLoading: boolean = true;
  public categoryId: number = 0;

  constructor(private productsService: ProductsService, private cartService: CartService) { }

  ngOnInit(): void {
    this.fetchProducts();
  }

  public onAddToCart(productVariant: { product: Product, variant: Variant }): void {
    this.cartService.addProductToCart(productVariant.product, productVariant.variant);
  }

  public onCategoryChange(event: any): void {
    this.categoryId = event.target.value; // assuming the event contains the new category ID
    this.fetchProducts();
  }

  private fetchProducts(): void {
    this.productsLoading = true; // Show loading indicator

    this.productsService.getAllProducts(this.categoryId)
        .subscribe((products: Product[]) => {
          this.productsList = products;
          this.productsLoading = false; // Hide loading indicator
        });
  }

  public trackByProductId(index: number, product: Product): number {
    return product.id;
  }
}
