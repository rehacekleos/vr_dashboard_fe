import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from "../auth/auth.service";
import { Injectable } from "@angular/core";

@Injectable()
export class AdminGuard implements CanActivate{

  constructor(private authService: AuthService, private route: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const user = this.authService.getCurrentUser();
    if (!user && user.superAdmin !== true){
      this.route.navigate([""])
      return false;
    }
    return true;
  }

}
