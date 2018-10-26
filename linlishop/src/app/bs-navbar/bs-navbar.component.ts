import { AuthService } from './../auth.service';
import { AngularFireAuth } from "angularfire2/auth";
import { Component } from "@angular/core";
import * as firebase from "firebase";
import { Observable } from "rxjs";

@Component({
  selector: "bs-navbar",
  templateUrl: "./bs-navbar.component.html",
  styleUrls: ["./bs-navbar.component.css"]
})
export class BsNavbarComponent {
  isCollapsed = false;
  user$ : Observable<firebase.User>;

  constructor(private auth: AuthService) {
    this.user$ = auth.user$;
  }

  logout() {
    this.auth.logout();
  }
}
