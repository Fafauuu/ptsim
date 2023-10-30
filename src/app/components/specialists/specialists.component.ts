import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { DoctorsService } from '../../services';
import { Store } from '@ngrx/store';
import { selectUserId } from '../../state/auth/auth.selectors';
import { Doctor } from 'src/app/model';

@Component({
  selector: 'app-specialists',
  templateUrl: './specialists.component.html',
  styleUrls: ['./specialists.component.scss'],
})
export class SpecialistsComponent implements OnInit {
  doctors$!: Observable<Doctor[]>;
  userId: string | null = null;

  constructor(
    private router: Router,
    private doctorsService: DoctorsService,
    private store: Store
  ) {}

  ngOnInit() {
    this.store.select(selectUserId).subscribe((userId) => {
      this.userId = userId;
    });

    this.doctors$ = this.doctorsService.getAll();
  }

  goToDoctorDetails(doctorId: string) {
    this.router.navigate([`specialists/${doctorId}`]);
  }
}
