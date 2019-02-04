import { ActivatedRoute } from "@angular/router";
import { CategoriesService } from "./../categories.service";
import { ProductService } from "./../product.service";
import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { switchMap } from "rxjs/operators";
import { ShoppingCartService } from "../shopping-card.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"]
})
export class ProductsComponent implements OnInit, OnDestroy {
  @Input('show-Actions') showActions = true;

  products = [];
  filterProducts = [];
  categories$;
  category: string;
  cart: any;
  subscription: Subscription;

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

  async ngOnInit() {
    this.subscription = (await this.cartService.getCart()).valueChanges().subscribe(cart => this.cart = cart);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }

  addToCart(product) {
    this.cartService.addToCart(product);
  }

  getQuantity(product) {
    if (!this.cart) return 0;
    let item = this.cart.items[product["key"]];
    return item ? item.quantity : 0;
  }
}
