import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { afterAuthGuard } from './after-auth.guard';

describe('afterAuthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => afterAuthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
