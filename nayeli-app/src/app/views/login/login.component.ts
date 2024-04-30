import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserApiService } from '../../services/user-api.service';
import { User } from '../../interfaces/nayeli.interface';
import { AlertComponent } from '../../components/alert/alert.component';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, AlertComponent, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  userLogged: User = {
    id: 0,
    email: '',
    username: '',
    password: '',
    address: '',
    bag_list: [],
    favs_list: []
  }
  userInfo = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  isUserFound: boolean = true;

  constructor(
    private http: UserApiService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  /**
   * Redirects to the url passed by parameter.
   * @param {string} redirectUrl
   * @returns {void}
   */
  handlerSuccessAndRedirect(userFound: User, redirectUrl: string): void {
    this.http.setUser(userFound);
    this.router.navigate([redirectUrl], { relativeTo: this.route })
  }

  /**
   * Checks if the data introduced is correct and Logs in.
   * @returns {void}
   */
  loginUser(): void {
    this.http.getUser(
      String(this.userInfo.value.email),
      String(this.userInfo.value.password)
    ).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Authentication error
          this.isUserFound = false;
        }
        return throwError(() => error);
      })
    ).subscribe({
      next: (userFound: User) => {
        if (userFound.id !== 0) {
          this.userLogged = userFound;
          this.isUserFound = true;
          this.handlerSuccessAndRedirect(userFound, '/home');
        }
      }
    });
  }
}
