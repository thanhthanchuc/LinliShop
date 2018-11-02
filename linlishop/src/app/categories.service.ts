import { AngularFireDatabase } from "angularfire2/database";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class CategoriesService {
  constructor(private db: AngularFireDatabase) {}

  getAll() {
    return this.db.list('categories').snapshotChanges()
  }
}
