import { CanActivateFn } from '@angular/router';

export const beforeOrderGuard: CanActivateFn = (route, state) => {
  return true;
};
