import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';

import { VisitsService, DoctorsService } from '../../services';
import { Store } from '@ngrx/store';
import { selectUserId } from '../../state/auth/auth.selectors';

interface VisitDisplay {
  id: string;
  doctorName: string;
  day: Date;
  starttime: string;
  endtime: string;
  price: number;
  specialty: string;
}

@Component({
  selector: 'app-schedule-visit',
  templateUrl: './schedule-visit.component.html',
  styleUrls: ['./schedule-visit.component.scss'],
})
export class ScheduleVisitComponent {
  upcomingVisits$!: Observable<VisitDisplay[]>;
  userId: string | null = null;
  private filterDateSubject = new BehaviorSubject<string | null>(null);
  private filterSpecialtySubject = new BehaviorSubject<string | null>(null);
  public selectedDate: string | null = null;
  public selectedSpeciality: string | null = null;

  filterDate$ = this.filterDateSubject.asObservable();
  filterSpecialty$ = this.filterSpecialtySubject.asObservable();

  constructor(
    private router: Router,
    private visitsService: VisitsService,
    private doctorsService: DoctorsService,
    private store: Store
  ) {}

  ngOnInit() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    this.store.select(selectUserId).subscribe((userId) => {
      this.userId = userId;
    });

    const visits$ = this.visitsService.getAll();
    const doctors$ = this.doctorsService.getAll();

    this.upcomingVisits$ = combineLatest([
      visits$,
      doctors$,
      this.filterDate$,
      this.filterSpecialty$,
    ]).pipe(
      map(([visits, doctors, filterDate, filterSpecialty]) => {
        return visits
          .filter((visit) => new Date(visit.day) >= today && !visit.userid)
          .filter((visit) => {
            const doctor = doctors.find((d) => d.id === visit.doctorid);
            return (
              (!filterDate ||
                new Date(visit.day).toISOString().slice(0, 10) ===
                  filterDate) &&
              (!filterSpecialty || doctor?.specialty === filterSpecialty)
            );
          })
          .map((visit) => {
            const doctor = doctors.find((d) => d.id === visit.doctorid);
            return {
              id: visit.id,
              doctorName: `${doctor?.firstname} ${doctor?.lastname}`,
              day: visit.day,
              starttime: visit.starttime,
              endtime: visit.endtime,
              price: visit.price,
              specialty: doctor?.specialty,
            } as VisitDisplay;
          });
      })
    );
  }

  onDateFilterChange(date: string | null) {
    if (date) {
      this.filterDateSubject.next(date);
    }
  }

  onSpecialtyFilterChange(specialty: string | null) {
    if (specialty) {
      this.filterSpecialtySubject.next(specialty);
    }
  }

  goToVisitDetails(visitId: string) {
    this.router.navigate([`schedule-visit/${visitId}`]);
  }
}
