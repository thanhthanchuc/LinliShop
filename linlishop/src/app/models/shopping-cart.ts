import { shoppingCartItem } from "./shoppingCartItem";

export class ShoppingCart {
    items: shoppingCartItem[] = [];
    constructor(public itemsMap: { [productId: string]: shoppingCartItem }) {
        for (let productId in itemsMap)
            this.items.push(itemsMap[productId]);
    }

    get totalItemsCount() {
        let count = 0;
        for (let productId in this.itemsMap)
            count += this.itemsMap[productId].quantity;
        return count;
    }
}