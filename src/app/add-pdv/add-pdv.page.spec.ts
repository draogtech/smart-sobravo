import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPDVPage } from './add-pdv.page';

describe('AddPDVPage', () => {
  let component: AddPDVPage;
  let fixture: ComponentFixture<AddPDVPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPDVPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPDVPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
