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
  id;

  constructor(
    private categoriesService: CategoriesService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.categories$ = categoriesService.getCategories();

    this.id = this.route.snapshot.paramMap.get("id");
    if (this.id)
      this.productService
        .getProduct(this.id)
        .pipe(take(1))
        .subscribe(p => (this.product = p));
  }

  ngOnInit() {}

  save(product) {
    if (this.id) this.productService.update(this.id, product);
    else this.productService.create(product);
    
    this.router.navigate(["/admin/products"]);
  }
}
