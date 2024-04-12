import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../interfaces/nayeli.interface';
import { ProductApiService } from '../../services/product-api-service.service';

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
    price: 0
  }
}
