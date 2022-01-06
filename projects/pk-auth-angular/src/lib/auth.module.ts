import { NgModule } from '@angular/core';
import { OktaAuthModule, OKTA_CONFIG } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { config } from './constants';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { CommonModule } from '@angular/common';

const oktaAuth = new OktaAuth(config);

@NgModule({
  declarations: [
    AuthComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    UnauthorizedComponent,
  ],
  imports: [CommonModule, AuthRoutingModule, OktaAuthModule],
  providers: [
    {
      provide: OKTA_CONFIG,
      useValue: { oktaAuth },
    },
  ],
  exports: [AuthComponent],
})
export class AuthModule {}
