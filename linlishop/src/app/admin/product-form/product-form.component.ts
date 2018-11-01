import { Router, ActivatedRoute } from "@angular/router";
import { ProductService } from "./../../product.service";
import { CategoriesService } from "./../../categories.service";
import { Component, OnInit } from "@angular/core";
import { take } from "rxjs/operators";

@Component({
  selector: "app-product-form",
  templateUrl: "./product-form.component.html",
  styleUrls: ["./product-form.component.css"]
})
export class ProductFormComponent implements OnInit {
  categories$;
  product = {};

  constructor(
    private categoriesService: CategoriesService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.categories$ = categoriesService.getCategories();

    let id = this.route.snapshot.paramMap.get("id");
    if (id)
      this.productService
        .getProduct(id)
        .pipe(take(1))
        .subscribe(p => (this.product = p));
  }

  ngOnInit() {}

  save(product) {
    this.productService.create(product);
    this.router.navigate(["/admin/products"]);
  }
}
