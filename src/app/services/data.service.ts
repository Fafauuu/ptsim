import { Injectable } from '@angular/core';
import { Observable, from, map } from 'rxjs';
import {
  Firestore,
  addDoc,
  collection,
  doc,
  docData,
  deleteDoc,
  updateDoc,
  CollectionReference,
  DocumentData,
  getDocs,
} from '@angular/fire/firestore';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private usersCollection: CollectionReference<DocumentData>;

  constructor(private firestore: Firestore) {
    this.usersCollection = collection(this.firestore, 'users');
  }

  getAll(): Observable<User[]> {
    const collectionRef = collection(this.firestore, 'users');

    return from(getDocs(collectionRef)).pipe(
      map((snapshot) => {
        return snapshot.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            } as User)
        );
      })
    );
  }

  get(id: string) {
    const userDocumentReference = doc(this.firestore, `users/${id}`);
    return docData(userDocumentReference, { idField: 'id' });
  }

  create(user: User) {
    return addDoc(this.usersCollection, user);
  }

  update(user: User) {
    const userDocumentReference = doc(this.firestore, `users/${user.id}`);
    return updateDoc(userDocumentReference, { ...user });
  }

  delete(id: string) {
    const userDocumentReference = doc(this.firestore, `users/${id}`);
    return deleteDoc(userDocumentReference);
  }
}
