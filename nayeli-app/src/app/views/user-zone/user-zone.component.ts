import { Component } from '@angular/core';
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
export class UserZoneComponent {
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
    private _userService: UserApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this._userService.currentUser.subscribe(user => this.currentUser = user);
    this.calcTotal()
  }

  /**
   * Removes a product from the favorite list.
   * @param {number} index
   * @returns {void}
   */
  removeProductFromFavorites(index: number): void {
    if (this.currentUser) {
      const productIdToRemove = this.currentUser.favs_list[index].id;

      this._userService.removeProductFromFavorites(this.currentUser.id, productIdToRemove).subscribe({
        next: (updatedUser) => {
          console.log('Product removed from favorites:', updatedUser);
          this.currentUser?.favs_list.splice(index, 1);
        },
        error: (error) => {
          console.error('Error removing product from favorites:', error);
        }
      });
    }

  }

  /**
   * Removes a product from the cart.
   * @param {number} index
   * @returns {void}
   */
  removeProductFromCart(index: number): void {
    if (this.currentUser) {
      const productIdToRemove = this.currentUser.bag_list[index].id;

      this._userService.removeProductFromUserCart(this.currentUser.id, productIdToRemove).subscribe({
        next: (updatedUser) => {
          console.log('Product removed successfully from user cart:', updatedUser);
          this.currentUser?.bag_list.splice(index, 1);
          this.calcTotal();
        },
        error: (error) => {
          console.error('Error removing product from user cart:', error);
        }
      });
    }
  }

  /**
   * Logs out.
   * @returns {void}
   */
  logOut(): void {
    this._userService.logOut();
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
}
