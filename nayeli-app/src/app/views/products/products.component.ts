import { Component } from '@angular/core';
import { Product } from '../../interfaces/nayeli.interface';
import { ProductApiService } from '../../services/product-api-service.service';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { ProductGridComponent } from '../../components/product-grid/product-grid.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductGridComponent, SpinnerComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  public products: Product[] = [];
  public isLoaded: boolean = false;

  public constructor(public service: ProductApiService) { }

  /**
   * Gets all the products.
   * @returns {void}
   */
  public getProducts(): void {
    this.service.getAllProducts().subscribe((response) => {
      this.products = response
      console.log(response);
      this.isLoaded = true;
    });
  }

  /**
   * Displays the products.
   * @returns {void}
   */
  ngOnInit(): void {
    this.isLoaded = false
    this.getProducts()
  }
}