import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/nayeli.interface';
import { UserApiService } from '../../services/user-api.service';
import { ProductCartComponent } from '../../components/product-cart/product-cart.component';
import { ProductFavoriteComponent } from '../../components/product-favorite/product-favorite.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-zone',
  standalone: true,
  imports: [ProductCartComponent, ProductFavoriteComponent],
  templateUrl: './user-zone.component.html',
  styleUrl: './user-zone.component.css'
})
export class UserZoneComponent implements OnInit {
  currentUser: User | null = {
    id: 0,
    email: '',
    username: '',
    password: '',
    address: '',
    bag_list: [],
    favs_list: []
  };
  totalPrice: number = 0;

  constructor(
    private http: UserApiService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  /**
   * Logs out.
   * @returns {void}
   */
  logOut(): void {
    this.http.logOut();
    this.router.navigate(["/login"], { relativeTo: this.route })
  }

  /**
   * Calcs the final price of the cart.
   * @returns {void}
   */
  calcTotal(): void {
    this.totalPrice = this.currentUser?.bag_list.reduce((acc, product) => acc + product.price, 0) || 0;
    this.totalPrice = parseFloat(this.totalPrice.toFixed(2));
  }

  /**
   * Gets the user logged.
   * @returns {void}
   */
  ngOnInit(): void {
    this.http.currentUser.subscribe(user => this.currentUser = user);
    this.calcTotal()
  }
}
