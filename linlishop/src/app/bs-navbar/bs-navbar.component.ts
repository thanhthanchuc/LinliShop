import { AppUser } from './../models/app-user';
import { AuthService } from './../auth.service';
import { AngularFireAuth } from "angularfire2/auth";
import { Component, OnInit } from "@angular/core";
import * as firebase from "firebase";
import { Observable } from "rxjs";
import { ShoppingCartService } from '../shopping-card.service';

@Component({
  selector: "bs-navbar",
  templateUrl: "./bs-navbar.component.html",
  styleUrls: ["./bs-navbar.component.css"]
})
export class BsNavbarComponent implements OnInit {
  isCollapsed = false;
  user$: Observable<{}>;
  shoppingCartItemCount: number;

  constructor(private auth: AuthService, private shoppingCartService: ShoppingCartService) {
    this.user$ = auth.appUser$;
  }

  async ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    let cart$ = (await this.shoppingCartService.getCart()).valueChanges();
    cart$.subscribe(cart => {
      this.shoppingCartItemCount = 0;
      for (let productId in cart.items)
        this.shoppingCartItemCount += cart.items[productId].quantity;
    })
  }

  logout() {
    this.auth.logout();
  }
}
