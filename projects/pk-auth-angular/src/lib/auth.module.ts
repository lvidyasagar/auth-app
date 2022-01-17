import { ModuleWithProviders, NgModule } from '@angular/core';
import { OktaAuthModule, OKTA_CONFIG } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { AuthConstants } from './constants';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { CommonModule } from '@angular/common';
import { AuthConfig } from './auth-config';

const oktaAuth = new OktaAuth(AuthConstants.config);

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
export class AuthModule {
  static forRoot(AuthConfig?: AuthConfig): ModuleWithProviders<AuthModule> {
    AuthConstants.roles.USER_ROLE =
      AuthConfig?.roles?.USER_GROUP || AuthConstants.roles.USER_ROLE;
    AuthConstants.roles.ADMIN_ROLE =
      AuthConfig?.roles?.ADMIN_GROUP || AuthConstants.roles.ADMIN_ROLE;
    AuthConstants.postAuthRedirectURI =
      AuthConfig?.postAuthRedirectPage || AuthConstants.postAuthRedirectURI;

    if (AuthConfig?.config != null && AuthConfig?.config != undefined) {
      return {
        ngModule: AuthModule,
        providers: [
          {
            provide: OKTA_CONFIG,
            useValue: AuthConfig && {
              oktaAuth: new OktaAuth(AuthConfig?.config),
            },
          },
        ],
      };
    } else {
      return { ngModule: AuthModule };
    }
  }
}
