import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { FirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { ScheduleVisitComponent } from './components/schedule-visit/schedule-visit.component';
import { VisitHistoryComponent } from './components/visit-history/visit-history.component';
import { HomeComponent } from './components/home/home.component';
import { VisitsComponent } from './components/visits/visits.component';
import { SpecialistsComponent } from './components/specialists/specialists.component';
import { LoginComponent } from './components/login/login.component';

import { Store, StoreModule } from '@ngrx/store';
import { reducers } from './state';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './state/auth/auth.effects';
import * as authActions from './state/auth/auth.actions';
import { VisitDetailsComponent } from './components/visit-details/visit-details.component';
import { SpecialistDetailsComponent } from './components/specialist-details/specialist-details.component';
import { RegisterComponent } from './components/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';

export function restoreStateFromLocalStorage(store: Store) {
  return () => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (user && user.userId) {
      store.dispatch(authActions.login({ userId: user.userId }));
    }
  };
}

@NgModule({
  declarations: [
    AppComponent,
    ScheduleVisitComponent,
    HomeComponent,
    VisitsComponent,
    SpecialistsComponent,
    VisitHistoryComponent,
    LoginComponent,
    VisitDetailsComponent,
    SpecialistDetailsComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    FirestoreModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([AuthEffects]),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: restoreStateFromLocalStorage,
      deps: [Store],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
