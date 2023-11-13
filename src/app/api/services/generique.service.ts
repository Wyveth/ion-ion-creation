import { Inject, Injectable } from '@angular/core';
import { DocumentData } from '@angular/fire/compat/firestore';
import { Subject } from 'rxjs';
import {
  CollectionReference,
  Firestore,
  WithFieldValue,
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { UtilsService } from './utils.service';
import { IBase } from '../models/interface/abstracts/base.interface';

@Injectable({
  providedIn: 'root',
})
export class GeneriqueService<T extends IBase> {
  protected _db: CollectionReference<DocumentData>;

  get db(): CollectionReference<DocumentData> {
    return this._db;
  }

  subject = new Subject<T[]>();

  constructor(
    protected utilsService: UtilsService,
    protected firestore: Firestore,
    @Inject('collectionName') protected collectionName: string,
  ) {
    this._db = collection(firestore, this.collectionName);
  }

  emit(array: T[]) {
    this.subject.next(array.slice(0));
  }

  getAll() {
    getDocs(this.db).then((querySnapshot) => {
      this.emit(
        querySnapshot.docs.map((e: any) => {
          return {
            key: e.data().key,
            ...e.data(),
          } as T;
        }),
      );
    });
  }

  create(obj: WithFieldValue<T>) {
    addDoc<T>(this.db as CollectionReference<T>, obj).finally(() => {
      this.getAll();
    });
  }

  update(key: string, obj: WithFieldValue<T>) {
    this.utilsService.getDocByKey(this.db, key).then((doc: any) => {
      updateDoc<T>(doc.ref, obj as any).then(() => {
        this.getAll();
      });
    });
  }

  delete(key: string) {
    this.utilsService.getDocByKey(this.db, key).then((doc: any) => {
      deleteDoc(doc.ref).finally(() => {
        this.getAll();
      });
    });
  }

  deleteMultiple(keys: T[]) {
    keys.map((obj) => {
      this.utilsService
        .getDocByKey(this.db, obj['key'])
        .then(async (doc: any) => {
          await deleteDoc(doc.ref);
        })
        .finally(() => {
          this.getAll();
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
