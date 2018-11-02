import { Component, OnInit } from "@angular/core";
import { ProductService } from "../product.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  product$;

  constructor(private productService: ProductService) {
    this.product$ = productService.getAll();
    productService.getAll().subscribe(x => console.log(x));
  }

  ngOnInit() {}
}
