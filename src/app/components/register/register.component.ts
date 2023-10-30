import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DataService } from 'src/app/services/data.service';
import * as authActions from '../../state/auth/auth.actions';
import { User } from 'src/app/model';
import { COLLECTION_NAME } from 'src/app/services/injectionToken';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [
    { provide: COLLECTION_NAME, useValue: 'users' },
    DataService<User>,
  ],
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService<User>,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      { validator: this.checkPasswords }
    );
  }

  checkPasswords(group: FormGroup) {
    let pass = group.get('password')!.value;
    let confirmPass = group.get('confirmPassword')!.value;
    return pass === confirmPass ? null : { notSame: true };
  }

  register() {
    if (this.registerForm.valid) {
      const user: User = {
        firstname: this.registerForm.get('firstname')?.value,
        lastname: this.registerForm.get('lastname')?.value,
        email: this.registerForm.get('email')?.value,
        password: this.registerForm.get('password')?.value,
      } as User;
      this.dataService
        .create(user)
        .then(() => {
          console.log(`User ${user.id} successfully added`);
          this.router.navigate(['/login']);
        })
        .catch((err: any) => {
          console.error(`Error adding user ${user.id}:`, err);
        });
    }
  }
}
