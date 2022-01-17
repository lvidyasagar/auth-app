import { Inject, Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { OktaAuthStateService } from '@okta/okta-angular';
import { AuthState } from '@okta/okta-auth-js';
import { AuthConstants } from './constants';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  oktaAuthState: AuthState | undefined;
  constructor(
    private router: Router,
    private oktaAuthService: OktaAuthStateService
  ) {
    this.oktaAuthService.authState$.subscribe((auth) => {
      this.oktaAuthState = auth;
    });
  }
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    const userClaims: string[] =
      this.oktaAuthState && this.oktaAuthState.accessToken?.claims.group;
    if (
      this.oktaAuthState?.isAuthenticated &&
      route.data?.admin &&
      userClaims.includes(AuthConstants.roles.ADMIN_ROLE)
    ) {
      return true;
    } else if (
      this.oktaAuthState?.isAuthenticated &&
      route.data?.admin &&
      !userClaims.includes(AuthConstants.roles.ADMIN_ROLE)
    ) {
      this.router.navigate(['/unauthorized']);
      return false;
    } else if (this.oktaAuthState?.isAuthenticated) {
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }
}
