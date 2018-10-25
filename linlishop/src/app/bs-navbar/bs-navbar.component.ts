import { AngularFireAuth } from "angularfire2/auth";
import { Component } from "@angular/core";

@Component({
  selector: "bs-navbar",
  templateUrl: "./bs-navbar.component.html",
  styleUrls: ["./bs-navbar.component.css"]
})
export class BsNavbarComponent {
  isCollapsed = false;
  constructor(private afAuth: AngularFireAuth) {
    afAuth.authState.subscribe(x => console.log(x));
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}
