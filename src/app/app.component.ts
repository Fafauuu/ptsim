import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, switchMap, tap } from 'rxjs/operators';
import { DataService } from '../app/services/data.service';
import { User } from '../app/model';
import { COLLECTION_NAME } from './services/injectionToken';
import * as authActions from './state/auth/auth.actions';
import { of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    { provide: COLLECTION_NAME, useValue: 'users' },
    DataService<User>,
  ],
})
export class AppComponent implements OnInit {
  isLogged = false;
  user: User | null = null;

  constructor(
    private router: Router,
    private store: Store<{
      auth: { isLogged: boolean; userId: string | null };
    }>,
    private dataService: DataService<User>
  ) {}

  ngOnInit() {
    this.store
      .select((state) => state.auth)
      .pipe(
        tap((authState) => {
          this.isLogged = authState.isLogged;
        }),
        switchMap((authState) => {
          if (authState.isLogged && authState.userId) {
            return this.dataService.get(authState.userId);
          }
          return of(null);
        })
      )
      .subscribe((user) => {
        this.user = user as User;
      });
  }

  navigateHome() {
    this.router.navigate(['/home']);
  }

  login() {
    this.router.navigate(['/login']);
    console.log('Login clicked');
  }

  signup() {
    console.log('Signup clicked');
  }

  signout() {
    console.log('Signout clicked');
    this.store.dispatch(authActions.logout());
  }
}
