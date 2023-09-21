import { Component } from '@angular/core';
import { AuthService } from "../auth.service";
import { NgForm } from "@angular/forms";
import { RegisterUser } from "../../models/auth.model";
import { TranslateComponent } from "../../shared/translate/translate.component";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends TranslateComponent{
  validated = false;

  constructor(private authService: AuthService) {
    super()
  }

  async onSubmit(loginForm: NgForm) {
    this.validated = true;
    if (loginForm.valid) {
      try {
        const newUser: RegisterUser = {
          email: loginForm.form.controls['email'].value,
          name: loginForm.form.controls['name'].value,
          surname: loginForm.form.controls['surname'].value,
          password: loginForm.form.controls['password'].value,
          rePassword: loginForm.form.controls['rePassword'].value,
        }

        await this.authService.register(newUser);
      } catch (e) {
        this.validated = false;
      }
    }
  }
}
