import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from "../auth/auth.service";
import { Injectable } from "@angular/core";

@Injectable()
export class AdminGuard implements CanActivate{

  constructor(private authService: AuthService, private route: Router) {
  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const user = this.authService.getCurrentUser();
    if (!user || (user.superAdmin !== true && user.developer !== true)){
      await this.route.navigate([""])
      return false;
    }
    return true;
  }

}
