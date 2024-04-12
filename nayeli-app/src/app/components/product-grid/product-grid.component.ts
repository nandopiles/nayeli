import { Component, OnInit } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Product } from '../../interfaces/nayeli.interface';
import { ProductApiService } from '../../services/product-api-service.service';

@Component({
  selector: 'app-product-grid',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './product-grid.component.html',
  styleUrl: './product-grid.component.css'
})
export class ProductGridComponent implements OnInit {
  public products: Product[] = []

  public constructor(public service: ProductApiService) { }

  public getProducts(): void {
    this.service.getAllProducts().subscribe((response) => {
      this.products = response
      console.log(response);

    });
  }

  ngOnInit(): void {
    this.getProducts()
  }
}
