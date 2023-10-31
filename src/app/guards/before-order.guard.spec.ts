import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { beforeOrderGuard } from './before-order.guard';

describe('beforeOrderGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => beforeOrderGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
