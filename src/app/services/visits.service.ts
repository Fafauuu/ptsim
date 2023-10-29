import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Visit } from '../model';
import { Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class VisitsService extends BaseService<Visit> {
  constructor(firestore: Firestore) {
    super(firestore, 'visits');
  }
}
