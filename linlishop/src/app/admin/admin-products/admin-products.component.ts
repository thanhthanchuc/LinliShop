import { ProductService } from "./../../product.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { DataTableModule } from "angular-6-datatable";

@Component({
  selector: "app-admin-products",
  templateUrl: "./admin-products.component.html",
  styleUrls: ["./admin-products.component.css"]
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: any[];
  filteredProducts: any[];
  subsription: Subscription;

  constructor(private productService: ProductService) {
    this.subsription = this.productService
      .getAll()
      .subscribe(
        products => (this.filteredProducts = this.products = products)
      );
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.subsription.unsubscribe();
  }

  filter(query: string) {
    this.filteredProducts = query
      ? this.products.filter(p =>
          p.payload.node_.children_.root_.right.value.value_
            .toLowerCase()
            .includes(query.toLowerCase())
        )
      : this.products;
  }
}
