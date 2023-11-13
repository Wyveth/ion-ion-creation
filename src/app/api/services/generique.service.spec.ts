/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GeneriqueService } from './generique.service';
import { ITag } from '../models/interface/concretes/tag.interface';

describe('Service: Tag', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeneriqueService],
    });
  });

  it('should ...', inject(
    [GeneriqueService],
    (service: GeneriqueService<ITag>) => {
      expect(service).toBeTruthy();
    },
  ));
});
