  import { Injectable } from '@angular/core';
  import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpHeaders,
    HttpErrorResponse,
    HttpInterceptor
  } from '@angular/common/http';
  import { Observable } from 'rxjs/Observable';
  import 'rxjs/add/observable/throw';
  import 'rxjs/add/operator/catch';
  
  @Injectable()
  export class AuthInterceptor implements HttpInterceptor {
  
    constructor() {}
  
     intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   
      console.log("Intercept url:" + request.url);
   
      let cloned;
      let idToken = localStorage.getItem("auth_token");
   
        if (request.url.includes('login')) {
            let username: string = 'keith';
            let password: string = 'secret';
            cloned = request.clone({
              headers: request.headers.set("Authorization",
                        "Basic " + btoa(username + ":" + password))}); console.log('111');
        } else if (idToken) {      
              cloned = request.clone({
              headers: request.headers.set("Authorization",
                        "Bearer " + idToken)});console.log('222');
        } else {
            return next.handle(request);
        }
      
         console.log("HttpRequest headers:" + cloned.headers.get("Authorization"));
         return next.handle(cloned)
              .catch(response => {
                 if (response instanceof HttpErrorResponse) {
                   console.log('Logging http error:', response);
                 }
                return Observable.throw(response);
               });
     }
  }
