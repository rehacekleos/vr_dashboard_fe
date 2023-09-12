import { Injectable } from '@angular/core';
import { User } from "../models/user.model";
import { BehaviorSubject, firstValueFrom } from "rxjs";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Router } from "@angular/router";
import { HttpService } from "../shared/services/http.service";
import { AuthResponse, LoginUser, RegisterUser } from "../models/auth.model";
import { OrganisationService } from "../shared/services/app/organisation.service";
import { SessionStorageUtil } from "../shared/utils/sessionStorageUtil";

@Injectable({
  providedIn: 'root'
})
export class AuthService extends HttpService{

  $authResponse: BehaviorSubject<AuthResponse> = new BehaviorSubject(undefined);
  $user: BehaviorSubject<User> = new BehaviorSubject(undefined);
  private user: User;
  private token: string;

  constructor(private http: HttpClient,
              private router: Router,
              private orgService: OrganisationService) {
    super('/auth');

    this.$authResponse.subscribe(async val => {
      if (val) {
        this.user = val.user;
        this.$user.next(val.user);
        this.token = val.token;
        SessionStorageUtil.saveValue("auth", val);
        await this.orgService.getOrganisations();
        await this.router.navigate(['']);
      } else if (val === null) {
        this.user = undefined;
        this.token = undefined;
        this.$user.next(undefined);
        SessionStorageUtil.deleteValue("auth");
      }
    })
  }

  async login(login: LoginUser) {
    const res = await firstValueFrom(this.http.post<AuthResponse>(this.createUrl('/login'), login));
    this.$authResponse.next(res);
  }

  async logout() {
    this.$authResponse.next(null);
    await this.router.navigate(['/auth/login']);
  }

  async register(newUser: RegisterUser) {
    const res = await firstValueFrom(this.http.post<AuthResponse>(this.createUrl('/register'), newUser));
    this.$authResponse.next(res);
  }

  getCurrentUser() {
    if (this.user) {
      return this.user;
    }
    const sessionVal: AuthResponse = SessionStorageUtil.getValue("auth");
    if (sessionVal) {
      this.token = sessionVal.token;
      this.user = sessionVal.user;
      this.$user.next(sessionVal.user);
      return sessionVal.user;
    }

    return null;
  }

  getToken() {
    return this.token;
  }
}
