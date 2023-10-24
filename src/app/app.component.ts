import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './model/user';
import { DataService } from './services/data.service';
import { COLLECTION_NAME } from './services/injectionToken';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    { provide: COLLECTION_NAME, useValue: 'users' },
    DataService<User>,
  ],
})
export class AppComponent {
  public users$: Observable<User[]>;
  public selectedUser: User | null = null;

  constructor(private dataService: DataService<User>) {
    this.users$ = this.dataService.getAll();
  }

  addData(f: any) {
    console.log(f.value);
    this.dataService
      .create(f.value as User)
      .then(() => {
        console.log('User successfully added');
        this.users$ = this.dataService.getAll();
      })
      .catch((err: any) => {
        console.error('Error adding user:', err);
      });
  }

  updateUser(user: User) {
    this.selectedUser = { ...user };
  }

  deleteUser(id: string) {
    this.dataService
      .delete(id)
      .then(() => {
        console.log('User deleted successfully');
        this.users$ = this.dataService.getAll();
      })
      .catch((err: any) => {
        console.error('Error deleting user:', err);
      });
  }

  submitUpdate(f: any) {
    if (this.selectedUser) {
      this.dataService
        .update(this.selectedUser)
        .then(() => {
          console.log('User updated successfully');
          this.selectedUser = null;
          this.users$ = this.dataService.getAll();
        })
        .catch((err: any) => {
          console.error('Error updating user:', err);
        });
    }
  }
}
