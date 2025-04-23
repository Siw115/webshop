import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CustomOrder } from '../../../models/customorder.model';
import { OrderService } from '../../../services/order.service';
import { OrdersComponent } from '../orders.component';
import { CommonModule } from '@angular/common';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss'
})
export class OrderDetailsComponent implements OnChanges {
  order: CustomOrder;

  constructor(private route: ActivatedRoute, private orderService: OrderService) { }

  ngOnChanges(changes: SimpleChanges): void {
        throw new Error('Method not implemented.');
    }

  ngOnInit() {
    const orderId = this.route.snapshot.paramMap.get('id');
    if (orderId) {
      this.orderService.getOrderDetails(Number(orderId)).subscribe({
        next: (order) => {
          this.order = order;
          // Ensure orderLines is always an array
          this.order.orderLines = this.order.orderLines || [];
          this.calculateTotalPrice();
        },
        error: (error) => {
          console.error('Error fetching order details', error);
        }
      });
    }
  }

  calculateTotalPrice() {
    if (!this.order || !Array.isArray(this.order.orderLines)) {
      return 0;
    }
    return this.order.orderLines.reduce((total, line) => total + (line.productPrice * line.quantity), 0);
  }

}
