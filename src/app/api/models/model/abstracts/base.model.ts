import { IBase } from '../../interface/abstracts/base.interface';

export class Base implements IBase {
  key: string;
  created_at?: string;
  updated_at?: string;

  constructor(key: string) {
    this.key = key;
    if (!this.created_at) {
      this.created_at = new Date().toLocaleString();
    }
    this.updated_at = new Date().toLocaleString();
  }
}
