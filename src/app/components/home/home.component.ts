import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../model/user';
import { DataService } from '../../services/data.service';
import { COLLECTION_NAME } from '../../services/injectionToken';
import { Doctor, Room, Visit, VisitHistory } from 'src/app/model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [
    { provide: COLLECTION_NAME, useValue: 'visitsHistory' },
    DataService<VisitHistory>,
  ],
})
export class HomeComponent implements OnInit {
  public doctors$: Observable<VisitHistory[]>;
  public selectedUser: User | null = null;

  constructor(private dataService: DataService<VisitHistory>) {
    this.doctors$ = this.dataService.getAll();
  }

  public ngOnInit(): void {
    // this.visitHistoryToAdd.forEach((room) => {
    //   this.dataService
    //     .create(room)
    //     .then(() => {
    //       console.log(`Doctor ${room.id} successfully added`);
    //       this.doctors$ = this.dataService.getAll();
    //     })
    //     .catch((err: any) => {
    //       console.error(`Error adding room ${room.id}:`, err);
    //     });
    // });
  }

  // addData(f: any) {
  //   console.log(f.value);
  //   this.dataService
  //     .create(f.value as Room)
  //     .then(() => {
  //       console.log('User successfully added');
  //       this.rooms$ = this.dataService.getAll();
  //     })
  //     .catch((err: any) => {
  //       console.error('Error adding user:', err);
  //     });
  // }

  // updateData(user: Room) {
  //   this.selectedUser = { ...user };
  // }

  // deleteData(id: string) {
  //   this.dataService
  //     .delete(id)
  //     .then(() => {
  //       console.log('User deleted successfully');
  //       this.rooms$ = this.dataService.getAll();
  //     })
  //     .catch((err: any) => {
  //       console.error('Error deleting user:', err);
  //     });
  // }

  submitUpdate(f: any) {
    console.log('submit');
    // if (this.selectedUser) {
    //   this.dataService
    //     .update(this.selectedUser)
    //     .then(() => {
    //       console.log('User updated successfully');
    //       this.selectedUser = null;
    //       this.rooms$ = this.dataService.getAll();
    //     })
    //     .catch((err: any) => {
    //       console.error('Error updating user:', err);
    //     });
    // }
  }
}
