import { ProductService } from './../product.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  product$;

  constructor(productService : ProductService) { 
    this.product$ = productService.getAll();
  }
}
