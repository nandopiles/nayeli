import { Component } from '@angular/core';
import { NewUser, User } from '../../interfaces/nayeli.interface';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserApiService } from '../../services/user-api.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AlertComponent } from '../../components/alert/alert.component';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, AlertComponent, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  userInfo = new FormGroup({
    email: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
    address: new FormControl('')
  });
  isInfoValid: boolean = true;
  isAlertReadyToHidden: boolean = false;

  constructor(
    private _userService: UserApiService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  /**
   * Controls if the alert is closed or no.
   * @param {boolean} isClosed
   * @returns {void}
   */
  handleAlertToClose(isClosed: boolean): void {
    this.isAlertReadyToHidden = isClosed;
    this.isInfoValid = true;
  }

  /**
   * Redirects to the url passed by parameter.
   * @param {string} redirectUrl
   * @returns {void}
   */
  handlerSuccessAndRedirect(redirectUrl: string): void {
    this.router.navigate([redirectUrl], { relativeTo: this.route })
  }

  /**
   * Registers a new user.
   * @returns {void}
   */
  signUpNewUser(): void {
    const newUser: NewUser = {
      email: String(this.userInfo.value.email),
      username: String(this.userInfo.value.username),
      password: String(this.userInfo.value.password),
      address: String(this.userInfo.value.address)
    }

    this._userService.addUser(newUser).subscribe({
      next: (user => {
        console.log("User added", user);
        this.handlerSuccessAndRedirect("/login");
      }),
      error: (error) => {
        console.log("Error trying to register the new user: ", error);
        this.isInfoValid = false;
      }
    });
  }
}
