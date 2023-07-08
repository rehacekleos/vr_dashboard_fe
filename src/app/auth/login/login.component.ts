import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { AuthService } from "../auth.service";

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
      const email = loginForm.form.controls['email'].value;
      const password = loginForm.form.controls['password'].value;

      try {
        await this.authService.login(email, password);
      } catch (e: any) {
        this.validated = false;
        this.error = e.message;
      }
    }
  }
}
