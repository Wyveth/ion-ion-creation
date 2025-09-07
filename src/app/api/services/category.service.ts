import { Injectable } from '@angular/core';
import { ICategory } from '../models/interface/concretes/category.interface';
import { Firestore } from '@angular/fire/firestore';
import { GeneriqueService } from './generique.service';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService extends GeneriqueService<ICategory> {
  constructor(utilsService: UtilsService, firestore: Firestore) {
    super(utilsService, firestore, 'categories');
  }
}
