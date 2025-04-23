import { Component, OnInit } from '@angular/core';
import { CustomOrder } from "../../models/customorder.model";
import { OrderService } from "../../services/order.service";
import {CurrencyPipe, NgForOf, NgIf} from "@angular/common";
import {TokenService} from "../../auth/token.service";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    CurrencyPipe
  ],
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders: CustomOrder[] = [];
  selectedOrderIndex: number = 0;

  constructor(
      private orderService: OrderService,
      private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    const userId = this.tokenService.getUserEmail();
    if (!userId) {
      console.error('User ID is not available.');
      return;
    }

    this.orderService.getOrdersByUserId(userId).subscribe({
      next: (orders) => {
        this.orders = orders.map(order => ({
          ...order,
          orderLines: order.orderLines || [] // Ensure orderLines is always an array
        }));
        this.selectedOrderIndex = 0; // Reset to first order
      },
      error: (error) => {
        console.error('Error fetching orders', error);
      }
    });
  }

  calculateTotalPrice(order: CustomOrder): number {
    if (!order || !Array.isArray(order.orderLines)) {
      return 0;
    }
    return order.orderLines.reduce((total, line) => total + (line.productPrice * line.quantity), 0);
  }

  previousOrder(): void {
    if (this.selectedOrderIndex > 0) {
      this.selectedOrderIndex--;
    }
  }

  nextOrder(): void {
    if (this.selectedOrderIndex < this.orders.length - 1) {
      this.selectedOrderIndex++;
    }
  }
}
