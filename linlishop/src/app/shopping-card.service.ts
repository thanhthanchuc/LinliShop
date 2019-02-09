import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireObject } from "angularfire2/database";
import { take, map } from "rxjs/operators";
import { Product } from "./models/product";
import { shoppingCart } from "./models/shopping-cart";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ShoppingCartService {
  constructor(private db: AngularFireDatabase) { }

  private create() {
    return this.db.list("/shopping-carts").push({
      dateCreated: new Date().getTime()
    });
  }

  async getCart(): Promise<Observable<shoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object("/shopping-carts/" + cartId).valueChanges()
      .pipe(map(x => new shoppingCart(x["items"])));
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem("cartId");
    if (cartId) return cartId;

    let result = await this.create();
    localStorage.setItem("cartId", result.key);
    return result.key;
  }

  async addToCart(product) {
    this.updateItemQuantity(product, 1)
  }

  async removeFromCart(product) {
    this.updateItemQuantity(product, -1);
  }

  private async updateItemQuantity(product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.key);

    item$.valueChanges().pipe(take(1)).subscribe(item => {
      if (item) item$.update({ quantity: item["quantity"] + change });
      else {
        var prod: Product = {
          category: product.payload.node_.children_.root_.left.left.value.value_,
          title: product.payload.node_.children_.root_.right.value.value_,
          imageUrl: product.payload.node_.children_.root_.left.value.value_,
          price: product.payload.node_.children_.root_.value.value_
        };

        item$.set({ product: prod, quantity: 1 });
      }
    })
  }
}
