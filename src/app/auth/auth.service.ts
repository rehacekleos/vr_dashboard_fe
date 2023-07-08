import { Injectable } from '@angular/core';
import { User } from "../models/user.model";
import { BehaviorSubject } from "rxjs";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  $user: BehaviorSubject<User> = new BehaviorSubject({email: "test@test.cz", name: "test", surname: "testovic"})

  constructor(private http: HttpClient,
              private router: Router) { }

  async login(email: any, password: any) {
    this.$user.next({email: email, name: "test", surname: "testovic"})
    await this.router.navigate(['']);
    // throw new Error("Wrong email or password!")
  }
}
