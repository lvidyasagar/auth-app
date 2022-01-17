# PK-Auth-Angular

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.1.0.

## Usage

_package.json_

```{
        ....,
        "dependencies":{
            .....,
            "@angular/common": "^12.1.0",
            "@angular/core": "^12.1.0",
            "bootstrap":"^5.1.3"
        }
    }
```

as these dependencies are `peerDependencies` to this library, so these two dependencies must be available to use `pk-auth-angular` library.

_angular.json_

```
    {
        ......,
        "projects":{
            "project-name-xxx":{
                .....,
                "architect":{
                    "build":{
                        .....,
                        "assets":[
                            .....,
                            {
                            "glob": "**/*",
                            "input": "node_modules/pk-auth-angular/assets",
                            "output": "./assets"
                            }
                        ]
                    }
                }
            }
        }
    }
```

to include assets from `pk-auth-angular` library to current projects.

## Example

_app.module.ts_

```

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AuthModule } from 'pk-auth-angular';
import { AppRoutingModule } from './app-routing.module';

const authConfig: AuthConfig = {
  config: {
    issuer: 'https://{your-Domain}/oauth2/default',
    clientId: 'xxxxxxxxxxxxxxx',
    redirectUri: 'http://{host}/login/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
  },
  roles: {
    ADMIN_GROUP: 'admin',
    USER_GROUP: 'local',
  },
  postAuthRedirectPage: '/{redirect-path}',
};

@NgModule({
declarations: [AppComponent],
imports: [BrowserModule, AuthModule.forRoot(authConfig), AppRoutingModule],
providers: [],
bootstrap: [AppComponent],
})
export class AppModule {}

```

import the `Authmodule` from `pk-auth-angular` library

_app.component.html_

```

<pk-auth></pk-auth>

```

to use `AuthComponent` in current project.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
