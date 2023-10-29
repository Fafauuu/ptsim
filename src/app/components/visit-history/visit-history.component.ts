import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

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
  selector: 'app-visit-history',
  templateUrl: './visit-history.component.html',
  styleUrls: ['./visit-history.component.scss'],
})
export class VisitHistoryComponent implements OnInit {
  pastVisits$!: Observable<VisitDisplay[]>;
  userId: string | null = null;

  constructor(
    private router: Router,
    private visitsService: VisitsService,
    private doctorsService: DoctorsService,
    private store: Store
  ) {}

  ngOnInit() {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Ustalamy początek dnia

    this.store.select(selectUserId).subscribe((userId) => {
      this.userId = userId;
    });

    const visits$ = this.visitsService.getAll();
    const doctors$ = this.doctorsService.getAll();

    this.pastVisits$ = combineLatest([visits$, doctors$]).pipe(
      map(([visits, doctors]) => {
        return visits
          .filter(
            (visit) =>
              new Date(visit.day) < today && visit.userid === this.userId
          )
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

  goToVisitDetails(visitId: string) {
    this.router.navigate([`visit-history/${visitId}`]);
  }
}
