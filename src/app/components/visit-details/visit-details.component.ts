import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Visit, Doctor } from '../../model';
import { ActivatedRoute } from '@angular/router';
import { VisitsService, DoctorsService } from '../../services';

@Component({
  selector: 'app-visit-details',
  templateUrl: './visit-details.component.html',
  styleUrls: ['./visit-details.component.scss'],
})
export class VisitDetailsComponent implements OnInit {
  public visit!: Visit;
  public doctor!: Doctor;
  public editable: boolean = false;
  public errorMessage: string | null = null; // Do wyświetlania błędów
  public successMessage: string | null = null; // Do wyświetlania powiadomień o sukcesie

  constructor(
    private route: ActivatedRoute,
    private visitsService: VisitsService,
    private doctorsService: DoctorsService
  ) {}

  ngOnInit(): void {
    this.editable = this.route.snapshot.data['editable'];
    const urlSegments = this.route.snapshot.url.map((segment) => segment.path);
    const visitId = urlSegments[urlSegments.length - 1]; // Pobiera ostatni segment ścieżki

    console.log('was here', visitId);

    if (visitId) {
      // Pobierz dane wizyty na podstawie visitId
      this.visitsService.get(visitId).subscribe((visit) => {
        // console.log(visit);
        this.visit = visit!;

        // Zakładając, że wizyta ma pole 'doctorId' do identyfikacji doktora
        this.doctorsService.get(this.visit!.doctorid).subscribe((doctor) => {
          this.doctor = doctor!;
        });
      });
    }
  }

  saveChanges(): void {
    console.log(this.visit!);
    // this.visitsService
    //   .update(this.visit!)
    //   .then((response) => {
    //     this.successMessage = 'Dane zostały zaktualizowane pomyślnie!';
    //     this.errorMessage = null;
    //   })
    //   .catch((error) => {
    //     this.errorMessage =
    //       'Wystąpił błąd podczas aktualizacji danych. Proszę spróbować ponownie.';
    //     this.successMessage = null;
    //   });
  }
}
