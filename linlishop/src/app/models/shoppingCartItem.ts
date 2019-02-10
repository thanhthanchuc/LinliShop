import { Product } from "./product";

export class shoppingCartItem {
    key: string;
    title: string;
    price: number;
    imageUrl: string;
    quantity: number;

    constructor(init?: Partial<shoppingCartItem>) {
        Object.assign(this, init);
    }

    get totalPrice() { return this.price * this.quantity; }
}