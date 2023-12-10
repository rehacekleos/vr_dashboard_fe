import { Component, OnInit } from '@angular/core';

import { navItems } from './_nav';
import { CustomTranslateService } from "../../shared/translate/services/custom-translate.service";
import { Translations } from "../../shared/translate/translate.model";
import { firstValueFrom, lastValueFrom } from "rxjs";
import { J } from "@angular/cdk/keycodes";
import { AuthService } from "../../auth/auth.service";
import { INavData } from "@coreui/angular";

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
})
export class DefaultLayoutComponent implements OnInit{

  public navItems: INavData[]

  constructor(private translateService: CustomTranslateService,
              private authService: AuthService) {

  }


  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };

  async ngOnInit() {

    this.translateService.$languageChanged.subscribe(async () => {
      setTimeout(async () => {
        await this.setNavItems()
      }, 100)
    })

    await this.setNavItems()
  }

  async setNavItems() {
    const user = this.authService.getCurrentUser();
    let copy: INavData[] = JSON.parse(JSON.stringify(navItems));

    if (!user.superAdmin && !user.developer){
      copy = copy.filter(i => !i.attributes || !i.attributes.administrator === true);
    }

    for (let i = 0; i < copy.length; i++) {
      copy[i].name = await firstValueFrom(this.translateService.get(copy[i].name))
    }

    this.navItems = copy;
  }
}
