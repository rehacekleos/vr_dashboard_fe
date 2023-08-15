import { Injectable } from '@angular/core';
import { User } from "../models/user.model";
import { BehaviorSubject, firstValueFrom } from "rxjs";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Router } from "@angular/router";
import { HttpService } from "../shared/services/http.service";
import { AuthResponse, LoginUser, RegisterUser } from "../models/auth.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService extends HttpService{

  $user: BehaviorSubject<User> = new BehaviorSubject(undefined);

  constructor(private http: HttpClient,
              private router: Router) {
    super('/auth')
  }

  async login(login: LoginUser) {
    const res = await firstValueFrom(this.http.post<AuthResponse>(this.createUrl('/login'), login));
    this.$user.next(res.user)
    await this.router.navigate(['']);
  }

  async logout() {
    this.$user.next(undefined);
    await this.router.navigate(['/auth/login']);
  }

  async register(newUser: RegisterUser) {
    const res = await firstValueFrom(this.http.post<AuthResponse>(this.createUrl('/register'), newUser));
    this.$user.next(res.user);
    await this.router.navigate(['']);
  }
}
