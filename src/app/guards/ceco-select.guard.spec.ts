import { TestBed } from '@angular/core/testing';

import { CecoSelectGuard } from './ceco-select.guard';

describe('CecoSelectGuard', () => {
  let guard: CecoSelectGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CecoSelectGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
