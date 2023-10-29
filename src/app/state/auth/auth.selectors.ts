import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AuthState } from './auth.state';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectUserId = createSelector(
  selectAuthState,
  (state: AuthState) => state.userId
);
