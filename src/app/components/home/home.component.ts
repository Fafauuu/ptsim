import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../model/user';
import { DataService } from '../../services/data.service';
import { COLLECTION_NAME } from '../../services/injectionToken';
import { Doctor, Room, Visit, VisitHistory } from 'src/app/model';

const visitsToAdd: Visit[] = [
  {
    id: 'visit6',
    userid: '',
    doctorid: 'doctor1',
    roomid: 'room1',
    price: 150,
    day: new Date('2023-12-10'),
    starttime: '15:00',
    endtime: '16:00',
  },
  {
    id: 'visit7',
    userid: '',
    doctorid: 'doctor2',
    roomid: 'room2',
    price: 200,
    day: new Date('2023-12-12'),
    starttime: '16:00',
    endtime: '17:00',
  },
  {
    id: 'visit8',
    userid: '',
    doctorid: 'doctor3',
    roomid: 'room3',
    price: 250,
    day: new Date('2023-12-15'),
    starttime: '17:00',
    endtime: '18:00',
  },
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [
    { provide: COLLECTION_NAME, useValue: 'visits' },
    DataService<Visit>,
  ],
})
export class HomeComponent implements OnInit {
  public doctors$: Observable<Visit[]>;
  public selectedUser: User | null = null;

  constructor(private dataService: DataService<Visit>) {
    this.doctors$ = this.dataService.getAll();
  }

  public ngOnInit(): void {
    // visitsToAdd.forEach((room) => {
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
