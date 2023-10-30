import { Component, OnInit } from '@angular/core';
import { Doctor } from '../../model';
import { ActivatedRoute } from '@angular/router';
import { DoctorsService } from '../../services';

@Component({
  selector: 'app-specialist-details',
  templateUrl: './specialist-details.component.html',
  styleUrls: ['./specialist-details.component.scss'],
})
export class SpecialistDetailsComponent implements OnInit {
  public doctor: Doctor | null = null;

  constructor(
    private route: ActivatedRoute,
    private doctorsService: DoctorsService
  ) {}

  ngOnInit(): void {
    const urlSegments = this.route.snapshot.url.map((segment) => segment.path);
    const doctorId = urlSegments[urlSegments.length - 1]; // Pobiera ostatni segment ścieżki

    if (doctorId) {
      // Pobierz dane doktora na podstawie doctorId
      this.doctorsService.get(doctorId).subscribe((doctor) => {
        this.doctor = doctor!;
      });
    }
  }
}
