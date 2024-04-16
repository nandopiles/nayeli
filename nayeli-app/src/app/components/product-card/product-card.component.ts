import { Component, Input } from '@angular/core';
import { Product } from '../../interfaces/nayeli.interface';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
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
