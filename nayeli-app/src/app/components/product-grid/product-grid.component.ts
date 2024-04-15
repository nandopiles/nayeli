import { Component, Input } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Product } from '../../interfaces/nayeli.interface';

@Component({
  selector: 'app-product-grid',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './product-grid.component.html',
  styleUrl: './product-grid.component.css'
})
export class ProductGridComponent {
  @Input() products: Product[] = [];
}
