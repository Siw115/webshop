import { Component, Input } from '@angular/core';
import { Product } from '../../../models/product.model';
import { OrderService } from '../../../services/order.service';
import { CartService } from '../../../services/cart.service';
import { CustomOrder } from '../../../models/customorder.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent {

  @Input() order: CustomOrder;

  calculateTotalPrice(order: CustomOrder): number {
    let totalPrice = 0;
    for (let orderLine of order.orderLines) {
      totalPrice += orderLine.productPrice * orderLine.quantity;
    }
    return parseFloat(totalPrice.toFixed(2));
  }
  
  
}
