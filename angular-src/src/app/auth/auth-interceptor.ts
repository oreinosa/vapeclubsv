import { HttpRequest, HttpHandler, HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.
    console.log(req.method);
    const token = localStorage.getItem("token");
    console.log('Bearer ' + token);
    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    const authReq = req.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });

    // send cloned request with header to the next handler.
    return next.handle(authReq);
  }
}