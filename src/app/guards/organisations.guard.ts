import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../auth/auth.service";
import { OrganisationService } from "../shared/services/app/organisation.service";

@Injectable()
export class OrganisationsGuard implements CanActivate {

  constructor(private router: Router, private orgService: OrganisationService) {
  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    let currentOrganisations = this.orgService.organisations;
    if (!currentOrganisations || route.fragment === "confirmInvitation"){
      currentOrganisations = await this.orgService.getOrganisations();
    }
    if (!currentOrganisations || currentOrganisations.length < 1) {
      await this.router.navigate(['/no-organisation']);
      return false;
    }
    return true;
  }

}
