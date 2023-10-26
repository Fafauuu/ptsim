import { Inject, Injectable } from '@angular/core';
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
import { COLLECTION_NAME } from './injectionToken';

@Injectable({
  providedIn: 'root',
})
export class DataService<T extends { id: string }> {
  private collectionReference: CollectionReference<DocumentData>;

  constructor(
    private firestore: Firestore,
    @Inject(COLLECTION_NAME) collectionName: string
  ) {
    this.collectionReference = collection(this.firestore, collectionName);
  }

  getAll(): Observable<T[]> {
    return from(getDocs(this.collectionReference)).pipe(
      map((snapshot) => {
        return snapshot.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            } as T)
        );
      })
    );
  }

  get(id: string): Observable<T | null> {
    return this.getAll().pipe(
      map((items) => items.find((item) => item.id === id) || null)
    );
  }

  // get(id: string): Observable<T> {
  //   const documentReference = doc(
  //     this.firestore,
  //     `${this.collectionReference.path}/${id}`
  //   );
  //   return docData(documentReference, { idField: 'id' }) as Observable<T>;
  // }

  create<T extends { [key: string]: any }>(item: T) {
    return addDoc(this.collectionReference, item);
  }

  update(item: T & { id: string }) {
    const documentReference = doc(
      this.firestore,
      `${this.collectionReference.path}/${item.id}`
    );
    return updateDoc(documentReference, { ...item });
  }

  delete(id: string) {
    const documentReference = doc(
      this.firestore,
      `${this.collectionReference.path}/${id}`
    );
    return deleteDoc(documentReference);
  }
}
