import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScheduleVisitComponent } from './components/schedule-visit/schedule-visit.component';
import { VisitHistoryComponent } from './components/visit-history/visit-history.component';
import { VisitsComponent } from './components/visits/visits.component';
import { SpecialistsComponent } from './components/specialists/specialists.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: 'schedule-visit', component: ScheduleVisitComponent },
  { path: 'visit-history', component: VisitHistoryComponent },
  { path: 'visits', component: VisitsComponent },
  { path: 'specialists', component: SpecialistsComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // default path
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
