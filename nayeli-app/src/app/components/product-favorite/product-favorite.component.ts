import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../interfaces/nayeli.interface';

@Component({
  selector: 'app-product-favorite',
  standalone: true,
  imports: [],
  templateUrl: './product-favorite.component.html',
  styleUrl: './product-favorite.component.css'
})
export class ProductFavoriteComponent {
  @Input() product: Product = {
    id: 0,
    name: '',
    brand: '',
    price: 0,
    img: '',
    categories: []
  };
  @Input() index: number = 0;
  @Output() remove = new EventEmitter<number>();

  /**
   * Emits the index of the product to remove in the favorite list.
   * @returns {void}
   */
  removeProduct(): void {
    this.remove.emit(this.index);
  }
}
