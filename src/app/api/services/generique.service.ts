import { Injectable } from '@angular/core';
import { DocumentData } from '@angular/fire/compat/firestore';
import { Subject } from 'rxjs';
import {
  CollectionReference,
  Firestore,
  WithFieldValue,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root',
})
export abstract class GeneriqueService<T> {
  private _db: CollectionReference<DocumentData>;
  
  get db(): CollectionReference<DocumentData> {
    return this._db;
  }

  subject = new Subject<T[]>();

  constructor(
    private utilsService: UtilsService,
    private firestore: Firestore,
    private collectionName: string,
  ) {
    this._db = collection(this.firestore, this.collectionName);
    this.getAll();
  }

  emit(array: T[]) {
    console.log(array);
    this.subject.next(array.splice(0));
  }

  async getAll() {
    const querySnapshot = await getDocs(this.db);

    this.emit(
      querySnapshot.docs.map((e: any) => {
        return {
          key: e.data().key,
          ...e.data(),
        } as T;
      }),
    );
  }

  create(obj: WithFieldValue<T>) {
    addDoc<T>(this.db as CollectionReference<T>, obj);

    this.getAll();
  }

  update(key: string, obj: WithFieldValue<T>) {
    this.utilsService.getDocByKey(this.db, key).then((doc: any) => {
      updateDoc<T>(doc.ref, obj as any);
    });

    this.getAll();
  }

  delete(key: string) {
    this.utilsService.getDocByKey(this.db, key).then((doc: any) => {
      deleteDoc(doc.ref);
    });

    this.getAll();
  }

  deleteMultiple(keys: (T & { key: string })[]) {
    keys.forEach((obj) => {
      this.utilsService.getDocByKey(this.db, obj.key).then((doc: any) => {
        deleteDoc(doc.ref);
      });
    });
  }

  get(key: string) {
    const qry = query(this.db, where('key', '==', key));

    getDocs(qry).then((querySnapshot) => {
      if (querySnapshot) {
        console.log('Document data:', querySnapshot);
        querySnapshot.docs.forEach((element) => {
          return element.data() as T;
        });
      }
    });
  }
}
