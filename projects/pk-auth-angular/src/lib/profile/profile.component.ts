import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OktaAuthStateService } from '@okta/okta-angular';
import { AuthState } from '@okta/okta-auth-js';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  oktaAuthState: AuthState | undefined;
  isAdmin: boolean = false;
  constructor(
    private oktaAuthService: OktaAuthStateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.oktaAuthService.authState$.subscribe((auth) => {
      this.oktaAuthState = auth;
      if (this.oktaAuthState.isAuthenticated) {
        this.isAdmin =
          this.oktaAuthState.accessToken?.claims.group.includes('admin');
      } else {
        this.router.navigate(['/']);
      }
    });
  }
}
