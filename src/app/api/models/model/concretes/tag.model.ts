import { ITag } from '../../interface/concretes/tag.interface';
import { Base } from '../abstracts/base.model';

export class Tag extends Base implements ITag {
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
