import { Product } from "./product.model";
import {Variant} from "./variant.model";

export class CartItem {
    constructor(
        public product: Product,
        public variant: Variant,
        public quantity: number
    ) {}
  }