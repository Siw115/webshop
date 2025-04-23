import { CustomUser } from "./customuser.model";
import { OrderLine } from "./orderline.model";

export class CustomOrder {
    id: number;
    datum: string;
    orderStatus: string;
    orderLines: OrderLine[];
}