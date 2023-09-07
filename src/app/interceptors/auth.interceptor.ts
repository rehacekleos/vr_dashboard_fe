import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from "../../environments/environment";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Do not filter auth api calls without auth middleware
    if (request.url.startsWith(environment.apiUrl + '/auth')) {
      return next.handle(request);
    }

    const currentUser = this.authService.getCurrentUser();
    const token = this.authService.getToken();
    const isLoggedIn = currentUser && token;
    if (isLoggedIn) {
      request = request.clone({setHeaders: {Authorization: `Bearer ${token}`}});
    }

    return next.handle(request);
  }
}
