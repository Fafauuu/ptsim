import { createReducer, on } from '@ngrx/store';
import * as authActions from './auth.actions';
import { AuthState } from './auth.state';

export const initialAuthState: AuthState = {
  isLogged: false,
  userId: null,
};

export const authReducer = createReducer(
  initialAuthState,
  on(authActions.login, (state, { userId }) => ({
    ...state,
    isLogged: true,
    userId,
  })),
  on(authActions.logout, (state) => ({
    ...state,
    isLogged: false,
    userId: null,
  }))
);
