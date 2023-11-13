import { IBase } from '../abstracts/base.interface';

export interface ITag extends IBase {
  code: string;
  libelle: string;
  description: string;
}
