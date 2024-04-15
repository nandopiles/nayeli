import { Component, Input } from '@angular/core';
import { Product } from '../../interfaces/nayeli.interface';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() product: Product = {
    brand: '',
    categories: [],
    id: 0,
    name: '',
    price: 0,
    img: ''
  }
}
