import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Tag } from '../models/interface/concretes/tag.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  constructor(private db: AngularFirestore) { }

  getTags() {
    return this.db.collection('tags').snapshotChanges();
  }

  createTag(tag: Tag) {
    return this.db.collection('tags').add(tag);
  }

  updateTag(id: string, tag: Tag) {
    return this.db.collection('tags').doc(id).update(tag);
  }

  deleteTag(id: string) {
    return this.db.collection('tags').doc(id).delete();
  }

  getTag(id: string) {
    return this.db.collection('tags').doc(id).snapshotChanges();
  }

  getTagById(id: string) {
    return this.db.collection('tags', ref => ref.where('id', '==', id)).snapshotChanges();
  }
}
