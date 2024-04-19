import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product, SizeOption } from '../../interfaces/nayeli.interface';
import { ProductApiService } from '../../services/product-api.service';
import { SpinnerComponent } from '../../components/spinner/spinner.component';

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
  sizeSelected = new FormControl('');

  constructor(
    private route: ActivatedRoute,
    private service: ProductApiService
  ) { }

  /**
   * Gets the size values of the product selected.
   * @returns {void}
   */
  getSizeOptions(): SizeOption[] {
    if (this.isFootwear()) {
      return [
        { label: '38', value: '38', disabled: false },
        { label: '39', value: '39', disabled: false },
        { label: '40', value: '40', disabled: false },
        { label: '41', value: '41', disabled: true },
        { label: '42', value: '42', disabled: false },
        { label: '43', value: '43', disabled: false },
        { label: '44', value: '44', disabled: true },
        { label: '45', value: '45', disabled: false },
      ];
    } else if (this.isClothing()) {
      return [
        { label: 'XXS', value: 'XXS', disabled: true },
        { label: 'XS', value: 'XS', disabled: false },
        { label: 'S', value: 'S', disabled: false },
        { label: 'M', value: 'M', disabled: true },
        { label: 'L', value: 'L', disabled: false },
        { label: 'XL', value: 'XL', disabled: false },
      ];
    } else if (this.isAccessories()) {
      return [
        { label: 'Talla Única', value: 'Talla Única', disabled: false },
      ];
    } else {
      return [];
    }
  }

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
