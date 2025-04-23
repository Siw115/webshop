import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { Observable, delay, of } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = environment.base_url + '/products'; // Set base URL

  constructor(private http: HttpClient) { }

  public getAllProducts(categoryId: number): Observable<Product[]> {
    console.log(categoryId);
    const numericCategoryId = Number(categoryId);

    let url = this.apiUrl;
    if (numericCategoryId === 1 || numericCategoryId === 2) {
      url += '?category=' + categoryId;
    }

    return this.http.get<Product[]>(url);
  }

  public getProductById(productId: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${productId}`);
  }

  public createProduct(product: Product): Observable<Product> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<Product>(this.apiUrl, product, { headers });
  }

  public updateProduct(productId: number, product: Product): Observable<Product> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put<Product>(`${this.apiUrl}/${productId}`, product, { headers });
  }

  public deleteProduct(productId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${productId}`);
  }
}
