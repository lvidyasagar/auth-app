import { Inject, Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { OktaAuthStateService } from '@okta/okta-angular';
import { AuthState } from '@okta/okta-auth-js';

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
    if (this.oktaAuthState?.isAuthenticated) {
      const userClaims = this.oktaAuthState.accessToken?.claims.group;
      console.log(userClaims);
      if (route.data.roles && route.data.roles.indexOf(userClaims[1]) === -1) {
        this.router.navigate(['/']);
        return false;
      }
      return true;
    }
    this.router.navigate(['/unauthorized']);
    return false;
  }
}
