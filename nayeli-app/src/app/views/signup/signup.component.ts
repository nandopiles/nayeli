import { Component } from '@angular/core';
import { User } from '../../interfaces/nayeli.interface';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserApiService } from '../../services/user-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertComponent } from '../../components/alert/alert.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, AlertComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
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
    address: new FormControl('')
  });
  isInfoValid: boolean = false;

  constructor(
    private http: UserApiService,
    private router: Router,
    private route: ActivatedRoute
  ) { }
}
