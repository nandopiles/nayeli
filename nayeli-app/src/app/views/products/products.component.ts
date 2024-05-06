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
  products: Product[] = [];
  isLoaded: boolean = false;

  constructor(public _productService: ProductApiService) {
    this.isLoaded = false
    this.getProducts()
  }

  /**
   * Gets all the products.
   * @returns {void}
   */
  getProducts(): void {
    this._productService.getAllProducts().subscribe((response) => {
      this.products = response;
      console.log(response);
      this.isLoaded = true;
    });
  }

  /**
   * Gets the list of products with the filters that the user confs.
   * @param {Product[]} filteredProducts
   * @returns {void}
   */
  getFilteredProducts(filteredProducts: Product[]): void {
    this.products = [];
    this.products = filteredProducts;
  }
}
