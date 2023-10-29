import {
  Firestore,
  CollectionReference,
  DocumentData,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from '@angular/fire/firestore';
import { from, Observable, map } from 'rxjs';

export abstract class BaseService<T extends { id: string }> {
  protected collectionReference: CollectionReference<DocumentData>;

  constructor(protected firestore: Firestore, collectionName: string) {
    this.collectionReference = collection(this.firestore, collectionName);
  }

  getAll(): Observable<T[]> {
    return from(getDocs(this.collectionReference)).pipe(
      map((snapshot) => {
        return snapshot.docs.map((doc) => {
          const data = doc.data();
          // Jeśli istnieje pole 'day' i ma własność 'seconds', konwertuj na Date
          if (data['day'] && data['day'].seconds) {
            data['day'] = new Date(data['day'].seconds * 1000);
          }
          return {
            id: doc.id,
            ...data,
          } as T;
        });
      })
    );
  }

  get(id: string): Observable<T | null> {
    return this.getAll().pipe(
      map((items) => items.find((item) => item.id === id) || null)
    );
  }

  create(item: Omit<T, 'id'>) {
    return addDoc(this.collectionReference, item);
  }

  update(item: T) {
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
