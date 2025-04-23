import { Address } from "./address.model";
import { CustomOrder } from "./customorder.model";

export class CustomUser {

    private _id: string;
    private _email: string;
    private _password: string;
    private _addresses: Address[];
    private _customOrders: CustomOrder[];

    constructor(email: string, password: string, addresses: Address[], customOrders: CustomOrder[]) {
        this._email = email;
        this._password = password;
        this._addresses = addresses;
        this._customOrders = customOrders;
    }

    public get email(): string {
        return this._email;
    }
    public set email(value: string) {
        this._email = value;
    }
    public get password(): string {
        return this._password;
    }
    public set password(value: string) {
        this._password = value;
    }
    public get addresses(): Address[] {
        return this._addresses;
    }
    public set addresses(value: Address[]) {
        this._addresses = value;
    }
    public get customOrders(): CustomOrder[] {
        return this._customOrders;
    }
    public set customOrders(value: CustomOrder[]) {
        this._customOrders = value.sort((a, b) => {
            let dateA = new Date(a.datum);
            let dateB = new Date(b.datum);
            return dateA.getTime() - dateB.getTime();
        });
    }


    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }
}
