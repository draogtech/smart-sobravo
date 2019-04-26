import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunuesPage } from './communues.page';

describe('CommunuesPage', () => {
  let component: CommunuesPage;
  let fixture: ComponentFixture<CommunuesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunuesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunuesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
