import { Injectable } from '@angular/core';
import { HttpService } from "../http.service";

@Injectable({
  providedIn: 'root'
})
export class ApplicationService extends HttpService{

  constructor() {
    super('/application');
  }
}
