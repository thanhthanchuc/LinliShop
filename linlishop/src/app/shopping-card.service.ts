import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";

@Injectable({
  providedIn: "root"
})
export class ShoppingCardService {
  constructor(private db: AngularFireDatabase) {}

  private create() {
    return this.db.list("/shopping-cards").push({
      dateCreated: new Date().getTime()
    });
  }

  private getCard(cardId: string) {
    return this.db.object("/shopping-cards/" + cardId);
  }

  private async getOrCreateCart() {
    let cardId = localStorage.getItem("cardId");
    if (!cardId) {
      let result = await this.create();
      localStorage.setItem("cardId", result.key);
      return this.getCard(result.key);
    }
    return this.getCard(cardId);
  }
}
