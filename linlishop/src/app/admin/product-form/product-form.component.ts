import { CategoriesService } from "./../../categories.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-product-form",
  templateUrl: "./product-form.component.html",
  styleUrls: ["./product-form.component.css"]
})
export class ProductFormComponent implements OnInit {
  categories$;

  constructor(categoriesService: CategoriesService) {
    this.categories$ = categoriesService.getCategories().valueChanges();
    console.log(this.categories$);
  }

  ngOnInit() {}
}
