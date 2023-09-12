import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrganisationService } from "../shared/services/app/organisation.service";

@Injectable()
export class OrganisationInterceptor implements HttpInterceptor {

  constructor(private orgService: OrganisationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const selectedOrg = this.orgService.$selectedOrganisation.value

    if (selectedOrg){
      request = request.clone({setHeaders: {"x-organisation-id": selectedOrg.id}});
    }

    return next.handle(request);
  }
}
