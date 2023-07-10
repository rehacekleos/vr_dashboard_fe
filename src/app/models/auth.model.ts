import { User } from "./user.model";

export class AuthResponse {
  token: string;
  user: User;
}

export class LoginUser {
  email: string;
  password: string;
}

export class RegisterUser extends User{
  rePassword: string;
}
