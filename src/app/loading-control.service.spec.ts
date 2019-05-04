import { TestBed } from '@angular/core/testing';

import { LoadingControlService } from './loading-control.service';

describe('LoadingControlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoadingControlService = TestBed.get(LoadingControlService);
    expect(service).toBeTruthy();
  });
});
