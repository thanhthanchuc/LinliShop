import { Product } from "./product";

export class shoppingCartItem {
    key: string;
    title: string;
    price: number;
    imageUrl: string;
    quantity: number;

    get totalPrice() { return this.price * this.quantity; }
}