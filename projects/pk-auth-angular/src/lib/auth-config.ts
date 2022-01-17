import { OktaAuthOptions } from '@okta/okta-auth-js/lib/types';

export interface AuthConfig {
  config?: OktaAuthOptions;
  roles?: {
    USER_GROUP?: string;
    ADMIN_GROUP?: string;
  };
  postAuthRedirectPage?: string;
}
