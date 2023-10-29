import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Doctor } from '../model';
import { Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class DoctorsService extends BaseService<Doctor> {
  constructor(firestore: Firestore) {
    super(firestore, 'doctors');
  }
}
