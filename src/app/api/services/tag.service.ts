import { Injectable } from '@angular/core';
import { GeneriqueService } from './generique.service';
import { UtilsService } from './utils.service';
import { Firestore } from '@angular/fire/firestore';
import { ITag } from '../models/interface/concretes/tag.interface';

@Injectable({
  providedIn: 'root',
})
export class TagService extends GeneriqueService<ITag> {
  constructor(utilsService: UtilsService, firestore: Firestore) {
    super(utilsService, firestore, 'tags');
  }
}
