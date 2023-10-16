/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BestSellingProductComponent } from './best-selling-product.component';

describe('BestSellingProductComponent', () => {
  let component: BestSellingProductComponent;
  let fixture: ComponentFixture<BestSellingProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BestSellingProductComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BestSellingProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});