import { Component, EventEmitter, Output } from '@angular/core';
import { Category, Product, ProductSearch } from '../../interfaces/nayeli.interface';
import { CategoryApiService } from '../../services/category-api.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProductApiService } from '../../services/product-api.service';

@Component({
  selector: 'app-action-bar',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './action-bar.component.html',
  styleUrl: './action-bar.component.css'
})
export class ActionBarComponent {
  categories: Category[] = [];
  filterForm = new FormGroup({
    category_id: new FormControl('all'),
    brand: new FormControl(''),
    name_contains: new FormControl('')
  });
  @Output() filteredProducts = new EventEmitter<Product[]>();

  constructor(
    private categoryService: CategoryApiService,
    private productService: ProductApiService
  ) {
    this.getCategories();
  }

  /**
   * Gets all the categories.
   * @returns {void}
   */
  getCategories(): void {
    this.categoryService.getAllCategories().subscribe((categories) => {
      this.categories = categories;
      console.log(this.categories);
    })
  }

  /**
   * Gets the products that match with the filters.
   * @returns {void}
   */
  filterProducts(): void {
    const filterParams: ProductSearch = {
      category_id: Number(this.filterForm.value.category_id),
      brand: String(this.filterForm.value.brand),
      name_contains: String(this.filterForm.value.name_contains)
    };

    this.productService.searchProducts(filterParams).subscribe((filteredProducts) => {
      console.log(filteredProducts);
      this.filteredProducts.emit(filteredProducts);
    });
  }
}
