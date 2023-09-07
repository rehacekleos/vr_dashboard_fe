import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import { AuthService } from "../auth/auth.service";


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private authService: AuthService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (!this.authService.getCurrentUser()) {
            this.router.navigate(['/auth/login']);
            return false;
        }
        return true;
    }

}
