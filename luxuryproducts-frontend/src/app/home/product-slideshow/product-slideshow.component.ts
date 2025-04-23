// product-slideshow.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-slideshow',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-slideshow.component.html',
  styleUrls: ['./product-slideshow.component.scss']
})
export class ProductSlideshowComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  currentIndex = 0;
  private autoScrollInterval: any;

  constructor(private productsService: ProductsService, private router: Router) {}

  ngOnInit() {
    this.productsService.getAllProducts(0).subscribe(data => {
      this.products = data;
      this.startAutoScroll(); // Start the auto-scrolling feature
    });
  }

  private startAutoScroll() {
    this.autoScrollInterval = setInterval(() => {
      this.nextProduct();
    }, 5000); // Change slide every 5 seconds
  }

  nextProduct() {
    this.currentIndex = (this.currentIndex + 1) % this.products.length;
  }

  prevProduct() {
    this.currentIndex = (this.currentIndex - 1 + this.products.length) % this.products.length;
  }

  ngOnDestroy() {
    if (this.autoScrollInterval) {
      clearInterval(this.autoScrollInterval); // Clear interval when component is destroyed
    }
  }

  navigateToProductDetail(product: Product): void {
    this.router.navigate(['/product-details', product.id]); // Adjust the route as per your routing setup
  }
}
