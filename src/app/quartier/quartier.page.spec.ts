import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuartierPage } from './quartier.page';

describe('QuartierPage', () => {
  let component: QuartierPage;
  let fixture: ComponentFixture<QuartierPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuartierPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuartierPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
