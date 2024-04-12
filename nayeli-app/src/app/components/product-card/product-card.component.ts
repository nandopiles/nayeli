import { Component, OnInit } from '@angular/core';
import { Product } from '../../interfaces/nayeli.interface';
import { ProductApiService } from '../../services/product-api-service.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent implements OnInit {
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
