import { Component, Input } from '@angular/core';
import { Product } from '../../interfaces/nayeli.interface';
import { ProductApiService } from '../../services/product-api.service';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ActionBarComponent } from '../../components/action-bar/action-bar.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductCardComponent, SpinnerComponent, ActionBarComponent],
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

  getFilteredProducts(filteredProducts: Product[]): void {
    this.products = [];
    this.products = filteredProducts;
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
