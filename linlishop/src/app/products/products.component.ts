import { ActivatedRoute } from "@angular/router";
import { CategoriesService } from "./../categories.service";
import { ProductService } from "./../product.service";
import { Component } from "@angular/core";
import { switchMap } from "rxjs/operators";
import { ShoppingCartService } from "../shopping-card.service";
import { Product } from "../models/product";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"]
})
export class ProductsComponent {
  products = [];
  filterProducts = [];
  categories$;
  category: string;
  constructor(
    productService: ProductService,
    categoriesService: CategoriesService,
    route: ActivatedRoute,
    private cartService: ShoppingCartService
  ) {
    productService.getAll().pipe(switchMap(products => {
      this.products = products;
      return route.queryParamMap;
    })).subscribe(params => {
      this.category = params.get("category");
      this.filterProducts = this.category
        ? this.products.filter(
          p =>
            p.payload.node_.children_.root_.left.left.value.value_ ===
            this.category
        )
        : this.products;
    });

    this.categories$ = categoriesService.getAll();

  }

  addToCart(product) {
    this.cartService.addToCart(product);
  }
}
