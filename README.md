# PK-Auth-Angular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.1.4.

`npm install` to install all the dependencies of this project.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.

we can create custom npm package using `npm pack` command inside the `dist/pk-auth-angular/` folder. then it will create `pk-auth-angular-xxx.tgz` file, which we can use by installing this npm package in other angular projects.

Run `npm run watch` to build the project in watch mode.

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
                        ],
                        styles:[
                            "node_modules/bootstrap/scss/bootstrap.scss"
                        ]
                    }
                }
            }
        }
    }
```

to include assets and styles from `pk-auth-angular` library to current projects.

## Example

_app.module.ts_

```

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AuthModule } from 'pk-auth-angular';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
declarations: [AppComponent],
imports: [BrowserModule, AuthModule, AppRoutingModule],
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
