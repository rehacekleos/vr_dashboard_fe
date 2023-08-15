import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { AuthService } from "../auth.service";
import { LoginUser } from "../../models/auth.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  validated = false;
  error: string = null;

  constructor(private authService: AuthService) {
  }

  async onSubmit(loginForm: NgForm) {
    this.validated = true;
    if (loginForm.valid) {
      const login: LoginUser = {
         email: loginForm.form.controls['email'].value,
         password: loginForm.form.controls['password'].value
      }

      try {
        await this.authService.login(login);
      } catch (e: any) {
        this.validated = false;
        console.log(e)
        this.error = e.error.message;
      }
    }
  }
}
