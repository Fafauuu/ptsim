import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

import { DataService } from 'src/app/services/data.service';
import * as authActions from '../../state/auth/auth.actions';
import { User } from 'src/app/model';
import { COLLECTION_NAME } from 'src/app/services/injectionToken';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [
    { provide: COLLECTION_NAME, useValue: 'users' },
    DataService<User>,
  ],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(
    private dataService: DataService<User>,
    private store: Store<any>
  ) {}

  login() {
    this.dataService.getAll().subscribe((users) => {
      const userToLogin = users.find(
        (user) => user.email === this.email && user.password === this.password
      );
      if (userToLogin) {
        this.store.dispatch(authActions.login({ userId: userToLogin.id }));
        console.log(`userID: ${userToLogin.id}`);
      } else {
        console.error('Niepoprawne dane logowania');
      }
    });
  }
}
