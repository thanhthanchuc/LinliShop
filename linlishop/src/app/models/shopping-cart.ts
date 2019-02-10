import { shoppingCartItem } from "./shoppingCartItem";
import { Product } from "./product";

export class ShoppingCart {
    items: shoppingCartItem[] = [];
    constructor(public itemsMap: { [productId: string]: shoppingCartItem }) {
        this.itemsMap = itemsMap || {};
        for (let productId in itemsMap) {
            let item = itemsMap[productId];
            this.items.push(new shoppingCartItem({...item, key: productId}));
        }
    }

    get totalPrice() {
        let sum = 0;
        for (let productId in this.items) {
            sum += this.items[productId].totalPrice;
        }
        return sum;
    }

    get totalItemsCount() {
        let count = 0;
        for (let productId in this.itemsMap)
            count += this.itemsMap[productId].quantity;
        return count;
    }


    getQuantity(product: Product) {
        let item = this.itemsMap[product["key"]];
        return item ? item.quantity : 0;
    }
}