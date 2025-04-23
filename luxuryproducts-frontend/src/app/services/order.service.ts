import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from '../auth/token.service';
import { CustomOrder } from '../models/customorder.model';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { OrderLine } from '../models/orderline.model';
import { CartItem } from '../models/cartitem.model';
import { environment } from '../../environments/environment.development';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  currentOrder: Observable<CustomOrder>;
  currentOrderId: number = 0;

  private orderUrl = environment.base_url + '/orders';
  private orderLineUrl = environment.base_url + '/orderlines';

  constructor(private http: HttpClient, private tokenService: TokenService, private router: Router) {}

  public placeOrder(orderItems: CartItem[], userId: string): Observable<string> {
    const currentDate = new Date();
    const datum: string = currentDate.toISOString().split('T')[0];
    const orderStatus: string = "PENDING";

    const orderLines = orderItems.map(item => ({
      variantId: item.variant.id,
      quantity: item.quantity,
      productName: item.product.name,
      productDescription: item.product.description,
      productPrice: item.variant.additionalPrice,
      variantColor: item.variant.color,
      variantSize: item.variant.size
    }));

    const bodyOrder = {
      datum: datum,
      orderStatus: orderStatus,
      customUserId: userId,
      orderLines: orderLines
    };

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.tokenService.loadToken()}`,
      'Content-Type': 'application/json'
    });

    return this.http.post(this.orderLineUrl, bodyOrder, { headers: headers, responseType: 'text' }).pipe(
        tap(response => {
          console.log('Order response:', response);
          this.currentOrderId = Number(response);
        }),
        catchError(error => {
          console.error('Error placing order:', error);
          return throwError(() => error);
        })
    );
  }

  public getOrderDetails(orderId: number): Observable<CustomOrder> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.tokenService.loadToken(),
      'Content-Type': 'application/json'
    });
    return this.http.get<CustomOrder>(`${this.orderUrl}/${orderId}`, { headers }).pipe(
        catchError(this.handleError)
    );
  }

  public getOrdersByUserId(email: string): Observable<CustomOrder[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.tokenService.loadToken(),
      'Content-Type': 'application/json'
    });

    return this.http.get<CustomOrder[]>(`${this.orderUrl}/user/${email}`, { headers }).pipe(
        map(orders => orders.map(order => ({
          id: order.id,
          datum: order.datum,
          orderStatus: order.orderStatus,
          orderLines: order.orderLines || []  // Ensure orderLines is always an array
        }) as CustomOrder)),
        catchError(this.handleError)
    );
  }

  private convertToCustomOrder(order: any): CustomOrder {
    return {
      _id: order.id,
      _datum: order.datum,
      _orderStatus: order.orderStatus,
      _orderLines: order.orderLines.map((line: any) => ({
        variantId: line.variantId,
        quantity: line.quantity,
        productName: line.productName,
        productDescription: line.productDescription,
        productPrice: line.productPrice,
        variantColor: line.variantColor,
        variantSize: line.variantSize
      }))
    } as unknown as CustomOrder;
  }

  private handleError(error: any) {
    return throwError(() => new Error('There was an error fetching the order. ' + error.message));
  }
}
