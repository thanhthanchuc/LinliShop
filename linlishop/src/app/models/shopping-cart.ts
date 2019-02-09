import { shoppingCartItem } from "./shoppingCartItem";

export class shoppingCart {
    constructor(public items: shoppingCartItem[]) { }

    get totalItemsCount() {
        let count = 0;
        for (let productId in this.items)
            count += this.items[productId].quantity;
        return count;
    }
}