import { IBase } from '../abstracts/base.interface';

export interface ICategory extends IBase {
  code: string;
  libelle: string;
  description: string;
}
