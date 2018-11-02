import { CategoriesService } from './../categories.service';
import { ProductService } from './../product.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  product$;
  categories$;

  constructor(productService : ProductService, categoriesService: CategoriesService) { 
    this.product$ = productService.getAll();
    this.categories$ = categoriesService.getAll();
  }
}
