import { NgModule } from '@angular/core';
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

@NgModule({
  declarations: [
    AppComponent,
    ScheduleVisitComponent,
    HomeComponent,
    VisitsComponent,
    SpecialistsComponent,
    VisitHistoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    FirestoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
