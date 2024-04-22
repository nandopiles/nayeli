import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserApiService } from '../../services/user-api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  userInfo = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(public http: UserApiService) { }

  /**
   * Checks if the data introduced is correct and Logs in.
   * @returns {void}
   */
  loginUser(): void {
    this.http.getUser(String(this.userInfo.value.email), String(this.userInfo.value.password)).subscribe((userFound) => {
      console.log(userFound);
    })
  }
}
