import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Visit, Doctor } from '../../model';
import { ActivatedRoute, Router } from '@angular/router';
import { VisitsService, DoctorsService } from '../../services';
import { Store } from '@ngrx/store';
import { selectUserId } from '../../state/auth/auth.selectors';

@Component({
  selector: 'app-visit-details',
  templateUrl: './visit-details.component.html',
  styleUrls: ['./visit-details.component.scss'],
})
export class VisitDetailsComponent implements OnInit {
  public visit: Visit | null = null;
  public visitDate: string | null = null;
  public doctor: Doctor | null = null;
  public editable: boolean = false;
  private userId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private visitsService: VisitsService,
    private doctorsService: DoctorsService,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.editable = this.route.snapshot.data['editable'];
    const urlSegments = this.route.snapshot.url.map((segment) => segment.path);
    const visitId = urlSegments[urlSegments.length - 1]; // Pobiera ostatni segment ścieżki

    this.store.select(selectUserId).subscribe((userId) => {
      this.userId = userId;
    });

    if (visitId) {
      // Pobierz dane wizyty na podstawie visitId
      this.visitsService.get(visitId).subscribe((visit) => {
        console.log(visit);
        this.visit = visit!;
        let dateObj = new Date(visit!.day);
        this.visitDate = `${dateObj.getFullYear()}-${String(
          dateObj.getMonth() + 1
        ).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, '0')}`;

        // Zakładając, że wizyta ma pole 'doctorId' do identyfikacji doktora
        this.doctorsService.get(this.visit!.doctorid).subscribe((doctor) => {
          this.doctor = doctor!;
        });
      });
    }
  }

  saveChanges(): void {
    if (this.visit && this.userId) {
      this.visit.userid = this.userId; // Dodaj userId do wizyty
      console.log(this.userId);

      this.visitsService.update(this.visit).then(() => {
        console.log('done');
        this.router.navigate(['/home']);
      });
    }
  }
}
