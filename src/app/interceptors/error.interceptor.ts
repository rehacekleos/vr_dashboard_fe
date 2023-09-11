import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { AuthService } from "../auth/auth.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      retry(0),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 403) {
          this.authService.logout().then(() => {
            window.location.reload()
          });
          return throwError(() => error);
        }

        return throwError(() => error);
      })
    )
  }
}
