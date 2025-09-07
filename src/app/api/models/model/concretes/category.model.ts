import { ICategory } from '../../interface/concretes/category.interface';
import { Base } from '../abstracts/base.model';

export class Category extends Base implements ICategory {
  code: string;
  libelle: string;
  description: string;

  constructor(key: string, code: string, libelle: string, description: string) {
    super(key);
    this.code = code;
    this.libelle = libelle;
    this.description = description;
  }
}
