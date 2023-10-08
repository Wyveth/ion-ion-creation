import { Inject, Injectable } from '@angular/core';
import { DocumentData } from '@angular/fire/compat/firestore';
import { Subject } from 'rxjs';
import { CollectionReference, Firestore, collection, collectionData, doc, getDocs, setDoc, updateDoc } from '@angular/fire/firestore';
import { UtilsService } from './utils.service';
import { object } from '@angular/fire/database';


@Injectable({
  providedIn: 'root'
})
export class GeneriqueService<T> {
  private db: CollectionReference<DocumentData>;
  subject = new Subject<T[]>();

  constructor(private utilsService: UtilsService, private firestore: Firestore, @Inject('collectionName') private collectionName: string) {
    this.db = collection(this.firestore, this.collectionName);
    this.getAll();
   }

   emit(array: T[]) {
    this.subject.next(array.splice(0));
  }

  async getAll() {
    console.log('Chargement de la collection...');

    const querySnapshot = await getDocs(this.db);
    this.emit(querySnapshot.docs.map((e: any) => {
      console.log(e);
      return {
        id: e.payload.doc.id,
        ...e.payload.doc.data()
      } as T;
    }));
  }

  async create(obj: T extends { [key: string]: unknown } ? T : never) {
    const objEntries = Object.entries(obj) as [string, unknown][];
    await setDoc(doc(this.db, this.collectionName, this.utilsService.getKey()), objEntries);
  }

  update(key: string, obj: T extends { [key: string]: unknown } ? T : never) {
    const objEntries = Object.entries(obj) as [string, unknown][];
    const docRef = doc(this.db, this.collectionName, obj['key'] as string);

    // this.utilsService.getDocByKey(this.db, key).then((doc: any) => {
    //   updateDoc(doc.ref, objEntries);
    // });
  }

  // delete(id: string) {
  //   return this.db.collection(this.collectionName).doc(id).delete();
  // }

  // get(id: string) {
  //   return this.db.collection<T>(this.collectionName).doc(id).snapshotChanges();
  // }
}
