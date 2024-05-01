import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UserApiService } from '../../services/user-api.service';
import { User } from '../../interfaces/nayeli.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, RouterLink, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  currentUser: User | null = {
    id: 0,
    email: '',
    username: '',
    password: '',
    address: '',
    bag_list: [],
    favs_list: []
  };
  isMenuOpen: boolean = true;

  constructor(private http: UserApiService) { }

  /**
   * Displays the mobile's menu
   * @returns {void}
   */
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  /**
   * Gets the user logged.
   * @returns {void}
   */
  ngOnInit(): void {
    this.http.currentUser.subscribe(user => {
      console.log(user);

      this.currentUser = user;
    });
  }
}
