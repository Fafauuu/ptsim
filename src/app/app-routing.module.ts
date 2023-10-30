import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScheduleVisitComponent } from './components/schedule-visit/schedule-visit.component';
import { VisitHistoryComponent } from './components/visit-history/visit-history.component';
import { VisitsComponent } from './components/visits/visits.component';
import { SpecialistsComponent } from './components/specialists/specialists.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { VisitDetailsComponent } from './components/visit-details/visit-details.component';
import { SpecialistDetailsComponent } from './components/specialist-details/specialist-details.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: 'schedule-visit', component: ScheduleVisitComponent },
  { path: 'visit-history', component: VisitHistoryComponent },
  { path: 'visits', component: VisitsComponent },
  { path: 'specialists', component: SpecialistsComponent },
  { path: 'home', component: HomeComponent },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'visits/:id',
    component: VisitDetailsComponent,
    data: { editable: false },
  },
  {
    path: 'schedule-visit/:id',
    component: VisitDetailsComponent,
    data: { editable: true },
  },
  {
    path: 'visit-history/:id',
    component: VisitDetailsComponent,
    data: { editable: false },
  },
  {
    path: 'specialists/:id',
    component: SpecialistDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
