import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../interfaces/nayeli.interface';
import { ProductApiService } from '../../services/product-api-service.service';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, SpinnerComponent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  product: Product = {
    id: 0,
    brand: '',
    categories: [],
    img: '',
    name: '',
    price: 0
  };
  isLoading: boolean = true;
  size = new FormControl('None');

  constructor(
    private route: ActivatedRoute,
    private service: ProductApiService
  ) { }

  /**
   * Checks if the category of the product is 'Footwear'
   * @returns {boolean}
   */
  isFootwear(): boolean {
    return this.product.categories.some(cat => cat.id === 1 && cat.name === 'Footwear');
  }

  /**
   * Checks if the category of the product is 'Clothing'
   * @returns {boolean}
   */
  isClothing(): boolean {
    return this.product.categories.some(cat => cat.id === 2 && cat.name === 'Clothing');
  }

  /**
   * Checks if the category of the product is 'Accessories'
   * @returns {boolean}
   */
  isAccessories(): boolean {
    return this.product.categories.some(cat => cat.id === 3 && cat.name === 'Accessories');
  }

  /**
   * Loads the info of the product selected.
   * @returns {void}
   */
  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');

    this.service.getProduct(Number(productId)).subscribe((product) => {
      this.product = product
      this.isLoading = false
    });
  }
}
