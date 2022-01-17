import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';
import { AuthState, OktaAuth } from '@okta/okta-auth-js';
import { AuthConstants } from '../constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  oktaAuthState: AuthState | undefined;
  constructor(
    private router: Router,
    private oktaAuthService: OktaAuthStateService,
    @Inject(OKTA_AUTH) private oktaAuth: OktaAuth
  ) {}
  ngOnInit(): void {
    this.oktaAuthService.authState$.subscribe((authState) => {
      this.oktaAuthState = authState;
    });
  }

  async login() {
    if (!this.oktaAuthState?.isAuthenticated)
      await this.oktaAuth.signInWithRedirect({
        originalUri: AuthConstants.postAuthRedirectURI,
      });
  }

  async logout() {
    if (this.oktaAuthState?.isAuthenticated) await this.oktaAuth.signOut();
  }
}
