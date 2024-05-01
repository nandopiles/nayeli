import { Component, Input } from '@angular/core';
import { Product } from '../../interfaces/nayeli.interface';

@Component({
  selector: 'app-product-cart',
  standalone: true,
  imports: [],
  templateUrl: './product-cart.component.html',
  styleUrl: './product-cart.component.css'
})
export class ProductCartComponent {
  @Input() product: Product = {
    id: 0,
    name: '',
    brand: '',
    price: 0,
    img: '',
    categories: []
  };
}
