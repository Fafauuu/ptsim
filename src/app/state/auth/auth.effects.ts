import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Router } from '@angular/router';
import * as authActions from './auth.actions'; // Dopasuj ścieżkę do swojego pliku z akcjami
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthEffects {
  loginRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.login), // Nasłuchuj akcji login
        tap(() => this.router.navigate(['/home'])) // Po udanym logowaniu przekierowuje do '/home'
      ),
    { dispatch: false } // Informujemy NgRx, że efekt nie emituje nowych akcji
  );

  storeAuthInLocalStorage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.login),
        tap((action) => {
          localStorage.setItem(
            'user',
            JSON.stringify({ userId: action.userId })
          );
        })
      ),
    { dispatch: false } // ponieważ nie dispatchujemy żadnej akcji w odpowiedzi
  );

  removeAuthFromLocalStorage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.logout),
        tap(() => {
          localStorage.removeItem('user');
        })
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private router: Router) {}
}
