export const config = {
  issuer: 'https://dev-68266919.okta.com/oauth2/default',
  clientId: '0oa2z05sdjFOm4LI05d7',
  redirectUri: 'http://localhost:4200/login/callback',
  scopes: ['openid', 'profile', 'email'],
  pkce: true,
};

export const USER_ROLE = 'local';
export const ADMIN_ROLE = 'admin';
