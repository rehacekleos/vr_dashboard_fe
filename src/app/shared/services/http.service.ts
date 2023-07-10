import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";

export abstract class HttpService {

  url: string;

  protected constructor(controller: string) {
    this.url = environment.apiUrl + controller;
  }


  protected createUrl(url: string){
    return this.url + url;
  }

}
