# RestJwtExample

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.4.

# Description

This application retrieves data from a RESTful service, demonstrating the use of the following Angular features:

* Service component to encapsulate interactions with the remote REST services.
* Angular Interceptors to add Authorisation headers to the request and handle http errors
* Angular Guards to force Login where necessary
* Storage and retrieval of JWT tokens returned from the REST services.
* Angular Router for navigation between pages, and trapping of invalid URLs
* Angular proxy configurations to avoid CORS when accessing REST services
* Environment variables to define URLs for various environments
* Disabling links not valid for the context. E.g. the Login link after a success login.

The RESTful service needs to be built and deployed separately to a suitable JEE server. I use Tomee as it comes pre-configured for REST services. Alternatively, write a mock json service to return the data and generate JWTs.

Review the following settings, and edit as necessary to match your remote server:

* environment/environment.ts
* npm start in package.json
* proxy.conf.json

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
