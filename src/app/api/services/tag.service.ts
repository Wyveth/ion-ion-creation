import { Injectable } from '@angular/core';
import { GeneriqueService } from './generique.service';
import { UtilsService } from './utils.service';
import { Firestore, getDocs } from '@angular/fire/firestore';
import { TagInterface } from '../models/interface/concretes/tag.interface';

@Injectable({
  providedIn: 'root',
})
export class TagService extends GeneriqueService<TagInterface> {
  constructor(utilsService: UtilsService, firestore: Firestore) {
    super(utilsService, firestore, 'tags');
  }

  async getTagsSmall() {
    const querySnapshot = await getDocs(this.db);
    return querySnapshot.docs.map((e: any) => {
      return {
        key: e.data().key,
        ...e.data(),
      } as TagInterface;
    });
  }
}