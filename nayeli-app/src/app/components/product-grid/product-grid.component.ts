import { Component, OnInit } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Product } from '../../interfaces/nayeli.interface';
import { ProductApiService } from '../../services/product-api-service.service';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-product-grid',
  standalone: true,
  imports: [ProductCardComponent, SpinnerComponent],
  templateUrl: './product-grid.component.html',
  styleUrl: './product-grid.component.css'
})
export class ProductGridComponent implements OnInit {
  public products: Product[] = [];
  public isLoaded: boolean = false;

  public constructor(public service: ProductApiService) { }

  public getProducts(): void {
    this.service.getAllProducts().subscribe((response) => {
      this.products = response
      console.log(response);
      this.isLoaded = true;
    });
  }

  ngOnInit(): void {
    this.isLoaded = false
    this.getProducts()
  }
}
